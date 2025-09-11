'use client';

import React from 'react';

// Component imports
import { BusinessSymphony } from './MC-BusinessSymphony';
import { IntelligenceBriefing } from './MC-IntelligenceBriefing';
import { LiberationOrchestra } from './MC-LiberationOrchestra';
import { StrategicCommand } from './MC-StrategicCommand';

// ==================== MOCK DATA ====================

const mockBusinessStats = {
  revenue: 12847,
  revenueTrend: [5, 10, 20, 40, 30, 60, 75, 90],
  unitsSold: 1247,
  autoFulfilledPercent: 98,
  unitsShipped: 347,
  shippingSavings: 1200,
  topVideo: { id: 'xyz789', orders: 2300 },
};

const mockStrategicAlerts = [
  { id: 1, type: 'critical' as any, text: 'Low stock on "Viral Tee"', source: 'Inventory' },
  { id: 2, type: 'insight' as any, text: 'Viral spike: Scale inventory?', source: 'TikTok' },
  { id: 3, type: 'operational' as any, text: 'Carrier issue: UPS delayed', source: 'Shipping' },
];

const mockAutomationStats = {
  hoursSaved: 47,
  tasksAutomated: 89,
  flowHealth: 96,
};

const mockIntelligenceInsights = [
  {
    id: 1,
    type: 'performance' as any,
    title: 'Content ROI: $247/video avg',
    subtitle: 'Focus on short-form unboxing videos.',
  },
  {
    id: 2,
    type: 'trend' as any,
    title: 'Growth: 340%/yr sustainable',
    subtitle: 'Based on current supply chain capacity.',
  },
  {
    id: 3,
    type: 'ai' as any,
    title: 'Next: EU expansion ready',
    subtitle: 'AI recommends targeting Germany & France.',
  },
];

// ==================== MAIN COMPONENT ====================

/**
 * Demo component showcasing all extracted mobile dashboard cards
 * Displays the four main dashboard components with mock data
 */
export function MobileDashboardDemo() {
  return (
    <div className='space-y-4 p-4'>
      <div className='mb-6'>
        <h1 className='mb-2 text-2xl font-bold text-foreground'>Mobile Dashboard Components</h1>
        <p className='text-muted-foreground'>
          Extracted mobile dashboard cards with glass morphism design and smooth animations
        </p>
      </div>

      <BusinessSymphony stats={mockBusinessStats} delay={0.2} />

      <StrategicCommand
        alerts={mockStrategicAlerts}
        onAutoScale={() => console.log('Auto-scale triggered')}
        onManual={() => console.log('Manual mode triggered')}
        delay={0.4}
      />

      <LiberationOrchestra
        stats={mockAutomationStats}
        onViewOrchestra={() => console.log('View Orchestra triggered')}
        onOptimize={() => console.log('Optimize triggered')}
        delay={0.6}
      />

      <IntelligenceBriefing
        insights={mockIntelligenceInsights}
        onStrategicDashboard={() => console.log('Strategic Dashboard triggered')}
        onExport={() => console.log('Export triggered')}
        delay={0.8}
      />
    </div>
  );
}

export default MobileDashboardDemo;
