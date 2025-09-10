# Shared Utilities and Helpers

## Overview

This folder contains shared utilities, hooks, types, and constants used across the atomic design system. These resources provide consistent functionality and maintain design system coherence.

## Folder Structure

```
shared/
├── hooks/                    # Custom React hooks
├── utils/                    # Utility functions
├── types/                    # Shared TypeScript types
├── constants/                # Design system constants
└── index.ts                  # Main exports
```

## Custom React Hooks (`./hooks/`)

### Design System Hooks

```typescript
// useDesignTokens - Access design tokens in components
import { useDesignTokens } from '@/components/shared/hooks';

const Button = () => {
  const tokens = useDesignTokens();
  const styles = {
    backgroundColor: tokens.color.primary[500],
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.borderRadius.md,
  };

  return <button style={styles}>Click me</button>;
};

// useBreakpoint - Responsive design hook
import { useBreakpoint } from '@/components/shared/hooks';

const ResponsiveComponent = () => {
  const { isDesktop, isMobile, breakpoint } = useBreakpoint();

  return (
    <div className={cn('grid', isMobile ? 'grid-cols-1' : 'grid-cols-3', isDesktop && 'gap-8')}>{/* Content */}</div>
  );
};

// useTheme - Theme management hook
import { useTheme } from '@/components/shared/hooks';

const ThemedComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      Current theme: {theme}
    </button>
  );
};
```

### Form and Data Hooks

```typescript
// useFormValidation - Form validation logic
import { useFormValidation } from '@/components/shared/hooks';

const ContactForm = () => {
  const { values, errors, handleChange, validate } = useFormValidation({
    email: { required: true, type: 'email' },
    name: { required: true, minLength: 2 },
  });

  return (
    <form onSubmit={validate}>
      <input name='email' value={values.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
      {errors.email && <span>{errors.email}</span>}
    </form>
  );
};

// useDebounce - Debounced value hook
import { useDebounce } from '@/components/shared/hooks';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' />;
};
```

## Utility Functions (`./utils/`)

### Class Name Utilities

```typescript
// Enhanced class name utilities
import { cn, cx } from '@/components/shared/utils';

// cn - clsx-based utility with design token support
const Button = ({ variant, size, disabled, className, ...props }) => (
  <button
    className={cn(
      // Base styles using design tokens
      'px-spacing-md py-spacing-sm',
      'font-weight-medium text-typography-body',
      'border-radius-md transition-all-200ms',

      // Variant styles
      variant === 'primary' && 'bg-color-primary-500 text-color-white',
      variant === 'secondary' && 'bg-color-gray-100 text-color-gray-900',

      // Size styles
      size === 'small' && 'px-spacing-sm py-spacing-xs text-typography-sm',
      size === 'large' && 'px-spacing-lg py-spacing-md text-typography-lg',

      // State styles
      disabled && 'cursor-not-allowed opacity-50',

      // Custom className
      className
    )}
    {...props}
  />
);
```

### Design Token Utilities

```typescript
// Design token access and manipulation
import { getDesignToken, resolveTokenValue } from '@/components/shared/utils';

// Get token value
const primaryColor = getDesignToken('color.primary.500'); // '#3B82F6'
const mediumSpacing = getDesignToken('spacing.md'); // '1rem'

// Resolve token with fallbacks
const tokenValue = resolveTokenValue('color.primary.500', '#3B82F6');

// Validate token usage (development only)
import { validateTokenUsage } from '@/components/shared/utils';

const isValidToken = validateTokenUsage('color.invalid.token'); // false
```

### Color and Typography Utilities

```typescript
// Color manipulation utilities
import { hexToRgb, getContrastRatio, isColorAccessible } from '@/components/shared/utils';

// Color conversion
const rgbColor = hexToRgb('#3B82F6'); // { r: 59, g: 130, b: 246 }

// Accessibility checking
const contrastRatio = getContrastRatio('#3B82F6', '#FFFFFF'); // 4.5
const isAccessible = isColorAccessible('#3B82F6', '#FFFFFF'); // true (WCAG AA)

// Typography utilities
import { getFontSize, getLineHeight } from '@/components/shared/utils';

const fontSize = getFontSize('lg'); // '1.125rem'
const lineHeight = getLineHeight('lg'); // '1.75rem'
```

## Shared Types (`./types/`)

### Component Base Types

```typescript
// Base component interfaces
import type { BaseComponentProps, VariantProps, SizeProps, ColorProps } from '@/components/shared/types';

// Base props for all components
interface MyComponentProps extends BaseComponentProps {
  title: string;
  description?: string;
}

// Variant-based props
interface ButtonProps extends VariantProps<'primary' | 'secondary' | 'outline'> {
  children: ReactNode;
}

// Size-based props
interface AvatarProps extends SizeProps<'sm' | 'md' | 'lg' | 'xl'> {
  src: string;
  alt: string;
}
```

### Design System Types

```typescript
// Design system type definitions
import type { DesignToken, TokenValue, ResponsiveValue, ThemeMode } from '@/components/shared/types';

// Token-based styling
interface StyledComponentProps {
  backgroundColor?: DesignToken<'color'>;
  padding?: DesignToken<'spacing'>;
  fontSize?: DesignToken<'typography.fontSize'>;
}

// Responsive values
interface ResponsiveComponentProps {
  columns?: ResponsiveValue<1 | 2 | 3 | 4>;
  spacing?: ResponsiveValue<DesignToken<'spacing'>>;
}
```

