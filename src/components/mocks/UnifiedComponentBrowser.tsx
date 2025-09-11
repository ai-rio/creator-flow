/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid3X3, Home, List, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// import DesktopHeaderDemo from './02DesktopHeaderDemo'; // RENAMED TO NC-010
// import DesktopToastNotifications from './03DesktopToastNotifications'; // RENAMED TO UX-040
// import DesktopSidebarDemo from './04DesktopSidebarDemo'; // RENAMED TO NC-020
// import DesktopModals from './05DesktopModals'; // RENAMED TO UX-010
// import DesktopOnboardingTourDemo from './06DesktopOnboardingTour.demo'; // RENAMED TO UX-020
// import DesktopFeedbackWidget from './07DesktopFeedbackWidget'; // RENAMED TO UX-030
// import MobileOrder from './08MobileOrder'; // RENAMED TO MC-020
// import DesktopOrderTableComponent from './09DesktopOrderTableComponent'; // RENAMED TO DA-010
// import DesktopDashboardCommandCenter from './10DesktopDashboardCommandCenter'; // RENAMED TO DC-070
// import DesktopOrderFlowVisualisation from './11DesktopOrderFlowVisualisation'; // RENAMED TO OM-020
// import DesktopStrategicInsights from './12DesktopStrategicInsights'; // RENAMED TO BI-010
// import DesktopUserProfileCard from './13DesktopUserProfileCard'; // RENAMED TO PM-010
// import DesktopSecurityCard from './14DesktopSecurityCard'; // RENAMED TO SC-010
// import DesktopEmailNotificationsCard from './15DesktopEmailNotificationsCard'; // RENAMED TO AM-040
// import DesktopBillinqOverview from './16DesktopBillinqOverview'; // RENAMED TO AM-010
// import DesktopBillingHistory from './17DesktopBillingHistory'; // RENAMED TO AM-020
// import DesktopPaymentMethod from './18DesktopPaymentMethod'; // RENAMED TO AM-030
// Import all series components (DC- Dashboard Components)
import DC010ShmDashboard from './DC-010-ShmDashboard';
import DC020ShmDashboardV2 from './DC-020-ShmDashboardV2';
import DC030ShmDashboardV3 from './DC-030-ShmDashboardV3';
import DC040ShmDashboardV4 from './DC-040-ShmDashboardV4';
import DC050ShmDashboardV5 from './DC-050-ShmDashboardV5';
import DC060ShmDashboardV6 from './DC-060-ShmDashboardV6';
import DC070CommandCenter from './DC-070-CommandCenter';
import DC080EnhancedCccV1 from './DC-080-EnhancedCccV1';
import DC090EnhancedCccV4 from './DC-090-EnhancedCccV4';
import DC100EnhancedCccV5 from './DC-100-EnhancedCccV5';
// Additional DC-series components
import DC110EnhancedCccV6 from './DC-110-EnhancedCccV6';
import DC120EnhancedCccV4Alt from './DC-120-EnhancedCccV4Alt';
import DC130EnhancedCccV5Alt from './DC-130-EnhancedCccV5Alt';
// Mobile Components (MC-)
import MC010Dashboard from './MC-010-Dashboard';
import MC020Order from './MC-020-Order';
import MC030Navbar from './MC-030-Navbar';
// Navigation Components (NC-)
import NC020Sidebar from './NC-020-Sidebar';
import NC030ExecutiveHeader from './NC-030-ExecutiveHeader';
// Order Management Components (OM-)
// import OM010OrderFlow from './OM-010-OrderFlow'; // Does not exist
// import OM020OrderFlowVisualisation from './OM-020-OrderFlowVisualisation'; // Does not exist
// User Experience Components (UX-)
// import UX010Modal from './UX-010-Modal'; // Does not exist
// import UX020OnboardingTour from './UX-020-OnboardingTour'; // Does not exist
// import UX030FeedbackWidget from './UX-030-FeedbackWidget'; // Does not exist
// import UX040ToastNotification from './UX-040-ToastNotification'; // Does not exist
// Data Analytics Components (DA-)
// import DA010OrderTable from './DA-010-OrderTable'; // Does not exist
// Business Intelligence Components (BI-)
// import BI010StrategicInsights from './BI-010-StrategicInsights'; // Does not exist
// Account Management Components (AM-)
// import AM010BillingOverview from './AM-010-BillingOverview'; // Does not exist
// import AM020BillingHistory from './AM-020-BillingHistory'; // Does not exist
// import AM030PaymentMethod from './AM-030-PaymentMethod'; // Does not exist
// import AM040EmailNotifications from './AM-040-EmailNotifications'; // Does not exist
// Settings & Utilities (SU-)
import SU010NotFound from './SU-010-NotFound';
import SU020CookiePolicy from './SU-020-CookiePolicy';
import SU030ThemeSwitcher from './SU-030-ThemeSwitcher';
// import SU040GDPRData from './SU-040-GDPRData'; // Does not exist
// Profile Management (PM-)
import PM010UserProfile from './PM-010-UserProfile';
// Security Components (SC-)
import SC010SecurityCard from './SC-010-SecurityCard';
// Content & Privacy Components (CP-)
import CP010Hero from './CP-010-Hero';
import CP020OpenMissions from './CP-020-OpenMissions';
// import CookiePolicyBar from './Cookie-Policy-Bar'; // RENAMED TO SU-020
// import CreatorFlowThemeSwitcher from './CreatorFlow-Theme-Switcher'; // RENAMED TO SU-030
// import GDPRDataSovereignty from './GDPR-Data-Sovereignty'; // RENAMED TO SU-040
import LP010Legal from './LP-010-Legal';
// import NotFound404 from './404-NotFound'; // RENAMED TO SU-010
// Blog Page Components
import BPCompleteContentHub from './blog-page/BP-Complete-Content-Hub';
import BPContentHubToolbar from './blog-page/BP-Content-Hub-Toolbar';
import BPPostCard from './blog-page/BP-PostCard';
// Blog Post Components (AC Series)
import ACArticleHero from './blog-post/AC-ArticleHero';
import ACCallout from './blog-post/AC-Callout';
import ACDataTable from './blog-post/AC-DataTable';
import ACKeyTakeawaysComponent from './blog-post/AC-KeyTakeaways Component';
import ACTableOfContents from './blog-post/AC-TableOfContents';
// New batch 2 components
import ACFAQAccordion from './blog-post/AC-FAQAccordion';
import ACMilestoneCelebration from './blog-post/AC-MilestoneCelebration';
import ACProfitCommandDashboard from './blog-post/AC-ProfitCommandDashboard';
// Batch 1 components
import ACAuthorBriefing from './blog-post/AC-AuthorBriefing';
import ACCalloutAdvanced from './blog-post/AC-Callout-Advanced';
// import ACCodeSnippet from './blog-post/AC-CodeSnippet';
// import ACContentStructure from './blog-post/AC-ContentStructure';
// import ACFeaturedImage from './blog-post/AC-FeaturedImage';
// import ACFooterBranding from './blog-post/AC-FooterBranding';
// import ACInlineCode from './blog-post/AC-InlineCode';
// import ACInternalLinking from './blog-post/AC-InternalLinking';
// import ACSocialProof from './blog-post/AC-SocialProof';

