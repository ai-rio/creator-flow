/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

/**
 * IM-ThemeToggle - Theme Toggle Button Component
 *
 * A sophisticated theme toggle button with motion animations for inventory management interfaces.
 * Features executive-level polish with glass morphism effects and smooth transitions.
 *
 * @component
 * @example
 * ```tsx
 * <IM_ThemeToggle
 *   theme="dark"
 *   onToggle={(theme) => console.log(`Switched to ${theme}`)}
 * />
 * ```
 */

// Theme Context for component browser compatibility
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

// Component Props Interface
interface IM_ThemeToggleProps {
  /** Current theme state */
  theme?: 'light' | 'dark';
  /** Theme toggle callback function */
  onToggle?: (theme: 'light' | 'dark') => void;
  /** Additional CSS classes */
  className?: string;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
}

// Main Theme Toggle Component
const IM_ThemeToggle: React.FC<IM_ThemeToggleProps> = ({
  theme = 'dark',
  onToggle = () => {},
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'p-2',
    md: 'p-tactical',
    lg: 'p-strategic',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    onToggle(newTheme);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9, rotate: 15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
    >
      <Button
        variant='ghost'
        size='icon'
        onClick={toggleTheme}
        className={`
          rounded-premium ${sizeClasses[size]}
          text-muted-foreground backdrop-blur-sm
          transition-colors
          duration-medium hover:bg-accent/50
          hover:text-foreground
        `}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {theme === 'dark' ? <Sun size={iconSizes[size]} /> : <Moon size={iconSizes[size]} />}
        </motion.div>
      </Button>
    </motion.div>
  );
};

// Demo Component for Component Browser
const IM_ThemeToggleDemo: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content space-y-strategic'>
        <div className='space-y-tactical text-center'>
          <h2 className='text-heading-lg text-foreground'>Theme Toggle Demo</h2>
          <p className='text-body-md text-muted-foreground'>Interactive theme toggle with executive-level polish</p>
        </div>

        <div className='grid grid-cols-1 gap-strategic md:grid-cols-3'>
          {/* Small Size */}
          <div className='rounded-executive border border-border/20 bg-card p-strategic'>
            <h3 className='mb-tactical text-heading-md text-card-foreground'>Small Size</h3>
            <div className='flex items-center justify-center rounded-premium bg-accent/20 p-strategic'>
              <IM_ThemeToggle theme={theme} onToggle={setTheme} size='sm' />
            </div>
          </div>

          {/* Medium Size */}
          <div className='rounded-executive border border-border/20 bg-card p-strategic'>
            <h3 className='mb-tactical text-heading-md text-card-foreground'>Medium Size</h3>
            <div className='flex items-center justify-center rounded-premium bg-accent/20 p-strategic'>
              <IM_ThemeToggle theme={theme} onToggle={setTheme} size='md' />
            </div>
          </div>

          {/* Large Size */}
          <div className='rounded-executive border border-border/20 bg-card p-strategic'>
            <h3 className='mb-tactical text-heading-md text-card-foreground'>Large Size</h3>
            <div className='flex items-center justify-center rounded-premium bg-accent/20 p-strategic'>
              <IM_ThemeToggle theme={theme} onToggle={setTheme} size='lg' />
            </div>
          </div>
        </div>

        <div className='rounded-executive bg-muted/30 p-strategic text-center'>
          <p className='text-body-md text-muted-foreground'>
            Current Theme: <span className='font-semibold text-foreground'>{theme}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <IM_ThemeToggleDemo />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
