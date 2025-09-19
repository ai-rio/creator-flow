'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { locales } from '@/lib/i18n/config';

const languageNames = {
  en: 'English',
  'pt-br': 'Português',
  es: 'Español',
} as const;

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    // Set cookie for persistence
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // 1 year expiration
    document.cookie = `NEXT_LOCALE=${newLocale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    // Build new URL with locale
    const segments = pathname.split('/');
    // Replace current locale with new locale
    if (locales.includes(segments[1] as any)) {
      segments[1] = newLocale;
    } else {
      // If no locale in path, add it
      segments.splice(1, 0, newLocale);
    }

    const newUrl = segments.join('/');
    const searchString = searchParams.toString();
    const finalUrl = searchString ? `${newUrl}?${searchString}` : newUrl;

    // Navigate to new locale
    router.push(finalUrl);
  };

  return (
    <select
      onChange={(e) => handleLanguageChange(e.target.value)}
      className='rounded border bg-white px-3 py-2 text-sm shadow-sm transition-shadow hover:shadow-md'
      value={currentLocale}
      aria-label='Select language'
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {languageNames[locale as keyof typeof languageNames]}
        </option>
      ))}
    </select>
  );
}
