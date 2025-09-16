'use client';

import { motion, useAnimation, useMotionValue, Variants } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
  Video,
  Zap,
} from 'lucide-react';
import React, { useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

import { MOTION_CONFIG, useReducedMotion } from '../compositions/layouts/BentoMotion';

// ==================== TYPE DEFINITIONS ====================

interface SystemNode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  position: { x: number; y: number };
  color: string;
  description: string;
  metrics?: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }[];
}

interface DataFlow {
  from: string;
  to: string;
  label: string;
  color: string;
  intensity: number;
  animated: boolean;
  bidirectional?: boolean;
}

interface DataFlowVisualizationProps {
  className?: string;
  variant?: 'dashboard' | 'homepage' | 'detailed';
  enableRealTimeEffects?: boolean;
  showMetrics?: boolean;
  interactive?: boolean;
}

// ==================== SYSTEM CONFIGURATION ====================

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    icon: Video,
    position: { x: 10, y: 20 },
    color: '#ff0050',
    description: 'Content & Sales Hub',
    metrics: [
      { label: 'Videos', value: '1.2M', trend: 'up' },
      { label: 'Orders', value: '324K', trend: 'up' },
    ],
  },
  {
    id: 'orders',
    name: 'Order Management',
    icon: ShoppingCart,
    position: { x: 50, y: 10 },
    color: '#14b8a6',
    description: 'Automated Processing',
    metrics: [
      { label: 'Processing', value: '1,247', trend: 'stable' },
      { label: 'Queue Time', value: '2.3s', trend: 'down' },
    ],
  },
  {
    id: 'inventory',
    name: 'Smart Inventory',
    icon: Package,
    position: { x: 90, y: 20 },
    color: '#8b5cf6',
    description: 'AI-Powered Stock',
    metrics: [
      { label: 'Items', value: '45.2K', trend: 'up' },
      { label: 'Turnover', value: '12.4x', trend: 'up' },
    ],
  },
  {
    id: 'shipping',
    name: 'Logistics Hub',
    icon: Truck,
    position: { x: 50, y: 70 },
    color: '#f59e0b',
    description: 'Global Fulfillment',
    metrics: [
      { label: 'Shipments', value: '892', trend: 'up' },
      { label: 'Avg Time', value: '1.8d', trend: 'down' },
    ],
  },
  {
    id: 'analytics',
    name: 'Business Intelligence',
    icon: BarChart3,
    position: { x: 10, y: 70 },
    color: '#06b6d4',
    description: 'Insights Engine',
    metrics: [
      { label: 'Revenue', value: '$2.4M', trend: 'up' },
      { label: 'Growth', value: '34%', trend: 'up' },
    ],
  },
];

const DATA_FLOWS: DataFlow[] = [
  {
    from: 'tiktok',
    to: 'orders',
    label: 'Live Orders',
    color: '#ff0050',
    intensity: 0.8,
    animated: true,
  },
  {
    from: 'orders',
    to: 'inventory',
    label: 'Stock Check',
    color: '#14b8a6',
    intensity: 0.6,
    animated: true,
  },
  {
    from: 'inventory',
    to: 'shipping',
    label: 'Fulfillment',
    color: '#8b5cf6',
    intensity: 0.7,
    animated: true,
  },
  {
    from: 'shipping',
    to: 'analytics',
    label: 'Delivery Data',
    color: '#f59e0b',
    intensity: 0.5,
    animated: true,
  },
  {
    from: 'analytics',
    to: 'tiktok',
    label: 'Performance Insights',
    color: '#06b6d4',
    intensity: 0.4,
    animated: true,
  },
  {
    from: 'orders',
    to: 'analytics',
    label: 'Order Analytics',
    color: '#14b8a6',
    intensity: 0.3,
    animated: true,
  },
];

// ==================== ANIMATED SVG PATH COMPONENT ====================

interface AnimatedPathProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  intensity: number;
  animated: boolean;
  label: string;
  containerWidth: number;
  containerHeight: number;
}

