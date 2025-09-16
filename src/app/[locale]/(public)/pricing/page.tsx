import type { Metadata } from 'next';

// Bento grid pricing page import
import { BentoPricingPage } from '@/components/atomic/compositions/pages/BentoPricingPage';

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
 * CreatorFlow Pricing Page with Enhanced Bento Grid Layout
 *
 * Features:
 * - Mobile-first responsive pricing tables
 * - Bento grid layout with animated components
 * - Currency localization support
 * - Stripe integration preview
 * - Feature comparison tables
 * - Conversion-optimized design
 * - SEO-optimized with structured data
 */
export default function PricingPage() {
  return <BentoPricingPage className='relative' />;
}
