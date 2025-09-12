# S007-DRAFT-theme-system.md

**Document Type**: Specification  
**Status**: DRAFT  
**Last Updated**: 2025-01-11  
**Related System**: CreatorFlow Design System

## Overview

This specification defines CreatorFlow's dual-theme system, providing seamless transitions between dark and light modes while maintaining brand consistency and accessibility compliance. The system is optimized for creator workflows and content-heavy interfaces.

## Theme Architecture

### Core Theme Structure

```css
/* Base theme variables structure */
:root {
  /* Light theme (default) */
}

.dark {
  /* Dark theme overrides */
}

@media (prefers-color-scheme: dark) {
  /* Automatic dark mode detection */
}
```

## Light Theme Implementation

### Primary Light Theme Colors

```css
:root {
  /* CreatorFlow Light Theme - AAA Compliant */
  --background: 210 20% 98%; /* Very light slate background */
  --foreground: 222.2 84% 4.9%; /* Very dark slate text */
  --muted: 210 40% 94%; /* Light muted background */
  --muted-foreground: 215.4 16.3% 25%; /* Dark muted text (AAA compliant) */

  /* Card and surface colors */
  --card: 0 0% 100%; /* Pure white cards */
  --card-foreground: 222.2 84% 4.9%; /* Dark text on cards */
  --popover: 0 0% 100%; /* White popovers */
  --popover-foreground: 222.2 84% 4.9%; /* Dark text in popovers */

  /* Interactive element colors */
  --primary: 222.2 84% 4.9%; /* Dark slate primary */
  --primary-foreground: 210 40% 98%; /* Light text on primary */
  --secondary: 210 40% 90%; /* Light slate secondary */
  --secondary-foreground: 222.2 84% 4.9%; /* Dark text on secondary */
  --accent: 210 40% 90%; /* Light slate accent */
  --accent-foreground: 222.2 84% 4.9%; /* Dark text on accent */

  /* Border and input colors */
  --border: 214.3 31.8% 75%; /* Darker border for visibility */
  --input: 214.3 31.8% 75%; /* Input border color */
  --ring: 215 20.2% 45%; /* Focus ring color */

  /* Destructive action colors */
  --destructive: 0 84% 35%; /* Darker red for AAA */
  --destructive-foreground: 210 40% 98%; /* Light text on destructive */
}
```

### Light Theme Brand Colors

```css
:root {
  /* Brand colors optimized for light backgrounds */
  --brand-teal-primary: 173 100% 18%; /* #005c4f - Darker teal for AAA */
  --brand-teal-light: 173 100% 22%; /* #007061 - Darker light teal */
  --brand-purple-primary: 258 100% 30%; /* #4c1d95 - Darker purple */
  --brand-blue-primary: 215 100% 30%; /* #1e40af - Darker blue */

  /* Background system */
  --bg-light-primary: 210 20% 98%; /* Very light slate */
  --bg-light-secondary: 210 40% 96%; /* Light slate */
  --glass-card-light: rgba(248, 250, 252, 0.8); /* Light slate glass */

  /* Blog content colors */
  --blog-light-accent: #7c3aed; /* purple-600 - Primary accent */
  --blog-light-category: #7c3aed; /* purple-600 - Category labels */
  --blog-light-title: #1e293b; /* slate-800 - Main titles */
  --blog-light-content: #374151; /* slate-700 - Body text */
  --blog-light-meta: #64748b; /* slate-500 - Meta text */
  --blog-light-divider: rgba(203, 213, 225, 0.8); /* Content dividers */
}
```

## Dark Theme Implementation

### Primary Dark Theme Colors

```css
.dark {
  /* CreatorFlow Dark Theme - AAA Compliant */
  --background: 245 15% 3%; /* Signature CreatorFlow dark */
  --foreground: 210 40% 98%; /* Very light slate text */
  --muted: 220 13% 12%; /* Dark slate muted */
  --muted-foreground: 215.4 16.3% 75%; /* Light slate muted text (AAA) */

  /* Card and surface colors */
  --card: 245 15% 3%; /* Signature dark card */
  --card-foreground: 210 40% 98%; /* Light text on dark card */
  --popover: 245 15% 3%; /* Signature dark popover */
  --popover-foreground: 210 40% 98%; /* Light text in popovers */

  /* Interactive element colors */
  --primary: 210 40% 98%; /* Light slate primary */
  --primary-foreground: 222.2 84% 4.9%; /* Dark text on light */
  --secondary: 222.2 47.4% 11.2%; /* Dark slate secondary */
  --secondary-foreground: 210 40% 98%; /* Light text on dark */
  --accent: 220 13% 15%; /* Dark slate accent */
  --accent-foreground: 210 40% 98%; /* Light text on dark */

  /* Border and input colors */
  --border: 220 13% 25%; /* Lighter border for visibility */
  --input: 220 13% 15%; /* Dark slate input */
  --ring: 220 13% 25%; /* Focus ring color */

  /* Destructive action colors */
  --destructive: 0 84% 65%; /* Lighter red for dark theme AAA */
  --destructive-foreground: 222.2 84% 4.9%; /* Dark text on destructive */
}
```

