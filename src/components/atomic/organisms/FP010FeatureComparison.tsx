import { Check, X } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { FP010FeatureButton } from '@/components/atomic/atoms/FP010FeatureButton';

/**
 * FP010FeatureComparison - Feature Comparison Table Organism
 *
 * Translation-first comparison table showcasing CreatorFlow vs. generic solutions.
 * Server-rendered with full i18n support and responsive design.
 *
 * Features:
 * - Side-by-side comparison table
 * - Visual indicators (check/x icons)
 * - Responsive mobile-friendly layout
 * - Call-to-action integration
 */
export async function FP010FeatureComparison() {
  const t = await getTranslations('components.atomic.organisms.FP010FeatureComparison');

  const categories = [
    'tiktokIntegration',
    'processingSpeed',
    'viralHandling',
    'creatorTools',
    'automation',
    'support',
  ] as const;

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto mb-16 max-w-4xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl'>{t('title')}</h2>
        <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground'>{t('subtitle')}</p>
      </div>

      {/* Comparison Table */}
      <div className='mx-auto max-w-4xl'>
        {/* Desktop Table */}
        <div className='hidden overflow-hidden rounded-executive border border-border/20 md:block'>
          <table className='w-full bg-card'>
            <thead>
              <tr className='border-b border-border/20 bg-muted/20'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-muted-foreground'>Feature</th>
                <th className='px-6 py-4 text-center text-sm font-semibold text-brand-teal-primary'>
                  {t('creatorflow.name')}
                </th>
                <th className='px-6 py-4 text-center text-sm font-semibold text-muted-foreground'>
                  {t('competitors.name')}
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-border/20'>
              {categories.map((category) => (
                <tr key={category} className='transition-colors hover:bg-muted/10'>
                  <td className='px-6 py-4 text-sm font-medium text-foreground'>{t(`categories.${category}`)}</td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <Check className='text-success-emerald-500 h-4 w-4' />
                      <span className='text-sm text-foreground'>{t(`creatorflow.${category}`)}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <X className='h-4 w-4 text-destructive' />
                      <span className='text-sm text-muted-foreground'>{t(`competitors.${category}`)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className='space-y-6 md:hidden'>
          {categories.map((category) => (
            <div key={category} className='rounded-executive border border-border/20 bg-card p-6'>
              <h3 className='mb-4 text-lg font-semibold text-foreground'>{t(`categories.${category}`)}</h3>

              <div className='space-y-4'>
                {/* CreatorFlow */}
                <div className='flex items-start gap-3'>
                  <Check className='text-success-emerald-500 mt-0.5 h-5 w-5' />
                  <div>
                    <div className='text-sm font-medium text-brand-teal-primary'>{t('creatorflow.name')}</div>
                    <div className='mt-1 text-sm text-foreground'>{t(`creatorflow.${category}`)}</div>
                  </div>
                </div>

                {/* Competitors */}
                <div className='flex items-start gap-3'>
                  <X className='mt-0.5 h-5 w-5 text-destructive' />
                  <div>
                    <div className='text-sm font-medium text-muted-foreground'>{t('competitors.name')}</div>
                    <div className='mt-1 text-sm text-muted-foreground'>{t(`competitors.${category}`)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className='mt-12 text-center'>
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link href='/pricing'>
              <FP010FeatureButton variant='primary' size='lg'>
                {t('actions.startTrial')}
              </FP010FeatureButton>
            </Link>
            <Link href='/features'>
              <FP010FeatureButton variant='secondary' size='lg'>
                {t('actions.compareFeatures')}
              </FP010FeatureButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
