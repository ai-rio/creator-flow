'use client';

import { BuildingIcon,CheckIcon, CrownIcon, StarIcon, ZapIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface PricingTier {
  name: string;
  price: { monthly: number | string; annually: number | string };
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  icon?: React.ReactNode;
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
    icon: <ZapIcon className="w-6 h-6" />,
    features: [
      'Up to 50 orders/day',
      'Basic TikTok Shop integration',
      'Standard shipping automation',
      'Email support',
      'Basic analytics dashboard'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Creator',
    price: { monthly: 99, annually: 79 },
    description: 'Most popular for growing creators',
    icon: <StarIcon className="w-6 h-6" />,
    features: [
      'Up to 200 orders/day',
      'Advanced TikTok Shop features',
      'Multi-carrier shipping optimization',
      'Priority support',
      'Advanced analytics & insights',
      'Viral spike handling',
      'Custom branding'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Pro',
    price: { monthly: 199, annually: 159 },
    description: 'For established creator businesses',
    icon: <CrownIcon className="w-6 h-6" />,
    features: [
      'Up to 500 orders/day',
      'Premium TikTok Shop features',
      'Advanced shipping rules',
      '24/7 priority support',
      'Business intelligence suite',
      'API access',
      'Team collaboration tools',
      'White-label options'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annually: 'Custom' },
    description: 'For creator agencies & large brands',
    icon: <BuildingIcon className="w-6 h-6" />,
    features: [
      'Unlimited orders',
      'Custom TikTok integrations',
      'Dedicated infrastructure',
      'Dedicated success manager',
      'Custom analytics & reporting',
      'SLA guarantees',
      'Advanced security features',
      'Multi-brand management'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export function Pricing5({
  title = "Choose Your Growth Plan",
  subtitle = "Transparent pricing that scales with your TikTok Shop success",
  tiers = defaultTiers,
  billingToggle = true,
  enterpriseContact = true,
  guarantee = "30-day money-back guarantee",
  className = ""
}: Pricing5Props) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className={`mvp-pricing-5 py-20 bg-gradient-to-b from-background to-muted/20 ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-executive text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>

          {/* Billing Toggle */}
          {billingToggle && (
            <div className="flex items-center justify-center gap-4 mb-8">
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
                <span className="ml-1 text-automation-500 font-semibold">(Save 20%)</span>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card relative rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                tier.popular
                  ? 'border-executive-500 bg-gradient-to-b from-executive-50 to-executive-100 shadow-executive animate-authority-glow'
                  : 'border-border bg-card hover:border-executive-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-executive-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  tier.popular 
                    ? 'bg-executive-500 text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="price-text">
                  {typeof tier.price.monthly === 'number' ? (
                    <>
                      <span className="text-4xl font-bold text-foreground">
                        ${isAnnual ? tier.price.annually : tier.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                      {isAnnual && typeof tier.price.annually === 'number' && (
                        <div className="text-sm text-automation-500 font-medium mt-1">
                          ${((tier.price.monthly as number) - (tier.price.annually as number)) * 12} saved annually
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-foreground">
                      {tier.price.monthly}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      tier.popular 
                        ? 'bg-executive-500' 
                        : 'bg-automation-500'
                    }`}>
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  tier.popular
                    ? 'button-executive'
                    : tier.name === 'Enterprise'
                    ? 'bg-muted hover:bg-muted/80 text-foreground'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                size="lg"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        {guarantee && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CheckIcon className="w-4 h-4 text-automation-500" />
              {guarantee}
            </div>
          </div>
        )}

        {/* Enterprise Contact */}
        {enterpriseContact && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Need a custom solution?{' '}
              <Link href="/contact" className="text-executive-500 hover:text-executive-600 font-medium">
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