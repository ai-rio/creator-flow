import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { ConditionalHeader } from '@/components/layout/ConditionalHeader';
import { Logo } from '@/components/logo';
import { FloatingThemeToggle } from '@/components/ui/theme-toggle';
import { locales } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  console.log('LocaleLayout rendering with locale:', locale);
  console.log('Messages loaded:', Object.keys(messages || {}));
  console.log('Footer messages:', messages?.footer);

  return (
    <NextIntlClientProvider messages={messages}>
      <div className='m-auto flex h-full max-w-[1440px] flex-col px-4'>
        {/* Debug: Always show header for now */}
        <ConditionalHeader />
        <main className='relative flex-1'>
          <div className='relative h-full'>{children}</div>
        </main>
        {/* Debug: Always show footer for now */}
        <ConditionalFooter />
      </div>

      {/* Floating theme toggle for quick access */}
      <FloatingThemeToggle />
    </NextIntlClientProvider>
  );
}
