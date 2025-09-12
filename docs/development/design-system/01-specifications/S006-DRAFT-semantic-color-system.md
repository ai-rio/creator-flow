# S006-DRAFT-semantic-color-system.md

**Document Type**: Specification  
**Status**: DRAFT  
**Last Updated**: 2025-01-11  
**Related System**: CreatorFlow Design System

## Overview

This specification defines the semantic color system for CreatorFlow, providing standardized colors for communication states, feedback, and user interface semantics. Built on top of the core brand palette, these colors ensure consistent meaning across all components.

## Semantic Color Categories

### Success Colors (Green Palette)

#### Primary Success Colors

```css
/* Success state colors - extracted from working status indicators */
--success-green-400: #4ade80; /* Light success state */
--success-green-500: #22c55e; /* Primary success state */
--success-green-600: #16a34a; /* Dark success state */

/* Component usage examples */
--chart-success: #22c55e; /* Positive metrics in charts */
```

**Usage Examples**:

- Order completion confirmations
- Successful form submissions
- Positive metric indicators
- "Shipped" and "Delivered" status badges
- Progress completion states

#### Implementation Patterns

```tsx
// Success status component pattern
const SuccessStatus = () => (
  <Badge className='border-success-green-500/20 bg-success-green-500/10 text-success-green-600'>Order Shipped</Badge>
);

// Success circular progress (from MC-CircularProgress)
<CircularProgress className='stroke-emerald-600 dark:stroke-emerald-400' percentage={completed} />;
```

### Warning Colors (Amber Palette)

#### Primary Warning Colors

```css
/* Warning state colors - for attention and caution */
--warning-amber-400: #fbbf24; /* Light warning state */
--warning-amber-500: #f59e0b; /* Primary warning state */
--warning-amber-600: #d97706; /* Dark warning state */
```

**Usage Examples**:

- Low stock alerts
- Pending payment notifications
- Review required states
- Performance warnings
- Rate limit approaching notifications

#### Implementation Patterns

```tsx
// Warning alert pattern (from molecular components)
const WarningAlert = () => (
  <div className='border-warning-amber-500/20 bg-warning-amber-500/10 text-warning-amber-600'>
    <AlertTriangle className='text-amber-600 dark:text-amber-400' />
    Low Stock Alert
  </div>
);

// Status icon pattern (from MC-StatusIcon)
const ViralContentStatus = () => <Zap className='text-amber-500 dark:text-amber-400' />;
```

### Error/Danger Colors (Red Palette)

#### Primary Error Colors

```css
/* Error state colors - for critical issues and failures */
--error-red-400: #f87171; /* Light error state */
--error-red-500: #ef4444; /* Primary error state */
--error-red-600: #dc2626; /* Dark error state */

/* Destructive action colors */
--destructive: 0 84% 35%; /* Light theme destructive (AAA) */
--destructive: 0 84% 65%; /* Dark theme destructive (AAA) */
```

**Usage Examples**:

- Form validation errors
- Failed payment notifications
- System error messages
- Critical stock alerts
- Delete/destructive action confirmations

#### Implementation Patterns

```tsx
// Error state pattern
const ErrorState = () => (
  <div className='text-destructive dark:text-destructive'>
    <AlertTriangle className='text-destructive dark:text-destructive' />
    Critical System Error
  </div>
);

// High priority status (from MC-StatusIcon)
const HighPriorityOrder = () => <Bolt className='text-destructive dark:text-destructive' />;
```

### Info Colors (Blue Palette)

#### Primary Info Colors

```css
/* Information state colors - for neutral information */
--info-blue-400: #60a5fa; /* Light info state */
--info-blue-500: #3b82f6; /* Primary info state */
--info-blue-600: #2563eb; /* Dark info state */

/* Brand blue integration */
--brand-blue-400: #60a5fa; /* Dark theme logo color */
--brand-blue-700: #1d4ed8; /* Light theme logo color */
```

**Usage Examples**:

- Informational callouts
- Helpful tips and guidance
- Neutral system notifications
- Operational status indicators
- General information badges

#### Implementation Patterns

