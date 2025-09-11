'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// Component imports
import { GlassPane } from '../molecules/MC-GlassPane';
import { StatusIcon } from '../molecules/MC-StatusIcon';
import { SwipeActions } from '../molecules/MC-SwipeActions';

// ==================== TYPE DEFINITIONS ====================

export interface OrderData {
  id: string;
  customer: string;
  product: string;
  value: number;
  status: 'Auto-Processing' | 'Shipped' | 'Processing' | 'Cancelled';
  source: 'viral' | 'high_priority' | 'standard';
  statusIcon?: React.ReactNode;
}

interface OrderCardProps {
  order: OrderData;
  onSwipeLeft?: (order: OrderData) => void;
  onSwipeRight?: (order: OrderData) => void;
  onCeoOverride?: (order: OrderData) => void;
  onViewJourney?: (order: OrderData) => void;
  className?: string;
}

// ==================== HELPER FUNCTIONS ====================

const getStatusIconType = (status: string) => {
  switch (status) {
    case 'Auto-Processing':
      return 'auto-processing';
    case 'Shipped':
      return 'shipped';
    default:
      return 'auto-processing';
  }
};

const getSourceIconType = (source: string) => {
  switch (source) {
    case 'viral':
      return 'viral';
    case 'high_priority':
      return 'high-priority';
    default:
      return 'auto-processing';
  }
};

// ==================== MAIN COMPONENT ====================

/**
 * Swipeable order card component with gesture interactions
 * Features swipe-to-action functionality, status indicators, and action buttons
 */
export function OrderCard({
  order,
  onSwipeLeft,
  onSwipeRight,
  onCeoOverride,
  onViewJourney,
  className = '',
}: OrderCardProps) {
  const x = useMotionValue(0);
  const background = useTransform(x, [-100, 0, 100], ['#ef4444', '#334155', '#22c55e']);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX < -50) {
      onSwipeLeft?.(order);
    } else if (currentX > 50) {
      onSwipeRight?.(order);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <SwipeActions background={background} />

      <motion.div
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x }}
        className='relative z-10'
        onDragEnd={handleDragEnd}
      >
        <GlassPane className='rounded-2xl p-4'>
          <div className='flex items-start justify-between'>
            <div>
              <div className='flex items-center gap-2'>
                {order.source === 'viral' && <StatusIcon type={getSourceIconType(order.source)} size={20} />}
                <p className='text-lg font-bold text-foreground'>{order.id}</p>
              </div>
              <p className='text-sm text-foreground/60'>
                {order.customer} • {order.product}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-lg font-bold text-foreground'>${order.value.toFixed(2)}</p>
              <div className='mt-1 flex items-center justify-end gap-1.5'>
                <StatusIcon type={getStatusIconType(order.status)} size={16} />
                <p className='text-xs font-semibold text-foreground/60'>{order.status}</p>
              </div>
            </div>
          </div>

          <div className='mt-4 flex gap-2'>
            <button
              onClick={() => onCeoOverride?.(order)}
              className={cn(
                'w-full rounded-lg px-3 py-2 text-xs font-bold',
                'bg-foreground text-background',
                'transition-opacity hover:opacity-80'
              )}
            >
              CEO Override
            </button>
            <button
              onClick={() => onViewJourney?.(order)}
              className={cn(
                'w-full rounded-lg border px-3 py-2 text-xs font-bold',
                'border-border/50 bg-transparent text-foreground',
                'transition-colors hover:bg-muted/50'
              )}
            >
              View Journey
            </button>
          </div>
        </GlassPane>
      </motion.div>
    </div>
  );
}

export default OrderCard;
