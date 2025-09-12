# S005-DRAFT-core-brand-colors.md

**Document Type**: Specification  
**Status**: DRAFT  
**Last Updated**: 2025-01-11  
**Related System**: CreatorFlow Design System

## Overview

This specification defines the core brand color palette and semantic tokens that form the foundation of CreatorFlow's visual identity. These colors are extracted from production components and ensure consistency across all interfaces.

## Core Brand Palette

### Primary Brand Colors

#### CreatorFlow Teal

```css
/* Primary brand color - extracted from working components */
--brand-teal-400: #2dd4bf; /* Light variant */
--brand-teal-500: #14b8a6; /* Standard variant */
--brand-teal-600: #0d9488; /* Primary variant (most used) */
--brand-teal-primary: #0d9488; /* Design token alias */
```

**Usage Examples**:

- Primary call-to-action buttons
- Interactive elements and links
- Success states and positive metrics
- Blog accent colors (dark theme)

#### CreatorFlow Purple

```css
/* Secondary brand color - data visualization accent */
--brand-purple-400: #a78bfa; /* Light variant */
--brand-purple-500: #8b5cf6; /* Standard variant */
--brand-purple-600: #7c3aed; /* Primary variant */
```

**Usage Examples**:

- Data visualization secondary lines
- Blog accent colors (light theme)
- Automation status indicators
- Premium feature highlights

#### CreatorFlow Blue

```css
/* Supporting brand color - information and clarity */
--brand-blue-400: #60a5fa; /* Dark theme logo */
--brand-blue-500: #3b82f6; /* Standard variant */
--brand-blue-600: #2563eb; /* Primary variant */
--brand-blue-700: #1d4ed8; /* Light theme logo */
```

**Usage Examples**:

- Informational callouts and alerts
- Chart tertiary data lines
- Neutral interactive elements
- System status indicators

## Theme-Specific Implementations

### Light Theme Colors (AAA Compliant)

```css
:root {
  /* Enhanced for accessibility compliance */
  --brand-teal-primary: 173 100% 18%; /* #005c4f - Darker for AAA */
  --brand-teal-light: 173 100% 22%; /* #007061 - Darker light variant */
  --brand-purple-primary: 258 100% 30%; /* #4c1d95 - Darker purple */
  --brand-blue-primary: 215 100% 30%; /* #1e40af - Darker blue */
}
```

**Accessibility Notes**:

- All light theme colors meet WCAG AAA contrast requirements
- Minimum contrast ratio of 7:1 against white backgrounds
- Enhanced visibility for users with visual impairments

### Dark Theme Colors (AAA Compliant)

```css
.dark {
  /* Optimized for dark background visibility */
  --brand-teal-primary: 173 100% 75%; /* #00f5d4 - Lighter for dark */
  --brand-teal-light: 173 100% 80%; /* #1affdb - Even lighter */
  --brand-purple-primary: 258 90% 75%; /* #a78bfa - Lighter purple */
  --brand-blue-primary: 215 100% 75%; /* #60a5fa - Lighter blue */
}
```

## TikTok Integration Colors

### TikTok Brand Colors

```css
/* Official TikTok brand colors for integration features */
--tiktok-pink: #ff0050; /* TikTok brand pink */
--tiktok-blue: #25f4ee; /* TikTok brand blue */
--tiktok-black: #161823; /* TikTok brand black */
--tiktok-viral: #ff0050; /* Viral content alerts */
--tiktok-trending: #25f4ee; /* Trending indicators */
```

**Usage Guidelines**:

- Use sparingly for TikTok-specific features only
- Maintain brand hierarchy (CreatorFlow colors primary)
- Reserve for viral content alerts and TikTok Shop indicators

## Chart and Visualization Colors

### Primary Chart Colors

```css
/* Extracted from EvilCharts integration */
--chart-primary: #0d9488; /* Primary data line (brand teal) */
--chart-secondary: #8b5cf6; /* Secondary data line (brand purple) */
--chart-tertiary: #3b82f6; /* Tertiary data line (brand blue) */
--chart-success: #22c55e; /* Positive metrics */
```

### Chart Supporting Colors

```css
--chart-highlight: rgba(251, 191, 36, 0.5); /* Selection areas */
--chart-highlight-fill: rgba(251, 191, 36, 0.1); /* Highlight fills */
--chart-grid: rgba(156, 163, 175, 0.1); /* Grid lines */
```

## Implementation Guidelines

### Design Token Usage

```tsx
// Preferred: Use design tokens for consistency
className = 'text-brand-teal-600 hover:text-brand-teal-500';

// Avoid: Direct color values
className = 'text-[#0d9488] hover:text-[#14b8a6]';
```

### Component Color Patterns

```tsx
// Status-based color mapping (from molecular components)
const statusColors = {
  viral: 'text-amber-500 dark:text-amber-400',
  'auto-processing': 'text-purple-600 dark:text-purple-400',
  shipped: 'text-sky-600 dark:text-sky-400',
  'high-priority': 'text-destructive dark:text-destructive',
};

// Alert type color mapping
const alertColors = {
  critical: 'text-destructive dark:text-destructive',
  insight: 'text-amber-600 dark:text-amber-400',
  operational: 'text-primary dark:text-primary',
};
```

### Glass Morphism Integration

```css
/* Brand colors with glass morphism effects */
.brand-glass-teal {
  background: rgba(13, 148, 136, 0.1);
  border: 1px solid rgba(13, 148, 136, 0.2);
  backdrop-filter: blur(24px);
}

.brand-glass-purple {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(24px);
}
```

## Color Testing and Validation

### Accessibility Testing

```bash
# Test contrast ratios for all brand colors
bun run test:contrast-ratios

# Validate color-blind accessibility
bun run test:color-blind-simulation

# WCAG AAA compliance check
bun run test:wcag-aaa
```

### Color Consistency Check

```bash
# Verify all components use design tokens
bun run lint:design-tokens

# Check for hard-coded color values
bun run audit:color-usage
```

## Migration from Legacy Colors

### Legacy to New Token Mapping

```css
/* Legacy clarity colors → Brand teal */
.clarity-primary → .brand-teal-600
.clarity-neutral → .brand-teal-500

/* Legacy data-art colors → Brand purple */
.data-art-primary → .brand-purple-600
.data-art-creative → .brand-purple-500;
```

## Future Considerations

### Planned Additions

- **Brand Pink**: For special announcements and campaigns
- **Brand Orange**: For warning states and attention-grabbing elements
- **Expanded Neutral Palette**: Enhanced gray scale for complex interfaces

### Deprecation Timeline

- **Q1 2025**: Legacy color classes marked as deprecated
- **Q2 2025**: Migration tooling and component updates
- **Q3 2025**: Legacy colors removed from codebase

---

## Related Documents

- **[S006-DRAFT-semantic-color-system.md](./S006-DRAFT-semantic-color-system.md)**: Semantic color variants and usage patterns
- **[S007-DRAFT-theme-system.md](./S007-DRAFT-theme-system.md)**: Dark/light theme implementation
- **[S008-DRAFT-glassmorphism-guide.md](./S008-DRAFT-glassmorphism-guide.md)**: Advanced visual effects with brand colors
- **[S009-DRAFT-component-color-patterns.md](./S009-DRAFT-component-color-patterns.md)**: Color usage patterns across components
- **[S010-DRAFT-accessibility-standards.md](./S010-DRAFT-accessibility-standards.md)**: Contrast compliance and guidelines
- **[S002-DRAFT-design-tokens.md](./S002-DRAFT-design-tokens.md)**: Complete design token system
