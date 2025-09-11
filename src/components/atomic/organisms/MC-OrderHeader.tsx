'use client';

import { ArrowLeft, Moon, Sun } from 'lucide-react';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// Component imports
import { GlassPane } from '../molecules/MC-GlassPane';
import { OrderSearch } from '../molecules/MC-OrderSearch';
import { OrderFilters } from './MC-OrderFilters';

// ==================== TYPE DEFINITIONS ====================

export interface OrderHeaderProps {
  title?: string;
  totalOrders?: number;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onBack?: () => void;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Mobile order header with navigation, search, and filters
 * Sticky header component for order management interface with glass morphism design
 */
export function OrderHeader({
  title = 'Order Symphony',
  totalOrders = 347,
  searchValue,
  onSearchChange,
  activeFilter = 'Strategic',
  onFilterChange,
  theme = 'dark',
  onThemeToggle,
  onBack,
  className = '',
}: OrderHeaderProps) {
  return (
    <div className={cn('flex-shrink-0', className)}>
      <GlassPane className='p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <button onClick={onBack} className='text-foreground'>
              <ArrowLeft className='h-6 w-6' />
            </button>
            <div>
              <h1 className='text-xl font-bold text-foreground'>{title}</h1>
              <p className='text-sm text-foreground/60'>{totalOrders} Total Orders</p>
            </div>
          </div>
          <button
            onClick={onThemeToggle}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              'border border-border bg-background/80 backdrop-blur-sm',
              'transition-colors hover:bg-muted/50'
            )}
          >
            {theme === 'dark' ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
          </button>
        </div>

        <OrderSearch value={searchValue} onChange={onSearchChange} className='mb-2' />

        <OrderFilters activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </GlassPane>
    </div>
  );
}

export default OrderHeader;
