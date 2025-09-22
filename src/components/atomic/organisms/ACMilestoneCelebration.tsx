'use client';

import { Award } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { type CSSProperties, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

// TypeScript interfaces for component props and configuration
interface MilestoneCelebrationProps {
  metric: string;
  metricLabel: string;
  title: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
  // Performance and customization options
  particleCount?: number;
  animationDuration?: number;
  countingDuration?: number;
  disableParticles?: boolean;
  // Accessibility options
  announceToScreenReader?: boolean;
  reduceMotion?: boolean;
}

interface ParticleConfig {
  angle: number;
  distance: number;
  size: number;
  delay: number;
  x: string;
  y: string;
}

interface AnimationConfig {
  duration: number;
  easing: (t: number) => number;
  particleBurstDuration: number;
  countingDelay: number;
}

interface IntersectionObserverConfig {
  threshold: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ThemeConfig {
  glass: string;
  glow: string;
  metricGradient: string;
  label: string;
  title: string;
  text: string;
  iconGradient: string;
  accentColor: string;
}

// Extended CSSProperties to include CSS custom properties
interface ExtendedCSSProperties extends CSSProperties {
  [key: `--${string}`]: string | number;
}

// Advanced animation styles with GPU acceleration and accessibility support
const getAdvancedStyles = (): string => `
  .milestone-container {
    position: relative;
    overflow: hidden;
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .particle {
    position: absolute;
    border-radius: 50%;
    opacity: 0;
    will-change: transform, opacity;
    backface-visibility: hidden;
    pointer-events: none;
  }

  .particle.animate {
    animation: burst 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes burst {
    0% {
      transform: scale(0.5) translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: scale(1) translate3d(var(--x), var(--y), 0);
      opacity: 0;
    }
  }

  .milestone-icon {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, filter;
    backface-visibility: hidden;
  }

  .milestone-container.celebrating .milestone-icon {
    animation: icon-celebration 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes icon-celebration {
    0% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.2) rotate(-10deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  .metric-display {
    will-change: transform;
    backface-visibility: hidden;
  }

  .milestone-container.celebrating .metric-display {
    animation: metric-pulse 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes metric-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  /* Accessibility: Respect user motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .particle,
    .milestone-icon,
    .metric-display {
      animation: none !important;
      transition: none !important;
    }
    .particle.animate {
      opacity: 0.3;
      transform: scale(1) translate3d(0, 0, 0);
    }
    .milestone-container.celebrating .milestone-icon,
    .milestone-container.celebrating .metric-display {
      animation: none !important;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .milestone-container {
      border-width: 2px;
    }
    .particle {
      display: none;
    }
  }

  /* Focus management for accessibility */
  .milestone-container:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }
`;

// Particle burst component with performance optimizations
const Particles = React.memo(
  ({
    isBursting,
    accentColor,
    particleCount = 20,
    disabled = false,
  }: {
    isBursting: boolean;
    accentColor: string;
    particleCount?: number;
    disabled?: boolean;
  }) => {
    // Memoized particle configuration for consistent physics
    const particles = useMemo((): ParticleConfig[] => {
      if (disabled) return [];

      return Array.from({ length: particleCount }, (_, i) => {
        const angle = (i / particleCount) * 360;
        const distance = 80 + Math.random() * 40; // 80-120px range
        const size = 2 + Math.random() * 4; // 2-6px range
        const delay = Math.random() * 200; // 0-200ms range

        return {
          angle,
          distance,
          size,
          delay,
          x: `${Math.cos((angle * Math.PI) / 180) * distance}px`,
          y: `${Math.sin((angle * Math.PI) / 180) * distance}px`,
        };
      });
    }, [particleCount, disabled]);

    if (disabled) return null;

    return (
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        {particles.map((particle, i) => (
          <div
            key={i}
            className={cn('particle', isBursting && 'animate')}
            style={
              {
                '--x': particle.x,
                '--y': particle.y,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                top: '50%',
                left: '50%',
                background: accentColor,
                animationDelay: `${particle.delay}ms`,
              } as ExtendedCSSProperties
            }
          />
        ))}
      </div>
    );
  }
);

Particles.displayName = 'Particles';

// Custom hook for intersection observer with proper cleanup
const useInView = (config: IntersectionObserverConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    try {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (config.triggerOnce && observerRef.current) {
              observerRef.current.unobserve(entry.target);
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        },
        {
          threshold: config.threshold,
          rootMargin: config.rootMargin || '0px',
        }
      );

      observerRef.current.observe(element);
    } catch (error) {
      console.warn('ACMilestoneCelebration: IntersectionObserver error', error);
      // Fallback: trigger immediately if observer fails
      setIsInView(true);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [config.threshold, config.rootMargin, config.triggerOnce]);

  return [containerRef, isInView] as const;
};

// Memoized theme configuration with next-themes integration
const THEME_CONFIG: Record<string, ThemeConfig> = {
  dark: {
    glass: 'bg-black/40 border-slate-800/80',
    glow: 'shadow-[inset_0_0_40px_rgba(45,212,191,0.1)]',
    metricGradient: 'from-slate-100 to-slate-400',
    label: 'text-teal-400',
    title: 'text-slate-100',
    text: 'text-slate-300',
    iconGradient: 'from-teal-900 to-slate-800',
    accentColor: '#2DD4BF',
  },
  light: {
    glass: 'bg-white/60 border-slate-300',
    glow: 'shadow-[inset_0_0_40px_rgba(147,51,234,0.1)]',
    metricGradient: 'from-slate-800 to-slate-600',
    label: 'text-purple-600',
    title: 'text-slate-900',
    text: 'text-slate-700',
    iconGradient: 'from-purple-200 to-indigo-100',
    accentColor: '#9333EA',
  },
} as const;

/**
 * ACMilestoneCelebration - A sophisticated milestone celebration component
 *
 * Features:
 * - Advanced particle burst system with 20 particles radiating in 360-degree patterns
 * - Scroll-triggered IntersectionObserver integration for viewport-based animation triggers
 * - Complex number counting animation with easing functions and requestAnimationFrame
 * - Dynamic particle physics with random positioning, sizing, and timing
 * - Performance-optimized animations using CSS custom properties and cubic-bezier easing
 * - Glass morphism design with gradient overlays and backdrop blur effects
 * - Accessibility compliance with prefers-reduced-motion and ARIA attributes
 * - TypeScript support with comprehensive interfaces
 * - next-themes integration for consistent theming
 * - Production-grade error handling and memory management
 */
export function ACMilestoneCelebration({
  metric,
  metricLabel,
  title,
  children,
  className,
  style,
  'data-testid': testId,
  // Performance options
  particleCount = 20,
  animationDuration = 800,
  countingDuration = 2000,
  disableParticles = false,
  // Accessibility options
  announceToScreenReader = true,
  reduceMotion = false,
  ...props
}: MilestoneCelebrationProps) {
  const metricRef = useRef<HTMLSpanElement>(null);
  const [containerRef, isInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const [isBursting, setIsBursting] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const animationFrameRef = useRef<number>();
  const { theme, resolvedTheme } = useTheme();

  // Determine current theme with fallback
  const currentTheme = useMemo(() => {
    const effectiveTheme = resolvedTheme || theme || 'dark';
    return effectiveTheme === 'dark' ? 'dark' : 'light';
  }, [theme, resolvedTheme]);

  // Memoized theme configuration
  const themeConfig = useMemo(() => THEME_CONFIG[currentTheme], [currentTheme]);

  // Memoized animation configuration
  const animationConfig = useMemo(
    (): AnimationConfig => ({
      duration: countingDuration,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      particleBurstDuration: animationDuration,
      countingDelay: 100,
    }),
    [countingDuration, animationDuration]
  );

  // Check if reduced motion is preferred
  const shouldReduceMotion = useMemo(() => {
    if (reduceMotion) return true;
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, [reduceMotion]);

  // Performance-optimized number counting animation
  const animateCount = useCallback(() => {
    if (!metricRef.current || !isInView) return;

    try {
      const targetValue = parseInt(metric.replace(/,/g, ''), 10);
      if (isNaN(targetValue)) {
        console.warn('ACMilestoneCelebration: Invalid metric value', metric);
        return;
      }

      let currentValue = 0;
      const startTime = performance.now();

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationConfig.duration, 1);
        currentValue = Math.floor(animationConfig.easing(progress) * targetValue);

        if (metricRef.current) {
          metricRef.current.textContent = currentValue.toLocaleString();
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else if (metricRef.current) {
          metricRef.current.textContent = targetValue.toLocaleString();

          // Announce completion to screen readers
          if (announceToScreenReader) {
            const announcement = `Milestone achieved: ${targetValue.toLocaleString()} ${metricLabel}`;
            const ariaLive = document.createElement('div');
            ariaLive.setAttribute('aria-live', 'polite');
            ariaLive.setAttribute('aria-atomic', 'true');
            ariaLive.className = 'sr-only';
            ariaLive.textContent = announcement;
            document.body.appendChild(ariaLive);
            setTimeout(() => document.body.removeChild(ariaLive), 1000);
          }
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error('ACMilestoneCelebration: Animation error', error);
      // Fallback: set final value immediately
      if (metricRef.current) {
        const targetValue = parseInt(metric.replace(/,/g, ''), 10);
        metricRef.current.textContent = isNaN(targetValue) ? metric : targetValue.toLocaleString();
      }
    }
  }, [isInView, metric, animationConfig, metricLabel, announceToScreenReader]);

  // Trigger celebration effects when in view
  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      // Delay for better visual coordination
      const celebrationTimer = setTimeout(() => {
        setIsBursting(true);
        setIsCelebrating(true);
        animateCount();

        // Reset burst state after animation
        const resetTimer = setTimeout(() => {
          setIsBursting(false);
          setIsCelebrating(false);
        }, animationConfig.particleBurstDuration);

        return () => clearTimeout(resetTimer);
      }, animationConfig.countingDelay);

      return () => clearTimeout(celebrationTimer);
    } else if (isInView && shouldReduceMotion) {
      // Immediate count for reduced motion
      animateCount();
    }
  }, [isInView, shouldReduceMotion, animateCount, animationConfig]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Memoized CSS custom properties
  const cssCustomProperties = useMemo(
    (): ExtendedCSSProperties => ({
      '--accent-color': themeConfig.accentColor,
      ...style,
    }),
    [themeConfig.accentColor, style]
  );

  return (
    <>
      {/* Inject advanced styles */}
      <style dangerouslySetInnerHTML={{ __html: getAdvancedStyles() }} />

      <div
        ref={containerRef}
        className={cn(
          'milestone-container my-12 rounded-2xl border p-8 text-center backdrop-blur-xl',
          themeConfig.glass,
          themeConfig.glow,
          isCelebrating && 'celebrating',
          className
        )}
        style={cssCustomProperties}
        data-testid={testId}
        role='region'
        aria-labelledby='milestone-title'
        aria-describedby='milestone-description'
        tabIndex={0}
        {...props}
      >
        {/* Particle burst system */}
        <Particles
          isBursting={isBursting}
          accentColor={themeConfig.accentColor}
          particleCount={particleCount}
          disabled={disableParticles || shouldReduceMotion}
        />

        {/* Icon with celebration animation */}
        <div
          className={cn(
            'mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br',
            themeConfig.iconGradient
          )}
        >
          <Award size={32} className={cn('milestone-icon', themeConfig.label)} aria-hidden='true' />
        </div>

        {/* Metric display with counting animation */}
        <div className='metric-display'>
          <span
            ref={metricRef}
            className={cn(
              'bg-gradient-to-b bg-clip-text text-7xl font-black text-transparent',
              themeConfig.metricGradient
            )}
            aria-live='polite'
            aria-atomic='true'
          >
            0
          </span>
          <span className={cn('ml-2 text-4xl font-bold', themeConfig.label)} aria-label={metricLabel}>
            {metricLabel}
          </span>
        </div>

        {/* Title and description */}
        <h4 id='milestone-title' className={cn('mt-2 text-xl font-bold', themeConfig.title)}>
          {title}
        </h4>
        <div id='milestone-description' className={cn('mx-auto mt-2 max-w-md text-base', themeConfig.text)}>
          {children}
        </div>
      </div>
    </>
  );
}

// Export the component as default for compatibility
export default ACMilestoneCelebration;

// Type exports for external usage
export type { AnimationConfig, IntersectionObserverConfig, MilestoneCelebrationProps, ParticleConfig, ThemeConfig };
