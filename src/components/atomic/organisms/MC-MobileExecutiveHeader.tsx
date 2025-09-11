'use client';

import { motion } from 'framer-motion';
import { Bot, Flame, Target, Zap } from 'lucide-react';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface SystemStatus {
  sales: 'nominal' | 'warning' | 'critical';
  viral: 'nominal' | 'warning' | 'critical';
  automation: 'nominal' | 'warning' | 'critical';
}

interface User {
  handle: string;
  avatarUrl: string;
}

interface MobileExecutiveHeaderProps {
  systemStatus?: SystemStatus;
  user?: User;
  className?: string;
}

// ==================== SUPPORTING COMPONENTS ====================

/**
 * Glass morphism pane with proper design system tokens
 */
const GlassPane = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      'border border-border/10 bg-background/30 shadow-lg backdrop-blur-xl',
      'dark:border-border/10 dark:bg-background/20',
      className
    )}
  >
    {children}
  </div>
);

/**
 * Status indicator icon with proper contrast tokens
 */
const StatusIcon = ({ icon: Icon, status }: { icon: any; status: SystemStatus['sales'] }) => {
  const statusStyles = {
    nominal: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    critical: 'text-destructive dark:text-destructive',
  };

  return <Icon size={20} className={statusStyles[status] || statusStyles.nominal} />;
};

// ==================== MAIN COMPONENT ====================

/**
 * Mobile executive header with CreatorFlow branding, system status indicators, and user avatar
 * Features glass morphism design and smooth animations
 */
export function MobileExecutiveHeader({
  systemStatus = { sales: 'nominal', viral: 'warning', automation: 'nominal' },
  user = { handle: '@creator', avatarUrl: 'https://placehold.co/64x64/0A090F/FFF?text=CEO' },
  className,
}: MobileExecutiveHeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
      className={cn('fixed left-2 right-2 top-2 z-40', className)}
    >
      <GlassPane className='rounded-xl px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Brand Logo */}
          <div className='flex items-center gap-2'>
            <Zap className='text-primary dark:text-primary' size={24} />
            <h1 className='text-lg font-bold text-foreground'>CreatorFlow</h1>
          </div>

          {/* System Status Indicators */}
          <div className='flex items-center gap-4'>
            <StatusIcon icon={Target} status={systemStatus.sales} />
            <StatusIcon icon={Flame} status={systemStatus.viral} />
            <StatusIcon icon={Bot} status={systemStatus.automation} />
          </div>

          {/* User Avatar */}
          <motion.div
            className='flex cursor-pointer items-center gap-2'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className='hidden text-sm font-semibold text-muted-foreground sm:inline'>{user.handle}</span>
            <img src={user.avatarUrl} alt='User Avatar' className='h-8 w-8 rounded-full border-2 border-primary/50' />
          </motion.div>
        </div>
      </GlassPane>
    </motion.header>
  );
}

export default MobileExecutiveHeader;
