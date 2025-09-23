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
 * Translation-first organism component showcasing CreatorFlow's scaling transformation story.
 * Updated to focus on the 50-500 orders scaling challenge and creator journey narrative.
 * Server-rendered with full i18n support and CreatorFlow theme integration.
 *
 * Features:
 * - Scaling challenge focused messaging (50→500+ orders)
 * - Creator journey metrics and pain points
 * - Call-to-action buttons with narrative progression
 * - CreatorFlow brand theming with scaling emphasis
 */
export async function FP010FeatureHero() {
  const t = await getTranslations('components.atomic.organisms.FP010FeatureHero');

  const scalingStats = [
    {
      iconName: 'trending-up',
      label: t('stats.scalingTransformation'),
      value: t('stats.scalingTransformationValue'),
      color: 'text-brand-teal-primary',
      subtitle: t('stats.scalingTransformationSubtitle'),
    },
    {
      iconName: 'zap',
      label: t('stats.automationSpeed'),
      value: t('stats.automationSpeedValue'),
      color: 'text-warning-amber-500',
      subtitle: t('stats.automationSpeedSubtitle'),
    },
    {
      iconName: 'shield-check',
      label: t('stats.creatorSuccess'),
      value: t('stats.creatorSuccessValue'),
      color: 'text-success-emerald-500',
      subtitle: t('stats.creatorSuccessSubtitle'),
    },
  ];

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl text-center'>
        {/* Badge */}
        <div className='mb-8 flex justify-center'>
          <FP010FeatureBadge variant='trending' />
        </div>

        {/* Main heading - Updated for scaling focus */}
        <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl'>{t('title')}</h1>

        {/* Subtitle - Scaling challenge emphasis */}
        <div className='mt-6'>
          <p className='text-xl font-medium text-primary'>{t('subtitle')}</p>
        </div>

        {/* Description - Creator journey narrative */}
        <p className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground'>{t('description')}</p>

        {/* Scaling Journey Indicator */}
        <div className='mt-8 flex items-center justify-center space-x-4 text-sm text-muted-foreground'>
          <span className='rounded-full bg-red-100 px-3 py-1 text-red-700 dark:bg-red-900 dark:text-red-300'>
            {t('journey.problem')}
          </span>
          <span className='text-2xl'>→</span>
          <span className='rounded-full bg-yellow-100 px-3 py-1 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'>
            {t('journey.scaling')}
          </span>
          <span className='text-2xl'>→</span>
          <span className='rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-900 dark:text-green-300'>
            {t('journey.success')}
          </span>
        </div>

        {/* Scaling Stats Grid */}
        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3'>
          {scalingStats.map((stat, index) => (
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
              <div className='mb-1 text-sm font-medium text-muted-foreground'>{stat.label}</div>
              <div className='text-xs text-muted-foreground/70'>{stat.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Buttons - Journey focused */}
        <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Link href='#scaling-challenges'>
            <FP010FeatureButton variant='primary' size='lg'>
              {t('actions.seeScalingChallenges')}
            </FP010FeatureButton>
          </Link>
          <Link href='/pricing'>
            <FP010FeatureButton variant='secondary' size='lg'>
              {t('actions.startScalingJourney')}
            </FP010FeatureButton>
          </Link>
        </div>

        {/* Creator testimonial hint */}
        <div className='mt-8 text-center'>
          <p className='text-sm italic text-muted-foreground'>{t('testimonial.preview')}</p>
        </div>

        {/* Visual enhancement - gradient background with scaling theme */}
        <div className='absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5' />
      </div>
    </div>
  );
}
