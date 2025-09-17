'use client';

import { motion, useAnimation, useMotionValue, useTransform, Variants } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Check,
  DollarSign,
  Heart,
  Loader2,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';

import { MOTION_CONFIG, useReducedMotion } from '../compositions/layouts/BentoMotion';

// ==================== CONVERSION-FOCUSED CTA BUTTON ====================

interface ConversionCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'success' | 'premium' | 'viral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  enableSuccessAnimation?: boolean;
  enableViralEffect?: boolean;
  conversionOptimized?: boolean;
}

export const ConversionCTA: React.FC<ConversionCTAProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  enableSuccessAnimation = true,
  enableViralEffect = false,
  conversionOptimized = true,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  // Magnetic effect motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Transform values for dynamic effects
  const magneticX = useTransform(x, [-100, 100], [-8, 8]);
  const magneticY = useTransform(y, [-100, 100], [-4, 4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion || disabled || loading) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    },
    [x, y, prefersReducedMotion, disabled, loading]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
    setIsHovered(false);
  }, [x, y, scale]);

  const handleClick = useCallback(async () => {
    if (disabled || loading) return;

    // Success animation
    if (enableSuccessAnimation) {
      setIsSuccess(true);
      await controls.start({
        scale: [1, 1.1, 1],
        backgroundColor: ['#14b8a6', '#10b981', '#14b8a6'],
        transition: { duration: 0.6, ease: 'easeInOut' },
      });

      setTimeout(() => setIsSuccess(false), 2000);
    }

    // Viral effect
    if (enableViralEffect) {
      await controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 360, 0],
        boxShadow: [
          '0 0 0 0 rgba(255, 0, 80, 0)',
          '0 0 20px 10px rgba(255, 0, 80, 0.4)',
          '0 0 0 0 rgba(255, 0, 80, 0)',
        ],
        transition: { duration: 1, ease: 'easeInOut' },
      });
    }

    onClick?.();
  }, [disabled, loading, enableSuccessAnimation, enableViralEffect, controls, onClick]);

  // Variant configurations
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-brand-teal-600 to-brand-teal-700 hover:from-brand-teal-700 hover:to-brand-teal-800 text-white',
    success:
      'bg-gradient-to-r from-success-green-600 to-success-green-700 hover:from-success-green-700 hover:to-success-green-800 text-white',
    premium:
      'bg-gradient-to-r from-brand-purple-600 via-brand-teal-600 to-brand-purple-600 hover:bg-[length:200%] text-white',
    viral:
      'bg-gradient-to-r from-tiktok-pink to-warning-amber-500 hover:from-warning-amber-500 hover:to-tiktok-pink text-white',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const conversionOptimizedStyles = conversionOptimized
    ? 'shadow-lg hover:shadow-xl transition-shadow duration-300 border-0'
    : '';

  const buttonVariants: Variants = {
    idle: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: MOTION_CONFIG.springs.responsive,
    },
    tap: {
      scale: 0.95,
      y: 0,
      transition: MOTION_CONFIG.timing.quick,
    },
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-xl font-bold',
        'transform-gpu transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-brand-teal-500 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        conversionOptimizedStyles,
        className
      )}
      variants={prefersReducedMotion ? undefined : buttonVariants}
      initial='idle'
      whileHover={!disabled && !loading ? 'hover' : undefined}
      whileTap={!disabled && !loading ? 'tap' : undefined}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled || loading}
      style={{
        x: magneticX,
        y: magneticY,
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Button content */}
      <div className='relative flex items-center justify-center gap-2'>
        {loading ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            <span>Processing...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className='h-4 w-4' />
            <span>Success!</span>
          </>
        ) : (
          children
        )}
      </div>

      {/* Success particles */}
      {isSuccess && !prefersReducedMotion && (
        <div className='pointer-events-none absolute inset-0'>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className='absolute h-1 w-1 rounded-full bg-white'
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
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

// ==================== ANIMATED FORM INPUT ====================

interface AnimatedFormInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
  disabled?: boolean;
  error?: string;
  success?: boolean;
  enableValidationAnimation?: boolean;
  enableFocusEffects?: boolean;
}

export const AnimatedFormInput: React.FC<AnimatedFormInputProps> = ({
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  className,
  disabled = false,
  error = '',
  success = false,
  enableValidationAnimation = true,
  enableFocusEffects = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  // Validation effect
  useEffect(() => {
    if (!enableValidationAnimation) return;

    if (error) {
      controls.start({
        x: [-5, 5, -5, 5, 0],
        borderColor: '#ef4444',
        transition: { duration: 0.5 },
      });
    } else if (success) {
      controls.start({
        borderColor: '#22c55e',
        boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.1)',
        transition: { duration: 0.3 },
      });
    }
  }, [error, success, enableValidationAnimation, controls]);

  const inputVariants: Variants = {
    unfocused: {
      borderColor: '#e5e7eb',
      boxShadow: '0 0 0 0 rgba(13, 148, 136, 0)',
    },
    focused: {
      borderColor: '#14b8a6',
      boxShadow: '0 0 0 3px rgba(13, 148, 136, 0.1)',
      transition: MOTION_CONFIG.springs.gentle,
    },
  };

  const labelVariants: Variants = {
    unfocused: {
      y: 0,
      scale: 1,
      color: '#9ca3af',
    },
    focused: {
      y: -24,
      scale: 0.85,
      color: '#14b8a6',
      transition: MOTION_CONFIG.springs.gentle,
    },
  };

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className='relative'
        variants={prefersReducedMotion ? undefined : inputVariants}
        initial='unfocused'
        animate={isFocused || value ? 'focused' : 'unfocused'}
      >
        <motion.input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          animate={controls}
          className={cn(
            'w-full rounded-xl border-2 px-4 py-3',
            'bg-background text-foreground',
            'transition-colors duration-200 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-error-red-500',
            success && 'border-success-green-500'
          )}
        />

        {/* Animated placeholder/label */}
        <motion.label
          className='pointer-events-none absolute left-4 origin-left'
          variants={prefersReducedMotion ? undefined : labelVariants}
          initial='unfocused'
          animate={isFocused || value ? 'focused' : 'unfocused'}
        >
          {placeholder}
        </motion.label>
      </motion.div>

      {/* Status icons */}
      {enableFocusEffects && (
        <div className='absolute right-4 top-1/2 -translate-y-1/2 transform'>
          {error && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className='h-5 w-5 text-error-red-500' />
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Check className='h-5 w-5 text-success-green-500' />
            </motion.div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <motion.p
          className='mt-2 text-sm text-error-red-500'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// ==================== SUCCESS FEEDBACK COMPONENT ====================

interface SuccessFeedbackProps {
  show: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
  variant?: 'success' | 'celebration' | 'milestone';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const SuccessFeedback: React.FC<SuccessFeedbackProps> = ({
  show,
  onClose,
  title = 'Success!',
  message = 'Action completed successfully',
  variant = 'success',
  autoClose = true,
  autoCloseDelay = 3000,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [show, autoClose, autoCloseDelay, onClose]);

  const variantConfig = {
    success: {
      icon: Check,
      color: 'text-success-green-600',
      background: 'bg-success-green-50 border-success-green-200',
      particles: false,
    },
    celebration: {
      icon: Sparkles,
      color: 'text-brand-teal-600',
      background: 'bg-brand-teal-50 border-brand-teal-200',
      particles: true,
    },
    milestone: {
      icon: TrendingUp,
      color: 'text-brand-purple-600',
      background: 'bg-brand-purple-50 border-brand-purple-200',
      particles: true,
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  const feedbackVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (!show) return null;

  return (
    <motion.div
      className='fixed bottom-6 right-6 z-50 max-w-sm'
      variants={prefersReducedMotion ? undefined : feedbackVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <div className={cn('relative rounded-xl border p-4 shadow-lg backdrop-blur-sm', config.background)}>
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-black/10'
        >
          <X className='h-4 w-4' />
        </button>

        {/* Content */}
        <div className='flex items-start gap-3 pr-6'>
          <motion.div
            className={cn('flex-shrink-0', config.color)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Icon className='h-6 w-6' />
          </motion.div>

          <div className='flex-1'>
            <h4 className='font-semibold text-foreground'>{title}</h4>
            <p className='mt-1 text-sm text-muted-foreground'>{message}</p>
          </div>
        </div>

        {/* Celebration particles */}
        {config.particles && !prefersReducedMotion && (
          <div className='pointer-events-none absolute inset-0'>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className='absolute h-1 w-1 rounded-full bg-current'
                style={{ color: config.color }}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 150}%`,
                  y: `${50 + (Math.random() - 0.5) * 150}%`,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ==================== LIKE BUTTON WITH HEART ANIMATION ====================

interface LikeButtonProps {
  liked?: boolean;
  onToggle?: (liked: boolean) => void;
  count?: number;
  variant?: 'heart' | 'star' | 'like';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  liked = false,
  onToggle,
  count = 0,
  variant = 'heart',
  size = 'md',
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    onToggle?.(!liked);
  }, [liked, onToggle]);

  const icons = {
    heart: Heart,
    star: Star,
    like: TrendingUp,
  };

  const Icon = icons[variant];

  const sizeConfig = {
    sm: { icon: 'w-4 h-4', text: 'text-xs', padding: 'p-2' },
    md: { icon: 'w-5 h-5', text: 'text-sm', padding: 'p-3' },
    lg: { icon: 'w-6 h-6', text: 'text-base', padding: 'p-4' },
  };

  const config = sizeConfig[size];

  const buttonVariants: Variants = {
    idle: { scale: 1 },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
    liked: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.button
      className={cn(
        'flex items-center gap-2 rounded-full transition-colors duration-200',
        'hover:bg-rose-50 dark:hover:bg-rose-950/20',
        config.padding,
        className
      )}
      variants={prefersReducedMotion ? undefined : buttonVariants}
      initial='idle'
      animate={isAnimating ? 'liked' : 'idle'}
      whileTap='tap'
      onClick={handleClick}
    >
      <motion.div className={cn('transition-colors duration-200', liked ? 'text-rose-500' : 'text-muted-foreground')}>
        <Icon className={cn(config.icon, liked && 'fill-current')} />
      </motion.div>

      {count > 0 && (
        <motion.span
          className={cn(
            'font-medium transition-colors duration-200',
            liked ? 'text-rose-500' : 'text-muted-foreground',
            config.text
          )}
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString()}
        </motion.span>
      )}

      {/* Heart burst animation */}
      {isAnimating && liked && !prefersReducedMotion && (
        <div className='pointer-events-none absolute inset-0'>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className='absolute'
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
              }}
              animate={{
                x: `${50 + Math.cos((i * Math.PI * 2) / 6) * 30}%`,
                y: `${50 + Math.sin((i * Math.PI * 2) / 6) * 30}%`,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
            >
              <Heart className='h-2 w-2 fill-current text-rose-500' />
            </motion.div>
          ))}
        </div>
      )}
    </motion.button>
  );
};

// ==================== EXPORTS ====================

export default {
  ConversionCTA,
  AnimatedFormInput,
  SuccessFeedback,
  LikeButton,
};
