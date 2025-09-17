/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Moon, Sun } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Theme Context & Provider
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Data for Pricing Tiers
const pricingData = [
  {
    name: 'Launch',
    price: 49,
    description: 'For the solo creator taking flight.',
    features: ['500 Orders/Mo', 'Basic Automation', 'Community Support'],
    color: 'purple',
  },
  {
    name: 'Ascend',
    price: 99,
    description: 'The command center for scaling your empire.',
    features: ['2,000 Orders/Mo', 'Advanced Automation', 'AI Insights', 'Priority Support'],
    color: 'blue',
    recommended: true,
  },
  {
    name: 'Galaxy',
    price: 199,
    description: 'For established brands dominating their market.',
    features: ['10,000 Orders/Mo', 'Full Automation Suite', 'API Access', 'Dedicated Agent'],
    color: 'teal',
  },
];

// Color mappings to design tokens
const colorVariants = {
  purple: {
    base: 'bg-brand-purple-primary',
    hover: 'hover:bg-brand-purple-secondary',
    glow: 'shadow-brand-purple-glow',
    text: 'text-brand-purple-primary',
  },
  blue: {
    base: 'bg-brand-blue-primary',
    hover: 'hover:bg-brand-blue-secondary',
    glow: 'shadow-brand-blue-glow',
    text: 'text-brand-blue-primary',
  },
  teal: {
    base: 'bg-brand-teal-primary',
    hover: 'hover:bg-brand-teal-secondary',
    glow: 'shadow-brand-teal-glow',
    text: 'text-brand-teal-primary',
  },
};

// Main Component
const HPPricingTiers = () => {
  const [billingCycle, setBillingCycle] = useState<string>('monthly');

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <Starfield />
      <div className='relative z-10'>
        <section className='flex min-h-screen w-full flex-col items-center justify-center p-tactical'>
          <div className='mb-command text-center'>
            <h2 className='bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-heading-xl font-extrabold tracking-tight text-transparent'>
              Find Your Orbit.
            </h2>
            <p className='mx-auto mt-tactical max-w-content text-body-lg text-muted-foreground'>
              Select the perfect plan to propel your brand from a single spark to a galactic presence.
            </p>
          </div>

          <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

          <div className='mt-command flex flex-col items-center justify-center gap-strategic md:flex-row'>
            {pricingData.map((plan, i) => (
              <PricingCard key={plan.name} {...plan} billingCycle={billingCycle} index={i} />
            ))}
          </div>
        </section>
      </div>
      <ThemeToggleButton />
    </div>
  );
};

// Billing Toggle Component
const BillingToggle = ({ billingCycle, setBillingCycle }: any) => (
  <div className='flex items-center gap-tactical rounded-premium border border-border bg-card/50 p-tactical backdrop-blur-lg'>
    <button
      onClick={() => setBillingCycle('monthly')}
      className='relative rounded-premium px-tactical py-tactical text-body-sm font-semibold text-foreground'
    >
      {billingCycle === 'monthly' && (
        <motion.div layoutId='billing-pill' className='absolute inset-0 rounded-premium bg-muted' />
      )}
      <span className='relative'>Monthly</span>
    </button>
    <button
      onClick={() => setBillingCycle('yearly')}
      className='relative flex items-center gap-tactical rounded-premium px-tactical py-tactical text-body-sm font-semibold text-foreground'
    >
      {billingCycle === 'yearly' && (
        <motion.div layoutId='billing-pill' className='absolute inset-0 rounded-premium bg-muted' />
      )}
      <span className='relative'>Yearly</span>
      <motion.div
        className='bg-success/20 text-body-xs text-success relative rounded-premium px-tactical py-1'
        animate={{ scale: billingCycle === 'yearly' ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Save 20%
      </motion.div>
    </button>
  </div>
);

// Pricing Card Component
const PricingCard: React.FC<any> = ({
  name,
  price,
  description,
  features,
  recommended,
  color,
  billingCycle,
  index,
}: any) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const colorVariant = colorVariants[color as keyof typeof colorVariants];
  const yearlyPrice = Math.round(price * 12 * 0.8);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.2 * index }}
      className='relative h-[420px] w-[320px]'
    >
      {recommended && (
        <div className='from-brand-blue-primary to-brand-purple-primary text-body-xs absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-premium bg-gradient-to-r px-tactical py-1 font-semibold text-white'>
          Most Popular
        </div>
      )}

      <Card className='h-full'>
        <motion.div
          className={`absolute inset-0 rounded-executive border border-border bg-card/50 backdrop-blur-xl ${
            isHovered ? colorVariant.glow : ''
          }`}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />

        <CardContent className='relative flex h-full flex-col justify-between p-strategic'>
          <div>
            <CardHeader className='p-0'>
              <CardTitle className='text-heading-lg text-foreground'>{name}</CardTitle>
              <CardDescription className='text-body-md text-muted-foreground'>{description}</CardDescription>
            </CardHeader>

            <div className='text-metric-xl mt-tactical flex items-baseline font-extrabold text-foreground'>
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
              <span className='text-body-lg text-muted-foreground'>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
          </div>

          <motion.ul className='space-y-tactical'>
            {features.map((feature: any, i: any) => (
              <motion.li
                key={i}
                className='flex items-center gap-tactical text-body-sm text-foreground'
                initial={{ opacity: 0.5 }}
                animate={{ opacity: isHovered ? 1 : 0.5 }}
                transition={{ delay: i * 0.1 }}
              >
                <Check className={`h-icon-sm w-icon-sm ${colorVariant.text}`} />
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          <Button
            className={`mt-tactical w-full rounded-premium py-tactical font-bold text-white ${colorVariant.base} ${colorVariant.hover}`}
          >
            Start your 14 day trial
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Starfield Background Component
const Starfield = () => (
  <motion.div
    className='fixed inset-0 z-0'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
  >
    <svg width='100%' height='100%' className='absolute inset-0'>
      {Array.from({ length: 150 }).map((_, i) => {
        const cx = (i * 37) % 100;
        const cy = (i * 73) % 100;
        const r = (i % 4) * 0.25 + 0.25;
        const duration = (i % 5) + 5;
        return (
          <motion.circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r={r}
            fill='currentColor'
            className='text-muted-foreground/30'
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
    </svg>
  </motion.div>
);

// Theme Toggle Button
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed right-tactical top-tactical z-header flex h-12 w-12 items-center justify-center rounded-premium border border-border bg-card/50 text-foreground backdrop-blur-xl'
      aria-label='Toggle theme'
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? <Sun className='h-icon-md w-icon-md' /> : <Moon className='h-icon-md w-icon-md' />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

// Export wrapper
const AppContent = () => {
  return <HPPricingTiers />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