const AnimatedPath: React.FC<AnimatedPathProps> = ({
  from,
  to,
  color,
  intensity,
  animated,
  label,
  containerWidth,
  containerHeight,
}) => {
  const pathId = useId();
  const prefersReducedMotion = useReducedMotion();

  // Calculate actual coordinates
  const startX = (from.x / 100) * containerWidth;
  const startY = (from.y / 100) * containerHeight;
  const endX = (to.x / 100) * containerWidth;
  const endY = (to.y / 100) * containerHeight;

  // Create curved path
  const controlX = startX + (endX - startX) * 0.5;
  const controlY = Math.min(startY, endY) - 50;

  const pathData = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;

  // Calculate path length for animation
  const pathLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) * 1.5; // Approximate length accounting for curve

  return (
    <g>
      {/* Base path */}
      <path d={pathData} stroke={color} strokeWidth='2' strokeOpacity='0.2' fill='none' strokeDasharray='2,4' />

      {/* Animated flow path */}
      {animated && !prefersReducedMotion && (
        <motion.path
          d={pathData}
          stroke={color}
          strokeWidth='3'
          strokeOpacity={intensity}
          fill='none'
          strokeLinecap='round'
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, intensity, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        />
      )}

      {/* Data particles */}
      {animated &&
        !prefersReducedMotion &&
        Array.from({ length: 3 }).map((_, i) => (
          <motion.circle
            key={i}
            r='3'
            fill={color}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: i * 0.8,
              repeatDelay: 1,
            }}
            style={{
              offsetPath: `path('${pathData}')`,
              offsetRotate: '0deg',
            }}
          />
        ))}
    </g>
  );
};

// ==================== SYSTEM NODE COMPONENT ====================

interface SystemNodeProps {
  node: SystemNode;
  containerWidth: number;
  containerHeight: number;
  isActive: boolean;
  onHover: (nodeId: string | null) => void;
  showMetrics: boolean;
  interactive: boolean;
}

