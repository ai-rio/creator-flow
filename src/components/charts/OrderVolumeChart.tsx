'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { BaseChart } from './BaseChart';

interface OrderVolumeData {
  period: string;
  orders: number;
  completedOrders: number;
}

interface OrderVolumeChartProps {
  data: OrderVolumeData[];
  title?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const chartConfig = {
  orders: {
    label: 'Total Orders',
    color: 'hsl(var(--chart-1))',
  },
  completedOrders: {
    label: 'Completed Orders',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function OrderVolumeChart({
  data,
  title = 'Order Volume',
  description = 'Daily order trends',
  trend,
}: OrderVolumeChartProps) {
  return (
    <BaseChart title={title} description={description} trend={trend}>
      <ChartContainer config={chartConfig} className='min-h-[300px]'>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {/* Background pattern */}
          <rect x='0' y='0' width='100%' height='100%' fill='url(#order-volume-pattern)' opacity={0.1} />
          <defs>
            <OrderVolumePattern />
          </defs>

          <XAxis
            dataKey='period'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}`} />

          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ stroke: 'var(--color-orders)', strokeWidth: 1, strokeDasharray: '5 5' }}
          />

          <Line
            type='monotone'
            dataKey='orders'
            stroke='var(--color-orders)'
            strokeWidth={3}
            dot={{ fill: 'var(--color-orders)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: 'var(--color-orders)', strokeWidth: 2 }}
          />

          <Line
            type='monotone'
            dataKey='completedOrders'
            stroke='var(--color-completedOrders)'
            strokeWidth={2}
            dot={{ fill: 'var(--color-completedOrders)', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, stroke: 'var(--color-completedOrders)', strokeWidth: 2 }}
            strokeDasharray='5 5'
          />
        </LineChart>
      </ChartContainer>
    </BaseChart>
  );
}

const OrderVolumePattern = () => {
  return (
    <pattern id='order-volume-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'>
      <circle cx='10' cy='10' r='1' fill='currentColor' className='text-muted-foreground/20' />
    </pattern>
  );
};
