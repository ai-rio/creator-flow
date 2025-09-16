'use client';

import { AnimatePresence, motion, MotionValue, useAnimation, useMotionValue } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

import { useMotionPreferences } from './AccessibilityMotionProvider';

// ==================== CROSS-SYSTEM DATA FLOW TYPES ====================

export interface DataFlowNode {
  id: string;
  type: 'source' | 'processor' | 'destination';
  category: 'tiktok' | 'order' | 'inventory' | 'shipping' | 'analytics';
  position: { x: number; y: number };
  size: { width: number; height: number };
  label: string;
  status: 'active' | 'processing' | 'idle' | 'error';
}

export interface DataFlowConnection {
  id: string;
  sourceId: string;
  targetId: string;
  dataType: 'order' | 'inventory' | 'revenue' | 'analytics' | 'automation';
  intensity: 'low' | 'medium' | 'high';
  isActive: boolean;
  throughput?: number;
}

export interface SystemHealthMetric {
  componentId: string;
  health: number; // 0-100
  status: 'optimal' | 'warning' | 'critical';
  lastUpdate: Date;
}

// ==================== CROSS-SYSTEM DATA FLOW ORCHESTRATOR ====================

interface CrossSystemDataFlowProps {
  nodes: DataFlowNode[];
  connections: DataFlowConnection[];
  healthMetrics: SystemHealthMetric[];
  className?: string;
  enableInteractivity?: boolean;
  showLabels?: boolean;
  performanceMode?: 'high' | 'balanced' | 'low';
}