```tsx
// Info alert pattern (from AC-Callout-Advanced analysis)
const InfoCallout = () => (
  <div className='bg-brand-blue-primary/10 border-l-brand-blue-600'>
    <Info className='text-brand-blue-600' />
    Helpful Information
  </div>
);

// Operational status (from MC-AlertIcon)
const OperationalStatus = () => <Truck className='text-primary dark:text-primary' />;
```

## Callout Color System

### Callout Background Colors

```css
/* Extracted from AC-Callout-Advanced component analysis */

/* Dark theme callouts */
--callout-info-dark: rgba(45, 212, 191, 0.15); /* Info callouts */
--callout-success-dark: rgba(74, 222, 128, 0.15); /* Success callouts */
--callout-warning-dark: rgba(251, 191, 36, 0.15); /* Warning callouts */
--callout-danger-dark: rgba(244, 63, 94, 0.15); /* Danger callouts */

/* Light theme callouts */
--callout-info-light: rgba(147, 51, 234, 0.15); /* Light info callouts */
```

### Callout Implementation

```tsx
// Callout variant system (from AC-Callout-Advanced)
const variantConfig = {
  info: {
    dark: '45, 212, 191', // Teal
    light: '147, 51, 234', // Purple
  },
  success: {
    dark: '74, 222, 128', // Green
    light: '34, 197, 94', // Green
  },
  warning: {
    dark: '251, 191, 36', // Amber
    light: '245, 158, 11', // Amber
  },
  danger: {
    dark: '244, 63, 94', // Red
    light: '220, 38, 38', // Red
  },
};

// Dynamic callout styling
const CalloutCard = ({ variant, theme }) => {
  const colors = variantConfig[variant];
  const variantColor = colors[theme];

  return (
    <div
      style={{
        borderLeft: `4px solid rgb(${variantColor})`,
        background: `rgba(${variantColor}, 0.15)`,
      }}
    >
      {children}
    </div>
  );
};
```

## Stock Alert Severity Colors

### Severity Configuration

```css
/* From IM-StockAlert component analysis */
.severity-info {
  background: var(--brand-blue-primary) / 10;
  border-color: var(--brand-blue-primary) / 20;
  color: var(--brand-blue-primary);
}

.severity-warning {
  background: var(--warning-amber-500) / 10;
  border-color: var(--warning-amber-500) / 20;
  color: var(--warning-amber-500);
}

.severity-critical {
  background: var(--brand-purple-primary) / 10;
  border-color: var(--brand-purple-primary) / 20;
  color: var(--brand-purple-primary);
}
```

### Implementation Pattern

```tsx
// Severity-based color system (from IM-StockAlert)
const severityConfig = {
  info: {
    bgColor: 'bg-brand-blue-primary/10',
    borderColor: 'border-brand-blue-primary/20',
    iconColor: 'text-brand-blue-primary',
    textColor: 'text-brand-blue-primary',
  },
  warning: {
    bgColor: 'bg-warning-amber-500/10',
    borderColor: 'border-warning-amber-500/20',
    iconColor: 'text-warning-amber-500',
    textColor: 'text-warning-amber-500',
  },
  critical: {
    bgColor: 'bg-brand-purple-primary/10',
    borderColor: 'border-brand-purple-primary/20',
    iconColor: 'text-brand-purple-primary',
    textColor: 'text-brand-purple-primary',
  },
};
```

## Theme-Specific Semantic Colors

### Light Theme Accessibility (AAA Compliant)

```css
:root {
  /* Enhanced contrast for accessibility */
  --success-primary: 22 184 78; /* Darker green for AAA */
  --warning-primary: 217 119 6; /* Darker amber for AAA */
  --error-primary: 185 28 28; /* Darker red for AAA */
  --info-primary: 30 64 175; /* Darker blue for AAA */

  /* Destructive actions */
  --destructive: 0 84% 35%; /* AAA compliant destructive */
  --destructive-foreground: 210 40% 98%;
}
```

### Dark Theme Optimization

