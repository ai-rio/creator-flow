import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion';
import { BadgeDollarSign, Bot, Moon, Sun, TerminalSquare } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

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
  glow: 'shadow-[0_0_60px_-15px_rgba(45,212,191,0.2)]',
  activeGlow: 'shadow-[0_0_80px_-15px_rgba(45,212,191,0.4)]',
  numberColor: 'text-teal-300',
};

const lightTheme = {
  background: 'linear-gradient(180deg, #fafafa 0%, #eef2ff 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  glassBg: 'bg-white/60',
  border: 'border-slate-300',
  glow: 'shadow-[0_0_60px_-15px_rgba(13,148,136,0.15)]',
  activeGlow: 'shadow-[0_0_80px_-15px_rgba(13,148,136,0.3)]',
  numberColor: 'text-teal-600',
};

// --- Manifesto Data ---
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

// --- Animated Counter ---
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

// --- Doctrine Card Component ---
const DoctrineCard: React.FC<any> = ({ doctrine, isActive, onClick, theme }: any) => {
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
      className={`relative min-h-[450px] w-full max-w-sm cursor-pointer rounded-3xl border p-8 transition-shadow duration-500 ${
        theme.glassBg
      } ${theme.border} ${isActive ? theme.activeGlow : theme.glow}`}
      variants={cardVariants}
      animate={isActive ? 'active' : 'dormant'}
      whileHover='primed'
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div layout='position' className='flex items-center gap-4'>
        <doctrine.Icon className={`h-8 w-8 ${theme.textPrimary}`} />
        <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>{doctrine.title}</h2>
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className='mt-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{ opacity: 0 }}
          >
            <p className={`text-lg leading-relaxed ${theme.textSecondary}`}>{doctrine.principle}</p>
            <div className='mt-8 space-y-4'>
              {doctrine.proof.map((p: any, i: any) => (
                <div key={i}>
                  <div className={`text-5xl font-black ${theme.numberColor} ${isSpecialUnit ? 'text-4xl' : ''}`}>
                    <AnimatedCounter value={p.value} isVisible={isActive} prefix={p.prefix} unit={p.unit} />
                  </div>
                  <p className={`mt-1 ${theme.textSecondary}`}>{p.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main Component ---
export default function AP020OurMission(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const [activeId, setActiveId] = useState<any>(doctrines[1].id);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <div style={{ background: currentTheme.background }} className='font-sans antialiased'>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display.swap');`}</style>
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
      <div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center space-y-8 overflow-hidden px-4 py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='text-center'
        >
          <h1 className={`text-5xl font-black md:text-7xl ${currentTheme.textPrimary}`}>
            A Manifesto of Intervention.
          </h1>
          <p className={`mx-auto mt-4 max-w-3xl text-lg md:text-xl ${currentTheme.textSecondary}`}>
            Our platform is not built on features, but on core beliefs. These three doctrines govern every line of code
            we write and every decision we make.
          </p>
        </motion.div>

        <div className='flex w-full flex-col items-center justify-center pt-16 md:flex-row md:items-start md:space-x-4'>
          {doctrines.map((d) => (
            <div key={d.id} className='my-4 w-full md:my-0 md:w-1/3'>
              <DoctrineCard
                doctrine={d}
                isActive={activeId === d.id}
                onClick={() => setActiveId(d.id)}
                theme={currentTheme}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Theme Toggle Button ---
const ThemeToggleButton: React.FC<any> = ({ theme, setTheme }: any) => {
  const buttonClasses =
    theme === 'dark'
      ? 'bg-white/5 border-slate-100/10 text-slate-200'
      : 'bg-slate-800/5 border-slate-300 text-slate-800';
  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${buttonClasses}`}
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
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
