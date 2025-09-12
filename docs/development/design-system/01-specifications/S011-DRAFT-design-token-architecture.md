# S011-DRAFT-design-token-architecture.md

**Document Type**: Specification  
**Status**: DRAFT  
**Last Updated**: 2025-01-11  
**Related System**: CreatorFlow Design System

## Overview

This specification defines the systematic approach to design token naming, organization, and architecture for CreatorFlow. It establishes the foundation for scalable, maintainable, and consistent design token management across the entire platform.

## Token Architecture Principles

### Hierarchical Token Structure

#### Global Foundation Tokens

```css
/* Tier 1: Primitive Tokens - Raw values */
--primitive-color-teal-400: #2dd4bf;
--primitive-color-teal-500: #14b8a6;
--primitive-color-teal-600: #0d9488;

--primitive-spacing-4: 1rem;
--primitive-spacing-6: 1.5rem;
--primitive-spacing-8: 2rem;

--primitive-radius-lg: 0.5rem;
--primitive-radius-xl: 0.75rem;
--primitive-radius-2xl: 1rem;

/* Tier 2: Global Semantic Tokens - System-wide meanings */
--global-color-primary: var(--primitive-color-teal-600);
--global-color-success: var(--primitive-color-green-600);
--global-color-warning: var(--primitive-color-amber-600);
--global-color-error: var(--primitive-color-red-600);

--global-spacing-sm: var(--primitive-spacing-4);
--global-spacing-md: var(--primitive-spacing-6);
--global-spacing-lg: var(--primitive-spacing-8);

--global-radius-default: var(--primitive-radius-xl);
--global-radius-card: var(--primitive-radius-2xl);
```

#### Component-Specific Tokens

```css
/* Tier 3: Component Tokens - Component-specific usage */
--component-button-bg-primary: var(--global-color-primary);
--component-button-text-primary: var(--primitive-color-white);
--component-button-radius: var(--global-radius-default);
--component-button-padding-x: var(--global-spacing-md);
--component-button-padding-y: var(--global-spacing-sm);

--component-card-bg: var(--global-color-surface);
--component-card-border: var(--global-color-border);
--component-card-radius: var(--global-radius-card);
--component-card-padding: var(--global-spacing-md);
--component-card-shadow: var(--global-shadow-elevated);

--component-callout-bg-info: rgba(var(--primitive-color-teal-rgb), 0.15);
--component-callout-border-info: var(--global-color-primary);
--component-callout-icon-info: var(--global-color-primary);
```

### Token Naming Convention

#### Systematic Naming Pattern

```
--{category}-{property}-{variant?}-{state?}
```

**Examples:**

```css
/* Colors */
--color-text-primary                    /* Primary text color */
--color-text-muted                      /* Muted text color */
--color-bg-primary                      /* Primary background */
--color-bg-elevated                     /* Elevated surface background */
--color-border-default                  /* Default border color */
--color-border-focus                    /* Focus state border */

/* Spacing */
--spacing-xs                            /* Extra small spacing */
--spacing-sm                            /* Small spacing */
--spacing-md                            /* Medium spacing */
--spacing-lg                            /* Large spacing */

/* Component-specific */
--button-bg-primary                     /* Button primary background */
--button-bg-primary-hover               /* Button primary hover state */
--card-padding-default                  /* Default card padding */
--input-border-focus                    /* Input focus border */
```

## Color Token Architecture

### Brand Color Tokens

```css
/* Brand color primitive tokens */
--brand-teal-50: #f0fdfa;
--brand-teal-100: #ccfbf1;
--brand-teal-200: #99f6e4;
--brand-teal-300: #5eead4;
--brand-teal-400: #2dd4bf; /* Light accent */
--brand-teal-500: #14b8a6; /* Standard brand */
--brand-teal-600: #0d9488; /* Primary brand (most used) */
--brand-teal-700: #0f766e;
--brand-teal-800: #115e59;
--brand-teal-900: #134e4a;

/* Brand semantic tokens */
--brand-primary: var(--brand-teal-600);
--brand-primary-light: var(--brand-teal-500);
--brand-primary-dark: var(--brand-teal-700);

/* Brand usage tokens */
--brand-accent-blog-dark: var(--brand-teal-400);
--brand-accent-blog-light: var(--brand-purple-600);
--brand-accent-cta: var(--brand-primary);
--brand-accent-interactive: var(--brand-primary-light);
```

### Semantic Color Tokens

