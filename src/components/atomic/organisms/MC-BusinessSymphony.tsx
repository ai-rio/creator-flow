'use client';

import { motion } from 'framer-motion';
import { DollarSign, Flame, Package, Palette, Truck, Video } from 'lucide-react';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// Component imports
import { AnimatedNumber } from '../molecules/MC-AnimatedNumber';
import { GlassPane } from '../molecules/MC-GlassPane';
import { Sparkline } from '../molecules/MC-Sparkline';

// ==================== TYPE DEFINITIONS ====================

interface BusinessStats {
  revenue: number;
  revenueTrend: number[];
  unitsSold: number;
  autoFulfilledPercent: number;
  unitsShipped: number;
  shippingSavings: number;
  topVideo: {
    id: string;
    orders: number;
  };
}

interface BusinessSymphonyProps {
  stats?: BusinessStats;
  className?: string;
  delay?: number;
}

// ==================== MAIN COMPONENT ====================

/**
 * Business Symphony card displaying today's key business metrics
 * Features revenue trends, unit sales, shipping stats, and viral video performance
 */
export function BusinessSymphony({
  stats = {
    revenue: 12847,
    revenueTrend: [5, 10, 20, 40, 30, 60, 75, 90],
    unitsSold: 1247,
    autoFulfilledPercent: 98,
    unitsShipped: 347,
    shippingSavings: 1200,
    topVideo: { id: 'xyz789', orders: 2300 },
  },
  className,
  delay = 0.5,
}: BusinessSymphonyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' as any, stiffness: 100, damping: 20, delay }}
      className={cn('', className)}
    >
      <GlassPane className='rounded-xl p-4'>
        {/* Header */}
        <div className='mb-4 flex items-center gap-2'>
          <Palette className='text-muted-foreground' />
          <h2 className='text-lg font-semibold text-foreground'>Today&apos;s Business Symphony</h2>
        </div>

        <div className='space-y-4'>
          {/* Revenue Section with Sparkline */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <DollarSign className='text-emerald-600 dark:text-emerald-400' size={24} />
              <span className='text-3xl font-bold text-foreground'>
                <AnimatedNumber value={stats.revenue} isCurrency />
              </span>
            </div>
            <div className='w-1/3'>
              <Sparkline data={stats.revenueTrend} className='text-emerald-600 dark:text-emerald-400' />
            </div>
          </div>

          {/* Units Sold */}
          <div className='flex items-center gap-3 rounded-lg bg-muted/20 p-2'>
            <Package className='text-primary' />
            <p className='font-semibold text-foreground'>
              <AnimatedNumber value={stats.unitsSold} /> units
            </p>
            <p className='text-sm text-muted-foreground'>({stats.autoFulfilledPercent}% auto)</p>
          </div>

          {/* Units Shipped */}
          <div className='flex items-center gap-3 rounded-lg bg-muted/20 p-2'>
            <Truck className='text-primary' />
            <p className='font-semibold text-foreground'>
              <AnimatedNumber value={stats.unitsShipped} /> shipped
            </p>
            <p className='text-sm text-muted-foreground'>
              (<AnimatedNumber value={stats.shippingSavings} isCurrency /> saved)
            </p>
          </div>

          {/* Top Video Performance */}
          <div className='flex items-center gap-3 rounded-lg bg-muted/20 p-2'>
            <Video className='text-destructive dark:text-destructive' />
            <p className='font-semibold text-foreground'>Video #{stats.topVideo.id}:</p>
            <p className='text-sm text-muted-foreground'>
              <AnimatedNumber value={stats.topVideo.orders} /> orders
            </p>
            <Flame className='text-destructive dark:text-destructive' size={16} />
          </div>
        </div>
      </GlassPane>
    </motion.div>
  );
}

export default BusinessSymphony;
