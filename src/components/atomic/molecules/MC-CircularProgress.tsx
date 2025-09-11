'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import React, { useEffect } from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
}

// ==================== MAIN COMPONENT ====================

/**
 * Circular progress indicator with animated stroke and percentage display
 * Uses spring physics for smooth percentage updates
 */
export function CircularProgress({
  percentage,
  size = 96, // 24 * 4 = 96px (h-24 w-24)
  strokeWidth = 10,
  className = '',
  showPercentage = true,
}: CircularProgressProps) {
  const radius = 40; // Fixed radius for consistent proportions
  const circumference = 2 * Math.PI * radius;

  // Spring animation for smooth percentage changes
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const progressText = useTransform(spring, (latest) => `${Math.round(latest)}%`);

  useEffect(() => {
    spring.set(percentage);
  }, [percentage, spring]);

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg className='h-full w-full' viewBox='0 0 100 100'>
        {/* Background circle */}
        <circle
          cx='50'
          cy='50'
          r={radius}
          strokeWidth={strokeWidth}
          className='stroke-muted/20 dark:stroke-muted/10'
          fill='transparent'
        />

        {/* Progress circle */}
        <motion.circle
          cx='50'
          cy='50'
          r={radius}
          strokeWidth={strokeWidth}
          className='stroke-emerald-600 dark:stroke-emerald-400'
          fill='transparent'
          strokeDasharray={circumference}
          strokeLinecap='round'
          transform='rotate(-90 50 50)'
          style={{
            strokeDashoffset: useTransform(spring, (p) => circumference - (p / 100) * circumference),
          }}
        />
      </svg>

      {/* Percentage text */}
      {showPercentage && (
        <motion.div className='absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground'>
          {progressText}
        </motion.div>
      )}
    </div>
  );
}

export default CircularProgress;
