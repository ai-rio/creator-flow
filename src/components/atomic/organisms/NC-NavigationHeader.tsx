/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ChevronDown, Sun, Moon, Zap, CheckCircle, Brain } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Theme Context & Provider
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

// Status Indicator Component
const StatusIndicator = ({ icon: Icon, variant, pulse = false }: any) => (
  <div
    className={`
    relative flex h-icon-md w-icon-md items-center justify-center 
    rounded-full border-2 bg-background/50 backdrop-blur-sm
    ${variant === 'warning' ? 'border-warning-amber-500/50 text-warning-amber-500' : ''}
    ${variant === 'success' ? 'border-success-teal-500/50 text-success-teal-500' : ''}
    ${variant === 'info' ? 'border-brand-purple-500/50 text-brand-purple-500' : ''}
  `}
  >
    {pulse && <div className='absolute inset-0 animate-ping rounded-full bg-current opacity-50' />}
    <Icon className='relative h-icon-sm w-icon-sm' />
  </div>
);

// Main Navigation Header Component
const NavigationHeader = () => {
  const [time, setTime] = useState(new Date());
  const [isActionsOpen, setActionsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='w-full rounded-executive border-2 bg-background/50 p-strategic backdrop-blur-xl'>
      <div className='flex items-center justify-between'>
        {/* Left Side: Title & Time */}
        <div>
          <h1 className='text-heading-lg font-bold text-foreground'>CreatorFlow CEO Command Center</h1>
          <p className='text-body-sm text-muted-foreground'>
            {formattedDate} • {formattedTime}
          </p>
        </div>

        {/* Center: Global Command Bar */}
        <div className='hidden items-center gap-tactical rounded-full border-2 bg-background/50 p-tactical lg:flex'>
          <div className='relative flex items-center'>
            <Search className='absolute left-tactical h-icon-sm w-icon-sm text-muted-foreground' />
            <Input
              type='text'
              placeholder='Global Search (Orders, Products, Intel...)'
              className='w-96 rounded-premium border-0 bg-transparent pl-command pr-tactical text-foreground focus-visible:ring-2 focus-visible:ring-brand-teal-primary'
              aria-label='Global search input'
            />
          </div>
          <div className='relative'>
            <Button
              onClick={() => setActionsOpen(!isActionsOpen)}
              size='icon'
              className='h-icon-md w-icon-md rounded-full bg-foreground text-background hover:bg-foreground/90'
              aria-label='Quick actions menu'
              aria-expanded={isActionsOpen}
            >
              <Plus className='h-icon-sm w-icon-sm' />
            </Button>
            <AnimatePresence>
              {isActionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className='absolute right-0 top-full z-modal mt-tactical w-48 rounded-executive border-2 bg-background/95 p-tactical backdrop-blur-xl'
                >
                  <div className='space-y-1'>
                    <Button variant='ghost' className='w-full justify-start text-body-md'>
                      New Report
                    </Button>
                    <Button variant='ghost' className='w-full justify-start text-body-md'>
                      Create Workflow
                    </Button>
                    <Button variant='ghost' className='w-full justify-start text-body-md'>
                      Add Team Member
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Status & Profile */}
        <div className='flex items-center gap-tactical'>
          {/* Status Indicators */}
          <div className='hidden items-center gap-tactical sm:flex'>
            <StatusIndicator icon={Zap} variant='warning' pulse={true} />
            <StatusIndicator icon={CheckCircle} variant='success' />
            <StatusIndicator icon={Brain} variant='info' />
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex items-center gap-tactical p-tactical'>
                <img
                  className='h-icon-lg w-icon-lg rounded-full border-2 border-border object-cover'
                  src='https://placehold.co/100x100/8466D3/FFFFFF?text=C'
                  alt='Creator Avatar'
                />
                <div className='hidden text-left md:block'>
                  <p className='text-body-md font-bold text-foreground'>@ceo</p>
                  <p className='text-body-sm text-muted-foreground'>Creator Tier</p>
                </div>
                <ChevronDown className='h-icon-sm w-icon-sm text-muted-foreground' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48 rounded-executive border-2'>
              <DropdownMenuItem className='text-body-md'>Account Settings</DropdownMenuItem>
              <DropdownMenuItem className='text-body-md'>Billing & Subscription</DropdownMenuItem>
              <DropdownMenuItem className='text-body-md'>Help Center</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-body-md'>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant='outline'
            size='icon'
            className='h-icon-lg w-icon-lg rounded-full border-2'
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun className='h-icon-sm w-icon-sm' /> : <Moon className='h-icon-sm w-icon-sm' />}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content'>
        <NavigationHeader />
        <div className='mt-strategic text-center'>
          <h2 className='mb-tactical text-heading-lg font-bold text-foreground'>Main Content Area</h2>
          <p className='text-body-md text-muted-foreground'>
            This is a focused demonstration of the high-quality navigation header component.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
