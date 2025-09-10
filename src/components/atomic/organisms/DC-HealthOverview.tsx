/* eslint-disable */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Clapperboard, ShoppingCart, Target, Truck } from 'lucide-react';

// Glass morphism component with design system tokens
const GlassPane: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-border bg-white/60 backdrop-blur-xl dark:border-border/20 dark:bg-slate-900/50 ${className}`}
  >
    {children}
  </div>
);

// Health metric card component
const HealthMetricCard = ({
  icon,
  title,
  metrics,
  status,
  colorClass,
}: {
  icon: React.ReactElement;
  title: string;
  metrics: string[];
  status: 'automated' | 'tiktok';
  colorClass: string;
}) => {
  const statusConfig = {
    automated: {
      text: 'Automated',
      color: 'bg-teal-700 dark:bg-teal-400',
    },
    tiktok: {
      text: 'Healthy',
      color: 'bg-green-600 dark:bg-green-400',
    },
  };

  return (
    <GlassPane className='flex flex-col justify-between p-4'>
      <div>
        <div className='mb-2 flex items-center gap-3'>
          {React.cloneElement(icon, { className: colorClass })}
          <h3 className='font-bold text-foreground'>{title}</h3>
        </div>
        <ul className='space-y-1 text-sm text-foreground/80 dark:text-foreground/70'>
          {metrics.map((metric: string, i: number) => (
            <li key={i} className='text-foreground/80 dark:text-foreground/70'>
              {metric}
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-4 flex items-center gap-2'>
        <div className={`h-2.5 w-2.5 rounded-full ${statusConfig[status].color}`}></div>
        <span className='text-xs font-semibold text-foreground/90 dark:text-foreground/80'>
          {statusConfig[status].text}
        </span>
      </div>
    </GlassPane>
  );
};

// Main component - Extracted UnifiedSystemHealthCard from DC-040
const DCHealthOverview = () => {
  const healthData = [
    {
      icon: <ShoppingCart size={20} />,
      title: 'Orders',
      metrics: ['500/day avg', '96% automated', '12s avg proc'],
      status: 'automated' as const,
      colorClass: 'text-purple-700 dark:text-purple-400',
    },
    {
      icon: <Box size={20} />,
      title: 'Inventory',
      metrics: ['1,247 SKUs', '3.2s sync', '99.9% accuracy'],
      status: 'automated' as const,
      colorClass: 'text-blue-700 dark:text-blue-400',
    },
    {
      icon: <Truck size={20} />,
      title: 'Shipping',
      metrics: ['4 carriers', '<30s labels', '$1.2K saved'],
      status: 'automated' as const,
      colorClass: 'text-purple-700 dark:text-purple-400',
    },
    {
      icon: <Clapperboard size={20} />,
      title: 'TikTok',
      metrics: ['API healthy', '<500ms resp', '99.9% uptime'],
      status: 'tiktok' as const,
      colorClass: 'text-blue-700 dark:text-blue-400',
    },
  ];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            staggerChildren: 0.1,
          },
        },
      }}
      initial='hidden'
      animate='visible'
      className='space-y-4'
    >
      <div className='flex items-center gap-3 px-2'>
        <Target className='text-purple-700 dark:text-purple-400' />
        <h2 className='text-xl font-bold text-foreground'>UNIFIED SYSTEM HEALTH OVERVIEW</h2>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {healthData.map((data, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <HealthMetricCard {...data} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DCHealthOverview;
