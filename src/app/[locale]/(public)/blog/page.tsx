import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { SimpleBlogPage } from '@/components/atomic/compositions/pages/SimpleBlogPage';
import { generateLocaleParams } from '@/lib/i18n/static-generation';

export function generateStaticParams() {
  return generateLocaleParams();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      type: 'website',
      url: '/blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description'),
    },
  };
}

export default function BlogPage() {
  return <SimpleBlogPage />;
}
