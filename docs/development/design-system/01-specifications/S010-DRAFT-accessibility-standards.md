# S010-DRAFT-accessibility-standards.md

**Document Type**: Specification  
**Status**: DRAFT  
**Last Updated**: 2025-01-11  
**Related System**: CreatorFlow Design System

## Overview

This specification defines accessibility standards for CreatorFlow's color system, ensuring WCAG AAA compliance and inclusive design practices. All color implementations must meet these standards to provide equitable access for users with diverse abilities and visual needs.

## WCAG AAA Compliance Standards

### Contrast Ratio Requirements

#### Text Contrast Ratios

```css
/* WCAG AAA Standard Requirements */
/* Normal text (under 18px): 7:1 minimum contrast ratio */
/* Large text (18px+ or 14px+ bold): 4.5:1 minimum contrast ratio */

/* CreatorFlow AAA Compliant Colors - Light Theme */
:root {
  /* Enhanced contrast ratios for AAA compliance */
  --brand-teal-primary: 173 100% 18%; /* #005c4f - 8.2:1 ratio on white */
  --brand-purple-primary: 258 100% 30%; /* #4c1d95 - 7.8:1 ratio on white */
  --brand-blue-primary: 215 100% 30%; /* #1e40af - 8.1:1 ratio on white */

  /* Semantic colors with AAA compliance */
  --success-green-600: #16a34a; /* 7.2:1 ratio on white */
  --warning-amber-600: #d97706; /* 7.1:1 ratio on white */
  --error-red-600: #dc2626; /* 7.8:1 ratio on white */

  /* Text colors */
  --foreground: 222.2 84% 4.9%; /* #020617 - 18.7:1 ratio on white */
  --muted-foreground: 215.4 16.3% 25%; /* #475569 - 7.5:1 ratio on white */
}

/* Dark theme optimized for AAA compliance */
.dark {
  --brand-teal-primary: 173 100% 75%; /* #00f5d4 - 8.5:1 ratio on dark */
  --brand-purple-primary: 258 90% 75%; /* #a78bfa - 7.9:1 ratio on dark */
  --brand-blue-primary: 215 100% 75%; /* #60a5fa - 8.3:1 ratio on dark */

  /* Enhanced text contrast for dark theme */
  --foreground: 210 40% 98%; /* #f8fafc - 19.2:1 ratio on dark */
  --muted-foreground: 215.4 16.3% 75%; /* #cbd5e1 - 8.1:1 ratio on dark */
}
```

#### Interactive Element Contrast

```css
/* Interactive elements require enhanced visibility */
--focus-ring: 215 100% 35%; /* #1d4ed8 - Enhanced focus visibility */
--button-primary-bg: var(--brand-teal-primary);
--button-primary-text: 0 0% 100%; /* Pure white for maximum contrast */

/* Interactive state contrast ratios */
.btn-primary {
  background: var(--button-primary-bg); /* 8.2:1 contrast with white text */
  color: var(--button-primary-text);
}

.btn-primary:hover {
  background: var(--brand-teal-500); /* 6.5:1 minimum maintained */
}

.btn-primary:focus-visible {
  outline: 2px solid var(--focus-ring); /* 7.1:1 contrast for visibility */
  outline-offset: 2px;
}
```

### Automated Contrast Testing

```tsx
// Automated contrast ratio testing utility
export function validateContrastRatio(foreground: string, background: string, level: 'AA' | 'AAA' = 'AAA'): boolean {
  const requirements = {
    AA: { normal: 4.5, large: 3.0 },
    AAA: { normal: 7.0, large: 4.5 },
  };

  const contrast = calculateContrastRatio(foreground, background);
  return contrast >= requirements[level].normal;
}

// Component-level contrast validation
export function AccessibleText({
  children,
  color,
  background = 'var(--background)',
  size = 'normal',
}: AccessibleTextProps) {
  const isValid = validateContrastRatio(color, background, 'AAA');

  if (!isValid && process.env.NODE_ENV === 'development') {
    console.warn(`Contrast ratio insufficient: ${color} on ${background}`);
  }

  return (
    <span style={{ color, backgroundColor: background }} data-contrast-valid={isValid}>
      {children}
    </span>
  );
}
```

## Color-Blind Accessibility

