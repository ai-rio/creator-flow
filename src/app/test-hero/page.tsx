'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

import { AP010Hero } from '@/components/atomic/organisms/AP010Hero';

// Mock translations for testing
const messages = {
  components: {
    atomic: {
      organisms: {
        AP010Hero: {
          title: 'The Architects of Scale.',
          subtitle:
            'We built the definitive command structure for one reason: to ensure your viral moment becomes a lasting enterprise, not an operational collapse.',
          principles: {
            scalability: {
              title: 'Scalability',
              description:
                'Engineered for 10x viral spikes. Our systems anticipate your success, ensuring you never miss an order.',
            },
            reliability: {
              title: 'Reliability',
              description:
                'Built on enterprise-grade infrastructure. We provide the stability you need to build a lasting business.',
            },
            clarity: {
              title: 'Clarity',
              description:
                'We transform operational complexity into actionable wisdom, giving you a clear view of your entire business.',
            },
            velocity: {
              title: 'Velocity',
              description:
                'Automate repetitive tasks and accelerate your fulfillment process, freeing you to focus on growth.',
            },
          },
        },
      },
    },
  },
};

export default function TestHeroPage() {
  return (
    <NextIntlClientProvider locale='en' messages={messages}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
        <div className='min-h-screen'>
          <AP010Hero />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
