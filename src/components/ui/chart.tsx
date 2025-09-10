'use client';

import * as React from 'react';

import { cn } from '@/utils/cn';

// Chart configuration type
export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

// Chart container component
interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  return (
    <div
      className={cn('chart-container', className)}
      style={{
        // Apply CSS variables for chart colors
        ...Object.entries(config).reduce((acc, [key, value]) => {
          if (value.color) {
            acc[`--color-${key}` as any] = value.color;
          }
          return acc;
        }, {} as Record<string, string>),
      }}
    >
      {children}
    </div>
  );
}

// Chart tooltip content component
interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
}

export function ChartTooltipContent({ active, payload, label, className }: ChartTooltipContentProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className={cn('rounded-lg border bg-background p-3 text-sm shadow-md', className)}>
      {label && <p className='mb-1 font-medium'>{label}</p>}
      {payload.map((entry, index) => (
        <div key={index} className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-full' style={{ backgroundColor: entry.color }} />
          <span className='text-muted-foreground'>
            {entry.name}: {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// Chart tooltip wrapper component
interface ChartTooltipProps {
  content?: React.ComponentType<any> | React.ReactElement;
  cursor?: any;
  children?: React.ReactNode;
}

export function ChartTooltip({ content, cursor, ...props }: ChartTooltipProps) {
  // This is a pass-through component that recharts will use
  if (React.isValidElement(content)) {
    return content;
  }
  const Content = content as React.ComponentType<any>;
  return Content ? <Content {...props} /> : null;
}