// Atomic Component Imports
import SCStrategicCommand from '../atomic/organisms/SC-StrategicCommand';
import NCNavigationHeader from '../atomic/organisms/NC-NavigationHeader';
import SBAdminSidebar from '../atomic/organisms/SB-AdminSidebar';
import DCCommandCenter from '../atomic/compositions/dashboard/DC-CommandCenter';
import DCCrisisCommand from '../atomic/organisms/DC-CrisisCommand';
import DCEmergencyControls from '../atomic/organisms/DC-EmergencyControls';
import DCHealthOverview from '../atomic/organisms/DC-HealthOverview';
import DCPerformanceArtistry from '../atomic/organisms/DC-PerformanceArtistry';
import DCBusinessIntelligence from '../atomic/organisms/DC-BusinessIntelligence';
import BIExecutiveIntelligence from '../atomic/organisms/BI-ExecutiveIntelligence';
import ALAutomationOrchestra from '../atomic/organisms/AL-AutomationOrchestra';
import UXDestructiveModal from '../atomic/organisms/UX-DestructiveModal';
import UXStandardModal from '../atomic/organisms/UX-StandardModal';
import * as UXFeedbackWidget from '../atomic/organisms/UX-FeedbackWidget';
import UXFeedbackWidgetDemo from '../atomic/organisms/UX-FeedbackWidgetDemo';
import * as UXOnboardingTour from '../atomic/organisms/UX-OnboardingTour';
import UXOnboardingTourDemo from '../atomic/organisms/UX-OnboardingTourDemo';
import * as UXToastNotifications from '../atomic/organisms/UX-ToastNotifications';
import UXToastNotificationsDemo from '../atomic/organisms/UX-ToastNotificationsDemo';
import * as OMFlowVisualization from '../atomic/organisms/OM-FlowVisualization';
import OMFlowVisualizationDemo from '../atomic/organisms/OM-FlowVisualizationDemo';
import * as BIStrategicInsights from '../atomic/organisms/BI-StrategicInsights';
import BIStrategicInsightsDemo from '../atomic/organisms/BI-StrategicInsightsDemo';
import * as AMBillingOverview from '../atomic/organisms/AM-BillingOverview';
import AMBillingOverviewDemo from '../atomic/organisms/AM-BillingOverviewDemo';
import * as AMPaymentMethods from '../atomic/organisms/AM-PaymentMethods';
import AMPaymentMethodsDemo from '../atomic/organisms/AM-PaymentMethodsDemo';
import * as AMSecuritySettings from '../atomic/organisms/AM-SecuritySettings';
import AMSecuritySettingsDemo from '../atomic/organisms/AM-SecuritySettingsDemo';
import * as AMBillingHistory from '../atomic/organisms/AM-BillingHistory';
import AMBillingHistoryDemo from '../atomic/organisms/AM-BillingHistoryDemo';
import * as DAOrderTable from '../atomic/organisms/DA-OrderTable';
import DAOrderTableDemo from '../atomic/organisms/DA-OrderTableDemo';

