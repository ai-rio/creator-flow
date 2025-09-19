<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Comprehensive Guide to Internationalizing a Modern Next.js App with next-intl

**Seamless internationalization (i18n)** in Next.js combines Next.js’s built-in locale routing with a dedicated library like **next-intl** for message loading, formatting, and automatic language detection. This guide walks through project setup, JSON file organization, auto-detection, best practices, and code examples using the App Router (Next.js 13+).

---

## 1. Initialize the Next.js Project

1. Create a new Next.js app with TypeScript:

```bash
npx create-next-app@latest my-i18n-app --typescript --app
cd my-i18n-app
```

2. Install **next-intl** and its peer dependencies:

```bash
npm install next-intl react-intl
```

---

## 2. Configure Next.js for i18n Routing

In `next.config.js`, enable built-in locale routing so Next.js recognizes locales in URLs:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    localeDetection: false, // we’ll handle detection manually
  },
};

module.exports = nextConfig;
```

- `locales`: list of supported language codes
- `defaultLocale`: fallback locale
- `localeDetection`: disable automatic redirects to handle detection in code

---

## 3. Organize Translation Files

Use a **modular, per-page** structure under `locales/{lang}`:

```
/locales
  /en
    home.json
    features.json
    common.json
  /fr
    home.json
    features.json
    common.json
  /es
    home.json
    features.json
    common.json
```

Example `locales/en/home.json`:

```json
{
  "title": "Welcome to our site",
  "subtitle": "Discover the features"
}
```

Example `locales/fr/home.json`:

```json
{
  "title": "Bienvenue sur notre site",
  "subtitle": "Découvrez les fonctionnalités"
}
```

- **`common.json`** holds shared strings (e.g., navigation, footers).
- Naming by feature/page keeps translation files small and focused.

---

## 4. Create a `next-intl` Provider and Loader

### 4.1. Define `i18n.ts`

Create `lib/i18n.ts` to load messages dynamically:

```ts
import { NextIntlClientProvider, Locale, createTranslator } from 'next-intl';
import type { ReactNode } from 'react';

export async function loadMessages(locale: Locale) {
  const common = await import(`../locales/${locale}/common.json`).then((m) => m.default);
  const home = await import(`../locales/${locale}/home.json`).then((m) => m.default);
  const features = await import(`../locales/${locale}/features.json`).then((m) => m.default);
  return { ...common, ...home, ...features };
}

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: Locale;
  messages: Record<string, string>;
}) {
  const t = createTranslator({ locale, messages });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

### 4.2. Use Layout in App Router

In `app/layout.tsx`:

```tsx
import { I18nProvider, loadMessages } from '../lib/i18n';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. Detect locale from cookie or header
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  const acceptLanguage = headers().get('accept-language') || '';
  const locale = cookieLocale || acceptLanguage.split(',')[0].split('-')[0] || 'en';

  // 2. Load messages for locale
  const messages = await loadMessages(locale as 'en' | 'fr' | 'es');

  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale as 'en' | 'fr' | 'es'} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

- **Language detection**: priority—cookie → `Accept-Language` header → default
- Store user’s choice in cookie for persistence

---

## 5. Implement Page Components

In `app/page.tsx` (Home page):

```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </main>
  );
}

// Load messages for static generation
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'es' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  // Optional: dynamic metadata using translations
  const messages = await loadMessages(params.locale as any);
  return { title: messages.title };
}
```

- Use `useTranslations()` to access translation keys.
- `generateStaticParams` ensures each locale has its own static build.

---

## 6. Language Switcher Component

Create `components/LanguageSwitcher.tsx`:

```tsx
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function LanguageSwitcher({ locales }: { locales: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const switchLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    router.push(`/${locale}${pathname}${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <select onChange={(e) => switchLocale(e.target.value)} defaultValue={locales[0]}>
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
```

- Saves chosen locale in a cookie.
- Redirects to the same route under the new locale.

---

## 7. Best Practices and Tips

- **Modular JSON files** by page/feature keep translations maintainable.
- **Flat key structure** simplifies usage—avoid deeply nested objects.
- **Type safety**: augment `next-intl` types with your message keys for compile-time checks.
- **Static generation**: ensure `generateStaticParams` covers all locales to pre-build localized routes.
- **Metadata localization**: use translated strings in `generateMetadata` for SEO.
- **Fallbacks**: always include a default locale and handle missing keys gracefully by showing the key or fallback text.
- **Automated translation**: consider integrating with services (e.g., Lokalise, Crowdin) that sync JSON files for continuous localization workflows.

---

## 8. Final Project Structure

```
my-i18n-app/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
├─ components/
│  └─ LanguageSwitcher.tsx
├─ lib/
│  └─ i18n.ts
├─ locales/
│  ├─ en/
│  │  ├─ home.json
│  │  ├─ features.json
│  │  └─ common.json
│  ├─ fr/…
│  └─ es/…
├─ next.config.js
└─ package.json
```

With this setup, your Next.js application will support clean, scalable, and performant internationalization powered by **next-intl**, automatic language detection, and best-practice JSON organization—delivering a seamless multilingual experience.
