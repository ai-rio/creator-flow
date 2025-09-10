'use client';

import { OrderVolumeChart, ProductChart, RevenueChart } from './index';

// Sample data for demonstration
const orderVolumeData = [
  { period: 'Jan', orders: 342, completedOrders: 320 },
  { period: 'Feb', orders: 876, completedOrders: 845 },
  { period: 'Mar', orders: 512, completedOrders: 498 },
  { period: 'Apr', orders: 629, completedOrders: 615 },
  { period: 'May', orders: 458, completedOrders: 440 },
  { period: 'Jun', orders: 781, completedOrders: 765 },
  { period: 'Jul', orders: 394, completedOrders: 380 },
  { period: 'Aug', orders: 925, completedOrders: 910 },
  { period: 'Sep', orders: 647, completedOrders: 632 },
  { period: 'Oct', orders: 532, completedOrders: 520 },
  { period: 'Nov', orders: 803, completedOrders: 795 },
  { period: 'Dec', orders: 271, completedOrders: 265 },
];

const revenueData = [
  { period: 'Jan', revenue: 45000, profit: 12000 },
  { period: 'Feb', revenue: 67000, profit: 18500 },
  { period: 'Mar', revenue: 52000, profit: 14200 },
  { period: 'Apr', revenue: 73000, profit: 21000 },
  { period: 'May', revenue: 48000, profit: 13500 },
  { period: 'Jun', revenue: 86000, profit: 25800 },
];

const productData = [
  { category: 'Electronics', value: 45000, percentage: 35.2 },
  { category: 'Clothing', value: 32000, percentage: 25.0 },
  { category: 'Home & Garden', value: 28000, percentage: 21.9 },
  { category: 'Sports', value: 15000, percentage: 11.7 },
  { category: 'Books', value: 8000, percentage: 6.2 },
];

export function ChartsDemo() {
  return (
    <div className='grid gap-6 p-6'>
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Order Volume Chart */}
        <OrderVolumeChart
          data={orderVolumeData}
          title='Order Volume Trends'
          description='TikTok Shop orders over the last 12 months'
          trend={{ value: 12.5, isPositive: true }}
        />

        {/* Revenue Chart */}
        <RevenueChart
          data={revenueData}
          title='Revenue Performance'
          description='Monthly revenue and profit analysis'
          trend={{ value: 8.3, isPositive: true }}
        />
      </div>

      {/* Product Performance Chart */}
      <div className='mx-auto max-w-2xl'>
        <ProductChart
          data={productData}
          title='Product Category Distribution'
          description='Sales breakdown by product categories'
          trend={{ value: 15.7, isPositive: true }}
        />
      </div>

      {/* Usage Information */}
      <div className='mt-8 rounded-lg bg-muted/50 p-6'>
        <h3 className='mb-3 text-lg font-semibold'>EvilCharts Integration</h3>
        <div className='grid gap-4 text-sm text-muted-foreground'>
          <div>
            <strong>Charts Available:</strong>
            <ul className='mt-2 list-inside list-disc space-y-1'>
              <li>OrderVolumeChart - Line chart for tracking order trends</li>
              <li>RevenueChart - Bar chart for revenue and profit analysis</li>
              <li>ProductChart - Pie chart for category distribution</li>
            </ul>
          </div>
          <div>
            <strong>Features:</strong>
            <ul className='mt-2 list-inside list-disc space-y-1'>
              <li>Responsive design with mobile-first approach</li>
              <li>Interactive tooltips and hover effects</li>
              <li>Gradient backgrounds and custom patterns</li>
              <li>Trend indicators with positive/negative styling</li>
              <li>Built on Recharts with EvilCharts styling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
