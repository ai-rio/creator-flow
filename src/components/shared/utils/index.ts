/**
 * Shared Utility Functions
 *
 * Common utility functions used across the atomic design system.
 * These functions provide reusable logic for components.
 */

// Class name utilities (will be uncommented as they are implemented)
// export { cn } from './cn';
// export { cx } from './cx';
// export { clsx } from './clsx';

// Design token utilities
// export { getDesignToken } from './design-tokens';
// export { resolveTokenValue } from './design-tokens';
// export { validateTokenUsage } from './design-tokens';

// Responsive utilities
// export { getBreakpointValue } from './responsive';
// export { matchMediaQuery } from './responsive';
// export { getViewportSize } from './responsive';

// Color utilities
// export { hexToRgb } from './color';
// export { rgbToHex } from './color';
// export { getContrastRatio } from './color';
// export { isColorAccessible } from './color';

// Typography utilities
// export { getFontSize } from './typography';
// export { getLineHeight } from './typography';
// export { getLetterSpacing } from './typography';

// Animation utilities
// export { getAnimationDuration } from './animation';
// export { getEasingFunction } from './animation';
// export { createTransition } from './animation';

// Data utilities
// export { debounce } from './data';
// export { throttle } from './data';
// export { deepMerge } from './data';
// export { pick } from './data';
// export { omit } from './data';

// Validation utilities
// export { validateProps } from './validation';
// export { validateAccessibility } from './validation';
// export { validateDesignTokens } from './validation';

// Utility categories for development tools
export const UtilityCategories = {
  CLASS_NAMES: 'class-names',
  DESIGN_TOKENS: 'design-tokens',
  RESPONSIVE: 'responsive',
  COLOR: 'color',
  TYPOGRAPHY: 'typography',
  ANIMATION: 'animation',
  DATA: 'data',
  VALIDATION: 'validation',
} as const;

export type UtilityCategory = (typeof UtilityCategories)[keyof typeof UtilityCategories];

// Note: Individual utility exports will be uncommented as they are implemented
