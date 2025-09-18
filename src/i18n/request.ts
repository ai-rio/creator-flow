import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

// Helper function to check if a locale is supported
function hasLocale(locales: readonly string[], locale: string | undefined): locale is string {
  return locale != null && locales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  console.log('🚀 REQUEST CONFIG - START');
  console.log('🚀 REQUEST CONFIG - requestLocale param:', requestLocale);
  console.log('🚀 REQUEST CONFIG - routing.locales:', routing.locales);

  // requestLocale is a Promise when using locale-based routing
  const requested = await requestLocale;
  console.log('🚀 REQUEST CONFIG - awaited requestLocale:', requested);
  console.log('🚀 REQUEST CONFIG - typeof requested:', typeof requested);

  // Validate locale is supported, fallback to default if not
  const hasLocaleResult = hasLocale(routing.locales, requested);
  console.log('🚀 REQUEST CONFIG - hasLocale result:', hasLocaleResult);

  const locale = hasLocaleResult ? requested : routing.defaultLocale;
  console.log('🚀 REQUEST CONFIG - final locale:', locale);

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    console.log('🚀 REQUEST CONFIG - loaded messages for:', locale, 'keys:', Object.keys(messages));

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error('🚀 REQUEST CONFIG - ERROR loading messages for locale:', locale, error);
    throw error;
  }
});