```css
/* Semantic color system */
--semantic-success-50: #f0fdf4;
--semantic-success-500: #22c55e;
--semantic-success-600: #16a34a; /* Primary success */
--semantic-success-900: #14532d;

--semantic-warning-50: #fffbeb;
--semantic-warning-500: #f59e0b;
--semantic-warning-600: #d97706; /* Primary warning */
--semantic-warning-900: #92400e;

--semantic-error-50: #fef2f2;
--semantic-error-500: #ef4444;
--semantic-error-600: #dc2626; /* Primary error */
--semantic-error-900: #7f1d1d;

--semantic-info-50: #eff6ff;
--semantic-info-500: #3b82f6;
--semantic-info-600: #2563eb; /* Primary info */
--semantic-info-900: #1e3a8a;

/* Semantic usage tokens */
--color-success: var(--semantic-success-600);
--color-warning: var(--semantic-warning-600);
--color-error: var(--semantic-error-600);
--color-info: var(--semantic-info-600);
```

### Theme-Adaptive Color Tokens

```css
/* Theme-adaptive token architecture */
:root {
  /* Light theme defaults */
  --color-bg-primary: hsl(210, 20%, 98%);
  --color-bg-secondary: hsl(210, 40%, 96%);
  --color-text-primary: hsl(222.2, 84%, 4.9%);
  --color-text-secondary: hsl(215.4, 16.3%, 25%);
  --color-border-default: hsl(214.3, 31.8%, 75%);

  /* Brand colors for light theme (AAA compliant) */
  --color-brand-primary: hsl(173, 100%, 18%);
  --color-brand-accent: hsl(258, 100%, 30%);
}

.dark {
  /* Dark theme overrides */
  --color-bg-primary: hsl(245, 15%, 3%);
  --color-bg-secondary: hsl(220, 13%, 8%);
  --color-text-primary: hsl(210, 40%, 98%);
  --color-text-secondary: hsl(215.4, 16.3%, 75%);
  --color-border-default: hsl(220, 13%, 25%);

  /* Brand colors for dark theme (AAA compliant) */
  --color-brand-primary: hsl(173, 100%, 75%);
  --color-brand-accent: hsl(258, 90%, 75%);
}
```

## Typography Token Architecture

### Font System Tokens

```css
/* Font family tokens */
--font-family-primary: 'Inter', system-ui, sans-serif;
--font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
--font-family-display: 'Montserrat', var(--font-family-primary);
--font-family-content: var(--font-family-primary);
--font-family-creative: 'Poppins', var(--font-family-primary);

/* Font weight tokens */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;

/* Font size tokens - mobile-first responsive */
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem; /* 36px */

/* Responsive typography tokens */
--font-size-hero-mobile: 2.25rem; /* 36px on mobile */
--font-size-hero-desktop: 3.75rem; /* 60px on desktop */
--font-size-hero-responsive: clamp(var(--font-size-hero-mobile), 8vw, var(--font-size-hero-desktop));
```

### Typography Usage Tokens

```css
/* Semantic typography tokens */
--typography-heading-1: var(--font-size-4xl) / 1.1 var(--font-weight-black) var(--font-family-display);
--typography-heading-2: var(--font-size-3xl) / 1.2 var(--font-weight-bold) var(--font-family-display);
--typography-heading-3: var(--font-size-2xl) / 1.3 var(--font-weight-semibold) var(--font-family-primary);
--typography-body-large: var(--font-size-lg) / 1.6 var(--font-weight-normal) var(--font-family-primary);
--typography-body-default: var(--font-size-base) / 1.5 var(--font-weight-normal) var(--font-family-primary);
--typography-body-small: var(--font-size-sm) / 1.4 var(--font-weight-normal) var(--font-family-primary);
--typography-caption: var(--font-size-xs) / 1.3 var(--font-weight-medium) var(--font-family-primary);

/* Content-specific typography */
--typography-hero-title: var(--font-size-hero-responsive) / 1.1 var(--font-weight-black) var(--font-family-display);
--typography-blog-title: var(--font-size-3xl) / 1.2 var(--font-weight-bold) var(--font-family-primary);
--typography-metric-display: var(--font-size-4xl) / 1 var(--font-weight-black) var(--font-family-mono);
--typography-code: var(--font-size-sm) / 1.5 var(--font-weight-normal) var(--font-family-mono);
```

## Spacing Token Architecture

### Primitive Spacing Scale

```css
/* Base spacing scale (rem units for scalability) */
--spacing-0: 0;
--spacing-1: 0.25rem; /* 4px */
--spacing-2: 0.5rem; /* 8px */
--spacing-3: 0.75rem; /* 12px */
--spacing-4: 1rem; /* 16px - Base unit */
--spacing-5: 1.25rem; /* 20px */
--spacing-6: 1.5rem; /* 24px - Primary card padding */
--spacing-8: 2rem; /* 32px - Section spacing */
--spacing-10: 2.5rem; /* 40px */
--spacing-12: 3rem; /* 48px - Large sections */
--spacing-16: 4rem; /* 64px - Page sections */
--spacing-20: 5rem; /* 80px - Major separations */
--spacing-24: 6rem; /* 96px - Hero sections */
```

