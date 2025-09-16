/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Package, Sun, X, Zap } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

// Theme Context & Provider
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

// SVG Icons for Carriers
const UpsIcon = ({ size = 48 }: any) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M3 8V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8L12 3L3 8Z' fill='#351C15' />
    <text x='12' y='15' fontFamily='Arial, sans-serif' fontSize='6' fill='white' textAnchor='middle' fontWeight='bold'>
      UPS
    </text>
  </svg>
);

const FedexIcon = ({ size = 48 }: any) => (
  <svg width={size} height={size} viewBox='0 0 100 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <text x='5' y='45' fontFamily='Arial, sans-serif' fontSize='40' fill='#4d148c' fontWeight='bold'>
      Fed
    </text>
    <text x='50' y='45' fontFamily='Arial, sans-serif' fontSize='40' fill='#FF6600' fontWeight='bold'>
      Ex
    </text>
  </svg>
);

const DhlIcon = ({ size = 48 }: any) => (
  <svg width={size} height={size * 0.6} viewBox='0 0 100 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='100' height='60' fill='#ffcc00' rx='10' />
    <text
      x='50'
      y='42'
      fontFamily='Arial, sans-serif'
      fontSize='32'
      fill='#D40511'
      textAnchor='middle'
      fontWeight='bold'
      fontStyle='italic'
    >
      DHL
    </text>
  </svg>
);

// Data
const carriers = [
  { id: 'ups', Icon: UpsIcon, name: 'UPS' },
  { id: 'fedex', Icon: FedexIcon, name: 'FedEx' },
  { id: 'dhl', Icon: DhlIcon, name: 'DHL' },
];
const optimalCarrierId = 'fedex';

// Package Node Component
const PackageNode = () => (
  <motion.div
    className='absolute left-1/2 top-0 -translate-x-1/2'
    initial={{ opacity: 0, z: 200 }}
    animate={{ opacity: 1, z: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Package className='h-16 w-16 text-warning-amber-500' />
  </motion.div>
);

// Carrier Nodes Component
const CarrierNodes = ({ state }: any) => (
  <div className='absolute bottom-0 flex w-full justify-around'>
    {carriers.map((carrier) => (
      <motion.div
        key={carrier.id}
        animate={{
          opacity: state === 'revealed' && carrier.id !== optimalCarrierId ? 0.3 : 1,
          scale: state === 'revealed' && carrier.id === optimalCarrierId ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center gap-tactical rounded-premium p-tactical'
      >
        <carrier.Icon />
        <span className='text-body-sm font-bold text-muted-foreground'>{carrier.name}</span>
      </motion.div>
    ))}
  </div>
);

// Path Canvas Component
const PathCanvas = ({ state }: any) => (
  <svg className='pointer-events-none absolute inset-0 h-full w-full'>
    {/* Tangled Paths */}
    <AnimatePresence>
      {state !== 'revealed' && (
        <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <path
            d='M 50% 64 C 20% 150, 80% 250, 16.67% 450'
            stroke='hsl(var(--muted-foreground) / 0.2)'
            strokeWidth='2'
            fill='none'
          />
          <path
            d='M 50% 64 C 30% 200, 70% 300, 50% 450'
            stroke='hsl(var(--muted-foreground) / 0.2)'
            strokeWidth='2'
            fill='none'
          />
          <path
            d='M 50% 64 C 80% 150, 20% 250, 83.33% 450'
            stroke='hsl(var(--muted-foreground) / 0.2)'
            strokeWidth='2'
            fill='none'
          />
        </motion.g>
      )}
    </AnimatePresence>

    {/* Calculating Pulses */}
    <AnimatePresence>
      {state === 'calculating' && (
        <motion.path
          d='M 50% 64 C 30% 200, 70% 300, 50% 450'
          stroke='hsl(var(--brand-teal-primary))'
          strokeWidth='2'
          fill='none'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </AnimatePresence>

    {/* Optimal Path */}
    <AnimatePresence>
      {state === 'revealed' && (
        <motion.path
          d='M 50% 64 C 30% 200, 70% 300, 50% 450'
          stroke='hsl(var(--brand-teal-primary))'
          strokeWidth='3'
          fill='none'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 8px hsl(var(--brand-teal-primary)))' }}
        />
      )}
    </AnimatePresence>
  </svg>
);

// Result Tooltip Component
const ResultTooltip = ({ onReset }: any) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
    className='absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 rounded-executive border border-border/20 bg-background/40 p-tactical backdrop-blur-md'
  >
    <motion.button
      onClick={onReset}
      className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-premium border border-border/20 bg-background/40'
      whileHover={{ scale: 1.1, rotate: 90 }}
    >
      <X className='h-4 w-4 text-foreground' />
    </motion.button>

    <div className='text-center'>
      <h4 className='text-body-lg font-bold text-foreground'>Optimal Route Found</h4>
      <div className='mt-tactical flex items-center justify-center gap-tactical'>
        <FedexIcon size={36} />
        <span className='font-bold text-foreground'>FedEx Ground</span>
      </div>
      <div className='mt-tactical grid grid-cols-2 gap-tactical text-body-sm'>
        <div className='rounded-premium bg-muted/50 p-tactical'>
          <span className='text-body-xs block text-muted-foreground'>Cost</span>
          <span className='font-bold text-foreground'>$8.72</span>
        </div>
        <div className='bg-success/20 rounded-premium p-tactical'>
          <span className='text-body-xs text-success block font-semibold'>Savings</span>
          <span className='text-success font-bold'>$3.15 (26%)</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// Theme Toggle Button Component
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed right-tactical top-tactical z-modal flex h-12 w-12 items-center justify-center rounded-premium border border-border/10 bg-background/50 text-foreground backdrop-blur-xl'
      aria-label='Toggle theme'
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? <Sun className='h-icon-md w-icon-md' /> : <Moon className='h-icon-md w-icon-md' />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

// Main Logistics Co-Pilot Component
const LogisticsCoPilot = () => {
  const [state, setState] = useState<string>('idle'); // idle -> calculating -> revealed

  const handleFindRoute = () => {
    setState('calculating');
    setTimeout(() => setState('revealed'), 1500);
  };

  const handleReset = () => {
    setState('idle');
  };

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center p-tactical'>
      <div className='text-center'>
        <h2 className='text-heading-2xl md:text-heading-3xl font-black text-foreground'>The Logistics Co-Pilot.</h2>
        <p className='mx-auto mt-tactical max-w-content text-body-lg text-muted-foreground'>
          Our AI Rate Shopping Engine analyzes millions of variables to find the single most optimal shipping route for
          every order. Stop guessing.
        </p>
      </div>

      <div className='relative mt-command h-[500px] w-full max-w-content' style={{ perspective: '1500px' }}>
        <PackageNode />
        <CarrierNodes state={state} />
        <PathCanvas state={state} />
        <AnimatePresence>{state === 'revealed' && <ResultTooltip onReset={handleReset} />}</AnimatePresence>
      </div>

      <div className='mt-strategic h-14'>
        <AnimatePresence mode='wait'>
          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                onClick={handleFindRoute}
                size='lg'
                className='flex items-center gap-tactical rounded-premium bg-brand-teal-primary px-strategic py-tactical text-body-lg font-bold text-white hover:bg-brand-teal-primary/90'
              >
                <Zap className='h-icon-md w-icon-md' />
                Find Optimal Route
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background font-sans transition-colors duration-300'>
      <LogisticsCoPilot />
      <ThemeToggleButton />
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
