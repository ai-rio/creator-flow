'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { BaseChart } from './BaseChart';

interface RevenueData {
  period: string;
  revenue: number;
  profit: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  title?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
  profit: {
    label: 'Profit',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function RevenueChart({
  data,
  title = 'Revenue Analytics',
  description = 'Revenue and profit trends',
  trend,
}: RevenueChartProps) {
  return (
    <BaseChart title={title} description={description} trend={trend}>
      <ChartContainer config={chartConfig} className='min-h-[300px]'>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {/* Gradient background */}
          <rect x='0' y='0' width='100%' height='100%' fill='url(#revenue-gradient)' opacity={0.05} />
          <defs>
            <RevenueGradient />
            <RevenueBarGradient />
            <ProfitBarGradient />
          </defs>

          <XAxis
            dataKey='period'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />

          <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />

          <Bar
            dataKey='revenue'
            fill='url(#revenue-bar-gradient)'
            radius={[4, 4, 0, 0]}
            strokeWidth={1}
            stroke='var(--color-revenue)'
          />

          <Bar
            dataKey='profit'
            fill='url(#profit-bar-gradient)'
            radius={[4, 4, 0, 0]}
            strokeWidth={1}
            stroke='var(--color-profit)'
          />
        </BarChart>
      </ChartContainer>
    </BaseChart>
  );
}

const RevenueGradient = () => (
  <linearGradient id='revenue-gradient' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0%' stopColor='hsl(var(--chart-1))' stopOpacity={0.8} />
    <stop offset='100%' stopColor='hsl(var(--chart-2))' stopOpacity={0.1} />
  </linearGradient>
);

const RevenueBarGradient = () => (
  <linearGradient id='revenue-bar-gradient' x1='0' y1='0' x2='0' y2='1'>
    <stop offset='0%' stopColor='hsl(var(--chart-1))' stopOpacity={0.9} />
    <stop offset='100%' stopColor='hsl(var(--chart-1))' stopOpacity={0.6} />
  </linearGradient>
);

const ProfitBarGradient = () => (
  <linearGradient id='profit-bar-gradient' x1='0' y1='0' x2='0' y2='1'>
    <stop offset='0%' stopColor='hsl(var(--chart-2))' stopOpacity={0.9} />
    <stop offset='100%' stopColor='hsl(var(--chart-2))' stopOpacity={0.6} />
  </linearGradient>
);
