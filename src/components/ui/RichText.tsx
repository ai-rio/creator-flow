'use client';

import React from 'react';
import { ReactElement, ReactNode } from 'react';

interface RichTextProps {
  children: (tags: Record<string, (chunks: ReactNode) => ReactElement>) => ReactNode;
  className?: string;
}

/**
 * RichText Component for Translation-Aware Interactive Elements
 *
 * Enables complex translations with embedded components and rich formatting.
 * Used with next-intl's rich text translation features.
 *
 * @example
 * ```tsx
 * // In translation file:
 * "welcome": "Welcome <strategicLink>strategic creator</strategicLink>! Click <actionButton>here</actionButton> to start."
 *
 * // In component:
 * <RichText>
 *   {(tags) => t.rich('welcome', {
 *     ...tags,
 *     strategicLink: (chunks) => (
 *       <span className="text-brand-teal-primary font-semibold">{chunks}</span>
 *     ),
 *     actionButton: (chunks) => (
 *       <button onClick={handleAction} className="underline text-primary">
 *         {chunks}
 *       </button>
 *     )
 *   })}
 * </RichText>
 * ```
 */
export default function RichText({ children, className = '' }: RichTextProps): ReactElement {
  // Default tag implementations for common rich text patterns
  const defaultTags = {
    // Strategic emphasis
    strong: (chunks: ReactNode) => <strong className='font-semibold text-foreground'>{chunks}</strong>,

    // Brand emphasis
    brand: (chunks: ReactNode) => <span className='font-medium text-brand-teal-primary'>{chunks}</span>,

    // Strategic links
    strategicLink: (chunks: ReactNode) => (
      <span className='font-semibold text-brand-teal-primary underline decoration-brand-teal-primary/30 underline-offset-4'>
        {chunks}
      </span>
    ),

    // Action buttons (inline)
    actionButton: (chunks: ReactNode) => (
      <button className='inline-flex items-center text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary'>
        {chunks}
      </button>
    ),

    // Emphasis text
    em: (chunks: ReactNode) => <em className='italic text-muted-foreground'>{chunks}</em>,

    // Code snippets
    code: (chunks: ReactNode) => (
      <code className='rounded bg-muted px-1 py-0.5 font-mono text-sm text-muted-foreground'>{chunks}</code>
    ),

    // Warning text
    warning: (chunks: ReactNode) => <span className='font-medium text-warning-amber-500'>{chunks}</span>,

    // Success text
    success: (chunks: ReactNode) => <span className='font-medium text-green-600 dark:text-green-400'>{chunks}</span>,

    // Error text
    error: (chunks: ReactNode) => <span className='font-medium text-red-600 dark:text-red-400'>{chunks}</span>,

    // Metric highlighting
    metric: (chunks: ReactNode) => <span className='text-lg font-bold text-foreground'>{chunks}</span>,

    // Small text
    small: (chunks: ReactNode) => <small className='text-sm text-muted-foreground'>{chunks}</small>,
  };

  return <div className={`rich-text ${className}`}>{children(defaultTags)}</div>;
}

/**
 * Utility component for creating custom rich text patterns
 */
export function createRichTextTags(customTags: Record<string, (chunks: ReactNode) => ReactElement>) {
  return (defaultTags: Record<string, (chunks: ReactNode) => ReactElement>) => ({
    ...defaultTags,
    ...customTags,
  });
}

/**
 * Pre-built tag sets for common use cases
 */
export const richTextTagSets = {
  // For order management interfaces
  orderTags: {
    orderId: (chunks: ReactNode) => (
      <code className='rounded bg-blue-50 px-2 py-1 font-mono text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300'>
        #{chunks}
      </code>
    ),
    amount: (chunks: ReactNode) => (
      <span className='text-lg font-bold text-green-600 dark:text-green-400'>${chunks}</span>
    ),
    status: (chunks: ReactNode) => (
      <span className='rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'>
        {chunks}
      </span>
    ),
  },

  // For analytics and metrics
  metricTags: {
    percentage: (chunks: ReactNode) => <span className='text-2xl font-bold text-brand-teal-primary'>{chunks}%</span>,
    increase: (chunks: ReactNode) => (
      <span className='font-semibold text-green-600 dark:text-green-400'>+{chunks}</span>
    ),
    decrease: (chunks: ReactNode) => <span className='font-semibold text-red-600 dark:text-red-400'>-{chunks}</span>,
  },

  // For command center interfaces
  commandTags: {
    alert: (chunks: ReactNode) => (
      <span className='inline-flex items-center gap-1 font-medium text-warning-amber-500'>
        <span className='h-2 w-2 animate-pulse rounded-full bg-warning-amber-500'></span>
        {chunks}
      </span>
    ),
    critical: (chunks: ReactNode) => (
      <span className='inline-flex items-center gap-1 font-bold text-red-600 dark:text-red-400'>
        <span className='h-2 w-2 animate-pulse rounded-full bg-red-600 dark:bg-red-400'></span>
        {chunks}
      </span>
    ),
    strategic: (chunks: ReactNode) => (
      <span className='text-sm font-bold uppercase tracking-wide text-brand-teal-primary'>{chunks}</span>
    ),
  },
};