const SystemNode: React.FC<SystemNodeProps> = ({
  node,
  containerWidth,
  containerHeight,
  isActive,
  onHover,
  showMetrics,
  interactive,
}) => {
  const x = (node.position.x / 100) * containerWidth;
  const y = (node.position.y / 100) * containerHeight;
  const prefersReducedMotion = useReducedMotion();

  const nodeVariants: Variants = {
    idle: {
      scale: 1,
      boxShadow: `0 0 0 0 ${node.color}40`,
    },
    hover: {
      scale: 1.1,
      boxShadow: `0 0 20px 4px ${node.color}40`,
      transition: MOTION_CONFIG.springs.responsive,
    },
    active: {
      scale: 1.05,
      boxShadow: `0 0 15px 3px ${node.color}60`,
    },
  };

  const pulseVariants: Variants = {
    idle: { scale: 1, opacity: 0.6 },
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [0.6, 0.2, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className='absolute -translate-x-1/2 -translate-y-1/2 transform'
      style={{ left: x, top: y }}
      variants={prefersReducedMotion ? undefined : nodeVariants}
      initial='idle'
      animate={isActive ? 'active' : 'idle'}
      whileHover={interactive ? 'hover' : undefined}
      onHoverStart={() => interactive && onHover(node.id)}
      onHoverEnd={() => interactive && onHover(null)}
    >
      {/* Pulse ring */}
      <motion.div
        className='pointer-events-none absolute inset-0 rounded-full border-2'
        style={{ borderColor: node.color }}
        variants={prefersReducedMotion ? undefined : pulseVariants}
        animate={isActive ? 'pulse' : 'idle'}
      />

      {/* Main node */}
      <div
        className={cn(
          'relative flex h-16 w-16 items-center justify-center rounded-full',
          'border-2 backdrop-blur-sm transition-all duration-300',
          'transform-gpu cursor-pointer',
          interactive && 'hover:shadow-lg'
        )}
        style={{
          backgroundColor: `${node.color}20`,
          borderColor: node.color,
        }}
      >
        <node.icon className='h-8 w-8' style={{ color: node.color }} />
      </div>

      {/* Node label */}
      <div className='absolute left-1/2 top-full mt-2 -translate-x-1/2 transform text-center'>
        <p className='whitespace-nowrap text-sm font-semibold text-foreground'>{node.name}</p>
        <p className='whitespace-nowrap text-xs text-muted-foreground'>{node.description}</p>
      </div>

      {/* Metrics overlay */}
      {showMetrics && node.metrics && (
        <motion.div
          className='absolute -right-2 -top-2 min-w-24 rounded-lg border border-border bg-card p-2 shadow-lg'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {node.metrics.map((metric, index) => (
            <div key={index} className='flex items-center justify-between text-xs'>
              <span className='text-muted-foreground'>{metric.label}:</span>
              <div className='flex items-center gap-1'>
                <span className='font-semibold text-foreground'>{metric.value}</span>
                {metric.trend && (
                  <TrendingUp
                    className={cn(
                      'h-3 w-3',
                      metric.trend === 'up' && 'text-green-500',
                      metric.trend === 'down' && 'rotate-180 text-red-500',
                      metric.trend === 'stable' && 'rotate-90 text-yellow-500'
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// ==================== MAIN COMPONENT ====================

export const DataFlowVisualization: React.FC<DataFlowVisualizationProps> = ({
  className,
  variant = 'dashboard',
  enableRealTimeEffects = true,
  showMetrics = true,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    if (!enableRealTimeEffects) return;

    const interval = setInterval(() => {
      setRealTimeData((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, [enableRealTimeEffects]);

  const heightClasses = {
    dashboard: 'h-96',
    homepage: 'h-80',
    detailed: 'h-[32rem]',
  };

  return (
    <div className={cn('relative w-full overflow-hidden', heightClasses[variant], className)}>
      <div
        ref={containerRef}
        className='relative h-full w-full rounded-xl border border-border bg-gradient-to-br from-background via-background/95 to-muted/30'
      >
        {/* Background grid pattern */}
        <div className='absolute inset-0 opacity-10'>
          <svg width='100%' height='100%' className='absolute inset-0'>
            <defs>
              <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                <path d='M 40 0 L 0 0 0 40' fill='none' stroke='currentColor' strokeWidth='1' />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid)' />
          </svg>
        </div>

        {/* SVG overlay for paths */}
        <svg
          className='pointer-events-none absolute inset-0 h-full w-full'
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {/* Render data flow paths */}
          {DATA_FLOWS.map((flow, index) => {
            const fromNode = SYSTEM_NODES.find((n) => n.id === flow.from);
            const toNode = SYSTEM_NODES.find((n) => n.id === flow.to);

            if (!fromNode || !toNode) return null;

            return (
              <AnimatedPath
                key={`${flow.from}-${flow.to}-${index}`}
                from={fromNode.position}
                to={toNode.position}
                color={flow.color}
                intensity={flow.intensity}
                animated={flow.animated}
                label={flow.label}
                containerWidth={dimensions.width}
                containerHeight={dimensions.height}
              />
            );
          })}
        </svg>

        {/* System nodes */}
        {SYSTEM_NODES.map((node) => (
          <SystemNode
            key={node.id}
            node={node}
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            isActive={activeNode === node.id || realTimeData}
            onHover={setActiveNode}
            showMetrics={showMetrics}
            interactive={interactive}
          />
        ))}

        {/* Real-time indicator */}
        {enableRealTimeEffects && (
          <motion.div
            className='absolute right-4 top-4 flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 backdrop-blur-sm'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className='h-2 w-2 rounded-full bg-green-500'
              animate={
                realTimeData
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }
                  : {}
              }
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className='text-xs text-muted-foreground'>Live Data</span>
          </motion.div>
        )}

        {/* Legend */}
        {variant === 'detailed' && (
          <motion.div
            className='absolute bottom-4 left-4 rounded-lg border border-border bg-card/80 p-3 backdrop-blur-sm'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <h4 className='mb-2 text-sm font-semibold'>System Status</h4>
            <div className='space-y-1'>
              {SYSTEM_NODES.slice(0, 3).map((node) => (
                <div key={node.id} className='flex items-center gap-2 text-xs'>
                  <div className='h-2 w-2 rounded-full' style={{ backgroundColor: node.color }} />
                  <span className='text-muted-foreground'>{node.name}</span>
                  <span className='font-medium text-green-500'>●</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DataFlowVisualization;
