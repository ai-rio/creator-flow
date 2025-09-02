/**
 * Creator Analytics Component
 * Displays performance analytics in MDX content
 */

import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';

interface AnalyticsData {
  period: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  conversionRate: number;
}

interface CreatorAnalyticsProps {
  data: AnalyticsData[];
  totalRevenue: number;
  totalOrders: number;
}

export function CreatorAnalytics({ data, totalRevenue, totalOrders }: CreatorAnalyticsProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="bg-white rounded-2xl border border-stone-gray/20 p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-bold text-forest-green mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Creator Performance Analytics
      </h3>
      
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <DollarSign className="w-6 h-6 mb-2 opacity-80" />
          <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          <div className="text-sm opacity-80">Total Revenue</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <Package className="w-6 h-6 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
          <div className="text-sm opacity-80">Total Orders</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <TrendingUp className="w-6 h-6 mb-2 opacity-80" />
          <div className="text-2xl font-bold">${(totalRevenue / totalOrders).toFixed(2)}</div>
          <div className="text-sm opacity-80">Avg Order Value</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium text-charcoal">Monthly Performance</h4>
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-charcoal">{item.period}</span>
              <span className="text-forest-green font-bold">${item.revenue.toLocaleString()}</span>
            </div>
            <div className="w-full bg-stone-gray/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-forest-green to-equipment-yellow h-2 rounded-full transition-all duration-300"
                style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-stone-gray">
              <span>{item.orders} orders</span>
              <span>{item.conversionRate}% conversion</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
