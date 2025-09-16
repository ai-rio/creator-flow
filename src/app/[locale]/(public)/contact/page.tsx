import type { Metadata } from 'next';

// Bento grid contact page import
import { BentoContactPage } from '@/components/atomic/compositions/pages/BentoContactPage';

export const metadata: Metadata = {
  title: 'Contact CreatorFlow - Get Help with TikTok Shop Automation',
  description:
    'Get in touch with our team for support, partnerships, or general inquiries. We&apos;re here to help you scale your TikTok Shop.',
  openGraph: {
    title: 'Contact CreatorFlow - TikTok Shop Automation Support',
    description: 'Need help with your TikTok Shop automation? Our team of creator economy experts is here to help.',
    type: 'website',
    url: '/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact CreatorFlow',
    description: 'Get help with your TikTok Shop automation',
  },
};

/**
 * CreatorFlow Contact Page with Enhanced Bento Grid Layout
 *
 * Features:
 * - Mobile-first responsive contact form
 * - Multiple contact methods
 * - Support information and FAQ links
 * - Office location and company info
 * - SEO-optimized with structured data
 */
export default function ContactPage() {
  return <BentoContactPage className='relative' />;
}
