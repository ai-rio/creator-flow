import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/i18n';

interface HreflangTagsProps {
  currentLocale: Locale;
  path: string;
  baseUrl?: string;
}

/**
 * Generates hreflang meta tags for SEO
 * Helps search engines understand the language and regional targeting of pages
 */
export function HreflangTags({ currentLocale, path, baseUrl = 'https://creatorflow.com' }: HreflangTagsProps) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Remove locale prefix from path if present
  let pathWithoutLocale = cleanPath;
  for (const locale of routing.locales) {
    if (cleanPath.startsWith(`${locale}/`)) {
      pathWithoutLocale = cleanPath.slice(locale.length + 1);
      break;
    } else if (cleanPath === locale) {
      pathWithoutLocale = '';
      break;
    }
  }

  return (
    <>
      {routing.locales.map((locale) => {
        const url = pathWithoutLocale ? `${baseUrl}/${locale}/${pathWithoutLocale}` : `${baseUrl}/${locale}`;

        return <link key={locale} rel='alternate' hrefLang={locale} href={url} />;
      })}

      {/* x-default for international targeting */}
      <link
        rel='alternate'
        hrefLang='x-default'
        href={pathWithoutLocale ? `${baseUrl}/en/${pathWithoutLocale}` : `${baseUrl}/en`}
      />
    </>
  );
}

/**
 * Utility to generate hreflang data for metadata
 */
export function generateHreflangMetadata(path: string, baseUrl = 'https://creatorflow.com') {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Remove locale prefix from path if present
  let pathWithoutLocale = cleanPath;
  for (const locale of routing.locales) {
    if (cleanPath.startsWith(`${locale}/`)) {
      pathWithoutLocale = cleanPath.slice(locale.length + 1);
      break;
    } else if (cleanPath === locale) {
      pathWithoutLocale = '';
      break;
    }
  }

  const languages: Record<string, string> = {};

  routing.locales.forEach((locale) => {
    const url = pathWithoutLocale ? `${baseUrl}/${locale}/${pathWithoutLocale}` : `${baseUrl}/${locale}`;

    languages[locale] = url;
  });

  // Add x-default
  languages['x-default'] = pathWithoutLocale ? `${baseUrl}/en/${pathWithoutLocale}` : `${baseUrl}/en`;

  return languages;
}
