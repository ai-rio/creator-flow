'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Card } from '@/components/ui/card';

// --- Types ---
interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  color: 'purple' | 'blue' | 'teal';
  recommended?: boolean;
}

interface PricingCardProps extends PricingPlan {
  billingCycle: 'monthly' | 'yearly';
  index: number;
}

// --- Color Palette ---
const colors = {
  blue: { base: '#3b82f6', light: '#60a5fa', dark: '#2563eb', glow: 'rgba(59, 130, 246, 0.5)' },
  purple: { base: '#8b5cf6', light: '#c084fc', dark: '#7c3aed', glow: 'rgba(139, 92, 246, 0.5)' },
  teal: { base: '#14b8a6', light: '#2dd4bf', dark: '#0d9488', glow: 'rgba(20, 184, 166, 0.5)' },
};

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// --- Billing Toggle Component ---
const BillingToggle = ({
  billingCycle,
  setBillingCycle,
}: {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}) => {
  const t = useTranslations('components.atomic.organisms.HP070PricingTiers.billing');

  return (
    <div className='flex items-center gap-2 rounded-full border border-border bg-muted/50 p-1 backdrop-blur-lg'>
      <button
        onClick={() => setBillingCycle('monthly')}
        className='relative rounded-full px-4 py-2 text-sm font-semibold text-foreground'
      >
        {billingCycle === 'monthly' && (
          <motion.div layoutId='billing-pill' className='absolute inset-0 rounded-full bg-background shadow-sm' />
        )}
        <span className='relative'>{t('monthly')}</span>
      </button>
      <button
        onClick={() => setBillingCycle('yearly')}
        className='relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-foreground'
      >
        {billingCycle === 'yearly' && (
          <motion.div layoutId='billing-pill' className='absolute inset-0 rounded-full bg-background shadow-sm' />
        )}
        <span className='relative'>{t('yearly')}</span>
        <motion.div
          className='relative rounded-full bg-green-200/50 px-2 py-0.5 text-xs text-green-800 dark:bg-green-500/30 dark:text-green-200'
          animate={{ scale: billingCycle === 'yearly' ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {t('save')}
        </motion.div>
      </button>
    </div>
  );
};

// --- Pricing Card Component ---
const PricingCard = ({
  name,
  price,
  description,
  features,
  recommended,
  color,
  billingCycle,
  index,
}: PricingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations('components.atomic.organisms.HP070PricingTiers');
  const accentColor = colors[color];

  const yearlyPrice = Math.round(price * 12 * 0.8);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={cardVariants}
      className='relative w-full max-w-[320px]'
      style={{ transform: 'translate3d(0, 0, 0)' }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {recommended && (
        <div className='absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white'>
          {t('mostPopular')}
        </div>
      )}

      <Card className='relative h-[420px] border-border/50 bg-card/30 p-6 backdrop-blur-2xl'>
        <motion.div
          className='absolute inset-0 rounded-lg opacity-0'
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered ? `0 0 40px -10px ${accentColor.glow}` : `0 0 0px 0px rgba(0,0,0,0)`,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />

        <div className='relative flex h-full flex-col justify-between'>
          <div>
            <h3 className='text-2xl font-bold text-foreground'>{t(`plans.${name.toLowerCase()}.name`)}</h3>
            <p className='mt-1 text-sm text-muted-foreground'>{t(`plans.${name.toLowerCase()}.description`)}</p>
            <div className='mt-4 flex items-baseline text-4xl font-extrabold text-foreground'>
              <AnimatePresence mode='wait'>
                <motion.span
                  key={billingCycle}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  ${billingCycle === 'monthly' ? price : yearlyPrice}
                </motion.span>
              </AnimatePresence>
              <span className='text-lg text-muted-foreground'>
                /{billingCycle === 'monthly' ? t('billing.perMonth') : t('billing.perYear')}
              </span>
            </div>
          </div>

          <motion.ul className='my-6 space-y-2'>
            {features.map((feature, i) => (
              <motion.li
                key={i}
                className='flex items-center gap-2 text-sm text-foreground'
                initial={{ opacity: 0.5 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                transition={{ delay: i * 0.1 }}
              >
                <Check className='h-4 w-4 flex-shrink-0' style={{ color: accentColor.light }} />
                {t(`plans.${name.toLowerCase()}.features.${i}`)}
              </motion.li>
            ))}
          </motion.ul>

          <motion.button
            className='w-full rounded-lg py-3 font-semibold text-white'
            style={{ backgroundColor: accentColor.base }}
            whileHover={{ backgroundColor: accentColor.dark, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {t('cta')}
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

// --- Main Component ---
export const HP070PricingTiers = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const t = useTranslations('components.atomic.organisms.HP070PricingTiers');

  const pricingData: PricingPlan[] = [
    {
      name: 'Launch',
      price: 49,
      description: '',
      features: ['500 Orders/Mo', 'Basic Automation', 'Community Support'],
      color: 'purple',
    },
    {
      name: 'Ascend',
      price: 99,
      description: '',
      features: ['2,000 Orders/Mo', 'Advanced Automation', 'AI Insights', 'Priority Support'],
      color: 'blue',
      recommended: true,
    },
    {
      name: 'Galaxy',
      price: 199,
      description: '',
      features: ['10,000 Orders/Mo', 'Full Automation Suite', 'API Access', 'Dedicated Agent'],
      color: 'teal',
    },
  ];

  return (
    <section className='relative bg-gradient-to-br from-background via-background to-muted/10 py-16 sm:py-24'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl'>
            {t('title')}
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-base text-muted-foreground'>{t('subtitle')}</p>
        </motion.div>

        <div className='mb-12 flex justify-center'>
          <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        </div>

        <motion.div
          className='flex flex-col items-center justify-center gap-8 md:flex-row'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {pricingData.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} billingCycle={billingCycle} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
