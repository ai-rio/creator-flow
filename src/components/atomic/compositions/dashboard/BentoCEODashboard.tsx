'use client';

import { motion } from 'framer-motion';
import { BarChart3, BrainCircuit, Command, Palette, Zap } from 'lucide-react';
import React from 'react';

// Magic UI imports
import NumberTicker from '@/components/magicui/number-ticker';
import Particles from '@/components/magicui/particles';
import { cn } from '@/utils/cn';

// Note: Using the default exports for now, will create wrappers
import AutomationOrchestra from '../../organisms/AL-AutomationOrchestra';
import ExecutiveIntelligence from '../../organisms/BI-ExecutiveIntelligence';
// Organism imports (fixed imports)
import { BusinessSymphony } from '../../organisms/MC-BusinessSymphony';
import { StrategicCommand } from '../../organisms/MC-StrategicCommand';
// Atomic component imports
import { BentoCard, BentoGrid, BentoSection } from '../layouts/BentoGrid';

// ==================== TYPE DEFINITIONS ====================

export interface DashboardStats {
  todayRevenue: number;
  monthlyRevenue: number;
  ordersProcessed: number;
  automationSavings: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

export interface BentoCEODashboardProps {
  stats?: DashboardStats;
  className?: string;
  userId?: string;
}

// ==================== QUICK METRICS COMPONENT ====================

const QuickMetrics: React.FC<{ stats: DashboardStats }> = ({ stats }) => {
  return (
    <div className='grid grid-cols-2 gap-4 p-6'>
      {/* Today's Revenue */}
      <div className='rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4'>
        <div className='mb-2 flex items-center gap-2'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-emerald-500' />
          <span className='text-xs font-medium text-emerald-600 dark:text-emerald-400'>Today&apos;s Revenue</span>
        </div>
        <div className='text-2xl font-bold text-foreground'>
          $<NumberTicker value={stats.todayRevenue} decimalPlaces={0} />
        </div>
      </div>

      {/* Orders Processed */}
      <div className='rounded-lg border border-primary/20 bg-primary/10 p-4'>
        <div className='mb-2 flex items-center gap-2'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-primary' />
          <span className='text-xs font-medium text-primary'>Orders Today</span>
        </div>
        <div className='text-2xl font-bold text-foreground'>
          <NumberTicker value={stats.ordersProcessed} />
        </div>
      </div>

      {/* Monthly Growth */}
      <div className='col-span-2 rounded-lg border border-brand-purple-500/20 bg-brand-purple-500/10 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-xs font-medium text-brand-purple-600 dark:text-brand-purple-400'>
              Monthly Revenue Growth
            </span>
            <div className='text-lg font-bold text-foreground'>
              $<NumberTicker value={stats.monthlyRevenue} />
            </div>
          </div>
          <div className='flex items-center gap-1 text-brand-purple-600 dark:text-brand-purple-400'>
            <span className='text-sm font-semibold'>+12.5%</span>
            <BarChart3 size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== SYSTEM STATUS COMPONENT ====================

const SystemStatus: React.FC<{ health: DashboardStats['systemHealth'] }> = ({ health }) => {
  const statusConfig = {
    excellent: { color: 'emerald', label: 'All Systems Optimal', icon: '🎯' },
    good: { color: 'blue', label: 'Systems Running Well', icon: '✅' },
    warning: { color: 'amber', label: 'Minor Issues Detected', icon: '⚠️' },
    critical: { color: 'red', label: 'Attention Required', icon: '🚨' },
  };

  const config = statusConfig[health];

  return (
    <div className='relative overflow-hidden p-6'>
      {/* Background particles for visual interest */}
      <Particles
        className='absolute inset-0'
        quantity={20}
        ease={80}
        color={health === 'excellent' ? '#10b981' : '#6366f1'}
      />

      <div className='relative z-10'>
        <div className='mb-4 flex items-center gap-3'>
          <span className='text-2xl'>{config.icon}</span>
          <div>
            <h3 className='font-semibold text-foreground'>System Status</h3>
            <p className={cn('text-sm font-medium', `text-${config.color}-600 dark:text-${config.color}-400`)}>
              {config.label}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-emerald-500' />
            <span className='text-muted-foreground'>Order Processing</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-emerald-500' />
            <span className='text-muted-foreground'>TikTok Sync</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-emerald-500' />
            <span className='text-muted-foreground'>Shipping API</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-emerald-500' />
            <span className='text-muted-foreground'>Inventory Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN DASHBOARD COMPONENT ====================

/**
 * Mobile-first CEO dashboard using bento grid layout
 * Integrates existing CreatorFlow organisms with Magic UI animations
 * Optimized for TikTok creators and e-commerce entrepreneurs
 */
export const BentoCEODashboard: React.FC<BentoCEODashboardProps> = ({
  stats = {
    todayRevenue: 12847,
    monthlyRevenue: 284750,
    ordersProcessed: 347,
    automationSavings: 47,
    systemHealth: 'excellent',
  },
  className,
  userId = 'ceo',
}) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Mobile CEO Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='sticky top-0 z-50 border-b border-border bg-background/80 p-4 backdrop-blur-sm'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>
              <Zap className='h-6 w-6 text-brand-teal-600 dark:text-brand-teal-400' />
              <h1 className='text-lg font-bold text-foreground'>CreatorFlow CEO</h1>
            </div>
            <div className='flex items-center gap-1 text-xs'>
              <span>🎯</span>
              <span>🔥</span>
              <span>🤖</span>
            </div>
          </div>
          <div className='text-sm font-medium text-muted-foreground'>@{userId}</div>
        </div>
      </motion.header>

      {/* Bento Grid Dashboard */}
      <BentoSection animation={true} className='px-4 py-6'>
        <BentoGrid className='gap-4 lg:gap-6'>
          {/* Business Symphony - Enhanced with quick metrics */}
          <BentoCard
            name="Today's Business Symphony"
            description='Revenue trends, units sold, and viral video performance'
            size='wide'
            delay={0.1}
            icon={Palette}
            className='lg:col-span-2'
          >
            <div className='flex h-full flex-col'>
              <div className='flex-1'>
                <BusinessSymphony delay={0.2} />
              </div>
              <QuickMetrics stats={stats} />
            </div>
          </BentoCard>

          {/* System Status Card */}
          <BentoCard name='System Status' size='medium' delay={0.2} className='lg:col-span-1'>
            <SystemStatus health={stats.systemHealth} />
          </BentoCard>

          {/* Strategic Command Center */}
          <BentoCard
            name='Strategic Command Center'
            description='Critical alerts and cross-system management'
            size='large'
            delay={0.3}
            icon={Command}
            className='lg:col-span-2'
          >
            <div className='p-4'>
              <StrategicCommand />
            </div>
          </BentoCard>

          {/* Liberation Orchestra */}
          <BentoCard
            name='Liberation Orchestra'
            description='Automation metrics and time liberation'
            size='medium'
            delay={0.4}
            icon={Zap}
            className='lg:col-span-1'
          >
            <div className='origin-top-left scale-75 p-4'>
              <AutomationOrchestra />
            </div>
          </BentoCard>

          {/* Executive Business Intelligence */}
          <BentoCard
            name='Cross-System Intelligence'
            description='AI-powered insights from all business systems'
            size='wide'
            delay={0.5}
            icon={BrainCircuit}
            className='lg:col-span-3'
          >
            <div className='origin-top-left scale-75 p-4'>
              <ExecutiveIntelligence />
            </div>
          </BentoCard>
        </BentoGrid>
      </BentoSection>

      {/* Mobile Navigation Footer */}
      <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 p-4 backdrop-blur-sm lg:hidden'>
        <div className='flex items-center justify-around'>
          <button className='flex flex-col items-center gap-1 text-xs'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>🏛️</div>
            <span className='text-muted-foreground'>Dashboard</span>
          </button>
          <button className='flex flex-col items-center gap-1 text-xs'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50'>🎨</div>
            <span className='text-muted-foreground'>Design</span>
          </button>
          <button className='flex flex-col items-center gap-1 text-xs'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50'>🤖</div>
            <span className='text-muted-foreground'>Automation</span>
          </button>
          <button className='flex flex-col items-center gap-1 text-xs'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50'>📊</div>
            <span className='text-muted-foreground'>Analytics</span>
          </button>
          <button className='flex flex-col items-center gap-1 text-xs'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50'>🎵</div>
            <span className='text-muted-foreground'>TikTok</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BentoCEODashboard;
