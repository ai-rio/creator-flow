/* eslint-disable */
'use client';

import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion';
import { BadgeDollarSign, Bot, Moon, Sun, TerminalSquare } from 'lucide-react';
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

// Manifesto Data
const doctrines = [
  {
    id: 'automate',
    Icon: Bot,
    title: 'Automate Everything.',
    principle:
      'Your time is a strategic asset, not an operational expense. We are fundamentally opposed to manual tasks that drain creative energy.',
    proof: [{ value: 12, unit: 'hrs/wk', label: 'Reclaimed for growth' }],
  },
  {
    id: 'defend',
    Icon: BadgeDollarSign,
    title: 'Defend Every Dollar.',
    principle:
      'Profitability at scale is a non-negotiable architectural requirement. Every sale must be a victory, not a liability.',
    proof: [
      { value: 8400, unit: '$', prefix: true, label: 'In oversell losses prevented' },
      { value: 21, unit: '%', label: 'Average profit increase on shipping' },
    ],
  },
  {
    id: 'command',
    Icon: TerminalSquare,
    title: "Command, Don't Manage.",
    principle:
      'Scaling should grant you more control, not more complexity. We transform operational chaos into strategic clarity.',
    proof: [{ value: 1, unit: 'CEO-Grade Interface', label: 'For definitive business intelligence' }],
  },
];

// Animated Counter Component
const AnimatedCounter: React.FC<any> = ({ value, isVisible, prefix = false, unit }: any) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 100, damping: 20 });

  useEffect(() => {
    if (isVisible) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [spring, value, isVisible]);

  const displayValue = useTransform(spring, (currentValue: any) => {
    const rounded = Math.round(currentValue);
    if (value < 100) {
      return rounded.toFixed(0);
    }
    return rounded.toLocaleString('en-US', { maximumFractionDigits: 0 });
  });

  return (
    <div className='flex items-baseline'>
      {prefix && <span>{unit}</span>}
      <motion.span>{displayValue}</motion.span>
      {!prefix && <span>{unit}</span>}
    </div>
  );
};

// Doctrine Card Component
const DoctrineCard: React.FC<any> = ({ doctrine, isActive, onClick }: any) => {
  const isSpecialUnit = doctrine.proof[0].unit.includes(' ');

  const cardVariants = {
    dormant: { opacity: 0.7, filter: 'blur(2px)', scale: 0.9, y: 20 },
    primed: { opacity: 1, filter: 'blur(0px)', scale: 1.05, y: 10 },
    active: { opacity: 1, filter: 'blur(0px)', scale: 1.1, y: 0 },
  };

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative min-h-[450px] w-full cursor-pointer rounded-premium border border-border/20 bg-card/60 p-strategic backdrop-blur-lg transition-shadow duration-500 ${
        isActive ? 'shadow-[0_0_80px_-15px_rgba(45,212,191,0.4)]' : 'shadow-[0_0_60px_-15px_rgba(45,212,191,0.2)]'
      }`}
      variants={cardVariants}
      animate={isActive ? 'active' : 'dormant'}
      whileHover='primed'
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div layout='position' className='flex items-center gap-tactical'>
        <doctrine.Icon className='h-icon-lg w-icon-lg text-foreground' />
        <h2 className='text-heading-lg font-bold text-foreground'>{doctrine.title}</h2>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className='mt-tactical'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
          >
            <p className='text-body-lg leading-relaxed text-muted-foreground'>{doctrine.principle}</p>
            <div className='mt-strategic space-y-tactical'>
              {doctrine.proof.map((p: any, i: any) => (
                <div key={i}>
                  <div
                    className={`text-metric-2xl font-black text-brand-teal-primary ${
                      isSpecialUnit ? 'text-metric-xl' : ''
                    }`}
                  >
                    <AnimatedCounter value={p.value} isVisible={isActive} prefix={p.prefix} unit={p.unit} />
                  </div>
                  <p className='mt-1 text-muted-foreground'>{p.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Mission Manifesto Component
const MissionManifesto = () => {
  const { theme, setTheme } = useTheme();
  const [activeId, setActiveId] = useState<any>(doctrines[1].id);

  return (
    <div className='min-h-screen bg-background font-sans antialiased'>
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
      <div className='mx-auto flex min-h-screen w-full flex-col items-center justify-center space-y-strategic overflow-hidden px-tactical py-command'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='text-center'
        >
          <h1 className='text-heading-2xl md:text-heading-3xl font-black text-foreground'>
            A Manifesto of Intervention.
          </h1>
          <p className='md:text-heading-sm mx-auto mt-tactical max-w-prose text-body-lg text-muted-foreground'>
            Our platform is not built on features, but on core beliefs. These three doctrines govern every line of code
            we write and every decision we make.
          </p>
        </motion.div>

        <div className='flex w-full flex-col items-center justify-center pt-command md:flex-row md:items-start md:space-x-tactical'>
          {doctrines.map((d) => (
            <div key={d.id} className='my-tactical w-full md:my-0 md:w-1/3'>
              <DoctrineCard doctrine={d} isActive={activeId === d.id} onClick={() => setActiveId(d.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Theme Toggle Button Component
const ThemeToggleButton: React.FC<any> = ({ theme, setTheme }: any) => {
  return (
    <motion.div
      className='fixed bottom-tactical right-tactical z-modal'
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variant='outline'
        size='icon'
        className='h-12 w-12 rounded-full border-border/20 bg-card/80 backdrop-blur-xl'
        aria-label='Toggle theme'
      >
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? <Sun className='h-icon-sm w-icon-sm' /> : <Moon className='h-icon-sm w-icon-sm' />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

// Export wrapper
const AppContent = () => {
  return <MissionManifesto />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
