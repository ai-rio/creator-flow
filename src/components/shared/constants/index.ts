/**
 * Shared Design System Constants
 *
 * Centralized constants used across the atomic design system.
 * These constants ensure consistency and provide single source of truth.
 */

// Responsive breakpoints (will be uncommented as they are implemented)
// export { BREAKPOINTS } from './breakpoints';
// export { MEDIA_QUERIES } from './breakpoints';

// Animation constants
// export { ANIMATION_DURATIONS } from './animation';
// export { EASING_FUNCTIONS } from './animation';
// export { TRANSITION_PRESETS } from './animation';

// Design token constants
// export { DESIGN_TOKENS } from './design-tokens';
// export { COLOR_TOKENS } from './design-tokens';
// export { SPACING_TOKENS } from './design-tokens';
// export { TYPOGRAPHY_TOKENS } from './design-tokens';

// Component size constants
// export { COMPONENT_SIZES } from './sizes';
// export { BUTTON_SIZES } from './sizes';
// export { INPUT_SIZES } from './sizes';
// export { AVATAR_SIZES } from './sizes';

// Z-index constants
// export { Z_INDICES } from './z-indices';
// export { MODAL_Z_INDEX } from './z-indices';
// export { DROPDOWN_Z_INDEX } from './z-indices';
// export { TOOLTIP_Z_INDEX } from './z-indices';

// Accessibility constants
// export { ARIA_LABELS } from './accessibility';
// export { FOCUS_RING_STYLES } from './accessibility';
// export { SCREEN_READER_CLASSES } from './accessibility';

// Layout constants
// export { CONTAINER_SIZES } from './layout';
// export { GRID_COLUMNS } from './layout';
// export { SPACING_SCALE } from './layout';

// Form constants
// export { INPUT_TYPES } from './forms';
// export { VALIDATION_MESSAGES } from './forms';
// export { FORM_STATES } from './forms';

// API constants
// export { HTTP_METHODS } from './api';
// export { STATUS_CODES } from './api';
// export { ERROR_MESSAGES } from './api';

// Theme constants
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const COLOR_SCHEMES = {
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
  RED: 'red',
  YELLOW: 'yellow',
  GRAY: 'gray',
} as const;

// Component states
export const COMPONENT_STATES = {
  DEFAULT: 'default',
  HOVER: 'hover',
  ACTIVE: 'active',
  FOCUS: 'focus',
  DISABLED: 'disabled',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

// Constant categories for development tools
export const ConstantCategories = {
  BREAKPOINTS: 'breakpoints',
  ANIMATION: 'animation',
  DESIGN_TOKENS: 'design-tokens',
  SIZES: 'sizes',
  Z_INDICES: 'z-indices',
  ACCESSIBILITY: 'accessibility',
  LAYOUT: 'layout',
  FORMS: 'forms',
  API: 'api',
  THEME: 'theme',
} as const;

export type ConstantCategory = (typeof ConstantCategories)[keyof typeof ConstantCategories];

// Export commonly used type values
export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];
export type ColorScheme = (typeof COLOR_SCHEMES)[keyof typeof COLOR_SCHEMES];
export type ComponentState = (typeof COMPONENT_STATES)[keyof typeof COMPONENT_STATES];

// Note: Individual constant exports will be uncommented as they are implemented
