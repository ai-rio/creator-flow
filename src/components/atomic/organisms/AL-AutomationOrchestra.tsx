/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Bot, Timer, Heart, Bed, Workflow, Moon, Sun } from 'lucide-react';
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

// Liberation Metric Component
const LiberationMetric = ({ icon, label, value, valueElement }: any) => (
  <div className='flex items-center justify-between border-b border-border py-tactical text-sm'>
    <div className='flex items-center gap-tactical'>
      {icon}
      <span className='font-semibold text-muted-foreground'>{label}</span>
    </div>
    {valueElement || <span className='text-right font-bold text-foreground'>{value}</span>}
  </div>
);

// System Symphony Indicator Component
const SystemSymphonyIndicator = () => (
  <div className='flex items-center gap-tactical'>
    <div className='flex items-center'>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className='h-2 w-2 rounded-full bg-brand-teal-primary'
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
    <span className='font-bold text-foreground'>94% harmony</span>
  </div>
);

// Main Automation Liberation Orchestra Component
const AutomationLiberationOrchestra = () => {
  const { theme, setTheme } = useTheme();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, delay: 0.2 } },
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      {/* Theme Toggle */}
      <div className='fixed right-tactical top-tactical z-header'>
        <motion.button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileTap={{ scale: 0.9, rotate: 15 }}
          className='flex h-icon-lg w-icon-lg items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm'
        >
          {theme === 'dark' ? <Sun className='h-icon-sm w-icon-sm' /> : <Moon className='h-icon-sm w-icon-sm' />}
        </motion.button>
      </div>

      <div className='mx-auto'>
        <motion.div variants={variants} initial='hidden' animate='visible' className='space-y-tactical'>
          <div className='flex items-center gap-tactical px-tactical'>
            <Bot className='text-brand-teal-primary' />
            <h2 className='text-xl font-bold text-foreground'>AUTOMATION LIBERATION ORCHESTRA</h2>
          </div>

          <Card className='rounded-executive border border-border bg-card/50 backdrop-blur-xl'>
            <CardContent className='space-y-tactical p-strategic'>
              <LiberationMetric
                icon={<Timer className='text-muted-foreground' />}
                label='LIBERATION METRICS'
                valueElement={
                  <span className='relative text-lg font-bold text-brand-teal-primary'>
                    47h saved
                    <motion.div
                      className='absolute -inset-2'
                      animate={{
                        boxShadow: [
                          '0 0 0px 0px hsla(173, 100%, 30%, 0)',
                          '0 0 10px 0px hsla(173, 100%, 30%, 0.5)',
                          '0 0 0px 0px hsla(173, 100%, 30%, 0)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </span>
                }
              />
              <LiberationMetric
                icon={<Heart className='text-muted-foreground' />}
                label='STRESS ELIMINATION'
                value='89% tasks automated'
              />
              <LiberationMetric
                icon={<Bed className='text-muted-foreground' />}
                label='WHILE YOU SLEPT'
                value='127 orders fully processed'
              />
              <LiberationMetric
                icon={<Workflow className='text-muted-foreground' />}
                label='SYSTEM SYMPHONY'
                valueElement={<SystemSymphonyIndicator />}
              />

              <div className='flex items-center gap-tactical pt-tactical'>
                <Button
                  variant='secondary'
                  className='rounded-premium px-tactical py-tactical text-sm font-bold'
                  asChild
                >
                  <motion.button whileTap={{ scale: 0.95 }}>View Full Orchestra</motion.button>
                </Button>
                <Button variant='ghost' className='rounded-premium px-tactical py-tactical text-sm font-bold' asChild>
                  <motion.button whileTap={{ scale: 0.95 }}>Optimize Workflows</motion.button>
                </Button>
                <Button
                  variant='outline'
                  className='rounded-premium border-brand-teal-primary px-tactical py-tactical text-sm font-bold text-brand-teal-primary'
                  asChild
                >
                  <motion.button whileTap={{ scale: 0.95 }}>Add Automation</motion.button>
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
  return <AutomationLiberationOrchestra />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
