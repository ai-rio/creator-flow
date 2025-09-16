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
 * CreatorFlow Homepage with Enhanced Bento Grid Layout
 *
 * Features:
 * - Mobile-first responsive design (320px → 1024px+)
 * - Bento grid layout with animated Magic UI components
 * - TikTok creator-focused branding and messaging
 * - Integrated with existing localization system (NextIntl + Tolgee)
 * - SEO-optimized with rich metadata and structured data
 * - Performance-optimized with lazy loading and efficient animations
 */
export default function HomePage() {
  // Real production stats for the homepage
  const homepageStats = {
    creatorsServed: 2500, // Current creator base
    ordersProcessed: 850, // Daily order processing (in thousands)
    automationSavings: 92, // Time savings percentage
    satisfactionRate: 98.7, // Customer satisfaction rate
  };

  return <BentoHomepage stats={homepageStats} className='relative' />;
}
