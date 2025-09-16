import type { Metadata } from 'next';

import { PricingSection } from '@/features/pricing/components/pricing-section';

export const metadata: Metadata = {
  title: 'CreatorFlow Pricing - Scale Your TikTok Shop Automation',
  description:
    'Simple, transparent pricing for TikTok Shop automation. Start free and scale with usage-based plans designed for viral creators.',
  openGraph: {
    title: 'CreatorFlow Pricing - TikTok Shop Automation Plans',
    description:
      'Compare our pricing plans and find the perfect fit for your TikTok Shop automation needs. Start free, upgrade as you grow.',
    type: 'website',
    url: '/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorFlow Pricing - Scale Your TikTok Shop',
    description: 'Simple pricing plans designed for TikTok creators',
  },
};

/**
 * CreatorFlow Pricing Page with Stripe Integration
 *
 * Features:
 * - Real Stripe checkout integration
 * - Dynamic pricing from database
 * - Functional plan selection
 * - Mobile-responsive design
 */
export default function PricingPage() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-6xl'>Simple, transparent pricing</h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground'>
            Choose the perfect plan for your TikTok Shop automation needs. Start free and scale as you grow.
          </p>
        </div>

        <div className='mt-16'>
          <PricingSection />
        </div>
      </div>
    </div>
  );
}
