/* eslint-disable */
import React, { useState, useEffect } from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import {
  AreaChart,
  BarChart,
  Bell,
  Bot,
  ChevronDown,
  CircleHelp,
  Flame,
  Gauge,
  Moon,
  Pin,
  ServerCog,
  Settings,
  ShieldAlert,
  Sun,
  Target,
  Wrench,
  Zap,
} from 'lucide-react';

// --- THEME MANAGEMENT (Placeholder for brevity) ---
const ThemeToggle = ({ theme, settheme }: any) => {
  return (
    <motion.button
      onClick={() => settheme(theme === 'dark' ? 'light' : 'dark')}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className='rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-500/10 dark:text-slate-400'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

// --- BASE COMPONENT: GlassPane (Placeholder for brevity) ---
const GlassPane: React.FC<any> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/60 backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-400/10 ${className}`}
  >
    {children}
  </div>
);

// --- A-SERIES COMPONENTS (Admin) ---

// A1 & A2 Placeholders
const AdminDesktopHeader = ({ theme, settheme }: any) => {
  return (
    <motion.header className='fixed left-4 right-4 top-4 z-50'>
      <GlassPane className='flex h-16 items-center justify-between p-3 px-6'>
        <h1 className='font-bold'>A1: Header</h1>
        <ThemeToggle theme={theme} settheme={settheme} />
      </GlassPane>
    </motion.header>
  );
};
const AdminSidebarNav = ({ isExpanded, onPinToggle, onHoverStart, onHoverEnd }: any) => {
  return (
    <motion.aside
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className='fixed bottom-4 left-4 top-24 z-40 hidden md:flex'
      animate={{ width: isExpanded ? '16rem' : '4.5rem' }}
    >
      <div className='flex h-full w-full items-end justify-center rounded-2xl bg-white/30 p-2 dark:bg-slate-500/5'>
        <button onClick={onPinToggle} className='p-2'>
          <Pin size={20} />
        </button>
      </div>
    </motion.aside>
  );
};

// A3, A4, A5 Placeholders
const PlaceholderCard: React.FC<any> = ({ title }) => (
  <motion.div>
    <GlassPane className='flex min-h-[12rem] items-center justify-center p-4'>
      <h2 className='text-xl font-bold text-slate-500'>{title}</h2>
    </GlassPane>
  </motion.div>
);

// [REBUILT with Enhanced UX] A6: EmergencySystemControlsCard
const ControlButton = ({ label, tooltip, isDanger = false, onAction }: any) => {
  const [isHovered, setisHovered] = useState<any>(false);
  return (
    <div className='relative w-full' onMouseEnter={() => setisHovered(true)} onMouseLeave={() => setisHovered(false)}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onAction}
        className={`w-full rounded-lg px-3 py-2 text-center text-sm font-bold transition-colors ${
          isDanger
            ? 'bg-red-600/10 text-red-600 hover:bg-red-600/20 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20'
            : 'bg-slate-500/10 text-slate-800 hover:bg-slate-500/20 dark:text-slate-200'
        }`}
      >
        {label}
      </motion.button>
      <AnimatePresence>
        {isHovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className='absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 p-0'
          >
            <GlassPane className='px-3 py-1.5'>
              <p className='text-xs font-semibold'>{tooltip}</p>
            </GlassPane>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HoldToConfirmButton = ({ label, tooltip }: any) => {
  const [isHovered, setisHovered] = useState<any>(false);
  const controls = useAnimation();
  const handleHoldStart = () => {
    controls
      .start({
        width: '100%',
        transition: { duration: 1.5, ease: 'linear' },
      })
      .then(() => {
        console.log('EMERGENCY ACTION CONFIRMED!');
        // Add actual action dispatch here
      });
  };
  const handleHoldEnd = () => {
    controls.stop();
    controls.set({ width: '0%' });
  };

  return (
    <div className='relative w-full' onMouseEnter={() => setisHovered(true)} onMouseLeave={() => setisHovered(false)}>
      <motion.button
        onTapStart={handleHoldStart}
        onTapCancel={handleHoldEnd}
        onTap={handleHoldEnd}
        className='relative w-full overflow-hidden rounded-lg bg-red-600/10 px-3 py-2 text-center text-sm font-bold text-red-600 transition-colors hover:bg-red-600/20 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20'
      >
        <motion.div
          className='absolute left-0 top-0 h-full bg-red-600/50 dark:bg-red-500/50'
          initial={{ width: '0%' }}
          animate={controls}
        />
        <span className='relative z-10'>Hold to Stop</span>
      </motion.button>
      <AnimatePresence>
        {isHovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className='absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 p-0'
          >
            <GlassPane className='px-3 py-1.5'>
              <p className='text-xs font-semibold'>{tooltip}</p>
            </GlassPane>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmergencySystemControlsCard = () => {
  const controlGroups = [
    {
      title: 'CRISIS MANAGEMENT',
      controls: [
        { label: 'Hold to Stop', isDanger: true, tooltip: 'Press and hold to halt all system automations.' },
        { label: 'Traffic Routing', tooltip: 'Redirect incoming user traffic.' },
      ],
    },
    {
      title: 'BULK OPERATIONS',
      controls: [
        { label: 'Mass Order Update', tooltip: 'Apply a status update to a batch of orders.' },
        { label: 'Force Inventory Sync', tooltip: 'Initiate a full sync across all inventory.' },
      ],
    },
    {
      title: 'SYSTEM SCALING',
      controls: [
        { label: 'Auto-Scale Up', tooltip: 'Provision additional resources for 1 hour.' },
        { label: 'Performance Mode', tooltip: 'Prioritize system speed over background tasks.' },
      ],
    },
    {
      title: 'DATA OPERATIONS',
      controls: [
        { label: 'Trigger Backup', tooltip: 'Create a manual snapshot of the database.' },
        { label: 'Sync Validation', tooltip: 'Run a checksum on all connected data.' },
      ],
    },
  ];

  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 0px 0px hsla(0, 100%, 50%, 0)',
          '0 0 0px 4px hsla(0, 100%, 50%, 0.3)',
          '0 0 0px 0px hsla(0, 100%, 50%, 0)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className='space-y-4 rounded-3xl'
    >
      <div className='flex items-center gap-3 px-2 pt-4 sm:pt-0'>
        <ShieldAlert className='text-red-600 dark:text-red-500' />
        <h2 className='text-xl font-bold text-slate-900 dark:text-slate-100'>EMERGENCY SYSTEM CONTROLS</h2>
      </div>
      <GlassPane className='p-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {controlGroups.map((group) => (
            <div key={group.title} className='space-y-2'>
              <h3 className='text-sm font-bold tracking-wider text-slate-500 dark:text-slate-400'>{group.title}</h3>
              <div className='flex flex-col gap-2 sm:flex-row'>
                {group.controls.map((control) =>
                  control.isDanger ? (
                    <HoldToConfirmButton key={control.label} label={control.label} tooltip={control.tooltip} />
                  ) : (
                    <ControlButton key={control.label} label={control.label} tooltip={control.tooltip} />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassPane>
    </motion.div>
  );
};

// --- MAIN ADMIN APP CONTAINER ---
export default function App(): React.JSX.Element {
  const [theme, settheme] = useState<any>('dark');
  const [isHovered, setisHovered] = useState<any>(false);
  const [isPinned, setisPinned] = useState<any>(false);
  const isExpanded = isPinned || isHovered;
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className='min-h-screen bg-slate-100 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0A090F] dark:text-slate-100'>
      <AdminDesktopHeader theme={theme} settheme={settheme} />
      <AdminSidebarNav
        isExpanded={isExpanded}
        isPinned={isPinned}
        onPinToggle={() => setisPinned(!isPinned)}
        onHoverStart={() => setisHovered(true)}
        onHoverEnd={() => setisHovered(false)}
      />
      <main className={`px-4 pt-24 transition-all duration-300 ease-in-out ${isExpanded ? 'md:ml-72' : 'md:ml-24'}`}>
        <div className='space-y-8 p-4'>
          <PlaceholderCard title='A3: Unified System Health' />
          <PlaceholderCard title='A4: Critical System Alerts' />
          <PlaceholderCard title='A5: System Performance Artistry' />
          <EmergencySystemControlsCard />
        </div>
      </main>
    </div>
  );
}
