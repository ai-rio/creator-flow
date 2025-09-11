/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';

/**
 * IM-StockLevelBar - Stock Level Visualization Component
 *
 * A sophisticated stock level visualization with animated bars and dynamic colors.
 * Features executive-level polish with smooth animations and theme-aware styling.
 *
 * @component
 * @example
 * ```tsx
 * <IM_StockLevelBar
 *   items={[
 *     { name: 'iPhone Case', level: 'high', percentage: 85 },
 *     { name: 'Grip', level: 'medium', percentage: 60 },
 *     { name: 'Stand', level: 'low', percentage: 25 }
 *   ]}
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
interface StockItem {
  name: string;
  level: 'high' | 'medium' | 'low';
  percentage: number;
  height?: number;
}

// Component Props Interface
interface IM_StockLevelBarProps {
  /** Array of stock items to display */
  items?: StockItem[];
  /** Display variant */
  variant?: 'default' | 'compact' | 'detailed';
  /** Enable animations */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Show percentage labels */
  showPercentage?: boolean;
  /** Show progress bars */
  showProgress?: boolean;
}

// Main Stock Level Bar Component
const IM_StockLevelBar: React.FC<IM_StockLevelBarProps> = ({
  items = [
    { name: 'Phone', level: 'high', percentage: 85, height: 64 },
    { name: 'Grip', level: 'medium', percentage: 45, height: 40 },
    { name: 'Case', level: 'low', percentage: 25, height: 24 },
    { name: 'Stand', level: 'high', percentage: 90, height: 80 },
  ],
  variant = 'default',
  animated = true,
  className = '',
  showPercentage = true,
  showProgress = false,
}) => {
  const [animatedItems, setAnimatedItems] = useState(items.map((item) => ({ ...item, currentHeight: 0 })));

  // Animate bars on mount
  useEffect(() => {
    if (!animated) {
      setAnimatedItems(items.map((item) => ({ ...item, currentHeight: item.height || 0 })));
      return;
    }

    const timer = setTimeout(() => {
      setAnimatedItems(items.map((item) => ({ ...item, currentHeight: item.height || 0 })));
    }, 300);

    return () => clearTimeout(timer);
  }, [items, animated]);

  // Get color classes based on stock level
  const getLevelColorClasses = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'bg-success-green-500';
      case 'medium':
        return 'bg-warning-amber-500';
      case 'low':
        return 'bg-error-red-500';
      default:
        return 'bg-muted';
    }
  };

  const getLevelTextColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'text-success-green-500';
      case 'medium':
        return 'text-warning-amber-500';
      case 'low':
        return 'text-error-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`space-y-tactical ${className}`}>
        {items.map((item, index) => (
          <div key={index} className='flex items-center gap-tactical'>
            <div className='w-16 text-body-sm font-medium text-foreground'>{item.name}</div>
            <div className='flex-1'>
              <Progress
                value={item.percentage}
                className='h-2'
                // Apply level-based color through CSS custom properties
                style={
                  {
                    '--progress-foreground':
                      item.level === 'high'
                        ? 'hsl(142 71% 45%)'
                        : item.level === 'medium'
                        ? 'hsl(38 92% 50%)'
                        : 'hsl(0 84% 60%)',
                  } as any
                }
              />
            </div>
            {showPercentage && (
              <div className={`w-12 text-body-sm font-semibold ${getLevelTextColor(item.level)}`}>
                {item.percentage}%
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`space-y-strategic ${className}`}>
        <h3 className='mb-strategic text-center text-heading-md text-foreground'>STOCK LEVEL LANDSCAPE</h3>

        {showProgress && (
          <div className='mb-strategic space-y-tactical'>
            {items.map((item, index) => (
              <div key={index} className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-body-sm font-medium text-foreground'>{item.name}</span>
                  <span className={`text-body-sm font-semibold ${getLevelTextColor(item.level)}`}>
                    {item.percentage}%
                  </span>
                </div>
                <Progress value={item.percentage} className='h-3' />
              </div>
            ))}
          </div>
        )}

        {/* Visual Bar Chart */}
        <div className='flex h-24 items-end justify-around gap-2 rounded-premium bg-accent/5 p-tactical'>
          {animatedItems.map((item, index) => (
            <div key={index} className='flex flex-1 flex-col items-center gap-2 text-center'>
              <motion.div
                className={`w-full rounded-t-md transition-all duration-500 ${getLevelColorClasses(item.level)}`}
                style={{ height: item.currentHeight }}
                initial={animated ? { height: 0 } : false}
                animate={animated ? { height: item.height } : false}
                transition={
                  animated
                    ? {
                        duration: 0.8,
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                      }
                    : undefined
                }
              />
              <div className='space-y-1'>
                <p className='text-body-sm font-bold text-foreground'>{item.name}</p>
                {showPercentage && (
                  <p className={`text-body-xs font-semibold ${getLevelTextColor(item.level)}`}>{item.percentage}%</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default variant - Visual bar chart
  return (
    <div className={`space-y-tactical ${className}`}>
      <h3 className='mb-tactical text-center text-body-md font-semibold text-muted-foreground'>
        STOCK LEVEL LANDSCAPE
      </h3>
      <div className='flex h-24 items-end justify-around gap-2 p-tactical'>
        {animatedItems.map((item, index) => (
          <div key={index} className='flex flex-1 flex-col items-center gap-2 text-center'>
            <motion.div
              className={`w-full rounded-t-md transition-all duration-500 ${getLevelColorClasses(item.level)}`}
              style={{ height: item.currentHeight }}
              initial={animated ? { height: 0 } : false}
              animate={animated ? { height: item.height } : false}
              transition={
                animated
                  ? {
                      duration: 0.8,
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                      damping: 15,
                    }
                  : undefined
              }
            />
            <p className='text-body-sm font-bold text-foreground'>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Demo Component for Component Browser
const IM_StockLevelBarDemo: React.FC = () => {
  const { theme } = useTheme();
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [showPercentages, setShowPercentages] = useState(true);

  const sampleItems: StockItem[] = [
    { name: 'iPhone Case Pro', level: 'high', percentage: 85, height: 68 },
    { name: 'Phone Grip', level: 'medium', percentage: 45, height: 36 },
    { name: 'Wireless Charger', level: 'low', percentage: 15, height: 12 },
    { name: 'Phone Stand', level: 'high', percentage: 92, height: 73 },
    { name: 'Screen Protector', level: 'medium', percentage: 60, height: 48 },
  ];

  const lowStockItems: StockItem[] = [
    { name: 'Limited Edition', level: 'low', percentage: 8, height: 6 },
    { name: 'Viral Product', level: 'low', percentage: 12, height: 10 },
    { name: 'Trending Item', level: 'low', percentage: 25, height: 20 },
    { name: 'Popular Case', level: 'medium', percentage: 35, height: 28 },
  ];

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content space-y-strategic'>
        <div className='space-y-tactical text-center'>
          <h2 className='text-heading-lg text-foreground'>Stock Level Bar Demo</h2>
          <p className='text-body-md text-muted-foreground'>
            Animated stock level visualization with multiple variants
          </p>
        </div>

        {/* Controls */}
        <div className='flex flex-wrap items-center justify-center gap-tactical rounded-executive bg-card/50 p-strategic'>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={animationEnabled}
              onChange={(e) => setAnimationEnabled(e.target.checked)}
              className='h-4 w-4 rounded'
            />
            <span className='text-body-sm text-foreground'>Animations</span>
          </label>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={showPercentages}
              onChange={(e) => setShowPercentages(e.target.checked)}
              className='h-4 w-4 rounded'
            />
            <span className='text-body-sm text-foreground'>Show Percentages</span>
          </label>
        </div>

        {/* Default Variant */}
        <div className='space-y-tactical'>
          <h3 className='text-heading-md text-foreground'>Default Variant</h3>
          <div className='rounded-executive bg-card/50 p-strategic'>
            <IM_StockLevelBar items={sampleItems} animated={animationEnabled} showPercentage={showPercentages} />
          </div>
        </div>

        {/* Compact Variant */}
        <div className='space-y-tactical'>
          <h3 className='text-heading-md text-foreground'>Compact Variant (Progress Bars)</h3>
          <div className='rounded-executive bg-card/50 p-strategic'>
            <IM_StockLevelBar
              variant='compact'
              items={sampleItems}
              animated={animationEnabled}
              showPercentage={showPercentages}
            />
          </div>
        </div>

        {/* Detailed Variant */}
        <div className='space-y-tactical'>
          <h3 className='text-heading-md text-foreground'>Detailed Variant</h3>
          <div className='rounded-executive bg-card/50 p-strategic'>
            <IM_StockLevelBar
              variant='detailed'
              items={sampleItems}
              animated={animationEnabled}
              showPercentage={showPercentages}
              showProgress={true}
            />
          </div>
        </div>

        {/* Low Stock Warning Demo */}
        <div className='space-y-tactical'>
          <h3 className='text-heading-md text-foreground'>Low Stock Alert Scenario</h3>
          <div className='rounded-executive border-l-4 border-error-red-500 bg-card/50 p-strategic'>
            <IM_StockLevelBar items={lowStockItems} animated={animationEnabled} showPercentage={showPercentages} />
          </div>
        </div>

        {/* Different Stock Levels */}
        <div className='grid grid-cols-1 gap-strategic md:grid-cols-3'>
          {/* High Stock */}
          <div className='rounded-executive border-l-4 border-success-green-500 bg-card/50 p-strategic'>
            <h4 className='mb-tactical text-body-md font-semibold text-foreground'>High Stock</h4>
            <IM_StockLevelBar
              variant='compact'
              items={[
                { name: 'Product A', level: 'high', percentage: 95 },
                { name: 'Product B', level: 'high', percentage: 88 },
                { name: 'Product C', level: 'high', percentage: 92 },
              ]}
              animated={animationEnabled}
              showPercentage={showPercentages}
            />
          </div>

          {/* Medium Stock */}
          <div className='rounded-executive border-l-4 border-warning-amber-500 bg-card/50 p-strategic'>
            <h4 className='mb-tactical text-body-md font-semibold text-foreground'>Medium Stock</h4>
            <IM_StockLevelBar
              variant='compact'
              items={[
                { name: 'Product D', level: 'medium', percentage: 65 },
                { name: 'Product E', level: 'medium', percentage: 55 },
                { name: 'Product F', level: 'medium', percentage: 48 },
              ]}
              animated={animationEnabled}
              showPercentage={showPercentages}
            />
          </div>

          {/* Low Stock */}
          <div className='rounded-executive border-l-4 border-error-red-500 bg-card/50 p-strategic'>
            <h4 className='mb-tactical text-body-md font-semibold text-foreground'>Low Stock</h4>
            <IM_StockLevelBar
              variant='compact'
              items={[
                { name: 'Product G', level: 'low', percentage: 25 },
                { name: 'Product H', level: 'low', percentage: 15 },
                { name: 'Product I', level: 'low', percentage: 8 },
              ]}
              animated={animationEnabled}
              showPercentage={showPercentages}
            />
          </div>
        </div>

        {/* Theme Status */}
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
  return <IM_StockLevelBarDemo />;
};

export { IM_StockLevelBar };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
