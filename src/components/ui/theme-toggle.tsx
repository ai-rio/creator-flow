'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils/cn';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  showLabel?: boolean;
}

export function ThemeToggle({ className, size = 'md', variant = 'outline', showLabel = false }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size='icon' disabled className={cn('animate-pulse', className)}>
        <div className='h-4 w-4 rounded bg-muted' />
      </Button>
    );
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size='icon'
          className={cn(
            sizeClasses[size],
            'relative transition-all duration-300 hover:scale-105',
            // Theme-aware styling following design system
            theme === 'dark'
              ? 'bg-brand-teal-950/60 text-brand-teal-100 hover:bg-brand-teal-900/70 border-brand-teal-500/40 hover:border-brand-teal-400/60 hover:shadow-brand-teal-400/20'
              : 'border-brand-purple-300/40 bg-brand-purple-50/60 text-brand-purple-700 hover:bg-brand-purple-100/70 hover:border-brand-purple-400/60 hover:shadow-brand-purple-400/20',
            className
          )}
          title='Toggle theme'
        >
          <Sun
            className={cn(
              'absolute text-amber-500 transition-all duration-500',
              theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
            )}
            size={iconSizes[size]}
          />
          <Moon
            className={cn(
              'absolute text-blue-400 transition-all duration-500',
              theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            )}
            size={iconSizes[size]}
          />
          <Monitor
            className={cn(
              'absolute text-slate-500 transition-all duration-500',
              theme === 'system' ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-0 opacity-0'
            )}
            size={iconSizes[size]}
          />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='border-brand-teal-200/30 dark:border-brand-teal-700/30 min-w-36 bg-white/95 backdrop-blur-xl dark:bg-slate-900/95'
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className='hover:bg-brand-purple-50/50 dark:hover:bg-brand-teal-950/50 cursor-pointer gap-2'
        >
          <Sun className='h-4 w-4 text-amber-500' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='hover:bg-brand-purple-50/50 dark:hover:bg-brand-teal-950/50 cursor-pointer gap-2'
        >
          <Moon className='h-4 w-4 text-blue-400' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className='hover:bg-brand-purple-50/50 dark:hover:bg-brand-teal-950/50 cursor-pointer gap-2'
        >
          <Monitor className='h-4 w-4 text-slate-500' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Global theme toggle with enhanced styling for component browser and headers
export function GlobalThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'flex animate-pulse items-center gap-2 rounded-xl px-4 py-2 shadow-sm',
          'border border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80',
          className
        )}
      >
        <div className='h-4 w-4 rounded bg-slate-300 dark:bg-slate-600' />
        <div className='h-4 w-16 rounded bg-slate-300 dark:bg-slate-600' />
      </div>
    );
  }

  const themeConfig = {
    light: {
      icon: Sun,
      label: 'Light Mode',
      emoji: '☀️',
      bgClasses: 'border-brand-purple-300/40 bg-brand-purple-50/80 text-brand-purple-700 hover:bg-brand-purple-100/80',
      shadowClasses: 'shadow-brand-purple-300/20 hover:shadow-brand-purple-400/30',
    },
    dark: {
      icon: Moon,
      label: 'Dark Mode',
      emoji: '🌙',
      bgClasses: 'border-brand-teal-600/40 bg-brand-teal-950/80 text-brand-teal-100 hover:bg-brand-teal-900/80',
      shadowClasses: 'shadow-brand-teal-600/20 hover:shadow-brand-teal-400/30',
    },
    system: {
      icon: Monitor,
      label: 'System Mode',
      emoji: '🖥️',
      bgClasses:
        'border-slate-300/40 bg-slate-50/80 text-slate-700 hover:bg-slate-100/80 dark:border-slate-700/40 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800/80',
      shadowClasses:
        'shadow-slate-300/20 hover:shadow-slate-400/30 dark:shadow-slate-700/20 dark:hover:shadow-slate-600/30',
    },
  };

  const currentTheme = theme || 'system';
  const config = themeConfig[currentTheme as keyof typeof themeConfig];
  const IconComponent = config.icon;

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(currentTheme as (typeof themes)[number]);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setTheme(nextTheme);

    // Add smooth transition effect
    document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    // Debug logging
    console.log(`Theme switched: ${currentTheme} → ${nextTheme} (resolved: ${resolvedTheme})`);
  };

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        'group flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 hover:scale-[1.02]',
        config.bgClasses,
        config.shadowClasses,
        className
      )}
      title={`Currently ${config.label.toLowerCase()} - click to cycle themes`}
    >
      {/* Icon container with smooth transitions */}
      <div className='relative flex h-4 w-4 items-center justify-center'>
        <IconComponent className='transition-all duration-500 group-hover:scale-110' size={16} />
      </div>

      {/* Theme label */}
      <span className='font-semibold tracking-wide'>{config.label}</span>

      {/* Theme indicator badge */}
      <div className='flex items-center gap-1'>
        <span className='text-lg leading-none'>{config.emoji}</span>
        {resolvedTheme && resolvedTheme !== theme && (
          <span className='font-mono text-xs opacity-60'>({resolvedTheme})</span>
        )}
      </div>
    </button>
  );
}

// Floating theme toggle for always-visible access
export function FloatingThemeToggle({ className }: { className?: string }) {
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

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 backdrop-blur-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2',
        // Theme-aware floating button styling
        theme === 'dark'
          ? 'bg-brand-teal-950/90 text-brand-teal-300 hover:bg-brand-teal-900/95 border-brand-teal-500/50 shadow-lg shadow-brand-teal-500/20 hover:border-brand-teal-400/70 hover:shadow-brand-teal-400/30 focus:ring-brand-teal-400 focus:ring-offset-slate-900'
          : 'bg-brand-purple-50/90 hover:bg-brand-purple-100/95 border-brand-purple-400/50 text-brand-purple-600 shadow-lg shadow-brand-purple-400/20 hover:border-brand-purple-500/70 hover:shadow-brand-purple-500/30 focus:ring-brand-purple-500 focus:ring-offset-white',
        className
      )}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          'absolute text-amber-500 transition-all duration-500',
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        )}
        size={20}
      />
      <Moon
        className={cn(
          'absolute text-blue-400 transition-all duration-500',
          theme === 'dark' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        )}
        size={20}
      />
    </button>
  );
}

// Compact header theme toggle
export function HeaderThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn('h-8 w-8 animate-pulse rounded-lg bg-muted', className)} />;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative h-8 w-8 rounded-lg border transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
        theme === 'dark'
          ? 'bg-brand-teal-950/50 text-brand-teal-300 hover:bg-brand-teal-900/60 border-brand-teal-600/30 hover:border-brand-teal-500/50 focus:ring-brand-teal-400 focus:ring-offset-slate-900'
          : 'border-brand-purple-300/30 bg-brand-purple-50/50 hover:bg-brand-purple-100/60 text-brand-purple-600 hover:border-brand-purple-400/50 focus:ring-brand-purple-500 focus:ring-offset-white',
        className
      )}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label='Toggle theme'
    >
      <Sun
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-500 transition-all duration-300',
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
        )}
        size={14}
      />
      <Moon
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 transition-all duration-300',
          theme === 'dark' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        )}
        size={14}
      />
    </button>
  );
}
