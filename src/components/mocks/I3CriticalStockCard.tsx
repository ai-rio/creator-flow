/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  Home,
  Inbox,
  Layers,
  Settings,
  ShoppingCart,
  Siren,
  Zap,
} from 'lucide-react';

// --- MOCK DATA FOR I3: CriticalStockCard ---
const criticalStockData = [
  {
    id: 1,
    productName: 'iPhone Case Pro',
    stockLeft: 12,
    cause: 'Viral video driving orders',
    causeIcon: '🔥',
    velocity: 47,
    timeToStockout: '6hr',
    suggestion: 500,
  },
  {
    id: 2,
    productName: 'Magnetic Charging Stand',
    stockLeft: 23,
    cause: 'Mentioned by @techguru',
    causeIcon: '🚀',
    velocity: 21,
    timeToStockout: '11hr',
    suggestion: 300,
  },
  {
    id: 3,
    productName: 'Creator Ring Light Max',
    stockLeft: 8,
    cause: 'Flash sale ending soon',
    causeIcon: '⚡️',
    velocity: 60,
    timeToStockout: '2hr',
    suggestion: 800,
  },
];

// --- REUSABLE GlassPane COMPONENT ---
// This ensures all components share the exact same base style as defined in the style guide.
const GlassPane = ({ children, className = '' }) => {
  return (
    <div className={`rounded-2xl border border-slate-100/10 bg-slate-400/10 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
};

// --- I-SERIES COMPONENTS ---

// [COMPLETED] I1: InventoryFocusHeader
const InventoryFocusHeader = () => {
  return (
    <GlassPane className='sticky top-4 z-10 flex items-center justify-between p-4'>
      <div className='flex items-center gap-3'>
        <Layers className='text-slate-200' />
        <h1 className='text-xl font-bold text-slate-100'>Inventory Command</h1>
      </div>
      <div className='flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/20 px-3 py-1.5'>
        <div className='h-2 w-2 animate-pulse rounded-full bg-teal-400'></div>
        <span className='text-sm font-medium text-teal-300'>System Nominal</span>
      </div>
    </GlassPane>
  );
};

// [COMPLETED] I2: SyncStatusCard
const SyncStatusCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
    >
      <GlassPane className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <CheckCircle2 className='text-teal-400' />
          <div>
            <p className='font-semibold text-slate-100'>All Channels Synced</p>
            <p className='text-sm text-slate-400'>Last sync: 32 seconds ago</p>
          </div>
        </div>
        <button className='text-sm font-medium text-slate-300 transition-colors hover:text-white'>Force Sync</button>
      </GlassPane>
    </motion.div>
  );
};

// [NEWLY BUILT] I3: The CriticalStockCard
const CriticalStockCard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial='hidden' animate='visible'>
      <motion.div variants={itemVariants} className='mb-2 flex items-center gap-2 px-1'>
        <Siren className='text-red-400' size={20} />
        <h2 className='text-lg font-bold tracking-wide text-red-400'>CRITICAL STOCK ALERTS</h2>
      </motion.div>
      <motion.div variants={containerVariants} className='space-y-4'>
        {criticalStockData.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <GlassPane className='overflow-hidden p-4'>
              {/* Card Header */}
              <div className='flex items-start justify-between'>
                <h3 className='text-lg font-bold text-slate-100'>{item.productName}</h3>
                <p className='text-2xl font-bold text-amber-400'>
                  {item.stockLeft} <span className='text-base font-medium text-slate-400'>left</span>
                </p>
              </div>

              {/* Contextual Intelligence */}
              <div className='mt-2 flex items-center gap-2 text-sm text-slate-300'>
                <span>{item.causeIcon}</span>
                <span>{item.cause}</span>
              </div>

              {/* Predictive Analysis */}
              <div className='mt-4 grid grid-cols-2 gap-4 text-center'>
                <div className='rounded-lg bg-slate-900/50 p-2'>
                  <p className='text-xs text-slate-400'>SALES VELOCITY</p>
                  <p className='text-lg font-bold text-slate-100'>📈 {item.velocity}/hour</p>
                </div>
                <div className='rounded-lg bg-slate-900/50 p-2'>
                  <p className='text-xs text-slate-400'>EST. STOCKOUT</p>
                  <p className='text-lg font-bold text-slate-100'>
                    <Clock size={16} className='mr-1 inline' /> {item.timeToStockout}
                  </p>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className='mt-4 flex items-center gap-3 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3'>
                <Zap className='text-purple-400' />
                <p className='text-sm font-medium text-slate-200'>
                  <span className='text-purple-300'>AI Suggestion:</span> Auto-reorder {item.suggestion} units.
                </p>
              </div>

              {/* Action Bar */}
              <div className='mt-4 grid grid-cols-3 gap-3'>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className='rounded-lg bg-teal-500/80 py-2 font-semibold text-white transition-colors hover:bg-teal-500'
                >
                  Auto-Order
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className='rounded-lg bg-slate-500/60 py-2 font-semibold text-slate-100 transition-colors hover:bg-slate-500/80'
                >
                  Manual
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className='rounded-lg bg-slate-800/60 py-2 font-semibold text-slate-300 transition-colors hover:bg-slate-700/80'
                >
                  Defer
                </motion.button>
              </div>
            </GlassPane>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// --- MAIN APP CONTAINER ---
// This component assembles the full view for demonstration.
export default function App(): React.JSX.Element {
  return (
    <div className='min-h-screen bg-[#0A090F] p-4 font-sans'>
      <div className='mx-auto max-w-md space-y-4'>
        {/* --- INVENTORY MANAGEMENT FOCUS VIEW (I-Series) --- */}
        <InventoryFocusHeader />
        <SyncStatusCard />
        <CriticalStockCard />
      </div>
    </div>
  );
}