### Dark Theme Brand Colors

```css
.dark {
  /* Brand colors optimized for dark backgrounds */
  --brand-teal-primary: 173 100% 75%; /* #00f5d4 - Lighter teal for dark */
  --brand-teal-light: 173 100% 80%; /* #1affdb - Even lighter teal */
  --brand-purple-primary: 258 90% 75%; /* #a78bfa - Lighter purple */
  --brand-blue-primary: 215 100% 75%; /* #60a5fa - Lighter blue */

  /* Background system */
  --bg-dark-primary: 245 15% 3%; /* Signature CreatorFlow dark */
  --bg-dark-secondary: 220 13% 8%; /* Dark slate secondary */
  --glass-card-dark: rgba(10, 9, 15, 0.8); /* Signature dark glass */
  --glass-card-light: rgba(248, 250, 252, 0.1); /* Subtle light overlay */

  /* Blog content colors */
  --blog-dark-accent: #2dd4bf; /* teal-400 - Primary blog accent */
  --blog-dark-category: #2dd4bf; /* teal-400 - Category labels */
  --blog-dark-title: #f1f5f9; /* slate-100 - Main titles */
  --blog-dark-content: #cbd5e1; /* slate-300 - Body text */
  --blog-dark-meta: #64748b; /* slate-500 - Meta text */
  --blog-dark-divider: rgba(241, 245, 249, 0.1); /* Content dividers */
}
```

## Theme Switching Implementation

### React Hook for Theme Management

```tsx
// Theme context and hook implementation
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (newTheme: 'dark' | 'light') => {
      root.classList.remove('dark', 'light');
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### Theme Toggle Component

```tsx
// Theme toggle button (from AC-Callout-Advanced analysis)
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        resolvedTheme === 'dark'
          ? 'bg-teal-500 focus:ring-teal-400 focus:ring-offset-[#0A090F]'
          : 'bg-purple-600 focus:ring-purple-500 focus:ring-offset-gray-100'
      )}
      aria-label='Toggle theme'
    >
      <span
        className={cn(
          'inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300',
          resolvedTheme === 'dark' ? 'translate-x-1' : 'translate-x-7'
        )}
      />
    </button>
  );
}
```

## Glass Morphism Theme Adaptations

### Theme-Specific Glass Effects

```css
/* Glass morphism adaptations for themes */
.glass-content-card {
  /* Adapts based on theme */
  background: var(--glass-content-dark);
  backdrop-filter: blur(24px);
  border: 1px solid var(--border-content-dark);
}

.dark .glass-content-card {
  background: var(--glass-content-dark);
  border: 1px solid var(--border-content-dark);
}

