/**
 * Migration Status Tracking System
 *
 * This module provides centralized tracking of component migration progress
 * from legacy mock components to atomic design system implementations.
 */

export type MigrationStatus = 'NOT_STARTED' | 'PLANNED' | 'IN_PROGRESS' | 'TESTING' | 'COMPLETED';

export interface MigrationEntry {
  legacyName: string;
  atomicName?: string;
  category: 'dashboard' | 'content' | 'homepage' | 'blog' | 'forms' | 'charts';
  status: MigrationStatus;
  startDate?: string;
  completionDate?: string;
  assignee?: string;
  notes?: string;
  testingStatus?: 'pending' | 'in_progress' | 'passed' | 'failed';
  visualRegressionPassed?: boolean;
  performanceImpact?: 'positive' | 'neutral' | 'negative';
}

// Central migration tracking registry
export const MigrationRegistry: Record<string, MigrationEntry> = {
  // Dashboard Components
  'DC-070-CommandCenter': {
    legacyName: 'DC-070-CommandCenter',
    atomicName: 'CommandCenterComposition',
    category: 'dashboard',
    status: 'PLANNED',
    notes: 'High-priority component with complex layout',
  },

  'BI-030-StrategicCommand': {
    legacyName: 'BI-030-StrategicCommand',
    atomicName: 'StrategicCommandComposition',
    category: 'dashboard',
    status: 'NOT_STARTED',
  },

  'OM-010-SystemStats': {
    legacyName: 'OM-010-SystemStats',
    atomicName: 'SystemStatsComposition',
    category: 'dashboard',
    status: 'NOT_STARTED',
  },

  // Homepage Components
  'HP-010-Header-Hero': {
    legacyName: 'HP-010-Header-Hero',
    atomicName: 'HeaderHeroComposition',
    category: 'homepage',
    status: 'NOT_STARTED',
  },

  'HP-060-Testimonials': {
    legacyName: 'HP-060-Testimonials',
    atomicName: 'TestimonialsComposition',
    category: 'homepage',
    status: 'NOT_STARTED',
  },

  'HP-070-PricingTiers': {
    legacyName: 'HP-070-PricingTiers',
    atomicName: 'PricingTiersComposition',
    category: 'homepage',
    status: 'NOT_STARTED',
  },

  // Content Components
  'AC-ArticleHero': {
    legacyName: 'AC-ArticleHero',
    atomicName: 'ArticleHeroComposition',
    category: 'content',
    status: 'NOT_STARTED',
  },

  'BP-Complete-Content-Hub': {
    legacyName: 'BP-Complete-Content-Hub',
    atomicName: 'ContentHubComposition',
    category: 'content',
    status: 'NOT_STARTED',
  },

  'AC-TestimonialBlock': {
    legacyName: 'AC-TestimonialBlock',
    atomicName: 'TestimonialBlockComposition',
    category: 'content',
    status: 'NOT_STARTED',
  },
};

// Migration utility functions
export function getMigrationStatus(componentName: string): MigrationStatus {
  return MigrationRegistry[componentName]?.status || 'NOT_STARTED';
}

export function updateMigrationStatus(
  componentName: string,
  status: MigrationStatus,
  updates?: Partial<MigrationEntry>
): void {
  if (MigrationRegistry[componentName]) {
    MigrationRegistry[componentName] = {
      ...MigrationRegistry[componentName],
      status,
      ...updates,
    };
  }
}

export function getMigrationsByStatus(status: MigrationStatus): MigrationEntry[] {
  return Object.values(MigrationRegistry).filter((entry) => entry.status === status);
}

export function getMigrationsByCategory(category: MigrationEntry['category']): MigrationEntry[] {
  return Object.values(MigrationRegistry).filter((entry) => entry.category === category);
}

export function getMigrationProgress(): {
  total: number;
  notStarted: number;
  planned: number;
  inProgress: number;
  testing: number;
  completed: number;
  percentComplete: number;
} {
  const entries = Object.values(MigrationRegistry);
  const total = entries.length;
  const notStarted = entries.filter((e) => e.status === 'NOT_STARTED').length;
  const planned = entries.filter((e) => e.status === 'PLANNED').length;
  const inProgress = entries.filter((e) => e.status === 'IN_PROGRESS').length;
  const testing = entries.filter((e) => e.status === 'TESTING').length;
  const completed = entries.filter((e) => e.status === 'COMPLETED').length;

  return {
    total,
    notStarted,
    planned,
    inProgress,
    testing,
    completed,
    percentComplete: Math.round((completed / total) * 100),
  };
}

// Export the migration status for external use
export { MigrationRegistry as MigrationStatus };
