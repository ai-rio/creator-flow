'use client';

import { AlertTriangle, TrendingUp, Truck } from 'lucide-react';
import React from 'react';

// ==================== TYPE DEFINITIONS ====================

type AlertType = 'critical' | 'insight' | 'operational';

interface AlertIconProps {
  type: AlertType;
  size?: number;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Alert icon component with predefined styling for different alert types
 * Maps alert types to appropriate icons and colors
 */
export function AlertIcon({ type, size = 20, className = '' }: AlertIconProps) {
  const iconMap = {
    critical: <AlertTriangle className='text-destructive dark:text-destructive' size={size} />,
    insight: <TrendingUp className='text-amber-600 dark:text-amber-400' size={size} />,
    operational: <Truck className='text-primary dark:text-primary' size={size} />,
  };

  return <div className={className}>{iconMap[type] || iconMap.critical}</div>;
}

export default AlertIcon;
