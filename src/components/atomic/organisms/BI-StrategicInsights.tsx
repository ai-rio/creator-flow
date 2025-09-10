/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface Insight {
  Icon: LucideIcon;
  text: string;
  highlight: string;
  color: string;
  isHeartbeat?: boolean;
}

interface AIRecommendation {
  Icon: LucideIcon;
  text: string;
  highlight: string;
  color: string;
}

interface StrategicInsightsProps {
  title?: string;
  subtitle?: string;
  insights: Insight[];
  aiRecommendation?: AIRecommendation;
  headerIcon?: LucideIcon;
}

const StrategicInsights: React.FC<StrategicInsightsProps> = ({
  title = 'CEO Strategic Insights',
  subtitle = 'Your automated competitive edge.',
  insights,
  aiRecommendation,
  headerIcon: HeaderIcon,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40, rotate: -5, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 25 },
    },
  };

  const HeartbeatWrapper: React.FC<{ children: React.ReactNode; isHeartbeat?: boolean }> = ({
    children,
    isHeartbeat,
  }) =>
    isHeartbeat ? (
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        className='rounded-premium'
        style={{
          boxShadow: '0 0 20px 0 hsl(var(--primary) / 0.4)',
        }}
      >
        {children}
      </motion.div>
    ) : (
      <>{children}</>
    );

  return (
    <motion.div
      className='rounded-executive border border-border bg-background/95 shadow-xl backdrop-blur-lg'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
    >
      <motion.div
        animate={{ y: [-2, 2, -2], rotate: [-0.3, 0.3, -0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className='flex items-center gap-tactical border-b border-border p-strategic'>
          {HeaderIcon && (
            <motion.div
              animate={{ rotate: [0, 5, -5, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <HeaderIcon className='h-icon-lg w-icon-lg text-primary' />
            </motion.div>
          )}
          <div>
            <h2 className='text-heading-lg font-bold text-foreground'>{title}</h2>
            <p className='mt-1 text-body-sm text-muted-foreground'>{subtitle}</p>
          </div>
        </div>

        <motion.ul
          className='space-y-tactical p-strategic'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {insights.map((insight, index) => (
            <HeartbeatWrapper key={index} isHeartbeat={insight.isHeartbeat}>
              <motion.li className='flex items-start gap-tactical rounded-premium p-tactical' variants={itemVariants}>
                <insight.Icon className={`mt-0.5 h-icon-md w-icon-md flex-shrink-0 ${insight.color}`} />
                <p className='text-body-md text-foreground'>
                  {insight.text}
                  <span className='font-semibold text-foreground'>{insight.highlight}</span>
                </p>
              </motion.li>
            </HeartbeatWrapper>
          ))}
        </motion.ul>

        {aiRecommendation && (
          <motion.div
            className='overflow-hidden'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className='border-t border-border bg-muted/20 p-strategic'>
              <motion.div
                className='flex items-start gap-tactical'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <aiRecommendation.Icon
                  className={`mt-0.5 h-icon-md w-icon-md flex-shrink-0 ${aiRecommendation.color}`}
                />
                <p className='text-body-md text-foreground'>
                  <span className='font-bold'>{aiRecommendation.text}</span>
                  <span className='font-semibold text-primary'>{aiRecommendation.highlight}</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export { StrategicInsights };
export type { Insight, AIRecommendation, StrategicInsightsProps };
