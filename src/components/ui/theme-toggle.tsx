'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  showLabel?: boolean;
}

export function ThemeToggle({ className, size = 'md', variant = 'outline', showLabel = true }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  return (
    <Button
      variant={variant}
      size='icon'
      onClick={toggleTheme}
      className={cn(
        sizeClasses[size],
        'relative transition-all duration-200 hover:scale-105',
        theme === 'dark'
          ? 'border-teal-500/50 bg-teal-950/50 hover:border-teal-400/60 hover:bg-teal-900/50'
          : 'border-purple-300/50 bg-purple-50/50 hover:border-purple-400/60 hover:bg-purple-100/50',
        className
      )}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          'absolute text-amber-500 transition-all duration-300',
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        )}
        size={iconSizes[size]}
      />
      <Moon
        className={cn(
          'absolute text-blue-400 transition-all duration-300',
          theme === 'dark' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        )}
        size={iconSizes[size]}
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}

// Global theme toggle with enhanced styling for component browser
export function GlobalThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex animate-pulse items-center gap-2 rounded-lg bg-gray-200 px-3 py-2'>
        <div className='h-4 w-4 rounded bg-gray-300' />
        <span className='text-sm text-gray-600'>Loading theme...</span>
      </div>
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Add immediate visual feedback
    document.documentElement.style.transition = 'background-color 0.3s ease';

    // Debug logging to verify theme switching
    console.log(`Theme switched from ${theme} to ${newTheme}`);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02]',
        theme === 'dark'
          ? 'border-teal-600/30 bg-teal-950/80 text-teal-100 shadow-lg hover:bg-teal-900/80'
          : 'border-purple-300/30 bg-purple-50/80 text-purple-700 shadow-md hover:bg-purple-100/80',
        className
      )}
      title={`Currently ${theme} mode - click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className='relative h-4 w-4'>
        <Sun
          className={cn(
            'absolute text-amber-500 transition-all duration-300',
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          )}
          size={16}
        />
        <Moon
          className={cn(
            'absolute text-blue-400 transition-all duration-300',
            theme === 'dark' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          )}
          size={16}
        />
      </div>
      <span className='font-semibold capitalize'>{theme} Mode</span>
      <span className='rounded bg-black/10 px-1 py-0.5 text-xs opacity-70 dark:bg-white/10'>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
