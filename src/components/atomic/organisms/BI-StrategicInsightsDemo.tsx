/* eslint-disable */
'use client';

import { Bot, Eye, ShieldCheck, TrendingUp, Trophy } from 'lucide-react';
import React from 'react';

import { StrategicInsights, Insight, AIRecommendation } from './BI-StrategicInsights';

export default function StrategicInsightsDemo(): React.JSX.Element {
  const insightsData: Insight[] = [
    {
      Icon: Trophy,
      text: 'Top Performing Creator: ',
      highlight: '@viral_creator (+$12k this week)',
      color: 'text-yellow-500',
    },
    {
      Icon: ShieldCheck,
      text: 'Automation ROI: ',
      highlight: '$4,567 saved in labor costs',
      color: 'text-primary',
      isHeartbeat: true,
    },
    {
      Icon: TrendingUp,
      text: 'Growth Opportunity: ',
      highlight: 'Phone grips trending (+67% demand)',
      color: 'text-primary',
    },
    {
      Icon: Eye,
      text: 'Market Intelligence: ',
      highlight: 'Competitors struggling with fulfillment',
      color: 'text-primary',
    },
  ];

  const aiRecommendation: AIRecommendation = {
    Icon: Bot,
    text: 'AI Recommendation: ',
    highlight: 'Scale phone grip inventory by 200%',
    color: 'text-primary',
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='w-full max-w-2xl space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Strategic Insights Demo</h1>
          <p className='text-body-lg text-muted-foreground'>AI-powered business intelligence with orbital animations</p>
        </div>

        <StrategicInsights
          title='CEO Strategic Insights'
          subtitle='Your automated competitive edge.'
          insights={insightsData}
          aiRecommendation={aiRecommendation}
          headerIcon={Trophy}
        />

        <div className='rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-body-md text-muted-foreground'>
            <li>• Orbital floating animations with continuous motion</li>
            <li>• Heartbeat effect for critical metrics</li>
            <li>• Staggered entrance animations</li>
            <li>• Configurable insights with icons and highlights</li>
            <li>• AI recommendation section with delayed reveal</li>
            <li>• Header icon with periodic rotation animation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
