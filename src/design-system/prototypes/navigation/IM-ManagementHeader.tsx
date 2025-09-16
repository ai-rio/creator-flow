/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Box, Zap } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import IM_BrandIcon from '../../../components/atomic/atoms/IM-BrandIcon';
import IM_ThemeToggle from '../../../components/atomic/atoms/IM-ThemeToggle';
import { IM_GlassPane } from '../../../components/atomic/molecules/IM-GlassPane';

/**
 * IM-ManagementHeader - Inventory Management Header Component
 *
 * A sophisticated header component for inventory management interfaces with executive styling.
 * Features theme toggle, brand icons, navigation, and SKU counter with glass morphism effects.
 *
 * @component
 * @example
 * ```tsx
 * <IM_ManagementHeader
 *   title="Stock Command"
 *   skuCount={1247}
 *   onNavigateBack={() => router.back()}
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
interface IM_ManagementHeaderProps {
  /** Header title */
  title?: string;
  /** Number of SKUs */
  skuCount?: number;
  /** Back navigation handler */
  onNavigateBack?: () => void;
  /** Theme toggle handler */
  onThemeToggle?: (theme: 'light' | 'dark') => void;
  /** Current theme */
  theme?: 'light' | 'dark';
  /** Header variant */
  variant?: 'default' | 'compact' | 'premium';
  /** Show SKU count */
  showSkuCount?: boolean;
  /** Show brand icons */
  showBrandIcons?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Sticky positioning */
  sticky?: boolean;
}

