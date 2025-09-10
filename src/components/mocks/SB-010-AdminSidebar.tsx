/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ServerCog,
  ShieldAlert,
  Gauge,
  BarChart,
  Bell,
  Settings,
  AreaChart,
  CircleHelp,
  Pin,
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

// Navigation Item Component
const NavItem = ({
  item,
  isExpanded,
  isActive,
  isMobile,
}: {
  item: any;
  isExpanded: boolean;
  isActive?: boolean;
  isMobile?: boolean;
}) => {
  return (
    <li>
      <Button
        variant='ghost'
        className={`relative w-full gap-tactical rounded-premium p-tactical text-foreground hover:bg-accent ${
          isExpanded || isMobile ? 'justify-start' : 'justify-center'
        } ${isActive ? 'bg-accent' : ''} ${isMobile ? 'min-h-12' : ''}`}
      >
        <div className='relative flex-shrink-0'>
          {React.cloneElement(item.icon, {
            className: `h-icon-md w-icon-md ${isActive ? 'text-brand-teal-primary' : ''}`,
          })}
          {isActive && (
            <motion.div
              className='absolute -inset-1 rounded-full bg-brand-teal-primary/20'
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>
        <AnimatePresence>
          {(isExpanded || isMobile) && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`whitespace-nowrap text-sm font-semibold ${isActive ? 'text-brand-teal-primary' : ''}`}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {isActive && !isExpanded && !isMobile && (
          <motion.div
            className='absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-teal-primary'
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </Button>
    </li>
  );
};

// Main Sidebar Component
const AdminSidebar = () => {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeTab, setActiveTab] = useState('System Monitoring');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isExpanded = isPinned || isHovered;

  const navItems = [
    { icon: <ServerCog />, label: 'System Monitoring' },
    { icon: <ShieldAlert />, label: 'Crisis Management' },
    { icon: <Gauge />, label: 'Performance' },
    { icon: <BarChart />, label: 'Analytics' },
    { icon: <Bell />, label: 'Alert Management' },
    { icon: <Settings />, label: 'System Controls' },
    { icon: <AreaChart />, label: 'Capacity Planning' },
    { icon: <CircleHelp />, label: 'Help & Support' },
  ];

  const handleNavClick = (label: string) => {
    setActiveTab(label);
    setIsMobileOpen(false); // Close mobile menu on selection
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      {/* Mobile Header */}
      <div className='fixed left-tactical right-tactical top-tactical z-header md:hidden'>
        <Card className='flex items-center justify-between rounded-premium border border-border bg-card/50 p-tactical backdrop-blur-xl'>
          <Button variant='ghost' onClick={() => setIsMobileOpen(true)} className='rounded-premium p-tactical'>
            <Menu className='h-icon-md w-icon-md' />
          </Button>
          <h1 className='text-lg font-bold text-foreground'>Admin</h1>
          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            whileTap={{ scale: 0.9, rotate: 15 }}
            className='flex h-icon-lg w-icon-lg items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm'
          >
            {theme === 'dark' ? <Sun className='h-icon-sm w-icon-sm' /> : <Moon className='h-icon-sm w-icon-sm' />}
          </motion.button>
        </Card>
      </div>

      {/* Desktop Theme Toggle */}
      <div className='fixed right-tactical top-tactical z-header hidden md:block'>
        <motion.button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileTap={{ scale: 0.9, rotate: 15 }}
          className='flex h-icon-lg w-icon-lg items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm'
        >
          {theme === 'dark' ? <Sun className='h-icon-sm w-icon-sm' /> : <Moon className='h-icon-sm w-icon-sm' />}
        </motion.button>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-modal bg-background/80 backdrop-blur-sm md:hidden'
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='fixed bottom-0 left-0 top-0 z-modal w-sidebar-expanded md:hidden'
          >
            <Card className='flex h-full flex-col overflow-hidden rounded-r-executive border border-border bg-card/95 p-tactical backdrop-blur-xl'>
              {/* Mobile Header */}
              <div className='mb-strategic flex items-center justify-between'>
                <h2 className='text-lg font-bold text-foreground'>Navigation</h2>
                <Button variant='ghost' onClick={() => setIsMobileOpen(false)} className='rounded-premium p-tactical'>
                  <X className='h-icon-md w-icon-md' />
                </Button>
              </div>

              <nav className='flex-grow'>
                <ul className='flex flex-col gap-tactical'>
                  {navItems.map((item) => (
                    <div key={item.label} onClick={() => handleNavClick(item.label)}>
                      <NavItem item={item} isExpanded={true} isActive={activeTab === item.label} isMobile={true} />
                    </div>
                  ))}
                </ul>
              </nav>
            </Card>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='fixed bottom-tactical left-tactical top-tactical z-sidebar hidden flex-col md:flex'
        initial={false}
        animate={{ width: isExpanded ? 'var(--sidebar-expanded)' : 'var(--sidebar-collapsed)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Card className='flex h-full flex-col justify-between overflow-hidden rounded-executive border border-border bg-card/50 p-tactical backdrop-blur-xl'>
          <nav className='flex-grow'>
            <ul className='flex flex-col gap-tactical'>
              {navItems.map((item) => (
                <div key={item.label} onClick={() => handleNavClick(item.label)}>
                  <NavItem item={item} isExpanded={isExpanded} isActive={activeTab === item.label} />
                </div>
              ))}
            </ul>
          </nav>

          {/* Pin Button */}
          <div>
            <Button
              variant='ghost'
              onClick={() => setIsPinned(!isPinned)}
              className={`w-full gap-tactical rounded-premium p-tactical text-foreground hover:bg-accent ${
                isExpanded ? 'justify-start' : 'justify-center'
              }`}
              aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
            >
              <motion.div animate={{ rotate: isPinned ? 45 : 0 }}>
                <Pin className='h-icon-md w-icon-md' />
              </motion.div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='text-sm font-semibold'
                  >
                    Pin
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </Card>
      </motion.aside>
    </div>
  );
};

const AppContent = () => {
  return <AdminSidebar />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
