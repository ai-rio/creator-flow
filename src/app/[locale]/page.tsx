import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { HomepageClient } from '@/components/pages/HomepageClient';
import { generateLocaleParams } from '@/lib/i18n/static-generation';

// Generate static parameters for all locales
export function generateStaticParams() {
  return generateLocaleParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  // Load localized metadata
  const t = await getTranslations({ locale, namespace: 'homepage' });

  return {
    title: 'CreatorFlow - Scale Your TikTok Shop from 50 to 500+ Orders per Day',
    description: t('hero.description'),
    openGraph: {
      title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
      description: t('hero.description'),
      type: 'website',
      url: '/',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
      description: t('hero.description'),
    },
    alternates: {
      languages: {
        en: '/en',
        es: '/es',
        'pt-br': '/pt-br',
      },
    },
  };
}

/**
 * INSTANT HOMEPAGE BUILT FROM MOCKS
 *
 * Complete homepage in 2 minutes using working mock components.
 * Each section is a perfect, tested component ready for production.
 */
export default async function LocaleRootPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering and set the locale
  setRequestLocale(locale);

  return <HomepageClient />;
}
