'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Download } from 'lucide-react';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// Component imports
import { GlassPane } from '../molecules/MC-GlassPane';
import { InsightIcon } from '../molecules/MC-InsightIcon';

// ==================== TYPE DEFINITIONS ====================

interface InsightItem {
  id: number;
  type: 'performance' | 'trend' | 'ai';
  title: string;
  subtitle: string;
}

interface IntelligenceBriefingProps {
  insights?: InsightItem[];
  onStrategicDashboard?: () => void;
  onExport?: () => void;
  className?: string;
  delay?: number;
}

// ==================== MAIN COMPONENT ====================

/**
 * Intelligence Briefing card displaying AI-generated insights and strategic recommendations
 * Features staggered insight animations and action buttons
 */
export function IntelligenceBriefing({
  insights = [
    {
      id: 1,
      type: 'performance',
      title: 'Content ROI: $247/video avg',
      subtitle: 'Focus on short-form unboxing videos.',
    },
    {
      id: 2,
      type: 'trend',
      title: 'Growth: 340%/yr sustainable',
      subtitle: 'Based on current supply chain capacity.',
    },
    {
      id: 3,
      type: 'ai',
      title: 'Next: EU expansion ready',
      subtitle: 'AI recommends targeting Germany & France.',
    },
  ],
  onStrategicDashboard,
  onExport,
  className,
  delay = 1.4,
}: IntelligenceBriefingProps) {
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
          <BrainCircuit className='text-muted-foreground' />
          <h2 className='text-lg font-semibold text-foreground'>Your Intelligence Briefing</h2>
        </div>

        {/* Insights List */}
        <motion.div
          className='space-y-4'
          initial='hidden'
          animate='visible'
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: delay + 0.2,
              },
            },
          }}
        >
          {insights.map((insight) => (
            <motion.div
              key={insight.id}
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: { x: 0, opacity: 1 },
              }}
              className='flex items-start gap-3'
            >
              <div className='mt-1'>
                <InsightIcon type={insight.type} />
              </div>
              <div>
                <p className='font-bold text-foreground'>{insight.title}</p>
                <p className='text-sm text-muted-foreground'>{insight.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <div className='mt-4 grid grid-cols-2 gap-2 border-t border-border/20 pt-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStrategicDashboard}
            className='rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:text-slate-900 dark:hover:bg-emerald-600'
          >
            Strategic Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className='flex items-center justify-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm font-bold text-foreground hover:bg-muted/70'
          >
            <Download size={14} />
            Export
          </motion.button>
        </div>
      </GlassPane>
    </motion.div>
  );
}

export default IntelligenceBriefing;
