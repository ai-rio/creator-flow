/* eslint-disable */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Book, Bot, ChevronDown, Flame, LogOut, Moon, Radio, Sun, Target, User, Wrench, Zap } from 'lucide-react';

// === MIGRATED FROM DC-010-ShmDashboard.tsx ===
// Applied Phase 1 Design System Tokens
// Moved to atomic/organisms for proper component hierarchy

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// --- THEME MANAGEMENT with Design System Tokens ---
const ThemeToggle = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className='rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

// --- GLASS MORPHISM COMPONENT with Design System Tokens ---
const GlassPane: React.FC<ComponentProps> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-border bg-glass-content-light backdrop-blur-xl dark:border-border dark:bg-glass-content-dark ${className}`}
  >
    {children}
  </div>
);

// --- HOOK for detecting outside clicks ---
const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

// --- ADMIN DESKTOP HEADER with Design System Integration ---
const AdminDesktopHeader = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const systemIcons = [
    { icon: <Wrench size={16} />, key: 'wrench' },
    { icon: <Target size={16} />, key: 'target' },
    { icon: <Flame size={16} />, key: 'flame' },
  ];

  const dropdownItems = [
    { icon: <User size={16} />, label: 'Profile Settings' },
    { icon: <Radio size={16} />, label: 'API Status' },
    { icon: <Book size={16} />, label: 'Documentation' },
    { icon: <LogOut size={16} />, label: 'Logout' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring' as any, stiffness: 80, damping: 20 }}
      className='fixed left-4 right-4 top-4 z-header'
    >
      <GlassPane className='flex items-center justify-between p-strategic px-6'>
        <div className='flex items-center gap-4'>
          <Zap className='text-brand-purple-600 dark:text-brand-purple-400' />
          <h1 className='hidden text-xl font-bold text-foreground md:block'>CreatorFlow Admin Command Center</h1>
          <h1 className='text-xl font-bold text-foreground md:hidden'>Admin CC</h1>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3 rounded-full bg-accent/50 p-2'>
            {systemIcons.map((item) => (
              <div key={item.key} className='text-brand-teal-600 dark:text-brand-teal-400'>
                {item.icon}
              </div>
            ))}
          </div>
          <div className='h-6 w-px bg-border'></div>

          {/* --- USER DROPDOWN with Design System Colors --- */}
          <div className='relative' ref={dropdownRef}>
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2'
            >
              <img
                src='https://placehold.co/32x32/0A090F/E2E8F0?text=A'
                alt='Admin Avatar'
                className='h-8 w-8 rounded-full border-2 border-border'
              />
              <span className='hidden text-sm font-bold text-foreground lg:block'>admin</span>
              <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                <ChevronDown size={16} className='text-muted-foreground' />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className='absolute right-0 top-12 w-56 origin-top-right'
                >
                  <GlassPane className='p-2'>
                    <ul className='space-y-1'>
                      {dropdownItems.map((item) => (
                        <li key={item.label}>
                          <a
                            href='#'
                            className='flex items-center gap-3 rounded-lg p-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                          >
                            {item.icon}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </GlassPane>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* --- END USER DROPDOWN --- */}

          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </GlassPane>
    </motion.header>
  );
};

// --- MAIN ADMIN DASHBOARD ORGANISM ---
export default function AdminDashboardHeader(): React.JSX.Element {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className='min-h-screen bg-background font-sans text-foreground transition-colors duration-300'>
      <AdminDesktopHeader theme={theme} setTheme={setTheme} />

      <main className='px-4 pt-24'>
        <p className='text-center text-muted-foreground'>Main content area. A2 through A6 will be built here.</p>
      </main>
    </div>
  );
}
