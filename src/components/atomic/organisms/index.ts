/**
 * Organism Components - Complex Compositions with Business Logic
 *
 * Organisms are complex components composed of molecules and atoms.
 * They contain business logic, context-aware functionality, and API integration.
 *
 * Characteristics:
 * - Composed of molecules and atoms
 * - Complex business logic
 * - Context-aware functionality
 * - API integration and data management
 * - Advanced state management
 */

// Migrated Dashboard Components from DC- Series
import AdminDashboardHeader from './AdminDashboardHeader';
// Migrated Automation & Business Intelligence Components
import ALAutomationOrchestra from './AL-AutomationOrchestra';
import BIExecutiveIntelligence from './BI-ExecutiveIntelligence';
import DCBusinessIntelligence from './DC-BusinessIntelligence';
import DCCrisisCommand from './DC-CrisisCommand';
import DCEmergencyControls from './DC-EmergencyControls';
import DCHealthOverview from './DC-HealthOverview';
import DCPerformanceArtistry from './DC-PerformanceArtistry';
// Migrated Sidebar Components
import SBAdminSidebar from './SB-AdminSidebar';
// Migrated Security & Command Components
import SCStrategicCommand from './SC-StrategicCommand';

// Export individual components
export { AdminDashboardHeader };
export { DCHealthOverview };
export { DCPerformanceArtistry };
export { DCBusinessIntelligence };
export { DCCrisisCommand };
export { DCEmergencyControls };
export { SCStrategicCommand };
export { SBAdminSidebar };
export { ALAutomationOrchestra };
export { BIExecutiveIntelligence };

// Dashboard Organisms
// export { DashboardHeader } from './DashboardHeader';
// export type { DashboardHeaderProps } from './DashboardHeader';

// Data Organisms
// export { ChartContainer } from './ChartContainer';
// export type { ChartContainerProps } from './ChartContainer';
// export { DataTable } from './DataTable';
// export type { DataTableProps } from './DataTable';
// export { AnalyticsPanel } from './AnalyticsPanel';
// export type { AnalyticsPanelProps } from './AnalyticsPanel';

// Navigation Organisms
// export { NavigationSidebar } from './NavigationSidebar';
// export type { NavigationSidebarProps } from './NavigationSidebar';

// Content Organisms
// export { ContentEditor } from './ContentEditor';
// export type { ContentEditorProps } from './ContentEditor';

// Management Organisms
// export { UserManagement } from './UserManagement';
// export type { UserManagementProps } from './UserManagement';

// Grouped exports for domain-specific usage
export const DashboardOrganisms = {
  AdminDashboardHeader,
  DCHealthOverview,
  DCPerformanceArtistry,
  DCBusinessIntelligence,
  DCCrisisCommand,
  DCEmergencyControls,
  // DashboardHeader,
};

export const SecurityOrganisms = {
  SCStrategicCommand,
};

export const NavigationOrganisms = {
  SBAdminSidebar,
  // NavigationSidebar,
};

export const AutomationOrganisms = {
  ALAutomationOrchestra,
};

export const BusinessIntelligenceOrganisms = {
  BIExecutiveIntelligence,
};

export const ContentOrganisms = {
  // ContentEditor,
};

export const ManagementOrganisms = {
  // UserManagement,
};

// Note: Individual component exports will be uncommented as components are migrated