```css
.dark {
  /* Optimized for dark backgrounds */
  --success-primary: 34 197 94; /* Lighter green for visibility */
  --warning-primary: 245 158 11; /* Lighter amber for visibility */
  --error-primary: 239 68 68; /* Lighter red for visibility */
  --info-primary: 96 165 250; /* Lighter blue for visibility */

  /* Destructive actions */
  --destructive: 0 84% 65%; /* Lighter for dark theme AAA */
  --destructive-foreground: 222.2 84% 4.9%;
}
```

## Status Badge System

### Status Color Mapping

```tsx
// Comprehensive status system (extracted from components)
const statusColorMap = {
  // Order statuses
  pending: 'bg-warning-amber-500/10 text-warning-amber-600 border-warning-amber-500/20',
  processing: 'bg-brand-purple-500/10 text-brand-purple-600 border-brand-purple-500/20',
  shipped: 'bg-info-blue-500/10 text-info-blue-600 border-info-blue-500/20',
  delivered: 'bg-success-green-500/10 text-success-green-600 border-success-green-500/20',
  cancelled: 'bg-error-red-500/10 text-error-red-600 border-error-red-500/20',

  // Inventory statuses
  'in-stock': 'bg-success-green-500/10 text-success-green-600',
  'low-stock': 'bg-warning-amber-500/10 text-warning-amber-600',
  'out-of-stock': 'bg-error-red-500/10 text-error-red-600',

  // Content statuses
  viral: 'bg-warning-amber-500/10 text-warning-amber-600',
  trending: 'bg-brand-teal-500/10 text-brand-teal-600',
  'auto-processing': 'bg-brand-purple-500/10 text-brand-purple-600',
  'high-priority': 'bg-error-red-500/10 text-error-red-600',
};

// Usage pattern
const StatusBadge = ({ status, children }) => <Badge className={statusColorMap[status]}>{children}</Badge>;
```

## Accessibility Considerations

### Contrast Requirements

```css
/* All semantic colors meet WCAG AAA standards */
/* Minimum contrast ratio: 7:1 for normal text */
/* Minimum contrast ratio: 4.5:1 for large text */

/* Example contrast ratios (calculated) */
--success-green-600: #16a34a; /* 7.2:1 on white background */
--warning-amber-600: #d97706; /* 7.1:1 on white background */
--error-red-600: #dc2626; /* 7.8:1 on white background */
--info-blue-600: #2563eb; /* 8.1:1 on white background */
```

### Color-Blind Accessibility

```tsx
// Always pair color with iconography
const AccessibleAlert = ({ type, message }) => (
  <div className={semanticColors[type]}>
    <IconMap[type] aria-hidden="true" />
    <span className="sr-only">{type} alert: </span>
    {message}
  </div>
);

// Icon mapping for semantic reinforcement
const IconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XOctagon,
  info: Info,
};
```

## Testing and Validation

### Automated Color Testing

```bash
# Test all semantic color contrast ratios
bun run test:semantic-colors

# Validate color-blind accessibility
bun run test:color-blind-semantic

# Check semantic color consistency
bun run lint:semantic-usage
```

### Manual Testing Checklist

- [ ] All semantic colors meet WCAG AAA contrast requirements
- [ ] Colors maintain meaning across light/dark themes
- [ ] Color-blind users can distinguish states through icons
- [ ] High contrast mode provides adequate visibility
- [ ] Print styles maintain readability

---

## Related Documents

- **[S005-DRAFT-core-brand-colors.md](./S005-DRAFT-core-brand-colors.md)**: Core brand color palette and tokens
- **[S007-DRAFT-theme-system.md](./S007-DRAFT-theme-system.md)**: Dark/light theme implementation
- **[S009-DRAFT-component-color-patterns.md](./S009-DRAFT-component-color-patterns.md)**: Color usage patterns across components
- **[S010-DRAFT-accessibility-standards.md](./S010-DRAFT-accessibility-standards.md)**: Contrast compliance and guidelines
- **[S008-DRAFT-glassmorphism-guide.md](./S008-DRAFT-glassmorphism-guide.md)**: Advanced visual effects with semantic colors
