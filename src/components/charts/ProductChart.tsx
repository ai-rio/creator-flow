'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { BaseChart } from './BaseChart';

interface ProductData {
  category: string;
  value: number;
  percentage: number;
}

interface ProductChartProps {
  data: ProductData[];
  title?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const chartConfig = {
  category: {
    label: 'Product Category',
  },
  value: {
    label: 'Sales',
  },
} satisfies ChartConfig;

export function ProductChart({
  data,
  title = 'Product Performance',
  description = 'Sales by product category',
  trend,
}: ProductChartProps) {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 5) return null; // Don't show labels for small slices

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        className='text-sm font-medium'
      >
        {`${percentage.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <BaseChart title={title} description={description} trend={trend}>
      <ChartContainer config={chartConfig} className='min-h-[400px]'>
        <PieChart>
          <defs>
            <ProductGradients />
          </defs>

          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={40}
            fill='#8884d8'
            dataKey='value'
            stroke='rgba(255, 255, 255, 0.2)'
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index % 5})`}
                className='transition-opacity hover:opacity-80'
              />
            ))}
          </Pie>

          <ChartTooltip
            content={({ active, payload }: { active?: boolean; payload?: any[] }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className='rounded-lg border bg-background p-3 shadow-md'>
                    <p className='font-medium'>{data.category}</p>
                    <p className='text-sm text-muted-foreground'>Sales: {data.value.toLocaleString()}</p>
                    <p className='text-sm text-muted-foreground'>{data.percentage.toFixed(1)}% of total</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend
            verticalAlign='bottom'
            height={36}
            formatter={(value, entry) => (
              <span className='text-sm' style={{ color: entry.color }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ChartContainer>
    </BaseChart>
  );
}

const ProductGradients = () => (
  <>
    {[0, 1, 2, 3, 4].map((index) => (
      <radialGradient key={index} id={`gradient-${index}`} cx='50%' cy='50%' r='50%'>
        <stop offset='0%' stopColor={COLORS[index]} stopOpacity={1} />
        <stop offset='100%' stopColor={COLORS[index]} stopOpacity={0.7} />
      </radialGradient>
    ))}
  </>
);
