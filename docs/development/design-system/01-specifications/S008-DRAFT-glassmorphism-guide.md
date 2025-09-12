# S008-DRAFT-glassmorphism-guide.md

**Document Type**: Specification  
**Status**: DRAFT  
**Last Updated**: 2025-01-11  
**Related System**: CreatorFlow Design System

## Overview

This specification defines CreatorFlow's glassmorphism design system, providing advanced visual effects that combine transparency, blur, and subtle backgrounds to create depth and premium aesthetics. The system is optimized for both performance and accessibility.

## Glassmorphism Foundations

### Core Glass Effects

```css
/* Base glass morphism variables (from globals.css analysis) */
--glass-light: rgba(255, 255, 255, 0.7); /* Light theme glass */
--glass-dark: rgba(17, 24, 39, 0.5); /* Dark theme glass */
--blur-sm: blur(4px); /* Small blur effect */
--blur-md: blur(8px); /* Medium blur effect */
--blur-lg: blur(16px); /* Large blur effect */
--blur-xl: blur(24px); /* Primary card blur */

/* Glass content system */
--glass-content-dark: rgba(0, 0, 0, 0.4); /* Dark content cards */
--glass-content-light: rgba(255, 255, 255, 0.6); /* Light content cards */
--glass-hero-overlay: rgba(0, 0, 0, 0.7); /* Hero overlays */
--glass-testimonial: rgba(17, 24, 39, 0.5); /* Testimonial backgrounds */
```

### Glass Border System

```css
/* Border system for glass components */
--border-content-dark: rgba(148, 163, 184, 0.1); /* Content borders dark */
--border-content-light: rgba(203, 213, 225, 1); /* Content borders light */
--border-accent-dark: rgba(45, 212, 191, 0.8); /* Accent borders dark */
--border-accent-light: rgba(147, 51, 234, 0.8); /* Accent borders light */
```

## Component Glass Classes

### Primary Glass Card System

```css
/* Premium card system (from globals.css analysis) */
.card-primary {
  padding: var(--space-6); /* 24px padding */
  border-radius: var(--radius-2xl); /* 16px border radius */
  background: var(--glass-card-dark); /* Glass background */
  backdrop-filter: var(--blur-xl); /* 24px blur */
  border: 1px solid rgba(156, 163, 175, 0.2); /* Subtle border */
  box-shadow: var(--shadow-card); /* Elevated shadow */
  transition: all var(--duration-fast) var(--spring-snappy);
}

.card-primary:hover {
  transform: translateY(-2px); /* Subtle lift */
  box-shadow: var(--shadow-teal-glow); /* Glow effect */
}

/* Executive-level glass cards */
.card-executive {
  padding: var(--space-8); /* 32px padding */
  border-radius: var(--radius-2xl); /* 16px border radius */
  background: var(--glass-card-dark); /* Glass background */
  backdrop-filter: var(--blur-xl); /* 24px blur */
  border: 2px solid var(--brand-teal-600); /* Brand accent border */
  box-shadow: var(--shadow-glass); /* Glass glow shadow */
}
```

### Glass Content Components

```css
/* Content-specific glass components (from blog analysis) */
.glass-content-card {
  background: var(--glass-content-dark);
  backdrop-filter: blur(24px);
  border: 1px solid var(--border-content-dark);
  border-radius: var(--radius-2xl);
  transition: all var(--duration-fast) var(--spring-snappy);
}

.glass-hero-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  backdrop-filter: blur(8px);
}

.glass-testimonial {
  background: var(--glass-testimonial);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-accent-dark);
  border-radius: var(--radius-xl);
}
```

## Interactive Glass Effects

### Mouse-Tracking Glass Effects

```css
/* Interactive glass tracking (from AC-Callout-Advanced analysis) */
.callout-glass-pane {
  position: relative;
  overflow: hidden;
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
  background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--highlight-color), transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  pointer-events: none;
}

.callout-glass-pane:hover::before {
  opacity: 1;
}
```

### Implementation Pattern

```tsx
// Mouse tracking glass component (from AC-Callout-Advanced)
export function InteractiveGlassPane({ children, highlightColor }: GlassProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className='callout-glass-pane'
      style={{ '--highlight-color': highlightColor } as CSSProperties}
    >
      {children}
    </div>
  );
}
```

### Content Glass Tracking

```css
/* Content-focused interactive effects (from blog components) */
.content-glass-tracking {
  position: relative;
  overflow: hidden;
}

.content-glass-tracking::before {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(45, 212, 191, 0.2), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  pointer-events: none;
}

.content-glass-tracking:hover::before {
  opacity: 1;
}
```

## Glass Component Library

### Basic Glass Pane

