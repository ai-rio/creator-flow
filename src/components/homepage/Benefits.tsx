'use client';

import { animate, AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { PackageCheck, ShieldCheck, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * HOMEPAGE BENEFITS SECTION
 *
 * Extracted from HP-030-BenefitsReel mock - clean, focused benefits component
 * for the actual CreatorFlow homepage. Features scroll-based animations and
 * seamless integration with the Hero section.
 *
 * UPDATED: Now uses CreatorFlow theme system with proper theme awareness
 * and internationalization support
 */

export function Benefits() {
  const t = useTranslations('homepage.benefits');
  const targetRef = useRef(null);

  // Benefits data for CreatorFlow with translations
  const benefits = [
    {
      Icon: ShieldCheck,
      title: t('automationSavings.title'),
      description: t('automationSavings.description'),
      value: 27000,
      prefix: '$',
      suffix: '/mo',
      color: 'green',
    },
    {
      Icon: PackageCheck,
      title: t('inventoryAccuracy.title'),
      description: t('inventoryAccuracy.description'),
      value: 8400,
      prefix: '$',
      suffix: '/mo',
      color: 'purple',
    },
    {
      Icon: Zap,
      title: t('processingSpeed.title'),
      description: t('processingSpeed.description'),
      value: 24, // Represents 12m -> 30s as a multiplier
      prefix: '24x',
      suffix: 'Faster',
      color: 'blue',
    },
  ];
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Fix: Use useCallback to stabilize the scroll handler and remove activeIndex from dependencies
  const handleScrollChange = useCallback((latest: number) => {
    const newIndex = Math.min(Math.floor(latest * benefits.length), benefits.length - 1);
    setActiveIndex(newIndex);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', handleScrollChange);
    return () => unsubscribe();
  }, [scrollYProgress, handleScrollChange]); // Remove activeIndex from dependencies

  const backgroundGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['hsl(var(--primary) / 0.05)', 'hsl(var(--secondary) / 0.05)', 'hsl(var(--accent) / 0.05)']
  );

  return (
    <section ref={targetRef} className='relative -mx-4 h-[300vh] w-screen'>
      <div className='sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-background transition-colors duration-300'>
        {/* Background Glow - Fix: Use motion.div style prop instead of .get() */}
        <motion.div
          style={{
            background: `radial-gradient(circle, ${backgroundGlow} 0%, transparent 70%)`,
          }}
          className='absolute inset-0 h-full w-full'
        />

        {/* Content */}
        <div className='relative flex flex-col items-center px-8 text-center'>
          <h2 className='mb-4 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-5xl'>
            {t('title')}
          </h2>
          <p className='mx-auto mb-16 max-w-2xl text-base text-muted-foreground'>
            {t('description')}
          </p>
          <AnimatePresence mode='wait'>
            <BenefitCard key={activeIndex} data={benefits[activeIndex]} />
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className='absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-4'>
          {benefits.map((_, i) => (
            <div key={i} className='h-2 w-2 rounded-full bg-muted'>
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
}

// Benefit Card Component
const BenefitCard: React.FC<any> = ({ data }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className='w-full max-w-sm rounded-2xl bg-gradient-to-b from-muted/50 to-transparent p-1 md:max-w-md'
    >
      <div className='rounded-[15px] border border-border bg-card/30 p-8 shadow-2xl backdrop-blur-2xl'>
        <div className='flex items-center gap-4'>
          <div className={`rounded-lg p-2 bg-${data.color}-500/10`}>
            <data.Icon className={`h-6 w-6 text-${data.color}-500`} />
          </div>
          <h3 className='text-xl font-bold text-card-foreground'>{data.title}</h3>
        </div>
        <div className='my-6 text-left'>
          <p className='bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-5xl font-bold text-transparent md:text-6xl'>
            {data.prefix}
            <AnimatedNumber n={data.value} />
            <span className='text-2xl'>{data.suffix}</span>
          </p>
        </div>
        <p className='text-left text-base text-muted-foreground'>{data.description}</p>
      </div>
    </motion.div>
  );
};

// Animated Number Component - FIXED: Proper animation on every mount
function AnimatedNumber({ n }: { n: number }) {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    // Reset to 0 and animate to target value on every mount
    setNumber(0);

    // Add a small delay to ensure the component is fully mounted and visible
    const timer = setTimeout(() => {
      const controls = animate(0, n, {
        duration: 1.2,
        ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth count-up
        onUpdate(value) {
          setNumber(value);
        },
      });

      return () => controls.stop();
    }, 300); // Delay to sync with card entrance animation

    return () => clearTimeout(timer);
  }, [n]);

  const formatNumber = (val: number) => {
    if (n >= 1000) return Math.round(val).toLocaleString();
    return Math.round(val);
  };

  return <span>{formatNumber(number)}</span>;
}
