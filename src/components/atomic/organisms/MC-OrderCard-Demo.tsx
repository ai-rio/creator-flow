'use client';

import React from 'react';

// Component imports
import { OrderCard, type OrderData } from './MC-OrderCard';

// ==================== DEMO DATA ====================

const demoOrder: OrderData = {
  id: '#TT12001',
  source: 'viral',
  customer: '@tiktoker123',
  product: 'iPhone Case Pro Max',
  value: 67.99,
  status: 'Auto-Processing',
};

// ==================== DEMO COMPONENT ====================

/**
 * Demo component showcasing the swipeable order card functionality
 * Shows order card with sample data and interaction handlers
 */
export function OrderCardDemo() {
  const handleSwipeLeft = (order: OrderData) => {
    console.log('Swiped left (cancel):', order.id);
  };

  const handleSwipeRight = (order: OrderData) => {
    console.log('Swiped right (approve):', order.id);
  };

  const handleCeoOverride = (order: OrderData) => {
    console.log('CEO Override clicked:', order.id);
  };

  const handleViewJourney = (order: OrderData) => {
    console.log('View Journey clicked:', order.id);
  };

  return (
    <div className='min-h-screen bg-background p-8'>
      <div className='mx-auto max-w-md space-y-6'>
        <div className='text-center'>
          <h2 className='mb-2 text-2xl font-bold text-foreground'>Swipeable Order Card Demo</h2>
          <p className='text-foreground/60'>Try swiping left/right on the card or use the action buttons</p>
        </div>

        <OrderCard
          order={demoOrder}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onCeoOverride={handleCeoOverride}
          onViewJourney={handleViewJourney}
        />

        <div className='space-y-2 text-center'>
          <p className='text-sm text-foreground/60'>Swipe gestures: Left = Cancel, Right = Approve</p>
          <p className='text-sm text-foreground/60'>Check browser console for action logs</p>
        </div>
      </div>
    </div>
  );
}

export default OrderCardDemo;
