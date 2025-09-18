'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { defaultLocale, locales } from '@/lib/i18n/config';

export function LocaleHtmlWrapper() {
  const params = useParams();
  const locale = params?.locale as string;

  useEffect(() => {
    // Ensure we have a valid locale
    const validLocale = locale && locales.includes(locale as any) ? locale : defaultLocale;

    // Update the html lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = validLocale;
      document.documentElement.className = 'scroll-smooth';
    }
  }, [locale]);

  return null;
}
