'use client';

import { motion } from 'framer-motion';
import { Bot, Clock, Wand2 } from 'lucide-react';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// Component imports
import { AnimatedNumber } from '../molecules/MC-AnimatedNumber';
import { CircularProgress } from '../molecules/MC-CircularProgress';
import { GlassPane } from '../molecules/MC-GlassPane';

// ==================== TYPE DEFINITIONS ====================

interface AutomationStats {
  hoursSaved: number;
  tasksAutomated: number;
  flowHealth: number;
}

interface LiberationOrchestraProps {
  stats?: AutomationStats;
  onViewOrchestra?: () => void;
  onOptimize?: () => void;
  className?: string;
  delay?: number;
}

// ==================== MAIN COMPONENT ====================

/**
 * Liberation Orchestra card displaying automation statistics and health metrics
 * Features circular progress indicator and automation controls
 */
export function LiberationOrchestra({
  stats = {
    hoursSaved: 47,
    tasksAutomated: 89,
    flowHealth: 96,
  },
  onViewOrchestra,
  onOptimize,
  className,
  delay = 1.1,
}: LiberationOrchestraProps) {
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
          <Bot className='text-muted-foreground' />
          <h2 className='text-lg font-semibold text-foreground'>Liberation Orchestra</h2>
        </div>

        <div className='flex items-center justify-between gap-4'>
          {/* Stats Section */}
          <div className='flex-1 space-y-3'>
            {/* Hours Saved */}
            <div className='flex items-center gap-3'>
              <Clock className='text-primary' size={24} />
              <div>
                <div className='text-2xl font-bold text-foreground'>
                  <AnimatedNumber value={stats.hoursSaved} />
                </div>
                <div className='text-sm text-muted-foreground'>hours saved</div>
              </div>
            </div>

            {/* Tasks Automated */}
            <div className='flex items-center gap-3'>
              <Wand2 className='text-primary' size={24} />
              <div>
                <div className='text-2xl font-bold text-foreground'>
                  <AnimatedNumber value={stats.tasksAutomated} />
                </div>
                <div className='text-sm text-muted-foreground'>tasks automated</div>
              </div>
            </div>
          </div>

          {/* Flow Health Circular Progress */}
          <div className='flex-shrink-0'>
            <CircularProgress percentage={stats.flowHealth} />
            <p className='mt-1 text-center text-xs text-muted-foreground'>Flow Health</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-4 grid grid-cols-2 gap-2'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewOrchestra}
            className='rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-900 dark:hover:bg-emerald-600'
          >
            View Orchestra
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOptimize}
            className='rounded-lg bg-muted/50 px-3 py-2 text-sm font-bold text-foreground hover:bg-muted/70'
          >
            Optimize
          </motion.button>
        </div>
      </GlassPane>
    </motion.div>
  );
}

export default LiberationOrchestra;
