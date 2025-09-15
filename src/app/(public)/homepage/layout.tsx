/**
 * Homepage Layout - CreatorFlow Three.js Integration
 *
 * Server component layout that provides metadata for the homepage
 * while allowing the page component to be a client component.
 *
 * @author CreatorFlow Team
 * @version 1.0.0
 */

import type { Metadata } from 'next';

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
    description: "The only platform that keeps up with TikTok's pace",
  },
};

export default function HomepageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
