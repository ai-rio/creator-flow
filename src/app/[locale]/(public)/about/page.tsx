import type { Metadata } from 'next';

// Bento grid about page import
import { BentoAboutPage } from '@/components/atomic/compositions/pages/BentoAboutPage';

export const metadata: Metadata = {
  title: 'About CreatorFlow - Built by Creators, for Creators',
  description:
    'Learn about CreatorFlow&apos;s mission to revolutionize TikTok Shop fulfillment. Meet our team of entrepreneurs who understand the creator economy.',
  openGraph: {
    title: 'About CreatorFlow - TikTok Shop Automation Experts',
    description:
      'Founded by creators who scaled their own shops. Now we&apos;re helping thousands automate their TikTok Shop fulfillment.',
    type: 'website',
    url: '/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CreatorFlow - Creator Economy Automation',
    description: 'Built by creators who understand the viral economy',
  },
};

/**
 * CreatorFlow About Page with Enhanced Bento Grid Layout
 *
 * Features:
 * - Mobile-first responsive design
 * - Team showcase with creator backgrounds
 * - Mission statement and company values
 * - Trust signals and social proof
 * - Company milestones and achievements
 * - SEO-optimized with structured data
 */
export default function AboutPage() {
  return <BentoAboutPage className='relative' />;
}
