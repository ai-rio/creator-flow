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
import OM010SystemStats from './OM-010-SystemStats';
import OM030SubNavbar from './OM-030-SubNavbar';
// Business Intelligence Components (BI-)
import BI020BusinessSymphony from './BI-020-BusinessSymphony';
import BI030StrategicCommand from './BI-030-StrategicCommand';
import BI040LiberationOrchestra from './BI-040-LiberationOrchestra';
import BI050IntelBriefing from './BI-050-IntelBriefing';
// Inventory Management Components (IM-)
import IM010CriticalStock from './IM-010-CriticalStock';
import IM020ManagementFocus from './IM-020-ManagementFocus';
// Profile Management Components (PM-)
import PM010UserProfile from './PM-010-UserProfile';
// Security & Compliance Components (SC-)
import SC010SecurityCard from './SC-010-SecurityCard';
// System Utilities Components (SU-)
import SU010NotFound from './SU-010-NotFound';
import SU020CookiePolicy from './SU-020-CookiePolicy';
import SU030ThemeSwitcher from './SU-030-ThemeSwitcher';
import SU040DataSovereignty from './SU-040-DataSovereignty';
import FP020OrderManagement from './FP-020-OrderManagement';
import FP030DigitalTwinCommand from './FP-030-DigitalTwinCommand';
import FP040LogisticsCoPilot from './FP-040-LogisticsCoPilot';
import FP050DataPrism from './FP-050-DataPrism';
// import I1I5InventoryManagementFocusComponents from './I1I5InventoryManagementFocusComponents'; // RENAMED TO IM-020
// import I3CriticalStockCard from './I3CriticalStockCard'; // RENAMED TO IM-010
// import M1ExecutiveHeader from './M1ExecutiveHeader'; // RENAMED TO NC-030
// import M2BusinessSimphonyCard from './M2BusinessSimphonyCard'; // RENAMED TO BI-020
// import M3StrategicCommandCard from './M3StrategicCommandCard'; // RENAMED TO BI-030
// import M4LiberationOrchestraCard from './M4LiberationOrchestraCard'; // RENAMED TO BI-040
// import M5IntelBriefingCard from './M5IntelBriefingCard'; // RENAMED TO BI-050
// import M6MobileNavbar from './M6MobileNavbar'; // RENAMED TO MC-030
// import O2OrderSystemStatsCard from './O2OrderSystemStatsCard'; // RENAMED TO OM-010
// import O5OrderSubNavbar from './O5OrderSubNavbar'; // RENAMED TO OM-030
// Component-prefixed files - REMOVED (duplicates)
// These files no longer exist as they were duplicates
import HP010Header from './HP-010-Header';
import HP010HeaderHero from './HP-010-Header-Hero';
import HP010HeaderVariant from './HP-010-Header-Variant';
import HP020Hero from './HP-020-Hero';
import HP030BenefitsReelShowcase from './HP-030-BenefitsReel-Showcase';
import HP040Manifesto from './HP-040-Manifesto';
import HP050InteractiveShowcase from './HP-050-InteractiveShowcase';
import HP060Testimonials from './HP-060-Testimonials';
import HP070PricingTiers from './HP-070-PricingTiers';
import HP080FinalCTAVariant from './HP-080-FinalCTA-Variant';
import HP090Footer from './HP-090-Footer';
import AP010Hero from './AP-010-Hero';
import AP020OurMission from './AP-020-OurMission';
import AP030TheTeam from './AP-030-TheTeam';
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
import ACCommandList from './blog-post/AC-CommandList';
import ACExploreFurther from './blog-post/AC-ExploreFurther';
import ACShareDossier from './blog-post/AC-ShareDossier';
// Batch 2 components
import ACSummonsToTheForge from './blog-post/AC-SummonsToTheForge';
import ACTestimonialBlock from './blog-post/AC-TestimonialBlock';
import ACTikTokMetrics from './blog-post/AC-TikTokMetrics';

