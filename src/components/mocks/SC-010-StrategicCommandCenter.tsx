/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, Zap } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

// BorderBeam animation component
const BorderBeam = ({ className }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden rounded-premium ${className}`}>
    <motion.div
      className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-teal-400 to-transparent'
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
    />
    <motion.div
      className='absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-brand-teal-400 to-transparent'
      initial={{ y: '-100%' }}
      animate={{ y: '100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1.5 }}
    />
    <motion.div
      className='absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-transparent via-brand-teal-400 to-transparent'
      initial={{ x: '100%' }}
      animate={{ x: '-100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 2.5 }}
    />
    <motion.div
      className='absolute left-0 top-0 h-full w-1 bg-gradient-to-t from-transparent via-brand-teal-400 to-transparent'
      initial={{ y: '100%' }}
      animate={{ y: '-100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 3.5 }}
    />
  </div>
);

const StrategicCommandCenter = () => {
  const { theme, setTheme } = useTheme();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, delay: 0.2 } },
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      {/* Theme Toggle */}
      <div className='fixed right-tactical top-tactical z-50'>
        <motion.button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileTap={{ scale: 0.9, rotate: 15 }}
          className='flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm'
        >
          {theme === 'dark' ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
        </motion.button>
      </div>

      <div className='mx-auto max-w-content'>
        <motion.div variants={variants} initial='hidden' animate='visible'>
          <Card className='relative h-full rounded-executive border border-border bg-card/50 backdrop-blur-xl'>
            <BorderBeam />
            <CardHeader className='relative z-10'>
              <CardTitle className='mb-tactical flex items-center gap-tactical text-heading-lg font-bold text-warning-amber-500'>
                <Zap className='h-5 w-5' />
                Strategic Command Center
              </CardTitle>
            </CardHeader>
            <CardContent className='relative z-10 space-y-tactical'>
              <p className='font-bold text-foreground'>VIRAL ALERT: Video #xyz789</p>
              <p className='text-metric-lg text-foreground'>+ $8,921 in 6h (347 orders)</p>
              <p className='text-muted-foreground'>Market Share: +2.3% today</p>
              <div className='flex flex-col gap-tactical pt-tactical sm:flex-row'>
                <Button
                  className='w-full rounded-premium bg-foreground px-strategic py-tactical font-bold text-background hover:opacity-90'
                  asChild
                >
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Strategic Response
                  </motion.button>
                </Button>
                <Button
                  variant='outline'
                  className='w-full rounded-premium border-border bg-transparent px-strategic py-tactical font-bold transition-colors hover:bg-accent'
                  asChild
                >
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Scale Up
                  </motion.button>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const AppContent = () => {
  return <StrategicCommandCenter />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
