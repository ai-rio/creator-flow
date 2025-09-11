/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Palette, RefreshCw } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';

import { IM_GlassPane } from './IM-GlassPane';

/**
 * IM-SyncMetrics - Sync Performance Metrics Component
 *
 * A sophisticated metrics display for sync performance tracking with TikTok integration.
 * Features real-time status indicators, performance metrics, and executive-level polish.
 *
 * @component
 * @example
 * ```tsx
 * <IM_SyncMetrics
 *   tiktokSyncTime="3.2s"
 *   successRate={98}
 *   visualizationActive={true}
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
interface IM_SyncMetricsProps {
  /** TikTok sync average time */
  tiktokSyncTime?: string;
  /** Success rate percentage */
  successRate?: number;
  /** Visualization active status */
  visualizationActive?: boolean;
  /** Variant styling */
  variant?: 'default' | 'compact' | 'detailed';
  /** Additional CSS classes */
  className?: string;
  /** Enable real-time updates */
  realTime?: boolean;
}

// Main Sync Metrics Component
const IM_SyncMetrics: React.FC<IM_SyncMetricsProps> = ({
  tiktokSyncTime = '3.2s',
  successRate = 98,
  visualizationActive = true,
  variant = 'default',
  className = '',
  realTime = false,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentSyncTime, setCurrentSyncTime] = useState(tiktokSyncTime);
  const [currentSuccessRate, setCurrentSuccessRate] = useState(successRate);

  // Simulate real-time updates if enabled
  useEffect(() => {
    if (!realTime) return;

    const interval = setInterval(() => {
      // Simulate slight variations in sync time
      const baseTime = parseFloat(tiktokSyncTime.replace('s', ''));
      const variation = (Math.random() - 0.5) * 0.4; // ±0.2s variation
      const newTime = Math.max(1.0, baseTime + variation).toFixed(1);
      setCurrentSyncTime(`${newTime}s`);

      // Simulate success rate variations
      const variation2 = Math.floor((Math.random() - 0.5) * 4); // ±2% variation
      const newRate = Math.max(95, Math.min(100, successRate + variation2));
      setCurrentSuccessRate(newRate);
    }, 3000);

    return () => clearInterval(interval);
  }, [realTime, tiktokSyncTime, successRate]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 98) return 'text-success-green-500';
    if (rate >= 95) return 'text-warning-amber-500';
    return 'text-error-red-500';
  };

  const getVisualizationStatusColor = (active: boolean) => {
    return active ? 'text-brand-purple-600' : 'text-muted-foreground';
  };

  if (variant === 'compact') {
    return (
      <IM_GlassPane variant='subtle' className={className}>
        <div className='space-y-2 p-tactical'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <RefreshCw
                className={`h-icon-sm w-icon-sm text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span className='text-body-sm font-semibold text-foreground'>TikTok:</span>
              <span className='text-body-sm text-muted-foreground'>{currentSyncTime}</span>
            </div>
            <CheckCircle2 className={`h-icon-sm w-icon-sm ${getSuccessRateColor(currentSuccessRate)}`} />
          </div>
        </div>
      </IM_GlassPane>
    );
  }

  if (variant === 'detailed') {
    return (
      <IM_GlassPane variant='elevated' className={className}>
        <div className='space-y-strategic p-strategic'>
          <div className='flex items-center justify-between'>
            <h3 className='text-heading-md text-foreground'>Sync Performance</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRefresh}
              className='rounded-premium p-2 transition-colors hover:bg-accent/20'
            >
              <RefreshCw
                className={`h-icon-sm w-icon-sm text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`}
              />
            </motion.button>
          </div>

          <div className='space-y-tactical'>
            {/* TikTok Sync Metrics */}
            <div className='flex items-center justify-between rounded-premium bg-accent/10 p-tactical'>
              <div className='flex items-center gap-2'>
                <RefreshCw className='h-icon-sm w-icon-sm text-muted-foreground' />
                <span className='text-body-md font-semibold text-foreground'>TikTok Sync:</span>
                <Badge variant='outline' className='bg-background/50'>
                  {currentSyncTime} avg
                </Badge>
              </div>
              <div className='flex items-center gap-2'>
                <span className={`text-body-md font-semibold ${getSuccessRateColor(currentSuccessRate)}`}>
                  {currentSuccessRate}%
                </span>
                <CheckCircle2 className={`h-icon-sm w-icon-sm ${getSuccessRateColor(currentSuccessRate)}`} />
              </div>
            </div>

            {/* Visualization Status */}
            <div className='flex items-center justify-between rounded-premium bg-accent/10 p-tactical'>
              <div className='flex items-center gap-2'>
                <Palette className='h-icon-sm w-icon-sm text-muted-foreground' />
                <span className='text-body-md font-semibold text-foreground'>Stock Flow Visualization</span>
              </div>
              <Badge
                variant={visualizationActive ? 'default' : 'secondary'}
                className={visualizationActive ? 'bg-brand-purple-600 text-white' : ''}
              >
                {visualizationActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            {/* Additional Metrics */}
            <div className='grid grid-cols-3 gap-tactical border-t border-border/20 pt-tactical'>
              <div className='text-center'>
                <p className='text-metric-md text-foreground'>1,247</p>
                <p className='text-body-sm text-muted-foreground'>SKUs</p>
              </div>
              <div className='text-center'>
                <p className='text-metric-md text-success-green-500'>99.2%</p>
                <p className='text-body-sm text-muted-foreground'>Uptime</p>
              </div>
              <div className='text-center'>
                <p className='text-metric-md text-brand-teal-primary'>2.1s</p>
                <p className='text-body-sm text-muted-foreground'>Response</p>
              </div>
            </div>
          </div>
        </div>
      </IM_GlassPane>
    );
  }

  // Default variant
  return (
    <IM_GlassPane variant='default' className={className}>
      <div className='space-y-tactical p-strategic'>
        {/* TikTok Sync Row */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <motion.div
              animate={{ rotate: isRefreshing ? 360 : 0 }}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}
            >
              <RefreshCw className='h-icon-sm w-icon-sm text-muted-foreground' />
            </motion.div>
            <span className='text-body-md font-semibold text-foreground'>TikTok Sync:</span>
            <span className='text-body-md text-muted-foreground'>
              {currentSyncTime} avg ({currentSuccessRate}%)
            </span>
          </div>
          <CheckCircle2 className={`h-icon-md w-icon-md ${getSuccessRateColor(currentSuccessRate)}`} />
        </div>

        {/* Visualization Row */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Palette className='h-icon-sm w-icon-sm text-muted-foreground' />
            <span className='text-body-md font-semibold text-foreground'>Stock flow visualization</span>
          </div>
          <span className={`text-body-md font-bold ${getVisualizationStatusColor(visualizationActive)}`}>
            {visualizationActive ? 'active' : 'inactive'}
          </span>
        </div>
      </div>
    </IM_GlassPane>
  );
};

// Demo Component for Component Browser
const IM_SyncMetricsDemo: React.FC = () => {
  const { theme } = useTheme();
  const [realTimeEnabled, setRealTimeEnabled] = useState(false);

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content space-y-strategic'>
        <div className='space-y-tactical text-center'>
          <h2 className='text-heading-lg text-foreground'>Sync Metrics Demo</h2>
          <p className='text-body-md text-muted-foreground'>
            TikTok sync performance metrics with real-time monitoring
          </p>
        </div>

        {/* Variant Showcase */}
        <div className='space-y-strategic'>
          {/* Default Variant */}
          <div>
            <h3 className='mb-tactical text-heading-md text-foreground'>Default Variant</h3>
            <IM_SyncMetrics
              tiktokSyncTime='3.2s'
              successRate={98}
              visualizationActive={true}
              realTime={realTimeEnabled}
            />
          </div>

          {/* Compact Variant */}
          <div>
            <h3 className='mb-tactical text-heading-md text-foreground'>Compact Variant</h3>
            <IM_SyncMetrics
              variant='compact'
              tiktokSyncTime='2.8s'
              successRate={99}
              visualizationActive={true}
              realTime={realTimeEnabled}
            />
          </div>

          {/* Detailed Variant */}
          <div>
            <h3 className='mb-tactical text-heading-md text-foreground'>Detailed Variant</h3>
            <IM_SyncMetrics
              variant='detailed'
              tiktokSyncTime='3.1s'
              successRate={97}
              visualizationActive={true}
              realTime={realTimeEnabled}
            />
          </div>
        </div>

        {/* Different States */}
        <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
          {/* High Performance */}
          <div>
            <h3 className='mb-tactical text-heading-md text-foreground'>High Performance</h3>
            <IM_SyncMetrics tiktokSyncTime='1.8s' successRate={99} visualizationActive={true} />
          </div>

          {/* Warning State */}
          <div>
            <h3 className='mb-tactical text-heading-md text-foreground'>Warning State</h3>
            <IM_SyncMetrics tiktokSyncTime='5.2s' successRate={96} visualizationActive={false} />
          </div>
        </div>

        {/* Real-time Control */}
        <IM_GlassPane variant='elevated'>
          <div className='p-strategic text-center'>
            <h3 className='mb-tactical text-heading-md text-foreground'>Real-time Updates</h3>
            <div className='mb-strategic flex items-center justify-center gap-tactical'>
              <label className='text-body-md text-muted-foreground'>Real-time monitoring:</label>
              <button
                onClick={() => setRealTimeEnabled(!realTimeEnabled)}
                className={`
                  rounded-premium px-tactical py-2 text-body-sm font-medium transition-colors
                  ${
                    realTimeEnabled
                      ? 'bg-success-green-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }
                `}
              >
                {realTimeEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <p className='text-body-sm text-muted-foreground'>Toggle to see simulated real-time metric updates</p>
          </div>
        </IM_GlassPane>

        {/* Theme Status */}
        <IM_GlassPane variant='premium'>
          <div className='p-strategic text-center'>
            <p className='text-body-md text-muted-foreground'>
              Current Theme: <span className='font-semibold text-foreground'>{theme}</span>
            </p>
          </div>
        </IM_GlassPane>
      </div>
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <IM_SyncMetricsDemo />;
};

export { IM_SyncMetrics };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