// Home Page Components
import HPHero from '../atomic/organisms/HP-Hero';
import HPHeaderVariant from '../atomic/organisms/HP-HeaderVariant';
import HPBenefitsReel from '../atomic/organisms/HP-BenefitsReel';

// Mobile components
import MCOrderCard from '../atomic/organisms/MC-OrderCard';
import MCOrderManagement from '../atomic/organisms/MC-OrderManagement';
import MCMobileNavBar from '../atomic/organisms/MC-MobileNavBar';
import MCMobileExecutiveHeader from '../atomic/organisms/MC-MobileExecutiveHeader';
import MCOrderFilters from '../atomic/organisms/MC-OrderFilters';
// Order management demo components
import MCOrderManagementDemo from '../atomic/organisms/MC-OrderManagement-Demo';
import MCOrderCardDemo from '../atomic/organisms/MC-OrderCard-Demo';

// Inventory Management Components - Phase 5 Migration (IM-010 Series)
import IMInventoryCommand from '../atomic/compositions/IM-InventoryCommand';
import IMCriticalStock from '../atomic/organisms/IM-CriticalStock';
import IMInventoryHeader from '../atomic/organisms/IM-InventoryHeader';
import IMSyncStatus from '../atomic/organisms/IM-SyncStatus';
import IMStockAlert from '../atomic/molecules/IM-StockAlert';
import IMMetricCard from '../atomic/molecules/IM-MetricCard';
import IMActionGroup from '../atomic/molecules/IM-ActionGroup';
import IMStatusIndicator from '../atomic/atoms/IM-StatusIndicator';
import IMActionButton from '../atomic/atoms/IM-ActionButton';
import IMMetricValue from '../atomic/atoms/IM-MetricValue';

// Inventory Management Components - Phase 6 Migration (IM-020 Series - Management Focus)
import IMManagementFocus from '../atomic/compositions/IM-ManagementFocus';
import IMManagementHeader from '../atomic/organisms/IM-ManagementHeader';
import IMCriticalStockAlerts from '../atomic/organisms/IM-CriticalStockAlerts';
import IMInventoryGallery from '../atomic/organisms/IM-InventoryGallery';
import IMSubNavBar from '../atomic/organisms/IM-SubNavBar';
import IMSyncMetrics from '../atomic/molecules/IM-SyncMetrics';
import IMGlassPane from '../atomic/molecules/IM-GlassPane';
import IMStockLevelBar from '../atomic/molecules/IM-StockLevelBar';
import IMThemeToggle from '../atomic/atoms/IM-ThemeToggle';
import IMBrandIcon from '../atomic/atoms/IM-BrandIcon';

// Type definitions for component structure
interface ComponentItem {
  id: string;
  name: string;
  component: React.ComponentType<any>;
}

interface ComponentSeries {
  [seriesName: string]: ComponentItem[];
}

