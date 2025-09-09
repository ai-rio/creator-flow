/* eslint-disable */
'use client';

import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

// --- TypeScript Interfaces ---
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Theme Context & Provider ---
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);
const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// --- HIGH-QUALITY ICONS ---
const SunIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    />
  </svg>
);
const SearchIcon = ({ className = '' }: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`h-5 w-5 ${className}`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
  </svg>
);
const BackIcon = ({ className = '' }: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`h-6 w-6 ${className}`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
  </svg>
);
const ViralIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5 text-amber-500 dark:text-amber-400'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M13 10V3L4 14h7v7l9-11h-7z' />
  </svg>
);
const AutoIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5 text-purple-600 dark:text-purple-400'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    />
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
  </svg>
);
const ShippedIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5 text-sky-600 dark:text-sky-400'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path d='M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' />
    <path strokeLinecap='round' strokeLinejoin='round' d='M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z' />
    <path strokeLinecap='round' strokeLinejoin='round' d='M16 16h2a2 2 0 002-2V6a2 2 0 00-2-2h-1' />
  </svg>
);

// --- Helper Components ---
const GlassPane = React.forwardRef<any, any>(({ children, className }: any, ref: any) => (
  <div
    ref={ref}
    className={`relative rounded-2xl border border-slate-300 bg-white/80 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-black/20 ${className}`}
  >
    {children}
  </div>
));

// --- MOCK DATA ---
const mockOrders = [
  {
    id: '#TT12001',
    source: 'viral',
    customer: '@tiktoker123',
    product: 'iPhone Case',
    value: 67.99,
    status: 'Auto-Processing',
    statusIcon: <AutoIcon />,
  },
  {
    id: '#TT12002',
    source: 'high_priority',
    customer: '@creator_pro',
    product: 'Phone Grip',
    value: 124.5,
    status: 'Shipped',
    statusIcon: <ShippedIcon />,
  },
  {
    id: '#TT12003',
    source: 'standard',
    customer: '@steady_seller',
    product: 'Ring Light',
    value: 89.99,
    status: 'Shipped',
    statusIcon: <ShippedIcon />,
  },
  {
    id: '#TT12004',
    source: 'viral',
    customer: '@auto_winner',
    product: 'Creator T-Shirt',
    value: 156.0,
    status: 'Auto-Processing',
    statusIcon: <AutoIcon />,
  },
  {
    id: '#TT12005',
    source: 'standard',
    customer: '@new_customer',
    product: 'Sticker Pack',
    value: 19.99,
    status: 'Shipped',
    statusIcon: <ShippedIcon />,
  },
  {
    id: '#TT12006',
    source: 'viral',
    customer: '@another_viral',
    product: 'iPhone Case',
    value: 67.99,
    status: 'Auto-Processing',
    statusIcon: <AutoIcon />,
  },
  {
    id: '#TT12007',
    source: 'standard',
    customer: '@regular_buy',
    product: 'Phone Grip',
    value: 124.5,
    status: 'Shipped',
    statusIcon: <ShippedIcon />,
  },
];

// --- Order Item Component with Swipe Gesture ---
const OrderItem: React.FC<any> = ({ order }: any) => {
  const x = useMotionValue(0);
  const background = useTransform(x, [-100, 0, 100], ['#ef4444', '#334155', '#22c55e']);

  return (
    <div className='relative'>
      <motion.div
        style={{ background }}
        className='absolute inset-0 flex items-center justify-between rounded-2xl px-8 font-bold text-white'
      >
        <span className='opacity-50'>Cancel</span>
        <span className='opacity-50'>Approve</span>
      </motion.div>
      <motion.div drag='x' dragConstraints={{ left: 0, right: 0 }} style={{ x }} className='relative z-10'>
        <GlassPane className='p-4'>
          <div className='flex items-start justify-between'>
            <div>
              <div className='flex items-center gap-2'>
                {order.source === 'viral' && <ViralIcon />}
                <p className='text-lg font-bold text-slate-900 dark:text-white'>{order.id}</p>
              </div>
              <p className='text-sm text-slate-600 dark:text-slate-400'>
                {order.customer} • {order.product}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-lg font-bold text-slate-900 dark:text-white'>${order.value.toFixed(2)}</p>
              <div className='mt-1 flex items-center justify-end gap-1.5'>
                {order.statusIcon}
                <p className='text-xs font-semibold text-slate-600 dark:text-slate-400'>{order.status}</p>
              </div>
            </div>
          </div>
          <div className='mt-4 flex gap-2'>
            <button className='w-full rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white dark:bg-slate-200 dark:text-slate-900'>
              CEO Override
            </button>
            <button className='w-full rounded-lg border border-slate-500/50 bg-transparent px-3 py-2 text-xs font-bold dark:border-slate-600'>
              View Journey
            </button>
          </div>
        </GlassPane>
      </motion.div>
    </div>
  );
};

// --- DEMO APP ---
function AppContent() {
  const [activeFilter, setActiveFilter] = useState<string>('Strategic');
  const { theme, setTheme } = useTheme();

  const FilterButton = ({ label }: any) => (
    <button
      onClick={() => setActiveFilter(label)}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors 
                ${
                  activeFilter === label
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-300 dark:text-slate-400 dark:hover:bg-slate-700/50'
                }`}
    >
      {label}
    </button>
  );

  return (
    <div className='flex h-screen w-screen flex-col bg-slate-100 p-4 font-sans dark:bg-[#0A090F]'>
      {/* Sticky Header */}
      <div className='flex-shrink-0'>
        <GlassPane className='p-4'>
          <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <BackIcon className='text-slate-800 dark:text-slate-200' />
              <div>
                <h1 className='text-xl font-bold text-slate-900 dark:text-white'>Order Symphony</h1>
                <p className='text-sm text-slate-600 dark:text-slate-400'>347 Total Orders</p>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-200/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50'
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
          <div className='relative mb-2 flex items-center'>
            <SearchIcon className='absolute left-3 h-5 w-5 text-slate-500 dark:text-slate-400' />
            <input
              type='text'
              placeholder='Search by Order ID, Customer, Product...'
              className='w-full rounded-full border-none bg-slate-200/80 py-2 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800/50 dark:text-white dark:focus:ring-purple-400'
            />
          </div>
          <div className='flex items-center justify-around pt-2'>
            <FilterButton label='Strategic' />
            <FilterButton label='Urgent' />
            <FilterButton label='Automated' />
            <FilterButton label='⚠️' />
          </div>
        </GlassPane>
      </div>

      {/* Scrollable Order List */}
      <div className='mt-4 flex-grow overflow-auto pr-1'>
        <div className='space-y-4'>
          {mockOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
