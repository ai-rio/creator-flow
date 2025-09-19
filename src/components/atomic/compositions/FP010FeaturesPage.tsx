import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { FP010FeatureComparison } from '@/components/atomic/organisms/FP010FeatureComparison';
import { FP010FeatureGrid } from '@/components/atomic/organisms/FP010FeatureGrid';
import { FP010FeatureHero } from '@/components/atomic/organisms/FP010FeatureHero';
import FP020OrderManagement from '@/components/atomic/organisms/FP020OrderManagement';
import { FP030DigitalTwinCommand } from '@/components/atomic/organisms/FP030DigitalTwinCommand';
import { FP050DataPrism } from '@/components/atomic/organisms/FP050DataPrism';

/**
 * FP010FeaturesPage - Complete Features Page Composition
 *
 * Translation-first atomic composition following the Migration-First strategy.
 * Server-rendered with optimal performance and full i18n support.
 *
 * Structure:
 * - Hero Section (FP010FeatureHero)
 * - Features Grid (FP010FeatureGrid)
 * - Digital Twin Command Center (FP030DigitalTwinCommand)
 * - Interactive Order Management Demo (FP020OrderManagement)
 * - Data Analytics Prism (FP050DataPrism)
 * - Feature Comparison (FP010FeatureComparison)
 * - Call-to-Action Section
 * - Breadcrumbs navigation
 */
export async function FP010FeaturesPage() {
  const t = await getTranslations('components.atomic.compositions.FP010FeaturesPage');

  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      {/* Breadcrumbs */}
      <div className='border-b border-border/20 bg-background/95 backdrop-blur-sm'>
        <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
          <nav className='flex items-center space-x-2 text-sm text-muted-foreground'>
            <Link href='/' className='transition-colors hover:text-foreground'>
              {t('breadcrumbs.home')}
            </Link>
            <span>/</span>
            <span className='font-medium text-foreground'>{t('breadcrumbs.features')}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className='relative py-16 sm:py-24'>
        <FP010FeatureHero />
      </section>

      {/* Features Grid */}
      <section className='relative bg-muted/20 py-16 sm:py-24'>
        <FP010FeatureGrid />
      </section>

      {/* Digital Twin Command Center */}
      <section className='relative bg-gradient-to-br from-background via-muted/10 to-background py-16 sm:py-24'>
        <FP030DigitalTwinCommand />
      </section>

      {/* Interactive Order Management Demo */}
      <section className='relative bg-gradient-to-br from-bg-dark-primary to-bg-dark-secondary py-16 sm:py-24'>
        <FP020OrderManagement className='mx-auto max-w-7xl' initialOrderCount={30} theme='dark' />
      </section>

      {/* Data Analytics Prism */}
      <section className='relative bg-gradient-to-br from-primary/5 via-background to-muted/10 py-16 sm:py-24'>
        <FP050DataPrism />
      </section>

      {/* Feature Comparison */}
      <section className='relative py-16 sm:py-24'>
        <FP010FeatureComparison />
      </section>

      {/* Call-to-Action Section */}
      <section className='relative bg-primary/5 py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
              {t('cta.title')}
            </h2>
            <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground'>{t('cta.description')}</p>

            <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <Link
                href='/pricing'
                className='w-full rounded-premium bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto'
              >
                {t('cta.actions.startFreeTrial')}
              </Link>
              <Link
                href='/contact'
                className='w-full rounded-premium border border-border bg-background px-8 py-4 text-lg font-semibold text-foreground transition-all duration-200 hover:scale-105 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto'
              >
                {t('cta.actions.scheduleDemo')}
              </Link>
              <Link
                href='/pricing'
                className='w-full text-lg font-medium text-primary transition-colors hover:text-primary/80 sm:w-auto'
              >
                {t('cta.actions.pricing')} →
              </Link>
            </div>

            <p className='mt-6 text-sm text-muted-foreground'>{t('cta.guarantee')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
