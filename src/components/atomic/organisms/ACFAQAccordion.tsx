'use client';

import { ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

// TypeScript Interfaces
export interface FAQItem {
  q: string;
  a: ReactNode;
  id?: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  variant?: 'default' | 'minimal' | 'glass';
  allowMultipleOpen?: boolean;
  defaultOpenIndex?: number | null;
  onItemToggle?: (index: number, isOpen: boolean) => void;
  'aria-label'?: string;
}

interface ThemeClasses {
  glass: string;
  questionText: string;
  answerText: string;
  divider: string;
  icon: string;
  button: string;
  container: string;
}

// Enhanced ACFAQAccordion Component
export const ACFAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  className,
  variant = 'default',
  allowMultipleOpen = false,
  defaultOpenIndex = null,
  onItemToggle,
  'aria-label': ariaLabel = 'Frequently Asked Questions',
}) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // State management for open items
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    defaultOpenIndex !== null ? new Set([defaultOpenIndex]) : new Set()
  );

  // Refs for focus management
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Error handling for malformed items
  const validItems = useMemo(() => {
    return items.filter((item, index) => {
      if (!item || typeof item.q !== 'string' || !item.a) {
        console.warn(`FAQ item at index ${index} is malformed and will be skipped`);
        return false;
      }
      return true;
    });
  }, [items]);

  // Theme classes with glass morphism support
  const themeClasses: ThemeClasses = useMemo(() => {
    const baseClasses = {
      dark: {
        glass: 'bg-black/40 border-slate-800/80 backdrop-blur-xl',
        questionText: 'text-slate-100',
        answerText: 'text-slate-300',
        divider: 'border-slate-800',
        icon: 'text-slate-400',
        button: 'hover:bg-white/5 focus:bg-white/5',
        container: 'bg-slate-900/50',
      },
      light: {
        glass: 'bg-white/60 border-slate-300 backdrop-blur-xl',
        questionText: 'text-slate-900',
        answerText: 'text-slate-700',
        divider: 'border-slate-200/80',
        icon: 'text-slate-500',
        button: 'hover:bg-black/5 focus:bg-black/5',
        container: 'bg-white/50',
      },
    };

    return isDark ? baseClasses.dark : baseClasses.light;
  }, [isDark]);

  // Variant styles
  const variantClasses = useMemo(() => {
    const variants = {
      default: {
        container: `rounded-xl border ${themeClasses.glass}`,
        item: '',
        button: 'p-6',
        answer: 'px-6 pb-6',
      },
      minimal: {
        container: `border-l-2 ${isDark ? 'border-slate-700' : 'border-slate-300'} ${themeClasses.container}`,
        item: '',
        button: 'p-4',
        answer: 'px-4 pb-4',
      },
      glass: {
        container: `rounded-2xl border ${themeClasses.glass} shadow-2xl`,
        item: '',
        button: 'p-8',
        answer: 'px-8 pb-8',
      },
    };

    return variants[variant];
  }, [variant, themeClasses, isDark]);

  // Optimized toggle function with performance considerations
  const toggleItem = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const newIndices = new Set(prev);
        const isCurrentlyOpen = newIndices.has(index);

        if (allowMultipleOpen) {
          if (isCurrentlyOpen) {
            newIndices.delete(index);
          } else {
            newIndices.add(index);
          }
        } else {
          // Single-open behavior (preserve original functionality)
          if (isCurrentlyOpen) {
            newIndices.clear();
          } else {
            newIndices.clear();
            newIndices.add(index);
          }
        }

        // Callback for external state management
        onItemToggle?.(index, !isCurrentlyOpen);

        return newIndices;
      });
    },
    [allowMultipleOpen, onItemToggle]
  );

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          toggleItem(index);
          break;
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = (index + 1) % validItems.length;
          buttonRefs.current[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = (index - 1 + validItems.length) % validItems.length;
          buttonRefs.current[prevIndex]?.focus();
          break;
        case 'Home':
          event.preventDefault();
          buttonRefs.current[0]?.focus();
          break;
        case 'End':
          event.preventDefault();
          buttonRefs.current[validItems.length - 1]?.focus();
          break;
      }
    },
    [toggleItem, validItems.length]
  );

  // Prefers-reduced-motion support
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const animationClasses = prefersReducedMotion ? 'transition-none' : 'transition-all duration-300 ease-in-out';

  const iconAnimationClasses = prefersReducedMotion ? '' : 'transition-transform duration-300';

  // Generate structured data for SEO
  const structuredData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: validItems.map((item, index) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof item.a === 'string' ? item.a : `Answer ${index + 1}`,
        },
      })),
    };
  }, [validItems]);

  // Effect to inject structured data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [structuredData]);

  // Callback ref function for button refs
  const setButtonRef = useCallback((index: number) => {
    return (el: HTMLButtonElement | null) => {
      buttonRefs.current[index] = el;
    };
  }, []);

  if (!validItems.length) {
    return <div className={cn('p-4 text-center', themeClasses.answerText)}>No valid FAQ items available.</div>;
  }

  return (
    <div className={cn('my-12', variantClasses.container, className)} role='region' aria-label={ariaLabel}>
      <div className={cn('divide-y', themeClasses.divider)}>
        {validItems.map((item, index) => {
          const isOpen = openIndices.has(index);
          const itemId = item.id || `faq-item-${index}`;
          const answerId = `faq-answer-${itemId}`;

          return (
            <div key={itemId} className={variantClasses.item}>
              <button
                ref={setButtonRef(index)}
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={cn(
                  'flex w-full items-center justify-between text-left',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isDark
                    ? 'focus-visible:ring-slate-400 focus-visible:ring-offset-slate-900'
                    : 'focus-visible:ring-slate-500 focus-visible:ring-offset-white',
                  variantClasses.button,
                  themeClasses.button,
                  animationClasses
                )}
                aria-expanded={isOpen}
                aria-controls={answerId}
                id={`faq-button-${itemId}`}
                type='button'
              >
                <h3 className={cn('pr-4 text-lg font-semibold', themeClasses.questionText)}>{item.q}</h3>
                <ChevronDown
                  size={24}
                  className={cn(
                    'flex-shrink-0',
                    themeClasses.icon,
                    iconAnimationClasses,
                    isOpen && 'rotate-180 transform'
                  )}
                  aria-hidden='true'
                />
              </button>

              <div
                id={answerId}
                className={cn(
                  'grid overflow-hidden',
                  animationClasses,
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
                aria-labelledby={`faq-button-${itemId}`}
                role='region'
              >
                <div className='overflow-hidden'>
                  <div className={cn('text-base leading-relaxed', themeClasses.answerText, variantClasses.answer)}>
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Default export for easier imports
export default ACFAQAccordion;
