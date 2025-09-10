/* eslint-disable */
'use client';

import React from 'react';

import { BillingHistory, Invoice } from './AM-BillingHistory';

export default function BillingHistoryDemo(): React.JSX.Element {
  const mockInvoices: Invoice[] = [
    {
      id: 'INV-2025-09-0012',
      date: '2025-09-05',
      description: 'Creator Pro - Monthly Subscription',
      amount: 99.0,
      status: 'Paid',
    },
    {
      id: 'INV-2025-08-0011',
      date: '2025-08-05',
      description: 'Creator Pro - Monthly Subscription',
      amount: 99.0,
      status: 'Paid',
    },
    {
      id: 'INV-2025-07-0010',
      date: '2025-07-05',
      description: 'Creator Pro - Monthly Subscription',
      amount: 99.0,
      status: 'Paid',
    },
    {
      id: 'INV-2025-06-0009',
      date: '2025-06-05',
      description: 'Creator - Monthly Subscription',
      amount: 49.0,
      status: 'Paid',
    },
    {
      id: 'INV-2025-05-0008',
      date: '2025-05-05',
      description: 'Creator - Monthly Subscription',
      amount: 49.0,
      status: 'Failed',
    },
    {
      id: 'INV-2025-04-0007',
      date: '2025-04-05',
      description: 'Creator - Monthly Subscription',
      amount: 49.0,
      status: 'Pending',
    },
  ];

  const handleDownload = (invoiceId: string) => {
    console.log('Download invoice:', invoiceId);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='w-full space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Billing History Demo</h1>
          <p className='text-body-lg text-muted-foreground'>
            Sortable invoice table with status badges and download actions
          </p>
        </div>

        <BillingHistory invoices={mockInvoices} onDownload={handleDownload} />

        <div className='mx-auto max-w-5xl rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-body-md text-muted-foreground'>
            <li>• Sortable columns with ascending/descending indicators</li>
            <li>• Status badges with color coding (Paid, Failed, Pending)</li>
            <li>• Download buttons for paid invoices only</li>
            <li>• Staggered entrance animations for table rows</li>
            <li>• Responsive table with horizontal scroll</li>
            <li>• Hover effects and smooth transitions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
