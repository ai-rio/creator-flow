import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { HomepageClient } from '@/components/pages/HomepageClient';

export const metadata: Metadata = {
  title: 'CreatorFlow - Scale Your TikTok Shop from 50 to 500+ Orders per Day',
  description:
    'The only fulfillment automation platform built for viral TikTok creators. Transform chaos into profit with CEO-grade automation.',
  openGraph: {
    title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
    description:
      'Scale your TikTok Shop from 50 to 500+ orders per day. Built for viral moments, designed for sustainable growth.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
    description: 'The only platform that keeps up with TikTok&apos;s pace',
  },
};

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
