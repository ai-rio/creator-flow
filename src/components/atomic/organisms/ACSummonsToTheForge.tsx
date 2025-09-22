'use client';

import { Command } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { forwardRef, useCallback, useMemo, useRef } from 'react';

import { cn } from '@/lib/utils';

// ====================================================================
// TypeScript Interfaces & Types
// ====================================================================

/**
 * CTA (Call-to-Action) data interface
 */
export interface CTAData {
  /** The text displayed on the CTA button */
  text: string;
  /** The URL or path the CTA button links to */
  href: string;
  /** Optional target attribute for the link */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Optional rel attribute for the link */
  rel?: string;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * Theme variant type for styling customization
 */
export type ThemeVariant = 'light' | 'dark' | 'auto';

/**
 * Animation timing configuration
 */
export interface AnimationConfig {
  /** Nebula flow animation duration in seconds */
  nebulaFlowDuration?: number;
  /** Pulse animation base duration in seconds */
  pulseDuration?: number;
  /** Pulse animation hover duration in seconds */
  pulseHoverDuration?: number;
  /** CTA sheen animation duration in seconds */
  ctaSheenDuration?: number;
  /** Circuit draw animation duration in seconds */
  circuitDrawDuration?: number;
}

/**
 * Analytics tracking interface
 */
export interface AnalyticsConfig {
  /** Function to call when CTA is clicked */
  onCTAClick?: (ctaData: CTAData) => void;
  /** Track ID for analytics purposes */
  trackingId?: string;
}

/**
 * Accessibility configuration
 */
export interface AccessibilityConfig {
  /** Respect user's motion preferences */
  respectMotionPreference?: boolean;
  /** Custom aria-label for the main container */
  containerAriaLabel?: string;
  /** Custom aria-describedby for additional context */
  ariaDescribedBy?: string;
}

/**
 * Main component props interface
 */
export interface SummonsToTheForgeProps {
  /** CTA configuration */
  cta: CTAData;
  /** Theme variant override (defaults to system theme) */
  themeVariant?: ThemeVariant;
  /** Custom animation timing configuration */
  animationConfig?: AnimationConfig;
  /** Analytics tracking configuration */
  analytics?: AnalyticsConfig;
  /** Accessibility configuration */
  accessibility?: AccessibilityConfig;
  /** Additional CSS classes */
  className?: string;
  /** Custom headline text */
  headline?: string;
  /** Custom description text */
  description?: string;
  /** Custom emblem icon */
  emblemIcon?: React.ComponentType<{ size?: number; className?: string }>;
  /** Disable animations completely */
  disableAnimations?: boolean;
}

// ====================================================================
// Animation Styles Component
// ====================================================================

interface AnimationStylesProps {
  theme: 'light' | 'dark';
  animationConfig: Required<AnimationConfig>;
  respectMotion: boolean;
}

const AnimationStyles = React.memo<AnimationStylesProps>(({ theme, animationConfig, respectMotion }) => {
  const accentColor = theme === 'dark' ? '45, 212, 191' : '147, 51, 234';

  const styles = useMemo(
    () => `
    @keyframes nebula-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1) translateZ(0);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.1) translateZ(0);
        opacity: 0.8;
      }
    }

    @keyframes cta-sheen {
      0% { transform: translateX(-150%) skewX(-20deg) translateZ(0); }
      100% { transform: translateX(150%) skewX(-20deg) translateZ(0); }
    }

    @keyframes draw-circuit {
      to { stroke-dashoffset: 0; }
    }

    .summons-artifact {
      position: relative;
      overflow: hidden;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
      transform: translateZ(0);
    }

    .summons-nebula-bg {
      position: absolute;
      inset: -100%;
      background: radial-gradient(ellipse at center, rgba(${accentColor}, 0.15) 0%, transparent 50%);
      animation: ${respectMotion ? 'none' : `nebula-flow ${animationConfig.nebulaFlowDuration}s linear infinite`};
      transition: opacity 0.5s ease;
      will-change: background-position;
    }

    .summons-circuitry {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      stroke-width: 1;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      will-change: stroke-dashoffset;
    }

    .summons-artifact:hover .summons-circuitry {
      animation: ${
        respectMotion ? 'none' : `draw-circuit ${animationConfig.circuitDrawDuration}s ease-in-out forwards`
      };
    }

    .summons-grid-overlay {
      position: absolute;
      inset: 0;
      background-size: 40px 40px;
      background-image:
        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
    }

    .summons-artifact::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(${accentColor}, 0.2), transparent 50%);
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      will-change: opacity;
    }

    .summons-artifact:hover::before {
      opacity: 1;
    }

    .summons-emblem-pulse {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(${accentColor}, 0.5);
      animation: ${respectMotion ? 'none' : `pulse ${animationConfig.pulseDuration}s ease-in-out infinite`};
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform, animation-duration;
    }

    .summons-artifact:hover .summons-emblem-pulse {
      animation-duration: ${respectMotion ? '0s' : `${animationConfig.pulseHoverDuration}s`};
      transform: scale(1.2) translateZ(0);
    }

    .summons-cta-button {
      position: relative;
      overflow: hidden;
      will-change: transform;
    }

    .summons-cta-sheen {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
      animation: ${respectMotion ? 'none' : `cta-sheen ${animationConfig.ctaSheenDuration}s infinite linear`};
      animation-delay: 1s;
      will-change: transform;
    }

    /* Performance optimizations */
    .summons-artifact * {
      backface-visibility: hidden;
      perspective: 1000px;
    }

    /* Reduced motion fallbacks */
    @media (prefers-reduced-motion: reduce) {
      .summons-artifact,
      .summons-nebula-bg,
      .summons-circuitry,
      .summons-emblem-pulse,
      .summons-cta-sheen {
        animation: none !important;
        transition-duration: 0.1s !important;
      }
    }
  `,
    [accentColor, animationConfig, respectMotion]
  );

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
});

AnimationStyles.displayName = 'AnimationStyles';

// ====================================================================
// Main Component
// ====================================================================

export const ACSummonsToTheForge = forwardRef<HTMLDivElement, SummonsToTheForgeProps>(
  (
    {
      cta,
      themeVariant = 'auto',
      animationConfig = {},
      analytics,
      accessibility = {},
      className,
      headline = 'The Summons to the Forge',
      description = "You've seen the theory. Now it's time to command the practice. This is the entry point to the operational command center.",
      emblemIcon: EmblemIcon = Command,
      disableAnimations = false,
      ...props
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const cardRef = useRef<HTMLDivElement>(null);

    // Determine effective theme
    const effectiveTheme = useMemo(() => {
      if (themeVariant === 'auto') {
        return systemTheme === 'dark' ? 'dark' : 'light';
      }
      return themeVariant;
    }, [themeVariant, systemTheme]);

    // Merge animation config with defaults
    const mergedAnimationConfig = useMemo<Required<AnimationConfig>>(
      () => ({
        nebulaFlowDuration: 20,
        pulseDuration: 3,
        pulseHoverDuration: 1.5,
        ctaSheenDuration: 2.5,
        circuitDrawDuration: 2,
        ...animationConfig,
      }),
      [animationConfig]
    );

    // Check for motion preferences
    const respectMotionPreference = accessibility.respectMotionPreference ?? true;
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    const shouldReduceMotion = disableAnimations || (respectMotionPreference && prefersReducedMotion);

    // Mouse tracking for radial gradient effect
    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || shouldReduceMotion) return;

        try {
          const rect = cardRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          cardRef.current.style.setProperty('--mouse-x', `${x}px`);
          cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        } catch (error) {
          console.warn('Mouse tracking failed:', error);
        }
      },
      [shouldReduceMotion]
    );

