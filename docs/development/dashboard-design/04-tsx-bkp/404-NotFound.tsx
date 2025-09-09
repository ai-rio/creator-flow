import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Home, Layers, Mail, Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

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
  textPrimary: 'text-slate-200',
  textSecondary: 'text-slate-400',
  accent: 'text-teal-300',
  glassBg: 'bg-black/30',
  border: 'border-slate-100/10',
  toggleButton: 'bg-white/5 border-slate-100/10 text-slate-200',
};

const lightTheme = {
  background: 'linear-gradient(180deg, #f0f9ff 0%, #fafafa 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  accent: 'text-teal-600',
  glassBg: 'bg-white/60',
  border: 'border-slate-300',
  toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

// --- Recalibration Options Data ---
const recalibrationOptions = [
  { Icon: Home, title: 'Return to Command Center', subtitle: 'Go to the Homepage', href: '#' },
  { Icon: Layers, title: 'Review the Armory', subtitle: 'Explore Features', href: '#' },
  { Icon: Mail, title: 'Open a Secure Channel', subtitle: 'Contact Us', href: '#' },
];

// --- Main Component ---
export default function NotFoundPage(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <div
      style={{ background: currentTheme.background }}
      className='flex min-h-screen items-center justify-center overflow-hidden p-4 font-sans antialiased'
    >
      <ThemeToggleButton theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`relative w-full max-w-3xl rounded-2xl border p-8 text-center backdrop-blur-xl md:p-12 ${currentTheme.glassBg} ${currentTheme.border}`}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/10 to-purple-500/10`}
        >
          <AlertTriangle className={`${currentTheme.accent}`} size={48} />
        </motion.div>

        <h1 className={`text-4xl font-black md:text-5xl ${currentTheme.accent}`}>Transmission Error: Invalid Route</h1>
        <p className={`mx-auto mt-4 max-w-xl text-lg ${currentTheme.textSecondary}`}>
          The path you requested is not a recognized vector within our current architecture. The system is stable. Your
          session is secure. Please select a valid strategic destination below.
        </p>

        <div className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-3'>
          {recalibrationOptions.map((option, i) => (
            <motion.a
              key={i}
              href={option.href}
              className={`block rounded-lg border p-6 text-left transition-colors duration-300 ${currentTheme.border} hover:bg-white/5`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <option.Icon className={`${currentTheme.accent} mb-3 h-8 w-8`} />
              <h3 className={`text-lg font-bold ${currentTheme.textPrimary}`}>{option.title}</h3>
              <p className={`${currentTheme.textSecondary} text-sm`}>{option.subtitle}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const ThemeToggleButton = ({ theme, setTheme, currentTheme }: any) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className={`fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${currentTheme.toggleButton}`}
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
