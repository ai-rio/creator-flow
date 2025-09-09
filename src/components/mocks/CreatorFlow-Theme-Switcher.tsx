import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
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

// --- Main App Component ---
// This serves as the root of our application, managing the theme state.
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');

  // Effect to toggle the 'dark' class on the HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    // The main container that changes color based on the theme
    <div
      className={`
      flex min-h-screen flex-col items-center justify-center 
      bg-slate-100 font-sans 
      text-slate-900 transition-colors 
      duration-500 dark:bg-[#0A090F] dark:text-slate-100
    `}
    >
      {/* Import Inter font from Google Fonts */}
      <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            body { font-family: 'Inter', sans-serif; }
        `}</style>

      <div className='text-center'>
        <motion.h1
          key={theme}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-4xl font-bold'
        >
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </motion.h1>
        <p className='mt-2 text-slate-600 dark:text-slate-400'>Click the button to switch themes.</p>
      </div>

      {/* --- THEME TOGGLE BUTTON --- */}
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

// --- Reusable Theme Toggle Button Component ---
const ThemeToggleButton = ({ theme, toggleTheme }: any) => (
  <motion.button
    onClick={toggleTheme}
    className='
        fixed right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full 
        border border-slate-900/10
        bg-white/50 text-slate-800 backdrop-blur-lg 
        focus:outline-none focus:ring-2 
        focus:ring-purple-500
        focus:ring-offset-2 focus:ring-offset-slate-100 dark:border-slate-100/10 
        dark:bg-slate-800/50 dark:text-slate-200 dark:focus:ring-offset-[#0A090F]
      '
    aria-label='Toggle theme'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9, rotate: -15 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
  >
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0, rotate: -30 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 20, opacity: 0, rotate: 30 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);
