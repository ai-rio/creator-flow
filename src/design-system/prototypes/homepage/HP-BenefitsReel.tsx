/* eslint-disable */
'use client';

import { animate, AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { PackageCheck, ShieldCheck, Zap } from 'lucide-react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

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

// Benefits Data
const benefits = [
  {
    Icon: ShieldCheck,
    title: 'Automation Savings',
    description:
      'Save an average of $27,000/month in operational costs with a fully automated order and shipping workflow.',
    value: 27000,
    prefix: '$',
    suffix: '/mo',
    color: 'success',
  },
  {
    Icon: PackageCheck,
    title: 'Inventory Accuracy',
    description: 'Prevent $8,400/month in costly oversells with real-time, sub-5-second inventory tracking.',
    value: 8400,
    prefix: '$',
    suffix: '/mo',
    color: 'brand-purple',
  },
  {
    Icon: Zap,
    title: 'Processing Speed',
    description: 'Reduce order import times from 12 minutes down to 30 seconds.',
    value: 24,
    prefix: '24x',
    suffix: 'Faster',
    color: 'brand-teal',
  },
];

// Main Benefits Reel Component
const HPBenefitsReel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest: any) => {
      const newIndex = Math.min(Math.floor(latest * benefits.length), benefits.length - 1);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  const colors = {
    success: 'rgba(74, 222, 128, 0.15)',
    'brand-purple': 'rgba(168, 85, 247, 0.15)',
    'brand-teal': 'rgba(59, 130, 246, 0.15)',
  };

  const backgroundGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [colors.success, colors['brand-purple'], colors['brand-teal']]
  );

  return (
    <section ref={targetRef} className='relative' style={{ height: '300vh' }}>
      <div className='sticky top-0 flex min-h-screen items-center justify-center overflow-hidden'>
        {/* Background Glow */}
        <motion.div
          style={{
            boxShadow: `0 0 150px 70px ${backgroundGlow.get()}`,
            transition: 'box-shadow 0.5s ease-out',
          }}
          className='absolute inset-0 h-full w-full'
        />

        {/* Content */}
        <div className='relative flex flex-col items-center px-header-padding text-center'>
          <h2 className='mb-benefits-title bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-5xl'>
            Automate Operations. Amplify Revenue.
          </h2>
          <p className='mx-auto mb-benefits-description max-w-2xl text-base text-muted-foreground'>
            CreatorFlow isn&apos;t just a tool—it&apos;s a measurable competitive advantage. See the real-world impact
            on your bottom line.
          </p>
          <AnimatePresence mode='wait'>
            <BenefitCard key={activeIndex} data={benefits[activeIndex]} />
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className='absolute right-benefits-progress top-1/2 flex -translate-y-1/2 flex-col gap-header-gap'>
          {benefits.map((_, i) => (
            <div key={i} className='h-2 w-2 rounded-full bg-muted transition-colors'>
              <motion.div
                className='h-full w-full rounded-full bg-foreground'
                initial={{ scale: 0 }}
                animate={{ scale: activeIndex === i ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefit Card Sub-Component
const BenefitCard: React.FC<any> = ({ data }: any) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
        };
      case 'brand-purple':
        return {
          bg: 'bg-brand-purple-500/10',
          text: 'text-brand-purple-500',
        };
      case 'brand-teal':
        return {
          bg: 'bg-brand-teal-500/10',
          text: 'text-brand-teal-500',
        };
      default:
        return {
          bg: 'bg-muted/10',
          text: 'text-foreground',
        };
    }
  };

  const colorClasses = getColorClasses(data.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className='w-full max-w-sm rounded-executive bg-gradient-to-b from-muted/50 to-transparent p-xs md:max-w-md'
    >
      <div className='rounded-premium border border-border/20 bg-background/80 p-strategic shadow-2xl backdrop-blur-2xl md:p-command'>
        <div className='flex items-center gap-header-gap'>
          <div className={`rounded-lg p-tactical ${colorClasses.bg}`}>
            <data.Icon className={`h-icon-md w-icon-md ${colorClasses.text}`} />
          </div>
          <h3 className='text-heading-md font-bold text-foreground md:text-heading-lg'>{data.title}</h3>
        </div>
        <div className='my-strategic text-left'>
          <p className='bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-4xl font-bold text-transparent md:text-6xl'>
            {data.prefix}
            <AnimatedNumber n={data.value} />
            <span className='text-lg md:text-2xl'>{data.suffix}</span>
          </p>
        </div>
        <p className='text-left text-body-md text-muted-foreground md:text-hero-description'>{data.description}</p>
      </div>
    </motion.div>
  );
};

// Animated Number Helper
function AnimatedNumber({ n }: { n: any }) {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    const controls = animate(number, n, {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      onUpdate(value) {
        setNumber(value);
      },
    });
    return () => controls.stop();
  }, [n]);

  const formatNumber = (val: any) => {
    if (n >= 1000) return Math.round(val).toLocaleString();
    return Math.round(val);
  };

  return <span>{formatNumber(number)}</span>;
}

// Export wrapper
const AppContent = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='h-[50vh]' /> {/* Spacer for scroll testing */}
      <HPBenefitsReel />
      <div className='h-[50vh]' /> {/* Spacer for scroll testing */}
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
