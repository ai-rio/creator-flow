/**
 * Shared React Hooks
 *
 * Custom React hooks for the atomic design system.
 * These hooks provide reusable stateful logic across components.
 */

// Design system hooks (will be uncommented as they are implemented)
// export { useDesignTokens } from './useDesignTokens';
// export { useBreakpoint } from './useBreakpoint';
// export { useTheme } from './useTheme';

// Responsive hooks
// export { useMediaQuery } from './useMediaQuery';
// export { useViewport } from './useViewport';

// Form hooks
// export { useFormValidation } from './useFormValidation';
// export { useFieldState } from './useFieldState';

// Animation hooks
// export { useAnimation } from './useAnimation';
// export { useTransition } from './useTransition';

// Data hooks
// export { useDebounce } from './useDebounce';
// export { useThrottle } from './useThrottle';
// export { useLocalStorage } from './useLocalStorage';

// Hook categories for development tools
export const HookCategories = {
  DESIGN_SYSTEM: 'design-system',
  RESPONSIVE: 'responsive',
  FORMS: 'forms',
  ANIMATION: 'animation',
  DATA: 'data',
} as const;

export type HookCategory = (typeof HookCategories)[keyof typeof HookCategories];

// Note: Individual hook exports will be uncommented as they are implemented
