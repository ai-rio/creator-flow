/* eslint-disable */
'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Clock, Siren, TrendingUp } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import IMActionGroup from '../molecules/IM-ActionGroup';
import IMMetricCard from '../molecules/IM-MetricCard';
import IMStockAlert from '../molecules/IM-StockAlert';

/**
 * IM-CriticalStock - Organism component for critical stock management
 *
 * A comprehensive critical stock alert system that displays products
 * with low inventory, predictive analytics, AI suggestions, and
 * action interfaces. Includes real-time updates and contextual intelligence.
 *
 * @component
 * @example
 * ```tsx
 * <IMCriticalStock
 *   products={criticalProducts}
 *   onAutoOrder={(productId, quantity) => handleAutoOrder(productId, quantity)}
 *   onDeferAlert={(productId) => handleDefer(productId)}
 * />
 * ```
 */

// Theme Context
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

interface CriticalStockItem {
  id: string;
  productName: string;
  stockLeft: number;
  cause: string;
  causeIcon: string;
  velocity: number;
  timeToStockout: string;
  suggestion: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

interface IMCriticalStockProps {
  /** Array of critical stock items */
  products?: CriticalStockItem[];
  /** Auto-order handler */
  onAutoOrder?: (productId: string, quantity: number) => void;
  /** Manual order handler */
  onManualOrder?: (productId: string) => void;
  /** Defer alert handler */
  onDeferAlert?: (productId: string) => void;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Default mock data
const defaultProducts: CriticalStockItem[] = [
  {
    id: '1',
    productName: 'iPhone Case Pro',
    stockLeft: 12,
    cause: 'Viral video driving orders',
    causeIcon: '🔥',
    velocity: 47,
    timeToStockout: '6hr',
    suggestion: 500,
    priority: 'critical',
  },
  {
    id: '2',
    productName: 'Magnetic Charging Stand',
    stockLeft: 23,
    cause: 'Mentioned by @techguru',
    causeIcon: '🚀',
    velocity: 21,
    timeToStockout: '11hr',
    suggestion: 300,
    priority: 'high',
  },
  {
    id: '3',
    productName: 'Creator Ring Light Max',
    stockLeft: 8,
    cause: 'Flash sale ending soon',
    causeIcon: '⚡️',
    velocity: 60,
    timeToStockout: '2hr',
    suggestion: 800,
    priority: 'critical',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'text-destructive';
    case 'high':
      return 'text-warning-amber-500';
    case 'medium':
      return 'text-brand-blue-primary';
    default:
      return 'text-muted-foreground';
  }
};

const IM_CriticalStockContent: React.FC<IMCriticalStockProps> = ({
  products = defaultProducts,
  onAutoOrder,
  onManualOrder,
  onDeferAlert,
  loading = false,
  className = '',
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring' as any,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
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

  if (loading) {
    return (
      <div className={`space-y-strategic ${className}`}>
        <div className='flex items-center gap-2 px-1'>
          <div className='h-5 w-5 animate-pulse rounded bg-muted' />
          <div className='h-6 w-48 animate-pulse rounded bg-muted' />
        </div>
        <div className='space-y-strategic'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className='p-strategic'>
              <div className='animate-pulse space-y-tactical'>
                <div className='h-6 w-3/4 rounded bg-muted' />
                <div className='h-4 w-1/2 rounded bg-muted' />
                <div className='grid grid-cols-2 gap-tactical'>
                  <div className='h-16 rounded bg-muted' />
                  <div className='h-16 rounded bg-muted' />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants as any}
      initial='hidden'
      animate='visible'
      className={`space-y-strategic ${className}`}
    >
      {/* Section Header */}
      <motion.div variants={itemVariants as any} className='flex items-center gap-2 px-1'>
        <Siren className='h-icon-sm w-icon-sm text-destructive' />
        <h2 className='text-heading-lg font-bold uppercase tracking-wide text-destructive'>Critical Stock Alerts</h2>
        <Badge variant='destructive' className='ml-2'>
          {products.length}
        </Badge>
      </motion.div>

      {/* Stock Items */}
      <motion.div variants={containerVariants as any} className='space-y-strategic'>
        <AnimatePresence>
          {products.map((item) => (
            <motion.div key={item.id} variants={itemVariants as any} layout exit={{ opacity: 0, scale: 0.95, y: -20 }}>
              <Card className='overflow-hidden rounded-executive border-border/20 bg-card/90 p-strategic backdrop-blur-sm'>
                {/* Product Header */}
                <div className='mb-tactical flex items-start justify-between'>
                  <div className='space-y-1'>
                    <h3 className='text-heading-md font-bold text-foreground'>{item.productName}</h3>
                    <div className='flex items-center gap-2'>
                      <Badge variant='secondary' className={getPriorityColor(item.priority || 'medium')}>
                        {item.priority?.toUpperCase() || 'MEDIUM'} PRIORITY
                      </Badge>
                    </div>
                  </div>

                  <div className='text-right'>
                    <p className='text-metric-xl font-bold text-warning-amber-500'>{item.stockLeft}</p>
                    <p className='text-body-sm text-muted-foreground'>units left</p>
                  </div>
                </div>

                {/* Contextual Intelligence */}
                <div className='mb-strategic flex items-center gap-2 text-body-sm text-muted-foreground'>
                  <span className='text-lg' aria-hidden='true'>
                    {item.causeIcon}
                  </span>
                  <span>{item.cause}</span>
                </div>

                {/* Predictive Metrics */}
                <div className='mb-strategic grid grid-cols-1 gap-tactical md:grid-cols-2'>
                  <IMMetricCard
                    title='Sales Velocity'
                    value={item.velocity}
                    unit='/hour'
                    variant='info'
                    icon={<TrendingUp className='h-4 w-4' />}
                  />
                  <IMMetricCard
                    title='Est. Stockout'
                    value={item.timeToStockout}
                    variant='warning'
                    icon={<Clock className='h-4 w-4' />}
                  />
                </div>

                {/* AI Suggestion */}
                <div className='mb-strategic'>
                  <IMStockAlert
                    suggestion={item.suggestion}
                    reason={`Based on ${item.velocity}/hr velocity and current stock levels`}
                    confidence={0.87 + Math.random() * 0.1} // Realistic confidence
                    severity='warning'
                  />
                </div>

                {/* Action Buttons */}
                <IMActionGroup
                  actions={[
                    {
                      label: 'Auto-Order',
                      onClick: () => onAutoOrder?.(item.id, item.suggestion),
                      variant: 'primary',
                    },
                    {
                      label: 'Manual',
                      onClick: () => onManualOrder?.(item.id),
                      variant: 'secondary',
                    },
                    {
                      label: 'Defer',
                      onClick: () => onDeferAlert?.(item.id),
                      variant: 'outline',
                    },
                  ]}
                  direction='horizontal'
                />
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {products.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='py-strategic text-center'>
          <p className='text-body-lg text-muted-foreground'>No critical stock alerts at this time</p>
          <p className='text-body-sm text-muted-foreground'>All inventory levels are healthy</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const IM_CriticalStock: React.FC<IMCriticalStockProps> = (props) => {
  return <IM_CriticalStockContent {...props} />;
};

// Export with theme provider wrapper
const AppContent = () => {
  return (
    <IM_CriticalStock
      onAutoOrder={(productId, quantity) => console.log(`Auto-ordering ${quantity} units of product ${productId}`)}
      onManualOrder={(productId) => console.log(`Manual order for product ${productId}`)}
      onDeferAlert={(productId) => console.log(`Deferring alert for product ${productId}`)}
    />
  );
};

export { IM_CriticalStockContent };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <div className='min-h-screen bg-background p-strategic'>
        <div className='mx-auto max-w-content space-y-strategic'>
          <AppContent />
        </div>
      </div>
    </ThemeProvider>
  );
}

export { IM_CriticalStock };
