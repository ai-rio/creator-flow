'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-premium transition-all duration-200',
  {
    variants: {
      variant: {
        new: 'bg-success-emerald-500/10 text-success-emerald-700 border border-success-emerald-500/20',
        popular: 'bg-warning-amber-500/10 text-warning-amber-700 border border-warning-amber-500/20',
        trending: 'bg-brand-teal-primary/10 text-brand-teal-primary border border-brand-teal-primary/20',
      },
    },
    defaultVariants: {
      variant: 'new',
    },
  }
);

export interface FP010FeatureBadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

/**
 * FP010FeatureBadge - Atomic Badge Component for Features Page
 *
 * Atomic design badge component with translation support and CreatorFlow theming.
 * Client-side component for translation access.
 *
 * Variants:
 * - new: Green badge for new features
 * - popular: Amber badge for popular features
 * - trending: Teal badge for trending features
 */
export function FP010FeatureBadge({ className, variant = 'new', ...props }: FP010FeatureBadgeProps) {
  const t = useTranslations('components.atomic.atoms.FP010FeatureBadge');

  const getBadgeText = (v: typeof variant) => {
    switch (v) {
      case 'new':
        return t('new');
      case 'popular':
        return t('popular');
      case 'trending':
        return t('trending');
      default:
        return t('new');
    }
  };

  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props}>
      {getBadgeText(variant)}
    </div>
  );
}
