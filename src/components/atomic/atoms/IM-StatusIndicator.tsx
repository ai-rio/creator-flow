/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import React from 'react';

/**
 * IM-StatusIndicator - Atomic status indicator for inventory system
 *
 * A minimal, reusable status indicator component that shows system status
 * with animated pulse effects and proper accessibility support.
 *
 * @component
 * @example
 * ```tsx
 * <IMStatusIndicator
 *   status="online"
 *   label="System Nominal"
 *   variant="success"
 * />
 * ```
 */

interface IMStatusIndicatorProps {
  /** Status type affecting color and animation */
  status?: 'online' | 'offline' | 'warning' | 'error';
  /** Accessible label for the status */
  label?: string;
  /** Visual variant for different contexts */
  variant?: 'success' | 'warning' | 'error' | 'info';
  /** Additional CSS classes */
  className?: string;
}

const statusConfig = {
  online: {
    color: 'bg-brand-teal-primary',
    textColor: 'text-brand-teal-400',
    borderColor: 'border-brand-teal-primary/30',
    bgColor: 'bg-brand-teal-primary/20',
  },
  warning: {
    color: 'bg-warning-amber-500',
    textColor: 'text-warning-amber-400',
    borderColor: 'border-warning-amber-500/30',
    bgColor: 'bg-warning-amber-500/20',
  },
  error: {
    color: 'bg-error-red-500',
    textColor: 'text-error-red-400',
    borderColor: 'border-error-red-500/30',
    bgColor: 'bg-error-red-500/20',
  },
  offline: {
    color: 'bg-muted-foreground',
    textColor: 'text-muted-foreground',
    borderColor: 'border-muted/30',
    bgColor: 'bg-muted/20',
  },
};

const IM_StatusIndicator: React.FC<IMStatusIndicatorProps> = ({
  status = 'online',
  label = 'System Nominal',
  variant = 'success',
  className = '',
}) => {
  const config = statusConfig[status];

  return (
    <div
      className={`flex items-center gap-tactical rounded-premium border ${config.borderColor} ${config.bgColor} px-tactical py-2 ${className}`}
      role='status'
      aria-label={`System status: ${label}`}
    >
      <motion.div
        className={`h-2 w-2 rounded-full ${config.color}`}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
        aria-hidden='true'
      />
      <span className={`text-body-sm font-medium ${config.textColor}`}>{label}</span>
    </div>
  );
};

export default IM_StatusIndicator;
