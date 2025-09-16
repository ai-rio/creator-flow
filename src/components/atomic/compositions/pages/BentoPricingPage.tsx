'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

// Magic UI imports
import NumberTicker from '@/components/magicui/number-ticker';
import Particles from '@/components/magicui/particles';
// UI component imports
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

// Atomic component imports
import { BentoCard, BentoGrid, BentoSection } from '../layouts/BentoGrid';

// ==================== TYPE DEFINITIONS ====================

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  orderLimit: number;
  highlighted?: boolean;
  buttonText: string;
  buttonVariant?: 'default' | 'outline';
}

export interface BentoPricingPageProps {
  className?: string;
}

// ==================== PRICING DATA ====================

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    currency: 'USD',
    period: 'month',
    description: 'Perfect for testing the waters',
    orderLimit: 100,
    features: [
      'Up to 100 orders/month',
      'Basic TikTok Shop integration',
      'Email support',
      'Standard shipping labels',
      'Basic analytics',
    ],
    buttonText: 'Start Free',
    buttonVariant: 'outline',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    currency: 'USD',
    period: 'month',
    description: 'Most popular for growing creators',
    orderLimit: 5000,
    highlighted: true,
    features: [
      'Up to 5,000 orders/month',
      'Advanced TikTok Shop integration',
      'Priority support',
      'Bulk shipping labels',
      'Advanced analytics & insights',
      'Viral tracking alerts',
      'Inventory management',
      'Multi-platform sync',
    ],
    buttonText: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    currency: 'USD',
    period: 'month',
    description: 'For high-volume viral creators',
    orderLimit: 50000,
    features: [
      'Unlimited orders',
      'White-label fulfillment',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced reporting suite',
      'Real-time viral scaling',
      'Custom shipping workflows',
      'API access',
      'Phone support',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline',
  },
];

// ==================== PRICING HERO BENTO ====================

const PricingHeroBento: React.FC = () => {
  return (
    <div className='relative h-full overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0'>
        <Particles className='absolute inset-0' quantity={30} ease={80} color='#a855f7' />
        <div className='absolute inset-0 bg-gradient-to-br from-brand-purple-500/10 via-transparent to-brand-teal-500/10' />
      </div>

      {/* Hero content */}
      <div className='relative z-10 flex h-full flex-col justify-center p-8 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className='mb-4 text-4xl font-bold text-foreground lg:text-6xl'>
            Simple
            <br />
            <span className='bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 bg-clip-text text-transparent'>
              Pricing
            </span>
          </h1>
          <p className='mx-auto mb-8 max-w-md text-lg text-muted-foreground'>
            Start free and scale with usage. No hidden fees, no surprises.
          </p>
          <div className='flex items-center justify-center gap-2'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className='h-5 w-5 fill-amber-400 text-amber-400' />
              ))}
            </div>
            <span className='text-sm text-muted-foreground'>Trusted by 2,500+ creators</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== PRICING CARD COMPONENT ====================

