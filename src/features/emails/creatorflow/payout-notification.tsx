import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from '../tailwind.config';

interface PayoutNotificationEmailProps {
  creatorName: string;
  payoutAmount: number;
  payoutDate: string;
  ordersCount: number;
  totalViews: number;
  conversionRate: number;
}

export function PayoutNotificationEmail({ 
  creatorName, 
  payoutAmount, 
  payoutDate, 
  ordersCount, 
  totalViews, 
  conversionRate 
}: PayoutNotificationEmailProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Html>
      <Head />
      <Preview>Weekly payout: {formatCurrency(payoutAmount)} is on the way!</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-light-concrete px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[580px] overflow-hidden rounded-lg bg-paper-white shadow-lg'>
            {/* Header */}
            <Section className='bg-gradient-to-r from-green-400 to-green-600 px-8 py-8'>
              <Heading className='mb-2 text-center text-[36px] font-bold text-white'>
                💰 Payout Processed!
              </Heading>
              <Text className='mb-0 text-center text-2xl font-bold text-white'>
                {formatCurrency(payoutAmount)}
              </Text>
            </Section>

            {/* Main Content */}
            <Section className='px-8 py-6'>
              <Heading className='mb-4 text-xl font-semibold text-charcoal'>
                Congratulations, {creatorName}! 🎉
              </Heading>
              
              <Text className='mb-6 text-charcoal leading-relaxed'>
                Your weekly payout of <strong>{formatCurrency(payoutAmount)}</strong> has been processed 
                and will arrive in your account by <strong>{payoutDate}</strong>.
              </Text>

              {/* Performance Summary */}
              <Section className='mb-6 rounded-lg border border-stone-gray bg-light-concrete p-6'>
                <Heading className='mb-4 text-lg font-semibold text-forest-green'>
                  This Week's Performance 📊
                </Heading>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center'>
                    <Text className='mb-1 text-2xl font-bold text-charcoal'>{ordersCount}</Text>
                    <Text className='mb-0 text-sm text-charcoal/70'>Orders Generated</Text>
                  </div>
                  <div className='text-center'>
                    <Text className='mb-1 text-2xl font-bold text-charcoal'>{formatNumber(totalViews)}</Text>
                    <Text className='mb-0 text-sm text-charcoal/70'>Total Views</Text>
                  </div>
                  <div className='text-center col-span-2'>
                    <Text className='mb-1 text-2xl font-bold text-equipment-yellow'>{conversionRate}%</Text>
                    <Text className='mb-0 text-sm text-charcoal/70'>Conversion Rate</Text>
                  </div>
                </div>
              </Section>

              {/* Earnings Breakdown */}
              <Section className='mb-6 rounded-lg border border-green-200 bg-green-50 p-6'>
                <Heading className='mb-4 text-lg font-semibold text-green-700'>
                  Earnings Breakdown 💵
                </Heading>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <Text className='mb-0 text-charcoal/70'>Base Commission:</Text>
                    <Text className='mb-0 font-semibold text-charcoal'>{formatCurrency(payoutAmount * 0.85)}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='mb-0 text-charcoal/70'>Performance Bonus:</Text>
                    <Text className='mb-0 font-semibold text-charcoal'>{formatCurrency(payoutAmount * 0.15)}</Text>
                  </div>
                  <div className='flex justify-between border-t border-green-200 pt-2'>
                    <Text className='mb-0 font-bold text-charcoal'>Total Payout:</Text>
                    <Text className='mb-0 text-xl font-bold text-green-600'>{formatCurrency(payoutAmount)}</Text>
                  </div>
                </div>
              </Section>

              <Text className='mb-6 text-charcoal leading-relaxed'>
                You're doing amazing! Keep creating engaging content to maximize your earnings. 
                Your next payout will be processed next week.
              </Text>

              {/* CTA Button */}
              <Section className='text-center'>
                <Button
                  href='/dashboard/earnings'
                  className='rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 font-semibold text-white hover:opacity-90'
                >
                  View Detailed Report
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className='border-t border-stone-gray bg-light-concrete px-8 py-4'>
              <Text className='mb-2 text-center text-sm text-charcoal'>
                Thank you for being part of CreatorFlow! 🙏<br />
                <strong>CreatorFlow Team</strong>
              </Text>
              <Text className='mb-0 text-center text-xs text-charcoal/70'>
                Questions about your payout? Contact support@creatorflow.com
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
