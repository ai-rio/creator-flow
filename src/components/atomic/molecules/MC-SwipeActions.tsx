'use client';

import { motion, MotionValue } from 'framer-motion';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface SwipeActionsProps {
  background: MotionValue<string>;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Swipe action background component for mobile gestures
 * Displays contextual actions when orders are swiped left/right
 */
export function SwipeActions({ background, className = '' }: SwipeActionsProps) {
  return (
    <motion.div
      style={{ background }}
      className={cn(
        'absolute inset-0 flex items-center justify-between rounded-2xl px-8 font-bold text-white',
        className
      )}
    >
      <span className='opacity-50'>Cancel</span>
      <span className='opacity-50'>Approve</span>
    </motion.div>
  );
}

export default SwipeActions;
