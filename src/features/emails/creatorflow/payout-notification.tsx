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
  conversionRate,
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
        <Body className='bg-light-concrete mx-auto my-auto px-2 py-10 font-sans'>
          <Container className='bg-paper-white mx-auto mt-[40px] w-[580px] overflow-hidden rounded-lg shadow-lg'>
            {/* Header */}
            <Section className='bg-gradient-to-r from-green-400 to-green-600 px-8 py-8'>
              <Heading className='mb-2 text-center text-[36px] font-bold text-white'>💰 Payout Processed!</Heading>
              <Text className='mb-0 text-center text-2xl font-bold text-white'>{formatCurrency(payoutAmount)}</Text>
            </Section>

            {/* Main Content */}
            <Section className='px-8 py-6'>
              <Heading className='text-charcoal mb-4 text-xl font-semibold'>Congratulations, {creatorName}! 🎉</Heading>

              <Text className='text-charcoal mb-6 leading-relaxed'>
                Your weekly payout of <strong>{formatCurrency(payoutAmount)}</strong> has been processed and will arrive
                in your account by <strong>{payoutDate}</strong>.
              </Text>

              {/* Performance Summary */}
              <Section className='border-stone-gray bg-light-concrete mb-6 rounded-lg border p-6'>
                <Heading className='text-forest-green mb-4 text-lg font-semibold'>
                  This Week&rsquo;s Performance 📊
                </Heading>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center'>
                    <Text className='text-charcoal mb-1 text-2xl font-bold'>{ordersCount}</Text>
                    <Text className='text-charcoal/70 mb-0 text-sm'>Orders Generated</Text>
                  </div>
                  <div className='text-center'>
                    <Text className='text-charcoal mb-1 text-2xl font-bold'>{formatNumber(totalViews)}</Text>
                    <Text className='text-charcoal/70 mb-0 text-sm'>Total Views</Text>
                  </div>
                  <div className='col-span-2 text-center'>
                    <Text className='text-equipment-yellow mb-1 text-2xl font-bold'>{conversionRate}%</Text>
                    <Text className='text-charcoal/70 mb-0 text-sm'>Conversion Rate</Text>
                  </div>
                </div>
              </Section>

              {/* Earnings Breakdown */}
              <Section className='mb-6 rounded-lg border border-green-200 bg-green-50 p-6'>
                <Heading className='mb-4 text-lg font-semibold text-green-700'>Earnings Breakdown 💵</Heading>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <Text className='text-charcoal/70 mb-0'>Base Commission:</Text>
                    <Text className='text-charcoal mb-0 font-semibold'>{formatCurrency(payoutAmount * 0.85)}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='text-charcoal/70 mb-0'>Performance Bonus:</Text>
                    <Text className='text-charcoal mb-0 font-semibold'>{formatCurrency(payoutAmount * 0.15)}</Text>
                  </div>
                  <div className='flex justify-between border-t border-green-200 pt-2'>
                    <Text className='text-charcoal mb-0 font-bold'>Total Payout:</Text>
                    <Text className='mb-0 text-xl font-bold text-green-600'>{formatCurrency(payoutAmount)}</Text>
                  </div>
                </div>
              </Section>

              <Text className='text-charcoal mb-6 leading-relaxed'>
                You&rsquo;re doing amazing! Keep creating engaging content to maximize your earnings. Your next payout
                will be processed next week.
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
            <Section className='border-stone-gray bg-light-concrete border-t px-8 py-4'>
              <Text className='text-charcoal mb-2 text-center text-sm'>
                Thank you for being part of CreatorFlow! 🙏
                <br />
                <strong>CreatorFlow Team</strong>
              </Text>
              <Text className='text-charcoal/70 mb-0 text-center text-xs'>
                Questions about your payout? Contact support@creatorflow.com
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
