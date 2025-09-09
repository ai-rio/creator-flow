/* eslint-disable */
import React, { useState, useEffect } from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { animate, AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Bot,
  CheckCircle,
  ClipboardList,
  Clock,
  Flame,
  MapPin,
  Moon,
  Music,
  Package,
  Sparkles,
  Sun,
  Target,
  Timer,
  Truck,
  Warehouse,
  Zap,
} from 'lucide-react';

// --- Mock Data ---
const initialSystemStatus = { sales: 'nominal', automation: 'nominal' };
const activeOrderCount = 347;
const orderSystemStats = { automationHealth: 96, avgProcessingTimeSec: 12, processingTimeChangePercent: -67 };
const priorityOrders = [
  {
    id: '#TT12001',
    source: 'VIRAL SOURCE',
    customerHandle: '@tiktoker123',
    productName: 'iPhone Case',
    price: 67.99,
    automationStatus: 'Auto-processing',
    location: 'NYC',
    deadline: 'Ship by 3pm',
    flowProgress: 60,
  },
  {
    id: '#TT12000',
    source: 'PROMO CODE',
    customerHandle: '@influencer_xyz',
    productName: 'Creator Hoodie',
    price: 89.5,
    automationStatus: 'Manual Review',
    location: 'LA',
    deadline: 'Ship by 5pm',
    flowProgress: 20,
  },
];
const completedOrders = [
  {
    id: '#TT12002',
    successType: 'COMPLETE SUCCESS',
    customerHandle: '@creator_pro',
    productName: 'Phone Grip',
    price: 124.5,
    processingTimeMin: 8,
    workflowSteps: [{ icon: Package }, { icon: Warehouse }, { icon: Truck }, { icon: CheckCircle }],
  },
];

