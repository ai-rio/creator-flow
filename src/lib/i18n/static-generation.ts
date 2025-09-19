import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/i18n';

/**
 * Generates static parameters for all supported locales
 * This ensures all pages are pre-built for each locale
 */
export function generateLocaleParams() {
  return routing.locales.map((locale) => ({
    locale: locale,
  }));
}

/**
 * Utility type for locale params in page components
 */
export type LocaleParams = {
  locale: Locale;
};

/**
 * Utility type for async locale params (Next.js App Router)
 */
export type AsyncLocaleParams = Promise<LocaleParams>;

/**
 * Helper to generate static paths with additional parameters
 */
export function generateLocaleParamsWithPath<T extends Record<string, string>>(additionalParams: T[]) {
  const localeParams = generateLocaleParams();

  return localeParams.flatMap((localeParam) =>
    additionalParams.map((additionalParam) => ({
      ...localeParam,
      ...additionalParam,
    }))
  );
}

/**
 * Get all locales for static generation
 */
export const staticLocales = routing.locales;

export default generateLocaleParams;
