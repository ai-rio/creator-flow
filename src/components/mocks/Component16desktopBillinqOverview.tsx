/* eslint-disable */
import React, { useState } from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Moon, RefreshCw, Sun, Wallet } from 'lucide-react';

// --- Mock Data ---
// This data simulates what would be fetched from a backend.
const billingData = {
  plan: {
    name: 'Creator Pro',
    cost: 99,
    billingCycle: 'month',
    usage: {
      current: 4210,
      limit: 5000,
      label: 'Orders',
    },
  },
  nextBilling: {
    // Based on the user's current date of Sept 5, 2025
    date: 'October 5, 2025',
    amount: 99.0,
  },
  paymentMethod: {
    brand: 'Visa',
    last4: '4242',
    expiry: '12 / 26',
  },
};

// --- Reusable Components ---
const GlassPane: React.FC<any> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20 ${className}`}
  >
    {children}
  </div>
);

const ThemeToggle: React.FC<any> = ({ theme, setTheme }) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='absolute right-8 top-8 z-20 rounded-full bg-white/40 p-2 text-slate-500 dark:bg-slate-800/40 dark:text-slate-400'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
  >
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

const UsageBar = ({ current, limit, label }: { current: any; limit: any; label: any }) => {
  const percentage = (current / limit) * 100;
  return (
    <div>
      <div className='mb-1 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400'>
        <span>{label}</span>
        <span>
          {current.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className='h-2.5 w-full rounded-full bg-slate-200/80 dark:bg-slate-900/60'>
        <motion.div
          className='h-2.5 rounded-full bg-purple-600 dark:bg-purple-400'
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, type: 'spring', stiffness: 80 }}
        />
      </div>
    </div>
  );
};

const InfoBlock: React.FC<any> = ({ icon: Icon, title, children }) => (
  <div className='p-6'>
    <div className='mb-3 flex items-center gap-3'>
      <Icon className='text-slate-500' size={22} />
      <h3 className='font-semibold text-slate-700 dark:text-slate-300'>{title}</h3>
    </div>
    {children}
  </div>
);

// --- Main Component ---
const BillingOverviewCard = () => {
  const [theme, setTheme] = useState<any>('dark');
  const { plan, nextBilling, paymentMethod } = billingData;

  return (
    <div className={`${theme} font-sans`}>
      <div className='relative flex min-h-screen items-center justify-center bg-slate-100 p-4 transition-colors duration-500 dark:bg-[#0A090F]'>
        <ThemeToggle theme={theme} setTheme={setTheme} />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          className='w-full max-w-4xl'
        >
          <GlassPane>
            <div className='border-b border-slate-300/50 p-8 dark:border-slate-700/50'>
              <h1 className='flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100'>
                <Wallet className='text-teal-600 dark:text-teal-400' size={32} />
                Billing Overview
              </h1>
              <p className='mt-1 text-slate-600 dark:text-slate-400'>
                Your current subscription status and upcoming charges.
              </p>
            </div>

            <div className='grid grid-cols-1 divide-slate-300/50 dark:divide-slate-700/50 md:grid-cols-3 md:divide-x'>
              {/* Current Plan Block */}
              <InfoBlock icon={Wallet} title='Current Plan'>
                <p className='mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100'>{plan.name}</p>
                <p className='mb-4 text-lg text-slate-700 dark:text-slate-300'>
                  ${plan.cost} <span className='text-sm text-slate-500'>/ {plan.billingCycle}</span>
                </p>
                <UsageBar {...plan.usage} />
              </InfoBlock>

              {/* Next Billing Block */}
              <InfoBlock icon={RefreshCw} title='Next Bill'>
                <p className='mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100'>{nextBilling.date}</p>
                <p className='text-lg text-slate-700 dark:text-slate-300'>
                  Amount: <span className='font-semibold'>${nextBilling.amount.toFixed(2)}</span>
                </p>
              </InfoBlock>

              {/* Payment Method Block */}
              <InfoBlock icon={CreditCard} title='Paid With'>
                <div className='flex items-center gap-3'>
                  {/* In a real app, this would be an SVG logo */}
                  <div className='text-2xl font-bold text-slate-900 dark:text-slate-100'>{paymentMethod.brand}</div>
                  <div>
                    <p className='font-semibold text-slate-800 dark:text-slate-200'>ending in {paymentMethod.last4}</p>
                    <p className='text-sm text-slate-500'>Expires {paymentMethod.expiry}</p>
                  </div>
                </div>
              </InfoBlock>
            </div>

            <div className='flex justify-end rounded-b-2xl bg-slate-100/30 p-6 dark:bg-slate-900/20'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className='rounded-lg bg-teal-600 px-6 py-3 font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-teal-500 dark:text-slate-900 dark:hover:shadow-[0px_0px_12px_rgba(29,255,233,0.5)]'
              >
                Manage Subscription & Billing
              </motion.button>
            </div>
          </GlassPane>
        </motion.div>
      </div>
    </div>
  );
};

export default BillingOverviewCard;
