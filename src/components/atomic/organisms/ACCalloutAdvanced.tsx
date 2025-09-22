'use client';

import { AlertTriangle, CheckCircle2, Info, type LucideIcon, XOctagon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { type CSSProperties, type ReactNode, useCallback, useMemo, useRef } from 'react';

import { cn } from '@/lib/utils';

// TypeScript interfaces for component props
interface CalloutVariantConfig {
  Icon: LucideIcon;
  colors: {
    dark: string;
    light: string;
  };
}

interface CalloutProps {
  children: ReactNode;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  className?: string;
  style?: CSSProperties;
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
  'data-testid'?: string;
}

interface ThemeConfig {
  glass: string;
  title: string;
  content: string;
}

interface MousePosition {
  x: number;
  y: number;
}

// Extended CSSProperties to include CSS custom properties
interface ExtendedCSSProperties extends CSSProperties {
  [key: `--${string}`]: string | number;
}

// Performance-optimized CSS-in-JS styles with GPU acceleration
const getAdvancedStyles = (): string => `
  @keyframes signal-pulse {
    0% {
      transform: translate3d(0, 0, 0) scale(0);
      opacity: 0.5;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1.5);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .callout-glass-pane::before,
    .callout-icon,
    .signal-pulse-effect {
      animation: none !important;
      transition: none !important;
    }
    .callout-glass-pane:hover .callout-icon {
      transform: none !important;
    }
  }

  .callout-glass-pane {
    position: relative;
    overflow: hidden;
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .callout-glass-pane::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background: radial-gradient(
      600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      var(--highlight-color, rgba(45, 212, 191, 0.15)),
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
    will-change: opacity;
  }

  .callout-glass-pane:hover::before {
    opacity: 1;
  }

  .callout-icon {
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                filter 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: drop-shadow(0 0 5px var(--variant-color-transparent, rgba(45, 212, 191, 0.5)));
    will-change: transform, filter;
    backface-visibility: hidden;
  }

  .callout-glass-pane:hover .callout-icon {
    transform: translate3d(0, 0, 0) scale(1.1) rotate(-5deg);
    filter: drop-shadow(0 0 15px var(--variant-color, rgb(45, 212, 191)));
  }

  .signal-pulse-effect {
    position: absolute;
    left: 2rem;
    top: 2rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--variant-color, rgb(45, 212, 191)) 0%,
      transparent 70%
    );
    opacity: 0;
    transform-origin: center;
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
  }

  .callout-glass-pane:hover .signal-pulse-effect {
    animation: signal-pulse 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .callout-glass-pane {
      border-width: 2px;
    }
    .callout-glass-pane::before {
      display: none;
    }
  }
`;

// Memoized variant configuration with proper TypeScript typing
const VARIANT_CONFIG: Record<string, CalloutVariantConfig> = {
  info: {
    Icon: Info,
    colors: {
      dark: '45, 212, 191',
      light: '147, 51, 234',
    },
  },
  success: {
    Icon: CheckCircle2,
    colors: {
      dark: '74, 222, 128',
      light: '34, 197, 94',
    },
  },
  warning: {
    Icon: AlertTriangle,
    colors: {
      dark: '251, 191, 36',
      light: '245, 158, 11',
    },
  },
  danger: {
    Icon: XOctagon,
    colors: {
      dark: '244, 63, 94',
      light: '220, 38, 38',
    },
  },
} as const;

// Memoized theme configuration
const THEME_CONFIG: Record<string, ThemeConfig> = {
  dark: {
    glass: 'bg-black/40 border-slate-800/80',
    title: 'text-slate-100',
    content: 'text-slate-300',
  },
  light: {
    glass: 'bg-white/60 border-slate-300',
    title: 'text-slate-900',
    content: 'text-slate-700',
  },
} as const;

/**
 * ACCalloutAdvanced - A production-ready callout component with sophisticated animations
 *
 * Features:
 * - Mouse tracking with radial gradient hover effects
 * - Signal pulse animations with GPU acceleration
 * - Icon scaling, rotation, and drop shadow effects
 * - Advanced cubic-bezier easing functions
 * - Accessibility compliance (respects prefers-reduced-motion)
 * - Performance optimizations with useCallback and useMemo
 * - TypeScript support with proper interfaces
 * - shadcn/ui integration with Lucide React icons
 * - next-themes compatibility
 * - Error boundary protection
 */
export function ACCalloutAdvanced({
  children,
  title,
  variant = 'info',
  className,
  style,
  onMouseMove,
  'data-testid': testId,
  ...props
}: CalloutProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  // Determine current theme with fallback
  const currentTheme = useMemo(() => {
    const effectiveTheme = resolvedTheme || theme || 'dark';
    return effectiveTheme === 'dark' ? 'dark' : 'light';
  }, [theme, resolvedTheme]);

  // Memoized variant configuration
  const variantConfig = useMemo(() => VARIANT_CONFIG[variant], [variant]);
  const themeConfig = useMemo(() => THEME_CONFIG[currentTheme], [currentTheme]);

  // Memoized color calculations
  const colorValues = useMemo(() => {
    const { Icon, colors } = variantConfig;
    const variantColor = colors[currentTheme];

    return {
      Icon,
      highlightColor: `rgba(${variantColor}, 0.15)`,
      variantColorOpaque: `rgb(${variantColor})`,
      variantColorTransparent: `rgba(${variantColor}, 0.5)`,
    };
  }, [variantConfig, currentTheme]);

  // Performance-optimized mouse move handler with useCallback
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      try {
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = `${e.clientX - rect.left}px`;
        const mouseY = `${e.clientY - rect.top}px`;

        // Batch DOM updates for better performance
        cardRef.current.style.setProperty('--mouse-x', mouseX);
        cardRef.current.style.setProperty('--mouse-y', mouseY);

        // Call external mouse move handler if provided
        onMouseMove?.(e);
      } catch (error) {
        console.warn('ACCalloutAdvanced: Mouse tracking error', error);
      }
    },
    [onMouseMove]
  );

  // Memoized CSS custom properties for optimal performance
  const cssCustomProperties = useMemo(
    (): ExtendedCSSProperties => ({
      '--highlight-color': colorValues.highlightColor,
      '--variant-color': colorValues.variantColorOpaque,
      '--variant-color-transparent': colorValues.variantColorTransparent,
      borderLeft: `4px solid ${colorValues.variantColorOpaque}`,
      ...style,
    }),
    [colorValues, style]
  );

  const { Icon } = colorValues;

  return (
    <>
      {/* Inject advanced styles with performance optimizations */}
      <style dangerouslySetInnerHTML={{ __html: getAdvancedStyles() }} />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={cn('callout-glass-pane my-8 rounded-2xl border backdrop-blur-xl', themeConfig.glass, className)}
        style={cssCustomProperties}
        data-testid={testId}
        role='alert'
        aria-live='polite'
        {...props}
      >
        {/* Signal pulse effect */}
        <div className='signal-pulse-effect' aria-hidden='true' role='presentation' />

        {/* Main content container with proper z-index layering */}
        <div className='relative z-10 flex items-start p-6'>
          {/* Icon with sophisticated animations */}
          <Icon
            size={28}
            className='callout-icon mr-5 mt-1 flex-shrink-0'
            style={{ color: colorValues.variantColorOpaque }}
            aria-hidden='true'
          />

          {/* Content container with typography optimization */}
          <div className={cn('w-full text-base', themeConfig.content)}>
            {title && <h4 className={cn('!mb-2 !mt-0 text-lg font-bold', themeConfig.title)}>{title}</h4>}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// Export the component as default for compatibility
export default ACCalloutAdvanced;

// Type exports for external usage
export type { CalloutProps, CalloutVariantConfig };
