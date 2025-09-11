/* eslint-disable */
'use client';

import React from 'react';

/**
 * IM-MetricValue - Atomic metric display component for inventory data
 *
 * A reusable component for displaying numerical metrics with proper
 * typography, accessibility, and consistent formatting across the
 * inventory management system.
 *
 * @component
 * @example
 * ```tsx
 * <IMMetricValue
 *   value={47}
 *   unit="/hour"
 *   label="Sales Velocity"
 *   variant="success"
 * />
 * ```
 */

interface IMMetricValueProps {
  /** The metric value to display */
  value: string | number;
  /** Optional unit or suffix */
  unit?: string;
  /** Accessible label for the metric */
  label?: string;
  /** Visual variant affecting color */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Size variant for typography */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

const variantStyles = {
  default: 'text-foreground',
  success: 'text-brand-teal-primary',
  warning: 'text-warning-amber-500',
  error: 'text-destructive',
  info: 'text-brand-blue-primary',
};

const sizeStyles = {
  sm: 'text-metric-sm',
  md: 'text-metric-md',
  lg: 'text-metric-lg',
  xl: 'text-metric-xl',
};

const unitSizeStyles = {
  sm: 'text-body-xs',
  md: 'text-body-sm',
  lg: 'text-body-md',
  xl: 'text-body-lg',
};

const IM_MetricValue: React.FC<IMMetricValueProps> = ({
  value,
  unit,
  label,
  variant = 'default',
  size = 'lg',
  className = '',
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      // Format numbers with appropriate locale-aware formatting
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M';
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div
      className={`flex items-baseline gap-1 ${className}`}
      role={label ? 'group' : undefined}
      aria-label={label ? `${label}: ${value}${unit || ''}` : undefined}
    >
      <span className={`font-bold ${sizeStyles[size]} ${variantStyles[variant]}`} aria-hidden={!!label}>
        {formatValue(value)}
      </span>
      {unit && (
        <span className={`font-medium text-muted-foreground ${unitSizeStyles[size]}`} aria-hidden={!!label}>
          {unit}
        </span>
      )}
      {label && (
        <span className='sr-only'>
          {label}: {value}
          {unit}
        </span>
      )}
    </div>
  );
};

export default IM_MetricValue;
