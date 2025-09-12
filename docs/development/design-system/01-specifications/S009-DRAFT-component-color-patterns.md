# S009-DRAFT-component-color-patterns.md

**Document Type**: Specification  
**Status**: DRAFT  
**Last Updated**: 2025-01-11  
**Related System**: CreatorFlow Design System

## Overview

This specification documents common color usage patterns across CreatorFlow components, providing standardized approaches for implementing consistent color systems in molecular and organism-level components. Based on analysis of production components, this guide ensures color consistency and accessibility.

## Status Icon Color Patterns

### Order Status Icons

```tsx
// Pattern extracted from MC-StatusIcon component
type OrderStatusType = 'viral' | 'auto-processing' | 'shipped' | 'high-priority';

const orderStatusColors = {
  viral: 'text-amber-500 dark:text-amber-400',
  'auto-processing': 'text-purple-600 dark:text-purple-400',
  shipped: 'text-sky-600 dark:text-sky-400',
  'high-priority': 'text-destructive dark:text-destructive',
};

// Implementation pattern
export function OrderStatusIcon({ type, size = 20 }: StatusIconProps) {
  const iconMap = {
    viral: <Zap className={orderStatusColors.viral} size={size} />,
    'auto-processing': <Settings className={orderStatusColors['auto-processing']} size={size} />,
    shipped: <Truck className={orderStatusColors.shipped} size={size} />,
    'high-priority': <Bolt className={orderStatusColors['high-priority']} size={size} />,
  };

  return <div>{iconMap[type]}</div>;
}
```

### Alert Type Icons

```tsx
// Pattern extracted from MC-AlertIcon component
type AlertType = 'critical' | 'insight' | 'operational';

const alertTypeColors = {
  critical: 'text-destructive dark:text-destructive',
  insight: 'text-amber-600 dark:text-amber-400',
  operational: 'text-primary dark:text-primary',
};

// Implementation pattern
export function AlertTypeIcon({ type, size = 20 }: AlertIconProps) {
  const iconMap = {
    critical: <AlertTriangle className={alertTypeColors.critical} size={size} />,
    insight: <TrendingUp className={alertTypeColors.insight} size={size} />,
    operational: <Truck className={alertTypeColors.operational} size={size} />,
  };

  return <div>{iconMap[type]}</div>;
}
```

## Progress and Metric Color Patterns

### Circular Progress Colors

```tsx
// Pattern extracted from MC-CircularProgress component
export function CircularProgress({ percentage, variant = 'success' }: ProgressProps) {
  const variantColors = {
    success: 'stroke-emerald-600 dark:stroke-emerald-400',
    warning: 'stroke-amber-600 dark:stroke-amber-400',
    error: 'stroke-red-600 dark:stroke-red-400',
    info: 'stroke-blue-600 dark:stroke-blue-400',
    brand: 'stroke-brand-teal-600 dark:stroke-brand-teal-400',
  };

  return (
    <svg>
      <circle className='stroke-muted/20 dark:stroke-muted/10' />
      <motion.circle
        className={variantColors[variant]}
        strokeDashoffset={useTransform(spring, (p) => circumference - (p / 100) * circumference)}
      />
    </svg>
  );
}
```

### Metric Value Colors

```tsx
// Pattern for metric value styling
const metricVariantColors = {
  default: 'text-foreground',
  success: 'text-success-green-600 dark:text-success-green-400',
  warning: 'text-warning-amber-600 dark:text-warning-amber-400',
  error: 'text-error-red-600 dark:text-error-red-400',
  info: 'text-brand-blue-600 dark:text-brand-blue-400',
  brand: 'text-brand-teal-600 dark:text-brand-teal-400',
};

export function MetricValue({ value, variant = 'default' }: MetricProps) {
  return <span className={cn('text-2xl font-bold', metricVariantColors[variant])}>{value}</span>;
}
```

## Alert and Notification Color Patterns

### Stock Alert Severity System

```tsx
// Pattern extracted from IM-StockAlert component
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

// Implementation pattern
export function StockAlert({ severity = 'warning', children }: AlertProps) {
  const config = severityConfig[severity];

  return (
    <Card className={cn('rounded-premium border p-tactical backdrop-blur-sm', config.bgColor, config.borderColor)}>
      <div className='flex items-start gap-tactical'>
        <Zap className={cn('h-5 w-5', config.iconColor)} />
        <div className={config.textColor}>{children}</div>
      </div>
    </Card>
  );
}
```

### Callout Color Variants

