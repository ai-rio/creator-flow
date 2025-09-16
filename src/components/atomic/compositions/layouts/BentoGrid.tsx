'use client';

import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';

import { cn } from '@/utils/cn';

// Enhanced motion system imports
import {
  bentoVariants,
  MOTION_CONFIG,
  MotionBentoCard,
  MotionBentoGrid,
  useMagnetic,
  useReducedMotion,
  useScrollAnimation,
} from './BentoMotion';

// ==================== TYPE DEFINITIONS ====================

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
  animation?: boolean;
  motionVariant?: 'grid' | 'cascade' | 'wave';
  enableAdvancedMotion?: boolean;
}

export interface BentoCardProps {
  name?: string;
  className?: string;
  background?: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  href?: string;
  cta?: string;
  children?: ReactNode;
  animation?: boolean;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'hero';
  delay?: number;
  // Enhanced motion properties
  motionVariant?: 'hero' | 'standard' | 'magnetic';
  magneticStrength?: number;
  enableParallax?: boolean;
  parallaxFactor?: number;
  hoverScale?: number;
  interactionType?: 'standard' | 'magnetic' | 'premium';
}

export interface BentoSectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  animation?: boolean;
}

// ==================== BENTO GRID COMPONENT ====================

/**
 * Responsive bento grid layout system for CreatorFlow
 * Based on Magic UI bento-grid with CreatorFlow design tokens
 * Supports mobile-first responsive design (320px → 1024px+)
 * Enhanced with advanced motion capabilities and accessibility
 */
export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className,
  animation = true,
  motionVariant = 'grid',
  enableAdvancedMotion = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { ref, controls } = useScrollAnimation();

  const baseClasses = cn(
    // Mobile-first grid system
    'grid w-full gap-4',
    // Mobile: 1 column (320px-640px)
    'auto-rows-[280px] grid-cols-1',
    // Tablet: 2 columns (640px-1024px)
    'sm:auto-rows-[320px] sm:grid-cols-2',
    // Desktop: 3 columns (1024px+)
    'lg:auto-rows-[22rem] lg:grid-cols-3 lg:gap-6',
    className
  );

  // Use enhanced motion system if enabled and motion is not reduced
  if (enableAdvancedMotion && animation && !prefersReducedMotion) {
    return (
      <MotionBentoGrid className={baseClasses} staggerPattern={motionVariant}>
        {children}
      </MotionBentoGrid>
    );
  }

  // Fallback to standard motion
  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: MOTION_CONFIG.stagger[motionVariant] || MOTION_CONFIG.stagger.grid,
        },
      };

  if (animation) {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        variants={containerVariants}
        initial='hidden'
        animate={controls}
        className={baseClasses}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
};

// ==================== BENTO CARD COMPONENT ====================

/**
 * Individual bento card with CreatorFlow design system integration
 * Supports multiple sizes, animations, and interactive states
 * Enhanced with magnetic interactions and premium motion design
 */
