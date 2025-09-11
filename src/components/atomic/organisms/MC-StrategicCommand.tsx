'use client';

import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// Component imports
import { AlertIcon } from '../molecules/MC-AlertIcon';
import { GlassPane } from '../molecules/MC-GlassPane';

// ==================== TYPE DEFINITIONS ====================

interface StrategicAlert {
  id: number;
  type: 'critical' | 'insight' | 'operational';
  text: string;
  source: string;
}

interface StrategicCommandProps {
  alerts?: StrategicAlert[];
  onAutoScale?: () => void;
  onManual?: () => void;
  className?: string;
  delay?: number;
}

// ==================== MAIN COMPONENT ====================

/**
 * Strategic Command card displaying critical alerts and automation controls
 * Features staggered alert animations and action buttons
 */
export function StrategicCommand({
  alerts = [
    { id: 1, type: 'critical', text: 'Low stock on "Viral Tee"', source: 'Inventory' },
    { id: 2, type: 'insight', text: 'Viral spike: Scale inventory?', source: 'TikTok' },
    { id: 3, type: 'operational', text: 'Carrier issue: UPS delayed', source: 'Shipping' },
  ],
  onAutoScale,
  onManual,
  className,
  delay = 0.8,
}: StrategicCommandProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
      className={cn('', className)}
    >
      <GlassPane className='rounded-xl p-4'>
        {/* Header */}
        <div className='mb-4 flex items-center gap-2'>
          <Target className='text-muted-foreground' />
          <h2 className='text-lg font-semibold text-foreground'>Strategic Command</h2>
        </div>

        {/* Alerts List */}
        <motion.div
          className='mb-4 space-y-3'
          initial='hidden'
          animate='visible'
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: delay + 0.2,
              },
            },
          }}
        >
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              className='flex items-center justify-between rounded-lg bg-muted/20 p-2'
            >
              <div className='flex items-center gap-3'>
                <AlertIcon type={alert.type} />
                <p className='text-sm font-semibold text-foreground'>{alert.text}</p>
              </div>
              <span className='rounded-full bg-muted/30 px-2 py-0.5 text-xs font-medium text-muted-foreground'>
                {alert.source}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <div className='grid grid-cols-3 gap-2'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAutoScale}
            className='col-span-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-900 dark:hover:bg-emerald-600'
          >
            Auto-Scale
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onManual}
            className='rounded-lg bg-muted/50 px-3 py-2 text-sm font-bold text-foreground hover:bg-muted/70'
          >
            Manual
          </motion.button>
        </div>
      </GlassPane>
    </motion.div>
  );
}

export default StrategicCommand;