### Layout and Animation Types

```typescript
// Layout system types
import type { LayoutProps, SpacingProps, AnimationProps } from '@/components/shared/types';

// Spacing props for layout components
interface ContainerProps extends SpacingProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
}

// Animation props for interactive components
interface ModalProps extends AnimationProps {
  isOpen: boolean;
  onClose: () => void;
}
```

## Design System Constants (`./constants/`)

### Theme and Color Constants

```typescript
// Theme configuration
import { THEME_MODES, COLOR_SCHEMES, COMPONENT_STATES } from '@/components/shared/constants';

// Theme mode switching
const themeConfig = {
  mode: THEME_MODES.SYSTEM, // 'light' | 'dark' | 'system'
  colorScheme: COLOR_SCHEMES.BLUE, // 'blue' | 'green' | 'purple' | etc.
};

// Component state management
const buttonStates = {
  default: COMPONENT_STATES.DEFAULT,
  hover: COMPONENT_STATES.HOVER,
  active: COMPONENT_STATES.ACTIVE,
  disabled: COMPONENT_STATES.DISABLED,
};
```

### Layout and Animation Constants

```typescript
// Responsive breakpoints
import { BREAKPOINTS, MEDIA_QUERIES } from '@/components/shared/constants';

// Media query usage
const styles = {
  [MEDIA_QUERIES.mobile]: {
    display: 'block',
  },
  [MEDIA_QUERIES.desktop]: {
    display: 'flex',
  },
};

// Animation constants
import { ANIMATION_DURATIONS, EASING_FUNCTIONS, TRANSITION_PRESETS } from '@/components/shared/constants';

// Animation configuration
const fadeTransition = {
  duration: ANIMATION_DURATIONS.normal, // 200ms
  easing: EASING_FUNCTIONS.ease, // cubic-bezier(0.4, 0, 0.2, 1)
};
```

## Usage Patterns

### Component Development

```typescript
// Comprehensive component using shared resources
import { cn } from '@/components/shared/utils';
import { useBreakpoint, useTheme } from '@/components/shared/hooks';
import { COMPONENT_STATES, ANIMATION_DURATIONS } from '@/components/shared/constants';
import type { BaseComponentProps, VariantProps } from '@/components/shared/types';

interface CardProps extends BaseComponentProps, VariantProps<'default' | 'elevated'> {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const Card = ({ variant = 'default', title, description, actions, className, ...props }: CardProps) => {
  const { isMobile } = useBreakpoint();
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        // Base styles with design tokens
        'p-spacing-lg border-radius-lg',
        'bg-color-surface border-color-border border',
        'transition-all',

        // Variant styles
        variant === 'elevated' && 'shadow-elevation-md',
        variant === 'default' && 'shadow-elevation-sm',

        // Theme-aware styles
        theme === 'dark' && 'bg-color-surface-dark border-color-border-dark',

        // Responsive styles
        isMobile && 'p-spacing-md',

        // Custom className
        className
      )}
      style={{
        transitionDuration: ANIMATION_DURATIONS.normal,
      }}
      {...props}
    >
      <h3 className='text-typography-h3 font-weight-semibold text-color-primary'>{title}</h3>
      {description && <p className='mt-spacing-sm text-typography-body text-color-secondary'>{description}</p>}
      {actions && <div className='mt-spacing-md gap-spacing-sm flex'>{actions}</div>}
    </div>
  );
};
```

### Custom Hook Development

```typescript
// Custom hook using shared utilities
import { useCallback, useState, useEffect } from 'react';
import { debounce } from '@/components/shared/utils';
import { ANIMATION_DURATIONS } from '@/components/shared/constants';

export const useAnimatedValue = (targetValue: number, duration = ANIMATION_DURATIONS.normal) => {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateToValue = useCallback(
    debounce((newValue: number) => {
      setIsAnimating(true);
      // Animation logic here
      setTimeout(() => {
        setCurrentValue(newValue);
        setIsAnimating(false);
      }, duration);
    }, 50),
    [duration]
  );

  useEffect(() => {
    if (targetValue !== currentValue) {
      animateToValue(targetValue);
    }
  }, [targetValue, currentValue, animateToValue]);

  return { currentValue, isAnimating };
};
```

## Development Guidelines

### Adding New Shared Resources

1. **Hooks**: Add to appropriate category in `hooks/` folder
2. **Utilities**: Group by functionality in `utils/` folder
3. **Types**: Organize by domain in `types/` folder
4. **Constants**: Group by system area in `constants/` folder

### Documentation Requirements

- TSDoc comments for all public interfaces
- Usage examples for complex utilities
- Type annotations for all functions
- Performance considerations for hooks

### Testing Requirements

- Unit tests for all utility functions
- Hook testing with React Testing Library
- Type testing for TypeScript definitions
- Performance testing for expensive operations

## Related Documentation

- [Design System Overview](../../../docs/development/design-system/01-specifications/S001-DRAFT-design-system-overview.md)
- [Design Tokens](../../../docs/development/design-system/01-specifications/S002-DRAFT-design-tokens.md)
- [Component Patterns](../../../docs/development/design-system/01-specifications/S004-DRAFT-component-patterns.md)

---

_Shared utilities provide the foundation for consistent, maintainable component development across the atomic design system._
