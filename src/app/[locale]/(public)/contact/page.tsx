import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { TP010Contact } from '@/components/atomic/organisms/TP010Contact';
import { generateLocaleParams } from '@/lib/i18n/static-generation';

// Generate static parameters for all locales
export function generateStaticParams() {
  return generateLocaleParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  // Load localized metadata - using existing namespace since contact is nested
  const t = await getTranslations({ locale, namespace: 'homepage' });

  return {
    title: 'Contact CreatorFlow - Get Help with TikTok Shop Automation',
    description:
      "Get in touch with our team for support, partnerships, or general inquiries. We're here to help you scale your TikTok Shop.",
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
    alternates: {
      languages: {
        en: '/en/contact',
        es: '/es/contact',
        'pt-br': '/pt-br/contact',
      },
    },
  };
}

/**
 * CreatorFlow Contact Page
 *
 * Features:
 * - Communication nexus with triage system
 * - Multiple contact methods and forms
 * - Fully localized (EN/ES/PT-BR)
 * - Sophisticated animations with Framer Motion
 * - Integrated with system theme
 */
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering and set the locale
  setRequestLocale(locale);

  return <TP010Contact className='relative' />;
}
