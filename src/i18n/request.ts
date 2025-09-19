import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

// Helper function to check if a locale is supported
function hasLocale(locales: readonly string[], locale: string | undefined): locale is string {
  return locale != null && locales.includes(locale);
}

// Deep merge function to properly combine nested objects
function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        if (typeof result[key] === 'object' && result[key] !== null && !Array.isArray(result[key])) {
          result[key] = deepMerge(result[key], source[key]);
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
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
    // Import error handling utilities
    const { safeLoadModule, validateTranslations } = await import('../lib/i18n/error-handling');

    // Load modular translation files with error handling
    const [common, homepage, features, auth, dashboard, test, legal] = await Promise.all([
      safeLoadModule(locale as any, 'common'),
      safeLoadModule(locale as any, 'homepage'),
      safeLoadModule(locale as any, 'features'),
      safeLoadModule(locale as any, 'auth'),
      safeLoadModule(locale as any, 'dashboard'),
      safeLoadModule(locale as any, 'test'),
      safeLoadModule(locale as any, 'legal'),
    ]);

    // Debug: Check if any module has flat keys
    const modules = { common, homepage, features, auth, dashboard, test, legal };
    for (const [moduleName, moduleData] of Object.entries(modules)) {
      const flatKeys = Object.keys(moduleData).filter((key) => key.includes('.'));
      if (flatKeys.length > 0) {
        console.error(`🚨 MODULE ${moduleName} HAS FLAT KEYS:`, flatKeys.slice(0, 5));
      }
    }

    // Deep merge all translation modules into a single messages object
    let messages = {};
    for (const moduleData of [common, homepage, features, auth, dashboard, test, legal]) {
      messages = deepMerge(messages, moduleData);
    }

    // Validate translations in development
    validateTranslations(messages, locale as any);

    console.log(
      '🚀 REQUEST CONFIG - loaded modular messages for:',
      locale,
      'total keys:',
      Object.keys(messages).length
    );
    console.log('🚀 REQUEST CONFIG - modules loaded: common, homepage, features, auth, dashboard, test, legal');

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error('🚀 REQUEST CONFIG - ERROR loading modular messages for locale:', locale, error);

    // Try to load fallback messages
    try {
      const fallbackLocale = routing.defaultLocale;
      console.log('🚀 REQUEST CONFIG - Attempting fallback to:', fallbackLocale);

      const { safeLoadModule } = await import('../lib/i18n/error-handling');

      const [common, homepage, features, auth, dashboard, test, legal] = await Promise.all([
        safeLoadModule(fallbackLocale as any, 'common'),
        safeLoadModule(fallbackLocale as any, 'homepage'),
        safeLoadModule(fallbackLocale as any, 'features'),
        safeLoadModule(fallbackLocale as any, 'auth'),
        safeLoadModule(fallbackLocale as any, 'dashboard'),
        safeLoadModule(fallbackLocale as any, 'test'),
        safeLoadModule(fallbackLocale as any, 'legal'),
      ]);

      const fallbackMessages = {
        ...common,
        ...homepage,
        ...features,
        ...auth,
        ...dashboard,
        ...test,
        ...legal,
      };

      console.log('🚀 REQUEST CONFIG - Using fallback messages for:', fallbackLocale);

      return {
        locale: fallbackLocale,
        messages: fallbackMessages,
      };
    } catch (fallbackError) {
      console.error('🚀 REQUEST CONFIG - CRITICAL: Fallback failed:', fallbackError);
      throw error;
    }
  }
});