const PricingCard: React.FC<{ tier: PricingTier; index: number }> = ({ tier, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn(
        'relative rounded-lg border p-6',
        tier.highlighted
          ? 'bg-brand-purple-50/50 dark:bg-brand-purple-950/20 border-brand-purple-500 shadow-lg'
          : 'border-border bg-card'
      )}
    >
      {tier.highlighted && (
        <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-purple-500'>Most Popular</Badge>
      )}

      <div className='mb-6'>
        <h3 className='text-xl font-bold text-foreground'>{tier.name}</h3>
        <p className='text-sm text-muted-foreground'>{tier.description}</p>
      </div>

      <div className='mb-6'>
        <div className='flex items-baseline'>
          <span className='text-4xl font-bold text-foreground'>{tier.price === 0 ? 'Free' : `$${tier.price}`}</span>
          {tier.price > 0 && <span className='ml-1 text-muted-foreground'>/{tier.period}</span>}
        </div>
        <p className='text-sm text-muted-foreground'>
          Up to <NumberTicker value={tier.orderLimit} /> orders/month
        </p>
      </div>

      <ul className='mb-8 space-y-3'>
        {tier.features.map((feature) => (
          <li key={feature} className='flex items-start gap-3'>
            <Check className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
            <span className='text-sm text-foreground'>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={cn('w-full', tier.highlighted && 'bg-brand-purple-500 hover:bg-brand-purple-600')}
        variant={tier.buttonVariant}
      >
        {tier.buttonText}
        {tier.id !== 'enterprise' && <ArrowRight className='ml-2 h-4 w-4' />}
      </Button>
    </motion.div>
  );
};

// ==================== PRICING COMPARISON TABLE ====================

const ComparisonTable: React.FC = () => {
  const comparisonFeatures = [
    {
      category: 'Order Management',
      features: [
        { name: 'Monthly order limit', starter: '100', pro: '5,000', enterprise: 'Unlimited' },
        { name: 'Bulk processing', starter: false, pro: true, enterprise: true },
        { name: 'Priority handling', starter: false, pro: true, enterprise: true },
      ],
    },
    {
      category: 'Integrations',
      features: [
        { name: 'TikTok Shop', starter: true, pro: true, enterprise: true },
        { name: 'Multi-platform sync', starter: false, pro: true, enterprise: true },
        { name: 'Custom integrations', starter: false, pro: false, enterprise: true },
      ],
    },
    {
      category: 'Support',
      features: [
        { name: 'Email support', starter: true, pro: true, enterprise: true },
        { name: 'Priority support', starter: false, pro: true, enterprise: true },
        { name: 'Phone support', starter: false, pro: false, enterprise: true },
        { name: 'Dedicated manager', starter: false, pro: false, enterprise: true },
      ],
    },
  ];

  return (
    <div className='space-y-8 p-6'>
      <div className='text-center'>
        <h3 className='mb-2 text-xl font-bold text-foreground'>Feature Comparison</h3>
        <p className='text-muted-foreground'>Compare all features across plans</p>
      </div>

      <div className='space-y-6'>
        {comparisonFeatures.map((category) => (
          <div key={category.category}>
            <h4 className='mb-3 font-semibold text-foreground'>{category.category}</h4>
            <div className='space-y-2'>
              {category.features.map((feature) => (
                <div key={feature.name} className='grid grid-cols-4 gap-4 rounded-lg bg-muted/30 p-3 text-sm'>
                  <div className='font-medium text-foreground'>{feature.name}</div>
                  <div className='text-center'>
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <Check className='h-4 w-4 text-green-500' />
                      ) : (
                        <span className='text-muted-foreground'>-</span>
                      )
                    ) : (
                      <span className='text-foreground'>{feature.starter}</span>
                    )}
                  </div>
                  <div className='text-center'>
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className='h-4 w-4 text-green-500' />
                      ) : (
                        <span className='text-muted-foreground'>-</span>
                      )
                    ) : (
                      <span className='text-foreground'>{feature.pro}</span>
                    )}
                  </div>
                  <div className='text-center'>
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <Check className='h-4 w-4 text-green-500' />
                      ) : (
                        <span className='text-muted-foreground'>-</span>
                      )
                    ) : (
                      <span className='text-foreground'>{feature.enterprise}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== FAQ SECTION ====================

const FAQBento: React.FC = () => {
  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'What happens if I exceed my order limit?',
      answer: "We'll send you a notification and offer upgrade options. Your service continues uninterrupted.",
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, Pro and Enterprise plans include a 14-day free trial with full access to all features.',
    },
  ];

  return (
    <div className='space-y-6 p-6'>
      <div className='text-center'>
        <h3 className='mb-2 text-xl font-bold text-foreground'>Frequently Asked Questions</h3>
        <p className='text-muted-foreground'>Quick answers to common questions</p>
      </div>

      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='rounded-lg bg-muted/30 p-4'
          >
            <h4 className='mb-2 font-semibold text-foreground'>{faq.question}</h4>
            <p className='text-sm text-muted-foreground'>{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ==================== MAIN PRICING PAGE COMPONENT ====================

/**
 * Bento grid pricing page layout for CreatorFlow
 * Mobile-first responsive design with conversion optimization
 * Includes pricing tiers, feature comparison, and FAQ
 */
export const BentoPricingPage: React.FC<BentoPricingPageProps> = ({ className }) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm'
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Zap className='h-6 w-6 text-brand-teal-600 dark:text-brand-teal-400' />
              <span className='text-lg font-bold text-foreground'>CreatorFlow</span>
            </div>
            <div className='flex items-center gap-4'>
              <Button variant='ghost' size='sm'>
                Login
              </Button>
              <Button size='sm'>Sign Up</Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Bento Grid */}
      <BentoSection
        title='Choose Your Perfect Plan'
        subtitle='Start free and scale with your success'
        className='container mx-auto px-4'
      >
        <BentoGrid>
          {/* Pricing Hero */}
          <BentoCard size='hero' className='lg:col-span-2' delay={0.1}>
            <PricingHeroBento />
          </BentoCard>

          {/* Social Proof */}
          <BentoCard
            name='Creator Success'
            description='Join successful creators'
            size='medium'
            delay={0.2}
            icon={Users}
          >
            <div className='space-y-4 p-6'>
              <div className='text-center'>
                <div className='mb-2 text-3xl font-bold text-brand-teal-600'>
                  <NumberTicker value={2500} />+
                </div>
                <p className='text-sm text-muted-foreground'>Active Creators</p>
              </div>
              <div className='text-center'>
                <div className='mb-2 text-3xl font-bold text-brand-purple-600'>
                  <NumberTicker value={850} />
                  K+
                </div>
                <p className='text-sm text-muted-foreground'>Orders Processed</p>
              </div>
            </div>
          </BentoCard>

          {/* Performance Stats */}
          <BentoCard
            name='Platform Performance'
            description='Proven results'
            size='medium'
            delay={0.3}
            icon={TrendingUp}
          >
            <div className='space-y-4 p-6'>
              <div className='text-center'>
                <div className='mb-2 text-3xl font-bold text-emerald-600'>
                  <NumberTicker value={92} />%
                </div>
                <p className='text-sm text-muted-foreground'>Time Saved</p>
              </div>
              <div className='text-center'>
                <div className='mb-2 text-3xl font-bold text-amber-600'>
                  <NumberTicker value={98.7} decimalPlaces={1} />%
                </div>
                <p className='text-sm text-muted-foreground'>Uptime</p>
              </div>
            </div>
          </BentoCard>
        </BentoGrid>
      </BentoSection>

      {/* Pricing Cards Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='grid gap-8 md:grid-cols-3'>
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>
      </section>

      {/* Additional Bento Content */}
      <BentoSection title='Everything You Need to Know' className='container mx-auto px-4'>
        <BentoGrid>
          {/* Feature Comparison */}
          <BentoCard
            name='Feature Comparison'
            description='Compare all plans side by side'
            size='wide'
            className='lg:col-span-2'
            delay={0.1}
          >
            <ComparisonTable />
          </BentoCard>

          {/* FAQ */}
          <BentoCard name='FAQ' description='Common questions answered' size='medium' delay={0.2}>
            <FAQBento />
          </BentoCard>
        </BentoGrid>
      </BentoSection>

      {/* Call to Action Section */}
      <section className='container mx-auto px-4 py-16 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='mb-4 text-3xl font-bold text-foreground lg:text-4xl'>Ready to Scale Your TikTok Shop?</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground'>
            Join thousands of creators who have automated their fulfillment and scaled their businesses.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button size='lg' className='bg-brand-purple-500 hover:bg-brand-purple-600'>
              Start Your Free Trial
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='outline' size='lg'>
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BentoPricingPage;
