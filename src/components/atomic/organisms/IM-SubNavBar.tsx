/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { BarChart3, RefreshCw, Settings } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { IM_GlassPane } from '../molecules/IM-GlassPane';

/**
 * IM-SubNavBar - Inventory Management Sub Navigation Component
 *
 * A sophisticated bottom navigation bar for inventory management interfaces.
 * Features glass morphism, sticky positioning, and executive-level polish.
 *
 * @component
 * @example
 * ```tsx
 * <IM_SubNavBar
 *   activeItem="analytics"
 *   onNavigate={(item) => console.log(`Navigate to ${item}`)}
 *   showBadges={true}
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

// Types
interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

// Component Props Interface
interface IM_SubNavBarProps {
  /** Navigation items array */
  navItems?: NavItem[];
  /** Currently active navigation item */
  activeItem?: string;
  /** Navigation handler */
  onNavigate?: (itemId: string) => void;
  /** Show notification badges */
  showBadges?: boolean;
  /** Navigation bar variant */
  variant?: 'default' | 'compact' | 'premium';
  /** Sticky positioning */
  sticky?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Enable animations */
  animated?: boolean;
}

// Main Sub Navigation Bar Component
const IM_SubNavBar: React.FC<IM_SubNavBarProps> = ({
  navItems = [
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <BarChart3 size={20} />,
      badge: 3,
    },
    {
      id: 'sync',
      name: 'Sync',
      icon: <RefreshCw size={20} />,
      badge: '!',
    },
    {
      id: 'config',
      name: 'Config',
      icon: <Settings size={20} />,
    },
  ],
  activeItem = 'analytics',
  onNavigate = (itemId) => console.log(`Navigate to ${itemId}`),
  showBadges = true,
  variant = 'default',
  sticky = true,
  className = '',
  animated = true,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as any,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
  };

  const isActive = (itemId: string) => activeItem === itemId;

  if (variant === 'compact') {
    return (
      <motion.div
        variants={containerVariants as any}
        initial={animated ? 'hidden' : false}
        animate={animated ? 'visible' : false}
        className={`${sticky ? 'sticky bottom-tactical' : ''} z-header ${className}`}
      >
        <IM_GlassPane variant='subtle' blur='md'>
          <div className='flex items-center justify-around p-2'>
            {navItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants as any} whileTap={{ scale: 0.95 }}>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => !(item as any).disabled && onNavigate(item.id)}
                  disabled={(item as any).disabled}
                  className={`
                    relative flex items-center gap-1 rounded-premium transition-colors
                    ${
                      isActive(item.id)
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    }
                    ${(item as any).disabled ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                >
                  {item.icon}
                  <span className='text-xs font-bold'>{item.name}</span>
                  {showBadges && item.badge && (
                    <Badge variant='secondary' className='ml-1 h-4 text-xs'>
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </IM_GlassPane>
      </motion.div>
    );
  }

  if (variant === 'premium') {
    return (
      <motion.div
        variants={containerVariants as any}
        initial={animated ? 'hidden' : false}
        animate={animated ? 'visible' : false}
        className={`${sticky ? 'sticky bottom-strategic' : ''} z-header ${className}`}
      >
        <IM_GlassPane variant='premium' blur='xl'>
          <div className='p-strategic'>
            <div className='flex items-center justify-around'>
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants as any}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant='ghost'
                    onClick={() => !(item as any).disabled && onNavigate(item.id)}
                    disabled={(item as any).disabled}
                    className={`
                      relative flex min-w-24 flex-col items-center gap-2 rounded-executive p-strategic
                      transition-all duration-medium
                      ${
                        isActive(item.id)
                          ? 'bg-primary/20 text-primary shadow-md'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                      }
                      ${(item as any).disabled ? 'cursor-not-allowed opacity-50' : ''}
                    `}
                  >
                    <div className='relative'>
                      {item.icon}
                      {showBadges && item.badge && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='absolute -right-2 -top-2'>
                          <Badge
                            variant={typeof item.badge === 'string' ? 'destructive' : 'secondary'}
                            className='flex h-5 min-w-5 items-center justify-center text-xs'
                          >
                            {item.badge}
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                    <span className='text-sm font-bold'>{item.name}</span>
                    {isActive(item.id) && (
                      <motion.div
                        layoutId='activeIndicator'
                        className='absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary'
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Premium status bar */}
            <div className='mt-tactical flex items-center justify-center gap-tactical border-t border-border/20 pt-tactical'>
              <div className='flex items-center gap-1'>
                <div className='h-2 w-2 animate-pulse rounded-full bg-success-green-500' />
                <span className='text-xs text-muted-foreground'>System Online</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='h-2 w-2 rounded-full bg-brand-teal-primary' />
                <span className='text-xs text-muted-foreground'>Synced</span>
              </div>
            </div>
          </div>
        </IM_GlassPane>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      variants={containerVariants as any}
      initial={animated ? 'hidden' : false}
      animate={animated ? 'visible' : false}
      className={`${sticky ? 'sticky bottom-tactical' : ''} z-header ${className}`}
    >
      <IM_GlassPane variant='elevated' blur='lg'>
        <div className='flex items-center justify-around p-tactical'>
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants as any}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant='ghost'
                onClick={() => !(item as any).disabled && onNavigate(item.id)}
                disabled={(item as any).disabled}
                className={`
                  relative flex flex-col items-center gap-1.5 rounded-premium px-strategic py-tactical
                  transition-colors duration-medium
                  ${
                    isActive(item.id)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent/30 hover:text-foreground'
                  }
                  ${(item as any).disabled ? 'cursor-not-allowed opacity-50' : ''}
                `}
              >
                <div className='relative'>
                  {item.icon}
                  {showBadges && item.badge && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='absolute -right-1 -top-1'>
                      <Badge
                        variant={typeof item.badge === 'string' ? 'destructive' : 'secondary'}
                        className='flex h-4 min-w-4 items-center justify-center p-0 text-xs'
                      >
                        {item.badge}
                      </Badge>
                    </motion.div>
                  )}
                </div>
                <span className='text-xs font-bold'>{item.name}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </IM_GlassPane>
    </motion.div>
  );
};

// Demo Component for Component Browser
const IM_SubNavBarDemo: React.FC = () => {
  const { theme } = useTheme();
  const [activeItem, setActiveItem] = useState('analytics');
  const [currentVariant, setCurrentVariant] = useState<'default' | 'compact' | 'premium'>('default');
  const [showBadges, setShowBadges] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const extendedNavItems: NavItem[] = [
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <BarChart3 size={20} />,
      badge: 3,
    },
    {
      id: 'sync',
      name: 'Sync',
      icon: <RefreshCw size={20} />,
      badge: '!',
    },
    {
      id: 'config',
      name: 'Config',
      icon: <Settings size={20} />,
      badge: 12,
    },
  ];

  const handleNavigate = (itemId: string) => {
    setActiveItem(itemId);
    console.log(`🧭 Navigated to: ${itemId}`);
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='space-y-strategic p-strategic pb-32'>
        <div className='mx-auto max-w-content space-y-strategic'>
          <div className='space-y-tactical text-center'>
            <h2 className='text-heading-lg text-foreground'>Sub Navigation Bar Demo</h2>
            <p className='text-body-md text-muted-foreground'>
              Sticky bottom navigation with glass morphism and interactive features
            </p>
          </div>

          {/* Controls */}
          <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
            <div className='rounded-executive bg-card/50 p-strategic'>
              <h3 className='mb-tactical text-body-lg font-semibold text-foreground'>Display Options</h3>

              <div className='space-y-tactical'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={animationsEnabled}
                    onChange={(e) => setAnimationsEnabled(e.target.checked)}
                    className='h-4 w-4 rounded'
                  />
                  <span className='text-body-md text-foreground'>Enable Animations</span>
                </label>

                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={showBadges}
                    onChange={(e) => setShowBadges(e.target.checked)}
                    className='h-4 w-4 rounded'
                  />
                  <span className='text-body-md text-foreground'>Show Notification Badges</span>
                </label>
              </div>
            </div>

            <div className='rounded-executive bg-card/50 p-strategic'>
              <h3 className='mb-tactical text-body-lg font-semibold text-foreground'>Navigation Variant</h3>

              <div className='flex flex-wrap gap-2'>
                {(['default', 'compact', 'premium'] as any).map((variant: any) => (
                  <button
                    key={variant}
                    onClick={() => setCurrentVariant(variant)}
                    className={`
                      rounded-premium px-tactical py-2 text-body-sm font-medium transition-colors
                      ${
                        currentVariant === variant
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }
                    `}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Active Item Display */}
          <div className='rounded-executive bg-card/30 p-strategic text-center'>
            <p className='text-body-lg text-foreground'>
              Active Navigation Item: <span className='font-bold text-primary'>{activeItem}</span>
            </p>
            <p className='mt-2 text-body-sm text-muted-foreground'>
              Click navigation items to see the active state change
            </p>
          </div>

          {/* Variant Descriptions */}
          <div className='grid grid-cols-1 gap-strategic md:grid-cols-3'>
            <div
              className={`
              rounded-executive border-2 bg-card/50 p-strategic transition-colors
              ${currentVariant === 'default' ? 'border-primary' : 'border-border/20'}
            `}
            >
              <h3 className='mb-tactical text-heading-md text-foreground'>Default</h3>
              <ul className='space-y-2 text-body-sm text-muted-foreground'>
                <li>• Balanced spacing and sizing</li>
                <li>• Column layout with icons</li>
                <li>• Notification badges</li>
                <li>• Glass morphism effects</li>
                <li>• Smooth hover animations</li>
              </ul>
            </div>

            <div
              className={`
              rounded-executive border-2 bg-card/50 p-strategic transition-colors
              ${currentVariant === 'compact' ? 'border-primary' : 'border-border/20'}
            `}
            >
              <h3 className='mb-tactical text-heading-md text-foreground'>Compact</h3>
              <ul className='space-y-2 text-body-sm text-muted-foreground'>
                <li>• Minimal vertical space</li>
                <li>• Horizontal layout</li>
                <li>• Reduced padding</li>
                <li>• Essential elements only</li>
                <li>• Mobile-optimized</li>
              </ul>
            </div>

            <div
              className={`
              rounded-executive border-2 bg-card/50 p-strategic transition-colors
              ${currentVariant === 'premium' ? 'border-primary' : 'border-border/20'}
            `}
            >
              <h3 className='mb-tactical text-heading-md text-foreground'>Premium</h3>
              <ul className='space-y-2 text-body-sm text-muted-foreground'>
                <li>• Executive-level styling</li>
                <li>• Enhanced visual hierarchy</li>
                <li>• System status indicators</li>
                <li>• Active state animations</li>
                <li>• Maximum blur effects</li>
              </ul>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className='space-y-strategic'>
            <h3 className='text-center text-heading-md text-foreground'>Interactive Features</h3>

            <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
              <div className='rounded-executive bg-card/50 p-strategic'>
                <h4 className='mb-tactical text-body-lg font-semibold text-foreground'>Smart Badges</h4>
                <p className='mb-tactical text-body-md text-muted-foreground'>
                  Dynamic notification badges with different styles for numbers and alerts.
                </p>
                <div className='flex items-center gap-2'>
                  <Badge variant='secondary'>3</Badge>
                  <Badge variant='destructive'>!</Badge>
                  <span className='text-body-sm text-muted-foreground'>Number & Alert badges</span>
                </div>
              </div>

              <div className='rounded-executive bg-card/50 p-strategic'>
                <h4 className='mb-tactical text-body-lg font-semibold text-foreground'>Glass Morphism</h4>
                <p className='mb-tactical text-body-md text-muted-foreground'>
                  Advanced backdrop blur effects that adapt to the current theme.
                </p>
                <div className='flex items-center gap-2'>
                  <span className='text-body-sm text-muted-foreground'>Theme:</span>
                  <span className='font-semibold text-foreground'>{theme}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Content */}
          <div className='rounded-executive bg-card/30 p-strategic'>
            <h3 className='mb-tactical text-center text-heading-md text-foreground'>Sticky Navigation Demo</h3>
            <p className='mb-strategic text-center text-body-md text-muted-foreground'>
              The navigation bar remains visible at the bottom while scrolling
            </p>

            {/* Content to demonstrate sticky behavior */}
            <div className='space-y-tactical'>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className='rounded-premium bg-muted/30 p-tactical'>
                  <h4 className='mb-2 text-body-md font-semibold text-foreground'>Content Section {i + 1}</h4>
                  <p className='text-body-sm text-muted-foreground'>
                    This is sample content to demonstrate the sticky navigation behavior. The navigation bar stays fixed
                    at the bottom of the viewport for easy access.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The actual navigation bar - positioned at bottom */}
      <IM_SubNavBar
        navItems={extendedNavItems}
        activeItem={activeItem}
        onNavigate={handleNavigate}
        showBadges={showBadges}
        variant={currentVariant}
        sticky={true}
        animated={animationsEnabled}
      />
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <IM_SubNavBarDemo />;
};

export { IM_SubNavBar };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
