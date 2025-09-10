/* eslint-disable */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

// Glass morphism component with design system tokens
const GlassPane: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-border bg-white/60 backdrop-blur-xl dark:border-border/20 dark:bg-slate-900/50 ${className}`}
  >
    {children}
  </div>
);

// Performance bar component
const PerformanceBar = ({ label, percentage }: { label: string; percentage: number }) => {
  const getColor = (p: number) => {
    if (p >= 90) return 'bg-green-600 dark:bg-green-500';
    if (p >= 80) return 'bg-amber-500';
    return 'bg-red-600 dark:bg-red-500';
  };

  return (
    <div className='flex items-center gap-4 text-sm'>
      <span className='w-40 font-semibold text-foreground/90 dark:text-foreground/80'>{label}:</span>
      <div className='h-2.5 flex-1 overflow-hidden rounded-full bg-muted/40'>
        <motion.div
          className={`h-full rounded-full ${getColor(percentage)}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        />
      </div>
      <span className='w-16 font-bold text-foreground'>{percentage}%</span>
    </div>
  );
};

// Main component - Extracted SystemPerformanceArtistryCard from DC-050
const DCPerformanceArtistry = () => {
  const performanceData = [
    { label: 'Order Processing Flow', percentage: 82 },
    { label: 'Inventory Sync Health', percentage: 89 },
    { label: 'Shipping Automation', percentage: 96 },
    { label: 'TikTok Integration', percentage: 91 },
  ];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring' },
        },
      }}
      initial='hidden'
      animate='visible'
      className='space-y-4'
    >
      <div className='flex items-center gap-3 px-2'>
        <Palette className='text-purple-700 dark:text-purple-400' />
        <h2 className='text-xl font-bold text-foreground'>CROSS-SYSTEM PERFORMANCE ARTISTRY</h2>
      </div>
      <GlassPane className='space-y-4 p-6'>
        <div className='space-y-3'>
          {performanceData.map((item) => (
            <PerformanceBar key={item.label} {...item} />
          ))}
        </div>
        <div className='relative overflow-hidden rounded-lg pt-4 text-center'>
          <motion.div
            className='absolute inset-0'
            animate={{
              background: [
                'linear-gradient(90deg, hsla(260, 80%, 60%, 0.2) 0%, hsla(160, 80%, 40%, 0.2) 100%)',
                'linear-gradient(90deg, hsla(160, 80%, 40%, 0.2) 0%, hsla(260, 80%, 60%, 0.2) 100%)',
                'linear-gradient(90deg, hsla(260, 80%, 60%, 0.2) 0%, hsla(160, 80%, 40%, 0.2) 100%)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className='relative p-4'>
            <h3 className='text-sm font-bold tracking-wider text-foreground/90 dark:text-foreground/80'>
              SYSTEM SYMPHONY HARMONY SCORE
            </h3>
            <p className='mt-1 bg-gradient-to-r from-purple-700 to-teal-500 bg-clip-text text-5xl font-bold text-transparent dark:from-purple-400 dark:to-teal-300'>
              94%
            </p>
          </div>
        </div>
        <div className='flex items-center justify-center gap-3 pt-4'>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='rounded-lg bg-muted/40 px-4 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted/60'
          >
            System Deep Dive
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='rounded-lg bg-muted/20 px-4 py-2 text-sm font-bold text-foreground/80 transition-colors hover:bg-muted/40 hover:text-foreground dark:text-foreground/70'
          >
            Performance Optimization
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='rounded-lg bg-muted/20 px-4 py-2 text-sm font-bold text-foreground/80 transition-colors hover:bg-muted/40 hover:text-foreground dark:text-foreground/70'
          >
            Export Report
          </motion.button>
        </div>
      </GlassPane>
    </motion.div>
  );
};

export default DCPerformanceArtistry;