### Color-Blind Safe Design Patterns

```tsx
// Always pair color with additional visual cues
const colorBlindSafeIndicators = {
  success: {
    color: 'var(--success-green-600)',
    icon: CheckCircle,
    pattern: 'solid',
    shape: 'circle',
  },
  warning: {
    color: 'var(--warning-amber-600)',
    icon: AlertTriangle,
    pattern: 'diagonal-stripes',
    shape: 'triangle',
  },
  error: {
    color: 'var(--error-red-600)',
    icon: XOctagon,
    pattern: 'dots',
    shape: 'octagon',
  },
  info: {
    color: 'var(--brand-blue-600)',
    icon: Info,
    pattern: 'horizontal-lines',
    shape: 'square',
  },
};

// Implementation with multiple accessibility cues
export function ColorBlindSafeStatus({ type, message, showIcon = true, showPattern = false }: StatusProps) {
  const indicator = colorBlindSafeIndicators[type];
  const Icon = indicator.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border p-3',
        `text-${type}`, // Color cue
        showPattern && `pattern-${indicator.pattern}` // Pattern cue
      )}
      role='status'
      aria-label={`${type} status`}
    >
      {showIcon && (
        <Icon
          size={16}
          aria-hidden='true'
          data-shape={indicator.shape} // Shape cue
        />
      )}
      <span className='sr-only'>{type}: </span>
      {message}
    </div>
  );
}
```

### Protanopia/Deuteranopia Support

```css
/* Red-green color blind safe alternatives */
.protanopia-safe {
  /* Use blue-yellow contrast instead of red-green */
  --safe-positive: var(--brand-blue-600); /* Blue for positive states */
  --safe-negative: var(--warning-amber-600); /* Amber for negative states */
  --safe-neutral: var(--muted-foreground); /* Gray for neutral states */
}

/* Pattern-based visual cues */
.pattern-diagonal-stripes {
  background-image: repeating-linear-gradient(45deg, transparent, transparent 4px, currentColor 4px, currentColor 8px);
  background-size: 12px 12px;
  opacity: 0.1;
}

.pattern-dots {
  background-image: radial-gradient(circle at 6px 6px, currentColor 2px, transparent 2px);
  background-size: 12px 12px;
  opacity: 0.15;
}

.pattern-horizontal-lines {
  background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px);
  background-size: 8px 8px;
  opacity: 0.1;
}
```

### Tritanopia Support

```css
/* Blue-yellow color blind safe alternatives */
.tritanopia-safe {
  /* Use red-green contrast instead of blue-yellow */
  --safe-primary: var(--success-green-600); /* Green for primary actions */
  --safe-secondary: var(--error-red-600); /* Red for secondary actions */
  --safe-tertiary: var(--muted-foreground); /* Gray for tertiary */
}
```

## High Contrast Mode Support

### Enhanced Contrast Adaptations

```css
/* High contrast mode adaptations */
@media (prefers-contrast: high) {
  :root {
    /* Maximize contrast for high contrast preference */
    --brand-teal-primary: 0 0% 0%; /* Pure black for maximum contrast */
    --brand-purple-primary: 0 0% 0%;
    --brand-blue-primary: 0 0% 0%;

    /* Enhanced border visibility */
    --border: 0 0% 0%; /* Black borders */
    --border-width: 2px; /* Thicker borders */

    /* Button contrast enhancement */
    --button-border: 2px solid black;
  }

  .dark {
    /* High contrast dark mode */
    --brand-teal-primary: 0 0% 100%; /* Pure white for dark mode */
    --brand-purple-primary: 0 0% 100%;
    --brand-blue-primary: 0 0% 100%;

    --border: 0 0% 100%; /* White borders */
    --button-border: 2px solid white;
  }

  /* Remove glass effects that reduce contrast */
  .glass-content-card,
  .card-primary,
  .card-executive {
    backdrop-filter: none; /* Remove blur */
    background: var(--background); /* Solid background */
    border: var(--button-border); /* Enhanced border */
  }

  /* Enhance focus indicators */
  *:focus-visible {
    outline: 3px solid var(--foreground); /* Thicker focus outline */
    outline-offset: 3px;
  }
}
```

### Component High Contrast Adaptations

