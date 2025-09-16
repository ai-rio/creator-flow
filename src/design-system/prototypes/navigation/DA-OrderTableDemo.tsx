/* eslint-disable */
'use client';

import React from 'react';

import { OrderTable, Order } from './DA-OrderTable';

export default function OrderTableDemo(): React.JSX.Element {
  const mockOrderData: Order[] = [
    {
      id: '#TT12001',
      priority: 'high',
      creator: '@viral_creator',
      impact: 'VIRAL',
      status: 'Processing',
      value: 67.99,
    },
    { id: '#TT12002', priority: 'urgent', creator: '@big_accounts', impact: 'HIGH', status: 'Shipped', value: 124.5 },
    {
      id: '#TT12003',
      priority: 'standard',
      creator: '@steady_growth',
      impact: 'MED',
      status: 'Delivered',
      value: 89.99,
    },
    {
      id: '#TT12004',
      priority: 'automated',
      creator: '@auto_wins',
      impact: 'AUTO',
      status: 'Processing',
      value: 156.0,
    },
    { id: '#TT12005', priority: 'urgent', creator: '@flash_sale', impact: 'HIGH', status: 'Delivered', value: 212.75 },
    { id: '#TT12006', priority: 'high', creator: '@trending_now', impact: 'VIRAL', status: 'Shipped', value: 72.0 },
  ];

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='w-full space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Order Table Demo</h1>
          <p className='text-body-lg text-muted-foreground'>
            Real-time creator orders with priority indicators and impact tracking
          </p>
        </div>

        <OrderTable orders={mockOrderData} />

        <div className='mx-auto max-w-6xl rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-bold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-body-md text-muted-foreground'>
            <li>• Priority badges using shadcn/ui Badge component variants</li>
            <li>• Impact tags with gradient backgrounds and proper contrast</li>
            <li>• Status indicators with semantic color coding</li>
            <li>• Staggered entrance animations for smooth loading</li>
            <li>• Design system integration with proper spacing tokens</li>
            <li>• Responsive table with hover effects and accessibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
