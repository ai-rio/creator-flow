/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Box, Zap } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * IM-BrandIcon - Brand Icon Component
 *
 * Sophisticated brand icon component with animation and theme support for inventory interfaces.
 * Features dual-icon display with brand colors and motion effects.
 *
 * @component
 * @example
 * ```tsx
 * <IM_BrandIcon
 *   variant="teal-purple"
 *   size="md"
 *   animated={true}
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
interface IM_BrandIconProps {
  /** Icon variant/color scheme */
  variant?: 'teal-purple' | 'brand-primary' | 'tiktok' | 'monochrome';
  /** Icon size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Enable animation */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Spacing between icons */
  gap?: 'sm' | 'md' | 'lg';
}

// Main Brand Icon Component
const IM_BrandIcon: React.FC<IM_BrandIconProps> = ({
  variant = 'teal-purple',
  size = 'md',
  animated = true,
  className = '',
  gap = 'sm',
}) => {
  const sizeClasses = {
    sm: 'h-icon-sm w-icon-sm',
    md: 'h-icon-md w-icon-md',
    lg: 'h-icon-lg w-icon-lg',
    xl: 'h-8 w-8',
  };

  const gapClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const getVariantColors = () => {
    switch (variant) {
      case 'teal-purple':
        return {
          box: 'text-brand-teal-primary',
          zap: 'text-brand-purple-600',
        };
      case 'brand-primary':
        return {
          box: 'text-primary',
          zap: 'text-primary',
        };
      case 'tiktok':
        return {
          box: 'text-tiktok-pink',
          zap: 'text-tiktok-blue',
        };
      case 'monochrome':
        return {
          box: 'text-foreground',
          zap: 'text-muted-foreground',
        };
      default:
        return {
          box: 'text-brand-teal-primary',
          zap: 'text-brand-purple-600',
        };
    }
  };

  const colors = getVariantColors();

  const animationProps = animated
    ? {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.95 },
        transition: {
          type: 'spring' as const,
          stiffness: 400,
          damping: 17,
        },
      }
    : {};

  return (
    <motion.div className={`flex items-center ${gapClasses[gap]} ${className}`} {...animationProps}>
      <motion.div
        className={colors.box}
        initial={animated ? { rotate: 0 } : false}
        animate={animated ? { rotate: [0, 5, -5, 0] } : false}
        transition={
          animated
            ? ({
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              } as any)
            : undefined
        }
      >
        <Box className={sizeClasses[size]} />
      </motion.div>

      <motion.div
        className={colors.zap}
        initial={animated ? { scale: 1 } : false}
        animate={animated ? { scale: [1, 1.2, 1] } : false}
        transition={
          animated
            ? ({
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 4,
              } as any)
            : undefined
        }
      >
        <Zap className={sizeClasses[size]} />
      </motion.div>
    </motion.div>
  );
};

// Demo Component for Component Browser
const IM_BrandIconDemo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content space-y-strategic'>
        <div className='space-y-tactical text-center'>
          <h2 className='text-heading-lg text-foreground'>Brand Icon Demo</h2>
          <p className='text-body-md text-muted-foreground'>
            Dual-icon brand components with animation and color variants
          </p>
        </div>

        {/* Variant Showcase */}
        <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
          {/* Teal-Purple Variant */}
          <div className='rounded-executive border border-border bg-card/50 p-strategic'>
            <h3 className='mb-tactical text-heading-md text-foreground'>Teal-Purple</h3>
            <div className='flex items-center justify-center space-y-tactical'>
              <IM_BrandIcon variant='teal-purple' size='xl' />
            </div>
            <p className='mt-tactical text-center text-body-sm text-muted-foreground'>
              Brand color scheme with teal box and purple zap
            </p>
          </div>

          {/* Brand Primary */}
          <div className='rounded-executive border border-border bg-card/50 p-strategic'>
            <h3 className='mb-tactical text-heading-md text-foreground'>Brand Primary</h3>
            <div className='flex items-center justify-center space-y-tactical'>
              <IM_BrandIcon variant='brand-primary' size='xl' />
            </div>
            <p className='mt-tactical text-center text-body-sm text-muted-foreground'>
              Unified primary color for both icons
            </p>
          </div>

          {/* TikTok Variant */}
          <div className='rounded-executive border border-border bg-card/50 p-strategic'>
            <h3 className='mb-tactical text-heading-md text-foreground'>TikTok Colors</h3>
            <div className='flex items-center justify-center space-y-tactical'>
              <IM_BrandIcon variant='tiktok' size='xl' />
            </div>
            <p className='mt-tactical text-center text-body-sm text-muted-foreground'>
              TikTok brand colors (pink and blue)
            </p>
          </div>

          {/* Monochrome */}
          <div className='rounded-executive border border-border bg-card/50 p-strategic'>
            <h3 className='mb-tactical text-heading-md text-foreground'>Monochrome</h3>
            <div className='flex items-center justify-center space-y-tactical'>
              <IM_BrandIcon variant='monochrome' size='xl' />
            </div>
            <p className='mt-tactical text-center text-body-sm text-muted-foreground'>Theme-aware monochrome styling</p>
          </div>
        </div>

        {/* Size Variations */}
        <div className='rounded-executive border border-border bg-card/30 p-strategic'>
          <h3 className='mb-strategic text-center text-heading-md text-foreground'>Size Variations</h3>
          <div className='flex items-center justify-center space-x-strategic'>
            <div className='text-center'>
              <IM_BrandIcon size='sm' />
              <p className='mt-2 text-body-sm text-muted-foreground'>Small</p>
            </div>
            <div className='text-center'>
              <IM_BrandIcon size='md' />
              <p className='mt-2 text-body-sm text-muted-foreground'>Medium</p>
            </div>
            <div className='text-center'>
              <IM_BrandIcon size='lg' />
              <p className='mt-2 text-body-sm text-muted-foreground'>Large</p>
            </div>
            <div className='text-center'>
              <IM_BrandIcon size='xl' />
              <p className='mt-2 text-body-sm text-muted-foreground'>Extra Large</p>
            </div>
          </div>
        </div>

        {/* Animation Control */}
        <div className='rounded-executive border border-border bg-card/30 p-strategic'>
          <h3 className='mb-strategic text-center text-heading-md text-foreground'>Animation States</h3>
          <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
            <div className='text-center'>
              <IM_BrandIcon animated={true} size='xl' />
              <p className='mt-tactical text-body-sm text-muted-foreground'>Animated</p>
            </div>
            <div className='text-center'>
              <IM_BrandIcon animated={false} size='xl' />
              <p className='mt-tactical text-body-sm text-muted-foreground'>Static</p>
            </div>
          </div>
        </div>

        {/* Theme Status */}
        <div className='rounded-executive border border-accent/30 bg-accent/10 p-strategic text-center'>
          <p className='text-body-md text-muted-foreground'>
            Current Theme: <span className='font-semibold text-foreground'>{theme}</span>
          </p>
          <p className='mt-2 text-body-sm text-muted-foreground'>Brand icons adapt automatically to theme changes</p>
        </div>
      </div>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <IM_BrandIconDemo />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
