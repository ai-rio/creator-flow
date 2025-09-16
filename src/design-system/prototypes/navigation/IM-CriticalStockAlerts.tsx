/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Flame, Siren, TrendingUp, Zap } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { IM_GlassPane } from '../../../components/atomic/molecules/IM-GlassPane';

/**
 * IM-CriticalStockAlerts - Critical Stock Alert System Component
 *
 * A sophisticated alert system for critical stock levels with viral context awareness.
 * Features executive-level urgency indicators, auto-reorder suggestions, and action buttons.
 *
 * @component
 * @example
 * ```tsx
 * <IM_CriticalStockAlerts
 *   alerts={[
 *     {
 *       id: '1',
 *       product: 'iPhone Case Pro',
 *       stock: 12,
 *       context: 'Viral video driving orders',
 *       velocity: 'Selling 47/hour',
 *       hoursLeft: 6,
 *       suggestion: 500
 *     }
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

// Component Props Interface
interface IM_CriticalStockAlertsProps {
  /** Array of stock alerts */
  alerts?: StockAlert[];
  /** Auto-order action handler */
  onAutoOrder?: (alertId: string, quantity: number) => void;
  /** Manual order action handler */
  onManualOrder?: (alertId: string) => void;
  /** Defer action handler */
  onDefer?: (alertId: string) => void;
  /** Show action buttons */
  showActions?: boolean;
  /** Maximum alerts to display */
  maxAlerts?: number;
  /** Additional CSS classes */
  className?: string;
  /** Enable animations */
  animated?: boolean;
}

