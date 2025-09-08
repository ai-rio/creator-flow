/* eslint-disable */
import { AnimatePresence, motion } from 'framer-motion';
import { Database, Link, Moon, Sliders, Sun, Zap } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- Configuration & Theming ---
const darkTheme = {
  background: '#0A090F',
  textPrimary: 'text-white',
  textSecondary: 'text-slate-300',
  glassBg: 'bg-black/20',
  border: 'border-slate-100/10',
  sparkColor: '#2DD4BF',
  blueprintLine: 'rgba(45, 212, 191, 0.3)',
};

const lightTheme = {
  background: '#f0f9ff',
  textPrimary: 'text-slate-800',
  textSecondary: 'text-slate-600',
  glassBg: 'bg-white/40',
  border: 'border-slate-900/10',
  sparkColor: '#0d9488',
  blueprintLine: 'rgba(13, 148, 136, 0.3)',
};

// --- Data ---
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

// --- Main Demo Component ---
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <div className='font-sans' style={{ background: currentTheme.background }}>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display.swap');
                body { font-family: 'Inter', sans-serif; }
                .order-stream::-webkit-scrollbar { display: none; }
                .order-stream { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
      <FP020OrderManagementDefinitive theme={currentTheme} />
      <ThemeToggleButton currentTheme={theme} setTheme={setTheme} />
    </div>
  );
}

// --- The Definitive FP-020 "Command Grid" ---
const FP020OrderManagementDefinitive: React.FC<any> = ({ theme }: any) => {
  const [activePillar, setActivePillar] = useState<any>(null);

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center p-4 lg:p-8'>
      <div className='text-center'>
        <h2 className={`text-6xl font-black md:text-8xl ${theme.textPrimary}`}>One Stream. Total Control.</h2>
        <p className={`mx-auto mt-4 max-w-3xl text-lg ${theme.textSecondary}`}>
          CreatorFlow unifies every order into a singular, intelligent pipeline. Hover over a capability to see its
          direct impact.
        </p>
      </div>

      <div
        className='relative mt-16 h-[600px] w-full max-w-6xl'
        style={{ perspective: '2000px' }}
        onMouseLeave={() => setActivePillar(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='grid h-full w-full grid-cols-8 grid-rows-4 gap-6'
        >
          <LiveOrderStream activePillar={activePillar} theme={theme} />
          {featurePillars.map((pillar) => (
            <FeaturePillar key={pillar.id} pillar={pillar} setActivePillar={setActivePillar} theme={theme} />
          ))}
        </motion.div>
        <BlueprintSparks activePillar={activePillar} theme={theme} />
      </div>
    </div>
  );
};

// --- Interactive Sub-Components ---

const LiveOrderStream: React.FC<any> = ({ activePillar, theme }: any) => {
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
      className={`order-stream relative col-span-full row-span-full h-full w-full overflow-y-scroll rounded-2xl border p-6 backdrop-blur-md md:col-span-4 md:col-start-3 md:row-span-4 ${theme.glassBg} ${theme.border}`}
    >
      <div className='flex justify-between text-sm font-bold'>
        <span className={theme.textSecondary}>ORDER ID</span>
        <span className={theme.textSecondary}>VALUE</span>
        <span className={theme.textSecondary}>STATUS</span>
      </div>
      <div className='mt-4 space-y-3'>
        {mockOrders.map((order) => (
          <motion.div
            key={order.id}
            className={`flex justify-between rounded-md p-2 transition-all duration-300`}
            animate={{
              backgroundColor: activePillar === 'workflow' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              boxShadow: activePillar === 'integration' ? `0 0 10px ${theme.sparkColor}` : '0 0 0px transparent',
            }}
          >
            <span className={`font-mono text-sm ${theme.textPrimary}`}>{order.id}</span>
            <span className={`font-mono text-sm ${theme.textPrimary}`}>{order.value}</span>
            <div className='flex items-center gap-2'>
              {activePillar === 'validation' && order.status === 'FLAGGED' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='h-2 w-2 rounded-full bg-red-500'
                />
              )}
              <motion.span
                className={`text-sm font-bold ${order.status === 'FLAGGED' ? 'text-red-500' : theme.textSecondary}`}
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

const FeaturePillar = ({ pillar, setActivePillar, theme }: any) => (
  <motion.div
    style={{ gridArea: pillar.gridArea }}
    className={`hidden flex-col justify-between rounded-2xl border p-6 backdrop-blur-md md:flex ${theme.glassBg} ${theme.border}`}
    onMouseEnter={() => setActivePillar(pillar.id)}
    whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${theme.sparkColor}` }}
  >
    <div className='flex items-center gap-3'>
      <pillar.Icon className={`h-6 w-6 ${theme.textPrimary}`} />
      <h3 className={`text-lg font-bold ${theme.textPrimary}`}>{pillar.title}</h3>
    </div>
    <div className='text-right'>
      <span className={`text-sm font-bold ${theme.textSecondary}`}>ACTIVE</span>
    </div>
  </motion.div>
);

const BlueprintSparks: React.FC<any> = ({ activePillar, theme }: any) => {
  // These coordinates are percentages for responsive SVG positioning
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
            stroke={theme.sparkColor}
            strokeWidth='2'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{ duration: 0.3 }}
            style={{ filter: `drop-shadow(0 0 5px ${theme.sparkColor})` }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
};

// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ currentTheme, setTheme }: any) => (
  <motion.button
    onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    className={`fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${
      currentTheme === 'dark'
        ? 'border-slate-100/10 bg-white/5 text-slate-200'
        : 'border-slate-900/10 bg-slate-800/5 text-slate-800'
    }`}
    aria-label='Toggle theme'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9, rotate: -15 }}
  >
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={currentTheme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);
