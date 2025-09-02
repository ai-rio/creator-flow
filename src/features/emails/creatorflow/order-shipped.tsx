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
  commission 
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
      <Preview>Order #{orderNumber} shipped - You earned {formatCurrency(commission)}!</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-light-concrete px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[580px] overflow-hidden rounded-lg bg-paper-white shadow-lg'>
            {/* Header */}
            <Section className='bg-gradient-to-r from-green-500 to-blue-600 px-8 py-6'>
              <Heading className='mb-2 text-center text-[32px] font-bold text-white'>
                📦 Order Shipped!
              </Heading>
              <Text className='mb-0 text-center text-lg text-white/90'>
                Another successful sale from your TikTok content
              </Text>
            </Section>

            {/* Main Content */}
            <Section className='px-8 py-6'>
              <Heading className='mb-4 text-xl font-semibold text-charcoal'>
                Great news, {creatorName}! 🎉
              </Heading>
              
              <Text className='mb-6 text-charcoal leading-relaxed'>
                Order <strong>#{orderNumber}</strong> from your TikTok campaign has been shipped to {customerName}. 
                You've earned <strong>{formatCurrency(commission)}</strong> in commission!
              </Text>

              {/* Order Details */}
              <Section className='mb-6 rounded-lg border border-stone-gray bg-light-concrete p-6'>
                <Heading className='mb-4 text-lg font-semibold text-forest-green'>
                  Shipping Details 📋
                </Heading>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <Text className='mb-0 font-medium text-charcoal/70'>Order Number:</Text>
                    <Text className='mb-0 font-semibold text-charcoal'>#{orderNumber}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='mb-0 font-medium text-charcoal/70'>Tracking Number:</Text>
                    <Text className='mb-0 font-mono text-charcoal'>{trackingNumber}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='mb-0 font-medium text-charcoal/70'>Carrier:</Text>
                    <Text className='mb-0 font-semibold text-charcoal'>{carrier}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text className='mb-0 font-medium text-charcoal/70'>Estimated Delivery:</Text>
                    <Text className='mb-0 font-semibold text-equipment-yellow'>{estimatedDelivery}</Text>
                  </div>
                  <div className='flex justify-between border-t border-stone-gray pt-3'>
                    <Text className='mb-0 font-medium text-charcoal/70'>Your Commission:</Text>
                    <Text className='mb-0 text-xl font-bold text-green-600'>{formatCurrency(commission)}</Text>
                  </div>
                </div>
              </Section>

              <Text className='mb-6 text-charcoal leading-relaxed'>
                Your commission will be included in your next weekly payout. Keep creating amazing content 
                to drive more sales and grow your earnings!
              </Text>

              {/* CTA Buttons */}
              <Section className='text-center space-y-3'>
                <Button
                  href={`https://www.${carrier.toLowerCase()}.com/tracking/${trackingNumber}`}
                  className='mr-3 rounded-lg bg-forest-green px-6 py-3 font-medium text-white hover:opacity-90'
                >
                  Track Package
                </Button>
                <Button
                  href='/dashboard/analytics'
                  className='rounded-lg border border-forest-green bg-white px-6 py-3 font-medium text-forest-green hover:bg-light-concrete'
                >
                  View Analytics
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className='border-t border-stone-gray bg-light-concrete px-8 py-4'>
              <Text className='mb-0 text-center text-sm text-charcoal'>
                Keep up the great work! 🚀<br />
                <strong>CreatorFlow Team</strong>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