/* Light theme glass override */
.glass-content-card:not(.dark *) {
  background: var(--glass-content-light);
  border: 1px solid var(--border-content-light);
}
```

### Dynamic Glass Components

```tsx
// Glass pane with theme adaptation (from MC-GlassPane)
export function ThemeAdaptiveGlassPane({ children, className }: GlassPaneProps) {
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

## Component Theme Patterns

### Theme-Aware Component Implementation

```tsx
// Status icon with theme adaptation (from MC-StatusIcon)
export function ThemeAwareStatusIcon({ type, size = 20 }: StatusIconProps) {
  const iconMap = {
    viral: <Zap className='text-amber-500 dark:text-amber-400' size={size} />,
    'auto-processing': <Settings className='text-purple-600 dark:text-purple-400' size={size} />,
    shipped: <Truck className='text-sky-600 dark:text-sky-400' size={size} />,
    'high-priority': <Bolt className='text-destructive dark:text-destructive' size={size} />,
  };

  return <div>{iconMap[type]}</div>;
}

// Alert icon with theme adaptation (from MC-AlertIcon)
export function ThemeAwareAlertIcon({ type, size = 20 }: AlertIconProps) {
  const iconMap = {
    critical: <AlertTriangle className='text-destructive dark:text-destructive' size={size} />,
    insight: <TrendingUp className='text-amber-600 dark:text-amber-400' size={size} />,
    operational: <Truck className='text-primary dark:text-primary' size={size} />,
  };

  return <div>{iconMap[type]}</div>;
}
```

### Page-Level Theme Implementation

```tsx
// Page background themes (from AC-Callout-Advanced)
const pageThemes = {
  dark: 'bg-[#0A090F]', // Signature dark background
  light: 'bg-gradient-to-b from-indigo-100 to-white', // Gradient light background
};

export function ThemeAwarePage({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return <div className={cn('min-h-screen transition-colors duration-500', pageThemes[resolvedTheme])}>{children}</div>;
}
```

## Blog Content Theme System

### Blog Theme Variables

```css
/* Blog-specific theme variables */
:root {
  /* Light theme blog colors */
  --blog-accent: var(--blog-light-accent);
  --blog-category: var(--blog-light-category);
  --blog-title: var(--blog-light-title);
  --blog-content: var(--blog-light-content);
  --blog-meta: var(--blog-light-meta);
  --blog-divider: var(--blog-light-divider);
}

.dark {
  /* Dark theme blog colors */
  --blog-accent: var(--blog-dark-accent);
  --blog-category: var(--blog-dark-category);
  --blog-title: var(--blog-dark-title);
  --blog-content: var(--blog-dark-content);
  --blog-meta: var(--blog-dark-meta);
  --blog-divider: var(--blog-dark-divider);
}
```

### Blog Component Theme Implementation

```tsx
// Blog components using theme-aware colors
export function BlogCategoryTag({ children }: { children: React.ReactNode }) {
  return (
    <span className='content-category' style={{ color: 'var(--blog-accent)' }}>
      {children}
    </span>
  );
}

export function BlogTitle({ children }: { children: React.ReactNode }) {
  return <h1 style={{ color: 'var(--blog-title)' }}>{children}</h1>;
}

export function BlogContent({ children }: { children: React.ReactNode }) {
  return <div style={{ color: 'var(--blog-content)' }}>{children}</div>;
}
```

## System Preferences Integration

### Automatic Theme Detection

```css
/* Respect system preferences */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Apply dark theme variables when system prefers dark */
    --background: 245 15% 3%;
    --foreground: 210 40% 98%;
    /* ... other dark theme variables */
  }
}

@media (prefers-color-scheme: light) {
  :root:not(.dark) {
    /* Apply light theme variables when system prefers light */
    --background: 210 20% 98%;
    --foreground: 222.2 84% 4.9%;
    /* ... other light theme variables */
  }
}
```

### Reduced Motion Preferences

```css
/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .theme-transition {
    transition: none !important;
  }

  .theme-toggle {
    transition-duration: 0.01ms !important;
  }
}
```

## Accessibility Considerations

### High Contrast Mode Support

```css
/* High contrast mode adaptations */
@media (prefers-contrast: high) {
  :root {
    --brand-teal-primary: 0 0% 0%;
    --brand-purple-primary: 0 0% 0%;
    --brand-blue-primary: 0 0% 0%;
  }

  .dark {
    --brand-teal-primary: 0 0% 100%;
    --brand-purple-primary: 0 0% 100%;
    --brand-blue-primary: 0 0% 100%;
  }
}
```

### Focus Management Across Themes

```css
/* Consistent focus styling across themes */
*:focus-visible {
  outline: 2px solid var(--brand-teal-primary);
  outline-offset: 2px;
}

.dark *:focus-visible {
  outline-color: var(--brand-teal-light);
}
```

## Performance Optimizations

### CSS Variable Caching

```css
/* Cache frequently used theme variables */
.theme-cached {
  --cached-bg: var(--background);
  --cached-fg: var(--foreground);
  --cached-primary: var(--brand-teal-primary);

  background: var(--cached-bg);
  color: var(--cached-fg);
}
```

### Theme Transition Optimization

```css
/* Optimize theme transitions */
.theme-transition {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Prevent layout shift during theme changes */
.theme-stable {
  contain: layout style;
}
```

---

## Related Documents

- **[S005-DRAFT-core-brand-colors.md](./S005-DRAFT-core-brand-colors.md)**: Core brand color palette and tokens
- **[S006-DRAFT-semantic-color-system.md](./S006-DRAFT-semantic-color-system.md)**: Semantic color variants and usage patterns
- **[S008-DRAFT-glassmorphism-guide.md](./S008-DRAFT-glassmorphism-guide.md)**: Advanced visual effects with theme integration
- **[S009-DRAFT-component-color-patterns.md](./S009-DRAFT-component-color-patterns.md)**: Theme-aware component patterns
- **[S010-DRAFT-accessibility-standards.md](./S010-DRAFT-accessibility-standards.md)**: Contrast compliance across themes
