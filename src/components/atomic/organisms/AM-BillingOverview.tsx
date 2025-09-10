/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { CreditCard, LucideIcon, RefreshCw, Wallet } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface PlanData {
  name: string;
  cost: number;
  billingCycle: string;
  usage: {
    current: number;
    limit: number;
    label: string;
  };
}

interface NextBilling {
  date: string;
  amount: number;
}

interface PaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
}

interface BillingOverviewProps {
  title?: string;
  subtitle?: string;
  plan: PlanData;
  nextBilling: NextBilling;
  paymentMethod: PaymentMethod;
  onManageSubscription?: () => void;
}

const UsageBar: React.FC<{ current: number; limit: number; label: string }> = ({ current, limit, label }) => {
  const percentage = (current / limit) * 100;
  return (
    <div>
      <div className='mb-1 flex items-center justify-between text-body-sm text-muted-foreground'>
        <span>{label}</span>
        <span>
          {current.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className='h-2.5 w-full rounded-full bg-muted'>
        <motion.div
          className='h-2.5 rounded-full bg-primary'
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
        />
      </div>
    </div>
  );
};

const InfoBlock: React.FC<{
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, children }) => (
  <div className='p-strategic'>
    <div className='mb-tactical flex items-center gap-tactical'>
      <Icon className='text-muted-foreground' size={22} />
      <h3 className='font-semibold text-foreground'>{title}</h3>
    </div>
    {children}
  </div>
);

const BillingOverview: React.FC<BillingOverviewProps> = ({
  title = 'Billing Overview',
  subtitle = 'Your current subscription status and upcoming charges.',
  plan,
  nextBilling,
  paymentMethod,
  onManageSubscription,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className='w-full max-w-4xl'
    >
      <div className='rounded-executive border border-border bg-background/95 shadow-xl backdrop-blur-lg'>
        <div className='border-b border-border p-strategic'>
          <h1 className='flex items-center gap-tactical text-heading-xl font-bold text-foreground'>
            <Wallet className='text-primary' size={32} />
            {title}
          </h1>
          <p className='mt-1 text-body-md text-muted-foreground'>{subtitle}</p>
        </div>

        <div className='grid grid-cols-1 divide-border md:grid-cols-3 md:divide-x'>
          {/* Current Plan Block */}
          <InfoBlock icon={Wallet} title='Current Plan'>
            <p className='mb-tactical text-metric-lg font-bold text-foreground'>{plan.name}</p>
            <p className='mb-tactical text-heading-md text-foreground'>
              ${plan.cost} <span className='text-body-sm text-muted-foreground'>/ {plan.billingCycle}</span>
            </p>
            <UsageBar {...plan.usage} />
          </InfoBlock>

          {/* Next Billing Block */}
          <InfoBlock icon={RefreshCw} title='Next Bill'>
            <p className='mb-tactical text-metric-lg font-bold text-foreground'>{nextBilling.date}</p>
            <p className='text-heading-md text-foreground'>
              Amount: <span className='font-semibold'>${nextBilling.amount.toFixed(2)}</span>
            </p>
          </InfoBlock>

          {/* Payment Method Block */}
          <InfoBlock icon={CreditCard} title='Paid With'>
            <div className='flex items-center gap-tactical'>
              <div className='text-metric-md font-bold text-foreground'>{paymentMethod.brand}</div>
              <div>
                <p className='font-semibold text-foreground'>ending in {paymentMethod.last4}</p>
                <p className='text-body-sm text-muted-foreground'>Expires {paymentMethod.expiry}</p>
              </div>
            </div>
          </InfoBlock>
        </div>

        <div className='flex justify-end rounded-b-executive bg-muted/20 p-strategic'>
          <Button
            onClick={onManageSubscription}
            className='bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg'
            size='lg'
          >
            Manage Subscription & Billing
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export { BillingOverview };
export type { PlanData, NextBilling, PaymentMethod, BillingOverviewProps };
