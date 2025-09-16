'use client';

import { motion, Variants } from 'framer-motion';
import React, { ReactNode } from 'react';

import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
  animation?: boolean;
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
 */
export const BentoGrid: React.FC<BentoGridProps> = ({ children, className, animation = true }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  if (animation) {
    return (
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className={cn(
          // Mobile-first grid system
          'grid w-full gap-4',
          // Mobile: 1 column (320px-640px)
          'auto-rows-[280px] grid-cols-1',
          // Tablet: 2 columns (640px-1024px)
          'sm:auto-rows-[320px] sm:grid-cols-2',
          // Desktop: 3 columns (1024px+)
          'lg:auto-rows-[22rem] lg:grid-cols-3 lg:gap-6',
          className
        )}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        // Mobile-first grid system
        'grid w-full gap-4',
        // Mobile: 1 column (320px-640px)
        'auto-rows-[280px] grid-cols-1',
        // Tablet: 2 columns (640px-1024px)
        'sm:auto-rows-[320px] sm:grid-cols-2',
        // Desktop: 3 columns (1024px+)
        'lg:auto-rows-[22rem] lg:grid-cols-3 lg:gap-6',
        className
      )}
    >
      {children}
    </div>
  );
};

// ==================== BENTO CARD COMPONENT ====================

/**
 * Individual bento card with CreatorFlow design system integration
 * Supports multiple sizes, animations, and interactive states
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
}) => {
  const itemVariants: Variants = {
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
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        delay,
      },
    },
  };

  // Size mapping for responsive grid positioning
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-1 sm:col-span-1 lg:col-span-1',
    large: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-1',
    wide: 'col-span-1 sm:col-span-2 lg:col-span-3 row-span-1',
    tall: 'col-span-1 row-span-2',
    hero: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
  };

  const cardContent = (
    <>
      {/* Background content */}
      {background && <div className='absolute inset-0'>{background}</div>}

      {/* Custom children content (takes precedence) */}
      {children ? (
        <div className='relative z-10 h-full'>{children}</div>
      ) : (
        <>
          {/* Default card content */}
          <div className='pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2'>
            <div className='flex flex-col gap-2'>
              {/* Icon */}
              {Icon && (
                <div className='mb-2'>
                  <Icon className='h-8 w-8 origin-left transform-gpu text-brand-teal-600 transition-all duration-300 ease-in-out group-hover:scale-90 dark:text-brand-teal-400' />
                </div>
              )}

              {/* Title */}
              {name && <h3 className='text-xl font-semibold text-foreground lg:text-2xl'>{name}</h3>}
            </div>

            {/* Description */}
            {description && <p className='text-sm text-muted-foreground lg:text-base'>{description}</p>}
          </div>

          {/* CTA Section */}
          {href && cta && (
            <div className='pointer-events-none absolute bottom-0 flex w-full translate-y-2 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
              <button className='group/arrow pointer-events-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90'>
                {cta}
                <span className='ml-2 inline-block transition-transform duration-300 group-hover/arrow:translate-x-1'>
                  →
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Hover overlay */}
      <div className='pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/5' />
    </>
  );

  const cardClasses = cn(
    'group relative flex flex-col justify-between overflow-hidden rounded-xl',
    // CreatorFlow design system integration
    'border border-border bg-card/70 backdrop-blur-sm',
    // Light theme styling
    '[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
    // Dark theme styling
    'dark:bg-card/50 dark:[border:1px_solid_rgba(255,255,255,.1)]',
    // Interactive states with CreatorFlow colors
    'transition-all duration-300 hover:shadow-card hover:border-brand-teal-500/30',
    'dark:hover:border-brand-teal-400/30',
    // Responsive sizing
    sizeClasses[size],
    className
  );

  if (animation) {
    return (
      <motion.div
        variants={itemVariants}
        className={cardClasses}
        onClick={href ? () => window.open(href, '_blank') : undefined}
        style={{ cursor: href ? 'pointer' : 'default' }}
      >
        {cardContent}
      </motion.div>
    );
  }

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
 * Section wrapper for bento layouts with proper spacing and typography
 */
export const BentoSection: React.FC<BentoSectionProps> = ({
  title,
  subtitle,
  children,
  className,
  animation = true,
}) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const content = (
    <>
      {/* Section header */}
      {(title || subtitle) && (
        <div className='mb-8 text-center lg:mb-12'>
          {title && <h2 className='text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl'>{title}</h2>}
          {subtitle && <p className='mt-4 text-lg text-muted-foreground'>{subtitle}</p>}
        </div>
      )}

      {/* Bento grid content */}
      {children}
    </>
  );

  if (animation) {
    return (
      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        className={cn('py-12 lg:py-16', className)}
      >
        {content}
      </motion.section>
    );
  }

  return <section className={cn('py-12 lg:py-16', className)}>{content}</section>;
};

// ==================== EXPORTS ====================

export default BentoGrid;
