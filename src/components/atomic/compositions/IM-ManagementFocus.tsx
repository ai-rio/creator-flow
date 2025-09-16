/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { IM_CriticalStockAlerts } from '../../../design-system/prototypes/navigation/IM-CriticalStockAlerts';
import { IM_InventoryGallery } from '../../../design-system/prototypes/navigation/IM-InventoryGallery';
import { IM_ManagementHeader } from '../../../design-system/prototypes/navigation/IM-ManagementHeader';
import { IM_SubNavBar } from '../../../design-system/prototypes/navigation/IM-SubNavBar';
import { IM_SyncMetrics } from '../molecules/IM-SyncMetrics';

/**
 * IM-ManagementFocus - Complete Inventory Management Focus Interface
 *
 * A comprehensive inventory management interface combining all atomic components.
 * Features executive-level dashboard with critical stock alerts, sync metrics,
 * inventory visualization, and sophisticated navigation.
 *
 * @component
 * @example
 * ```tsx
 * <IM_ManagementFocus
 *   title="Stock Command Center"
 *   skuCount={2847}
 *   theme="dark"
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
interface StockAlert {
  id: string;
  product: string;
  stock: number;
  context: string;
  velocity: string;
  hoursLeft: number;
  suggestion: number;
  urgency?: 'critical' | 'high' | 'medium';
}

interface StockFlowItem {
  name: string;
  level: 'high' | 'medium' | 'low';
  percentage: number;
  height?: number;
}

// Component Props Interface
interface IM_ManagementFocusProps {
  /** Dashboard title */
  title?: string;
  /** Total SKU count */
  skuCount?: number;
  /** TikTok sync metrics */
  syncMetrics?: {
    syncTime: string;
    successRate: number;
    visualizationActive: boolean;
  };
  /** Critical stock alerts */
  stockAlerts?: StockAlert[];
  /** Inventory visualization data */
  stockItems?: StockFlowItem[];
  /** Current theme */
  theme?: 'light' | 'dark';
  /** Theme change handler */
  onThemeChange?: (theme: 'light' | 'dark') => void;
  /** Navigation handler */
  onNavigate?: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Enable animations */
  animated?: boolean;
  /** Interface variant */
  variant?: 'default' | 'compact' | 'premium';
}

