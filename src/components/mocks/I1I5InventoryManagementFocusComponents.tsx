/* eslint-disable */
import React, { useState, useEffect } from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BarChart3,
  Box,
  CheckCircle2,
  Flame,
  Moon,
  Palette,
  RefreshCw,
  Settings,
  Siren,
  Sun,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

// --- THEME MANAGEMENT ---
const ThemeToggle = ({ theme, setTheme }: any) => {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className='rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-500/10 dark:text-slate-400'
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};

// --- BASE COMPONENT: GlassPane ---
const GlassPane: React.FC<any> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/50 backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-400/10 ${className}`}
  >
    {children}
  </div>
);

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: 'spring', staggerChildren: 0.1 } },
} as any;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
} as any;

// --- I-SERIES COMPONENTS ---

// [BUILT & THEMED] I1: InventorySystemFocusHeader
const InventorySystemFocusHeader: React.FC<any> = ({ theme, setTheme }) => (
  <motion.div variants={itemVariants}>
    <GlassPane className='sticky top-4 z-10 flex items-center justify-between p-3'>
      <div className='flex items-center gap-3'>
        <ArrowLeft className='text-slate-600 dark:text-slate-300' />
        <h1 className='text-xl font-bold text-slate-900 dark:text-slate-100'>Stock Command</h1>
        <span className='hidden text-sm font-medium text-slate-600 dark:text-slate-400 sm:inline'>(1,247 SKUs)</span>
      </div>
      <div className='flex items-center gap-2'>
        <div className='mr-2 flex items-center gap-2'>
          <Box className='text-teal-800 dark:text-teal-400' />
          <Zap className='text-purple-700 dark:text-purple-400' />
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </GlassPane>
  </motion.div>
);

// [BUILT & THEMED] I2: SyncPerformanceMetricsCard
const SyncPerformanceMetricsCard = () => (
  <motion.div variants={itemVariants}>
    <GlassPane className='space-y-3 p-4 text-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <RefreshCw className='text-slate-600 dark:text-slate-300' size={16} />
          <span className='font-semibold text-slate-900 dark:text-slate-100'>TikTok Sync:</span>
          <span className='text-slate-700 dark:text-slate-300'>3.2s avg (98%)</span>
        </div>
        <CheckCircle2 className='text-teal-800 dark:text-teal-400' size={18} />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Palette className='text-slate-600 dark:text-slate-300' size={16} />
          <span className='font-semibold text-slate-900 dark:text-slate-100'>Stock flow visualization</span>
        </div>
        <span className='font-bold text-purple-700 dark:text-purple-400'>active</span>
      </div>
    </GlassPane>
  </motion.div>
);

// [BUILT & THEMED] I3: CriticalStockAlertsCard
const CriticalStockAlertsCard = () => {
  const alerts = [
    {
      product: '📱 iPhone Case Pro',
      stock: 12,
      context: '🔥 Viral video driving orders',
      velocity: '📈 Selling 47/hour, 6hr stock',
      suggestion: '🎯 Auto-reorder suggested: 500',
    },
  ];
  return (
    <motion.div variants={itemVariants} className='space-y-4'>
      <div className='flex items-center gap-2 px-2'>
        <Siren className='text-red-600 dark:text-red-500' />
        <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100'>CRITICAL STOCK ALERTS</h2>
      </div>
      {alerts.map((alert, i) => (
        <GlassPane key={i} className='space-y-3 p-4'>
          <p className='text-lg font-bold text-slate-900 dark:text-slate-100'>
            {alert.product}: <span className='text-red-600 dark:text-red-500'>{alert.stock} left</span>
          </p>
          <div className='space-y-2 text-sm text-slate-700 dark:text-slate-300'>
            <p>{alert.context}</p> <p>{alert.velocity}</p>{' '}
            <p className='font-semibold text-slate-800 dark:text-slate-200'>{alert.suggestion}</p>
          </div>
          <div className='flex items-center gap-2 pt-2'>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className='flex-1 rounded-lg bg-slate-800 px-4 py-2 text-sm font-bold text-white dark:bg-slate-100 dark:text-slate-900'
            >
              Auto-Order
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className='rounded-lg bg-slate-500/20 px-4 py-2 text-sm font-bold text-slate-800 dark:text-slate-200'
            >
              Manual
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className='rounded-lg bg-slate-500/10 px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400'
            >
              Defer
            </motion.button>
          </div>
        </GlassPane>
      ))}
    </motion.div>
  );
};

// [BUILT & THEMED] I4: InventoryArtGalleryCard
const InventoryArtGalleryCard = () => {
  const landscapeData = [
    { name: 'Phone', level: 'High', height: 'h-16' },
    { name: 'Grip', level: 'Med', height: 'h-10' },
    { name: 'Case', level: 'Low', height: 'h-6' },
    { name: 'Stand', level: 'High', height: 'h-20' },
  ];
  const levelColorClasses = {
    High: 'bg-teal-800 dark:bg-teal-400',
    Med: 'bg-yellow-600 dark:bg-yellow-500',
    Low: 'bg-red-600 dark:bg-red-500',
  };
  return (
    <motion.div variants={itemVariants} className='space-y-4'>
      <div className='flex items-center gap-2 px-2'>
        <Palette className='text-purple-700 dark:text-purple-400' />
        <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100'>Inventory Art Gallery</h2>
      </div>
      <GlassPane className='space-y-4 p-4'>
        <div>
          <h3 className='mb-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300'>
            STOCK FLOW VISUALIZATION
          </h3>
          <div className='flex items-center justify-between px-2'>
            {[...Array(12)].map((_, i) => (
              <React.Fragment key={i}>
                {' '}
                <div
                  className={`h-2 w-2 rounded-full ${
                    i % 3 === 0 ? 'bg-purple-700 dark:bg-purple-400' : 'bg-slate-500/50'
                  }`}
                ></div>{' '}
                {i < 11 && <div className='h-px flex-1 bg-slate-500/30'></div>}{' '}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className='pt-4'>
          <h3 className='mb-4 text-center text-sm font-semibold text-slate-700 dark:text-slate-300'>
            STOCK LEVEL LANDSCAPE
          </h3>
          <div className='flex h-24 items-end justify-around gap-2 px-2'>
            {landscapeData.map((item, i) => (
              <div key={i} className='flex flex-1 flex-col items-center gap-2 text-center'>
                {' '}
                <div
                  className={`w-full ${item.height} ${
                    (levelColorClasses as any)[item.level]
                  } rounded-t-md transition-all duration-500`}
                ></div>{' '}
                <p className='text-xs font-bold text-slate-800 dark:text-slate-200'>{item.name}</p>{' '}
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2 pt-4'>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='flex-1 rounded-lg bg-slate-500/20 px-4 py-2 text-sm font-bold text-slate-800 dark:text-slate-200'
          >
            Expand View
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className='flex-1 rounded-lg bg-slate-500/10 px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400'
          >
            Adjust All
          </motion.button>
        </div>
      </GlassPane>
    </motion.div>
  );
};

// [NEWLY BUILT & THEMED] I5: InventorySubNavBar
const InventorySubNavBar = () => {
  const navItems = [
    { name: 'Analytics', icon: <BarChart3 size={20} /> },
    { name: 'Sync', icon: <RefreshCw size={20} /> },
    { name: 'Config', icon: <Settings size={20} /> },
  ];
  return (
    <motion.div variants={itemVariants} className='sticky bottom-4 z-10'>
      <GlassPane className='flex items-center justify-around p-2'>
        {navItems.map((item) => (
          <motion.button
            key={item.name}
            whileTap={{ scale: 0.95 }}
            className='flex w-24 flex-col items-center gap-1.5 rounded-lg px-4 py-1 text-slate-700 transition-colors hover:bg-slate-500/10 dark:text-slate-300'
          >
            {item.icon}
            <span className='text-xs font-bold'>{item.name}</span>
          </motion.button>
        ))}
      </GlassPane>
    </motion.div>
  );
};

// --- MAIN APP CONTAINER ---
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<any>('dark');

  useEffect(() => {
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className='min-h-screen bg-slate-100 p-4 font-sans transition-colors duration-300 dark:bg-[#0A090F]'>
      <div className='mx-auto max-w-md'>
        <motion.div
          className='space-y-4 pb-24' // Added padding-bottom to prevent overlap with sticky nav
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <InventorySystemFocusHeader theme={theme} setTheme={setTheme} />
          <SyncPerformanceMetricsCard />
          <CriticalStockAlertsCard />
          <InventoryArtGalleryCard />
        </motion.div>
        <InventorySubNavBar />
      </div>
    </div>
  );
}
