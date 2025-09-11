'use client';

import { motion } from 'framer-motion';
import { Crosshair, Sparkles, TrendingUp } from 'lucide-react';
import React from 'react';

// ==================== TYPE DEFINITIONS ====================

type InsightType = 'performance' | 'trend' | 'ai';

interface InsightIconProps {
  type: InsightType;
  size?: number;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Insight icon component with animated icons for different insight types
 * Includes special pulsing animation for AI insights
 */
export function InsightIcon({ type, size = 20, className = '' }: InsightIconProps) {
  const iconMap = {
    performance: <Crosshair className='text-emerald-600 dark:text-emerald-400' size={size} />,
    trend: <TrendingUp className='text-amber-600 dark:text-amber-400' size={size} />,
    ai: (
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sparkles className='text-primary dark:text-primary' size={size} />
      </motion.div>
    ),
  };

  return <div className={className}>{iconMap[type] || iconMap.performance}</div>;
}

export default InsightIcon;