interface ComponentCategories {
  [categoryName: string]: ComponentSeries;
}

// Define component categories and their series with descriptions
const componentCategories: ComponentCategories = {
  'Atomic Design Components': {
    'Phase 7 - Home Page Migration (HP Series)': [
      {
        id: 'hp-hero',
        name: 'MIGRATED: Home Page Hero Section (HP-010 Hero)',
        component: HPHero,
      },
      {
        id: 'hp-header-variant',
        name: 'MIGRATED: Animated Header Variant (HP-010 Header Variant)',
        component: HPHeaderVariant,
      },
      {
        id: 'hp-benefits-reel',
        name: 'MIGRATED: Benefits Reel Showcase (HP-030 Benefits Reel)',
        component: HPBenefitsReel,
      },
    ],
    'Phase 6 - Management Focus Migration (IM-020)': [
      {
        id: 'im-020-management-focus',
        name: 'MIGRATED: Complete Management Focus Interface (IM-020 Full)',
        component: IMManagementFocus,
      },
      {
        id: 'im-020-management-header',
        name: 'MIGRATED: Management Header (IM-020 Header)',
        component: IMManagementHeader,
      },
      {
        id: 'im-020-critical-stock-alerts',
        name: 'MIGRATED: Critical Stock Alerts (IM-020 Alerts)',
        component: IMCriticalStockAlerts,
      },
      {
        id: 'im-020-inventory-gallery',
        name: 'MIGRATED: Inventory Art Gallery (IM-020 Gallery)',
        component: IMInventoryGallery,
      },
      {
        id: 'im-020-sub-navbar',
        name: 'MIGRATED: Sub Navigation Bar (IM-020 NavBar)',
        component: IMSubNavBar,
      },
      {
        id: 'im-020-sync-metrics',
        name: 'MIGRATED: Sync Performance Metrics (IM-020 Metrics)',
        component: IMSyncMetrics,
      },
      {
        id: 'im-020-glass-pane',
        name: 'MIGRATED: Glass Morphism Pane (IM-020 Glass)',
        component: IMGlassPane,
      },
      {
        id: 'im-020-stock-level-bar',
        name: 'MIGRATED: Stock Level Visualization (IM-020 StockBar)',
        component: IMStockLevelBar,
      },
      {
        id: 'im-020-theme-toggle',
        name: 'MIGRATED: Theme Toggle Button (IM-020 Theme)',
        component: IMThemeToggle,
      },
      {
        id: 'im-020-brand-icon',
        name: 'MIGRATED: Brand Icon Component (IM-020 Brand)',
        component: IMBrandIcon,
      },
    ],
    'Phase 5 - Inventory Management Migration (IM-010)': [
      {
        id: 'migrated-inventory-command',
        name: 'MIGRATED: Complete Inventory Command (IM-010 Full Interface)',
        component: IMInventoryCommand,
      },
      {
        id: 'migrated-critical-stock',
        name: 'MIGRATED: Critical Stock Alerts (IM-010 Stock Cards)',
        component: IMCriticalStock,
      },
      {
        id: 'migrated-inventory-header',
        name: 'MIGRATED: Inventory Header (IM-010 Header)',
        component: IMInventoryHeader,
      },
      {
        id: 'migrated-sync-status',
        name: 'MIGRATED: Sync Status Card (IM-010 Sync)',
        component: IMSyncStatus,
      },
      {
        id: 'migrated-stock-alert',
        name: 'MIGRATED: Stock Alert Molecule (IM-010 Alert)',
        component: IMStockAlert,
      },
      {
        id: 'migrated-metric-card',
        name: 'MIGRATED: Metric Display Card (IM-010 Metric)',
        component: IMMetricCard,
      },
      {
        id: 'migrated-action-group',
        name: 'MIGRATED: Action Button Group (IM-010 Actions)',
        component: IMActionGroup,
      },
      {
        id: 'migrated-status-indicator',
        name: 'MIGRATED: Status Indicator Atom (IM-010 Status)',
        component: IMStatusIndicator,
      },
      {
        id: 'migrated-action-button',
        name: 'MIGRATED: Action Button Atom (IM-010 Button)',
        component: IMActionButton,
      },
      {
        id: 'migrated-metric-value',
        name: 'MIGRATED: Metric Value Atom (IM-010 Value)',
        component: IMMetricValue,
      },
    ],
    'Phase 4 - Order Management Migration': [
      {
        id: 'migrated-order-management',
        name: 'MIGRATED: Complete Order Management (MC-020 Full Interface)',
        component: MCOrderManagementDemo,
      },
      {
        id: 'migrated-order-card',
        name: 'MIGRATED: Order Card with Swipe (MC-020 Card)',
        component: MCOrderCardDemo,
      },
      {
        id: 'migrated-order-filters',
        name: 'MIGRATED: Order Filter System (MC-020 Filters)',
        component: MCOrderFilters,
      },
    ],
    'Phase 3 - Mobile Navigation Migration': [
      {
        id: 'migrated-mobile-navbar',
        name: 'MIGRATED: Mobile Navigation Bar (MC-030 NavBar)',
        component: MCMobileNavBar,
      },
      {
        id: 'migrated-mobile-header',
        name: 'MIGRATED: Mobile Executive Header (MC-030 Header)',
        component: MCMobileExecutiveHeader,
      },
    ],
    'Dashboard Command Center': [
      {
        id: 'atomic-command-center',
        name: 'Dashboard: Complete Command Center',
        component: DCCommandCenter,
      },
      {
        id: 'atomic-crisis-command',
        name: 'Dashboard: Crisis Command Module',
        component: DCCrisisCommand,
      },
      {
        id: 'atomic-emergency-controls',
        name: 'Dashboard: Emergency Controls',
        component: DCEmergencyControls,
      },
      {
        id: 'atomic-health-overview',
        name: 'Dashboard: System Health Overview',
        component: DCHealthOverview,
      },
      {
        id: 'atomic-performance-artistry',
        name: 'Dashboard: Performance Artistry',
        component: DCPerformanceArtistry,
      },
      {
        id: 'atomic-business-intelligence',
        name: 'Dashboard: Business Intelligence',
        component: DCBusinessIntelligence,
      },
    ],
    Organisms: [
      {
        id: 'atomic-strategic-command',
        name: 'Strategic: Command Center',
        component: SCStrategicCommand,
      },
      {
        id: 'atomic-navigation-header',
        name: 'Navigation: Header Component',
        component: NCNavigationHeader,
      },
      {
        id: 'atomic-admin-sidebar',
        name: 'Sidebar: Admin Navigation',
        component: SBAdminSidebar,
      },
      {
        id: 'atomic-executive-intelligence',
        name: 'BI: Executive Intelligence Dashboard',
        component: BIExecutiveIntelligence,
      },
      {
        id: 'atomic-automation-orchestra',
        name: 'Automation: Orchestra Controller',
        component: ALAutomationOrchestra,
      },
      {
        id: 'atomic-destructive-modal',
        name: 'UX: Destructive Action Modal',
        component: UXDestructiveModal,
      },
      {
        id: 'atomic-standard-modal',
        name: 'UX: Standard Modal Dialog',
        component: UXStandardModal,
      },
      {
        id: 'atomic-feedback-widget',
        name: 'UX: User Feedback Widget',
        component: UXFeedbackWidget as any,
      },
      {
        id: 'atomic-feedback-widget-demo',
        name: 'UX: Feedback Widget (Demo)',
        component: UXFeedbackWidgetDemo,
      },
      {
        id: 'atomic-onboarding-tour',
        name: 'UX: Interactive Onboarding Tour',
        component: UXOnboardingTour as any,
      },
      {
        id: 'atomic-onboarding-tour-demo',
        name: 'UX: Onboarding Tour (Demo)',
        component: UXOnboardingTourDemo,
      },
      {
        id: 'atomic-toast-notifications',
        name: 'UX: Toast Notification System',
        component: UXToastNotifications as any,
      },
      {
        id: 'atomic-toast-notifications-demo',
        name: 'UX: Toast Notifications (Demo)',
        component: UXToastNotificationsDemo,
      },
      {
        id: 'atomic-flow-visualization',
        name: 'OM: Order Flow Visualization',
        component: OMFlowVisualization as any,
      },
      {
        id: 'atomic-flow-visualization-demo',
        name: 'OM: Flow Visualization (Demo)',
        component: OMFlowVisualizationDemo,
      },
      {
        id: 'atomic-strategic-insights',
        name: 'BI: Strategic Business Insights',
        component: BIStrategicInsights as any,
      },
      {
        id: 'atomic-strategic-insights-demo',
        name: 'BI: Strategic Insights (Demo)',
        component: BIStrategicInsightsDemo,
      },
      {
        id: 'atomic-billing-overview',
        name: 'AM: Billing Overview Dashboard',
        component: AMBillingOverview as any,
      },
      {
        id: 'atomic-billing-overview-demo',
        name: 'AM: Billing Overview (Demo)',
        component: AMBillingOverviewDemo,
      },
      {
        id: 'atomic-payment-methods',
        name: 'AM: Payment Methods Manager',
        component: AMPaymentMethods as any,
      },
      {
        id: 'atomic-payment-methods-demo',
        name: 'AM: Payment Methods (Demo)',
        component: AMPaymentMethodsDemo,
      },
      {
        id: 'atomic-security-settings',
        name: 'AM: Security Settings Panel',
        component: AMSecuritySettings as any,
      },
      {
        id: 'atomic-security-settings-demo',
        name: 'AM: Security Settings (Demo)',
        component: AMSecuritySettingsDemo,
      },
      {
        id: 'atomic-billing-history',
        name: 'AM: Billing History Table',
        component: AMBillingHistory as any,
      },
      {
        id: 'atomic-billing-history-demo',
        name: 'AM: Billing History (Demo)',
        component: AMBillingHistoryDemo,
      },
      {
        id: 'atomic-order-table',
        name: 'DA: Advanced Order Data Table',
        component: DAOrderTable as any,
      },
      {
        id: 'atomic-order-table-demo',
        name: 'DA: Order Table (Demo)',
        component: DAOrderTableDemo,
      },
    ],
  },
  'Blog Post Content Components': {
    'AC Series - Phase 3 (Advanced Content)': [
      {
        id: 'ac-faq-accordion',
        name: 'AC-FAQAccordion: Interactive FAQ Section',
        component: ACFAQAccordion,
      },
      {
        id: 'ac-milestone-celebration',
        name: 'AC-MilestoneCelebration: Achievement Display',
        component: ACMilestoneCelebration,
      },
      {
        id: 'ac-profit-command-dashboard',
        name: 'AC-ProfitCommandDashboard: Revenue Analytics',
        component: ACProfitCommandDashboard,
      },
    ],
    'AC Series - Phase 2 (Content Structure)': [
      {
        id: 'ac-author-briefing',
        name: 'AC-AuthorBriefing: Author Information Card',
        component: ACAuthorBriefing,
      },
      {
        id: 'ac-callout-advanced',
        name: 'AC-Callout-Advanced: Enhanced Callout Box',
        component: ACCalloutAdvanced,
      },
    ],
    'AC Series - Phase 1 (Core Components)': [
      {
        id: 'ac-article-hero',
        name: 'AC-ArticleHero: Article Header Section',
        component: ACArticleHero,
      },
      {
        id: 'ac-callout',
        name: 'AC-Callout: Information Callout Box',
        component: ACCallout,
      },
      {
        id: 'ac-data-table',
        name: 'AC-DataTable: Responsive Data Display',
        component: ACDataTable,
      },
      {
        id: 'ac-key-takeaways',
        name: 'AC-KeyTakeaways: Summary Points',
        component: ACKeyTakeawaysComponent,
      },
      {
        id: 'ac-table-of-contents',
        name: 'AC-TableOfContents: Navigation TOC',
        component: ACTableOfContents,
      },
    ],
  },
  'Blog Page Components': {
    'BP Series': [
      {
        id: 'bp-complete-content-hub',
        name: 'BP-Complete-Content-Hub: Full Blog Layout',
        component: BPCompleteContentHub,
      },
      {
        id: 'bp-content-hub-toolbar',
        name: 'BP-Content-Hub-Toolbar: Blog Management Tools',
        component: BPContentHubToolbar,
      },
      {
        id: 'bp-post-card',
        name: 'BP-PostCard: Article Preview Card',
        component: BPPostCard,
      },
    ],
  },
  'Dashboard Components': {
    'DC Series': [
      { id: 'dc010', name: 'DC-010: SHM Dashboard', component: DC010ShmDashboard },
      { id: 'dc020', name: 'DC-020: SHM Dashboard V2', component: DC020ShmDashboardV2 },
      { id: 'dc030', name: 'DC-030: SHM Dashboard V3', component: DC030ShmDashboardV3 },
      { id: 'dc040', name: 'DC-040: SHM Dashboard V4', component: DC040ShmDashboardV4 },
      { id: 'dc050', name: 'DC-050: SHM Dashboard V5', component: DC050ShmDashboardV5 },
      { id: 'dc060', name: 'DC-060: SHM Dashboard V6', component: DC060ShmDashboardV6 },
      { id: 'dc070', name: 'DC-070: Command Center', component: DC070CommandCenter },
      { id: 'dc080', name: 'DC-080: Enhanced CCC V1', component: DC080EnhancedCccV1 },
      { id: 'dc090', name: 'DC-090: Enhanced CCC V4', component: DC090EnhancedCccV4 },
      { id: 'dc100', name: 'DC-100: Enhanced CCC V5', component: DC100EnhancedCccV5 },
      { id: 'dc110', name: 'DC-110: Enhanced CCC V6', component: DC110EnhancedCccV6 },
      { id: 'dc120', name: 'DC-120: Enhanced CCC V4 Alt', component: DC120EnhancedCccV4Alt },
      { id: 'dc130', name: 'DC-130: Enhanced CCC V5 Alt', component: DC130EnhancedCccV5Alt },
    ],
  },
  'Mobile Components': {
    'MC Series': [
      { id: 'mc010', name: 'MC-010: Dashboard', component: MC010Dashboard },
      { id: 'mc020', name: 'MC-020: Order', component: MC020Order },
      { id: 'mc030', name: 'MC-030: Navbar', component: MC030Navbar },
    ],
  },
  'Navigation Components': {
    'NC Series': [
      { id: 'nc020', name: 'NC-020: Sidebar', component: NC020Sidebar },
      { id: 'nc030', name: 'NC-030: Executive Header', component: NC030ExecutiveHeader },
    ],
  },
  'User Experience Components': {
    'UX Series': [],
  },
  'Data & Analytics Components': {
    'DA Series': [],
  },
  'Business Intelligence Components': {
    'BI Series': [],
  },
  'Account Management Components': {
    'AM Series': [],
  },
  'Order Management Components': {
    'OM Series': [],
  },
  'Settings & Utilities': {
    'SU Series': [
      { id: 'su010', name: 'SU-010: Not Found', component: SU010NotFound },
      { id: 'su020', name: 'SU-020: Cookie Policy', component: SU020CookiePolicy },
      { id: 'su030', name: 'SU-030: Theme Switcher', component: SU030ThemeSwitcher },
    ],
  },
  'Profile Management': {
    'PM Series': [{ id: 'pm010', name: 'PM-010: User Profile', component: PM010UserProfile }],
  },
  'Security Components': {
    'SC Series': [{ id: 'sc010', name: 'SC-010: Security Card', component: SC010SecurityCard }],
  },
  'Content & Privacy Components': {
    'CP Series': [
      { id: 'cp010', name: 'CP-010: Hero', component: CP010Hero },
      { id: 'cp020', name: 'CP-020: Open Missions', component: CP020OpenMissions },
    ],
  },
  'Legal Pages': {
    'LP Series': [{ id: 'lp010', name: 'LP-010: Legal', component: LP010Legal }],
  },
};

