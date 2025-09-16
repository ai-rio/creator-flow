import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Montserrat, Montserrat_Alternates } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
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
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