```tsx
// Basic glass morphism component (from MC-GlassPane)
interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassPane({ children, className = '' }: GlassPaneProps) {
  return (
    <div
      className={cn(
        'border border-border/10 bg-background/30 shadow-lg backdrop-blur-xl',
        'dark:border-border/10 dark:bg-background/20',
        className
      )}
    >
      {children}
    </div>
  );
}
```

### Advanced Callout Glass

```tsx
// Advanced glass callout with effects (from AC-Callout-Advanced)
interface CalloutGlassProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  theme?: 'dark' | 'light';
  title?: string;
}

export function CalloutGlass({ children, variant = 'info', theme = 'dark', title }: CalloutGlassProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const variantConfig = {
    info: { dark: '45, 212, 191', light: '147, 51, 234' },
    success: { dark: '74, 222, 128', light: '34, 197, 94' },
    warning: { dark: '251, 191, 36', light: '245, 158, 11' },
    danger: { dark: '244, 63, 94', light: '220, 38, 38' },
  };

  const { ...colors } = variantConfig[variant];
  const variantColor = colors[theme];
  const highlightColor = `rgba(${variantColor}, 0.15)`;
  const variantColorOpaque = `rgb(${variantColor})`;

  const themeClasses = {
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
  };
  const currentTheme = themeClasses[theme];

  return (
    <div
      ref={cardRef}
      className={`callout-glass-pane rounded-2xl border backdrop-blur-xl ${currentTheme.glass}`}
      style={
        {
          '--highlight-color': highlightColor,
          '--variant-color': variantColorOpaque,
          borderLeft: `4px solid ${variantColorOpaque}`,
        } as CSSProperties
      }
    >
      <div className='relative z-10 flex items-start p-6'>
        <div className={`w-full text-base ${currentTheme.content}`}>
          {title && <h4 className={`mb-2 mt-0 text-lg font-bold ${currentTheme.title}`}>{title}</h4>}
          {children}
        </div>
      </div>
    </div>
  );
}
```

### Glass Metric Cards

```tsx
// Glass metric card (from IM-MetricCard analysis)
export function GlassMetricCard({ title, value, unit, variant = 'default' }: MetricCardProps) {
  return (
    <Card className='rounded-premium border-border/20 bg-card/90 p-tactical backdrop-blur-sm'>
      <div className='space-y-2'>
        <p className='text-body-xs font-medium uppercase tracking-wide text-muted-foreground'>{title}</p>
        <div className='text-metric-lg font-bold' style={{ color: `var(--${variant}-color)` }}>
          {value}
          {unit && <span className='ml-1 text-sm text-muted-foreground'>{unit}</span>}
        </div>
      </div>
    </Card>
  );
}
```

## Brand-Specific Glass Effects

### Brand Color Glass Integration

```css
/* Brand-specific glass effects */
.brand-glass-teal {
  background: rgba(13, 148, 136, 0.1); /* Brand teal glass */
  border: 1px solid rgba(13, 148, 136, 0.2); /* Brand teal border */
  backdrop-filter: blur(24px);
}

.brand-glass-purple {
  background: rgba(139, 92, 246, 0.1); /* Brand purple glass */
  border: 1px solid rgba(139, 92, 246, 0.2); /* Brand purple border */
  backdrop-filter: blur(24px);
}

.brand-glass-blue {
  background: rgba(59, 130, 246, 0.1); /* Brand blue glass */
  border: 1px solid rgba(59, 130, 246, 0.2); /* Brand blue border */
  backdrop-filter: blur(24px);
}
```

### TikTok Integration Glass

```css
/* TikTok-specific glass effects */
.tiktok-glass-viral {
  background: rgba(255, 0, 80, 0.1); /* TikTok pink glass */
  border: 1px solid rgba(255, 0, 80, 0.2); /* TikTok pink border */
  backdrop-filter: blur(16px);
  box-shadow: 0 0 25px rgba(255, 0, 80, 0.3); /* Viral glow */
}

.tiktok-glass-trending {
  background: rgba(37, 244, 238, 0.1); /* TikTok blue glass */
  border: 1px solid rgba(37, 244, 238, 0.2); /* TikTok blue border */
  backdrop-filter: blur(16px);
  box-shadow: 0 0 20px rgba(37, 244, 238, 0.3); /* Trending glow */
}
```

## Theme-Specific Glass Adaptations

### Light Theme Glass

```css
/* Light theme glass adaptations */
.glass-content-card:not(.dark *) {
  background: var(--glass-content-light); /* Light glass background */
  border: 1px solid var(--border-content-light); /* Light glass border */
  backdrop-filter: blur(20px); /* Slightly less blur for light */
}

/* Light theme hero overlay */
.glass-hero-overlay:not(.dark *) {
  background: linear-gradient(to top, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
  backdrop-filter: blur(6px);
}
```

