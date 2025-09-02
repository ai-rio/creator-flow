import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from '../tailwind.config';

interface CreatorWelcomeEmailProps {
  creatorName: string;
  tiktokHandle: string;
  dashboardUrl: string;
}

export function CreatorWelcomeEmail({ creatorName, tiktokHandle, dashboardUrl }: CreatorWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to CreatorFlow - Start monetizing your TikTok content!</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-light-concrete px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[580px] overflow-hidden rounded-lg bg-paper-white shadow-lg'>
            {/* Header with TikTok-inspired gradient */}
            <Section className='bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-8'>
              <Heading className='mb-2 text-center text-[36px] font-bold text-white'>
                🎉 Welcome to CreatorFlow!
              </Heading>
              <Text className='mb-0 text-center text-lg text-white/90'>
                Your TikTok monetization journey starts now
              </Text>
            </Section>

            {/* Main Content */}
            <Section className='px-8 py-6'>
              <Heading className='mb-4 text-xl font-semibold text-charcoal'>
                Hey {creatorName}! 👋
              </Heading>
              
              <Text className='mb-4 text-charcoal leading-relaxed'>
                Congratulations on joining CreatorFlow! We're excited to help you turn your TikTok creativity 
                into a thriving business with our automated fulfillment platform.
              </Text>

              <Text className='mb-6 text-charcoal leading-relaxed'>
                Your creator account <strong>@{tiktokHandle}</strong> is now connected and ready to start 
                generating revenue through our seamless integration with TikTok's creator economy.
              </Text>

              {/* Features Section */}
              <Section className='mb-6 rounded-lg border border-stone-gray bg-light-concrete p-6'>
                <Heading className='mb-4 text-lg font-semibold text-forest-green'>
                  What's Next? 🚀
                </Heading>
                <div className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <Text className='mb-0 text-2xl'>📊</Text>
                    <Text className='mb-0 text-charcoal'>
                      <strong>Track Performance:</strong> Monitor your TikTok metrics and revenue in real-time
                    </Text>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Text className='mb-0 text-2xl'>📦</Text>
                    <Text className='mb-0 text-charcoal'>
                      <strong>Automated Fulfillment:</strong> We handle shipping, customer service, and returns
                    </Text>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Text className='mb-0 text-2xl'>💰</Text>
                    <Text className='mb-0 text-charcoal'>
                      <strong>Weekly Payouts:</strong> Get paid every week for your successful campaigns
                    </Text>
                  </div>
                </div>
              </Section>

              <Text className='mb-6 text-charcoal leading-relaxed'>
                Ready to explore your creator dashboard? You'll find everything you need to manage your 
                campaigns, track earnings, and optimize your content strategy.
              </Text>

              {/* CTA Button */}
              <Section className='text-center'>
                <Button
                  href={dashboardUrl}
                  className='rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 font-semibold text-white hover:opacity-90'
                >
                  Access Your Dashboard
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className='border-t border-stone-gray bg-light-concrete px-8 py-4'>
              <Text className='mb-2 text-center text-sm text-charcoal'>
                Questions? We're here to help!<br />
                <strong>CreatorFlow Support Team</strong>
              </Text>
              <Text className='mb-0 text-center text-xs text-charcoal/70'>
                Email: support@creatorflow.com | Built on QuoteKit Infrastructure
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
