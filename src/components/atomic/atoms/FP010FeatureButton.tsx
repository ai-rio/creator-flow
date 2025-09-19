import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 focus:ring-primary',
        secondary:
          'border border-border bg-background text-foreground hover:bg-muted hover:scale-105 focus:ring-primary',
        ghost: 'text-primary hover:text-primary/80 hover:bg-primary/10',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-premium',
        md: 'h-10 px-4 py-2 text-sm rounded-premium',
        lg: 'h-12 px-8 text-lg rounded-premium',
        xl: 'h-14 px-10 text-xl rounded-premium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface FP010FeatureButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

/**
 * FP010FeatureButton - Atomic Button Component for Features Page
 *
 * Atomic design button component with CreatorFlow theme integration.
 * Supports multiple variants and sizes with consistent styling.
 *
 * Variants:
 * - primary: Main action buttons with primary brand colors
 * - secondary: Secondary actions with outlined style
 * - ghost: Subtle buttons for tertiary actions
 * - link: Text-only link-style buttons
 */
export function FP010FeatureButton({ className, variant, size, children, ...props }: FP010FeatureButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
}
