import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { locales } from './lib/i18n/config';

export default getRequestConfig(async ({ locale }) => {
  console.log('i18n config - locale:', locale);

  if (!locale || !locales.includes(locale as any)) {
    locale = 'en';
  }

  console.log('i18n config - final locale:', locale);

  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    console.log('i18n config - loaded messages for:', locale, 'keys:', Object.keys(messages));
    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    const fallbackMessages = (await import(`./messages/en.json`)).default;
    return {
      locale: 'en',
      messages: fallbackMessages,
    };
  }
});