```tsx
// Pattern extracted from AC-Callout-Advanced component
const calloutVariants = {
  info: {
    dark: 'rgba(45, 212, 191, 0.15)', // Teal background
    light: 'rgba(147, 51, 234, 0.15)', // Purple background
    borderDark: 'rgb(45, 212, 191)', // Teal border
    borderLight: 'rgb(147, 51, 234)', // Purple border
  },
  success: {
    dark: 'rgba(74, 222, 128, 0.15)', // Green background
    light: 'rgba(34, 197, 94, 0.15)', // Green background
    borderDark: 'rgb(74, 222, 128)', // Green border
    borderLight: 'rgb(34, 197, 94)', // Green border
  },
  warning: {
    dark: 'rgba(251, 191, 36, 0.15)', // Amber background
    light: 'rgba(245, 158, 11, 0.15)', // Amber background
    borderDark: 'rgb(251, 191, 36)', // Amber border
    borderLight: 'rgb(245, 158, 11)', // Amber border
  },
  danger: {
    dark: 'rgba(244, 63, 94, 0.15)', // Red background
    light: 'rgba(220, 38, 38, 0.15)', // Red background
    borderDark: 'rgb(244, 63, 94)', // Red border
    borderLight: 'rgb(220, 38, 38)', // Red border
  },
};

// Dynamic implementation
export function CalloutVariant({ variant, theme, children }: CalloutProps) {
  const config = calloutVariants[variant];
  const backgroundColor = config[theme];
  const borderColor = config[`border${theme.charAt(0).toUpperCase() + theme.slice(1)}`];

  return (
    <div
      style={{
        background: backgroundColor,
        borderLeft: `4px solid ${borderColor}`,
      }}
      className='rounded-2xl border p-6 backdrop-blur-xl'
    >
      {children}
    </div>
  );
}
```

## Card and Surface Color Patterns

### Metric Card Styling

```tsx
// Pattern extracted from IM-MetricCard component
export function MetricCard({ variant = 'default', ...props }: MetricCardProps) {
  const cardVariants = {
    default: 'bg-card/90 border-border/20',
    success: 'bg-success-green-500/5 border-success-green-500/20',
    warning: 'bg-warning-amber-500/5 border-warning-amber-500/20',
    error: 'bg-error-red-500/5 border-error-red-500/20',
    brand: 'bg-brand-teal-500/5 border-brand-teal-500/20',
  };

  return (
    <Card className={cn('rounded-premium p-tactical backdrop-blur-sm', cardVariants[variant])}>
      <div className='space-y-2'>
        <p className='text-body-xs font-medium uppercase tracking-wide text-muted-foreground'>{props.title}</p>
        <div className='text-metric-lg font-bold text-foreground'>{props.value}</div>
      </div>
    </Card>
  );
}
```

### Glass Pane Adaptation

```tsx
// Pattern extracted from MC-GlassPane component
export function AdaptiveGlassPane({ children, variant = 'default' }: GlassPaneProps) {
  const glassVariants = {
    default: 'bg-background/30 border-border/10',
    elevated: 'bg-background/40 border-border/20 shadow-lg',
    premium: 'bg-background/50 border-brand-teal-500/20 shadow-teal-glow',
  };

  return (
    <div className={cn('backdrop-blur-xl', 'dark:border-border/10 dark:bg-background/20', glassVariants[variant])}>
      {children}
    </div>
  );
}
```

## Badge and Status Color Patterns

### Comprehensive Status Badge System

