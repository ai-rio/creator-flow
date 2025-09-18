import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

import ConditionalFooter from '@/components/layout/ConditionalFooter';
import { ConditionalHeader } from '@/components/layout/ConditionalHeader';
import { Logo } from '@/components/logo';
import { LocaleHtmlWrapper } from '@/components/providers/locale-html-wrapper';
import { FloatingThemeToggle } from '@/components/ui/theme-toggle';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) notFound();

  // Enable static rendering and set the locale
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlWrapper />
      <ConditionalHeader />
      {children}
      <ConditionalFooter />
      <FloatingThemeToggle />
    </NextIntlClientProvider>
  );
}
