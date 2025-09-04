'use client';

import { usePathname,useRouter } from 'next/navigation';

import { locales } from '@/lib/i18n/config';

const languageNames = {
  en: 'English',
  'pt-br': 'Português',
  es: 'Español'
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  return (
    <select 
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="border rounded px-2 py-1"
      defaultValue={pathname.split('/')[1]}
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {languageNames[locale]}
        </option>
      ))}
    </select>
  );
}