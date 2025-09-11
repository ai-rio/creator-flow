'use client';

import { Bolt, Settings, Truck, Zap } from 'lucide-react';
import React from 'react';

// ==================== TYPE DEFINITIONS ====================

type OrderStatusType = 'viral' | 'auto-processing' | 'shipped' | 'high-priority';

interface StatusIconProps {
  type: OrderStatusType;
  size?: number;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Order status icon component with predefined styling for different order types
 * Maps status types to appropriate icons and colors for order management
 */
export function StatusIcon({ type, size = 20, className = '' }: StatusIconProps) {
  const iconMap = {
    viral: <Zap className='text-amber-500 dark:text-amber-400' size={size} />,
    'auto-processing': <Settings className='text-purple-600 dark:text-purple-400' size={size} />,
    shipped: <Truck className='text-sky-600 dark:text-sky-400' size={size} />,
    'high-priority': <Bolt className='text-destructive dark:text-destructive' size={size} />,
  };

  return <div className={className}>{iconMap[type] || iconMap['auto-processing']}</div>;
}

export default StatusIcon;
