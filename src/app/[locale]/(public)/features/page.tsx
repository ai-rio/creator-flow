import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { FP010FeaturesPage } from '@/components/atomic/compositions/FP010FeaturesPage';
import { generateLocaleParams } from '@/lib/i18n/static-generation';

// Generate static parameters for all locales
export function generateStaticParams() {
  return generateLocaleParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'components.atomic.compositions.FP010FeaturesPage.metadata',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: '/features',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      languages: {
        en: '/en/features',
        es: '/es/features',
        'pt-br': '/pt-br/features',
      },
    },
  };
}

/**
 * CreatorFlow Features Page - Complete TikTok Shop Automation Suite
 *
 * Features:
 * - Translation-first implementation with next-intl
 * - Server-side rendered with optimized performance
 * - Comprehensive feature showcase for creators
 * - Mobile-responsive atomic design components
 * - SEO optimized with proper metadata
 */
export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering and set the locale
  setRequestLocale(locale);

  return (
    <div className='min-h-screen bg-background'>
      <FP010FeaturesPage />
    </div>
  );
}
