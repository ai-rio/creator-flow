/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
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

// Star Vortex Background Component
const StarVortex = () => (
  <div className='absolute inset-0 z-0'>
    <svg width='100%' height='100%' className='absolute inset-0'>
      <defs>
        <radialGradient id='nebula' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='rgba(139, 92, 246, 0.3)' />
          <stop offset='50%' stopColor='rgba(59, 130, 246, 0.2)' />
          <stop offset='100%' stopColor='rgba(59, 130, 246, 0)' />
        </radialGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#nebula)' />
      {Array.from({ length: 200 }).map((_, i) => {
        const angle = (i / 200) * Math.PI * 2;
        const radius = Math.random() * 50 + 5;
        const duration = Math.random() * 10 + 10;
        return (
          <motion.circle
            key={i}
            cx='50%'
            cy='50%'
            r={Math.random() * 0.75 + 0.25}
            fill='white'
            animate={{
              x: `${radius * Math.cos(angle)}%`,
              y: `${radius * Math.sin(angle)}%`,
              scale: [1, 1.2, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * -duration,
            }}
          />
        );
      })}
    </svg>
  </div>
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

// Main Final CTA Component
const FinalCTA = () => {
  return (
    <>
      <style>{`
        .supernova-button::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: 0 0 40px 10px #25f4ee, 0 0 80px 20px #a855f7;
          animation: supernova-pulse 3s ease-in-out infinite;
        }
        @keyframes supernova-pulse {
          0% { transform: scale(0.9); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.5; }
        }
      `}</style>
      <section className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
        <StarVortex />
        <motion.div
          className='relative z-10 p-strategic text-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.h2
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ type: 'spring', stiffness: 100 }}
            className='md:text-heading-2xl bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-heading-xl font-black tracking-tight text-transparent'
          >
            Ready to Command Your Growth?
          </motion.h2>

          <motion.div
            variants={{ hidden: { scale: 0.5, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.5, duration: 1 }}
            className='mt-command'
          >
            <Button
              size='lg'
              className='supernova-button relative rounded-premium bg-brand-teal-primary px-strategic py-tactical text-body-lg font-bold text-white shadow-2xl transition-all hover:bg-brand-teal-primary/90'
            >
              Start Your 14-Day Free Trial
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background font-sans transition-colors duration-300'>
      <FinalCTA />
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
