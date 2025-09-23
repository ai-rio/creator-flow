import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Package, Warehouse, Bot, BarChart4 } from 'lucide-react';

// --- Configuration & Theming ---
const darkTheme = {
  background: '#0A090F',
  textPrimary: 'text-white',
  textSecondary: 'text-slate-400',
  sparkColor: '#2DD4BF',
  knotColor: 'rgba(45, 212, 191, 0.2)',
  reticleColor: '#ef4444',
  streamColors: ['#2DD4BF', '#8b5cf6', '#3b82f6', '#14b8a6'],
};
const lightTheme = {
  background: 'linear-gradient(180deg, #f5f3ff 0%, #fafafa 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-700',
  sparkColor: '#0d9488',
  knotColor: 'rgba(13, 148, 136, 0.2)',
  reticleColor: '#dc2626',
  streamColors: ['#0d9488', '#7c3aed', '#2563eb', '#0f766e'],
};
const pillars = [
  { id: 'orders', Icon: Package, title: 'Order Management' },
  { id: 'inventory', Icon: Warehouse, title: 'Inventory' },
  { id: 'shipping', Icon: Bot, title: 'Shipping' },
  { id: 'analytics', Icon: BarChart4, title: 'Analytics' },
];

// --- Main Demo Component ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  return (
    <div className='font-sans' style={{ background: currentTheme.background, color: currentTheme.textPrimary }}>
      <style>{` @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display.swap'); body { font-family: 'Inter', sans-serif; overflow: hidden; } `}</style>
      <FP010TargetAcquisitionPerfected theme={currentTheme} />
      <ThemeToggleButton currentTheme={theme} setTheme={setTheme} />
    </div>
  );
}

// --- The Perfected "Sniper Killer" Hero ---
const FP010TargetAcquisitionPerfected = ({ theme }) => {
  const [state, setState] = useState('idle'); // idle -> targeting -> resolved

  const handleTarget = () => {
    setState('targeting');
    setTimeout(() => setState('resolved'), 2500); // Sequence takes 2.5s
  };

  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center'>
      <div className='absolute inset-0 z-0 h-full w-full' style={{ perspective: '1000px' }}>
        <DataKnot state={state} theme={theme} />
      </div>
      <UIOverlay state={state} onTarget={handleTarget} theme={theme} />
    </div>
  );
};

// --- UI Overlay ---
const UIOverlay = ({ state, onTarget, theme }) => (
  <div className='relative z-10 flex h-full w-full flex-col items-center justify-center p-4 text-center'>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <h1 className={`text-6xl font-black md:text-8xl ${theme.textPrimary}`}>The Bottleneck Breaker.</h1>
      <p className={`mx-auto mt-4 max-w-3xl text-lg ${theme.textSecondary}`}>
        Our unified system targets the tangled knot of your workflow and turns it into your greatest strength.
        Instantly.
      </p>
    </motion.div>

    <div className='absolute bottom-24 h-16'>
      <AnimatePresence mode='wait'>
        {state === 'idle' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onTarget}
            className='rounded-lg bg-indigo-500 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-indigo-600'
          >
            [ Acquire Target ]
          </motion.button>
        )}
        {state === 'resolved' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='rounded-lg bg-emerald-500 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-emerald-600'
          >
            [ Engage System ]
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  </div>
);

// --- 2.5D Experience ---
const DataKnot = ({ state, theme }) => {
  const numKnotLines = 10;
  const numResolvedLines = 4;

  return (
    <motion.div
      className='absolute inset-0 h-full w-full'
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateY: state === 'resolved' ? 360 : 0 }}
      transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
    >
      {/* Knot State */}
      <AnimatePresence>
        {state !== 'resolved' &&
          Array.from({ length: numKnotLines }).map((_, i) => (
            <motion.div
              key={`knot-${i}`}
              className='absolute left-1/2 top-1/2 h-96 w-96 rounded-full border'
              style={{ borderColor: theme.knotColor }}
              initial={{
                opacity: 0,
                rotateX: Math.random() * 180,
                rotateY: Math.random() * 180,
                rotateZ: Math.random() * 180,
                scale: 0.5,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            />
          ))}
      </AnimatePresence>

      {/* Resolved State */}
      <AnimatePresence>
        {state === 'resolved' &&
          Array.from({ length: numResolvedLines }).map((_, i) => (
            <motion.div
              key={`resolved-${i}`}
              className='absolute left-1/2 top-1/2 h-96 w-96 rounded-full border-2'
              style={{
                borderColor: theme.streamColors[i % theme.streamColors.length],
                boxShadow: `0 0 20px ${theme.streamColors[i % theme.streamColors.length]}`,
              }}
              initial={{ opacity: 0, rotateX: 90, scale: 0.5, y: -100 + i * 50 }}
              animate={{ opacity: 1, rotateX: 90, scale: 1, y: -100 + i * 50 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
      </AnimatePresence>

      {/* Targeting Sequence */}
      <AnimatePresence>{state === 'targeting' && <TargetingSequence theme={theme} />}</AnimatePresence>
    </motion.div>
  );
};

const TargetingSequence = ({ theme }) => (
  <motion.div exit={{ opacity: 0 }}>
    <motion.div
      className='absolute left-1/2 top-1/2 h-96 w-96 rounded-full border-2'
      style={{ borderColor: theme.reticleColor }}
      initial={{ scale: 2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.div className='absolute left-1/2 top-1/2 -mt-48 h-px w-96' style={{ background: theme.reticleColor }} />
    <motion.div className='absolute left-1/2 top-1/2 -ml-48 h-96 w-px' style={{ background: theme.reticleColor }} />
    <motion.div
      className='absolute left-1/2 top-0 h-full w-px'
      style={{ background: theme.sparkColor, boxShadow: `0 0 10px ${theme.sparkColor}` }}
      initial={{ height: 0 }}
      animate={{ height: '100%' }}
      transition={{ duration: 0.3, delay: 1.5 }}
    />
  </motion.div>
);

// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ currentTheme, setTheme }) => (
  <motion.button
    onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    className={`fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${
      currentTheme === 'dark'
        ? 'border-slate-100/10 bg-white/5 text-slate-200'
        : 'border-slate-900/10 bg-slate-800/5 text-slate-800'
    }`}
    aria-label='Toggle theme'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9, rotate: -15 }}
  >
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={currentTheme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);
