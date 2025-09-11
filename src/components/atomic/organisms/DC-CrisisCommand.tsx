'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Flame, Star } from 'lucide-react';
import * as React from 'react';

// --- BASE COMPONENT: GlassPane ---
const GlassPane = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/50 backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-400/10 ${className}`}
  >
    {children}
  </div>
);

// --- HELPER COMPONENT: SystemStatus ---
interface SystemStatusProps {
  system: string;
  status: 'ok' | 'warn';
}

const SystemStatus: React.FC<SystemStatusProps> = ({ system, status }) => {
  const statusConfig = {
    ok: {
      icon: <CheckCircle2 size={16} />,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
    warn: {
      icon: <AlertTriangle size={16} />,
      color: 'text-amber-600 dark:text-amber-400',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`flex items-center gap-1 font-semibold ${config.color}`}>
      {system}
      {config.icon}
    </span>
  );
};

// --- MAIN COMPONENT: CrisisCommandCenterCard ---
export const CrisisCommandCenterCard: React.FC = () => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as any, delay: 0.2 } },
      }}
      initial='hidden'
      animate='visible'
      className='space-y-4'
    >
      <div className='flex items-center gap-3 px-2'>
        <Flame className='text-amber-600 dark:text-amber-400' />
        <h2 className='text-xl font-bold text-foreground'>CROSS-SYSTEM CRISIS COMMAND CENTER</h2>
      </div>
      <GlassPane className='space-y-4 p-6'>
        <div className='flex items-center gap-3'>
          <Star className='text-amber-600 dark:text-amber-400' size={24} />
          <p className='text-lg font-bold text-foreground'>VIRAL ALERT: Video #xyz789 driving massive order spike</p>
        </div>
        <div className='space-y-3 pl-9 text-sm text-foreground/80'>
          <p>
            <span className='font-bold'>🎯 Impact:</span> +347 orders in 2h, inventory critical, ship ready
          </p>
          <div className='flex items-center gap-4'>
            <span className='font-bold'>📊 Cross-System Status:</span>
            <SystemStatus system='Orders' status='ok' />
            <SystemStatus system='Inventory' status='warn' />
            <SystemStatus system='Shipping' status='ok' />
            <SystemStatus system='TikTok' status='ok' />
          </div>
          <p>
            <span className='font-bold'>⚡ Auto-Actions:</span> Inventory scaling, shipping optimization active
          </p>
        </div>
        <div className='flex items-center gap-3 pl-9 pt-4'>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          >
            Scale All Systems
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2'
          >
            CEO Override
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='rounded-lg bg-destructive/20 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/30 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2'
          >
            Emergency Protocol
          </motion.button>
        </div>
      </GlassPane>
    </motion.div>
  );
};

export default CrisisCommandCenterCard;
