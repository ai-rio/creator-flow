'use client';

import { ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

// TypeScript Interfaces
interface RelatedArticle {
  category: string;
  title: string;
  href: string;
  id?: string;
}

interface MousePosition {
  x: number;
  y: number;
}

interface Transform3D {
  rotateX: number;
  rotateY: number;
  mouseX: number;
  mouseY: number;
}

interface ExploreFurtherProps {
  relatedArticles: RelatedArticle[];
  title?: string;
  className?: string;
  perspectiveDepth?: number;
  rotationSensitivity?: number;
  enableReducedMotion?: boolean;
  'aria-label'?: string;
}

interface ThemeStyles {
  glass: string;
  title: string;
  cardGlass: string;
  cardCategory: string;
  cardTitle: string;
  cardIcon: string;
  accent: string;
}

// Enhanced 3D Styles Component with Performance Optimizations
const Enhanced3DStyles: React.FC<{
  theme: string;
  perspectiveDepth: number;
  enableReducedMotion: boolean;
}> = React.memo(({ theme, perspectiveDepth, enableReducedMotion }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';

  const styles = useMemo(
    () => `
    .perspective-container {
      perspective: ${perspectiveDepth}px;
      perspective-origin: center center;
    }

    .explore-container {
      position: relative;
      transition: ${enableReducedMotion ? 'none' : 'transform 0.1s linear'};
      transform-style: preserve-3d;
      transform: rotateX(var(--rotate-x, 0)) rotateY(var(--rotate-y, 0));
      will-change: transform;
    }

    .explore-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background: ${
        enableReducedMotion
          ? 'transparent'
          : `radial-gradient(
            400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(${accentColor}, 0.15),
            transparent 70%
          )`
      };
      opacity: 0;
      transition: ${enableReducedMotion ? 'none' : 'opacity 0.3s ease-in-out'};
      pointer-events: none;
      z-index: -1;
    }

    .explore-container:hover::before {
      opacity: ${enableReducedMotion ? 0 : 1};
    }

    .explore-card {
      transform: ${enableReducedMotion ? 'none' : 'translateZ(40px)'};
      transition: ${
        enableReducedMotion ? 'none' : 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease'
      };
      box-shadow: ${enableReducedMotion ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 10px 30px -5px rgba(0, 0, 0, 0.3)'};
      will-change: transform, box-shadow;
    }

    .explore-container:hover .explore-card {
      box-shadow: ${enableReducedMotion ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 20px 40px -10px rgba(0, 0, 0, 0.5)'};
    }

    .explore-card:hover {
      transform: ${enableReducedMotion ? 'none' : 'translateZ(60px) scale(1.05)'};
    }

    .explore-card:focus-visible {
      outline: 2px solid rgba(${accentColor}, 0.6);
      outline-offset: 2px;
      transform: ${enableReducedMotion ? 'none' : 'translateZ(60px) scale(1.05)'};
    }

    .explore-arrow {
      transition: ${enableReducedMotion ? 'none' : 'transform 0.3s ease'};
      will-change: transform;
    }

    .explore-card:hover .explore-arrow,
    .explore-card:focus-visible .explore-arrow {
      transform: ${enableReducedMotion ? 'none' : 'translateX(5px)'};
    }

    @media (prefers-reduced-motion: reduce) {
      .perspective-container,
      .explore-container,
      .explore-card,
      .explore-arrow {
        transition: none !important;
        transform: none !important;
        animation: none !important;
      }

      .explore-container::before {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .perspective-container {
        perspective: ${perspectiveDepth * 0.7}px;
      }

      .explore-card {
        transform: ${enableReducedMotion ? 'none' : 'translateZ(20px)'};
      }

      .explore-card:hover {
        transform: ${enableReducedMotion ? 'none' : 'translateZ(30px) scale(1.02)'};
      }
    }
  `,
    [theme, perspectiveDepth, enableReducedMotion, accentColor]
  );

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
});

Enhanced3DStyles.displayName = 'Enhanced3DStyles';

// Main Component
export const ACExploreFurther: React.FC<ExploreFurtherProps> = ({
  relatedArticles,
  title = 'Explore Further',
  className,
  perspectiveDepth = 1000,
  rotationSensitivity = 10,
  enableReducedMotion: propReducedMotion,
  'aria-label': ariaLabel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const shouldReduceMotion = propReducedMotion ?? prefersReducedMotion;
  const currentTheme = resolvedTheme || 'dark';

  // Theme configurations with enhanced contrast and accessibility
  const themeStyles: Record<string, ThemeStyles> = useMemo(
    () => ({
      dark: {
        glass: 'bg-black/40 border-slate-800/80 backdrop-blur-xl',
        title: 'text-slate-100',
        cardGlass: 'bg-slate-900/50 border-slate-800 backdrop-blur-sm',
        cardCategory: 'text-teal-400',
        cardTitle: 'text-slate-100',
        cardIcon: 'text-slate-400 group-hover:text-teal-400 group-focus-visible:text-teal-400',
        accent: 'teal',
      },
      light: {
        glass: 'bg-white/60 border-slate-300 backdrop-blur-xl',
        title: 'text-slate-900',
        cardGlass: 'bg-white/70 border-slate-300 backdrop-blur-sm',
        cardCategory: 'text-purple-600',
        cardTitle: 'text-slate-900',
        cardIcon: 'text-slate-500 group-hover:text-purple-600 group-focus-visible:text-purple-600',
        accent: 'purple',
      },
    }),
    []
  );

  const currentThemeStyles = themeStyles[currentTheme] || themeStyles.dark;

  // Enhanced mouse tracking with error handling and performance optimization
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) return;

      try {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Enhanced rotation calculations with bounds checking
        const rotateX = Math.max(
          -rotationSensitivity,
          Math.min(rotationSensitivity, (y / rect.height - 0.5) * -rotationSensitivity)
        );
        const rotateY = Math.max(
          -rotationSensitivity,
          Math.min(rotationSensitivity, (x / rect.width - 0.5) * rotationSensitivity)
        );

        // Performance-optimized CSS custom property updates
        const container = containerRef.current;
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
        container.style.setProperty('--rotate-x', `${rotateX}deg`);
        container.style.setProperty('--rotate-y', `${rotateY}deg`);
      } catch (error) {
        console.warn('Error in mouse tracking:', error);
      }
    },
    [shouldReduceMotion, rotationSensitivity]
  );

  // Reset transforms on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    try {
      const container = containerRef.current;
      container.style.setProperty('--rotate-x', '0deg');
      container.style.setProperty('--rotate-y', '0deg');
    } catch (error) {
      console.warn('Error resetting transforms:', error);
    }
  }, [shouldReduceMotion]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      target.click();
    }
  }, []);

  // Validate articles data
  const validArticles = useMemo(() => {
    return relatedArticles.filter(
      (article) =>
        article &&
        typeof article.title === 'string' &&
        typeof article.category === 'string' &&
        typeof article.href === 'string'
    );
  }, [relatedArticles]);

  if (!isClient) {
    // SSR fallback without 3D effects
    return (
      <div className={cn('my-12 rounded-2xl border p-8', currentThemeStyles.glass, className)}>
        <h3 className={cn('mb-6 text-2xl font-bold', currentThemeStyles.title)}>{title}</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {validArticles.map((article, index) => (
            <a
              href={article.href}
              key={article.id || index}
              className={cn('group flex flex-col justify-between rounded-xl border p-6', currentThemeStyles.cardGlass)}
            >
              <div>
                <p className={cn('text-sm font-bold uppercase tracking-wider', currentThemeStyles.cardCategory)}>
                  {article.category}
                </p>
                <h4 className={cn('mt-2 text-lg font-bold', currentThemeStyles.cardTitle)}>{article.title}</h4>
              </div>
              <div className={cn('mt-4 flex justify-end', currentThemeStyles.cardIcon)}>
                <ArrowRight size={20} />
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Enhanced3DStyles
        theme={currentTheme}
        perspectiveDepth={perspectiveDepth}
        enableReducedMotion={shouldReduceMotion}
      />
      <div
        className={cn('perspective-container my-12 rounded-2xl border p-8', currentThemeStyles.glass, className)}
        role='region'
        aria-label={ariaLabel || `${title} section with related articles`}
      >
        <h3 className={cn('mb-6 text-2xl font-bold', currentThemeStyles.title)}>{title}</h3>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className='explore-container grid grid-cols-1 gap-6 md:grid-cols-3'
          role='list'
          aria-label='Related articles'
        >
          {validArticles.map((article, index) => (
            <a
              href={article.href}
              key={article.id || index}
              className={cn(
                'explore-card group flex flex-col justify-between rounded-xl border p-6 transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                currentThemeStyles.cardGlass,
                currentTheme === 'dark'
                  ? 'focus-visible:ring-teal-400 focus-visible:ring-offset-slate-900'
                  : 'focus-visible:ring-purple-500 focus-visible:ring-offset-white'
              )}
              onKeyDown={handleKeyDown}
              role='listitem'
              aria-label={`Read article: ${article.title} in ${article.category}`}
              tabIndex={0}
            >
              <div>
                <p className={cn('text-sm font-bold uppercase tracking-wider', currentThemeStyles.cardCategory)}>
                  {article.category}
                </p>
                <h4 className={cn('mt-2 text-lg font-bold leading-tight', currentThemeStyles.cardTitle)}>
                  {article.title}
                </h4>
              </div>
              <div className={cn('mt-4 flex justify-end transition-colors duration-200', currentThemeStyles.cardIcon)}>
                <ArrowRight size={20} className='explore-arrow' aria-hidden='true' />
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

// Performance-optimized export with display name
ACExploreFurther.displayName = 'ACExploreFurther';

export default ACExploreFurther;

// Export types for external use
export type { ExploreFurtherProps, MousePosition, RelatedArticle, Transform3D };
