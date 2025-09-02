import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import tailwindConfig from '../tailwind.config';

interface PerformanceData {
  period: string;
  views: number;
  orders: number;
  revenue: number;
  conversionRate: number;
}

interface PerformanceReportEmailProps {
  creatorName: string;
  reportPeriod: string;
  totalRevenue: number;
  totalOrders: number;
  totalViews: number;
  avgConversionRate: number;
  topPerformingContent: string;
  monthlyData: PerformanceData[];
}

export function PerformanceReportEmail({ 
  creatorName, 
  reportPeriod, 
  totalRevenue, 
  totalOrders, 
  totalViews, 
  avgConversionRate, 
  topPerformingContent,
  monthlyData 
}: PerformanceReportEmailProps) {
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
      <Preview>Your {reportPeriod} performance report - {formatCurrency(totalRevenue)} earned!</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className='mx-auto my-auto bg-light-concrete px-2 py-10 font-sans'>
          <Container className='mx-auto mt-[40px] w-[580px] overflow-hidden rounded-lg bg-paper-white shadow-lg'>
            {/* Header */}
            <Section className='bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-8'>
              <Heading className='mb-2 text-center text-[32px] font-bold text-white'>
                📈 Performance Report
              </Heading>
              <Text className='mb-0 text-center text-lg text-white/90'>
                {reportPeriod} Summary
              </Text>
            </Section>

            {/* Main Content */}
            <Section className='px-8 py-6'>
              <Heading className='mb-4 text-xl font-semibold text-charcoal'>
                Hi {creatorName}! 👋
              </Heading>
              
              <Text className='mb-6 text-charcoal leading-relaxed'>
                Here's your comprehensive performance report for <strong>{reportPeriod}</strong>. 
                You've made incredible progress in growing your creator business!
              </Text>

              {/* Key Metrics */}
              <Section className='mb-6 rounded-lg border border-stone-gray bg-light-concrete p-6'>
                <Heading className='mb-4 text-lg font-semibold text-forest-green'>
                  Key Metrics 🎯
                </Heading>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center'>
                    <Text className='mb-1 text-2xl font-bold text-green-600'>{formatCurrency(totalRevenue)}</Text>
                    <Text className='mb-0 text-sm text-charcoal/70'>Total Revenue</Text>
                  </div>
                  <div className='text-center'>
                    <Text className='mb-1 text-2xl font-bold text-blue-600'>{totalOrders}</Text>
                    <Text className='mb-0 text-sm text-charcoal/70'>Orders Generated</Text>
                  </div>
                  <div className='text-center'>
                    <Text className='mb-1 text-2xl font-bold text-purple-600'>{formatNumber(totalViews)}</Text>
                    <Text className='mb-0 text-sm text-charcoal/70'>Total Views</Text>
                  </div>
                  <div className='text-center'>
                    <Text className='mb-1 text-2xl font-bold text-equipment-yellow'>{avgConversionRate}%</Text>
                    <Text className='mb-0 text-sm text-charcoal/70'>Avg Conversion</Text>
                  </div>
                </div>
              </Section>

              {/* Top Performing Content */}
              <Section className='mb-6 rounded-lg border border-purple-200 bg-purple-50 p-6'>
                <Heading className='mb-3 text-lg font-semibold text-purple-700'>
                  🏆 Top Performing Content
                </Heading>
                <Text className='mb-0 font-medium text-charcoal'>
                  "{topPerformingContent}"
                </Text>
                <Text className='mb-0 text-sm text-charcoal/70 mt-2'>
                  This content generated the highest conversion rate this period!
                </Text>
              </Section>

              {/* Monthly Breakdown */}
              <Section className='mb-6 rounded-lg border border-stone-gray bg-white p-6'>
                <Heading className='mb-4 text-lg font-semibold text-forest-green'>
                  Monthly Breakdown 📊
                </Heading>
                <div className='space-y-3'>
                  {monthlyData.map((month, index) => (
                    <div key={index} className='flex justify-between items-center border-b border-stone-gray/20 pb-2'>
                      <div>
                        <Text className='mb-0 font-medium text-charcoal'>{month.period}</Text>
                        <Text className='mb-0 text-sm text-charcoal/70'>
                          {formatNumber(month.views)} views • {month.orders} orders
                        </Text>
                      </div>
                      <div className='text-right'>
                        <Text className='mb-0 font-bold text-green-600'>{formatCurrency(month.revenue)}</Text>
                        <Text className='mb-0 text-sm text-charcoal/70'>{month.conversionRate}% conv.</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Insights */}
              <Section className='mb-6 rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <Heading className='mb-3 text-lg font-semibold text-blue-700'>
                  💡 Insights & Recommendations
                </Heading>
                <div className='space-y-2'>
                  <Text className='mb-0 text-sm text-charcoal'>
                    • Your conversion rate improved by 15% compared to last period
                  </Text>
                  <Text className='mb-0 text-sm text-charcoal'>
                    • Content posted on weekends performs 23% better
                  </Text>
                  <Text className='mb-0 text-sm text-charcoal'>
                    • Consider creating more content similar to your top performer
                  </Text>
                </div>
              </Section>

              {/* CTA Button */}
              <Section className='text-center'>
                <Button
                  href='/dashboard/analytics'
                  className='rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white hover:opacity-90'
                >
                  View Full Analytics
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className='border-t border-stone-gray bg-light-concrete px-8 py-4'>
              <Text className='mb-2 text-center text-sm text-charcoal'>
                Keep up the amazing work! 🚀<br />
                <strong>CreatorFlow Analytics Team</strong>
              </Text>
              <Text className='mb-0 text-center text-xs text-charcoal/70'>
                Want to customize your reports? Visit your dashboard settings
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
