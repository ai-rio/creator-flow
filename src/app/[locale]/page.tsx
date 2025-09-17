import type { Metadata } from 'next';

// Import our new bento homepage system
import { BentoHomepage } from '@/components/atomic/compositions/pages/BentoHomepage';

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
 * Root locale page that serves as the homepage
 *
 * This eliminates the redirect from /en to /en/homepage that was causing routing conflicts.
 * The homepage content is now served directly at /en (or any locale root).
 */
export default function LocaleRootPage({ params }: { params: Promise<{ locale: string }> }) {
  // Real production stats for the homepage
  const homepageStats = {
    creatorsServed: 2500, // Current creator base
    ordersProcessed: 850, // Daily order processing (in thousands)
    automationSavings: 92, // Time savings percentage
    satisfactionRate: 98.7, // Customer satisfaction rate
  };

  return <BentoHomepage stats={homepageStats} className='relative' />;
}
