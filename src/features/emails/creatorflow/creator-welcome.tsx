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
        <Body className='bg-light-concrete mx-auto my-auto px-2 py-10 font-sans'>
          <Container className='bg-paper-white mx-auto mt-[40px] w-[580px] overflow-hidden rounded-lg shadow-lg'>
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
              <Heading className='text-charcoal mb-4 text-xl font-semibold'>Hey {creatorName}! 👋</Heading>

              <Text className='text-charcoal mb-4 leading-relaxed'>
                Congratulations on joining CreatorFlow! We&rsquo;re excited to help you turn your TikTok creativity into
                a thriving business with our automated fulfillment platform.
              </Text>

              <Text className='text-charcoal mb-6 leading-relaxed'>
                Your creator account <strong>@{tiktokHandle}</strong> is now connected and ready to start generating
                revenue through our seamless integration with TikTok&rsquo;s creator economy.
              </Text>

              {/* Features Section */}
              <Section className='border-stone-gray bg-light-concrete mb-6 rounded-lg border p-6'>
                <Heading className='text-forest-green mb-4 text-lg font-semibold'>What&rsquo;s Next? 🚀</Heading>
                <div className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <Text className='mb-0 text-2xl'>📊</Text>
                    <Text className='text-charcoal mb-0'>
                      <strong>Track Performance:</strong> Monitor your TikTok metrics and revenue in real-time
                    </Text>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Text className='mb-0 text-2xl'>📦</Text>
                    <Text className='text-charcoal mb-0'>
                      <strong>Automated Fulfillment:</strong> We handle shipping, customer service, and returns
                    </Text>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Text className='mb-0 text-2xl'>💰</Text>
                    <Text className='text-charcoal mb-0'>
                      <strong>Weekly Payouts:</strong> Get paid every week for your successful campaigns
                    </Text>
                  </div>
                </div>
              </Section>

              <Text className='text-charcoal mb-6 leading-relaxed'>
                Ready to explore your creator dashboard? You&rsquo;ll find everything you need to manage your campaigns,
                track earnings, and optimize your content strategy.
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
            <Section className='border-stone-gray bg-light-concrete border-t px-8 py-4'>
              <Text className='text-charcoal mb-2 text-center text-sm'>
                Questions? We&rsquo;re here to help!
                <br />
                <strong>CreatorFlow Support Team</strong>
              </Text>
              <Text className='text-charcoal/70 mb-0 text-center text-xs'>
                Email: support@creatorflow.com | Built on QuoteKit Infrastructure
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
