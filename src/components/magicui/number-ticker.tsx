'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

// Enhanced props with CreatorFlow-specific features
export interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  decimalPlaces?: number;
  isCurrency?: boolean;
  // Enhanced features
  enableCreatorFlowEffects?: boolean;
  variant?: 'default' | 'hero' | 'metric' | 'revenue' | 'viral';
  animationDuration?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  enableCelebration?: boolean;
  milestoneValues?: number[];
}

export default function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
  isCurrency = false,
  // Enhanced features
  enableCreatorFlowEffects = false,
  variant = 'default',
  animationDuration = 2000,
  prefix = '',
  suffix = '',
  locale = 'en-US',
  enableCelebration = false,
  milestoneValues = [],
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [currentValue, setCurrentValue] = useState(direction === 'down' ? value : 0);

  // Format number with locale and currency support
  const formatNumber = useCallback(
    (
      num: number,
      options: {
        decimalPlaces: number;
        isCurrency: boolean;
        prefix: string;
        suffix: string;
        locale: string;
      }
    ) => {
      const { decimalPlaces, isCurrency, prefix, suffix, locale } = options;

      let formatted: string;

      if (isCurrency) {
        formatted = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(num);
      } else {
        formatted = new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(num);
      }

      return `${prefix}${formatted}${suffix}`;
    },
    []
  );

  // Enhanced spring animation for smooth counting
  const springValue = useSpring(currentValue, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Transform for display value with formatting
  const displayValue = useTransform(springValue, (latest) => {
    const formatted = formatNumber(latest, {
      decimalPlaces,
      isCurrency,
      prefix,
      suffix,
      locale,
    });
    return formatted;
  });

  // Check for milestone celebrations
  const checkMilestone = useCallback(
    (newValue: number, oldValue: number) => {
      if (!enableCelebration || milestoneValues.length === 0) return false;

      return milestoneValues.some((milestone) => oldValue < milestone && newValue >= milestone);
    },
    [enableCelebration, milestoneValues]
  );

  // Enhanced animation effect
  useEffect(() => {
    if (!ref.current) return;

    const oldValue = currentValue;
    const target = value;

    if (oldValue === target) return;

    setIsAnimating(true);

    // Check for milestone celebration
    if (checkMilestone(target, oldValue)) {
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 1000);
    }

    // Spring animation
    springValue.set(target);
    setCurrentValue(target);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [value, springValue, currentValue, animationDuration, checkMilestone]);

  // Variant-specific styling
  const variantClasses = {
    default: 'text-foreground',
    hero: 'text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-teal-600 to-brand-purple-600 bg-clip-text text-transparent',
    metric: 'text-2xl font-semibold text-brand-teal-600 dark:text-brand-teal-400',
    revenue: 'text-xl font-bold text-success-green-600 dark:text-success-green-400',
    viral: 'text-lg font-bold text-tiktok-pink animate-pulse',
  };

  // Enhanced effects for CreatorFlow
  const enhancedEffects = enableCreatorFlowEffects
    ? {
        animate: {
          scale: isAnimating ? [1, 1.05, 1] : 1,
          opacity: isAnimating ? [1, 0.8, 1] : 1,
        },
        transition: {
          duration: 0.3,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  // Celebration effects
  const celebrationEffects = isCelebrating
    ? {
        animate: {
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
          textShadow: [
            '0 0 0px rgba(13, 148, 136, 0)',
            '0 0 20px rgba(13, 148, 136, 0.8)',
            '0 0 0px rgba(13, 148, 136, 0)',
          ],
        },
        transition: {
          duration: 1,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  return (
    <motion.span
      ref={ref}
      className={cn(
        'inline-block transform-gpu tabular-nums transition-all duration-300',
        variantClasses[variant],
        isAnimating && enableCreatorFlowEffects && 'drop-shadow-sm',
        isCelebrating && 'animate-pulse',
        className
      )}
      {...enhancedEffects}
      {...celebrationEffects}
    >
      <motion.span>{displayValue}</motion.span>

      {/* Celebration particles */}
      {isCelebrating && enableCreatorFlowEffects && (
        <motion.div
          className='pointer-events-none absolute inset-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className='absolute h-1 w-1 rounded-full bg-brand-teal-400'
              initial={{
                x: 0,
                y: 0,
                scale: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * 40,
                y: (Math.random() - 0.5) * 40,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.span>
  );
}