    // CTA click handler with analytics
    const handleCTAClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (analytics?.onCTAClick) {
          try {
            analytics.onCTAClick(cta);
          } catch (error) {
            console.warn('Analytics tracking failed:', error);
          }
        }
      },
      [analytics, cta]
    );

    // Theme-specific styling
    const themeClasses = useMemo(() => {
      const themes = {
        dark: {
          glass: 'bg-black/40 border-slate-800/80',
          headline: 'text-slate-100',
          text: 'text-slate-300',
          emblemBg: 'bg-slate-900',
          ctaBg: 'bg-teal-500 hover:bg-teal-400',
          ctaText: 'text-white',
          accentColor: '#2DD4BF',
        },
        light: {
          glass: 'bg-white/60 border-slate-300',
          headline: 'text-slate-900',
          text: 'text-slate-700',
          emblemBg: 'bg-slate-200',
          ctaBg: 'bg-purple-600 hover:bg-purple-500',
          ctaText: 'text-white',
          accentColor: '#9333EA',
        },
      };
      return themes[effectiveTheme];
    }, [effectiveTheme]);

    // ARIA attributes
    const ariaAttributes = useMemo(
      () => ({
        'aria-label': accessibility.containerAriaLabel || 'Call to action: Enter the command center',
        'aria-describedby': accessibility.ariaDescribedBy,
        role: 'region',
      }),
      [accessibility]
    );

    return (
      <>
        <AnimationStyles
          theme={effectiveTheme}
          animationConfig={mergedAnimationConfig}
          respectMotion={shouldReduceMotion}
        />
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={cn('summons-artifact my-12 rounded-2xl border backdrop-blur-xl', themeClasses.glass, className)}
          {...ariaAttributes}
          {...props}
        >
          {/* Animated background layers */}
          <div className='summons-nebula-bg' aria-hidden='true' />
          <div className='summons-grid-overlay' aria-hidden='true' />

          {/* SVG Circuit Animation */}
          <svg className='summons-circuitry' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
            <path d='M1 1H100V100' stroke={themeClasses.accentColor} strokeOpacity='0.3' />
            <path d='M1 200V100H200' stroke={themeClasses.accentColor} strokeOpacity='0.3' />
          </svg>

          {/* Main content */}
          <div className='relative z-10 flex flex-col items-center p-8 text-center'>
            {/* Emblem with pulsing effect */}
            <div
              className={cn(
                'relative mb-6 flex h-20 w-20 items-center justify-center rounded-full',
                themeClasses.emblemBg
              )}
              aria-hidden='true'
            >
              <div className='summons-emblem-pulse' />
              <EmblemIcon
                size={40}
                className={cn(
                  'relative transition-transform duration-500 group-hover:scale-110',
                  effectiveTheme === 'dark' ? 'text-teal-400' : 'text-purple-500'
                )}
              />
            </div>

            {/* Headline */}
            <h3 className={cn('text-3xl font-black', themeClasses.headline)}>{headline}</h3>

            {/* Description */}
            <p className={cn('mx-auto mt-2 max-w-md', themeClasses.text)}>{description}</p>

            {/* CTA Button */}
            <a
              href={cta.href}
              target={cta.target}
              rel={cta.rel}
              onClick={handleCTAClick}
              className={cn(
                'summons-cta-button mt-6 inline-block transform rounded-lg px-8 py-3 font-bold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
                themeClasses.ctaBg,
                themeClasses.ctaText,
                effectiveTheme === 'dark'
                  ? 'focus:ring-teal-400 focus:ring-offset-slate-900'
                  : 'focus:ring-purple-500 focus:ring-offset-white'
              )}
              aria-label={cta.ariaLabel || cta.text}
            >
              <span className='summons-cta-sheen' aria-hidden='true' />
              <span className='relative'>{cta.text}</span>
            </a>
          </div>
        </div>
      </>
    );
  }
);

ACSummonsToTheForge.displayName = 'ACSummonsToTheForge';

// ====================================================================
// Export
// ====================================================================

export default ACSummonsToTheForge;