```tsx
// Complete status badge color mapping
const statusBadgeColors = {
  // Order lifecycle statuses
  pending: {
    bg: 'bg-warning-amber-500/10',
    text: 'text-warning-amber-600',
    border: 'border-warning-amber-500/20',
  },
  processing: {
    bg: 'bg-brand-purple-500/10',
    text: 'text-brand-purple-600',
    border: 'border-brand-purple-500/20',
  },
  shipped: {
    bg: 'bg-brand-blue-500/10',
    text: 'text-brand-blue-600',
    border: 'border-brand-blue-500/20',
  },
  delivered: {
    bg: 'bg-success-green-500/10',
    text: 'text-success-green-600',
    border: 'border-success-green-500/20',
  },
  cancelled: {
    bg: 'bg-error-red-500/10',
    text: 'text-error-red-600',
    border: 'border-error-red-500/20',
  },

  // Inventory statuses
  'in-stock': {
    bg: 'bg-success-green-500/10',
    text: 'text-success-green-600',
    border: 'border-success-green-500/20',
  },
  'low-stock': {
    bg: 'bg-warning-amber-500/10',
    text: 'text-warning-amber-600',
    border: 'border-warning-amber-500/20',
  },
  'out-of-stock': {
    bg: 'bg-error-red-500/10',
    text: 'text-error-red-600',
    border: 'border-error-red-500/20',
  },

  // Content performance statuses
  viral: {
    bg: 'bg-warning-amber-500/10',
    text: 'text-warning-amber-600',
    border: 'border-warning-amber-500/20',
  },
  trending: {
    bg: 'bg-brand-teal-500/10',
    text: 'text-brand-teal-600',
    border: 'border-brand-teal-500/20',
  },
  'auto-processing': {
    bg: 'bg-brand-purple-500/10',
    text: 'text-brand-purple-600',
    border: 'border-brand-purple-500/20',
  },
  'high-priority': {
    bg: 'bg-error-red-500/10',
    text: 'text-error-red-600',
    border: 'border-error-red-500/20',
  },
};

// Universal status badge component
export function StatusBadge({ status, children, variant = 'default' }: StatusBadgeProps) {
  const colors = statusBadgeColors[status];

  if (!colors && variant === 'default') {
    return <Badge className='border-muted/20 bg-muted/20 text-muted-foreground'>{children}</Badge>;
  }

  return (
    <Badge className={cn('text-xs font-medium', colors.bg, colors.text, colors.border, 'border')}>{children}</Badge>
  );
}
```

## Interactive Element Color Patterns

### Button Color System

```tsx
// Comprehensive button color variants
const buttonColorVariants = {
  // Primary action buttons
  primary: {
    base: 'bg-brand-teal-600 text-white border-brand-teal-600',
    hover: 'hover:bg-brand-teal-500 hover:border-brand-teal-500',
    active: 'active:bg-brand-teal-700',
    disabled: 'disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  },

  // Secondary action buttons
  secondary: {
    base: 'bg-secondary text-secondary-foreground border-border',
    hover: 'hover:bg-secondary/80',
    active: 'active:bg-secondary/60',
    disabled: 'disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  },

  // Destructive action buttons
  destructive: {
    base: 'bg-destructive text-destructive-foreground border-destructive',
    hover: 'hover:bg-destructive/80',
    active: 'active:bg-destructive/60',
    disabled: 'disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  },

  // Success action buttons
  success: {
    base: 'bg-success-green-600 text-white border-success-green-600',
    hover: 'hover:bg-success-green-500 hover:border-success-green-500',
    active: 'active:bg-success-green-700',
    disabled: 'disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  },

  // Warning action buttons
  warning: {
    base: 'bg-warning-amber-600 text-white border-warning-amber-600',
    hover: 'hover:bg-warning-amber-500 hover:border-warning-amber-500',
    active: 'active:bg-warning-amber-700',
    disabled: 'disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  },
};

// Implementation pattern
export function ActionButton({ variant = 'primary', disabled, children, ...props }: ButtonProps) {
  const colors = buttonColorVariants[variant];

  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 font-medium transition-colors',
        colors.base,
        colors.hover,
        colors.active,
        colors.disabled
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Link Color System

```tsx
// Link color patterns with states
const linkColorStates = {
  default: 'text-brand-teal-600 hover:text-brand-teal-500',
  muted: 'text-muted-foreground hover:text-foreground',
  destructive: 'text-destructive hover:text-destructive/80',
  success: 'text-success-green-600 hover:text-success-green-500',
  warning: 'text-warning-amber-600 hover:text-warning-amber-500',
};

export function SmartLink({ variant = 'default', children, ...props }: LinkProps) {
  return (
    <a className={cn('underline-offset-4 transition-colors hover:underline', linkColorStates[variant])} {...props}>
      {children}
    </a>
  );
}
```

## Chart and Visualization Patterns

### Chart Color Sequence

```tsx
// Chart color progression for data visualization
const chartColorSequence = [
  'var(--chart-primary)', // #0d9488 - Brand teal
  'var(--chart-secondary)', // #8b5cf6 - Brand purple
  'var(--chart-tertiary)', // #3b82f6 - Brand blue
  'var(--chart-success)', // #22c55e - Success green
  'var(--warning-amber-500)', // #f59e0b - Warning amber
  'var(--error-red-500)', // #ef4444 - Error red
];

