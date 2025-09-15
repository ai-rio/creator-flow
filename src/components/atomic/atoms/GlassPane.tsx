'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/utils/cn';

interface GlassPaneProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'subtle' | 'premium';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

export function GlassPane({
  children,
  variant = 'default',
  blur = 'lg',
  className = '',
  animated = true,
  onClick,
}: GlassPaneProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-background/80 border-border/20 shadow-lg';
      case 'subtle':
        return 'bg-background/60 border-border/10 shadow-sm';
      case 'premium':
        return 'bg-background/90 border-purple-500/30 shadow-2xl';
      default:
        return 'bg-background/70 border-border/15 shadow-md';
    }
  };

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: {
          type: 'spring' as const,
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        },
      }
    : {};

  const interactionProps = onClick
    ? {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
        className: cn(className, 'cursor-pointer'),
        onClick,
      }
    : { className };

  return (
    <motion.div
      className={cn(
        getVariantStyles(),
        blurClasses[blur],
        'rounded-xl border transition-all duration-300',
        interactionProps.className
      )}
      {...animationProps}
      {...(onClick && {
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
      })}
      onClick={interactionProps.onClick}
    >
      {children}
    </motion.div>
  );
}
