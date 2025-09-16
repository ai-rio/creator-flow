/**
 * Dashboard Composition Components
 *
 * These compositions recreate dashboard-related mock components using atomic design principles.
 * Each composition maintains pixel-perfect visual parity with its corresponding legacy mock.
 */

// Bento Dashboard Compositions
export type { BentoCEODashboardProps, DashboardStats } from './BentoCEODashboard';
export { BentoCEODashboard } from './BentoCEODashboard';

// Legacy Dashboard Compositions
export { CEOCommandCenter } from './DC-CommandCenter';

// Import components for grouped exports
import { BentoCEODashboard } from './BentoCEODashboard';
import { CEOCommandCenter } from './DC-CommandCenter';

// Dashboard Compositions (will be uncommented as they are implemented)
// export { CommandCenterComposition } from './CommandCenterComposition';
// export { StrategicCommandComposition } from './StrategicCommandComposition';
// export { SystemStatsComposition } from './SystemStatsComposition';

// Grouped dashboard compositions for easy import
export const DashboardCompositions = {
  BentoCEODashboard,
  CEOCommandCenter,
  // CommandCenter: CommandCenterComposition,
  // StrategicCommand: StrategicCommandComposition,
  // SystemStats: SystemStatsComposition,
};

// Legacy component mapping for migration tracking
export const DashboardLegacyMapping = {
  BentoCEODashboard: 'New bento grid CEO dashboard',
  CEOCommandCenter: 'DC-070-CommandCenter',
  // 'CommandCenterComposition': 'DC-070-CommandCenter',
  // 'StrategicCommandComposition': 'BI-030-StrategicCommand',
  // 'SystemStatsComposition': 'OM-010-SystemStats',
} as const;

// Note: Individual exports will be uncommented as compositions are migrated
