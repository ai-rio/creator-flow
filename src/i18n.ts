import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { locales } from './lib/i18n/config';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` contains the locale that was matched by the middleware
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; // fallback to default locale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});