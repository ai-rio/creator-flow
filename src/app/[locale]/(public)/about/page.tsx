import type { Metadata } from 'next';

// Simple about page import
import { SimpleAboutPage } from '@/components/atomic/compositions/pages/SimpleAboutPage';

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
 * CreatorFlow About Page with Simple Layout
 *
 * Features:
 * - Mobile-first responsive design
 * - Full-width AP010Hero component
 * - Clean, minimal layout
 * - SEO-optimized with structured data
 */
export default function AboutPage() {
  return <SimpleAboutPage />;
}
