/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Moon, Package, Sun, TrendingUp } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
const inventory = {
  secure: Array.from({ length: 8 }, (_, i) => ({ id: `hoodie-${i}`, name: 'Creator Hoodie' })),
  opportunity: Array.from({ length: 4 }, (_, i) => ({ id: `mug-${i}`, name: 'Creator Mug' })),
  at_risk: [
    { id: 'cap-1', name: 'Limited Edition Cap' },
    { id: 'shirt-1', name: 'Viral T-Shirt' },
  ],
};

const pods = [
  { id: 'at_risk', Icon: AlertTriangle, title: 'At Risk', color: 'destructive' },
  { id: 'opportunity', Icon: TrendingUp, title: 'Opportunity', color: 'brand-purple-primary' },
  { id: 'secure', Icon: Package, title: 'Secure Stock', color: 'brand-teal-primary' },
];

// Data Core Component
const DataCore: React.FC<any> = ({ activePod }: any) => {
  const getColorVar = (colorName: string) => {
    switch (colorName) {
      case 'destructive':
        return 'hsl(var(--destructive))';
      case 'brand-purple-primary':
        return 'hsl(var(--brand-purple-primary))';
      case 'brand-teal-primary':
        return 'hsl(var(--brand-teal-primary))';
      default:
        return 'hsl(var(--brand-teal-primary))';
    }
  };

  const activePodData = activePod ? pods.find((p) => p.id === activePod) : null;
  const coreColor = activePodData ? getColorVar(activePodData.color) : getColorVar('brand-teal-primary');

  return (
    <div className='col-span-1 col-start-2 row-span-2 flex items-center justify-center'>
      <motion.div
        className='relative h-48 w-48 md:h-64 md:w-64'
        animate={{ scale: activePod ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.div className='absolute inset-0 rounded-full opacity-30' style={{ border: `2px solid ${coreColor}` }} />
        <motion.div
          className='absolute inset-2 rounded-full opacity-30'
          style={{ border: `2px solid ${coreColor}` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className='absolute inset-4 rounded-full opacity-30'
          style={{ border: `2px solid ${coreColor}` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className='absolute inset-8 rounded-full'
          style={{ background: `radial-gradient(circle, ${coreColor} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

// Strategic Pod Component
const StrategicPod = ({ pod, setActivePod }: any) => {
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'destructive':
        return 'text-destructive';
      case 'brand-purple-primary':
        return 'text-brand-purple-primary';
      case 'brand-teal-primary':
        return 'text-brand-teal-primary';
      default:
        return 'text-brand-teal-primary';
    }
  };

  return (
    <motion.div
      className={`flex items-center justify-center
            ${pod.id === 'at_risk' ? 'col-start-1 row-start-1' : ''}
            ${pod.id === 'opportunity' ? 'col-start-3 row-start-1' : ''}
            ${pod.id === 'secure' ? 'col-span-3 col-start-1 row-start-2' : 'col-span-1'}
        `}
      onHoverStart={() => setActivePod(pod.id)}
    >
      <div className='relative flex h-32 w-full max-w-xs items-center justify-center gap-tactical rounded-executive border border-border/20 bg-background/40 p-tactical backdrop-blur-md'>
        <pod.Icon className={`h-icon-xl w-icon-xl ${getColorClass(pod.color)}`} />
        <div>
          <h3 className='text-heading-lg font-bold text-foreground'>{pod.title}</h3>
          <p className='text-muted-foreground'>{(inventory as any)[pod.id].length} Items</p>
        </div>
      </div>
    </motion.div>
  );
};

// Briefing Tooltip Component
const BriefingTooltip: React.FC<any> = ({ activePod }: any) => {
  const podData = activePod ? pods.find((p) => p.id === activePod) : null;
  const items = activePod ? (inventory as any)[activePod] : [];

  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'destructive':
        return 'text-destructive border-destructive';
      case 'brand-purple-primary':
        return 'text-brand-purple-primary border-brand-purple-primary';
      case 'brand-teal-primary':
        return 'text-brand-teal-primary border-brand-teal-primary';
      default:
        return 'text-brand-teal-primary border-brand-teal-primary';
    }
  };

  const position = {
    at_risk: { top: '50%', left: '0%', y: '-50%' },
    opportunity: { top: '50%', right: '0%', y: '-50%' },
    secure: { bottom: '100%', left: '50%', x: '-50%', y: '-20px' },
  };

  return (
    <AnimatePresence>
      {activePod && podData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={(position as any)[activePod]}
          className='absolute z-10 w-64 rounded-executive border border-border/20 bg-background/40 backdrop-blur-md'
        >
          <div className={`border-b p-tactical ${getColorClass(podData.color)}`}>
            <h4 className='font-bold'>{podData.title} Briefing</h4>
          </div>
          <div className='tooltip-content max-h-48 overflow-y-auto p-tactical'>
            <ul className='space-y-tactical'>
              {items.map((item: any) => (
                <li key={item.id} className='text-body-sm text-muted-foreground'>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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

// Main Digital Twin Command Component
const DigitalTwinCommand = () => {
  const [activePod, setActivePod] = useState<any>(null);

  return (
    <>
      <style>{`
        .tooltip-content::-webkit-scrollbar { width: 4px; }
        .tooltip-content::-webkit-scrollbar-thumb { background: hsl(var(--brand-teal-primary)); border-radius: 4px; }
      `}</style>
      <div className='flex min-h-screen w-full flex-col items-center justify-center p-tactical'>
        <div className='text-center'>
          <h2 className='text-heading-2xl md:text-heading-3xl font-black text-foreground'>Your Inventory, in Focus.</h2>
          <p className='mx-auto mt-tactical max-w-content text-body-lg text-muted-foreground'>
            Real-time clarity is the strategic overview you need to protect assets and seize opportunities, delivered
            instantly.
          </p>
        </div>

        <div
          className='relative mt-command grid h-[500px] w-full max-w-content grid-cols-3 grid-rows-2 gap-strategic'
          onMouseLeave={() => setActivePod(null)}
        >
          <DataCore activePod={activePod} />
          {pods.map((pod) => (
            <StrategicPod key={pod.id} pod={pod} setActivePod={setActivePod} />
          ))}
          <BriefingTooltip activePod={activePod} />
        </div>
      </div>
    </>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background font-sans transition-colors duration-300'>
      <DigitalTwinCommand />
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
