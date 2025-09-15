/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Binary, Moon, Scaling, ShieldCheck, Sun, Zap } from 'lucide-react';
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

// Architectural Principles Data
const principles = [
  {
    id: 'scalability',
    Icon: Scaling,
    title: 'Scalability',
    description:
      'Engineered for 10x viral spikes. Our systems anticipate your success, ensuring you never miss an order.',
    position: { angle: -45, distance: 160 },
  },
  {
    id: 'reliability',
    Icon: ShieldCheck,
    title: 'Reliability',
    description:
      'Built on enterprise-grade infrastructure. We provide the stability you need to build a lasting business.',
    position: { angle: 45, distance: 160 },
  },
  {
    id: 'clarity',
    Icon: Binary,
    title: 'Clarity',
    description:
      'We transform operational complexity into actionable wisdom, giving you a clear view of your entire business.',
    position: { angle: 135, distance: 160 },
  },
  {
    id: 'velocity',
    Icon: Zap,
    title: 'Velocity',
    description: 'Automate repetitive tasks and accelerate your fulfillment process, freeing you to focus on growth.',
    position: { angle: 225, distance: 160 },
  },
];

// Main Hero Component
const ArchitecturalHero = () => {
  const { theme, setTheme } = useTheme();
  const [activePrinciple, setActivePrinciple] = useState<any>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const activePrincipleData = principles.find((p) => p.id === activePrinciple);

  return (
    <div className='min-h-screen bg-background font-sans antialiased'>
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
      <div className='relative mx-auto flex min-h-screen w-full max-w-content flex-col items-center justify-center overflow-hidden px-tactical pt-command text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className='text-heading-2xl md:text-heading-3xl font-black text-foreground'>The Architects of Scale.</h1>
          <p className='md:text-heading-sm mx-auto mt-tactical max-w-prose text-body-lg text-muted-foreground'>
            We built the definitive command structure for one reason: to ensure your viral moment becomes a lasting
            enterprise, not an operational collapse.
          </p>
        </motion.div>

        <div
          className='relative mt-command flex h-96 w-96 items-center justify-center'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setActivePrinciple(null);
          }}
        >
          <motion.div
            className='absolute inset-0 rounded-full bg-brand-teal-primary/10'
            animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <ArchitectPrism isHovered={isHovered} />

          <AnimatePresence>
            {isHovered &&
              principles.map((principle) => (
                <PrincipleNode
                  key={principle.id}
                  principle={principle}
                  onHoverStart={() => setActivePrinciple(principle.id)}
                />
              ))}
          </AnimatePresence>

          <AnimatePresence>
            {activePrincipleData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className='pointer-events-none absolute z-modal w-64 rounded-executive border border-border/20 bg-card/90 p-tactical text-left backdrop-blur-lg'
              >
                <div className='flex items-center gap-tactical'>
                  <activePrincipleData.Icon className='h-icon-sm w-icon-sm text-foreground' />
                  <h3 className='text-heading-sm font-bold text-foreground'>{activePrincipleData.title}</h3>
                </div>
                <p className='mt-2 text-body-sm text-muted-foreground'>{activePrincipleData.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Sub-Components
const ArchitectPrism = ({ isHovered }: any) => (
  <motion.div
    className='relative z-header flex h-32 w-32 items-center justify-center rounded-premium border border-border/20 bg-card/60 backdrop-blur-lg'
    animate={{ rotate: 360 }}
    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
  >
    <motion.div
      className='to-brand-purple-primary absolute h-full w-full rounded-premium bg-gradient-to-r from-brand-teal-primary opacity-50'
      animate={{ rotate: -720 }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className='h-16 w-16'
      animate={{ scale: isHovered ? 1.1 : 1, transition: { type: 'spring', stiffness: 300 } }}
    >
      <svg viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <motion.path
          d='M50 2 L98 50 L50 98 L2 50 Z'
          stroke='currentColor'
          strokeWidth='4'
          className='text-brand-teal-primary'
          animate={{ scale: [1, 1.05, 1], rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d='M25 25 L75 25 L75 75 L25 75 Z'
          stroke='currentColor'
          strokeWidth='2'
          className='text-brand-teal-primary'
          animate={{ scale: [1, 0.95, 1], rotate: isHovered ? -45 : 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
      </svg>
    </motion.div>
  </motion.div>
);

const PrincipleNode: React.FC<any> = ({ principle, onHoverStart }: any) => {
  const { angle, distance } = principle.position;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  return (
    <motion.div
      className='absolute'
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, x, y }}
      exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      onHoverStart={onHoverStart}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border/20 bg-card/50 backdrop-blur-sm'
      >
        <principle.Icon className='h-icon-md w-icon-md text-foreground' />
      </motion.div>
    </motion.div>
  );
};

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
  return <ArchitecturalHero />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