export const BentoCard: React.FC<BentoCardProps> = ({
  name,
  className,
  background,
  icon: Icon,
  description,
  href,
  cta,
  children,
  animation = true,
  size = 'medium',
  delay = 0,
  // Enhanced motion properties
  motionVariant = 'standard',
  magneticStrength = 1,
  enableParallax = false,
  parallaxFactor = 0.5,
  hoverScale = 1.03,
  interactionType = 'standard',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const magneticRef = useRef<HTMLDivElement>(null);
  const { x: magneticX, y: magneticY } = useMagnetic(magneticStrength);

  // Enhanced item variants with sophisticated spring physics
  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            ...MOTION_CONFIG.springs.gentle,
            delay,
          },
        },
        hover: {
          scale: hoverScale,
          y: size === 'hero' ? -4 : -2,
          boxShadow:
            size === 'hero' ? '0 20px 40px -5px rgba(13, 148, 136, 0.2)' : '0 10px 30px -5px rgba(13, 148, 136, 0.15)',
          transition: MOTION_CONFIG.springs.responsive,
        },
        tap: {
          scale: 0.97,
          transition: MOTION_CONFIG.timing.quick,
        },
      };

  // Size mapping for responsive grid positioning
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-1 sm:col-span-1 lg:col-span-1',
    large: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
    wide: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2',
    hero: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
  };

  // Base card styling with CreatorFlow design tokens
  const cardClasses = cn(
    'group relative overflow-hidden rounded-xl border',
    'bg-background border-border',
    'transition-all duration-300 ease-out',
    // Interactive states
    'hover:border-brand-teal-500/30 hover:shadow-lg',
    // Responsive sizing
    sizeClasses[size],
    className
  );

  // Card content structure
  const cardContent = (
    <>
      {background && <div className='absolute inset-0 z-0 overflow-hidden rounded-xl'>{background}</div>}

      <div className='relative z-10 flex h-full flex-col p-6'>
        {(name || Icon || description) && (
          <div className='mb-4 flex-shrink-0'>
            {Icon && (
              <div className='bg-brand-teal-100 dark:bg-brand-teal-900 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg'>
                <Icon className='h-5 w-5 text-brand-teal-600 dark:text-brand-teal-400' />
              </div>
            )}
            {name && (
              <h3 className='text-lg font-semibold text-foreground transition-colors group-hover:text-brand-teal-600'>
                {name}
              </h3>
            )}
            {description && (
              <p className='mt-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground/80'>
                {description}
              </p>
            )}
          </div>
        )}

        {children && <div className='flex-1 overflow-hidden'>{children}</div>}

        {cta && (
          <div className='mt-4 flex-shrink-0'>
            <span className='group-hover:text-brand-teal-700 text-sm font-medium text-brand-teal-600 transition-colors'>
              {cta} →
            </span>
          </div>
        )}
      </div>
    </>
  );

  // Use enhanced motion system for premium interactions - simplified without onClick
  if (animation && (interactionType === 'magnetic' || motionVariant === 'magnetic')) {
    const handleClick = href ? () => window.open(href, '_blank') : undefined;

    return (
      <div className={cardClasses} onClick={handleClick} style={{ cursor: href ? 'pointer' : 'default' }}>
        <MotionBentoCard
          variant={motionVariant}
          magneticStrength={magneticStrength}
          enableParallax={enableParallax}
          parallaxFactor={parallaxFactor}
        >
          {cardContent}
        </MotionBentoCard>
      </div>
    );
  }

  // Standard motion system
  if (animation) {
    return (
      <motion.div
        ref={interactionType === 'magnetic' ? magneticRef : undefined}
        variants={itemVariants}
        className={cardClasses}
        whileHover={prefersReducedMotion ? undefined : 'hover'}
        whileTap={prefersReducedMotion ? undefined : 'tap'}
        onClick={href ? () => window.open(href, '_blank') : undefined}
        style={{
          cursor: href ? 'pointer' : 'default',
          x: interactionType === 'magnetic' ? magneticX : 0,
          y: interactionType === 'magnetic' ? magneticY : 0,
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  // Static fallback
  return (
    <div
      className={cardClasses}
      onClick={href ? () => window.open(href, '_blank') : undefined}
      style={{ cursor: href ? 'pointer' : 'default' }}
    >
      {cardContent}
    </div>
  );
};

// ==================== BENTO SECTION COMPONENT ====================

/**
 * Section wrapper with optional title/subtitle and consistent spacing
 * Provides semantic structure and consistent typography scale
 */
export const BentoSection: React.FC<BentoSectionProps> = ({
  title,
  subtitle,
  children,
  className,
  animation = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...MOTION_CONFIG.springs.gentle,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: MOTION_CONFIG.springs.gentle,
    },
  };

  if (animation && !prefersReducedMotion) {
    return (
      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        className={cn('py-16 lg:py-24', className)}
      >
        {(title || subtitle) && (
          <motion.div variants={titleVariants} className='mb-12 text-center'>
            {title && <h2 className='mb-4 text-3xl font-bold text-foreground lg:text-4xl'>{title}</h2>}
            {subtitle && <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </motion.section>
    );
  }

  return (
    <section className={cn('py-16 lg:py-24', className)}>
      {(title || subtitle) && (
        <div className='mb-12 text-center'>
          {title && <h2 className='mb-4 text-3xl font-bold text-foreground lg:text-4xl'>{title}</h2>}
          {subtitle && <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};