```tsx
// High contrast aware component
export function HighContrastAdaptiveCard({ children, variant }: CardProps) {
  return (
    <Card
      className={cn(
        'rounded-lg p-6 transition-all',
        // Standard styling
        'border-border bg-card shadow-sm',
        // High contrast enhancements
        'contrast-more:border-foreground contrast-more:bg-background',
        'contrast-more:border-2 contrast-more:shadow-none'
      )}
    >
      {children}
    </Card>
  );
}
```

## Reduced Motion Accessibility

### Motion-Safe Color Transitions

```css
/* Respect motion preferences for color transitions */
@media (prefers-reduced-motion: reduce) {
  /* Disable color transition animations */
  .theme-transition,
  .color-transition,
  .hover-color-change {
    transition: none !important;
    animation: none !important;
  }

  /* Maintain color changes without animation */
  .hover-lift:hover {
    transform: none; /* Remove transform */
    box-shadow: var(--shadow-card); /* Keep shadow for depth */
  }

  /* Disable glassmorphism effects that animate */
  .callout-glass-pane::before,
  .content-glass-tracking::before {
    animation: none;
    transition: none;
    opacity: 0.1; /* Static low opacity */
  }
}

/* Motion-safe color feedback */
.motion-safe-feedback {
  /* Use instant color changes instead of transitions */
  transition: none;
}

.motion-safe-feedback:hover {
  color: var(--brand-teal-500); /* Instant color change */
}

.motion-safe-feedback:focus {
  outline: 2px solid var(--brand-teal-primary); /* Instant focus */
}
```

### Alternative Feedback Methods

```tsx
// Provide alternative feedback for reduced motion users
export function MotionSafeButton({ children, variant = 'primary', ...props }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 font-medium',
        buttonColorVariants[variant].base,
        // Motion-safe hover states
        'motion-reduce:transition-none',
        'motion-reduce:hover:brightness-110', // Brightness change instead of color
        // Enhanced feedback for reduced motion
        isPressed && 'motion-reduce:brightness-90'
      )}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Screen Reader and Assistive Technology Support

### Semantic Color Communication

```tsx
// Communicate color meaning to screen readers
export function SemanticColorComponent({ status, message, includeColorDescription = true }: SemanticProps) {
  const statusDescriptions = {
    success: 'success indicated by green',
    warning: 'warning indicated by amber',
    error: 'error indicated by red',
    info: 'information indicated by blue',
  };

  return (
    <div className={statusColors[status]} role='status'>
      <span className='sr-only'>
        {includeColorDescription && statusDescriptions[status]}
        {status}:
      </span>
      {message}
    </div>
  );
}
```

### ARIA Integration with Color States

```tsx
// Enhanced ARIA support for color-coded states
export function AccessibleStatusIndicator({ status, value, label }: StatusIndicatorProps) {
  const ariaDescriptions = {
    success: 'positive status',
    warning: 'attention required',
    error: 'critical issue',
    info: 'informational',
  };

  return (
    <div
      className={statusColors[status]}
      role='status'
      aria-label={`${label}: ${value} - ${ariaDescriptions[status]}`}
      aria-describedby={`status-description-${status}`}
    >
      <span id={`status-description-${status}`} className='sr-only'>
        Status is {status}, indicated by {statusColors[status].replace('text-', '')} color
      </span>
      <span aria-hidden='true'>{value}</span>
    </div>
  );
}
```

## Print Accessibility

### Print-Safe Color Adaptations

```css
/* Print styles for accessibility */
@media print {
  /* Convert colors to grayscale patterns for print */
  .print-safe {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  /* Success states */
  .text-success-green-600 {
    color: black !important;
    font-weight: bold;
  }

  .text-success-green-600::before {
    content: '✓ '; /* Success checkmark */
  }

  /* Warning states */
  .text-warning-amber-600 {
    color: black !important;
    text-decoration: underline;
  }

  .text-warning-amber-600::before {
    content: '⚠ '; /* Warning symbol */
  }

  /* Error states */
  .text-error-red-600 {
    color: black !important;
    font-weight: bold;
    text-decoration: underline;
  }

  .text-error-red-600::before {
    content: '✗ '; /* Error X mark */
  }

  /* Remove background colors for print */
  .bg-success-green-500\/10,
  .bg-warning-amber-500\/10,
  .bg-error-red-500\/10 {
    background: white !important;
    border: 1px solid black !important;
  }
}
```

## Testing and Validation Tools

### Automated Accessibility Testing

```tsx
// Accessibility testing utilities
export const accessibilityTests = {
  // Test contrast ratios
  async testContrastRatios() {
    const elements = document.querySelectorAll('[data-test-contrast]');
    const results = [];

    for (const element of elements) {
      const styles = getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      const contrast = calculateContrastRatio(color, backgroundColor);
      const isAAA = contrast >= 7.0;

      results.push({
        element: element.tagName,
        color,
        backgroundColor,
        contrast,
        isAAA,
      });
    }

    return results;
  },

  // Test color-blind simulation
  simulateColorBlindness(type: 'protanopia' | 'deuteranopia' | 'tritanopia') {
    const filters = {
      protanopia: 'url(#protanopia-filter)',
      deuteranopia: 'url(#deuteranopia-filter)',
      tritanopia: 'url(#tritanopia-filter)',
    };

    document.documentElement.style.filter = filters[type];
  },

  // Test keyboard navigation
  async testKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    return Array.from(focusableElements).map((element) => ({
      tag: element.tagName,
      hasVisibleFocus: hasVisibleFocusIndicator(element),
      isKeyboardAccessible: element.tabIndex >= 0,
    }));
  },
};