// Main Management Focus Component
const IM_ManagementFocus: React.FC<IM_ManagementFocusProps> = ({
  title = 'Stock Command',
  skuCount = 1247,
  syncMetrics = {
    syncTime: '3.2s',
    successRate: 98,
    visualizationActive: true,
  },
  stockAlerts = [
    {
      id: '1',
      product: '📱 iPhone Case Pro',
      stock: 12,
      context: '🔥 Viral video driving orders',
      velocity: '📈 Selling 47/hour, 6hr stock',
      hoursLeft: 6,
      suggestion: 500,
      urgency: 'critical',
    },
  ],
  stockItems = [
    { name: 'Phone', level: 'high', percentage: 85, height: 64 },
    { name: 'Grip', level: 'medium', percentage: 45, height: 40 },
    { name: 'Case', level: 'low', percentage: 25, height: 24 },
    { name: 'Stand', level: 'high', percentage: 90, height: 80 },
  ],
  theme = 'dark',
  onThemeChange = () => {},
  onNavigate = () => {},
  className = '',
  animated = true,
  variant = 'default',
}) => {
  const [activeNavItem, setActiveNavItem] = useState('analytics');
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        stiffness: 120,
        damping: 20,
      },
    },
  } as any;

  // Handlers
  const handleThemeToggle = (newTheme: 'light' | 'dark') => {
    setCurrentTheme(newTheme);
    onThemeChange(newTheme);
  };

  const handleNavigateBack = () => {
    onNavigate('back');
  };

  const handleSubNavigation = (itemId: string) => {
    setActiveNavItem(itemId);
    onNavigate(itemId);
  };

  const handleAutoOrder = (alertId: string, quantity: number) => {
    console.log(`🤖 Auto-ordering ${quantity} units for alert ${alertId}`);
  };

  const handleManualOrder = (alertId: string) => {
    console.log(`📝 Manual review for alert ${alertId}`);
  };

  const handleDefer = (alertId: string) => {
    console.log(`⏰ Deferred alert ${alertId}`);
  };

  const handleExpandView = () => {
    onNavigate('expand-gallery');
  };

  const handleAdjustAll = () => {
    onNavigate('adjust-inventory');
  };

  // Variant-specific configurations
  const getVariantConfig = () => {
    switch (variant) {
      case 'compact':
        return {
          headerVariant: 'compact' as const,
          syncVariant: 'compact' as const,
          galleryVariant: 'compact' as const,
          navVariant: 'compact' as const,
          maxAlerts: 2,
          spacing: 'space-y-tactical',
        };
      case 'premium':
        return {
          headerVariant: 'premium' as const,
          syncVariant: 'detailed' as const,
          galleryVariant: 'premium' as const,
          navVariant: 'premium' as const,
          maxAlerts: 5,
          spacing: 'space-y-strategic',
        };
      default:
        return {
          headerVariant: 'default' as const,
          syncVariant: 'default' as const,
          galleryVariant: 'default' as const,
          navVariant: 'default' as const,
          maxAlerts: 3,
          spacing: 'space-y-strategic',
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div className={`min-h-screen bg-background transition-colors duration-medium ${className}`}>
      <div className='mx-auto max-w-md'>
        <motion.div
          className={`${config.spacing} pb-24`}
          variants={containerVariants}
          initial={animated ? 'hidden' : false}
          animate={animated ? 'visible' : false}
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <IM_ManagementHeader
              title={title}
              skuCount={skuCount}
              onNavigateBack={handleNavigateBack}
              onThemeToggle={handleThemeToggle}
              theme={currentTheme}
              variant={config.headerVariant}
              showSkuCount={true}
              showBrandIcons={true}
              sticky={true}
            />
          </motion.div>

          {/* Sync Metrics */}
          <motion.div variants={itemVariants}>
            <IM_SyncMetrics
              tiktokSyncTime={syncMetrics.syncTime}
              successRate={syncMetrics.successRate}
              visualizationActive={syncMetrics.visualizationActive}
              variant={config.syncVariant}
              realTime={variant === 'premium'}
            />
          </motion.div>

          {/* Critical Stock Alerts */}
          <motion.div variants={itemVariants}>
            <IM_CriticalStockAlerts
              alerts={stockAlerts}
              onAutoOrder={handleAutoOrder}
              onManualOrder={handleManualOrder}
              onDefer={handleDefer}
              showActions={true}
              maxAlerts={config.maxAlerts}
              animated={animated}
            />
          </motion.div>

          {/* Inventory Art Gallery */}
          <motion.div variants={itemVariants}>
            <IM_InventoryGallery
              stockItems={stockItems}
              showStockFlow={true}
              showLandscape={true}
              animated={animated}
              variant={config.galleryVariant}
              showActions={true}
              onExpandView={handleExpandView}
              onAdjustAll={handleAdjustAll}
            />
          </motion.div>
        </motion.div>

        {/* Sub Navigation */}
        <IM_SubNavBar
          activeItem={activeNavItem}
          onNavigate={handleSubNavigation}
          showBadges={true}
          variant={config.navVariant}
          sticky={true}
          animated={animated}
        />
      </div>
    </div>
  );
};

// Named export for use in other components
export { IM_ManagementFocus };

// Demo Component for Component Browser
const IM_ManagementFocusDemo: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [currentVariant, setCurrentVariant] = useState<'default' | 'compact' | 'premium'>('default');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const sampleStockAlerts: StockAlert[] = [
    {
      id: '1',
      product: '📱 iPhone 15 Pro Max Case - Viral Edition',
      stock: 8,
      context: '🔥 Featured in @influencer_sarah TikTok (3.2M views)',
      velocity: '📈 Selling 89/hour, critical depletion imminent',
      hoursLeft: 3,
      suggestion: 750,
      urgency: 'critical',
    },
    {
      id: '2',
      product: '⚡ Wireless Charger Pro - TikTok Trending',
      stock: 23,
      context: '🎯 Trending in #TechTok hashtag',
      velocity: '📊 Selling 34/hour, strong momentum',
      hoursLeft: 16,
      suggestion: 300,
      urgency: 'high',
    },
    {
      id: '3',
      product: '📱 Adjustable Phone Stand Elite',
      stock: 45,
      context: '💼 Popular in productivity content',
      velocity: '📈 Selling 18/hour, steady growth',
      hoursLeft: 48,
      suggestion: 150,
      urgency: 'medium',
    },
  ];

  const sampleStockItems: StockFlowItem[] = [
    { name: 'Cases', level: 'high', percentage: 88, height: 70 },
    { name: 'Chargers', level: 'medium', percentage: 52, height: 42 },
    { name: 'Stands', level: 'low', percentage: 18, height: 14 },
    { name: 'Grips', level: 'high', percentage: 94, height: 75 },
    { name: 'Guards', level: 'medium', percentage: 67, height: 54 },
  ];

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const handleNavigate = (path: string) => {
    console.log(`🧭 Navigation: ${path}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-muted/10 to-accent/5'>
      {/* Demo Controls */}
      <div className='fixed right-4 top-4 z-50 space-y-2'>
        <div className='rounded-executive border border-border/20 bg-card/90 p-4 shadow-lg backdrop-blur-lg'>
          <h4 className='mb-3 text-body-md font-semibold text-foreground'>Demo Controls</h4>

          <div className='space-y-3'>
            <div>
              <label className='mb-1 block text-body-sm text-muted-foreground'>Variant:</label>
              <select
                value={currentVariant}
                onChange={(e) => setCurrentVariant(e.target.value as any)}
                className='w-full rounded border border-border bg-background px-2 py-1 text-xs text-foreground'
              >
                <option value='default'>Default</option>
                <option value='compact'>Compact</option>
                <option value='premium'>Premium</option>
              </select>
            </div>

            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
                className='h-3 w-3'
              />
              <span className='text-body-sm text-foreground'>Animations</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <IM_ManagementFocus
        title='CreatorFlow Stock Command'
        skuCount={2847}
        syncMetrics={{
          syncTime: '2.8s',
          successRate: 99,
          visualizationActive: true,
        }}
        stockAlerts={sampleStockAlerts}
        stockItems={sampleStockItems}
        theme={theme}
        onThemeChange={handleThemeChange}
        onNavigate={handleNavigate}
        animated={animationsEnabled}
        variant={currentVariant}
      />
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <IM_ManagementFocusDemo />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