// Main Management Header Component
const IM_ManagementHeader: React.FC<IM_ManagementHeaderProps> = ({
  title = 'Stock Command',
  skuCount = 1247,
  onNavigateBack = () => console.log('Navigate back'),
  onThemeToggle = () => {},
  theme = 'dark',
  variant = 'default',
  showSkuCount = true,
  showBrandIcons = true,
  className = '',
  sticky = true,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
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

  if (variant === 'compact') {
    return (
      <motion.div variants={itemVariants as any} initial='hidden' animate='visible' className={className}>
        <IM_GlassPane variant='subtle' sticky={sticky ? 'top' : 'none'} zIndex='header'>
          <div className='flex items-center justify-between p-tactical'>
            <div className='flex items-center gap-tactical'>
              <Button variant='ghost' size='icon' onClick={onNavigateBack} className='hover:bg-accent/50'>
                <ArrowLeft className='h-icon-sm w-icon-sm' />
              </Button>
              <h1 className='text-heading-md font-bold text-foreground'>{title}</h1>
            </div>
            <IM_ThemeToggle {...({ theme, onToggle: onThemeToggle, size: 'sm' } as any)} />
          </div>
        </IM_GlassPane>
      </motion.div>
    );
  }

  if (variant === 'premium') {
    return (
      <motion.div variants={itemVariants as any} initial='hidden' animate='visible' className={className}>
        <IM_GlassPane variant='premium' sticky={sticky ? 'top' : 'none'} zIndex='header' blur='xl'>
          <div className='p-strategic'>
            <div className='mb-tactical flex items-center justify-between'>
              <div className='flex items-center gap-strategic'>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={onNavigateBack}
                    className='rounded-premium hover:bg-accent/50'
                  >
                    <ArrowLeft className='h-icon-md w-icon-md text-muted-foreground' />
                  </Button>
                </motion.div>
                <div>
                  <h1 className='text-heading-lg font-bold text-foreground'>{title}</h1>
                  {showSkuCount && (
                    <p className='text-body-md text-muted-foreground'>
                      Managing{' '}
                      <span className='font-semibold text-brand-teal-primary'>{skuCount.toLocaleString()}</span>{' '}
                      products
                    </p>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-strategic'>
                {showBrandIcons && (
                  <div className='hidden md:flex'>
                    <IM_BrandIcon {...({ variant: 'teal-purple', size: 'lg', animated: true, gap: 'md' } as any)} />
                  </div>
                )}
                <IM_ThemeToggle {...({ theme, onToggle: onThemeToggle, size: 'lg' } as any)} />
              </div>
            </div>

            {/* Additional premium features */}
            <div className='flex items-center gap-tactical'>
              <Badge
                variant='outline'
                className='border-success-green-500/30 bg-success-green-500/10 text-success-green-500'
              >
                System Online
              </Badge>
              <Badge
                variant='outline'
                className='border-brand-teal-primary/30 bg-brand-teal-primary/10 text-brand-teal-primary'
              >
                Real-time Sync
              </Badge>
              {showSkuCount && <Badge variant='secondary'>{skuCount.toLocaleString()} SKUs</Badge>}
            </div>
          </div>
        </IM_GlassPane>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div variants={itemVariants as any} initial='hidden' animate='visible' className={className}>
      <IM_GlassPane variant='elevated' sticky={sticky ? 'top' : 'none'} zIndex='header'>
        <div className='flex items-center justify-between p-strategic'>
          <div className='flex items-center gap-strategic'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant='ghost' size='icon' onClick={onNavigateBack} className='hover:bg-accent/50'>
                <ArrowLeft className='h-icon-md w-icon-md text-muted-foreground' />
              </Button>
            </motion.div>
            <h1 className='text-heading-lg font-bold text-foreground'>{title}</h1>
            {showSkuCount && (
              <span className='hidden text-body-md font-medium text-muted-foreground sm:inline'>
                ({skuCount.toLocaleString()} SKUs)
              </span>
            )}
          </div>
          <div className='flex items-center gap-tactical'>
            {showBrandIcons && (
              <div className='mr-tactical flex items-center'>
                <IM_BrandIcon {...({ variant: 'teal-purple', size: 'md', animated: true } as any)} />
              </div>
            )}
            <IM_ThemeToggle {...({ theme, onToggle: onThemeToggle } as any)} />
          </div>
        </div>
      </IM_GlassPane>
    </motion.div>
  );
};

// Demo Component for Component Browser
const IM_ManagementHeaderDemo: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [currentVariant, setCurrentVariant] = useState<'default' | 'compact' | 'premium'>('default');

  const handleNavigateBack = () => {
    console.log('Navigation back clicked');
  };

  const handleThemeToggle = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='space-y-strategic pb-strategic'>
        {/* Demo Header */}
        <IM_ManagementHeader
          title='Inventory Management Demo'
          skuCount={2847}
          onNavigateBack={handleNavigateBack}
          onThemeToggle={handleThemeToggle}
          theme={theme}
          variant={currentVariant}
          showSkuCount={true}
          showBrandIcons={true}
          sticky={true}
        />

        {/* Content Area */}
        <div className='space-y-strategic p-strategic'>
          <div className='mx-auto max-w-content space-y-strategic'>
            <div className='space-y-tactical text-center'>
              <h2 className='text-heading-md text-foreground'>Header Variants Demo</h2>
              <p className='text-body-md text-muted-foreground'>
                Interactive inventory management header with multiple styling options
              </p>
            </div>

            {/* Variant Selector */}
            <div className='flex flex-wrap items-center justify-center gap-tactical rounded-executive bg-card/50 p-strategic'>
              <span className='text-body-md text-foreground'>Header Variant:</span>
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
                  <li>• Theme toggle included</li>
                  <li>• Brand icons visible</li>
                  <li>• SKU counter display</li>
                  <li>• Glass morphism effects</li>
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
                  <li>• Reduced padding</li>
                  <li>• Essential elements only</li>
                  <li>• Mobile-optimized</li>
                  <li>• Subtle glass styling</li>
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
                  <li>• Status badges included</li>
                  <li>• Larger interactive elements</li>
                  <li>• Maximum blur effects</li>
                </ul>
              </div>
            </div>

            {/* Feature Showcase */}
            <div className='space-y-strategic'>
              <h3 className='text-center text-heading-md text-foreground'>Interactive Features</h3>

              <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
                <div className='rounded-executive bg-card/50 p-strategic'>
                  <h4 className='mb-tactical text-body-lg font-semibold text-foreground'>Theme Integration</h4>
                  <p className='mb-tactical text-body-md text-muted-foreground'>
                    Seamless theme switching with animated icon transitions and glass morphism adaptation.
                  </p>
                  <div className='flex items-center gap-2'>
                    <span className='text-body-sm text-muted-foreground'>Current:</span>
                    <span className='font-semibold text-foreground'>{theme}</span>
                  </div>
                </div>

                <div className='rounded-executive bg-card/50 p-strategic'>
                  <h4 className='mb-tactical text-body-lg font-semibold text-foreground'>Brand Identity</h4>
                  <p className='mb-tactical text-body-md text-muted-foreground'>
                    Animated brand icons with CreatorFlow's signature teal-purple color scheme.
                  </p>
                  <div className='flex justify-center'>
                    <IM_BrandIcon {...({ variant: 'teal-purple', size: 'lg', animated: true } as any)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Scroll Demo */}
            <div className='rounded-executive bg-card/30 p-strategic'>
              <h3 className='mb-tactical text-center text-heading-md text-foreground'>Sticky Header Demo</h3>
              <p className='mb-strategic text-center text-body-md text-muted-foreground'>
                The header remains visible while scrolling for persistent navigation access
              </p>

              {/* Fake content for scroll demonstration */}
              <div className='space-y-tactical'>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className='rounded-premium bg-muted/30 p-tactical'>
                    <p className='text-body-md text-muted-foreground'>
                      Sample content block {i + 1} - Scroll up to see the sticky header in action
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <IM_ManagementHeaderDemo />;
};

export { IM_ManagementHeader };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
