/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

import IMStatusIndicator from '../../../components/atomic/atoms/IM-StatusIndicator';

/**
 * IM-InventoryHeader - Organism component for inventory management header
 *
 * A comprehensive header component for inventory management interfaces,
 * featuring system status, navigation, and theme support. Provides
 * sticky positioning and glass morphism effects.
 *
 * @component
 * @example
 * ```tsx
 * <IMInventoryHeader
 *   title="Inventory Command"
 *   systemStatus="online"
 *   statusLabel="System Nominal"
 * />
 * ```
 */

// Theme Context for the component
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

interface IMInventoryHeaderProps {
  /** Header title */
  title?: string;
  /** System status indicator */
  systemStatus?: 'online' | 'offline' | 'warning' | 'error';
  /** Status label text */
  statusLabel?: string;
  /** Whether header should be sticky */
  sticky?: boolean;
  /** Additional actions or content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Optional click handler for the header */
  onClick?: () => void;
}

const IM_InventoryHeaderContent: React.FC<IMInventoryHeaderProps> = ({
  title = 'Inventory Command',
  systemStatus = 'online',
  statusLabel = 'System Nominal',
  sticky = true,
  children,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' as any, stiffness: 200, damping: 20 }}
      className={`${sticky ? 'sticky top-tactical z-header' : ''} ${className}`}
    >
      <Card
        className={`
          rounded-executive border-border/20 bg-card/90 p-strategic 
          shadow-lg backdrop-blur-xl
          ${onClick ? 'cursor-pointer transition-colors hover:bg-card/95' : ''}
        `}
        onClick={onClick}
      >
        <div className='flex items-center justify-between'>
          {/* Title Section */}
          <div className='flex items-center gap-tactical'>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring' as any, stiffness: 400 }}
              className='text-foreground'
            >
              <Layers className='h-icon-md w-icon-md' />
            </motion.div>
            <h1 className='text-heading-lg font-bold text-foreground'>{title}</h1>
          </div>

          {/* Status and Actions */}
          <div className='flex items-center gap-tactical'>
            <IMStatusIndicator status={systemStatus} label={statusLabel} />
            {children}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const IM_InventoryHeader: React.FC<IMInventoryHeaderProps> = (props) => {
  return <IM_InventoryHeaderContent {...props} />;
};

// Export with theme provider wrapper
const AppContent = () => {
  return <IM_InventoryHeader title='Inventory Command' systemStatus='online' statusLabel='System Nominal' />;
};

export { IM_InventoryHeaderContent };
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <div className='min-h-screen bg-background p-strategic'>
        <AppContent />
      </div>
    </ThemeProvider>
  );
}

export { IM_InventoryHeader };
