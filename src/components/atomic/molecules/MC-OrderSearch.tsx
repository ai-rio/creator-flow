'use client';

import { Search } from 'lucide-react';
import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface OrderSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Order search input component with glass morphism design
 * Features search icon and responsive styling with proper design tokens
 */
export function OrderSearch({
  placeholder = 'Search by Order ID, Customer, Product...',
  value,
  onChange,
  className = '',
}: OrderSearchProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className='absolute left-3 h-5 w-5 text-muted-foreground' />
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full rounded-full border-none py-2 pl-10 pr-4',
          'bg-muted/50 text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary',
          'backdrop-blur-sm'
        )}
      />
    </div>
  );
}

export default OrderSearch;
