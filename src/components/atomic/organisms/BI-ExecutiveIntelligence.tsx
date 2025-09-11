/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { BarChart3, Palette, Target, Zap, ShieldCheck, TrendingUp, Bot, Moon, Sun } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

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

// Data Flow Visualization Component
const DataFlowVisualization = () => {
  const flowPoints = ['TikTok Viral', 'Order Mgmt', 'Inventory', 'Ship Auto', 'Fulfill', 'Analytics', 'Growth'];
  return (
    <div className='w-full px-4 py-6'>
      <div className='flex items-center'>
        {flowPoints.map((_, i) => (
          <React.Fragment key={i}>
            <motion.div
              className='h-3 w-3 rounded-full bg-purple-700 dark:bg-purple-400'
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            />
            {i < flowPoints.length - 1 && <div className='h-[2px] flex-1 bg-slate-300 dark:bg-slate-700/50'></div>}
          </React.Fragment>
        ))}
      </div>
      <div className='mt-3 flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-400 sm:text-xs'>
        {flowPoints.map((p) => (
          <span key={p} className='w-16 text-center'>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
};

// Strategic KPI List Component
const StrategicKpiList = () => {
  const kpis = [
    {
      icon: <Target className='text-brand-teal-primary' />,
      label: 'Content-to-Revenue:',
      value: '$247/video (TikTok correlation)',
    },
    {
      icon: <Zap className='text-brand-purple-primary' />,
      label: 'End-to-End Efficiency:',
      value: '94% fully automated',
    },
    {
      icon: <ShieldCheck className='text-brand-blue-primary' />,
      label: 'Cross-System Health:',
      value: 'All systems optimal',
    },
    {
      icon: <TrendingUp className='text-success-green-500' />,
      label: 'Growth Trajectory:',
      value: '340% YoY sustainable scaling',
    },
    {
      icon: <Bot className='text-warning-amber-500' />,
      label: 'AI Recommendation:',
      value: 'Ready for EU market expansion',
    },
  ];

  return (
    <div className='rounded-premium border border-border bg-muted/50 p-strategic'>
      <h4 className='mb-tactical flex items-center gap-tactical bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-lg font-bold text-transparent'>
        <Target className='h-icon-sm w-icon-sm text-foreground' /> Strategic KPIs
      </h4>
      <ul className='space-y-tactical'>
        {kpis.map((kpi) => (
          <li key={kpi.label} className='flex items-start gap-tactical text-sm'>
            <div className='mt-0.5 flex-shrink-0'>{kpi.icon}</div>
            <div>
              <span className='font-semibold text-muted-foreground'>{kpi.label}</span>
              <span className='ml-2 font-bold text-foreground'>{kpi.value}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Executive Business Intelligence Component
const ExecutiveBusinessIntelligence = () => {
  const { theme, setTheme } = useTheme();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as any as any, delay: 0.2 } },
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
            <BarChart3 className='text-muted-foreground' />
            <h2 className='text-xl font-bold text-foreground'>EXECUTIVE CROSS-SYSTEM BUSINESS INTELLIGENCE</h2>
          </div>

          <Card className='rounded-executive border border-border bg-card/50 backdrop-blur-xl'>
            <CardContent className='space-y-tactical p-strategic'>
              <h3 className='flex items-center justify-center gap-tactical text-center text-lg font-bold text-foreground'>
                <Palette className='h-icon-sm w-icon-sm' /> UNIFIED BUSINESS MASTERPIECE
              </h3>
              <DataFlowVisualization />
              <StrategicKpiList />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const AppContent = () => {
  return <ExecutiveBusinessIntelligence />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
