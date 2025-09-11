/* eslint-disable */
'use client';

import React from 'react';

import { Card } from '@/components/ui/card';

import IMMetricValue from '../atoms/IM-MetricValue';

/**
 * IM-MetricCard - Molecule component for displaying inventory metrics
 *
 * A card component that combines metric values with labels and proper
 * visual hierarchy for inventory management dashboards. Provides
 * consistent formatting and accessibility.
 *
 * @component
 * @example
 * ```tsx
 * <IMMetricCard
 *   title="Sales Velocity"
 *   value={47}
 *   unit="/hour"
 *   variant="success"
 * />
 * ```
 */

interface IMMetricCardProps {
  /** Card title/label */
  title: string;
  /** Metric value */
  value: string | number;
  /** Optional unit or suffix */
  unit?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Visual variant for the metric */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const IM_MetricCard: React.FC<IMMetricCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  variant = 'default',
  icon,
  className = '',
}) => {
  return (
    <Card className={`rounded-premium border-border/20 bg-card/90 p-tactical backdrop-blur-sm ${className}`}>
      <div className='space-y-2'>
        {/* Title with optional icon */}
        <div className='flex items-center gap-2'>
          {icon && (
            <div className='text-muted-foreground' aria-hidden='true'>
              {icon}
            </div>
          )}
          <p className='text-body-xs font-medium uppercase tracking-wide text-muted-foreground'>{title}</p>
        </div>

        {/* Metric value */}
        <IMMetricValue value={value} unit={unit} label={title} variant={variant} size='lg' />

        {/* Optional subtitle */}
        {subtitle && <p className='text-body-sm text-muted-foreground'>{subtitle}</p>}
      </div>
    </Card>
  );
};

export default IM_MetricCard;
