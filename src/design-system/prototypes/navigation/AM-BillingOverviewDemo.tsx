/* eslint-disable */
'use client';

import React from 'react';

import { BillingOverview, PlanData, NextBilling, PaymentMethod } from './AM-BillingOverview';

export default function BillingOverviewDemo(): React.JSX.Element {
  const planData: PlanData = {
    name: 'Creator Pro',
    cost: 99,
    billingCycle: 'month',
    usage: {
      current: 4210,
      limit: 5000,
      label: 'Orders',
    },
  };

  const nextBilling: NextBilling = {
    date: 'October 5, 2025',
    amount: 99.0,
  };

  const paymentMethod: PaymentMethod = {
    brand: 'Visa',
    last4: '4242',
    expiry: '12 / 26',
  };

  const handleManageSubscription = () => {
    console.log('Manage subscription clicked');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='w-full space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Billing Overview Demo</h1>
          <p className='text-body-lg text-muted-foreground'>Subscription status with usage tracking and payment info</p>
        </div>

        <BillingOverview
          plan={planData}
          nextBilling={nextBilling}
          paymentMethod={paymentMethod}
          onManageSubscription={handleManageSubscription}
        />

        <div className='mx-auto max-w-4xl rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-body-md text-muted-foreground'>
            <li>• Animated usage progress bar with spring physics</li>
            <li>• Three-column layout with plan, billing, and payment info</li>
            <li>• Glass morphism design with backdrop blur</li>
            <li>• Configurable plan data and billing cycles</li>
            <li>• Interactive manage subscription button</li>
            <li>• Responsive grid layout for mobile/desktop</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