// === MIGRATED COMPONENTS ===
// Importing migrated components from atomic structure
import AdminDashboardHeader from '../atomic/organisms/AdminDashboardHeader';
import DCHealthOverview from '../atomic/organisms/DC-HealthOverview';
import DCPerformanceArtistry from '../atomic/organisms/DC-PerformanceArtistry';
import DCEmergencyControls from '../atomic/organisms/DC-EmergencyControls';
import DCCommandCenter from '../atomic/compositions/dashboard/DC-CommandCenter';
// New migrated components
import DCBusinessIntelligence from '../atomic/organisms/DC-BusinessIntelligence';
import DCCrisisCommand from '../atomic/organisms/DC-CrisisCommand';
// Migrated atomic components
import NCNavigationHeader from '../atomic/organisms/NC-NavigationHeader';
import UXDestructiveModal from '../atomic/organisms/UX-DestructiveModal';
import UXFeedbackWidgetDemo from '../atomic/organisms/UX-FeedbackWidgetDemo';
import UXOnboardingTourDemo from '../atomic/organisms/UX-OnboardingTourDemo';
import UXStandardModal from '../atomic/organisms/UX-StandardModal';
import UXToastNotificationsDemo from '../atomic/organisms/UX-ToastNotificationsDemo';
import SCStrategicCommand from '../atomic/organisms/SC-StrategicCommand';
import SBAdminSidebar from '../atomic/organisms/SB-AdminSidebar';
import ALAutomationOrchestra from '../atomic/organisms/AL-AutomationOrchestra';
import AMBillingOverviewDemo from '../atomic/organisms/AM-BillingOverviewDemo';
import AMBillingHistoryDemo from '../atomic/organisms/AM-BillingHistoryDemo';
import AMPaymentMethodsDemo from '../atomic/organisms/AM-PaymentMethodsDemo';
import AMSecuritySettingsDemo from '../atomic/organisms/AM-SecuritySettingsDemo';
import DAOrderTableDemo from '../atomic/organisms/DA-OrderTableDemo';
import BIExecutiveIntelligence from '../atomic/organisms/BI-ExecutiveIntelligence';
import BIStrategicInsightsDemo from '../atomic/organisms/BI-StrategicInsightsDemo';
import OMFlowVisualizationDemo from '../atomic/organisms/OM-FlowVisualizationDemo';

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