// --- Reusable Components (Condensed) ---
const GlassPane = ({ children, className = '' }: { children: any; className?: string }) => (
  <div
    className={`border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20 ${className}`}
  >
    {children}
  </div>
);
const ThemeToggle: React.FC<any> = ({ theme, setTheme }) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='absolute right-4 top-20 z-50 rounded-full bg-white/40 p-2 text-slate-500 dark:bg-slate-800/40 dark:text-slate-400'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
  >
    {' '}
    <AnimatePresence mode='wait' initial={false}>
      {' '}
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        {' '}
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}{' '}
      </motion.div>{' '}
    </AnimatePresence>{' '}
  </motion.button>
);
const StatusIcon = ({ icon: Icon, status }: { icon: any; status: any }) => {
  const c = {
    nominal: 'text-teal-800 dark:text-teal-400',
    warning: 'text-amber-600 dark:text-amber-400',
    critical: 'text-red-600 dark:text-red-400',
  };
  return <Icon size={20} className={(c as any)[status] || c.nominal} />;
};
const AnimatedNumber = ({ value }: { value: any }) => {
  const [displayValue, setDisplayValue] = useState<any>(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplayValue(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [value]);
  return <span>{displayValue.toLocaleString()}</span>;
};

// --- O1-O4 Components (Condensed) ---
const SystemFocusHeader: React.FC<any> = ({ title, metric, metricLabel, systemStatus }) => (
  <motion.header
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
    className='fixed left-2 right-2 top-2 z-40'
  >
    {' '}
    <GlassPane className='rounded-xl border-b-0 px-3 py-3'>
      {' '}
      <div className='flex items-center justify-between'>
        {' '}
        <motion.button className='rounded-full p-2' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ArrowLeft className='text-slate-800 dark:text-slate-200' size={22} />
        </motion.button>{' '}
        <div className='text-center'>
          {' '}
          <h1 className='text-lg font-bold text-slate-900 dark:text-slate-100'>{title}</h1>{' '}
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            <span className='font-semibold text-teal-800 dark:text-teal-400'>{metric}</span> {metricLabel}
          </p>{' '}
        </div>{' '}
        <div className='flex items-center gap-3 pr-2'>
          {' '}
          <StatusIcon icon={Target} status={systemStatus.sales} />{' '}
          <StatusIcon icon={Bot} status={systemStatus.automation} />{' '}
        </div>{' '}
      </div>{' '}
    </GlassPane>{' '}
  </motion.header>
);
const OrderSystemStatsCard: React.FC<any> = ({ stats }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
  >
    {' '}
    <GlassPane className='rounded-xl'>
      {' '}
      <div className='grid grid-cols-2 divide-x divide-slate-300/50 dark:divide-slate-700/50'>
        {' '}
        <div className='p-4 text-center'>
          {' '}
          <div className='mb-1 flex items-center justify-center gap-2'>
            {' '}
            <Music className='text-purple-700 dark:text-purple-400' size={18} />{' '}
            <h3 className='text-sm font-semibold text-slate-700 dark:text-slate-300'>Automation Health</h3>{' '}
          </div>{' '}
          <p className='text-3xl font-bold text-slate-900 dark:text-slate-100'>
            {' '}
            <AnimatedNumber value={stats.automationHealth} />%{' '}
          </p>{' '}
        </div>{' '}
        <div className='p-4 text-center'>
          {' '}
          <div className='mb-1 flex items-center justify-center gap-2'>
            {' '}
            <Timer className='text-purple-700 dark:text-purple-400' size={18} />{' '}
            <h3 className='text-sm font-semibold text-slate-700 dark:text-slate-300'>Avg. Processing</h3>{' '}
          </div>{' '}
          <p className='text-3xl font-bold text-slate-900 dark:text-slate-100'>
            {' '}
            <AnimatedNumber value={stats.avgProcessingTimeSec} />s{' '}
          </p>{' '}
          <div className='flex items-center justify-center gap-1 text-xs font-semibold text-teal-800 dark:text-teal-400'>
            {' '}
            (↓
            <AnimatedNumber value={Math.abs(stats.processingTimeChangePercent)} />
            %) <Zap size={12} />{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </GlassPane>{' '}
  </motion.div>
);
const FlowProgressBar: React.FC<any> = ({ percentage }) => (
  <div className='h-2 w-full rounded-full bg-slate-300/70 dark:bg-slate-700/70'>
    {' '}
    <motion.div
      className='h-2 rounded-full bg-teal-700 dark:bg-teal-500'
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />{' '}
  </div>
);
const PriorityOrdersList: React.FC<any> = ({ orders }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.8 }}
  >
    {' '}
    <div className='mb-3 flex items-center gap-2 px-2'>
      {' '}
      <Flame className='text-red-600 dark:text-red-400' />{' '}
      <h2 className='font-bold text-slate-800 dark:text-slate-200'>PRIORITY ORDERS</h2>{' '}
    </div>{' '}
    <motion.div
      className='space-y-4'
      initial='hidden'
      animate='visible'
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {' '}
      {orders.map((order: any) => (
        <motion.div key={order.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
          {' '}
          <GlassPane className='rounded-xl p-4'>
            {' '}
            <div className='space-y-3'>
              {' '}
              <div className='flex items-center justify-between'>
                {' '}
                <span className='font-mono text-sm font-semibold text-slate-800 dark:text-slate-200'>
                  {order.id}
                </span>{' '}
                <div className='flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700 dark:bg-red-900/50 dark:text-red-300'>
                  {' '}
                  <Target size={12} /> {order.source}{' '}
                </div>{' '}
              </div>{' '}
              <p className='font-semibold text-slate-700 dark:text-slate-300'>
                {order.customerHandle} • {order.productName}
              </p>{' '}
              <div className='flex items-center justify-between text-sm'>
                {' '}
                <span className='text-lg font-bold text-slate-900 dark:text-slate-100'>
                  ${order.price.toFixed(2)}
                </span>{' '}
                <div className='flex items-center gap-1 text-slate-600 dark:text-slate-400'>
                  <Bot size={14} /> {order.automationStatus}
                </div>{' '}
              </div>{' '}
              <div className='flex items-center justify-between border-t border-slate-300/50 pt-2 text-xs text-slate-500 dark:border-slate-700/50 dark:text-slate-400'>
                {' '}
                <div className='flex items-center gap-1'>
                  <MapPin size={12} />
                  {order.location}
                </div>{' '}
                <div className='flex items-center gap-1'>
                  <Clock size={12} />
                  {order.deadline}
                </div>{' '}
              </div>{' '}
              <div className='flex items-center gap-3'>
                {' '}
                <FlowProgressBar percentage={order.flowProgress} />{' '}
                <span className='text-sm font-semibold text-slate-700 dark:text-slate-300'>{order.flowProgress}%</span>{' '}
              </div>{' '}
              <div className='flex items-center justify-between pt-2'>
                {' '}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className='text-xs font-bold text-slate-600 dark:text-slate-300'
                >
                  OVERRIDE
                </motion.button>{' '}
                <div className='flex gap-2'>
                  {' '}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className='rounded-md bg-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-800 dark:bg-slate-800/80 dark:text-slate-200'
                  >
                    Track
                  </motion.button>{' '}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className='rounded-md bg-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-800 dark:bg-slate-800/80 dark:text-slate-200'
                  >
                    Customer
                  </motion.button>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </GlassPane>{' '}
        </motion.div>
      ))}{' '}
    </motion.div>{' '}
  </motion.div>
);
const WorkflowPath: React.FC<any> = ({ steps }) => (
  <div className='relative h-8'>
    {' '}
    <svg className='absolute inset-0 h-full w-full' preserveAspectRatio='none'>
      {' '}
      <motion.path d='M 16 16 H 220' strokeWidth='2' className='stroke-slate-300/70 dark:stroke-slate-700/70' />{' '}
      <motion.path
        d='M 16 16 H 220'
        strokeWidth='2'
        className='stroke-teal-700 dark:stroke-teal-500'
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
      />{' '}
    </svg>{' '}
    <div className='relative flex h-full w-full items-center justify-between'>
      {' '}
      {steps.map((Step: any, index: any) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 * index }}
          className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800'
        >
          {' '}
          <Step.icon className='text-slate-700 dark:text-slate-200' size={16} />{' '}
        </motion.div>
      ))}{' '}
    </div>{' '}
  </div>
);
const AutomatedFlowList: React.FC<any> = ({ orders }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 1.1 }}
  >
    {' '}
    <div className='mb-3 flex items-center gap-2 px-2'>
      {' '}
      <Sparkles className='text-teal-800 dark:text-teal-400' />{' '}
      <h2 className='font-bold text-slate-800 dark:text-slate-200'>AUTOMATED FLOW</h2>{' '}
    </div>{' '}
    <div className='space-y-4'>
      {' '}
      {orders.map((order: any) => (
        <GlassPane key={order.id} className='rounded-xl p-4'>
          {' '}
          <div className='space-y-3'>
            {' '}
            <div className='flex items-center justify-between'>
              {' '}
              <span className='font-mono text-sm font-semibold text-slate-800 dark:text-slate-200'>
                {order.id}
              </span>{' '}
              <div className='flex items-center gap-1 rounded-full bg-teal-100 px-2 py-1 text-xs font-bold text-teal-700 dark:bg-teal-900/50 dark:text-teal-300'>
                {' '}
                <Bot size={12} /> {order.successType}{' '}
              </div>{' '}
            </div>{' '}
            <p className='font-semibold text-slate-700 dark:text-slate-300'>
              {order.customerHandle} • {order.productName}
            </p>{' '}
            <div className='border-t border-slate-300/50 pt-2 text-sm text-slate-600 dark:border-slate-700/50 dark:text-slate-400'>
              {' '}
              <span className='font-bold text-slate-800 dark:text-slate-200'>${order.price.toFixed(2)}</span> •{' '}
              {order.processingTimeMin}min total processing{' '}
            </div>{' '}
            <WorkflowPath steps={order.workflowSteps} />{' '}
            <div className='grid grid-cols-2 gap-2 pt-2'>
              {' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='rounded-lg bg-teal-700 px-3 py-2 text-sm font-bold text-white shadow-md dark:bg-teal-500 dark:text-slate-900'
              >
                View Journey
              </motion.button>{' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='rounded-lg bg-slate-200/80 px-3 py-2 text-sm font-bold text-slate-800 dark:bg-slate-800/80 dark:text-slate-200'
              >
                Replicate
              </motion.button>{' '}
            </div>{' '}
          </div>{' '}
        </GlassPane>
      ))}{' '}
    </div>{' '}
  </motion.div>
);

// --- O5: Order Sub Nav Bar ---
const subNavItems = [
  { id: 'priority', icon: Target, label: 'Priority' },
  { id: 'all', icon: ClipboardList, label: 'All Orders' },
];
const OrderSubNavBar: React.FC<any> = ({ activeFilter, setActiveFilter, orderCount }) => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.5 }}
    className='fixed bottom-2 left-2 right-2 z-30'
  >
    <GlassPane className='rounded-xl p-2'>
      <div className='flex items-center justify-around'>
        {subNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveFilter(item.id)}
            className={`relative z-10 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-colors ${
              activeFilter === item.id ? 'text-teal-800 dark:text-teal-300' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {activeFilter === item.id && (
              <motion.div
                layoutId='active-subnav-indicator'
                className='absolute inset-0 -z-10 rounded-lg bg-teal-200/50 dark:bg-teal-900/50'
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <item.icon size={16} />
            <span>{item.label}</span>
            {item.id === 'all' && <span className='text-xs opacity-80'>({orderCount})</span>}
          </button>
        ))}
      </div>
    </GlassPane>
  </motion.div>
);

// --- Main App Frame for this View ---
const OrderManagementView = () => {
  const [theme, setTheme] = useState<any>('dark');
  const [activeFilter, setActiveFilter] = useState<any>('priority');

  return (
    <div className={`${theme} font-sans`}>
      <div className='relative flex min-h-screen items-center justify-center bg-slate-100 transition-colors duration-500 dark:bg-[#0A090F]'>
        <div className='mx-auto h-[800px] w-full max-w-sm rounded-3xl bg-slate-200 p-2 shadow-2xl dark:bg-slate-900/50'>
          <div className='relative h-full w-full overflow-hidden rounded-[20px] bg-slate-100 dark:bg-[#0A090F]'>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <SystemFocusHeader
              title='Order Empire'
              metric={activeOrderCount}
              metricLabel='active'
              systemStatus={initialSystemStatus}
            />

            <main className='scrollbar-hide h-full space-y-4 overflow-y-auto p-2 pb-24 pt-20'>
              <OrderSystemStatsCard stats={orderSystemStats} />

              {/* In a real app, this would conditionally render based on activeFilter */}
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {activeFilter === 'priority' ? (
                    <>
                      <PriorityOrdersList orders={priorityOrders} />
                      <AutomatedFlowList orders={completedOrders} />
                    </>
                  ) : (
                    <div className='py-10 text-center text-slate-500 dark:text-slate-400'>
                      <p>Full list of all {activeOrderCount} orders would be displayed here.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            <OrderSubNavBar
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              orderCount={activeOrderCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementView;
