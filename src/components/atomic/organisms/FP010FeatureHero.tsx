import { ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { FP010FeatureBadge } from '@/components/atomic/atoms/FP010FeatureBadge';
import { FP010FeatureButton } from '@/components/atomic/atoms/FP010FeatureButton';

// Icon rendering function
const renderIcon = (iconName: string, className?: string) => {
  const iconProps = { className };
  switch (iconName) {
    case 'trending-up':
      return <TrendingUp {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'shield-check':
      return <ShieldCheck {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
};

/**
 * FP010FeatureHero - Main Features Page Hero Section
 *
 * Translation-first organism component showcasing CreatorFlow's core value proposition.
 * Server-rendered with full i18n support and CreatorFlow theme integration.
 *
 * Features:
 * - Hero title and description with translations
 * - Key metrics display with animated counters
 * - Call-to-action buttons
 * - CreatorFlow brand theming
 */
export async function FP010FeatureHero() {
  const t = await getTranslations('components.atomic.organisms.FP010FeatureHero');

  const stats = [
    {
      iconName: 'trending-up',
      label: t('stats.automatedOrders'),
      value: t('stats.automatedOrdersValue'),
      color: 'text-brand-teal-primary',
    },
    {
      iconName: 'zap',
      label: t('stats.timesSaved'),
      value: t('stats.timesSavedValue'),
      color: 'text-warning-amber-500',
    },
    {
      iconName: 'shield-check',
      label: t('stats.accuracyRate'),
      value: t('stats.accuracyRateValue'),
      color: 'text-success-emerald-500',
    },
  ];

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl text-center'>
        {/* Badge */}
        <div className='mb-8 flex justify-center'>
          <FP010FeatureBadge variant='trending' />
        </div>

        {/* Main heading */}
        <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl'>{t('title')}</h1>

        {/* Subtitle */}
        <div className='mt-6'>
          <p className='text-xl font-medium text-primary'>{t('subtitle')}</p>
        </div>

        {/* Description */}
        <p className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground'>{t('description')}</p>

        {/* Stats Grid */}
        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='rounded-executive border border-border/20 bg-card p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg'
            >
              <div className='mb-4 flex justify-center'>
                <div className={`rounded-premium bg-muted p-3 ${stat.color}`}>
                  {renderIcon(stat.iconName, 'h-6 w-6')}
                </div>
              </div>
              <div className='mb-2 text-3xl font-bold text-foreground'>{stat.value}</div>
              <div className='text-sm text-muted-foreground'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Buttons */}
        <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Link href='#features-grid'>
            <FP010FeatureButton variant='primary' size='lg'>
              {t('actions.exploreFeatures')}
            </FP010FeatureButton>
          </Link>
          <Link href='/pricing'>
            <FP010FeatureButton variant='secondary' size='lg'>
              {t('actions.startFreeTrial')}
            </FP010FeatureButton>
          </Link>
        </div>

        {/* Visual enhancement - gradient background */}
        <div className='absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5' />
      </div>
    </div>
  );
}
