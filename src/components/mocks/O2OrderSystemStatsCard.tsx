/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { animate, AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, Clock, Flame, Moon, Music, Sun, Target, Timer, Zap } from 'lucide-react';

// --- Mock Data ---
const initialSystemStatus = { sales: 'nominal', automation: 'nominal' };
const activeOrderCount = 347;
const orderSystemStats = {
  automationHealth: 96,
  avgProcessingTimeSec: 12,
  processingTimeChangePercent: -67,
};

// --- Reusable Components (Condensed) ---
const GlassPane = ({ children, className = '' }) => (
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
const StatusIcon = ({ icon: Icon, status }) => {
  const c = {
    nominal: 'text-teal-800 dark:text-teal-400',
    warning: 'text-amber-600 dark:text-amber-400',
    critical: 'text-red-600 dark:text-red-400',
  };
  return <Icon size={20} className={c[status] || c.nominal} />;
};
const AnimatedNumber = ({ value }) => {
  const [displayValue, setdisplayValue] = useState<any>(0);
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

// --- O1: The System Focus Header Component ---
const SystemFocusHeader: React.FC<any> = ({ title, metric, metricLabel, systemStatus }) => (
  <motion.header
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
    className='fixed left-2 right-2 top-2 z-40'
  >
    <GlassPane className='rounded-xl border-b-0 px-3 py-3'>
      <div className='flex items-center justify-between'>
        <motion.button className='rounded-full p-2' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <ArrowLeft className='text-slate-800 dark:text-slate-200' size={22} />
        </motion.button>
        <div className='text-center'>
          <h1 className='text-lg font-bold text-slate-900 dark:text-slate-100'>{title}</h1>
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            <span className='font-semibold text-teal-800 dark:text-teal-400'>{metric}</span> {metricLabel}
          </p>
        </div>
        <div className='flex items-center gap-3 pr-2'>
          <StatusIcon icon={Target} status={systemStatus.sales} />
          <StatusIcon icon={Bot} status={systemStatus.automation} />
        </div>
      </div>
    </GlassPane>
  </motion.header>
);

// --- O2: The Order System Stats Card ---
const OrderSystemStatsCard = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
    >
      <GlassPane className='rounded-xl'>
        <div className='grid grid-cols-2 divide-x divide-slate-300/50 dark:divide-slate-700/50'>
          <div className='p-4 text-center'>
            <div className='mb-1 flex items-center justify-center gap-2'>
              <Music className='text-purple-700 dark:text-purple-400' size={18} />
              <h3 className='text-sm font-semibold text-slate-700 dark:text-slate-300'>Automation Health</h3>
            </div>
            <p className='text-3xl font-bold text-slate-900 dark:text-slate-100'>
              <AnimatedNumber value={stats.automationHealth} />%
            </p>
          </div>
          <div className='p-4 text-center'>
            <div className='mb-1 flex items-center justify-center gap-2'>
              <Timer className='text-purple-700 dark:text-purple-400' size={18} />
              <h3 className='text-sm font-semibold text-slate-700 dark:text-slate-300'>Avg. Processing</h3>
            </div>
            <p className='text-3xl font-bold text-slate-900 dark:text-slate-100'>
              <AnimatedNumber value={stats.avgProcessingTimeSec} />s
            </p>
            <div className='flex items-center justify-center gap-1 text-xs font-semibold text-teal-800 dark:text-teal-400'>
              (↓
              <AnimatedNumber value={Math.abs(stats.processingTimeChangePercent)} />
              %)
              <Zap size={12} />
            </div>
          </div>
        </div>
      </GlassPane>
    </motion.div>
  );
};

// --- Main App Frame for this View ---
const OrderManagementView = () => {
  const [theme, settheme] = useState<any>('dark');

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

            <main className='scrollbar-hide h-full space-y-4 overflow-y-auto p-2 pt-20'>
              <OrderSystemStatsCard stats={orderSystemStats} />
              {/* O3, O4 will be built here */}
              <div className='py-10 text-center text-slate-500 dark:text-slate-400'>
                <p>Priority Orders List (O3)</p>
                <p>Automated Flow Cards (O4)</p>
              </div>
              <div className='h-24'></div> {/* Spacer for bottom nav */}
            </main>

            {/* O5 Sub Nav Bar will be built here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementView;