const componentCategories: ComponentCategories = {
  'Migrated Components': {
    'Phase 1 - Streamlined Migration': [
      { id: 'migrated-dc010', name: 'MIGRATED: Admin Dashboard Header (DC-010)', component: AdminDashboardHeader },
      {
        id: 'migrated-health-overview',
        name: 'MIGRATED: Health Overview (DC-040 Section)',
        component: DCHealthOverview,
      },
      {
        id: 'migrated-performance-artistry',
        name: 'MIGRATED: Performance Artistry (DC-050 Section)',
        component: DCPerformanceArtistry,
      },
    ],
    'Phase 2 - Enhanced Contrast Migration': [
      {
        id: 'migrated-emergency-controls',
        name: 'MIGRATED: Emergency System Controls (DC-060 Section)',
        component: DCEmergencyControls,
      },
      {
        id: 'migrated-command-center',
        name: 'MIGRATED: CEO Command Center (DC-070 Content)',
        component: DCCommandCenter,
      },
      {
        id: 'migrated-business-intelligence',
        name: 'MIGRATED: Business Intelligence Masterpiece (DC-080 Section)',
        component: DCBusinessIntelligence,
      },
      {
        id: 'migrated-crisis-command',
        name: 'MIGRATED: Crisis Command Center (DC-090 Section)',
        component: DCCrisisCommand,
      },
    ],
  },
  'Atomic Components': {
    Organisms: [
      { id: 'atomic-nc-header', name: 'ATOMIC: Navigation Header (NC-010)', component: NCNavigationHeader },
      { id: 'atomic-ux-standard-modal', name: 'ATOMIC: Standard Modal (UX-010)', component: UXStandardModal },
      { id: 'atomic-ux-destructive-modal', name: 'ATOMIC: Destructive Modal (UX-010)', component: UXDestructiveModal },
      { id: 'atomic-ux-onboarding-tour', name: 'ATOMIC: Onboarding Tour (UX-020)', component: UXOnboardingTourDemo },
      { id: 'atomic-ux-feedback-widget', name: 'ATOMIC: Feedback Widget (UX-030)', component: UXFeedbackWidgetDemo },
      {
        id: 'atomic-ux-toast-notifications',
        name: 'ATOMIC: Toast Notifications (UX-040)',
        component: UXToastNotificationsDemo,
      },
      {
        id: 'atomic-om-flow-visualization',
        name: 'ATOMIC: Flow Visualization (OM-020)',
        component: OMFlowVisualizationDemo,
      },
      {
        id: 'atomic-bi-strategic-insights',
        name: 'ATOMIC: Strategic Insights (BI-010)',
        component: BIStrategicInsightsDemo,
      },
      { id: 'atomic-am-billing-overview', name: 'ATOMIC: Billing Overview (AM-010)', component: AMBillingOverviewDemo },
      { id: 'atomic-am-billing-history', name: 'ATOMIC: Billing History (AM-020)', component: AMBillingHistoryDemo },
      { id: 'atomic-am-payment-methods', name: 'ATOMIC: Payment Methods (AM-030)', component: AMPaymentMethodsDemo },
      {
        id: 'atomic-am-security-settings',
        name: 'ATOMIC: Security Settings (AM-040)',
        component: AMSecuritySettingsDemo,
      },
      { id: 'atomic-da-order-table', name: 'ATOMIC: Order Table (DA-010)', component: DAOrderTableDemo },
      { id: 'atomic-sc-strategic', name: 'ATOMIC: Strategic Command Center (SC-010)', component: SCStrategicCommand },
      { id: 'atomic-sb-sidebar', name: 'ATOMIC: Admin Sidebar (SB-010)', component: SBAdminSidebar },
      {
        id: 'atomic-al-orchestra',
        name: 'ATOMIC: Automation Liberation Orchestra (DC-100 Section)',
        component: ALAutomationOrchestra,
      },
      {
        id: 'atomic-bi-intelligence',
        name: 'ATOMIC: Executive Business Intelligence (DC-110 Section)',
        component: BIExecutiveIntelligence,
      },
      { id: 'atomic-admin-header', name: 'ATOMIC: Admin Dashboard Header (DC-010)', component: AdminDashboardHeader },
      { id: 'atomic-dc-health', name: 'ATOMIC: Health Overview (DC-040 Section)', component: DCHealthOverview },
      {
        id: 'atomic-dc-performance',
        name: 'ATOMIC: Performance Artistry (DC-050 Section)',
        component: DCPerformanceArtistry,
      },
      {
        id: 'atomic-dc-business',
        name: 'ATOMIC: Business Intelligence (DC-080 Section)',
        component: DCBusinessIntelligence,
      },
      { id: 'atomic-dc-crisis', name: 'ATOMIC: Crisis Command (DC-090 Section)', component: DCCrisisCommand },
      {
        id: 'atomic-dc-emergency',
        name: 'ATOMIC: Emergency Controls (DC-060 Section)',
        component: DCEmergencyControls,
      },
    ],
    Compositions: [{ id: 'atomic-dc-command', name: 'ATOMIC: Command Center (DC-070)', component: DCCommandCenter }],
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
  'Navigation Components': {
    'NC Series': [
      { id: 'nc010', name: 'NC-010: Header', component: NC010Header },
      { id: 'nc020', name: 'NC-020: Sidebar', component: NC020Sidebar },
      { id: 'nc030', name: 'NC-030: Executive Header', component: NC030ExecutiveHeader },
    ],
  },
  'User Experience Components': {
    'UX Series': [
      { id: 'ux010', name: 'UX-010: Modals', component: UX010Modals },
      { id: 'ux020', name: 'UX-020: Onboarding Tour', component: UX020OnboardingTour },
      { id: 'ux030', name: 'UX-030: Feedback Widget', component: UX030FeedbackWidget },
      { id: 'ux040', name: 'UX-040: Toast Notifications', component: UX040ToastNotifications },
    ],
  },
  'Order Management Components': {
    'OM Series': [
      { id: 'om010', name: 'OM-010: System Stats', component: OM010SystemStats },
      { id: 'om020', name: 'OM-020: Flow Visualization', component: OM020FlowVisualization },
      { id: 'om030', name: 'OM-030: Sub Navbar', component: OM030SubNavbar },
    ],
  },
  'Business Intelligence Components': {
    'BI Series': [
      { id: 'bi010', name: 'BI-010: Strategic Insights', component: BI010StrategicInsights },
      { id: 'bi020', name: 'BI-020: Business Symphony', component: BI020BusinessSymphony },
      { id: 'bi030', name: 'BI-030: Strategic Command', component: BI030StrategicCommand },
      { id: 'bi040', name: 'BI-040: Liberation Orchestra', component: BI040LiberationOrchestra },
      { id: 'bi050', name: 'BI-050: Intel Briefing', component: BI050IntelBriefing },
    ],
  },
  'Account Management Components': {
    'AM Series': [
      { id: 'am010', name: 'AM-010: Billing Overview', component: AM010BillingOverview },
      { id: 'am020', name: 'AM-020: Billing History', component: AM020BillingHistory },
      { id: 'am030', name: 'AM-030: Payment Method', component: AM030PaymentMethod },
      { id: 'am040', name: 'AM-040: Email Notifications', component: AM040EmailNotifications },
    ],
  },
  'Data & Analytics Components': {
    'DA Series': [{ id: 'da010', name: 'DA-010: Order Table', component: DA010OrderTable }],
  },
  'Profile Management Components': {
    'PM Series': [{ id: 'pm010', name: 'PM-010: User Profile', component: PM010UserProfile }],
  },
  'Security & Compliance Components': {
    'SC Series': [
      { id: 'sc010-security', name: 'SC-010: Security Card', component: SC010SecurityCard },
      { id: 'sc010-strategic', name: 'SC-010: Strategic Command Center', component: SC010StrategicCommandCenter },
    ],
  },
  'Sidebar Components': {
    'SB Series': [{ id: 'sb010', name: 'SB-010: Admin Sidebar', component: SB010AdminSidebar }],
  },
  'Mobile Components': {
    'MC Series': [
      { id: 'mc010', name: 'MC-010: Dashboard', component: MC010Dashboard },
      { id: 'mc020', name: 'MC-020: Order', component: MC020Order },
      { id: 'mc030', name: 'MC-030: Navbar', component: MC030Navbar },
    ],
  },
  'Inventory Management Components': {
    'IM Series': [
      { id: 'im010', name: 'IM-010: Critical Stock', component: IM010CriticalStock },
      { id: 'im020', name: 'IM-020: Management Focus', component: IM020ManagementFocus },
    ],
  },
  'System Utilities Components': {
    'SU Series': [
      { id: 'su010', name: 'SU-010: Not Found', component: SU010NotFound },
      { id: 'su020', name: 'SU-020: Cookie Policy', component: SU020CookiePolicy },
      { id: 'su030', name: 'SU-030: Theme Switcher', component: SU030ThemeSwitcher },
      { id: 'su040', name: 'SU-040: Data Sovereignty', component: SU040DataSovereignty },
    ],
  },
  'Feature Prototypes': {
    'FP Series': [
      { id: 'fp020', name: 'FP-020: Order Management', component: FP020OrderManagement },
      { id: 'fp030', name: 'FP-030: Digital Twin Command', component: FP030DigitalTwinCommand },
      { id: 'fp040', name: 'FP-040: Logistics Co-Pilot', component: FP040LogisticsCoPilot },
      { id: 'fp050', name: 'FP-050: Data Prism', component: FP050DataPrism },
    ],
  },
  'Public Pages': {
    'HP Series': [
      { id: 'hp010', name: 'HP-010: Header', component: HP010Header },
      { id: 'hp010hero', name: 'HP-010: Header Hero', component: HP010HeaderHero },
      { id: 'hp010variant', name: 'HP-010: Header Variant', component: HP010HeaderVariant },
      { id: 'hp020', name: 'HP-020: Hero', component: HP020Hero },
      { id: 'hp030', name: 'HP-030: Benefits Reel Showcase', component: HP030BenefitsReelShowcase },
      { id: 'hp040', name: 'HP-040: Manifesto', component: HP040Manifesto },
      { id: 'hp050', name: 'HP-050: Interactive Showcase', component: HP050InteractiveShowcase },
      { id: 'hp060', name: 'HP-060: Testimonials', component: HP060Testimonials },
      { id: 'hp070', name: 'HP-070: Pricing Tiers', component: HP070PricingTiers },
      { id: 'hp080', name: 'HP-080: Final CTA Variant', component: HP080FinalCTAVariant },
      { id: 'hp090', name: 'HP-090: Footer', component: HP090Footer },
    ],
    'AP Series': [
      { id: 'ap010', name: 'AP-010: Hero', component: AP010Hero },
      { id: 'ap020', name: 'AP-020: Our Mission', component: AP020OurMission },
      { id: 'ap030', name: 'AP-030: The Team', component: AP030TheTeam },
    ],
    'CP Series': [
      { id: 'cp010', name: 'CP-010: Hero', component: CP010Hero },
      { id: 'cp020', name: 'CP-020: Open Missions', component: CP020OpenMissions },
    ],
    'LP Series': [{ id: 'lp010', name: 'LP-010: Legal', component: LP010Legal }],
  },
  'Content Components': {
    'Blog Page Components': [
      { id: 'bp-content-hub', name: 'BP: Complete Content Hub', component: BPCompleteContentHub },
      { id: 'bp-toolbar', name: 'BP: Content Hub Toolbar', component: BPContentHubToolbar },
      { id: 'bp-post-card', name: 'BP: Post Card', component: BPPostCard },
    ],
    'Article Components': [
      { id: 'ac-hero', name: 'AC: Article Hero', component: ACArticleHero },
      { id: 'ac-callout', name: 'AC: Callout', component: ACCallout },
      { id: 'ac-data-table', name: 'AC: Data Table', component: ACDataTable },
      { id: 'ac-key-takeaways', name: 'AC: Key Takeaways Component', component: ACKeyTakeawaysComponent },
      { id: 'ac-toc', name: 'AC: Table of Contents', component: ACTableOfContents },
      { id: 'ac-faq', name: 'AC: FAQ Accordion', component: ACFAQAccordion },
      { id: 'ac-milestone', name: 'AC: Milestone Celebration', component: ACMilestoneCelebration },
      { id: 'ac-profit-command', name: 'AC: Profit Command Dashboard', component: ACProfitCommandDashboard },
      { id: 'ac-author-briefing', name: 'AC: Author Briefing', component: ACAuthorBriefing },
      { id: 'ac-callout-advanced', name: 'AC: Callout Advanced', component: ACCalloutAdvanced },
      { id: 'ac-command-list', name: 'AC: Command List', component: ACCommandList },
      { id: 'ac-explore-further', name: 'AC: Explore Further', component: ACExploreFurther },
      { id: 'ac-share-dossier', name: 'AC: Share Dossier', component: ACShareDossier },
      { id: 'ac-summons', name: 'AC: Summons To The Forge', component: ACSummonsToTheForge },
      { id: 'ac-testimonial', name: 'AC: Testimonial Block', component: ACTestimonialBlock },
      { id: 'ac-tiktok', name: 'AC: TikTok Metrics', component: ACTikTokMetrics },
    ],
  },
};

// Flatten all components for navigation
const allComponents: ComponentItem[] = Object.values(componentCategories)
  .flatMap((category) => Object.values(category))
  .flat();

interface UnifiedComponentBrowserProps {
  initialComponent?: string;
}

export default function UnifiedComponentBrowser({
  initialComponent = 'migrated-emergency-controls',
}: UnifiedComponentBrowserProps) {
  const initialIndex = allComponents.findIndex((c) => c.id === initialComponent);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Migrated Components');
  const [selectedSeries, setSelectedSeries] = useState<string>('Phase 2 - Enhanced Contrast Migration');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentComponent = allComponents[currentIndex];
  const CurrentComponent = currentComponent?.component;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allComponents.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < allComponents.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Escape') {
        window.location.href = '/en';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToComponent = (index: number) => {
    setCurrentIndex(index);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('component', allComponents[index].id);
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getComponentsForSeries = (categoryName: string, seriesName: string): ComponentItem[] => {
    const category = componentCategories[categoryName];
    if (!category || typeof category !== 'object') return [];

    const series = category[seriesName];
    return Array.isArray(series) ? series : [];
  };

  const componentsToShow = getComponentsForSeries(selectedCategory, selectedSeries);

  return (
    <div
      className='min-h-screen bg-background'
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Navigation Panel */}
      <motion.div
        className={`fixed z-50 rounded-lg border border-border bg-card shadow-lg ${isCollapsed ? 'w-12' : 'w-80'}`}
        style={{
          left: position.x,
          top: position.y,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Drag Handle */}
        <div
          className='flex cursor-move items-center justify-between rounded-t-lg border-b border-border bg-muted/50 p-3'
          onMouseDown={handleMouseDown}
        >
          <div className='flex items-center gap-2'>
            <Home className='h-4 w-4 text-muted-foreground' />
            {!isCollapsed && <span className='text-sm font-medium text-foreground'>Component Browser</span>}
          </div>
          <div className='flex items-center gap-1'>
            <Button variant='outline' size='sm'>
              Theme
            </Button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className='rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground'
            >
              <Grid3X3 className='h-4 w-4' />
            </button>
            <button
              onClick={() => (window.location.href = '/en')}
              className='rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground'
            >
              <RotateCcw className='h-4 w-4' />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className='max-h-96 overflow-y-auto p-4'>
            {/* Category Selection */}
            <div className='mb-4'>
              <label className='mb-2 block text-xs font-medium text-muted-foreground'>Category</label>
              <Select
                value={selectedCategory}
                onValueChange={(value: string) => {
                  setSelectedCategory(value);
                  const firstSeries = Object.keys(componentCategories[value] || {})[0];
                  if (firstSeries) setSelectedSeries(firstSeries);
                }}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(componentCategories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Series Selection */}
            <div className='mb-4'>
              <label className='mb-2 block text-xs font-medium text-muted-foreground'>Series</label>
              <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select series' />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(componentCategories[selectedCategory] || {}).map((series) => (
                    <SelectItem key={series} value={series}>
                      {series}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Component List */}
            <div className='space-y-1'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-xs font-medium text-muted-foreground'>
                  Components ({componentsToShow.length})
                </span>
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className='rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground'
                >
                  {viewMode === 'grid' ? <List className='h-3 w-3' /> : <Grid3X3 className='h-3 w-3' />}
                </button>
              </div>

              <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-1' : 'space-y-1'}>
                {componentsToShow.map((comp, index) => {
                  const globalIndex = allComponents.findIndex((c) => c.id === comp.id);
                  const isActive = globalIndex === currentIndex;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => navigateToComponent(globalIndex)}
                      className={`rounded p-2 text-left text-xs transition-colors ${
                        isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent'
                      } ${viewMode === 'grid' ? 'flex aspect-square items-center justify-center text-center' : ''}`}
                      title={comp.name}
                    >
                      {viewMode === 'grid' ? comp.name.split(':')[0] : comp.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Controls */}
      <div className='fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transform'>
        <div className='flex items-center gap-2 rounded-lg border border-border bg-card p-2 shadow-lg'>
          <button
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allComponents.length - 1))}
            className='rounded p-2 text-muted-foreground hover:bg-accent hover:text-foreground'
          >
            <ChevronLeft className='h-4 w-4' />
          </button>

          <span className='rounded bg-muted px-3 py-1 text-xs font-medium text-foreground'>
            {currentIndex + 1} / {allComponents.length}
          </span>

          <button
            onClick={() => setCurrentIndex((prev) => (prev < allComponents.length - 1 ? prev + 1 : 0))}
            className='rounded p-2 text-muted-foreground hover:bg-accent hover:text-foreground'
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* Component Display */}
      <div className='p-4'>
        <div className='mb-4'>
          <h1 className='mb-2 text-2xl font-bold text-foreground'>
            {currentComponent?.name || 'No Component Selected'}
          </h1>
          <p className='text-sm text-muted-foreground'>
            Component {currentIndex + 1} of {allComponents.length}
          </p>
        </div>

        <div className='rounded-lg border border-border bg-card'>
          <AnimatePresence mode='wait'>
            {CurrentComponent && (
              <motion.div
                key={currentComponent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className='fixed bottom-4 right-4 rounded border border-border bg-card p-2 text-xs text-muted-foreground'>
        <div>← → Navigate | ESC Exit</div>
      </div>
    </div>
  );
}
