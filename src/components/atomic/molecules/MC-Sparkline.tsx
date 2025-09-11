'use client';

import { motion } from 'framer-motion';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface SparklineProps {
  data: number[];
  className?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  animationDuration?: number;
}

// ==================== MAIN COMPONENT ====================

/**
 * Sparkline chart component with smooth path animation
 * Displays trend data as a simple line chart
 */
export function Sparkline({
  data,
  className = '',
  width = 100,
  height = 20,
  strokeWidth = 2,
  animationDuration = 1.5,
}: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);

  // Generate SVG path points
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('h-auto w-full', className)} preserveAspectRatio='none'>
      <motion.polyline
        fill='none'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
        points={points}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: animationDuration, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default Sparkline;
