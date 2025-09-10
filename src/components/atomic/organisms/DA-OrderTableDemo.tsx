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
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-8 font-sans transition-colors duration-300 dark:bg-[#111827]'>
      <div className='w-full space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-gray-900 dark:text-white'>Order Table Demo</h1>
          <p className='text-body-lg text-gray-500 dark:text-gray-400'>
            Real-time creator orders with priority indicators and impact tracking
          </p>
        </div>

        <OrderTable orders={mockOrderData} />

        <div className='mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white/60 p-strategic backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60'>
          <h3 className='mb-tactical text-heading-md font-bold text-gray-900 dark:text-white'>Features:</h3>
          <ul className='space-y-2 text-body-md text-gray-500 dark:text-gray-400'>
            <li>• Priority indicators with color-coded icons (High, Urgent, Standard, Automated)</li>
            <li>• Impact tags with gradient backgrounds (VIRAL, HIGH, MED, AUTO)</li>
            <li>• Auto status tracking with status icons (Processing, Shipped, Delivered)</li>
            <li>• Staggered entrance animations for smooth table loading</li>
            <li>• Glass morphism design with backdrop blur effects</li>
            <li>• Hover effects and responsive table layout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