### Semantic Spacing Tokens

```css
/* Component spacing semantics */
--spacing-xs: var(--spacing-1); /* Tight elements */
--spacing-sm: var(--spacing-2); /* Small gaps */
--spacing-md: var(--spacing-4); /* Standard spacing (most common) */
--spacing-lg: var(--spacing-6); /* Comfortable spacing */
--spacing-xl: var(--spacing-8); /* Large spacing */
--spacing-2xl: var(--spacing-12); /* Section-level spacing */
--spacing-3xl: var(--spacing-16); /* Page-level spacing */

/* Usage-specific spacing */
--spacing-button-padding-x: var(--spacing-lg);
--spacing-button-padding-y: var(--spacing-sm);
--spacing-card-padding: var(--spacing-lg);
--spacing-section-gap: var(--spacing-2xl);
--spacing-page-margin: var(--spacing-3xl);
--spacing-element-gap: var(--spacing-md);
```

### Layout-Specific Spacing

```css
/* Layout spacing tokens */
--spacing-header-height: 4rem; /* 64px - Fixed header height */
--spacing-sidebar-width: 16rem; /* 256px - Sidebar width */
--spacing-sidebar-collapsed: 4.5rem; /* 72px - Collapsed sidebar */
--spacing-content-max-width: 80rem; /* 1280px - Max content width */
--spacing-content-padding: var(--spacing-6);

/* Mobile-specific spacing overrides */
@media (max-width: 768px) {
  --spacing-card-padding: var(--spacing-md);
  --spacing-section-gap: var(--spacing-lg);
  --spacing-page-margin: var(--spacing-lg);
}
```

## Shadow and Elevation Token Architecture

### Shadow Primitive Tokens

```css
/* Shadow primitive values */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Brand-specific shadows */
--shadow-teal-glow: 0 0 20px 0 rgba(52, 211, 153, 0.4);
--shadow-purple-glow: 0 0 20px 0 rgba(139, 92, 246, 0.4);
--shadow-brand-glow: 0 0 15px rgba(13, 148, 136, 0.6);
```

### Elevation System Tokens

```css
/* Elevation semantic tokens */
--elevation-base: var(--shadow-xs); /* Ground level */
--elevation-raised: var(--shadow-sm); /* Slightly elevated */
--elevation-elevated: var(--shadow-md); /* Standard elevation */
--elevation-overlay: var(--shadow-lg); /* Modal/overlay level */
--elevation-popover: var(--shadow-xl); /* Popover/dropdown level */
--elevation-modal: var(--shadow-2xl); /* Modal backdrop level */

/* Component elevation tokens */
--elevation-card: var(--elevation-raised);
--elevation-button-hover: var(--elevation-elevated);
--elevation-nav: var(--elevation-elevated);
--elevation-header: var(--elevation-elevated);
--elevation-sidebar: var(--elevation-overlay);
```

## Border Radius Token Architecture

### Radius Primitive Tokens

```css
/* Border radius primitives */
--radius-none: 0;
--radius-sm: 0.125rem; /* 2px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem; /* 8px - Default system radius */
--radius-xl: 0.75rem; /* 12px */
--radius-2xl: 1rem; /* 16px - Primary card radius */
--radius-3xl: 1.5rem; /* 24px */
--radius-full: 9999px; /* Fully rounded */

/* Usage-specific radius tokens */
--radius-button: var(--radius-lg);
--radius-input: var(--radius-lg);
--radius-card: var(--radius-2xl);
--radius-modal: var(--radius-xl);
--radius-badge: var(--radius-full);
--radius-avatar: var(--radius-full);
```

## Animation and Transition Token Architecture

### Duration Tokens

```css
/* Animation duration primitives */
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 750ms;
--duration-slowest: 1000ms;

/* Usage-specific durations */
--duration-tooltip: var(--duration-fast);
--duration-hover: var(--duration-fast);
--duration-modal: var(--duration-normal);
--duration-page-transition: var(--duration-slow);
--duration-chart-animation: var(--duration-slower);
```

### Easing Tokens

```css
/* Easing function primitives */
--ease-linear: linear;
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elastic: cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* CreatorFlow-specific easings */
--ease-snappy: cubic-bezier(0.4, 0, 0.2, 1); /* Most used */
--ease-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-precise: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Component-specific transitions */
--transition-button: all var(--duration-fast) var(--ease-snappy);
--transition-card: all var(--duration-fast) var(--ease-out);
--transition-modal: opacity var(--duration-normal) var(--ease-out);
--transition-hover: transform var(--duration-fast) var(--ease-out);
```

