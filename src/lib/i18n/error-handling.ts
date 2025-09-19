import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/i18n';

/**
 * Custom error class for internationalization errors
 */
export class I18nError extends Error {
  constructor(message: string, public code: string, public locale?: Locale, public key?: string) {
    super(message);
    this.name = 'I18nError';
  }
}

/**
 * Error codes for different i18n error types
 */
export const I18N_ERROR_CODES = {
  LOCALE_NOT_SUPPORTED: 'LOCALE_NOT_SUPPORTED',
  MESSAGE_NOT_FOUND: 'MESSAGE_NOT_FOUND',
  MODULE_LOAD_FAILED: 'MODULE_LOAD_FAILED',
  TRANSLATION_INVALID: 'TRANSLATION_INVALID',
  FALLBACK_USED: 'FALLBACK_USED',
} as const;

/**
 * Validates if a locale is supported
 */
export function validateLocale(locale: string): Locale {
  if (!routing.locales.includes(locale as Locale)) {
    throw new I18nError(
      `Locale "${locale}" is not supported. Supported locales: ${routing.locales.join(', ')}`,
      I18N_ERROR_CODES.LOCALE_NOT_SUPPORTED,
      undefined,
      locale
    );
  }
  return locale as Locale;
}

/**
 * Safely gets a locale with fallback
 */
export function safeGetLocale(locale: string): Locale {
  try {
    return validateLocale(locale);
  } catch (error) {
    console.warn(`Invalid locale "${locale}", falling back to default: ${routing.defaultLocale}`);
    return routing.defaultLocale as Locale;
  }
}

/**
 * Creates a fallback translation when a key is missing
 */
export function createFallbackTranslation(key: string, locale: Locale): string {
  if (process.env.NODE_ENV === 'development') {
    return `[MISSING: ${locale}.${key}]`;
  }

  // In production, return the key itself or a more user-friendly fallback
  return key.split('.').pop() || key;
}

/**
 * Logs translation errors for monitoring
 */
export function logTranslationError(error: I18nError, context?: Record<string, any>): void {
  const logData = {
    message: error.message,
    code: error.code,
    locale: error.locale,
    key: error.key,
    context,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('🌐 I18n Error:', logData);
  } else {
    // In production, you might want to send this to a monitoring service
    console.error('I18n Error:', error.message);
  }
}

/**
 * Safe translation function with fallbacks
 */
export function safeTranslate(
  messages: Record<string, any>,
  key: string,
  locale: Locale,
  params?: Record<string, any>
): string {
  try {
    const value = messages[key];

    if (value === undefined || value === null) {
      const fallback = createFallbackTranslation(key, locale);
      logTranslationError(
        new I18nError(
          `Translation key "${key}" not found for locale "${locale}"`,
          I18N_ERROR_CODES.MESSAGE_NOT_FOUND,
          locale,
          key
        ),
        { params }
      );
      return fallback;
    }

    if (typeof value !== 'string') {
      logTranslationError(
        new I18nError(
          `Translation value for key "${key}" is not a string: ${typeof value}`,
          I18N_ERROR_CODES.TRANSLATION_INVALID,
          locale,
          key
        ),
        { value, params }
      );
      return createFallbackTranslation(key, locale);
    }

    // Simple parameter replacement (for basic cases)
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  } catch (error) {
    logTranslationError(
      new I18nError(
        `Error translating key "${key}" for locale "${locale}": ${error}`,
        I18N_ERROR_CODES.TRANSLATION_INVALID,
        locale,
        key
      ),
      { error, params }
    );
    return createFallbackTranslation(key, locale);
  }
}

/**
 * Module loading with error handling and caching
 */
export async function safeLoadModule(locale: Locale, moduleName: string): Promise<Record<string, any>> {
  try {
    // Try to load with cache first
    const { loadModuleWithCache } = await import('./cache');
    return await loadModuleWithCache(locale, moduleName);
  } catch (error) {
    logTranslationError(
      new I18nError(
        `Failed to load module "${moduleName}" for locale "${locale}"`,
        I18N_ERROR_CODES.MODULE_LOAD_FAILED,
        locale,
        moduleName
      ),
      { error }
    );

    // Try to load English fallback
    if (locale !== routing.defaultLocale) {
      try {
        const { loadModuleWithCache } = await import('./cache');
        const fallbackData = await loadModuleWithCache(routing.defaultLocale as Locale, moduleName);

        logTranslationError(
          new I18nError(
            `Using fallback locale "${routing.defaultLocale}" for module "${moduleName}"`,
            I18N_ERROR_CODES.FALLBACK_USED,
            locale,
            moduleName
          ),
          { fallbackLocale: routing.defaultLocale }
        );

        return fallbackData;
      } catch (fallbackError) {
        logTranslationError(
          new I18nError(
            `Failed to load fallback module "${moduleName}" for locale "${routing.defaultLocale}"`,
            I18N_ERROR_CODES.MODULE_LOAD_FAILED,
            routing.defaultLocale as Locale,
            moduleName
          ),
          { error: fallbackError }
        );
      }
    }

    return {};
  }
}

/**
 * Development-only function to check for missing translations
 */
export function validateTranslations(messages: Record<string, any>, locale: Locale): void {
  if (process.env.NODE_ENV !== 'development') return;

  const requiredKeys = [
    'navigation.dashboard',
    'header.navigation.features',
    'footer.copyright',
    'auth.login',
    'errors.pageNotFound',
  ];

  const missingKeys = requiredKeys.filter((key) => !messages[key]);

  if (missingKeys.length > 0) {
    console.warn(`🌐 Missing translations for locale "${locale}":`, missingKeys);
  }
}
