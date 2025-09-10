'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BaseChartProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function BaseChart({ title, description, children, trend, className }: BaseChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          {title}
          {trend && (
            <Badge
              variant='outline'
              className={`${
                trend.isPositive
                  ? 'border-green-500/20 bg-green-500/10 text-green-500'
                  : 'border-red-500/20 bg-red-500/10 text-red-500'
              } border-none`}
            >
              {trend.isPositive ? <TrendingUp className='h-4 w-4' /> : <TrendingDown className='h-4 w-4' />}
              <span>{Math.abs(trend.value)}%</span>
            </Badge>
          )}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
