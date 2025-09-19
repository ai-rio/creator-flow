/**
 * Composition Components - Page-Level Layouts
 *
 * Compositions are page-level layouts that recreate existing mock components
 * using atomic, molecular, and organism components. They maintain visual testing
 * compatibility while providing a clean atomic implementation.
 *
 * Characteristics:
 * - Exact visual recreation of legacy mocks
 * - Composed entirely of organisms/molecules/atoms
 * - Maintains existing visual testing
 * - Layout and positioning focused
 * - Minimal additional logic
 */

// Domain-specific composition exports
export * from './content';
export * from './dashboard';
export * from './homepage';
export * from './layouts';

// FP-010 Features Page Compositions
export { FP010FeaturesPage } from './FP010FeaturesPage';

// Composition categories for development tools
export const CompositionCategories = {
  DASHBOARD: 'dashboard',
  CONTENT: 'content',
  HOMEPAGE: 'homepage',
  LAYOUTS: 'layouts',
  FEATURES: 'features',
} as const;

export type CompositionCategory = (typeof CompositionCategories)[keyof typeof CompositionCategories];
