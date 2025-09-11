/* eslint-disable */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { IM_CriticalStock } from '../organisms/IM-CriticalStock';
import { IM_InventoryHeader } from '../organisms/IM-InventoryHeader';
import { IM_SyncStatus } from '../organisms/IM-SyncStatus';

/**
 * IM-InventoryCommand - Composition component for complete inventory management
 *
 * A comprehensive inventory management interface that combines header,
 * sync status, and critical stock alerts into a cohesive dashboard.
 * Provides complete inventory command and control capabilities.
 *
 * @component
 * @example
 * ```tsx
 * <IMInventoryCommand
 *   onAutoOrder={(productId, quantity) => handleAutoOrder(productId, quantity)}
 *   onForceSync={() => handleForceSync()}
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

interface IMInventoryCommandProps {
  /** Array of critical stock items */
  criticalProducts?: CriticalStockItem[];
  /** Current system status */
  systemStatus?: 'online' | 'offline' | 'warning' | 'error';
  /** System status label */
  systemStatusLabel?: string;
  /** Sync status */
  syncStatus?: 'synced' | 'syncing' | 'error' | 'outdated';
  /** Last sync timestamp */
  lastSync?: Date;
  /** Auto-order handler */
  onAutoOrder?: (productId: string, quantity: number) => Promise<void> | void;
  /** Manual order handler */
  onManualOrder?: (productId: string) => Promise<void> | void;
  /** Defer alert handler */
  onDeferAlert?: (productId: string) => Promise<void> | void;
  /** Force sync handler */
  onForceSync?: () => Promise<void> | void;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const IM_InventoryCommandContent: React.FC<IMInventoryCommandProps> = ({
  criticalProducts,
  systemStatus = 'online',
  systemStatusLabel = 'System Nominal',
  syncStatus = 'synced',
  lastSync = new Date(Date.now() - 32000),
  onAutoOrder,
  onManualOrder,
  onDeferAlert,
  onForceSync,
  loading = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(loading);

  // Default critical stock data for demo purposes
  const defaultCriticalProducts: CriticalStockItem[] = [
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

  const handleAutoOrder = async (productId: string, quantity: number) => {
    setIsLoading(true);
    try {
      await onAutoOrder?.(productId, quantity);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualOrder = async (productId: string) => {
    setIsLoading(true);
    try {
      await onManualOrder?.(productId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeferAlert = async (productId: string) => {
    setIsLoading(true);
    try {
      await onDeferAlert?.(productId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForceSync = async () => {
    setIsLoading(true);
    try {
      await onForceSync?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className='mx-auto max-w-content space-y-strategic p-strategic'>
        {/* Inventory Management Header */}
        <IM_InventoryHeader title='Inventory Command' systemStatus={systemStatus} statusLabel={systemStatusLabel} />

        {/* Sync Status Card */}
        <IM_SyncStatus
          syncStatus={syncStatus}
          lastSync={lastSync}
          onForceSync={handleForceSync}
          isSyncing={isLoading}
        />

        {/* Critical Stock Alerts */}
        <IM_CriticalStock
          products={criticalProducts || defaultCriticalProducts}
          onAutoOrder={handleAutoOrder}
          onManualOrder={handleManualOrder}
          onDeferAlert={handleDeferAlert}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

const IM_InventoryCommand: React.FC<IMInventoryCommandProps> = (props) => {
  return <IM_InventoryCommandContent {...props} />;
};

// Export with theme provider wrapper
const AppContent = () => {
  return (
    <IM_InventoryCommand
      onAutoOrder={async (productId, quantity) => {
        console.log(`Auto-ordering ${quantity} units of product ${productId}`);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }}
      onManualOrder={async (productId) => {
        console.log(`Opening manual order dialog for product ${productId}`);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }}
      onDeferAlert={async (productId) => {
        console.log(`Deferring alert for product ${productId}`);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }}
      onForceSync={async () => {
        console.log('Force syncing inventory...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }}
    />
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export { IM_InventoryCommand };
