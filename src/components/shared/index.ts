/**
 * Shared Utilities and Helpers
 *
 * This module provides shared resources used across the atomic design system:
 * hooks, utilities, types, and constants.
 */

// Custom React hooks
export * from './hooks';

// Utility functions
export * from './utils';

// Shared TypeScript types
export * from './types';

// Design system constants
export * from './constants';

// Shared utility categories for development tools
export const SharedCategories = {
  HOOKS: 'hooks',
  UTILS: 'utils',
  TYPES: 'types',
  CONSTANTS: 'constants',
} as const;

export type SharedCategory = (typeof SharedCategories)[keyof typeof SharedCategories];