export default function UnifiedComponentBrowser(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get URL parameters for direct component access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const component = urlParams.get('component');
    if (component) {
      // Find the component in categories
      for (const [categoryName, series] of Object.entries(componentCategories)) {
        for (const [seriesName, components] of Object.entries(series)) {
          const foundComponent = components.find((c) => c.id === component);
          if (foundComponent) {
            setSelectedCategory(categoryName);
            setSelectedSeries(seriesName);
            setSelectedComponent(component);
            return;
          }
        }
      }
    }
  }, []);

  // Get available categories
  const categories = Object.keys(componentCategories);

  // Get available series for selected category
  const availableSeries = selectedCategory ? Object.keys(componentCategories[selectedCategory]) : [];

  // Get available components for selected series
  const availableComponents =
    selectedCategory && selectedSeries ? componentCategories[selectedCategory][selectedSeries] : [];

  // Get current component
  const currentComponent = availableComponents.find((c) => c.id === selectedComponent);

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedSeries('');
    setSelectedComponent('');
    // Update URL
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSeries('');
    setSelectedComponent('');
  };

  const handleSeriesChange = (series: string) => {
    setSelectedSeries(series);
    setSelectedComponent('');
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
    // Update URL
    const newUrl = `${window.location.pathname}?component=${componentId}`;
    window.history.pushState({}, '', newUrl);
  };

  // Navigation functions
  const getCurrentIndex = () => availableComponents.findIndex((c) => c.id === selectedComponent);

  const goToPrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      handleComponentSelect(availableComponents[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < availableComponents.length - 1) {
      handleComponentSelect(availableComponents[currentIndex + 1].id);
    }
  };

  const canGoToPrevious = () => getCurrentIndex() > 0;
  const canGoToNext = () => getCurrentIndex() < availableComponents.length - 1;

  if (currentComponent) {
    const CurrentComponentToRender = currentComponent.component;
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900'>
        {/* Fixed Header */}
        <div className='fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95'>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-4'>
              <Button onClick={handleReset} variant='ghost' size='sm' className='gap-2'>
                <Home className='h-4 w-4' />
                Browse
              </Button>
              <div className='text-sm text-slate-600 dark:text-slate-300'>
                {selectedCategory} → {selectedSeries}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Button onClick={goToPrevious} disabled={!canGoToPrevious()} variant='ghost' size='sm'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <span className='px-2 text-sm text-slate-600 dark:text-slate-300'>
                {getCurrentIndex() + 1} of {availableComponents.length}
              </span>
              <Button onClick={goToNext} disabled={!canGoToNext()} variant='ghost' size='sm'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Component Display */}
        <div className='pt-16'>
          <CurrentComponentToRender />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 dark:from-slate-950 dark:to-slate-900'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100'>
                CreatorFlow Component Browser
              </h1>
              <p className='text-slate-600 dark:text-slate-400'>
                Explore and test all components in the CreatorFlow design system
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Button onClick={() => setViewMode('grid')} variant={viewMode === 'grid' ? 'default' : 'ghost'} size='sm'>
                <Grid3X3 className='h-4 w-4' />
              </Button>
              <Button onClick={() => setViewMode('list')} variant={viewMode === 'list' ? 'default' : 'ghost'} size='sm'>
                <List className='h-4 w-4' />
              </Button>
              <Button onClick={handleReset} variant='ghost' size='sm'>
                <RotateCcw className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Navigation Selectors */}
          <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300'>Category</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300'>Series</label>
              <Select value={selectedSeries} onValueChange={handleSeriesChange} disabled={!selectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a series' />
                </SelectTrigger>
                <SelectContent>
                  {availableSeries.map((series) => (
                    <SelectItem key={series} value={series}>
                      {series}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300'>Component</label>
              <Select value={selectedComponent} onValueChange={handleComponentSelect} disabled={!selectedSeries}>
                <SelectTrigger>
                  <SelectValue placeholder='Select a component' />
                </SelectTrigger>
                <SelectContent>
                  {availableComponents.map((component) => (
                    <SelectItem key={component.id} value={component.id}>
                      {component.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Component Grid/List */}
        {selectedSeries && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>
              {selectedCategory} → {selectedSeries}
            </h2>

            <AnimatePresence mode='wait'>
              <motion.div
                key={`${selectedCategory}-${selectedSeries}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={viewMode === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}
              >
                {availableComponents.map((component) => (
                  <motion.div
                    key={component.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='cursor-pointer rounded-lg border border-slate-200 bg-white p-4 transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'
                    onClick={() => handleComponentSelect(component.id)}
                  >
                    <div className='mb-2 flex items-center justify-between'>
                      <h3 className='truncate font-medium text-slate-900 dark:text-slate-100'>{component.name}</h3>
                      <div className='flex items-center text-xs text-slate-500 dark:text-slate-400'>{component.id}</div>
                    </div>
                    <p className='text-sm text-slate-600 dark:text-slate-400'>Click to preview this component</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Category Overview */}
        {!selectedCategory && (
          <div className='space-y-8'>
            <h2 className='text-2xl font-semibold text-slate-900 dark:text-slate-100'>All Categories</h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {categories.map((category) => {
                const seriesCount = Object.keys(componentCategories[category]).length;
                const componentCount = Object.values(componentCategories[category]).reduce(
                  (acc, series) => acc + series.length,
                  0
                );

                return (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='cursor-pointer rounded-lg border border-slate-200 bg-white p-6 transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800'
                    onClick={() => handleCategoryChange(category)}
                  >
                    <h3 className='mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100'>{category}</h3>
                    <div className='flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400'>
                      <span>{seriesCount} series</span>
                      <span>{componentCount} components</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
