import './globals.css';

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Montserrat, Poppins } from 'next/font/google';

// Premium typography stack for CDH manifesto
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap'
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-display',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap'
});

const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: '--font-creative',
  weight: ['400', '500', '600'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
  description: 'Scale your TikTok Shop from 50 to 500+ orders per day. The only fulfillment automation platform built for viral TikTok creators.',
  keywords: ['TikTok Shop', 'fulfillment automation', 'creator economy', 'e-commerce', 'order management'],
  openGraph: {
    title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
    description: 'Transform TikTok chaos into organized fulfillment. CEO-grade automation for creators.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorFlow - TikTok Shop Fulfillment Automation',
    description: 'Scale your TikTok Shop from 50 to 500+ orders per day',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable} ${poppins.variable}`}
    >
      <head>
        <meta name="theme-color" content="#f59e0b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased scroll-premium">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}