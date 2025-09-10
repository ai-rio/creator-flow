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
import { BillingHistory } from './AM-BillingHistory';
import { BillingOverview } from './AM-BillingOverview';
import { PaymentMethods } from './AM-PaymentMethods';
import { SecuritySettings } from './AM-SecuritySettings';
import BIExecutiveIntelligence from './BI-ExecutiveIntelligence';
import { StrategicInsights } from './BI-StrategicInsights';
import DCBusinessIntelligence from './DC-BusinessIntelligence';
import DCCrisisCommand from './DC-CrisisCommand';
import DCEmergencyControls from './DC-EmergencyControls';
import DCHealthOverview from './DC-HealthOverview';
import DCPerformanceArtistry from './DC-PerformanceArtistry';
// Migrated Navigation Components
import NCNavigationHeader from './NC-NavigationHeader';
// Migrated Order Management Components
import { FlowVisualization } from './OM-FlowVisualization';
// Migrated Sidebar Components
import SBAdminSidebar from './SB-AdminSidebar';
// Migrated Security & Command Components
import SCStrategicCommand from './SC-StrategicCommand';
import UXDestructiveModal from './UX-DestructiveModal';
import { FeedbackWidget } from './UX-FeedbackWidget';
import { OnboardingTour } from './UX-OnboardingTour';
import UXStandardModal from './UX-StandardModal';
import { ToastContainer } from './UX-ToastNotifications';

// Export individual components
export { AdminDashboardHeader };
export { BillingOverview };
export { BillingHistory };
export { PaymentMethods };
export { SecuritySettings };
export { DCHealthOverview };
export { DCPerformanceArtistry };
export { DCBusinessIntelligence };
export { DCCrisisCommand };
export { DCEmergencyControls };
export { NCNavigationHeader };
export { SCStrategicCommand };
export { SBAdminSidebar };
export { UXDestructiveModal };
export { UXStandardModal };
export { FlowVisualization };
export { OnboardingTour };
export { FeedbackWidget };
export { ToastContainer };
export { ALAutomationOrchestra };
export { BIExecutiveIntelligence };
export { StrategicInsights };

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
export const AnalyticsManagementOrganisms = {
  BillingOverview,
  BillingHistory,
  PaymentMethods,
  SecuritySettings,
};

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
  NCNavigationHeader,
  SBAdminSidebar,
  // NavigationSidebar,
};

export const AutomationOrganisms = {
  ALAutomationOrchestra,
};

export const BusinessIntelligenceOrganisms = {
  BIExecutiveIntelligence,
  StrategicInsights,
};

export const OrderManagementOrganisms = {
  FlowVisualization,
};

export const UserExperienceOrganisms = {
  UXStandardModal,
  UXDestructiveModal,
  OnboardingTour,
  FeedbackWidget,
  ToastContainer,
};

export const ContentOrganisms = {
  // ContentEditor,
};

export const ManagementOrganisms = {
  // UserManagement,
};

// Note: Individual component exports will be uncommented as components are migrated
