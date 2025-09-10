/**
 * Shared TypeScript Types
 *
 * Common type definitions used across the atomic design system.
 * These types ensure consistency and type safety.
 */

// Component base types (will be uncommented as they are implemented)
// export type { BaseComponentProps } from './component.types';
// export type { VariantProps } from './component.types';
// export type { SizeProps } from './component.types';
// export type { ColorProps } from './component.types';

// Design system types
// export type { DesignToken } from './design-system.types';
// export type { TokenValue } from './design-system.types';
// export type { TokenCategory } from './design-system.types';
// export type { ResponsiveValue } from './design-system.types';

// Theme types
// export type { Theme } from './theme.types';
// export type { ThemeMode } from './theme.types';
// export type { ColorScheme } from './theme.types';
// export type { ColorPalette } from './theme.types';

// Layout types
// export type { LayoutProps } from './layout.types';
// export type { SpacingProps } from './layout.types';
// export type { BorderProps } from './layout.types';
// export type { ShadowProps } from './layout.types';

// Typography types
// export type { TypographyProps } from './typography.types';
// export type { FontSize } from './typography.types';
// export type { FontWeight } from './typography.types';
// export type { LineHeight } from './typography.types';

// Animation types
// export type { AnimationProps } from './animation.types';
// export type { TransitionProps } from './animation.types';
// export type { EasingFunction } from './animation.types';

// Interaction types
// export type { InteractionProps } from './interaction.types';
// export type { HoverProps } from './interaction.types';
// export type { FocusProps } from './interaction.types';
// export type { ActiveProps } from './interaction.types';

// Accessibility types
// export type { AccessibilityProps } from './accessibility.types';
// export type { AriaProps } from './accessibility.types';
// export type { RoleProps } from './accessibility.types';

// Common React types
export type { ComponentProps, ReactElement, ReactNode } from 'react';

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Type categories for development tools
export const TypeCategories = {
  COMPONENT: 'component',
  DESIGN_SYSTEM: 'design-system',
  THEME: 'theme',
  LAYOUT: 'layout',
  TYPOGRAPHY: 'typography',
  ANIMATION: 'animation',
  INTERACTION: 'interaction',
  ACCESSIBILITY: 'accessibility',
  UTILITY: 'utility',
} as const;

export type TypeCategory = (typeof TypeCategories)[keyof typeof TypeCategories];

// Note: Individual type exports will be uncommented as they are implemented
