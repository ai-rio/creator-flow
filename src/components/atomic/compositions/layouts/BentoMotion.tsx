'use client';

import { motion, MotionProps, useAnimation, useMotionValue, Variants } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

// ==================== MOTION CONFIGURATION ====================

export const MOTION_CONFIG = {
  // Spring configurations for premium feel
  springs: {
    gentle: { type: 'spring', stiffness: 120, damping: 25, mass: 1 },
    responsive: { type: 'spring', stiffness: 200, damping: 25, mass: 0.8 },
    energetic: { type: 'spring', stiffness: 300, damping: 20, mass: 0.5 },
    heroic: { type: 'spring', stiffness: 150, damping: 30, mass: 1.2 },
  },

  // Timing for different interaction types
  timing: {
    quick: { duration: 0.15 },
    standard: { duration: 0.3 },
    smooth: { duration: 0.5 },
    cinematic: { duration: 0.8 },
  },

  // Easing curves for brand personality
  easing: {
    tiktokEnergy: [0.25, 0.46, 0.45, 0.94],
    professionalSmooth: [0.4, 0, 0.2, 1],
    magneticPull: [0.68, -0.55, 0.265, 1.55],
    subtleFloat: [0.25, 0.1, 0.25, 1],
  },

  // Stagger patterns for grid animations
  stagger: {
    grid: { delayChildren: 0.1, staggerChildren: 0.05 },
    cascade: { delayChildren: 0.2, staggerChildren: 0.1 },
    wave: { delayChildren: 0.3, staggerChildren: 0.15 },
  },
} as const;

// ==================== MOTION VARIANTS ====================

export const bentoVariants: Record<string, Variants> = {
  // Container variants for grid-level animations
  gridContainer: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ...MOTION_CONFIG.stagger.grid,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },

  // Hero card variants for centerpiece animations
  heroCard: {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        ...MOTION_CONFIG.springs.heroic,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: '0 20px 40px -5px rgba(13, 148, 136, 0.2)',
      transition: MOTION_CONFIG.springs.responsive,
    },
    tap: {
      scale: 0.98,
      transition: MOTION_CONFIG.timing.quick,
    },
  },

  // Standard card variants with progressive disclosure
  standardCard: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: MOTION_CONFIG.springs.gentle,
    },
    hover: {
      scale: 1.03,
      y: -2,
      boxShadow: '0 10px 30px -5px rgba(13, 148, 136, 0.15)',
      transition: MOTION_CONFIG.springs.responsive,
    },
    tap: {
      scale: 0.97,
      transition: MOTION_CONFIG.timing.quick,
    },
  },

  // Magnetic card variants for premium interactions
  magneticCard: {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        ...MOTION_CONFIG.springs.responsive,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.05,
      y: -8,
      rotateX: -2,
      boxShadow: '0 25px 50px -10px rgba(168, 85, 247, 0.25)',
      transition: MOTION_CONFIG.springs.energetic,
    },
    tap: {
      scale: 0.95,
      transition: MOTION_CONFIG.timing.quick,
    },
  },
};

// ==================== UTILITY HOOKS ====================

/**
 * Hook for reduced motion preferences
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [controls]);

  return { ref, controls };
}

/**
 * Hook for magnetic interaction effects
 */
export function useMagnetic(strength: number = 1) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;

      const magneticStrength = 0.1 * strength;
      x.set(distanceX * magneticStrength);
      y.set(distanceY * magneticStrength);
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { x, y, ref };
}

/**
 * Hook for parallax scroll effects
 */
export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateParallax = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      y.set(rate);
    };

    window.addEventListener('scroll', updateParallax);
    return () => window.removeEventListener('scroll', updateParallax);
  }, [y]);

  return { y, ref };
}

// ==================== MOTION COMPONENTS ====================

export interface MotionBentoCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'hero' | 'standard' | 'magnetic';
  magneticStrength?: number;
  enableParallax?: boolean;
  parallaxFactor?: number;
}

/**
 * Enhanced motion wrapper for bento cards with advanced interactions
 */
export const MotionBentoCard: React.FC<MotionBentoCardProps> = ({
  children,
  className,
  variant = 'standard',
  magneticStrength = 1,
  enableParallax = false,
  parallaxFactor = 0.5,
  ...motionProps
}) => {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const magnetic = useMagnetic(magneticStrength);
  const parallax = useParallax();

  // Determine variants based on motion preference
  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : bentoVariants[variant === 'hero' ? 'heroCard' : 'standardCard'];

  // Combine motion values for complex animations - simplified
  const x = variant === 'magnetic' ? magnetic.x : 0;
  const y = variant === 'magnetic' ? magnetic.y : 0;

  return (
    <motion.div
      ref={scrollRef}
      className={cn('relative', className)}
      variants={cardVariants}
      initial='hidden'
      whileInView='visible'
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      whileTap={prefersReducedMotion ? undefined : 'tap'}
      viewport={{ once: true, amount: 0.3 }}
      style={{ x, y }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export interface MotionBentoGridProps {
  children: React.ReactNode;
  className?: string;
  staggerPattern?: 'grid' | 'cascade' | 'wave';
}

/**
 * Enhanced motion wrapper for bento grid with sophisticated stagger patterns
 */
export const MotionBentoGrid: React.FC<MotionBentoGridProps> = ({ children, className, staggerPattern = 'grid' }) => {
  const prefersReducedMotion = useReducedMotion();
  const { ref, controls } = useScrollAnimation();

  // Enhanced container variants with dynamic stagger patterns
  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            ...MOTION_CONFIG.stagger[staggerPattern],
            when: 'beforeChildren',
          },
        },
      };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('grid', className)}
      variants={containerVariants}
      initial='hidden'
      animate={controls}
      exit='exit'
    >
      {children}
    </motion.div>
  );
};
