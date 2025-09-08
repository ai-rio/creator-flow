import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from '../tailwind.config';

interface OrderShippedEmailProps {
  creatorName: string;
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  customerName: string;
  commission: number;
}

export function OrderShippedEmail({
  creatorName,
  orderNumber,
  trackingNumber,
  carrier,
  estimatedDelivery,
  customerName,
  commission,
}: OrderShippedEmailProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Html>
      <Head />
      <Preview>
        Order #{orderNumber} shipped - You earned {formatCurrency(commission)}!
      </Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='bg-light-concrete mx-auto my-auto px-2 py-10 font-sans'>
          <Container className='bg-paper-white mx-auto mt-[40px] w-[580px] overflow-hidden rounded-lg shadow-lg'>
            {/* Header */}
            <Section className='bg-gradient-to-r from-green-500 to-blue-600 px-8 py-6'>
              <Heading className='mb-2 text-center text-[32px] font-bold text-white'>📦 Order Shipped!</Heading>
              <Text className='mb-0 text-center text-lg text-white/90'>
                Another successful sale from your TikTok content
              </Text>
            </Section>

            {/* Main Content */}
            <Section className='px-8 py-6'>
              <Heading className='text-charcoal mb-4 text-xl font-semibold'>Great news, {creatorName}! 🎉</Heading>

              <Text className='text-charcoal mb-6 leading-relaxed'>
                Order <strong>#{orderNumber}</strong> from your TikTok campaign has been shipped to {customerName}.
                You&rsquo;ve earned <strong>{formatCurrency(commission)}</strong> in commission!
              </Text>

              {/* Order Details */}
              <Section className='border-stone-gray bg-light-concrete mb-6 rounded-lg border p-6'>
                <Heading className='text-forest-green mb-4 text-lg font-semibold'>Shipping Details 📋</Heading>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <Text className='text-charcoal/70 mb-0 font-medium'>Order Number:</Text>
                    <Text className='text-charcoal mb-0 font-semibold'>#{orderNumber}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='text-charcoal/70 mb-0 font-medium'>Tracking Number:</Text>
                    <Text className='text-charcoal mb-0 font-mono'>{trackingNumber}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='text-charcoal/70 mb-0 font-medium'>Carrier:</Text>
                    <Text className='text-charcoal mb-0 font-semibold'>{carrier}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='text-charcoal/70 mb-0 font-medium'>Estimated Delivery:</Text>
                    <Text className='text-equipment-yellow mb-0 font-semibold'>{estimatedDelivery}</Text>
                  </div>
                  <div className='border-stone-gray flex justify-between border-t pt-3'>
                    <Text className='text-charcoal/70 mb-0 font-medium'>Your Commission:</Text>
                    <Text className='mb-0 text-xl font-bold text-green-600'>{formatCurrency(commission)}</Text>
                  </div>
                </div>
              </Section>

              <Text className='text-charcoal mb-6 leading-relaxed'>
                Your commission will be included in your next weekly payout. Keep creating amazing content to drive more
                sales and grow your earnings!
              </Text>

              {/* CTA Buttons */}
              <Section className='space-y-3 text-center'>
                <Button
                  href={`https://www.${carrier.toLowerCase()}.com/tracking/${trackingNumber}`}
                  className='bg-forest-green mr-3 rounded-lg px-6 py-3 font-medium text-white hover:opacity-90'
                >
                  Track Package
                </Button>
                <Button
                  href='/dashboard/analytics'
                  className='border-forest-green text-forest-green hover:bg-light-concrete rounded-lg border bg-white px-6 py-3 font-medium'
                >
                  View Analytics
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className='border-stone-gray bg-light-concrete border-t px-8 py-4'>
              <Text className='text-charcoal mb-0 text-center text-sm'>
                Keep up the great work! 🚀
                <br />
                <strong>CreatorFlow Team</strong>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
