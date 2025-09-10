/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface FlowStage {
  name: string;
  value: number;
  Icon: LucideIcon;
  color: string;
  automated?: boolean;
}

interface FlowMetric {
  title: string;
  percentage?: number;
  beforeValue?: string;
  afterValue?: string;
  description?: string;
}

interface FlowVisualizationProps {
  title?: string;
  subtitle?: string;
  stages: FlowStage[];
  metrics?: FlowMetric[];
}

const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <div className='h-2.5 w-full overflow-hidden rounded-full bg-muted'>
      <motion.div
        className='to-brand-purple-primary h-2.5 rounded-full bg-gradient-to-r from-brand-teal-primary'
        initial={{ width: '0%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </div>
  );
};

const FlowVisualization: React.FC<FlowVisualizationProps> = ({
  title = 'Order Flow Visualization',
  subtitle = 'Your entire operation, automated and clarified.',
  stages,
  metrics = [],
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className='rounded-executive border border-border bg-background/95 p-strategic shadow-xl backdrop-blur-lg'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.h2 variants={itemVariants} className='mb-tactical text-heading-lg font-bold text-foreground'>
        {title}
      </motion.h2>
      <motion.p variants={itemVariants} className='mb-strategic text-body-md text-muted-foreground'>
        {subtitle}
      </motion.p>

      {/* Flow Stages */}
      <div className='relative mb-strategic flex items-center justify-between'>
        {/* Animated flow line */}
        <div className='absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted'>
          <motion.div
            className='via-brand-purple-primary h-full bg-gradient-to-r from-blue-500 via-brand-teal-primary to-green-500'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'circOut', delay: 0.5 }}
          >
            <motion.div
              className='h-2 w-2 animate-pulse rounded-full bg-primary shadow-primary/50'
              style={{
                boxShadow: '0 0 10px 2px hsl(var(--primary))',
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            />
          </motion.div>
        </div>

        {stages.map((stage) => (
          <motion.div key={stage.name} variants={itemVariants} className='z-10 text-center'>
            <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-border bg-background'>
              <stage.Icon size={32} className={stage.color} />
            </div>
            <p className='mt-tactical font-semibold text-foreground'>{stage.name}</p>
            <p className='font-mono text-metric-lg font-bold text-foreground'>{stage.value}</p>
            {stage.automated && <p className='text-xs text-brand-teal-primary'>(automated)</p>}
          </motion.div>
        ))}
      </div>

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className='space-y-strategic border-t border-border pt-strategic'>
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={itemVariants}>
              {metric.percentage !== undefined ? (
                <>
                  <div className='mb-tactical flex items-center justify-between'>
                    <h3 className='text-heading-md font-semibold text-foreground'>{metric.title}</h3>
                    <p className='font-mono text-metric-md font-bold text-brand-teal-primary'>{metric.percentage}%</p>
                  </div>
                  <ProgressBar percentage={metric.percentage} />
                </>
              ) : (
                <>
                  <h3 className='text-heading-md font-semibold text-foreground'>{metric.title}</h3>
                  {metric.beforeValue && metric.afterValue && (
                    <p className='mt-tactical text-muted-foreground'>
                      Average <span className='font-mono line-through'>{metric.beforeValue}</span> →{' '}
                      <span className='text-brand-purple-primary font-mono text-metric-lg font-bold'>
                        {metric.afterValue}
                      </span>{' '}
                      {metric.description}
                    </p>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export { FlowVisualization };
export type { FlowStage, FlowMetric, FlowVisualizationProps };
