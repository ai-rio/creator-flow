'use client';

import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Zap } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import { MOTION_CONFIG, useReducedMotion } from '../compositions/layouts/BentoMotion';

// ==================== MAGNETIC BUTTON COMPONENT ====================

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  magneticStrength?: number;
  enableHaptic?: boolean;
  conversionOptimized?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  magneticStrength = 0.3,
  enableHaptic = false,
  conversionOptimized = false,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth magnetic motion
  const springX = useSpring(x, { stiffness: 200, damping: 25, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 200, damping: 25, mass: 0.8 });

  // Transform values for scaling and rotation
  const scale = useMotionValue(1);
  const rotate = useTransform([springX, springY], ([x, y]) => `${(x as number) * 0.1}deg`);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      x.set(deltaX);
      y.set(deltaY);
      scale.set(1.05);
    },
    [x, y, scale, magneticStrength, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  const handleClick = useCallback(() => {
    if (enableHaptic && 'vibrate' in navigator) {
      navigator.vibrate(50); // Subtle haptic feedback
    }
    onClick?.();
  }, [onClick, enableHaptic]);

  // Variant-specific styles
  const variantClasses = {
    primary: 'bg-brand-teal-600 hover:bg-brand-teal-700 text-white border-brand-teal-600',
    secondary: 'bg-brand-purple-600 hover:bg-brand-purple-700 text-white border-brand-purple-600',
    ghost: 'bg-transparent hover:bg-brand-teal-50 text-brand-teal-600 border-brand-teal-200',
    cta: 'bg-gradient-to-r from-brand-teal-600 to-brand-purple-600 hover:from-brand-teal-700 hover:to-brand-purple-700 text-white border-transparent',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const conversionOptimizedStyles = conversionOptimized
    ? 'shadow-lg hover:shadow-xl transition-shadow duration-300'
    : '';

  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg font-semibold',
        'transform-gpu border transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        conversionOptimizedStyles,
        className
      )}
      style={{
        x: springX,
        y: springY,
        scale,
        rotate,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// ==================== ENHANCED CTA COMPONENT ====================

interface EnhancedCTAProps {
  text: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'primary' | 'hero' | 'conversion';
  onClick?: () => void;
  className?: string;
  enableMagnetic?: boolean;
  enableParticles?: boolean;
}

export const EnhancedCTA: React.FC<EnhancedCTAProps> = ({
  text,
  description,
  icon: Icon = ArrowRight,
  variant = 'primary',
  onClick,
  className,
  enableMagnetic = true,
  enableParticles = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const ctaVariants: Variants = {
    idle: {
      backgroundPosition: '0% 50%',
      scale: 1,
    },
    hover: {
      backgroundPosition: '100% 50%',
      scale: 1.05,
      boxShadow: '0 8px 25px -5px rgba(13, 148, 136, 0.4)',
      transition: {
        ...MOTION_CONFIG.springs.responsive,
        backgroundPosition: { duration: 0.6 },
      },
    },
    tap: {
      scale: 0.95,
      transition: MOTION_CONFIG.timing.quick,
    },
  };

  const iconVariants: Variants = {
    idle: { x: 0, rotate: 0 },
    hover: {
      x: 4,
      rotate: -5,
      transition: MOTION_CONFIG.springs.energetic,
    },
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-brand-teal-600 to-brand-teal-700 text-white',
    hero: 'bg-gradient-to-r from-brand-teal-500 via-brand-purple-500 to-brand-teal-600 text-white',
    conversion: 'bg-gradient-to-r from-tiktok-pink to-brand-purple-600 text-white',
  };

  const ButtonComponent = enableMagnetic ? MagneticButton : motion.button;

  return (
    <div className={cn('group relative', className)}>
      {/* Particle background effect */}
      {enableParticles && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='pointer-events-none absolute inset-0'
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className='absolute h-1 w-1 rounded-full bg-brand-teal-400'
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </motion.div>
      )}

      <ButtonComponent
        className={cn(
          'relative overflow-hidden rounded-xl px-8 py-4 text-lg font-bold',
          'background-size-200 transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:ring-offset-2',
          variantStyles[variant]
        )}
        variants={prefersReducedMotion ? undefined : ctaVariants}
        initial='idle'
        whileHover='hover'
        whileTap='tap'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        conversionOptimized={variant === 'conversion'}
      >
        {/* Shimmer effect */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        <div className='relative flex items-center justify-center gap-3'>
          <span>{text}</span>
          <motion.div variants={prefersReducedMotion ? undefined : iconVariants}>
            <Icon className='h-5 w-5' />
          </motion.div>
        </div>

        {description && (
          <motion.p
            className='mt-1 text-sm opacity-90'
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </ButtonComponent>
    </div>
  );
};

// ==================== FLOATING ACTION BUTTON ====================

interface FloatingActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  onClick?: () => void;
  className?: string;
  position?: 'fixed' | 'absolute';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
  position = 'fixed',
  size = 'md',
  variant = 'primary',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const fabVariants: Variants = {
    collapsed: {
      width: 'auto',
      transition: MOTION_CONFIG.springs.responsive,
    },
    expanded: {
      width: 'auto',
      transition: MOTION_CONFIG.springs.responsive,
    },
  };

  const iconVariants: Variants = {
    idle: { rotate: 0, scale: 1 },
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: MOTION_CONFIG.springs.energetic,
    },
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const variantClasses = {
    primary: 'bg-brand-teal-600 hover:bg-brand-teal-700 text-white shadow-teal-glow',
    success: 'bg-success-green-600 hover:bg-success-green-700 text-white shadow-lg',
    warning: 'bg-warning-amber-600 hover:bg-warning-amber-700 text-white shadow-lg',
  };

  return (
    <motion.button
      className={cn(
        'group flex items-center justify-center rounded-full',
        'transform-gpu transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:ring-offset-2',
        position === 'fixed' && 'fixed bottom-6 right-6 z-50',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      variants={prefersReducedMotion ? undefined : fabVariants}
      initial='collapsed'
      animate={isExpanded ? 'expanded' : 'collapsed'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={onClick}
    >
      <motion.div
        className='flex items-center gap-2'
        variants={prefersReducedMotion ? undefined : iconVariants}
        initial='idle'
        whileHover='hover'
      >
        <Icon className='h-6 w-6 flex-shrink-0' />

        {label && (
          <motion.span
            className='overflow-hidden whitespace-nowrap text-sm font-medium'
            initial={{ width: 0, opacity: 0 }}
            animate={
              isExpanded
                ? {
                    width: 'auto',
                    opacity: 1,
                    paddingRight: '0.5rem',
                  }
                : {
                    width: 0,
                    opacity: 0,
                    paddingRight: 0,
                  }
            }
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.button>
  );
};

// ==================== HOVER CARD COMPONENT ====================

interface HoverCardProps {
  children: React.ReactNode;
  hoverContent?: React.ReactNode;
  className?: string;
  hoverClassName?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  hoverContent,
  className,
  hoverClassName,
  direction = 'top',
  delay = 0.1,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const directionVariants = {
    top: { y: -10, x: 0 },
    bottom: { y: 10, x: 0 },
    left: { x: -10, y: 0 },
    right: { x: 10, y: 0 },
  };

  const hoverCardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      ...directionVariants[direction],
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        ...MOTION_CONFIG.springs.gentle,
        delay,
      },
    },
  };

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {hoverContent && (
        <motion.div
          className={cn(
            'absolute z-10 rounded-lg border border-border bg-card p-4 shadow-lg',
            'bg-card/90 backdrop-blur-sm',
            direction === 'top' && 'bottom-full mb-2',
            direction === 'bottom' && 'top-full mt-2',
            direction === 'left' && 'right-full mr-2',
            direction === 'right' && 'left-full ml-2',
            hoverClassName
          )}
          variants={prefersReducedMotion ? undefined : hoverCardVariants}
          initial='hidden'
          animate={isHovered ? 'visible' : 'hidden'}
        >
          {hoverContent}
        </motion.div>
      )}
    </div>
  );
};

// ==================== EXPORTS ====================

export default {
  MagneticButton,
  EnhancedCTA,
  FloatingActionButton,
  HoverCard,
};