export const CrossSystemDataFlow: React.FC<CrossSystemDataFlowProps> = ({
  nodes,
  connections,
  healthMetrics,
  className,
  enableInteractivity = true,
  showLabels = true,
  performanceMode = 'balanced',
}) => {
  const { prefersReducedMotion } = useMotionPreferences();
  const [activeConnection, setActiveConnection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance optimization: reduce particle count based on mode
  const particleMultiplier = performanceMode === 'high' ? 1 : performanceMode === 'balanced' ? 0.6 : 0.3;

  if (prefersReducedMotion) {
    return (
      <div className={cn('relative rounded-lg border border-border bg-card/50 p-4', className)}>
        <StaticSystemOverview nodes={nodes} connections={connections} healthMetrics={healthMetrics} />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative overflow-hidden rounded-xl border border-border bg-card/50 p-6', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Grid */}
      <SystemGrid />

      {/* Data Flow Connections */}
      <svg className='pointer-events-none absolute inset-0 h-full w-full'>
        {connections.map((connection) => (
          <DataFlowPath
            key={connection.id}
            connection={connection}
            nodes={nodes}
            isActive={connection.isActive}
            particleCount={Math.floor(8 * particleMultiplier)}
            onConnectionHover={enableInteractivity ? setActiveConnection : undefined}
          />
        ))}
      </svg>

      {/* System Nodes */}
      <div className='relative'>
        {nodes.map((node) => (
          <SystemNode
            key={node.id}
            node={node}
            health={healthMetrics.find((m) => m.componentId === node.id)?.health ?? 100}
            isHighlighted={
              activeConnection
                ? connections.find((c) => c.id === activeConnection)?.sourceId === node.id ||
                  connections.find((c) => c.id === activeConnection)?.targetId === node.id
                : false
            }
            showLabel={showLabels}
            enableInteractivity={enableInteractivity}
          />
        ))}
      </div>

      {/* System Health Overlay */}
      <SystemHealthOverlay metrics={healthMetrics} />

      {/* Real-time Metrics Panel */}
      <RealTimeMetricsPanel connections={connections} />
    </motion.div>
  );
};

// ==================== SYSTEM GRID BACKGROUND ====================

const SystemGrid: React.FC = () => (
  <motion.div
    className='absolute inset-0'
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    <svg className='h-full w-full'>
      <defs>
        <pattern id='system-grid' width='40' height='40' patternUnits='userSpaceOnUse'>
          <path
            d='M 40 0 L 0 0 0 40'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            className='text-muted-foreground/20'
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill='url(#system-grid)' />
    </svg>
  </motion.div>
);

// ==================== SYSTEM NODE COMPONENT ====================

interface SystemNodeProps {
  node: DataFlowNode;
  health: number;
  isHighlighted: boolean;
  showLabel: boolean;
  enableInteractivity: boolean;
}

const SystemNode: React.FC<SystemNodeProps> = ({ node, health, isHighlighted, showLabel, enableInteractivity }) => {
  const nodeControls = useAnimation();

  const getNodeColor = () => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryColor = () => {
    switch (node.category) {
      case 'tiktok':
        return 'border-pink-500/50 shadow-pink-500/20';
      case 'order':
        return 'border-blue-500/50 shadow-blue-500/20';
      case 'inventory':
        return 'border-amber-500/50 shadow-amber-500/20';
      case 'shipping':
        return 'border-green-500/50 shadow-green-500/20';
      case 'analytics':
        return 'border-purple-500/50 shadow-purple-500/20';
      default:
        return 'border-gray-500/50 shadow-gray-500/20';
    }
  };

  useEffect(() => {
    if (isHighlighted) {
      nodeControls.start({
        scale: 1.1,
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
        transition: { duration: 0.3 },
      });
    } else {
      nodeControls.start({
        scale: 1,
        boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
        transition: { duration: 0.3 },
      });
    }
  }, [isHighlighted, nodeControls]);

  return (
    <motion.div
      className={cn(
        'absolute flex flex-col items-center justify-center rounded-lg border bg-card/80 backdrop-blur-sm',
        getCategoryColor(),
        enableInteractivity && 'cursor-pointer transition-transform hover:scale-105'
      )}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: node.size.width,
        height: node.size.height,
      }}
      animate={nodeControls}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: Math.random() * 0.5 }}
    >
      {/* Node Core */}
      <motion.div
        className={cn('h-4 w-4 rounded-full', getNodeColor())}
        animate={{
          scale: node.status === 'processing' ? [1, 1.3, 1] : 1,
          opacity: node.status === 'processing' ? [0.7, 1, 0.7] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: node.status === 'processing' ? Infinity : 0,
        }}
      />

      {/* Health Ring */}
      <div className='absolute inset-0 rounded-lg'>
        <svg className='h-full w-full'>
          <circle
            cx='50%'
            cy='50%'
            r='45%'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-muted-foreground/20'
          />
          <motion.circle
            cx='50%'
            cy='50%'
            r='45%'
            fill='none'
            stroke={health >= 90 ? '#10B981' : health >= 70 ? '#F59E0B' : '#EF4444'}
            strokeWidth='2'
            strokeLinecap='round'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: health / 100 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
            }}
          />
        </svg>
      </div>

      {/* Label */}
      {showLabel && (
        <motion.div
          className='absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground'
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {node.label}
        </motion.div>
      )}

      {/* Status Indicator */}
      {node.status === 'processing' && (
        <motion.div
          className='absolute -right-2 -top-2 h-3 w-3 rounded-full bg-blue-400'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

// ==================== DATA FLOW PATH COMPONENT ====================

interface DataFlowPathProps {
  connection: DataFlowConnection;
  nodes: DataFlowNode[];
  isActive: boolean;
  particleCount: number;
  onConnectionHover?: (connectionId: string | null) => void;
}

const DataFlowPath: React.FC<DataFlowPathProps> = ({
  connection,
  nodes,
  isActive,
  particleCount,
  onConnectionHover,
}) => {
  const sourceNode = nodes.find((n) => n.id === connection.sourceId);
  const targetNode = nodes.find((n) => n.id === connection.targetId);

  if (!sourceNode || !targetNode) return null;

  const startX = sourceNode.position.x + sourceNode.size.width / 2;
  const startY = sourceNode.position.y + sourceNode.size.height / 2;
  const endX = targetNode.position.x + targetNode.size.width / 2;
  const endY = targetNode.position.y + targetNode.size.height / 2;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  // Create curved path
  const pathD = `M ${startX} ${startY} Q ${midX} ${midY - 50} ${endX} ${endY}`;

  const getConnectionColor = () => {
    switch (connection.dataType) {
      case 'order':
        return '#3B82F6';
      case 'inventory':
        return '#F59E0B';
      case 'revenue':
        return '#10B981';
      case 'analytics':
        return '#8B5CF6';
      case 'automation':
        return '#EC4899';
      default:
        return '#6B7280';
    }
  };

  return (
    <g>
      {/* Connection Path */}
      <motion.path
        d={pathD}
        fill='none'
        stroke={getConnectionColor()}
        strokeWidth={isActive ? 3 : 1}
        strokeOpacity={isActive ? 0.8 : 0.3}
        strokeLinecap='round'
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        onHoverStart={() => onConnectionHover?.(connection.id)}
        onHoverEnd={() => onConnectionHover?.(null)}
        className='cursor-pointer'
      />

      {/* Data Particles */}
      {isActive && (
        <AnimatePresence>
          {Array.from({ length: particleCount }).map((_, i) => (
            <DataParticle
              key={`${connection.id}-particle-${i}`}
              path={pathD}
              color={getConnectionColor()}
              delay={i * 0.2}
              intensity={connection.intensity}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Connection Label */}
      {isActive && connection.throughput && (
        <motion.text
          x={midX}
          y={midY - 60}
          textAnchor='middle'
          className='fill-muted-foreground text-xs font-medium'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {connection.throughput}/sec
        </motion.text>
      )}
    </g>
  );
};

// ==================== DATA PARTICLE COMPONENT ====================

interface DataParticleProps {
  path: string;
  color: string;
  delay: number;
  intensity: 'low' | 'medium' | 'high';
}

const DataParticle: React.FC<DataParticleProps> = ({ path, color, delay, intensity }) => {
  const getParticleSize = () => {
    switch (intensity) {
      case 'high':
        return 4;
      case 'medium':
        return 3;
      case 'low':
        return 2;
      default:
        return 3;
    }
  };

  const getDuration = () => {
    switch (intensity) {
      case 'high':
        return 1.5;
      case 'medium':
        return 2;
      case 'low':
        return 2.5;
      default:
        return 2;
    }
  };

  return (
    <motion.circle
      r={getParticleSize()}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: getDuration(),
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <animateMotion dur={`${getDuration()}s`} begin={`${delay}s`} repeatCount='indefinite' rotate='auto'>
        <mpath xlinkHref={`#${path}`} />
      </animateMotion>
    </motion.circle>
  );
};

// ==================== SYSTEM HEALTH OVERLAY ====================

interface SystemHealthOverlayProps {
  metrics: SystemHealthMetric[];
}

const SystemHealthOverlay: React.FC<SystemHealthOverlayProps> = ({ metrics }) => {
  const averageHealth = metrics.reduce((sum, metric) => sum + metric.health, 0) / metrics.length;

  return (
    <motion.div
      className='absolute right-4 top-4 rounded-lg border border-border/50 bg-card/90 p-3 backdrop-blur-sm'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className='flex items-center gap-2'>
        <motion.div
          className={cn(
            'h-3 w-3 rounded-full',
            averageHealth >= 90 ? 'bg-green-500' : averageHealth >= 70 ? 'bg-yellow-500' : 'bg-red-500'
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className='text-sm font-medium'>System Health: {Math.round(averageHealth)}%</span>
      </div>
    </motion.div>
  );
};

// ==================== REAL-TIME METRICS PANEL ====================

interface RealTimeMetricsPanelProps {
  connections: DataFlowConnection[];
}

const RealTimeMetricsPanel: React.FC<RealTimeMetricsPanelProps> = ({ connections }) => {
  const activeConnections = connections.filter((c) => c.isActive).length;
  const totalThroughput = connections.reduce((sum, c) => sum + (c.throughput || 0), 0);

  return (
    <motion.div
      className='absolute bottom-4 left-4 flex gap-4 rounded-lg border border-border/50 bg-card/90 p-3 backdrop-blur-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <div className='text-center'>
        <div className='text-lg font-bold text-blue-600 dark:text-blue-400'>{activeConnections}</div>
        <div className='text-xs text-muted-foreground'>Active Flows</div>
      </div>
      <div className='text-center'>
        <div className='text-lg font-bold text-green-600 dark:text-green-400'>{totalThroughput.toLocaleString()}</div>
        <div className='text-xs text-muted-foreground'>Total/sec</div>
      </div>
    </motion.div>
  );
};

// ==================== STATIC SYSTEM OVERVIEW ====================

const StaticSystemOverview: React.FC<{
  nodes: DataFlowNode[];
  connections: DataFlowConnection[];
  healthMetrics: SystemHealthMetric[];
}> = ({ nodes, connections, healthMetrics }) => (
  <div className='space-y-4'>
    <h3 className='text-lg font-semibold'>System Overview</h3>
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <h4 className='mb-2 font-medium'>System Nodes</h4>
        <ul className='space-y-1 text-sm'>
          {nodes.map((node) => (
            <li key={node.id} className='flex justify-between'>
              <span>{node.label}</span>
              <span
                className={cn(
                  'rounded px-2 py-0.5 text-xs',
                  node.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : node.status === 'processing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                )}
              >
                {node.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className='mb-2 font-medium'>Active Connections</h4>
        <ul className='space-y-1 text-sm'>
          {connections
            .filter((c) => c.isActive)
            .map((connection) => (
              <li key={connection.id} className='flex justify-between'>
                <span>{connection.dataType}</span>
                <span className='text-muted-foreground'>{connection.intensity}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  </div>
);

// ==================== EXPORTS ====================

export default {
  CrossSystemDataFlow,
  SystemNode,
  DataFlowPath,
  DataParticle,
};