// Chart background and grid colors
const chartSupportColors = {
  grid: 'rgba(156, 163, 175, 0.1)', // Subtle grid lines
  highlight: 'rgba(251, 191, 36, 0.5)', // Selection areas
  highlightFill: 'rgba(251, 191, 36, 0.1)', // Highlight fills
  axis: 'rgba(156, 163, 175, 0.4)', // Axis lines
  label: 'var(--muted-foreground)', // Axis labels
};

// Implementation for chart components
export function ChartColorProvider({ children, dataLength }: ChartProviderProps) {
  const colors = chartColorSequence.slice(0, dataLength);

  return <div style={{ '--chart-colors': colors.join(',') } as CSSProperties}>{children}</div>;
}
```

## Animation and Transition Color Patterns

### Hover State Progressions

```tsx
// Hover effect color progressions
const hoverColorProgression = {
  brand: {
    initial: 'var(--brand-teal-600)',
    hover: 'var(--brand-teal-500)',
    glow: '0 0 20px rgba(13, 148, 136, 0.4)',
  },
  success: {
    initial: 'var(--success-green-600)',
    hover: 'var(--success-green-500)',
    glow: '0 0 20px rgba(34, 197, 94, 0.4)',
  },
  warning: {
    initial: 'var(--warning-amber-600)',
    hover: 'var(--warning-amber-500)',
    glow: '0 0 20px rgba(245, 158, 11, 0.4)',
  },
  error: {
    initial: 'var(--error-red-600)',
    hover: 'var(--error-red-500)',
    glow: '0 0 20px rgba(239, 68, 68, 0.4)',
  },
};

// Animated color component
export function AnimatedColorElement({ variant = 'brand', children }: AnimatedProps) {
  const progression = hoverColorProgression[variant];

  return (
    <motion.div
      style={{ color: progression.initial }}
      whileHover={{
        color: progression.hover,
        boxShadow: progression.glow,
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
```

## Accessibility Pattern Implementations

### High Contrast Color Adaptations

```tsx
// High contrast mode component adaptations
export function AccessibleColorComponent({ variant, children }: AccessibleProps) {
  return (
    <div
      className={cn(
        // Standard colors
        statusBadgeColors[variant]?.bg,
        statusBadgeColors[variant]?.text,

        // High contrast overrides
        'contrast-more:bg-background contrast-more:text-foreground',
        'contrast-more:border-2 contrast-more:border-foreground'
      )}
    >
      {children}
    </div>
  );
}
```

### Color-Blind Safe Patterns

```tsx
// Always pair color with iconography for accessibility
const colorBlindSafePatterns = {
  success: { color: 'text-success-green-600', icon: CheckCircle },
  warning: { color: 'text-warning-amber-600', icon: AlertTriangle },
  error: { color: 'text-error-red-600', icon: XOctagon },
  info: { color: 'text-brand-blue-600', icon: Info },
};

export function AccessibleStatus({ type, message }: AccessibleStatusProps) {
  const pattern = colorBlindSafePatterns[type];
  const Icon = pattern.icon;

  return (
    <div className={cn('flex items-center gap-2', pattern.color)}>
      <Icon aria-hidden='true' size={16} />
      <span className='sr-only'>{type} status: </span>
      {message}
    </div>
  );
}
```

## Testing Patterns

### Color Consistency Testing

```tsx
// Testing helper for color consistency
export function ColorTestingHelper() {
  const testColors = [
    '--brand-teal-600',
    '--brand-purple-600',
    '--brand-blue-600',
    '--success-green-600',
    '--warning-amber-600',
    '--error-red-600',
  ];

  return (
    <div data-testid='color-system-test'>
      {testColors.map((color) => (
        <div key={color} data-testid={`color-${color}`} style={{ color: `var(${color})` }}>
          Test Color: {color}
        </div>
      ))}
    </div>
  );
}
```

---

## Related Documents

- **[S005-DRAFT-core-brand-colors.md](./S005-DRAFT-core-brand-colors.md)**: Core brand color definitions
- **[S006-DRAFT-semantic-color-system.md](./S006-DRAFT-semantic-color-system.md)**: Semantic color categories and usage
- **[S007-DRAFT-theme-system.md](./S007-DRAFT-theme-system.md)**: Theme-specific color implementations
- **[S008-DRAFT-glassmorphism-guide.md](./S008-DRAFT-glassmorphism-guide.md)**: Glass effect color integration
- **[S010-DRAFT-accessibility-standards.md](./S010-DRAFT-accessibility-standards.md)**: Color accessibility requirements
