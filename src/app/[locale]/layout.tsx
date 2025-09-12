import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Montserrat, Montserrat_Alternates } from 'next/font/google';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

import { Logo } from '@/components/logo';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { TolgeeClientProvider } from '@/components/tolgee-provider';
import { FloatingThemeToggle } from '@/components/ui/theme-toggle';
import { Toaster } from '@/components/ui/toaster';
import { locales } from '@/lib/i18n/config';
import { cn } from '@/utils/cn';

import { Navigation } from '../navigation';

export const dynamic = 'force-dynamic';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const montserratAlternates = Montserrat_Alternates({
  variable: '--font-montserrat-alternates',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CreatorFlow - TikTok Shop Automation',
  description: 'Automate your TikTok Shop fulfillment and scale from 50 to 500+ orders per day',
};

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

  const messages = await getMessages();

  return (
    <html lang={locale} className='scroll-smooth' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased transition-colors duration-300',
          montserrat.variable,
          montserratAlternates.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey='creatorflow-theme'
          themes={['light', 'dark', 'system']}
        >
          <TolgeeClientProvider>
            <NextIntlClientProvider messages={messages}>
              <div className='m-auto flex h-full max-w-[1440px] flex-col px-4'>
                <AppBar />
                <main className='relative flex-1'>
                  <div className='relative h-full'>{children}</div>
                </main>
                <Footer />
              </div>

              {/* Floating theme toggle for quick access */}
              <FloatingThemeToggle />

              <Toaster />
              <Analytics />
            </NextIntlClientProvider>
          </TolgeeClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

async function AppBar() {
  return (
    <header className='flex items-center justify-between py-8'>
      <Logo />
      <Navigation />
    </header>
  );
}

function Footer() {
  return (
    <footer className='mt-8 flex flex-col gap-8 text-muted-foreground lg:mt-32'>
      <div className='flex flex-col justify-between gap-8 lg:flex-row'>
        <div>
          <Logo />
        </div>
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-4 lg:gap-16'>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-foreground'>Product</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/pricing' className='transition-colors hover:text-foreground'>
                Pricing
              </Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-foreground'>Company</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/about-us' className='transition-colors hover:text-foreground'>
                About Us
              </Link>
              <Link href='/privacy' className='transition-colors hover:text-foreground'>
                Privacy
              </Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-foreground'>Support</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='/support' className='transition-colors hover:text-foreground'>
                Get Support
              </Link>
            </nav>
          </div>
          <div className='flex flex-col gap-2 lg:gap-6'>
            <div className='font-semibold text-foreground'>Follow us</div>
            <nav className='flex flex-col gap-2 lg:gap-6'>
              <Link href='#' className='transition-colors hover:text-foreground'>
                <span className='flex items-center gap-2'>
                  <IoLogoTwitter size={22} /> <span>Twitter</span>
                </span>
              </Link>
              <Link href='#' className='transition-colors hover:text-foreground'>
                <span className='flex items-center gap-2'>
                  <IoLogoFacebook size={22} /> <span>Facebook</span>
                </span>
              </Link>
              <Link href='#' className='transition-colors hover:text-foreground'>
                <span className='flex items-center gap-2'>
                  <IoLogoInstagram size={22} /> <span>Instagram</span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='border-t border-border py-6 text-center'>
        <span className='text-xs text-muted-foreground'>Copyright {new Date().getFullYear()} © CreatorFlow</span>
      </div>
    </footer>
  );
}
