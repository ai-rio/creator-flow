'use client';

import { BuildingIcon, CheckIcon, CrownIcon, StarIcon, ZapIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

// Icon rendering function
const renderIcon = (iconName?: string, className = 'w-6 h-6') => {
  switch (iconName) {
    case 'zap':
      return <ZapIcon className={className} />;
    case 'star':
      return <StarIcon className={className} />;
    case 'crown':
      return <CrownIcon className={className} />;
    case 'building':
      return <BuildingIcon className={className} />;
    default:
      return <ZapIcon className={className} />;
  }
};

interface PricingTier {
  name: string;
  price: { monthly: number | string; annually: number | string };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  iconName?: string; // Changed from icon to iconName
}

interface Pricing5Props {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  billingToggle?: boolean;
  enterpriseContact?: boolean;
  guarantee?: string;
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: { monthly: 49, annually: 39 },
    description: 'Perfect for new TikTok Shop creators',
    iconName: 'zap',
    features: [
      'Up to 50 orders/day',
      'Basic TikTok Shop integration',
      'Standard shipping automation',
      'Email support',
      'Basic analytics dashboard',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Creator',
    price: { monthly: 99, annually: 79 },
    description: 'Most popular for growing creators',
    iconName: 'star',
    features: [
      'Up to 200 orders/day',
      'Advanced TikTok Shop features',
      'Multi-carrier shipping optimization',
      'Priority support',
      'Advanced analytics & insights',
      'Viral spike handling',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Pro',
    price: { monthly: 199, annually: 159 },
    description: 'For established creator businesses',
    iconName: 'crown',
    features: [
      'Up to 500 orders/day',
      'Premium TikTok Shop features',
      'Advanced shipping rules',
      '24/7 priority support',
      'Business intelligence suite',
      'API access',
      'Team collaboration tools',
      'White-label options',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annually: 'Custom' },
    description: 'For creator agencies & large brands',
    iconName: 'building',
    features: [
      'Unlimited orders',
      'Custom TikTok integrations',
      'Dedicated infrastructure',
      'Dedicated success manager',
      'Custom analytics & reporting',
      'SLA guarantees',
      'Advanced security features',
      'Multi-brand management',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function Pricing5({
  title = 'Choose Your Growth Plan',
  subtitle = 'Transparent pricing that scales with your TikTok Shop success',
  tiers = defaultTiers,
  billingToggle = true,
  enterpriseContact = true,
  guarantee = '30-day money-back guarantee',
  className = '',
}: Pricing5Props) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className={`mvp-pricing-5 bg-gradient-to-b from-background to-muted/20 py-20 ${className}`}>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='mb-16 text-center'>
          <h2 className='heading-executive mb-4 text-4xl md:text-5xl'>{title}</h2>
          <p className='mx-auto mb-8 max-w-3xl text-xl text-muted-foreground'>{subtitle}</p>

          {/* Billing Toggle */}
          {billingToggle && (
            <div className='mb-8 flex items-center justify-center gap-4'>
              <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-executive-500 focus:ring-offset-2 ${
                  isAnnual ? 'bg-executive-500' : 'bg-muted-foreground'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
                <span className='ml-1 font-semibold text-automation-500'>(Save 20%)</span>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                tier.popular
                  ? 'animate-authority-glow border-executive-500 bg-gradient-to-b from-executive-50 to-executive-100 shadow-executive'
                  : 'hover:border-executive-200 border-border bg-card'
              }`}
            >
              {tier.popular && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2 transform'>
                  <div className='rounded-full bg-executive-500 px-4 py-1 text-sm font-semibold text-white'>
                    Most Popular
                  </div>
                </div>
              )}

              {/* Tier Header */}
              <div className='mb-8 text-center'>
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    tier.popular ? 'bg-executive-500 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {renderIcon(tier.iconName)}
                </div>
                <h3 className='mb-2 text-2xl font-bold text-foreground'>{tier.name}</h3>
                <p className='text-sm text-muted-foreground'>{tier.description}</p>
              </div>

              {/* Price */}
              <div className='mb-8 text-center'>
                <div className='price-text'>
                  {typeof tier.price.monthly === 'number' ? (
                    <>
                      <span className='text-4xl font-bold text-foreground'>
                        ${isAnnual ? tier.price.annually : tier.price.monthly}
                      </span>
                      <span className='text-muted-foreground'>/month</span>
                      {isAnnual && typeof tier.price.annually === 'number' && (
                        <div className='mt-1 text-sm font-medium text-automation-500'>
                          ${((tier.price.monthly as number) - (tier.price.annually as number)) * 12} saved annually
                        </div>
                      )}
                    </>
                  ) : (
                    <span className='text-4xl font-bold text-foreground'>{tier.price.monthly}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className='mb-8 space-y-4'>
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className='flex items-start gap-3'>
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        tier.popular ? 'bg-executive-500' : 'bg-automation-500'
                      }`}
                    >
                      <CheckIcon className='h-3 w-3 text-white' />
                    </div>
                    <span className='text-sm text-foreground'>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  tier.popular
                    ? 'button-executive'
                    : tier.name === 'Enterprise'
                    ? 'bg-muted text-foreground hover:bg-muted/80'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                size='lg'
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        {guarantee && (
          <div className='mt-16 text-center'>
            <div className='inline-flex items-center gap-2 text-sm text-muted-foreground'>
              <CheckIcon className='h-4 w-4 text-automation-500' />
              {guarantee}
            </div>
          </div>
        )}

        {/* Enterprise Contact */}
        {enterpriseContact && (
          <div className='mt-8 text-center'>
            <p className='text-sm text-muted-foreground'>
              Need a custom solution?{' '}
              <Link href='/contact' className='font-medium text-executive-500 hover:text-executive-600'>
                Contact our sales team
              </Link>{' '}
              for enterprise pricing.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
