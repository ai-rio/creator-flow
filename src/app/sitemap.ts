import { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';

const baseUrl = 'https://creatorflow.com';

// Define all the pages in your application
const pages = [
  '', // homepage
  'features',
  'pricing',
  'about',
  'contact',
  'privacy',
  'terms',
  'login',
  'signup',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each page in each locale
  for (const page of pages) {
    for (const locale of routing.locales) {
      const url = page ? `${baseUrl}/${locale}/${page}` : `${baseUrl}/${locale}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: getChangeFrequency(page),
        priority: getPriority(page),
        alternates: {
          languages: generateAlternateUrls(page),
        },
      });
    }
  }

  return sitemapEntries;
}

function getChangeFrequency(page: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  switch (page) {
    case '': // homepage
      return 'weekly';
    case 'features':
    case 'pricing':
      return 'monthly';
    case 'about':
    case 'contact':
      return 'yearly';
    case 'privacy':
    case 'terms':
      return 'yearly';
    case 'login':
    case 'signup':
      return 'monthly';
    default:
      return 'monthly';
  }
}

function getPriority(page: string): number {
  switch (page) {
    case '': // homepage
      return 1.0;
    case 'features':
    case 'pricing':
      return 0.9;
    case 'about':
    case 'contact':
      return 0.7;
    case 'login':
    case 'signup':
      return 0.6;
    case 'privacy':
    case 'terms':
      return 0.3;
    default:
      return 0.5;
  }
}

function generateAlternateUrls(page: string): Record<string, string> {
  const alternates: Record<string, string> = {};

  routing.locales.forEach((locale) => {
    const url = page ? `${baseUrl}/${locale}/${page}` : `${baseUrl}/${locale}`;

    alternates[locale] = url;
  });

  // Add x-default
  alternates['x-default'] = page ? `${baseUrl}/en/${page}` : `${baseUrl}/en`;

  return alternates;
}
