/**
 * Legacy Mock Components
 *
 * This module re-exports existing mock components from the original mocks folder
 * to maintain compatibility during the migration process.
 *
 * NOTE: These exports will be gradually removed as atomic compositions replace them.
 */

// Re-export existing mock components from the original location
// This maintains backward compatibility while we implement atomic alternatives

// The existing mocks are still located at:
// /src/components/mocks/*
// We'll create symbolic links or direct re-exports as needed during migration

// Migration Status Tracking
export const MockMigrationStatus = {
  // Dashboard Components
  'DC-070-CommandCenter': 'PLANNED',
  'BI-030-StrategicCommand': 'NOT_STARTED',
  'OM-010-SystemStats': 'NOT_STARTED',

  // Homepage Components
  'HP-010-Header-Hero': 'NOT_STARTED',
  'HP-060-Testimonials': 'NOT_STARTED',
  'HP-070-PricingTiers': 'NOT_STARTED',

  // Content Components
  'AC-ArticleHero': 'NOT_STARTED',
  'BP-Complete-Content-Hub': 'NOT_STARTED',
  'AC-TestimonialBlock': 'NOT_STARTED',

  // Blog Components - already moved to /mocks/blog-page/ and /mocks/blog-post/
  // These maintain their existing structure during migration
} as const;

export type MigrationStatusType = 'NOT_STARTED' | 'PLANNED' | 'IN_PROGRESS' | 'TESTING' | 'COMPLETED';

// Helper function to get migration status
export function getMigrationStatus(componentName: string): MigrationStatusType {
  return MockMigrationStatus[componentName as keyof typeof MockMigrationStatus] || 'NOT_STARTED';
}

// Note: Actual component re-exports will be added here as needed during migration