## Component Token Mapping

### Button Token System

```css
/* Button component tokens */
--button-height-sm: 2rem; /* 32px */
--button-height-md: 2.5rem; /* 40px - Default */
--button-height-lg: 3rem; /* 48px */

--button-padding-x-sm: var(--spacing-3);
--button-padding-x-md: var(--spacing-4);
--button-padding-x-lg: var(--spacing-6);

--button-padding-y-sm: var(--spacing-1);
--button-padding-y-md: var(--spacing-2);
--button-padding-y-lg: var(--spacing-3);

--button-font-size-sm: var(--font-size-sm);
--button-font-size-md: var(--font-size-base);
--button-font-size-lg: var(--font-size-lg);

--button-radius: var(--radius-lg);
--button-border-width: 1px;
--button-transition: var(--transition-button);

/* Button variant tokens */
--button-primary-bg: var(--color-brand-primary);
--button-primary-text: var(--color-text-inverse);
--button-primary-border: var(--color-brand-primary);
--button-primary-bg-hover: var(--color-brand-primary-light);

--button-secondary-bg: var(--color-bg-secondary);
--button-secondary-text: var(--color-text-primary);
--button-secondary-border: var(--color-border-default);
--button-secondary-bg-hover: var(--color-bg-elevated);
```

### Card Token System

```css
/* Card component tokens */
--card-bg: var(--color-bg-primary);
--card-border: var(--color-border-default);
--card-radius: var(--radius-2xl);
--card-padding: var(--spacing-lg);
--card-shadow: var(--elevation-card);
--card-transition: var(--transition-card);

/* Card variants */
--card-elevated-shadow: var(--elevation-elevated);
--card-elevated-bg: var(--color-bg-elevated);

--card-glass-bg: rgba(var(--color-bg-rgb), 0.8);
--card-glass-backdrop: blur(24px);
--card-glass-border: rgba(var(--color-border-rgb), 0.2);

--card-brand-bg: rgba(var(--color-brand-rgb), 0.05);
--card-brand-border: rgba(var(--color-brand-rgb), 0.2);
```

## Token Implementation Patterns

### CSS Custom Properties Implementation

```css
/* Token definition structure */
:root {
  /* Primitive tokens (raw values) */
  --primitive-*: value;

  /* Global semantic tokens (system-wide meaning) */
  --global-*: var(--primitive- *);

  /* Component tokens (component-specific usage) */
  --component-*: var(--global- *);
}

/* Theme-specific overrides */
.dark {
  --global-*: var(--primitive- * -dark);
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --global-*: var(--primitive- * -dark);
  }
}
```

### TypeScript Token Definitions

```typescript
// Design token type definitions
export interface DesignTokens {
  colors: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: {
      primary: string;
      mono: string;
      display: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
    };
  };
}

// Token consumption helper
export function useDesignToken(tokenPath: string): string {
  return `var(--${tokenPath.replace('.', '-')})`;
}
```

### Token Generation Tools

```javascript
// Token generation script
const generateTokens = (tokens) => {
  const cssVariables = [];

  function processTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const tokenName = prefix ? `${prefix}-${key}` : key;

      if (typeof value === 'object') {
        processTokens(value, tokenName);
      } else {
        cssVariables.push(`  --${tokenName}: ${value};`);
      }
    }
  }

  processTokens(tokens);

  return `:root {\n${cssVariables.join('\n')}\n}`;
};

// Usage
const tokens = {
  color: {
    brand: {
      primary: '#0d9488',
      secondary: '#8b5cf6',
    },
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
};

console.log(generateTokens(tokens));
// Output:
// :root {
//   --color-brand-primary: #0d9488;
//   --color-brand-secondary: #8b5cf6;
//   --spacing-sm: 0.5rem;
//   --spacing-md: 1rem;
//   --spacing-lg: 1.5rem;
// }
```

---

## Related Documents

- **[S005-DRAFT-core-brand-colors.md](./S005-DRAFT-core-brand-colors.md)**: Brand color token definitions
- **[S006-DRAFT-semantic-color-system.md](./S006-DRAFT-semantic-color-system.md)**: Semantic color token architecture
- **[S007-DRAFT-theme-system.md](./S007-DRAFT-theme-system.md)**: Theme-specific token implementation
- **[S002-DRAFT-design-tokens.md](./S002-DRAFT-design-tokens.md)**: Complete design token system overview
- **[S009-DRAFT-component-color-patterns.md](./S009-DRAFT-component-color-patterns.md)**: Component token usage patterns
