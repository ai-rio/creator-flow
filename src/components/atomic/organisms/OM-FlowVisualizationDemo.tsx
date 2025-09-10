/* eslint-disable */
'use client';

import { Bot, Inbox, Package, PackageCheck } from 'lucide-react';
import React from 'react';

import { FlowVisualization, FlowStage, FlowMetric } from './OM-FlowVisualization';

export default function FlowVisualizationDemo(): React.JSX.Element {
  const flowStages: FlowStage[] = [
    {
      name: 'RECEIVED',
      value: 47,
      Icon: Inbox,
      color: 'text-blue-500',
    },
    {
      name: 'PROCESS',
      value: 127,
      Icon: Bot,
      color: 'text-brand-teal-primary',
      automated: true,
    },
    {
      name: 'SHIPPED',
      value: 89,
      Icon: Package,
      color: 'text-brand-purple-primary',
    },
    {
      name: 'DELIVERED',
      value: 156,
      Icon: PackageCheck,
      color: 'text-green-500',
    },
  ];

  const flowMetrics: FlowMetric[] = [
    {
      title: '🎭 Stress Eliminated',
      percentage: 89,
    },
    {
      title: '⏱️ Time Liberation',
      beforeValue: '15min',
      afterValue: '2min',
      description: 'per order',
    },
  ];

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='w-full max-w-4xl space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Flow Visualization Demo</h1>
          <p className='text-body-lg text-muted-foreground'>Animated order flow with progress tracking and metrics</p>
        </div>

        <FlowVisualization
          title='TikTok Shop Order Flow'
          subtitle='Your entire operation, automated and clarified.'
          stages={flowStages}
          metrics={flowMetrics}
        />

        <div className='rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-body-md text-muted-foreground'>
            <li>• Animated flow line with moving indicator</li>
            <li>• Customizable stages with icons and values</li>
            <li>• Progress bars with gradient animations</li>
            <li>• Automated stage indicators</li>
            <li>• Flexible metrics display</li>
            <li>• Staggered entrance animations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
