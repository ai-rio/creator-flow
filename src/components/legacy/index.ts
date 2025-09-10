/**
 * Legacy Components - Preserved During Migration
 *
 * This module provides access to legacy mock components while they are being
 * migrated to the atomic design system. Components in this module will be
 * gradually replaced by their atomic counterparts.
 */

// Legacy mock components (preserved during migration)
export * from './mocks';

// Migration adapters (compatibility layer)
export * from './adapters';

// Migration status tracking
export { MigrationStatus } from './migration-status';

// Legacy component categories for development tools
export const LegacyCategories = {
  DASHBOARD: 'dashboard',
  CONTENT: 'content',
  HOMEPAGE: 'homepage',
  BLOG: 'blog',
  FORMS: 'forms',
  CHARTS: 'charts',
} as const;

export type LegacyCategory = (typeof LegacyCategories)[keyof typeof LegacyCategories];
