/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

/**
 * IM-GlassPane - Glass Morphism Container Component
 *
 * A sophisticated glass morphism container with backdrop blur effects and theme-aware styling.
 * Features executive-level polish with subtle borders and premium visual depth.
 *
 * @component
 * @example
 * ```tsx
 * <IM_GlassPane variant="elevated" blur="lg" sticky="top">
 *   <h3>Premium Content</h3>
 * </IM_GlassPane>
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
interface IM_GlassPaneProps {
  /** Content inside the glass pane */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'elevated' | 'subtle' | 'premium';
  /** Backdrop blur intensity */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** Border radius style */
  radius?: 'sm' | 'md' | 'lg' | 'premium' | 'executive';
  /** Sticky positioning */
  sticky?: 'none' | 'top' | 'bottom';
  /** Z-index layer */
  zIndex?: 'default' | 'header' | 'modal' | 'tooltip';
  /** Additional CSS classes */
  className?: string;
  /** Motion animation */
  animated?: boolean;
  /** Click handler */
  onClick?: () => void;
}

// Main Glass Pane Component
const IM_GlassPane: React.FC<IM_GlassPaneProps> = ({
  children,
  variant = 'default',
  blur = 'lg',
  radius = 'executive',
  sticky = 'none',
  zIndex = 'default',
  className = '',
  animated = true,
  onClick,
}) => {
  // Variant styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-card/80 border-border/20 shadow-card';
      case 'subtle':
        return 'bg-background/60 border-border/10 shadow-sm';
      case 'premium':
        return 'bg-card/90 border-accent/30 shadow-premium';
      default:
        return 'bg-card/70 border-border/15 shadow-md';
    }
  };

  // Blur classes
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  // Radius classes
  const radiusClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    premium: 'rounded-premium',
    executive: 'rounded-executive',
  };

  // Sticky positioning
  const stickyClasses = {
    none: '',
    top: 'sticky top-tactical',
    bottom: 'sticky bottom-tactical',
  };

  // Z-index classes
  const zIndexClasses = {
    default: 'z-0',
    header: 'z-header',
    modal: 'z-modal',
    tooltip: 'z-tooltip',
  };

  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: {
          type: 'spring' as const,
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        },
      }
    : {};

  const interactionProps = onClick
    ? {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
        className: `${className} cursor-pointer`,
        onClick,
      }
    : {
        className,
      };

  return (
    <motion.div
      className={`
        ${getVariantStyles()}
        ${blurClasses[blur]}
        ${radiusClasses[radius]}
        ${stickyClasses[sticky]}
        ${zIndexClasses[zIndex]}
        border
        transition-all duration-medium
        ${interactionProps.className}
      `}
      {...animationProps}
      {...(onClick && {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
      })}
      onClick={interactionProps.onClick}
    >
      {children}
    </motion.div>
  );
};

// Named export for use in other components
export { IM_GlassPane };

