import { getTranslations } from 'next-intl/server';

import { FP010FeatureCard } from '@/components/atomic/molecules/FP010FeatureCard';

/**
 * FP010FeatureGrid - Features Grid Organism
 *
 * Translation-first organism showcasing all CreatorFlow features in a responsive grid.
 * Server-rendered with full i18n support and proper theme integration.
 *
 * Features:
 * - 6 core CreatorFlow features with detailed descriptions
 * - Benefits lists and metrics for each feature
 * - Responsive grid layout
 * - Icon-based visual hierarchy
 */
export async function FP010FeatureGrid() {
  const t = await getTranslations('components.atomic.organisms.FP010FeatureGrid');

  const features = [
    {
      iconName: 'zap',
      title: t('features.orderAutomation.title'),
      description: t('features.orderAutomation.description'),
      benefits: [
        t('features.orderAutomation.benefits.0'),
        t('features.orderAutomation.benefits.1'),
        t('features.orderAutomation.benefits.2'),
        t('features.orderAutomation.benefits.3'),
      ],
      metrics: [t('features.orderAutomation.metrics.speed'), t('features.orderAutomation.metrics.accuracy')],
      color: 'text-warning-amber-500',
      bgColor: 'bg-warning-amber-500/10',
    },
    {
      iconName: 'truck',
      title: t('features.shippingIntelligence.title'),
      description: t('features.shippingIntelligence.description'),
      benefits: [
        t('features.shippingIntelligence.benefits.0'),
        t('features.shippingIntelligence.benefits.1'),
        t('features.shippingIntelligence.benefits.2'),
        t('features.shippingIntelligence.benefits.3'),
      ],
      metrics: [t('features.shippingIntelligence.metrics.savings'), t('features.shippingIntelligence.metrics.speed')],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      iconName: 'chart-column',
      title: t('features.analyticsDashboard.title'),
      description: t('features.analyticsDashboard.description'),
      benefits: [
        t('features.analyticsDashboard.benefits.0'),
        t('features.analyticsDashboard.benefits.1'),
        t('features.analyticsDashboard.benefits.2'),
        t('features.analyticsDashboard.benefits.3'),
      ],
      metrics: [t('features.analyticsDashboard.metrics.visibility'), t('features.analyticsDashboard.metrics.insights')],
      color: 'text-brand-teal-primary',
      bgColor: 'bg-brand-teal-primary/10',
    },
    {
      iconName: 'smartphone',
      title: t('features.tiktokIntegration.title'),
      description: t('features.tiktokIntegration.description'),
      benefits: [
        t('features.tiktokIntegration.benefits.0'),
        t('features.tiktokIntegration.benefits.1'),
        t('features.tiktokIntegration.benefits.2'),
        t('features.tiktokIntegration.benefits.3'),
      ],
      metrics: [t('features.tiktokIntegration.metrics.sync'), t('features.tiktokIntegration.metrics.uptime')],
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      iconName: 'settings',
      title: t('features.scalingTools.title'),
      description: t('features.scalingTools.description'),
      benefits: [
        t('features.scalingTools.benefits.0'),
        t('features.scalingTools.benefits.1'),
        t('features.scalingTools.benefits.2'),
        t('features.scalingTools.benefits.3'),
      ],
      metrics: [t('features.scalingTools.metrics.scale'), t('features.scalingTools.metrics.efficiency')],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      iconName: 'package',
      title: t('features.inventoryManagement.title'),
      description: t('features.inventoryManagement.description'),
      benefits: [
        t('features.inventoryManagement.benefits.0'),
        t('features.inventoryManagement.benefits.1'),
        t('features.inventoryManagement.benefits.2'),
        t('features.inventoryManagement.benefits.3'),
      ],
      metrics: [
        t('features.inventoryManagement.metrics.accuracy'),
        t('features.inventoryManagement.metrics.prevention'),
      ],
      color: 'text-success-emerald-500',
      bgColor: 'bg-success-emerald-500/10',
    },
  ];

  return (
    <div id='features-grid' className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto mb-16 max-w-4xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>{t('title')}</h2>
        <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground'>{t('subtitle')}</p>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {features.map((feature, index) => (
          <FP010FeatureCard
            key={index}
            iconName={feature.iconName}
            title={feature.title}
            description={feature.description}
            benefits={feature.benefits}
            metrics={feature.metrics}
            color={feature.color}
            bgColor={feature.bgColor}
          />
        ))}
      </div>
    </div>
  );
}
