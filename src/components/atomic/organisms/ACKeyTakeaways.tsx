'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { cn } from '@/lib/utils';

// TypeScript interfaces for component props and data structures
export interface TakeawayItem {
  content: React.ReactNode;
  id?: string;
}

export interface KeyTakeawaysProps {
  /**
   * The title/heading for the takeaways section
   * @default "Key Takeaways"
   */
  title?: string;

  /**
   * Array of takeaway items - can be strings or React nodes
   */
  takeaways: (string | TakeawayItem)[];

  /**
   * Custom CSS classes for the container
   */
  className?: string;

  /**
   * Heading level for semantic HTML and SEO
   * @default "h3"
   */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Enable/disable entrance animations
   * @default true
   */
  enableAnimations?: boolean;

  /**
   * Custom structured data for SEO
   */
  structuredData?: {
    articleId?: string;
    datePublished?: string;
    author?: string;
  };

  /**
   * ARIA label for the takeaways list
   */
  ariaLabel?: string;
}

// Animation variants for staggered entrance effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
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
      stiffness: 300,
      damping: 30,
    },
  },
};

const iconVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 20,
    },
  },
  tap: { scale: 0.95 },
};

/**
 * ACKeyTakeaways - SEO/GEO-optimized Key Takeaways component
 *
 * A strategic component designed as "answer blocks" for AI and search engines.
 * Features clean, scannable list design with glass morphism styling and
 * subtle motion enhancements while maintaining focus on content accessibility.
 *
 * Key features:
 * - SEO-optimized markup for featured snippets
 * - Glass morphism styling with theme awareness
 * - Subtle entrance animations and hover effects
 * - Comprehensive accessibility with proper ARIA labels
 * - Structured data markup for search visibility
 * - TypeScript interfaces for type safety
 */
export function ACKeyTakeaways({
  title = 'Key Takeaways',
  takeaways,
  className,
  headingLevel: HeadingTag = 'h3',
  enableAnimations = true,
  structuredData,
  ariaLabel,
}: KeyTakeawaysProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Normalize takeaways to consistent format
  const normalizedTakeaways = takeaways.map((takeaway, index) => {
    if (typeof takeaway === 'string') {
      return {
        content: takeaway,
        id: `takeaway-${index}`,
      };
    }
    return {
      ...takeaway,
      id: takeaway.id || `takeaway-${index}`,
    };
  });

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!structuredData) return null;

    const structuredDataObject = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': structuredData.articleId,
      datePublished: structuredData.datePublished,
      author: structuredData.author
        ? {
            '@type': 'Person',
            name: structuredData.author,
          }
        : undefined,
      mainEntity: {
        '@type': 'ItemList',
        name: title,
        numberOfItems: normalizedTakeaways.length,
        itemListElement: normalizedTakeaways.map((takeaway, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: typeof takeaway.content === 'string' ? takeaway.content : `Key point ${index + 1}`,
        })),
      },
    };

    return (
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredDataObject),
        }}
      />
    );
  };

  // Theme-aware styling classes
  const themeClasses = {
    container: cn(
      'my-8 rounded-xl border p-6 backdrop-blur-xl transition-all duration-300',
      isDark ? 'bg-black/40 border-slate-800/80 hover:bg-black/50' : 'bg-white/60 border-slate-300 hover:bg-white/70',
      className
    ),
    title: cn('mb-4 flex items-center text-lg font-bold', isDark ? 'text-slate-100' : 'text-slate-900'),
    listItem: cn(
      'flex items-start text-base transition-colors duration-200',
      isDark ? 'text-slate-300' : 'text-slate-700'
    ),
    icon: cn('mr-4 mt-1 flex-shrink-0 transition-colors duration-200', isDark ? 'text-teal-400' : 'text-purple-600'),
    content: cn('leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-700'),
  };

  const MotionContainer = enableAnimations ? motion.div : 'div';
  const MotionList = enableAnimations ? motion.ul : 'ul';
  const MotionItem = enableAnimations ? motion.li : 'li';
  const MotionIcon = enableAnimations ? motion.div : 'div';

  const containerProps = enableAnimations
    ? {
        initial: 'hidden',
        animate: 'visible',
        variants: containerVariants,
      }
    : {};

  const listProps = enableAnimations
    ? {
        variants: containerVariants,
      }
    : {};

  const itemProps = enableAnimations
    ? {
        variants: itemVariants,
        whileHover: 'hover',
        whileTap: 'tap',
      }
    : {};

  const iconProps = enableAnimations
    ? {
        variants: iconVariants,
        initial: 'initial',
        whileHover: 'hover',
        whileTap: 'tap',
      }
    : {};

  return (
    <>
      {generateStructuredData()}
      <MotionContainer
        className={themeClasses.container}
        role='complementary'
        aria-labelledby='key-takeaways-heading'
        {...containerProps}
      >
        <HeadingTag id='key-takeaways-heading' className={themeClasses.title}>
          {title}
        </HeadingTag>

        <MotionList
          className='space-y-4'
          role='list'
          aria-label={ariaLabel || `${title} list with ${normalizedTakeaways.length} items`}
          {...listProps}
        >
          {normalizedTakeaways.map((takeaway, index) => (
            <MotionItem
              key={takeaway.id}
              className={themeClasses.listItem}
              role='listitem'
              aria-label={`Key takeaway ${index + 1}`}
              {...itemProps}
            >
              <MotionIcon {...iconProps}>
                <CheckCircle2 size={20} className={themeClasses.icon} aria-hidden='true' />
              </MotionIcon>
              <span className={themeClasses.content}>{takeaway.content}</span>
            </MotionItem>
          ))}
        </MotionList>
      </MotionContainer>
    </>
  );
}

// Named export for consistency with atomic design patterns
export { ACKeyTakeaways as KeyTakeaways };

// Default export for convenience
export default ACKeyTakeaways;
