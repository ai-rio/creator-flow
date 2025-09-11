'use client';

import React, { useState } from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// Component imports
import { OrderCard, type OrderData } from './MC-OrderCard';
import { OrderHeader } from './MC-OrderHeader';

// ==================== TYPE DEFINITIONS ====================

export interface OrderManagementProps {
  orders?: OrderData[];
  title?: string;
  totalOrders?: number;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onBack?: () => void;
  onOrderAction?: (action: string, order: OrderData) => void;
  className?: string;
}

// ==================== MOCK DATA ====================

const defaultOrders: OrderData[] = [
  {
    id: '#TT12001',
    source: 'viral',
    customer: '@tiktoker123',
    product: 'iPhone Case',
    value: 67.99,
    status: 'Auto-Processing',
  },
  {
    id: '#TT12002',
    source: 'high_priority',
    customer: '@creator_pro',
    product: 'Phone Grip',
    value: 124.5,
    status: 'Shipped',
  },
  {
    id: '#TT12003',
    source: 'standard',
    customer: '@steady_seller',
    product: 'Ring Light',
    value: 89.99,
    status: 'Shipped',
  },
  {
    id: '#TT12004',
    source: 'viral',
    customer: '@auto_winner',
    product: 'Creator T-Shirt',
    value: 156.0,
    status: 'Auto-Processing',
  },
  {
    id: '#TT12005',
    source: 'standard',
    customer: '@new_customer',
    product: 'Sticker Pack',
    value: 19.99,
    status: 'Shipped',
  },
  {
    id: '#TT12006',
    source: 'viral',
    customer: '@another_viral',
    product: 'iPhone Case',
    value: 67.99,
    status: 'Auto-Processing',
  },
  {
    id: '#TT12007',
    source: 'standard',
    customer: '@regular_buy',
    product: 'Phone Grip',
    value: 124.5,
    status: 'Shipped',
  },
];

// ==================== MAIN COMPONENT ====================

/**
 * Complete order management interface with header, search, filters, and swipeable order cards
 * Mobile-first design with glass morphism effects and advanced gesture interactions
 */
export function OrderManagement({
  orders = defaultOrders,
  title = 'Order Symphony',
  totalOrders,
  theme = 'dark',
  onThemeToggle,
  onBack,
  onOrderAction,
  className = '',
}: OrderManagementProps) {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('Strategic');

  // Filter orders based on search and active filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      !searchValue ||
      order.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.product.toLowerCase().includes(searchValue.toLowerCase());

    // Apply filter logic (simplified for demo)
    const matchesFilter =
      activeFilter === 'Strategic' ||
      (activeFilter === 'Urgent' && order.source === 'viral') ||
      (activeFilter === 'Automated' && order.status === 'Auto-Processing');

    return matchesSearch && matchesFilter;
  });

  const handleOrderAction = (action: string, order: OrderData) => {
    console.log(`${action} action for order:`, order.id);
    onOrderAction?.(action, order);
  };

  return (
    <div className={cn('flex h-screen w-screen flex-col p-4 font-sans', 'bg-slate-100 dark:bg-[#0A090F]', className)}>
      <OrderHeader
        title={title}
        totalOrders={totalOrders || orders.length}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        theme={theme}
        onThemeToggle={onThemeToggle}
        onBack={onBack}
      />

      {/* Scrollable Order List */}
      <div className='mt-4 flex-grow overflow-auto pr-1'>
        <div className='space-y-4'>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onSwipeLeft={(order) => handleOrderAction('cancel', order)}
              onSwipeRight={(order) => handleOrderAction('approve', order)}
              onCeoOverride={(order) => handleOrderAction('ceo_override', order)}
              onViewJourney={(order) => handleOrderAction('view_journey', order)}
            />
          ))}

          {filteredOrders.length === 0 && (
            <div className='flex items-center justify-center py-12'>
              <p className='text-foreground/60'>No orders match your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
