/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Palette, TrendingUp } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { IM_GlassPane } from '../molecules/IM-GlassPane';
import { IM_StockLevelBar } from '../molecules/IM-StockLevelBar';

/**
 * IM-InventoryGallery - Inventory Art Gallery Component
 *
 * A sophisticated inventory visualization gallery with artistic stock flow representation.
 * Features animated flow visualization, stock level landscapes, and executive-level styling.
 *
 * @component
 * @example
 * ```tsx
 * <IM_InventoryGallery
 *   stockItems={[
 *     { name: 'iPhone Case', level: 'high', percentage: 85 },
 *     { name: 'Phone Grip', level: 'medium', percentage: 60 }
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
interface StockFlowItem {
  name: string;
  level: 'high' | 'medium' | 'low';
  percentage: number;
  height?: number;
}

// Component Props Interface
interface IM_InventoryGalleryProps {
  /** Stock items for visualization */
  stockItems?: StockFlowItem[];
  /** Show stock flow visualization */
  showStockFlow?: boolean;
  /** Show stock level landscape */
  showLandscape?: boolean;
  /** Enable animations */
  animated?: boolean;
  /** Gallery variant */
  variant?: 'default' | 'compact' | 'premium';
  /** Show action buttons */
  showActions?: boolean;
  /** Expand view handler */
  onExpandView?: () => void;
  /** Adjust all handler */
  onAdjustAll?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// Stock Flow Visualization Component