// Main Critical Stock Alerts Component
const IM_CriticalStockAlerts: React.FC<IM_CriticalStockAlertsProps> = ({
  alerts = [
    {
      id: '1',
      product: 'iPhone Case Pro',
      stock: 12,
      context: 'Viral video driving orders',
      velocity: 'Selling 47/hour',
      hoursLeft: 6,
      suggestion: 500,
      urgency: 'critical',
    },
    {
      id: '2',
      product: 'Wireless Charger Elite',
      stock: 25,
      context: 'Featured in trending TikTok',
      velocity: 'Selling 23/hour',
      hoursLeft: 18,
      suggestion: 200,
      urgency: 'high',
    },
  ],
  onAutoOrder = (alertId, quantity) => console.log(`Auto-order ${quantity} units for alert ${alertId}`),
  onManualOrder = (alertId) => console.log(`Manual order for alert ${alertId}`),
  onDefer = (alertId) => console.log(`Defer alert ${alertId}`),
  showActions = true,
  maxAlerts = 5,
  className = '',
  animated = true,
}) => {
  const displayAlerts = alerts.slice(0, maxAlerts);

  const getUrgencyIcon = (urgency: string = 'critical') => {
    switch (urgency) {
      case 'critical':
        return <Siren className='h-icon-md w-icon-md text-error-red-500' />;
      case 'high':
        return <AlertTriangle className='h-icon-md w-icon-md text-warning-amber-500' />;
      case 'medium':
        return <TrendingUp className='h-icon-md w-icon-md text-brand-blue-500' />;
      default:
        return <Siren className='h-icon-md w-icon-md text-error-red-500' />;
    }
  };

  const getUrgencyColor = (urgency: string = 'critical') => {
    switch (urgency) {
      case 'critical':
        return 'border-error-red-500 bg-error-red-500/5';
      case 'high':
        return 'border-warning-amber-500 bg-warning-amber-500/5';
      case 'medium':
        return 'border-brand-blue-500 bg-brand-blue-500/5';
      default:
        return 'border-error-red-500 bg-error-red-500/5';
    }
  };

  const getStockTextColor = (stock: number) => {
    if (stock <= 10) return 'text-error-red-500';
    if (stock <= 25) return 'text-warning-amber-500';
    return 'text-foreground';
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as any,
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring' as any as any,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants as any}
      initial={animated ? 'hidden' : false}
      animate={animated ? 'visible' : false}
      className={`space-y-strategic ${className}`}
    >
      {/* Header */}
      <motion.div variants={itemVariants as any} className='flex items-center gap-tactical px-tactical'>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Siren className='h-icon-lg w-icon-lg text-error-red-500' />
        </motion.div>
        <h2 className='text-heading-lg font-bold text-foreground'>CRITICAL STOCK ALERTS</h2>
        <Badge variant='destructive' className='ml-2'>
          {displayAlerts.length}
        </Badge>
      </motion.div>

      {/* Alerts List */}
      <div className='space-y-tactical'>
        {displayAlerts.map((alert, index) => (
          <motion.div key={alert.id} variants={itemVariants as any}>
            <IM_GlassPane variant='elevated' className={`border-l-4 ${getUrgencyColor(alert.urgency)}`}>
              <div className='space-y-strategic p-strategic'>
                {/* Alert Header */}
                <div className='flex items-start justify-between'>
                  <div className='flex items-start gap-tactical'>
                    {getUrgencyIcon(alert.urgency)}
                    <div className='space-y-2'>
                      <p className='text-heading-md font-bold text-foreground'>
                        {alert.product}: <span className={getStockTextColor(alert.stock)}>{alert.stock} left</span>
                      </p>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant='outline'
                          className='border-error-red-500/30 bg-error-red-500/10 text-error-red-500'
                        >
                          {alert.hoursLeft}h stock remaining
                        </Badge>
                        {alert.urgency === 'critical' && (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Badge variant='destructive' className='gap-1'>
                              <Flame className='h-3 w-3' />
                              URGENT
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert Details */}
                <div className='space-y-tactical text-body-md'>
                  <div className='flex items-center gap-2'>
                    <Zap className='h-icon-sm w-icon-sm text-tiktok-viral' />
                    <span className='text-muted-foreground'>{alert.context}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <TrendingUp className='h-icon-sm w-icon-sm text-success-green-500' />
                    <span className='text-muted-foreground'>{alert.velocity}</span>
                  </div>
                  <div className='rounded-premium bg-accent/10 p-tactical'>
                    <span className='font-semibold text-foreground'>
                      🎯 Auto-reorder suggested: {alert.suggestion.toLocaleString()} units
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {showActions && (
                  <div className='flex flex-col gap-tactical sm:flex-row'>
                    <motion.div whileTap={{ scale: 0.95 }} className='flex-1'>
                      <Button
                        onClick={() => onAutoOrder(alert.id, alert.suggestion)}
                        className='w-full bg-foreground text-background hover:bg-foreground/90'
                      >
                        Auto-Order ({alert.suggestion})
                      </Button>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        variant='secondary'
                        onClick={() => onManualOrder(alert.id)}
                        className='w-full bg-accent/20 text-foreground hover:bg-accent/30 sm:w-auto'
                      >
                        Manual Review
                      </Button>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        variant='ghost'
                        onClick={() => onDefer(alert.id)}
                        className='w-full text-muted-foreground hover:bg-accent/10 hover:text-foreground sm:w-auto'
                      >
                        Defer
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>
            </IM_GlassPane>
          </motion.div>
        ))}
      </div>

      {/* Summary Footer */}
      {alerts.length > maxAlerts && (
        <motion.div variants={itemVariants as any}>
          <IM_GlassPane variant='subtle'>
            <div className='p-tactical text-center'>
              <p className='text-body-md text-muted-foreground'>
                Showing {maxAlerts} of {alerts.length} alerts
                <Button variant='link' className='ml-2 h-auto p-0 text-primary'>
                  View All Alerts
                </Button>
              </p>
            </div>
          </IM_GlassPane>
        </motion.div>
      )}
    </motion.div>
  );
};

// Demo Component for Component Browser
const IM_CriticalStockAlertsDemo: React.FC = () => {
  const { theme } = useTheme();

  const sampleAlerts: StockAlert[] = [
    {
      id: '1',
      product: 'iPhone 15 Pro Case - Limited Edition',
      stock: 8,
      context: 'Featured in viral TikTok by @creator_queen (2.3M views)',
      velocity: 'Selling 67/hour, expected depletion in 4 hours',
      hoursLeft: 4,
      suggestion: 750,
      urgency: 'critical',
    },
    {
      id: '2',
      product: 'Wireless Phone Charger Pro',
      stock: 23,
      context: 'Trending in #TechTok hashtag',
      velocity: 'Selling 31/hour, strong momentum',
      hoursLeft: 18,
      suggestion: 300,
      urgency: 'high',
    },
    {
      id: '3',
      product: 'Phone Stand Adjustable',
      stock: 45,
      context: 'Mentioned in productivity TikToks',
      velocity: 'Selling 18/hour, steady demand',
      hoursLeft: 48,
      suggestion: 150,
      urgency: 'medium',
    },
  ];

  const handleAutoOrder = (alertId: string, quantity: number) => {
    console.log(`✅ Auto-ordering ${quantity} units for alert ${alertId}`);
  };

  const handleManualOrder = (alertId: string) => {
    console.log(`📝 Manual review requested for alert ${alertId}`);
  };

  const handleDefer = (alertId: string) => {
    console.log(`⏰ Deferred alert ${alertId}`);
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content space-y-strategic'>
        <div className='space-y-tactical text-center'>
          <h2 className='text-heading-lg text-foreground'>Critical Stock Alerts Demo</h2>
          <p className='text-body-md text-muted-foreground'>
            AI-powered stock alerts with viral context awareness and auto-reorder suggestions
          </p>
        </div>

        {/* Main Alert System */}
        <IM_CriticalStockAlerts
          alerts={sampleAlerts}
          onAutoOrder={handleAutoOrder}
          onManualOrder={handleManualOrder}
          onDefer={handleDefer}
          showActions={true}
          maxAlerts={5}
          animated={true}
        />

        {/* Urgency Level Examples */}
        <div className='space-y-strategic'>
          <h3 className='text-center text-heading-md text-foreground'>Alert Urgency Levels</h3>

          <div className='grid grid-cols-1 gap-strategic md:grid-cols-3'>
            {/* Critical */}
            <div className='space-y-tactical'>
              <h4 className='text-center text-body-lg font-semibold text-error-red-500'>Critical</h4>
              <IM_CriticalStockAlerts
                alerts={[
                  {
                    id: 'critical-demo',
                    product: 'Trending Phone Case',
                    stock: 3,
                    context: 'Going mega-viral (5M+ views)',
                    velocity: 'Selling 120/hour',
                    hoursLeft: 1,
                    suggestion: 1000,
                    urgency: 'critical',
                  },
                ]}
                onAutoOrder={handleAutoOrder}
                onManualOrder={handleManualOrder}
                onDefer={handleDefer}
                showActions={false}
                animated={true}
              />
            </div>

            {/* High */}
            <div className='space-y-tactical'>
              <h4 className='text-center text-body-lg font-semibold text-warning-amber-500'>High</h4>
              <IM_CriticalStockAlerts
                alerts={[
                  {
                    id: 'high-demo',
                    product: 'Popular Accessory',
                    stock: 15,
                    context: 'Strong TikTok presence',
                    velocity: 'Selling 45/hour',
                    hoursLeft: 8,
                    suggestion: 400,
                    urgency: 'high',
                  },
                ]}
                onAutoOrder={handleAutoOrder}
                onManualOrder={handleManualOrder}
                onDefer={handleDefer}
                showActions={false}
                animated={true}
              />
            </div>

            {/* Medium */}
            <div className='space-y-tactical'>
              <h4 className='text-center text-body-lg font-semibold text-brand-blue-500'>Medium</h4>
              <IM_CriticalStockAlerts
                alerts={[
                  {
                    id: 'medium-demo',
                    product: 'Standard Product',
                    stock: 35,
                    context: 'Steady growth trend',
                    velocity: 'Selling 20/hour',
                    hoursLeft: 24,
                    suggestion: 150,
                    urgency: 'medium',
                  },
                ]}
                onAutoOrder={handleAutoOrder}
                onManualOrder={handleManualOrder}
                onDefer={handleDefer}
                showActions={false}
                animated={true}
              />
            </div>
          </div>
        </div>

        {/* Feature Showcase */}
        <IM_GlassPane variant='premium'>
          <div className='space-y-strategic p-strategic'>
            <h3 className='text-center text-heading-md text-foreground'>Smart Alert Features</h3>

            <div className='grid grid-cols-1 gap-strategic md:grid-cols-2'>
              <div className='space-y-tactical'>
                <h4 className='text-body-lg font-semibold text-foreground'>🤖 AI-Powered Intelligence</h4>
                <ul className='space-y-2 text-body-md text-muted-foreground'>
                  <li>• Viral content detection from TikTok</li>
                  <li>• Predictive stock depletion timing</li>
                  <li>• Smart reorder quantity suggestions</li>
                  <li>• Urgency level classification</li>
                </ul>
              </div>

              <div className='space-y-tactical'>
                <h4 className='text-body-lg font-semibold text-foreground'>⚡ Real-time Actions</h4>
                <ul className='space-y-2 text-body-md text-muted-foreground'>
                  <li>• One-click auto-ordering</li>
                  <li>• Manual review workflow</li>
                  <li>• Defer for later assessment</li>
                  <li>• Bulk action capabilities</li>
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
  return <IM_CriticalStockAlertsDemo />;
};

export { IM_CriticalStockAlerts };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
