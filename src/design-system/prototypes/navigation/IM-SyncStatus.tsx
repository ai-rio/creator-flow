/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCw } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * IM-SyncStatus - Organism component for inventory sync status
 *
 * A comprehensive sync status component that displays current
 * synchronization state with all connected channels, last sync
 * timestamp, and manual sync capabilities.
 *
 * @component
 * @example
 * ```tsx
 * <IMSyncStatus
 *   syncStatus="synced"
 *   lastSync={new Date()}
 *   onForceSync={() => console.log('Force sync')}
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

interface IMSyncStatusProps {
  /** Current sync status */
  syncStatus?: 'synced' | 'syncing' | 'error' | 'outdated';
  /** Last successful sync timestamp */
  lastSync?: Date;
  /** Force sync handler */
  onForceSync?: () => void;
  /** Number of connected channels */
  channelCount?: number;
  /** Sync in progress indicator */
  isSyncing?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const statusConfig = {
  synced: {
    icon: CheckCircle2,
    iconColor: 'text-brand-teal-primary',
    title: 'All Channels Synced',
    titleColor: 'text-foreground',
  },
  syncing: {
    icon: RefreshCw,
    iconColor: 'text-brand-blue-primary',
    title: 'Syncing Channels...',
    titleColor: 'text-foreground',
  },
  error: {
    icon: CheckCircle2,
    iconColor: 'text-destructive',
    title: 'Sync Error',
    titleColor: 'text-destructive',
  },
  outdated: {
    icon: CheckCircle2,
    iconColor: 'text-warning-amber-500',
    title: 'Sync Outdated',
    titleColor: 'text-warning-amber-500',
  },
};

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return date.toLocaleDateString();
};

const IM_SyncStatusContent: React.FC<IMSyncStatusProps> = ({
  syncStatus = 'synced',
  lastSync = new Date(Date.now() - 32000), // 32 seconds ago
  onForceSync,
  channelCount = 3,
  isSyncing = false,
  className = '',
}) => {
  const config = statusConfig[syncStatus];
  const IconComponent = config.icon;
  const [isForceLoading, setIsForceLoading] = useState(false);

  const handleForceSync = async () => {
    if (onForceSync && !isSyncing && !isForceLoading) {
      setIsForceLoading(true);
      try {
        await onForceSync();
      } finally {
        // Reset loading state after a short delay
        setTimeout(() => setIsForceLoading(false), 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring' as any,
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      }}
      className={className}
    >
      <Card className='rounded-executive border-border/20 bg-card/90 p-strategic backdrop-blur-sm'>
        <div className='flex items-center justify-between'>
          {/* Status Information */}
          <div className='flex items-center gap-tactical'>
            <motion.div
              animate={syncStatus === 'syncing' || isForceLoading ? { rotate: 360 } : {}}
              transition={
                syncStatus === 'syncing' || isForceLoading ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}
              }
            >
              <IconComponent className={`h-icon-sm w-icon-sm ${config.iconColor}`} />
            </motion.div>

            <div>
              <p className={`text-body-md font-semibold ${config.titleColor}`}>{config.title}</p>
              <p className='text-body-sm text-muted-foreground'>
                Last sync: {formatTimeAgo(lastSync)}
                {channelCount > 1 && ` • ${channelCount} channels`}
              </p>
            </div>
          </div>

          {/* Force Sync Button */}
          {onForceSync && (
            <Button
              variant='ghost'
              size='sm'
              onClick={handleForceSync}
              disabled={isSyncing || isForceLoading}
              className='text-body-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
            >
              {isSyncing || isForceLoading ? 'Syncing...' : 'Force Sync'}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const IM_SyncStatus: React.FC<IMSyncStatusProps> = (props) => {
  return <IM_SyncStatusContent {...props} />;
};

// Export with theme provider wrapper
const AppContent = () => {
  return (
    <div className='space-y-strategic'>
      <IM_SyncStatus
        syncStatus='synced'
        lastSync={new Date(Date.now() - 32000)}
        onForceSync={() => console.log('Force sync triggered')}
        channelCount={3}
      />
      <IM_SyncStatus syncStatus='syncing' lastSync={new Date(Date.now() - 120000)} isSyncing={true} channelCount={5} />
    </div>
  );
};

export { IM_SyncStatusContent };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <div className='min-h-screen bg-background p-strategic'>
        <AppContent />
      </div>
    </ThemeProvider>
  );
}

export { IM_SyncStatus };
