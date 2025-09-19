import { cookies, headers } from 'next/headers';

import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/i18n';

/**
 * Detects the user's preferred locale using multiple strategies:
 * 1. Cookie preference (highest priority)
 * 2. Accept-Language header (fallback)
 * 3. Default locale (final fallback)
 */
export async function detectLocale(): Promise<Locale> {
  // 1. Check for saved locale in cookies
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;

  if (savedLocale && routing.locales.includes(savedLocale as Locale)) {
    return savedLocale as Locale;
  }

  // 2. Check Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  if (acceptLanguage) {
    // Parse Accept-Language header and find best match
    const localeFromHeader = parseAcceptLanguage(acceptLanguage);
    if (localeFromHeader && routing.locales.includes(localeFromHeader as Locale)) {
      return localeFromHeader as Locale;
    }
  }

  // 3. Return default locale
  return routing.defaultLocale as Locale;
}

/**
 * Parses the Accept-Language header and returns the best matching locale
 */
function parseAcceptLanguage(acceptLanguage: string): string | null {
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const parts = lang.trim().split(';');
      const locale = parts[0].toLowerCase();
      const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0;
      return { locale, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { locale } of languages) {
    // Direct match
    if (routing.locales.includes(locale as Locale)) {
      return locale;
    }

    // Language-only match (e.g., 'pt' matches 'pt-br')
    const language = locale.split('-')[0];
    const match = routing.locales.find((supportedLocale) => supportedLocale.startsWith(language));

    if (match) {
      return match;
    }
  }

  return null;
}

/**
 * Sets the locale preference cookie
 */
export function setLocaleCookie(locale: Locale): void {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1); // 1 year expiration

  document.cookie = `NEXT_LOCALE=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Gets the locale preference from cookies (client-side)
 */
export function getLocaleCookie(): Locale | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const localeCookie = cookies.find((cookie) => cookie.trim().startsWith('NEXT_LOCALE='));

  if (localeCookie) {
    const locale = localeCookie.split('=')[1];
    return routing.locales.includes(locale as Locale) ? (locale as Locale) : null;
  }

  return null;
}

/**
 * Utility to check if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}
