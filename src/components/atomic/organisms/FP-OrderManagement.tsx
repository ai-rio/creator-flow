/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Database, Link, Moon, Sliders, Sun, Zap } from 'lucide-react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

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

// Data
const featurePillars = [
  { id: 'validation', Icon: Database, title: 'State Machine Validation', gridArea: '1 / 1 / 3 / 3' },
  { id: 'workflow', Icon: Sliders, title: 'Workflow Rules Engine', gridArea: '3 / 1 / 5 / 3' },
  { id: 'sync', Icon: Zap, title: 'Real-time Status Sync', gridArea: '1 / 7 / 3 / 9' },
  { id: 'integration', Icon: Link, title: 'Integration Layer', gridArea: '3 / 7 / 5 / 9' },
];

const mockOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `CF-78${365 + i}`,
  value: `$${(Math.random() * 200 + 50).toFixed(2)}`,
  status: i % 4 === 0 ? 'FLAGGED' : 'PROCESSED',
}));

// Live Order Stream Component
const LiveOrderStream: React.FC<any> = ({ activePillar }: any) => {
  const streamRef = useRef(null);

  useEffect(() => {
    const stream = streamRef.current;
    if (!stream) return;
    let scrollAmount = 0;
    const animateScroll = () => {
      scrollAmount += 0.5;
      if (scrollAmount >= (stream as any).scrollHeight - (stream as any).clientHeight) {
        scrollAmount = 0;
      }
      (stream as any).scrollTop = scrollAmount;
      requestAnimationFrame(animateScroll);
    };
    const animationId = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={streamRef}
      className='order-stream relative col-span-full row-span-full h-full w-full overflow-y-scroll rounded-executive border border-border/20 bg-background/40 p-tactical backdrop-blur-md md:col-span-4 md:col-start-3 md:row-span-4'
    >
      <div className='flex justify-between text-body-sm font-bold'>
        <span className='text-muted-foreground'>ORDER ID</span>
        <span className='text-muted-foreground'>VALUE</span>
        <span className='text-muted-foreground'>STATUS</span>
      </div>
      <div className='mt-tactical space-y-tactical'>
        {mockOrders.map((order) => (
          <motion.div
            key={order.id}
            className='flex justify-between rounded-premium p-tactical transition-all duration-300'
            animate={{
              backgroundColor: activePillar === 'workflow' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              boxShadow:
                activePillar === 'integration' ? '0 0 10px hsl(var(--brand-teal-primary))' : '0 0 0px transparent',
            }}
          >
            <span className='font-mono text-body-sm text-foreground'>{order.id}</span>
            <span className='font-mono text-body-sm text-foreground'>{order.value}</span>
            <div className='flex items-center gap-tactical'>
              {activePillar === 'validation' && order.status === 'FLAGGED' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='h-2 w-2 rounded-full bg-destructive'
                />
              )}
              <motion.span
                className={`text-body-sm font-bold ${
                  order.status === 'FLAGGED' ? 'text-destructive' : 'text-muted-foreground'
                }`}
                animate={{
                  opacity: activePillar === 'sync' ? [1, 0.5, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {order.status}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Feature Pillar Component
const FeaturePillar = ({ pillar, setActivePillar }: any) => (
  <motion.div
    style={{ gridArea: pillar.gridArea }}
    className='hidden flex-col justify-between rounded-executive border border-border/20 bg-background/40 p-tactical backdrop-blur-md md:flex'
    onMouseEnter={() => setActivePillar(pillar.id)}
    whileHover={{ scale: 1.05, boxShadow: '0 0 20px hsl(var(--brand-teal-primary))' }}
  >
    <div className='flex items-center gap-tactical'>
      <pillar.Icon className='h-icon-lg w-icon-lg text-foreground' />
      <h3 className='text-body-lg font-bold text-foreground'>{pillar.title}</h3>
    </div>
    <div className='text-right'>
      <span className='text-body-sm font-bold text-muted-foreground'>ACTIVE</span>
    </div>
  </motion.div>
);

// Blueprint Sparks Component
const BlueprintSparks: React.FC<any> = ({ activePillar }: any) => {
  const pillarCoords = {
    validation: { x1: '20%', y1: '25%', x2: '25%', y2: '25%' },
    workflow: { x1: '20%', y1: '75%', x2: '25%', y2: '75%' },
    sync: { x1: '80%', y1: '25%', x2: '75%', y2: '25%' },
    integration: { x1: '80%', y1: '75%', x2: '75%', y2: '75%' },
  };
  const coords = activePillar ? (pillarCoords as any)[activePillar] : null;

  return (
    <svg className='pointer-events-none absolute inset-0 hidden h-full w-full md:block'>
      <AnimatePresence>
        {coords && (
          <motion.line
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
            stroke='hsl(var(--brand-teal-primary))'
            strokeWidth='2'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{ duration: 0.3 }}
            style={{ filter: 'drop-shadow(0 0 5px hsl(var(--brand-teal-primary)))' }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
};

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

// Main Order Management Component
const OrderManagement = () => {
  const [activePillar, setActivePillar] = useState<any>(null);

  return (
    <>
      <style>{`
        .order-stream::-webkit-scrollbar { display: none; }
        .order-stream { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className='flex min-h-screen w-full flex-col items-center justify-center p-tactical lg:p-strategic'>
        <div className='text-center'>
          <h2 className='text-heading-2xl md:text-heading-3xl font-black text-foreground'>
            One Stream. Total Control.
          </h2>
          <p className='mx-auto mt-tactical max-w-content text-body-lg text-muted-foreground'>
            CreatorFlow unifies every order into a singular, intelligent pipeline. Hover over a capability to see its
            direct impact.
          </p>
        </div>

        <div
          className='relative mt-command h-[600px] w-full max-w-content'
          style={{ perspective: '2000px' }}
          onMouseLeave={() => setActivePillar(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='grid h-full w-full grid-cols-8 grid-rows-4 gap-tactical'
          >
            <LiveOrderStream activePillar={activePillar} />
            {featurePillars.map((pillar) => (
              <FeaturePillar key={pillar.id} pillar={pillar} setActivePillar={setActivePillar} />
            ))}
          </motion.div>
          <BlueprintSparks activePillar={activePillar} />
        </div>
      </div>
    </>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background font-sans transition-colors duration-300'>
      <OrderManagement />
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