// Demo Component for Component Browser
const IM_GlassPaneDemo: React.FC = () => {
  const { theme } = useTheme();

  const handleClick = (variant: string) => {
    console.log(`Clicked ${variant} glass pane`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-strategic'>
      <div className='mx-auto max-w-content space-y-strategic'>
        <div className='space-y-tactical text-center'>
          <h2 className='text-heading-lg text-foreground'>Glass Pane Demo</h2>
          <p className='text-body-md text-muted-foreground'>
            Glass morphism containers with backdrop blur and premium styling
          </p>
        </div>

        {/* Variant Showcase */}
        <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
          {/* Default Variant */}
          <IM_GlassPane variant='default'>
            <div className='p-strategic'>
              <h3 className='mb-tactical text-heading-md text-foreground'>Default Glass Pane</h3>
              <p className='mb-tactical text-body-md text-muted-foreground'>
                Standard glass morphism with balanced opacity and blur.
              </p>
              <div className='flex items-center gap-2 text-body-sm text-success-green-500'>✓ Backdrop blur enabled</div>
            </div>
          </IM_GlassPane>

          {/* Elevated Variant */}
          <IM_GlassPane variant='elevated'>
            <div className='p-strategic'>
              <h3 className='mb-tactical text-heading-md text-foreground'>Elevated Glass Pane</h3>
              <p className='mb-tactical text-body-md text-muted-foreground'>
                Enhanced elevation with stronger shadows and borders.
              </p>
              <div className='flex items-center gap-2 text-body-sm text-brand-teal-primary'>
                ✓ Enhanced shadow effects
              </div>
            </div>
          </IM_GlassPane>

          {/* Subtle Variant */}
          <IM_GlassPane variant='subtle'>
            <div className='p-strategic'>
              <h3 className='mb-tactical text-heading-md text-foreground'>Subtle Glass Pane</h3>
              <p className='mb-tactical text-body-md text-muted-foreground'>
                Minimal styling for content that needs subtle separation.
              </p>
              <div className='flex items-center gap-2 text-body-sm text-warning-amber-500'>✓ Minimal visual impact</div>
            </div>
          </IM_GlassPane>

          {/* Premium Variant */}
          <IM_GlassPane variant='premium'>
            <div className='p-strategic'>
              <h3 className='mb-tactical text-heading-md text-foreground'>Premium Glass Pane</h3>
              <p className='mb-tactical text-body-md text-muted-foreground'>
                Executive-level styling with accent borders and premium shadows.
              </p>
              <div className='flex items-center gap-2 text-body-sm text-brand-purple-600'>✓ Executive polish</div>
            </div>
          </IM_GlassPane>
        </div>

        {/* Blur Variations */}
        <IM_GlassPane variant='elevated'>
          <div className='p-strategic'>
            <h3 className='mb-strategic text-center text-heading-md text-foreground'>Blur Variations</h3>
            <div className='grid grid-cols-1 gap-tactical md:grid-cols-4'>
              {(['sm', 'md', 'lg', 'xl'] as const).map((blurLevel) => (
                <IM_GlassPane key={blurLevel} blur={blurLevel} variant='default'>
                  <div className='p-tactical text-center'>
                    <p className='text-body-md font-semibold text-foreground'>{blurLevel.toUpperCase()}</p>
                    <p className='text-body-sm text-muted-foreground'>Blur Level</p>
                  </div>
                </IM_GlassPane>
              ))}
            </div>
          </div>
        </IM_GlassPane>

        {/* Interactive Glass Panes */}
        <IM_GlassPane variant='elevated'>
          <div className='p-strategic'>
            <h3 className='mb-strategic text-center text-heading-md text-foreground'>Interactive Glass Panes</h3>
            <div className='grid grid-cols-1 gap-tactical md:grid-cols-3'>
              <IM_GlassPane variant='default' onClick={() => handleClick('clickable')}>
                <div className='p-tactical text-center'>
                  <p className='text-body-md font-semibold text-foreground'>Clickable</p>
                  <p className='text-body-sm text-muted-foreground'>Hover & Click Me</p>
                </div>
              </IM_GlassPane>

              <IM_GlassPane variant='premium'>
                <div className='p-tactical text-center'>
                  <p className='text-body-md font-semibold text-foreground'>Static</p>
                  <p className='text-body-sm text-muted-foreground'>No Interaction</p>
                </div>
              </IM_GlassPane>

              <IM_GlassPane variant='subtle' onClick={() => handleClick('subtle-interactive')}>
                <div className='p-tactical text-center'>
                  <p className='text-body-md font-semibold text-foreground'>Subtle + Click</p>
                  <p className='text-body-sm text-muted-foreground'>Minimal + Interactive</p>
                </div>
              </IM_GlassPane>
            </div>
          </div>
        </IM_GlassPane>

        {/* Sticky Positioning Demo */}
        <IM_GlassPane sticky='top' variant='elevated' zIndex='header'>
          <div className='p-tactical text-center'>
            <p className='text-body-md font-semibold text-foreground'>Sticky Header Glass Pane</p>
            <p className='text-body-sm text-muted-foreground'>This pane sticks to the top when scrolling</p>
          </div>
        </IM_GlassPane>

        {/* Theme Status */}
        <IM_GlassPane variant='premium'>
          <div className='p-strategic text-center'>
            <p className='text-body-md text-muted-foreground'>
              Current Theme: <span className='font-semibold text-foreground'>{theme}</span>
            </p>
            <p className='mt-2 text-body-sm text-muted-foreground'>
              Glass morphism adapts automatically to theme changes
            </p>
          </div>
        </IM_GlassPane>
      </div>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <IM_GlassPaneDemo />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
