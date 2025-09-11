/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Button } from '@/components/ui/button';

/**
 * IM-ActionButton - Atomic action button for inventory management
 *
 * A specialized button component for inventory management actions with
 * proper touch targets, accessibility, and consistent styling.
 *
 * @component
 * @example
 * ```tsx
 * <IMActionButton
 *   variant="primary"
 *   onClick={() => console.log('Auto-order triggered')}
 * >
 *   Auto-Order
 * </IMActionButton>
 * ```
 */

interface IMActionButtonProps {
  /** Button text content */
  children: React.ReactNode;
  /** Visual and functional variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
  /** Minimum height for touch targets */
  touchTarget?: boolean;
}

const variantStyles = {
  primary: 'bg-brand-teal-primary hover:bg-brand-teal-light text-white border-0',
  secondary: 'bg-muted hover:bg-muted/80 text-foreground border-border',
  outline: 'bg-transparent hover:bg-muted text-foreground border-border',
  ghost: 'bg-transparent hover:bg-muted/60 text-muted-foreground border-0',
  destructive: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground border-0',
};

const IM_ActionButton: React.FC<IMActionButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  touchTarget = true,
}) => {
  return (
    <motion.div
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
    >
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          ${variantStyles[variant]}
          ${touchTarget ? 'min-h-12 min-w-20' : ''}
          rounded-premium font-semibold transition-all duration-200
          focus:ring-2 focus:ring-brand-teal-primary/20 focus:ring-offset-2
          active:scale-95 disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
        aria-label={loading ? `${children} - Loading` : undefined}
      >
        {loading ? (
          <div className='flex items-center gap-2'>
            <motion.div
              className='h-4 w-4 rounded-full border-2 border-current border-t-transparent'
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            {children}
          </div>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  );
};

export default IM_ActionButton;
