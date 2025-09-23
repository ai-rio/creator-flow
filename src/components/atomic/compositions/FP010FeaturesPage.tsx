import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import {
  FP010FeatureComparison,
  FP010FeatureGrid,
  FP010FeatureHero,
  FP010ScalingChallenges,
  FP020OrderManagement,
  FP030DigitalTwinCommand,
  FP050DataPrism,
} from '@/components/atomic/organisms';

/**
 * FP010FeaturesPage - Complete Features Page Composition
 *
 * Translation-first atomic composition following the Creator Journey narrative strategy.
 * Restructured to create a cohesive storytelling experience from scaling challenges
 * to automation success. Server-rendered with optimal performance and full i18n support.
 *
 * New Structure (Creator Journey Narrative):
 * 1. Enhanced Hero (scaling challenge focus)
 * 2. **NEW** Scaling Challenges (replace TargetAcquisition)
 * 3. Solution Overview (FP010FeatureGrid)
 * 4. Core Process Demo (FP020OrderManagement)
 * 5. Advanced Capabilities (FP030DigitalTwinCommand)
 * 6. Results & Analytics (FP050DataPrism)
 * 7. Competitive Advantage (FP010FeatureComparison)
 * 8. Enhanced CTA with scaling focus
 * 9. Breadcrumbs navigation
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

      {/* 1. Enhanced Hero Section - Scaling Challenge Focus */}
      <section className='relative py-16 sm:py-24'>
        <FP010FeatureHero />
      </section>

      {/* Narrative Transition: From Promise to Problem */}
      <section className='relative bg-gradient-to-br from-muted/5 via-background to-muted/10 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-2xl font-bold text-foreground'>{t('transitions.fromPromiseToProblem.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('transitions.fromPromiseToProblem.description')}</p>
          </div>
        </div>
      </section>

      {/* 2. NEW Scaling Challenges Section - Creator Pain Points */}
      <section
        id='scaling-challenges'
        className='relative bg-gradient-to-br from-red-50/20 via-background to-orange-50/20 py-16 sm:py-24'
      >
        <FP010ScalingChallenges />
      </section>

      {/* Narrative Transition: From Problem to Solution */}
      <section className='relative bg-gradient-to-br from-muted/10 via-background to-primary/5 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-2xl font-bold text-foreground'>{t('transitions.fromProblemToSolution.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('transitions.fromProblemToSolution.description')}</p>
            <div className='mt-6 flex items-center justify-center space-x-4'>
              <span className='text-4xl'>⚡</span>
              <span className='text-lg font-medium text-primary'>{t('transitions.fromProblemToSolution.tagline')}</span>
              <span className='text-4xl'>⚡</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Overview - Complete Feature Suite */}
      <section
        id='features-grid'
        className='relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 sm:py-24'
      >
        <FP010FeatureGrid />
      </section>

      {/* Narrative Transition: From Overview to Process */}
      <section className='relative bg-gradient-to-br from-muted/5 via-background to-muted/10 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-2xl font-bold text-foreground'>{t('transitions.fromOverviewToProcess.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('transitions.fromOverviewToProcess.description')}</p>
          </div>
        </div>
      </section>

      {/* 4. Core Process Demo - Order Management in Action */}
      <section className='relative bg-gradient-to-br from-muted/10 via-background to-muted/5 py-16 sm:py-24'>
        <FP020OrderManagement className='mx-auto max-w-7xl' initialOrderCount={50} />
      </section>

      {/* Narrative Transition: From Process to Advanced */}
      <section className='relative bg-gradient-to-br from-muted/10 via-background to-primary/5 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-2xl font-bold text-foreground'>{t('transitions.fromProcessToAdvanced.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('transitions.fromProcessToAdvanced.description')}</p>
          </div>
        </div>
      </section>

      {/* 5. Advanced Capabilities - Digital Twin Command Center */}
      <section className='relative bg-gradient-to-br from-background via-muted/10 to-background py-16 sm:py-24'>
        <FP030DigitalTwinCommand />
      </section>

      {/* Narrative Transition: From Advanced to Results */}
      <section className='relative bg-gradient-to-br from-muted/5 via-background to-muted/10 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-2xl font-bold text-foreground'>{t('transitions.fromAdvancedToResults.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('transitions.fromAdvancedToResults.description')}</p>
          </div>
        </div>
      </section>

      {/* 6. Results & Analytics - Data-Driven Growth */}
      <section className='relative bg-gradient-to-br from-primary/5 via-background to-muted/10 py-16 sm:py-24'>
        <FP050DataPrism />
      </section>

      {/* Narrative Transition: From Results to Choice */}
      <section className='relative bg-gradient-to-br from-muted/10 via-background to-primary/5 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-2xl font-bold text-foreground'>{t('transitions.fromResultsToChoice.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('transitions.fromResultsToChoice.description')}</p>
          </div>
        </div>
      </section>

      {/* 7. Competitive Advantage - Why CreatorFlow */}
      <section className='relative py-16 sm:py-24'>
        <FP010FeatureComparison />
      </section>

      {/* Narrative Transition: From Choice to Action */}
      <section className='relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='mb-4 text-2xl font-bold text-foreground'>{t('transitions.fromChoiceToAction.title')}</h2>
            <p className='text-lg text-muted-foreground'>{t('transitions.fromChoiceToAction.description')}</p>
          </div>
        </div>
      </section>

      {/* 8. Enhanced Call-to-Action Section - Scaling Focused */}
      <section className='relative bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>
              {t('cta.scalingTitle')}
            </h2>
            <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground'>
              {t('cta.scalingDescription')}
            </p>

            {/* Scaling Success Metrics */}
            <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <div className='rounded-lg border border-border/20 bg-background/80 p-4 backdrop-blur-sm'>
                <div className='text-2xl font-bold text-green-600'>500+</div>
                <div className='text-sm text-muted-foreground'>{t('cta.metrics.ordersPerDay')}</div>
              </div>
              <div className='rounded-lg border border-border/20 bg-background/80 p-4 backdrop-blur-sm'>
                <div className='text-2xl font-bold text-blue-600'>30sec</div>
                <div className='text-sm text-muted-foreground'>{t('cta.metrics.processingTime')}</div>
              </div>
              <div className='rounded-lg border border-border/20 bg-background/80 p-4 backdrop-blur-sm'>
                <div className='text-2xl font-bold text-purple-600'>99.8%</div>
                <div className='text-sm text-muted-foreground'>{t('cta.metrics.accuracy')}</div>
              </div>
            </div>

            <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <Link
                href='/pricing'
                className='w-full rounded-premium bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto'
              >
                {t('cta.actions.startScalingNow')}
              </Link>
              <Link
                href='/contact'
                className='w-full rounded-premium border border-border bg-background px-8 py-4 text-lg font-semibold text-foreground transition-all duration-200 hover:scale-105 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto'
              >
                {t('cta.actions.scheduleScalingDemo')}
              </Link>
              <Link
                href='/pricing'
                className='w-full text-lg font-medium text-primary transition-colors hover:text-primary/80 sm:w-auto'
              >
                {t('cta.actions.scalingPlans')} →
              </Link>
            </div>

            <p className='mt-6 text-sm text-muted-foreground'>{t('cta.scalingGuarantee')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