### Dark Theme Glass

```css
/* Dark theme glass optimizations */
.dark .glass-content-card {
  background: var(--glass-content-dark); /* Dark glass background */
  border: 1px solid var(--border-content-dark); /* Dark glass border */
  backdrop-filter: blur(24px); /* Full blur for dark */
}

/* Dark theme hero overlay */
.dark .glass-hero-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  backdrop-filter: blur(8px);
}
```

## Advanced Glass Effects

### Animated Glass Pulse

```css
/* Signal pulse effect (from AC-Callout-Advanced) */
.signal-pulse-effect {
  position: absolute;
  left: 2rem;
  top: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--variant-color) 0%, transparent 70%);
  opacity: 0;
  transform-origin: center;
  pointer-events: none;
  z-index: 0;
}

.callout-glass-pane:hover .signal-pulse-effect {
  animation: signal-pulse 0.6s ease-out forwards;
}

@keyframes signal-pulse {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
```

### Icon Glass Effects

```css
/* Icon enhancement in glass components */
.callout-icon {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
  filter: drop-shadow(0 0 5px var(--variant-color-transparent));
}

.callout-glass-pane:hover .callout-icon {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 0 15px var(--variant-color));
}

/* Content icon transformations */
.content-icon-transform {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease;
  filter: drop-shadow(0 0 5px rgba(45, 212, 191, 0.5));
}

.content-glass-tracking:hover .content-icon-transform {
  transform: scale(1.1) rotate(-5deg);
  filter: drop-shadow(0 0 15px rgba(45, 212, 191, 1));
}
```

## Performance Optimizations

### Efficient Backdrop Filters

```css
/* Optimize backdrop filters for performance */
.glass-optimized {
  /* Use will-change for smooth animations */
  will-change: backdrop-filter, transform;

  /* Contain layout and style calculations */
  contain: layout style;

  /* Use transform3d for hardware acceleration */
  transform: translate3d(0, 0, 0);
}

/* Conditional backdrop-filter for better performance */
@supports (backdrop-filter: blur(1px)) {
  .glass-progressive {
    backdrop-filter: var(--blur-xl);
  }
}

@supports not (backdrop-filter: blur(1px)) {
  .glass-progressive {
    background: var(--fallback-background);
  }
}
```

### Reduced Motion Support

```css
/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .callout-glass-pane::before,
  .content-glass-tracking::before,
  .signal-pulse-effect {
    animation: none;
    transition: none;
  }

  .callout-icon,
  .content-icon-transform {
    transform: none !important;
    transition: none;
  }
}
```

## Accessibility Considerations

### High Contrast Mode Adaptations

```css
/* High contrast mode glass adjustments */
@media (prefers-contrast: high) {
  .glass-content-card,
  .card-primary,
  .card-executive {
    backdrop-filter: none; /* Remove blur for clarity */
    background: var(--background); /* Solid background */
    border: 2px solid var(--foreground); /* High contrast border */
  }

  .glass-hero-overlay {
    backdrop-filter: none;
    background: var(--background);
  }
}
```

### Focus Management in Glass Components

```css
/* Ensure focus visibility in glass components */
.glass-content-card:focus-within {
  outline: 2px solid var(--brand-teal-primary);
  outline-offset: 2px;
}

.callout-glass-pane:focus-within {
  box-shadow: var(--shadow-glass), 0 0 0 2px var(--brand-teal-primary);
}
```

## Testing and Validation

### Glass Effect Testing

```bash
# Test backdrop-filter support
bun run test:backdrop-filter

# Performance testing for glass effects
bun run test:glass-performance

# Visual regression testing
bun run test:glass-visual
```

### Browser Compatibility

```tsx
// Feature detection for glass effects
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)');

export function CompatibleGlassPane({ children, fallback }: GlassProps) {
  return (
    <div
      className={supportsBackdropFilter ? 'bg-background/30 backdrop-blur-xl' : fallback || 'border-2 bg-background'}
    >
      {children}
    </div>
  );
}
```

---

## Related Documents

- **[S005-DRAFT-core-brand-colors.md](./S005-DRAFT-core-brand-colors.md)**: Brand colors for glass effect integration
- **[S006-DRAFT-semantic-color-system.md](./S006-DRAFT-semantic-color-system.md)**: Semantic colors in glass components
- **[S007-DRAFT-theme-system.md](./S007-DRAFT-theme-system.md)**: Theme adaptations for glass effects
- **[S009-DRAFT-component-color-patterns.md](./S009-DRAFT-component-color-patterns.md)**: Glass component usage patterns
- **[S010-DRAFT-accessibility-standards.md](./S010-DRAFT-accessibility-standards.md)**: Accessibility in glass components
