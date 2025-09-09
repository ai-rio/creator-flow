/* eslint-disable */
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Moon, Package, Sun, TrendingUp } from 'lucide-react';
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
  textPrimary: 'text-slate-100',
  textSecondary: 'text-slate-400',
  glassBg: 'bg-black/20',
  border: 'border-slate-100/10',
  sparkColor: '#2DD4BF',
  coreColor: '#2DD4BF',
  riskColor: '#ef4444',
  opportunityColor: '#8b5cf6',
};

const lightTheme = {
  background: 'linear-gradient(180deg, #f5f3ff 0%, #fafafa 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-700',
  glassBg: 'bg-white/40',
  border: 'border-slate-900/10',
  sparkColor: '#0d9488',
  coreColor: '#0d9488',
  riskColor: '#dc2626',
  opportunityColor: '#7c3aed',
};

// --- Data ---
const inventory = {
  secure: Array.from({ length: 8 }, (_, i) => ({ id: `hoodie-${i}`, name: 'Creator Hoodie' })),
  opportunity: Array.from({ length: 4 }, (_, i) => ({ id: `mug-${i}`, name: 'Creator Mug' })),
  at_risk: [
    { id: 'cap-1', name: 'Limited Edition Cap' },
    { id: 'shirt-1', name: 'Viral T-Shirt' },
  ],
};

const pods = [
  { id: 'at_risk', Icon: AlertTriangle, title: 'At Risk', color: 'riskColor' },
  { id: 'opportunity', Icon: TrendingUp, title: 'Opportunity', color: 'opportunityColor' },
  { id: 'secure', Icon: Package, title: 'Secure Stock', color: 'coreColor' },
];

// --- Main Demo Component ---
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  return (
    <div className='font-sans' style={{ background: currentTheme.background, color: currentTheme.textPrimary }}>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display.swap');
                body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
                .tooltip-content::-webkit-scrollbar { width: 4px; }
                .tooltip-content::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 4px; }
            `}</style>
      <FP030DigitalTwinCommand theme={currentTheme} />
      <ThemeToggleButton currentTheme={theme} setTheme={setTheme} />
    </div>
  );
}

// --- The Definitive FP-030 "Digital Twin Command" ---
const FP030DigitalTwinCommand: React.FC<any> = ({ theme }: any) => {
  const [activePod, setActivePod] = useState<any>(null);

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center p-4'>
      <div className='text-center'>
        <h2 className={`text-6xl font-black md:text-8xl ${theme.textPrimary}`}>Your Inventory, in Focus.</h2>
        <p className={`mx-auto mt-4 max-w-3xl text-lg ${theme.textSecondary}`}>
          Real-time clarity is the strategic overview you need to protect assets and seize opportunities, delivered
          instantly.
        </p>
      </div>

      <div
        className='relative mt-16 grid h-[500px] w-full max-w-5xl grid-cols-3 grid-rows-2 gap-8'
        onMouseLeave={() => setActivePod(null)}
      >
        <DataCore activePod={activePod} theme={theme} />
        {pods.map((pod) => (
          <StrategicPod key={pod.id} pod={pod} setActivePod={setActivePod} theme={theme} />
        ))}
        <BriefingTooltip activePod={activePod} theme={theme} />
      </div>
    </div>
  );
};

// --- Interactive Sub-Components ---

const DataCore: React.FC<any> = ({ activePod, theme }: any) => {
  const coreColor = activePod ? theme[(pods.find((p: any) => p.id === activePod) as any)?.color] : theme.coreColor;
  return (
    <div className='col-span-1 col-start-2 row-span-2 flex items-center justify-center'>
      <motion.div
        className='relative h-48 w-48 md:h-64 md:w-64'
        animate={{ scale: activePod ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.div
          className='absolute inset-0 rounded-full'
          style={{ border: `2px solid ${coreColor}`, opacity: 0.3 }}
        />
        <motion.div
          className='absolute inset-2 rounded-full'
          style={{ border: `2px solid ${coreColor}`, opacity: 0.3 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className='absolute inset-4 rounded-full'
          style={{ border: `2px solid ${coreColor}`, opacity: 0.3 }}
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

const StrategicPod = ({ pod, setActivePod, theme }: any) => (
  <motion.div
    className={`flex items-center justify-center
            ${pod.id === 'at_risk' ? 'col-start-1 row-start-1' : ''}
            ${pod.id === 'opportunity' ? 'col-start-3 row-start-1' : ''}
            ${pod.id === 'secure' ? 'col-span-3 col-start-1 row-start-2' : 'col-span-1'}
        `}
    onHoverStart={() => setActivePod(pod.id)}
  >
    <div
      className={`relative flex h-32 w-full max-w-xs items-center justify-center gap-4 rounded-2xl border p-6 backdrop-blur-md ${theme.glassBg} ${theme.border}`}
    >
      <pod.Icon className='h-8 w-8' style={{ color: theme[pod.color] }} />
      <div>
        <h3 className={`text-xl font-bold ${theme.textPrimary}`}>{pod.title}</h3>
        <p className={theme.textSecondary}>{(inventory as any)[pod.id].length} Items</p>
      </div>
    </div>
  </motion.div>
);

const BriefingTooltip: React.FC<any> = ({ activePod, theme }: any) => {
  const podData = activePod ? pods.find((p) => p.id === activePod) : null;
  const items = activePod ? (inventory as any)[activePod] : [];

  const position = {
    at_risk: { top: '50%', left: '0%', y: '-50%' },
    opportunity: { top: '50%', right: '0%', y: '-50%' },
    secure: { bottom: '100%', left: '50%', x: '-50%', y: '-20px' },
  };

  return (
    <AnimatePresence>
      {activePod && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={(position as any)[activePod]}
          className={`absolute z-10 w-64 rounded-2xl border backdrop-blur-md ${theme.glassBg} ${theme.border}`}
        >
          <div className='border-b p-4' style={{ borderColor: theme[(podData as any)?.color] }}>
            <h4 className='font-bold' style={{ color: theme[(podData as any)?.color] }}>
              {(podData as any)?.title} Briefing
            </h4>
          </div>
          <div className='tooltip-content max-h-48 overflow-y-auto p-4'>
            <ul className='space-y-2'>
              {items.map((item: any) => (
                <li key={item.id} className={`text-sm ${theme.textSecondary}`}>
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