const StockFlowVisualization: React.FC<{ animated: boolean }> = ({ animated }) => {
  return (
    <div className='space-y-tactical'>
      <h3 className='text-center text-body-md font-semibold text-muted-foreground'>STOCK FLOW VISUALIZATION</h3>
      <div className='flex items-center justify-between px-tactical'>
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={i}>
            <motion.div
              className={`h-2 w-2 rounded-full ${i % 3 === 0 ? 'bg-brand-purple-600' : 'bg-muted/50'}`}
              initial={animated ? { scale: 0, opacity: 0 } : false}
              animate={animated ? { scale: 1, opacity: 1 } : false}
              transition={
                animated
                  ? {
                      duration: 0.3,
                      delay: i * 0.1,
                      type: 'spring',
                      stiffness: 300,
                    }
                  : undefined
              }
            />
            {i < 11 && (
              <motion.div
                className='h-px flex-1 bg-muted/30'
                initial={animated ? { scaleX: 0, opacity: 0 } : false}
                animate={animated ? { scaleX: 1, opacity: 1 } : false}
                transition={
                  animated
                    ? {
                        duration: 0.5,
                        delay: i * 0.1 + 0.1,
                      }
                    : undefined
                }
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Flow Animation */}
      <div className='relative h-1 overflow-hidden rounded-full bg-muted/20'>
        <motion.div
          className='absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-purple-600/50 to-brand-teal-primary/50'
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  );
};

// Main Inventory Gallery Component
const IM_InventoryGallery: React.FC<IM_InventoryGalleryProps> = ({
  stockItems = [
    { name: 'Phone', level: 'high', percentage: 85, height: 64 },
    { name: 'Grip', level: 'medium', percentage: 45, height: 36 },
    { name: 'Case', level: 'low', percentage: 25, height: 20 },
    { name: 'Stand', level: 'high', percentage: 90, height: 80 },
  ],
  showStockFlow = true,
  showLandscape = true,
  animated = true,
  variant = 'default',
  showActions = true,
  onExpandView = () => console.log('Expand view clicked'),
  onAdjustAll = () => console.log('Adjust all clicked'),
  className = '',
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
      },
    },
  };

  if (variant === 'compact') {
    return (
      <motion.div
        variants={itemVariants as any}
        initial={animated ? 'hidden' : false}
        animate={animated ? 'visible' : false}
        className={`space-y-tactical ${className}`}
      >
        <div className='flex items-center gap-2 px-tactical'>
          <Palette className='h-icon-sm w-icon-sm text-brand-purple-600' />
          <h2 className='text-body-lg font-bold text-foreground'>Gallery</h2>
        </div>
        <IM_GlassPane variant='subtle'>
          <div className='p-tactical'>
            <IM_StockLevelBar variant='compact' items={stockItems} animated={animated} showPercentage={false} />
          </div>
        </IM_GlassPane>
      </motion.div>
    );
  }

  if (variant === 'premium') {
    return (
      <motion.div
        variants={itemVariants as any}
        initial={animated ? 'hidden' : false}
        animate={animated ? 'visible' : false}
        className={`space-y-strategic ${className}`}
      >
        <div className='flex items-center justify-between px-tactical'>
          <div className='flex items-center gap-tactical'>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Palette className='h-icon-lg w-icon-lg text-brand-purple-600' />
            </motion.div>
            <div>
              <h2 className='text-heading-lg font-bold text-foreground'>Inventory Art Gallery</h2>
              <p className='text-body-md text-muted-foreground'>Advanced visualization suite</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <TrendingUp className='h-icon-md w-icon-md text-success-green-500' />
          </motion.div>
        </div>

        <IM_GlassPane variant='premium' blur='xl'>
          <div className='space-y-strategic p-strategic'>
            {showStockFlow && <StockFlowVisualization animated={animated} />}

            {showLandscape && (
              <div className='border-t border-border/20 pt-strategic'>
                <IM_StockLevelBar
                  variant='detailed'
                  items={stockItems}
                  animated={animated}
                  showPercentage={true}
                  showProgress={true}
                />
              </div>
            )}

            {/* Premium Analytics */}
            <div className='grid grid-cols-3 gap-tactical border-t border-border/20 pt-tactical'>
              <div className='text-center'>
                <p className='text-metric-md text-brand-teal-primary'>2.3k</p>
                <p className='text-body-sm text-muted-foreground'>Active SKUs</p>
              </div>
              <div className='text-center'>
                <p className='text-metric-md text-success-green-500'>94%</p>
                <p className='text-body-sm text-muted-foreground'>In Stock</p>
              </div>
              <div className='text-center'>
                <p className='text-metric-md text-brand-purple-600'>$127k</p>
                <p className='text-body-sm text-muted-foreground'>Inventory Value</p>
              </div>
            </div>

            {showActions && (
              <div className='flex gap-tactical pt-tactical'>
                <motion.div whileTap={{ scale: 0.95 }} className='flex-1'>
                  <Button onClick={onExpandView} className='w-full bg-accent/20 text-foreground hover:bg-accent/30'>
                    Executive Dashboard
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }} className='flex-1'>
                  <Button variant='outline' onClick={onAdjustAll} className='w-full'>
                    Optimize All
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </IM_GlassPane>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      variants={itemVariants as any}
      initial={animated ? 'hidden' : false}
      animate={animated ? 'visible' : false}
      className={`space-y-strategic ${className}`}
    >
      <div className='flex items-center gap-2 px-tactical'>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Palette className='h-icon-md w-icon-md text-brand-purple-600' />
        </motion.div>
        <h2 className='text-heading-lg font-bold text-foreground'>Inventory Art Gallery</h2>
      </div>

      <IM_GlassPane variant='elevated'>
        <div className='space-y-strategic p-strategic'>
          {showStockFlow && <StockFlowVisualization animated={animated} />}

          {showLandscape && (
            <div className={showStockFlow ? 'pt-strategic' : ''}>
              <IM_StockLevelBar items={stockItems} animated={animated} />
            </div>
          )}

          {showActions && (
            <div className='flex gap-tactical pt-strategic'>
              <motion.div whileTap={{ scale: 0.95 }} className='flex-1'>
                <Button onClick={onExpandView} className='w-full bg-accent/20 text-foreground hover:bg-accent/30'>
                  Expand View
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }} className='flex-1'>
                <Button
                  variant='ghost'
                  onClick={onAdjustAll}
                  className='w-full text-muted-foreground hover:text-foreground'
                >
                  Adjust All
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </IM_GlassPane>
    </motion.div>
  );
};