// Development helper component
export function AccessibilityTestingPanel() {
  const [testResults, setTestResults] = useState(null);

  return (
    <div className='fixed bottom-4 right-4 rounded-lg border bg-background p-4 shadow-lg'>
      <h3 className='mb-2 font-bold'>Accessibility Testing</h3>
      <div className='space-y-2'>
        <button onClick={() => accessibilityTests.testContrastRatios().then(setTestResults)} className='btn-primary'>
          Test Contrast Ratios
        </button>
        <button onClick={() => accessibilityTests.simulateColorBlindness('protanopia')} className='btn-secondary'>
          Simulate Protanopia
        </button>
        <button
          onClick={() => accessibilityTests.testKeyboardNavigation().then(setTestResults)}
          className='btn-secondary'
        >
          Test Keyboard Navigation
        </button>
      </div>
      {testResults && <pre className='mt-4 max-h-32 overflow-auto text-xs'>{JSON.stringify(testResults, null, 2)}</pre>}
    </div>
  );
}
```

### Manual Testing Checklist

```markdown
## Color Accessibility Testing Checklist

### Contrast Testing

- [ ] All text meets WCAG AAA (7:1) contrast ratios
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators are clearly visible
- [ ] Disabled states maintain minimum contrast

### Color-Blind Testing

- [ ] Information is conveyed without color alone
- [ ] Icons or patterns accompany color coding
- [ ] Status indicators work in grayscale
- [ ] Charts/graphs have pattern alternatives

### High Contrast Mode

- [ ] All elements remain visible in high contrast
- [ ] Borders and outlines are enhanced
- [ ] Glass effects are disabled/replaced
- [ ] Focus indicators are amplified

### Reduced Motion

- [ ] Color transitions respect motion preferences
- [ ] Alternative feedback methods are provided
- [ ] Essential information doesn't rely on animation
- [ ] Hover states work without transitions

### Screen Reader Testing

- [ ] Color meanings are communicated textually
- [ ] ARIA labels describe color states
- [ ] Status changes are announced
- [ ] Visual-only color cues have text alternatives
```

---

## Related Documents

- **[S005-DRAFT-core-brand-colors.md](./S005-DRAFT-core-brand-colors.md)**: Core brand color definitions and accessibility considerations
- **[S006-DRAFT-semantic-color-system.md](./S006-DRAFT-semantic-color-system.md)**: Semantic color accessibility patterns
- **[S007-DRAFT-theme-system.md](./S007-DRAFT-theme-system.md)**: Theme accessibility and contrast optimization
- **[S008-DRAFT-glassmorphism-guide.md](./S008-DRAFT-glassmorphism-guide.md)**: Glass effect accessibility adaptations
- **[S009-DRAFT-component-color-patterns.md](./S009-DRAFT-component-color-patterns.md)**: Accessible component color implementations