// Demo Component for Component Browser
const IM_InventoryGalleryDemo: React.FC = () => {
  const { theme } = useTheme();
  const [currentVariant, setCurrentVariant] = useState<'default' | 'compact' | 'premium'>('default');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showStockFlow, setShowStockFlow] = useState(true);
  const [showLandscape, setShowLandscape] = useState(true);

  const sampleStockItems: StockFlowItem[] = [
    { name: 'iPhone 15 Case', level: 'high', percentage: 88, height: 70 },
    { name: 'Wireless Charger', level: 'medium', percentage: 52, height: 42 },
    { name: 'Phone Stand Pro', level: 'low', percentage: 18, height: 14 },
    { name: 'Grip Elite', level: 'high', percentage: 94, height: 75 },
    { name: 'Screen Guard', level: 'medium', percentage: 67, height: 54 },
  ];

  const handleExpandView = () => {
    console.log('🔍 Expanding inventory gallery view');
  };

  const handleAdjustAll = () => {
    console.log('⚙️ Adjusting all inventory parameters');
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content space-y-strategic'>
        <div className='space-y-tactical text-center'>
          <h2 className='text-heading-lg text-foreground'>Inventory Art Gallery Demo</h2>
          <p className='text-body-md text-muted-foreground'>
            Artistic inventory visualization with stock flow and landscape views
          </p>
        </div>

        {/* Controls */}
        <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
          <IM_GlassPane variant='subtle'>
            <div className='space-y-tactical p-strategic'>
              <h3 className='text-body-lg font-semibold text-foreground'>Display Options</h3>

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
                    checked={showStockFlow}
                    onChange={(e) => setShowStockFlow(e.target.checked)}
                    className='h-4 w-4 rounded'
                  />
                  <span className='text-body-md text-foreground'>Stock Flow Visualization</span>
                </label>

                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={showLandscape}
                    onChange={(e) => setShowLandscape(e.target.checked)}
                    className='h-4 w-4 rounded'
                  />
                  <span className='text-body-md text-foreground'>Stock Level Landscape</span>
                </label>
              </div>
            </div>
          </IM_GlassPane>

          <IM_GlassPane variant='subtle'>
            <div className='space-y-tactical p-strategic'>
              <h3 className='text-body-lg font-semibold text-foreground'>Gallery Variant</h3>

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
          </IM_GlassPane>
        </div>

        {/* Main Gallery Demo */}
        <IM_InventoryGallery
          stockItems={sampleStockItems}
          showStockFlow={showStockFlow}
          showLandscape={showLandscape}
          animated={animationsEnabled}
          variant={currentVariant}
          showActions={true}
          onExpandView={handleExpandView}
          onAdjustAll={handleAdjustAll}
        />

        {/* Variant Showcase */}
        <div className='space-y-strategic'>
          <h3 className='text-center text-heading-md text-foreground'>All Gallery Variants</h3>

          <div className='grid grid-cols-1 gap-strategic lg:grid-cols-3'>
            {/* Default */}
            <div className='space-y-tactical'>
              <h4 className='text-center text-body-lg font-semibold text-foreground'>Default</h4>
              <IM_InventoryGallery
                stockItems={sampleStockItems.slice(0, 4)}
                variant='default'
                animated={animationsEnabled}
                showActions={false}
              />
            </div>

            {/* Compact */}
            <div className='space-y-tactical'>
              <h4 className='text-center text-body-lg font-semibold text-foreground'>Compact</h4>
              <IM_InventoryGallery
                stockItems={sampleStockItems.slice(0, 4)}
                variant='compact'
                animated={animationsEnabled}
                showActions={false}
              />
            </div>

            {/* Premium */}
            <div className='space-y-tactical'>
              <h4 className='text-center text-body-lg font-semibold text-foreground'>Premium</h4>
              <IM_InventoryGallery
                stockItems={sampleStockItems.slice(0, 4)}
                variant='premium'
                animated={animationsEnabled}
                showActions={false}
              />
            </div>
          </div>
        </div>

        {/* Feature Showcase */}
        <IM_GlassPane variant='premium'>
          <div className='space-y-strategic p-strategic'>
            <h3 className='text-center text-heading-md text-foreground'>Gallery Features</h3>

            <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
              <div className='space-y-tactical'>
                <h4 className='text-body-lg font-semibold text-foreground'>🎨 Visual Excellence</h4>
                <ul className='space-y-2 text-body-md text-muted-foreground'>
                  <li>• Animated stock flow visualization</li>
                  <li>• Dynamic stock level landscapes</li>
                  <li>• Color-coded urgency indicators</li>
                  <li>• Glass morphism design system</li>
                </ul>
              </div>

              <div className='space-y-tactical'>
                <h4 className='text-body-lg font-semibold text-foreground'>⚡ Smart Analytics</h4>
                <ul className='space-y-2 text-body-md text-muted-foreground'>
                  <li>• Real-time inventory metrics</li>
                  <li>• Predictive stock visualization</li>
                  <li>• Executive dashboard integration</li>
                  <li>• Optimization recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </IM_GlassPane>

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
  return <IM_InventoryGalleryDemo />;
};

export { IM_InventoryGallery };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
