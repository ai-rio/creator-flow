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
// Mobile components - newly migrated
import MCMobileExecutiveHeader from '../atomic/organisms/MC-MobileExecutiveHeader';
import MCMobileNavBar from '../atomic/organisms/MC-MobileNavBar';
import MCBusinessSymphony from '../atomic/organisms/MC-BusinessSymphony';
import MCStrategicCommand from '../atomic/organisms/MC-StrategicCommand';
import MCLiberationOrchestra from '../atomic/organisms/MC-LiberationOrchestra';
import MCIntelligenceBriefing from '../atomic/organisms/MC-IntelligenceBriefing';
import MCMobileDashboardDemo from '../atomic/organisms/MC-MobileDashboardDemo';
// Order management components - migrated from MC-020
import MCOrderManagement from '../atomic/organisms/MC-OrderManagement';
import MCOrderCard from '../atomic/organisms/MC-OrderCard';
import MCOrderHeader from '../atomic/organisms/MC-OrderHeader';
import MCOrderFilters from '../atomic/organisms/MC-OrderFilters';
// Order management demo components
import MCOrderManagementDemo from '../atomic/organisms/MC-OrderManagement-Demo';
import MCOrderCardDemo from '../atomic/organisms/MC-OrderCard-Demo';

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
        name: 'MIGRATED: Emergency Controls (DC-050 Section)',
        component: DCEmergencyControls,
      },
      {
        id: 'migrated-command-center',
        name: 'MIGRATED: Command Center Dashboard (DC-070 Complete)',
        component: DCCommandCenter,
      },
      {
        id: 'migrated-business-intelligence',
        name: 'MIGRATED: Business Intelligence Center (DC-080 Section)',
        component: DCBusinessIntelligence,
      },
      {
        id: 'migrated-crisis-command',
        name: 'MIGRATED: Crisis Command Center (DC-090 Section)',
        component: DCCrisisCommand,
      },
    ],
    'Phase 3 - Mobile-First Migration': [
      {
        id: 'migrated-mobile-executive-header',
        name: 'MIGRATED: Mobile Executive Header (MC-030 Navigation)',
        component: MCMobileExecutiveHeader,
      },
      {
        id: 'migrated-mobile-navbar',
        name: 'MIGRATED: Mobile Navigation Bar (MC-030 Bottom Nav)',
        component: MCMobileNavBar,
      },
      {
        id: 'migrated-mobile-business-symphony',
        name: 'MIGRATED: Business Symphony Card (MC-030 Dashboard)',
        component: MCBusinessSymphony,
      },
      {
        id: 'migrated-mobile-strategic-command',
        name: 'MIGRATED: Strategic Command Card (MC-030 Dashboard)',
        component: MCStrategicCommand,
      },
      {
        id: 'migrated-mobile-liberation-orchestra',
        name: 'MIGRATED: Liberation Orchestra Card (MC-030 Dashboard)',
        component: MCLiberationOrchestra,
      },
      {
        id: 'migrated-mobile-intelligence-briefing',
        name: 'MIGRATED: Intelligence Briefing Card (MC-030 Dashboard)',
        component: MCIntelligenceBriefing,
      },
      {
        id: 'migrated-mobile-dashboard-demo',
        name: 'MIGRATED: Complete Mobile Dashboard Demo (MC-030 All Cards)',
        component: MCMobileDashboardDemo,
      },
    ],
    'Phase 4 - Order Management Migration': [
      {
        id: 'migrated-order-management-demo',
        name: 'MIGRATED: Complete Order Management Demo (MC-020 Full Interface)',
        component: MCOrderManagementDemo,
      },
      {
        id: 'migrated-order-management',
        name: 'MIGRATED: Order Management Interface (MC-020 Core)',
        component: MCOrderManagement,
      },
      {
        id: 'migrated-order-card-demo',
        name: 'MIGRATED: Order Card Demo (MC-020 Single Card)',
        component: MCOrderCardDemo,
      },
      {
        id: 'migrated-order-card',
        name: 'MIGRATED: Swipeable Order Card (MC-020 Component)',
        component: MCOrderCard,
      },
      {
        id: 'migrated-order-header',
        name: 'MIGRATED: Order Header with Search & Filters (MC-020 Header)',
        component: MCOrderHeader,
      },
      {
        id: 'migrated-order-filters',
        name: 'MIGRATED: Order Filter System (MC-020 Filters)',
        component: MCOrderFilters,
      },
    ],
  },
  'Atomic Components': {
    Organisms: [
      { id: 'navigation-header', name: 'Navigation Header', component: NCNavigationHeader },
      { id: 'destructive-modal', name: 'Destructive Modal', component: UXDestructiveModal },
      { id: 'feedback-widget', name: 'Feedback Widget Demo', component: UXFeedbackWidgetDemo },
      { id: 'onboarding-tour', name: 'Onboarding Tour Demo', component: UXOnboardingTourDemo },
      { id: 'standard-modal', name: 'Standard Modal', component: UXStandardModal },
      { id: 'toast-notifications', name: 'Toast Notifications Demo', component: UXToastNotificationsDemo },
      { id: 'strategic-command', name: 'Strategic Command', component: SCStrategicCommand },
      { id: 'admin-sidebar', name: 'Admin Sidebar', component: SBAdminSidebar },
      { id: 'automation-orchestra', name: 'Automation Orchestra', component: ALAutomationOrchestra },
      { id: 'billing-overview', name: 'Billing Overview Demo', component: AMBillingOverviewDemo },
      { id: 'billing-history', name: 'Billing History Demo', component: AMBillingHistoryDemo },
      { id: 'payment-methods', name: 'Payment Methods Demo', component: AMPaymentMethodsDemo },
      { id: 'security-settings', name: 'Security Settings Demo', component: AMSecuritySettingsDemo },
      { id: 'order-table', name: 'Order Table Demo', component: DAOrderTableDemo },
      { id: 'executive-intelligence', name: 'Executive Intelligence', component: BIExecutiveIntelligence },
      { id: 'strategic-insights', name: 'Strategic Insights Demo', component: BIStrategicInsightsDemo },
      { id: 'flow-visualization', name: 'Flow Visualization Demo', component: OMFlowVisualizationDemo },
    ],
  },
  'Dashboard Command Center': {
    'DC Series': [
      { id: 'dc010-dashboard', name: 'DC-010: SHM Dashboard', component: DC010ShmDashboard },
      { id: 'dc020-dashboard', name: 'DC-020: SHM Dashboard V2', component: DC020ShmDashboardV2 },
      { id: 'dc030-dashboard', name: 'DC-030: SHM Dashboard V3', component: DC030ShmDashboardV3 },
      { id: 'dc040-dashboard', name: 'DC-040: SHM Dashboard V4', component: DC040ShmDashboardV4 },
      { id: 'dc050-dashboard', name: 'DC-050: SHM Dashboard V5', component: DC050ShmDashboardV5 },
      { id: 'dc060-dashboard', name: 'DC-060: SHM Dashboard V6', component: DC060ShmDashboardV6 },
      { id: 'dc070-command-center', name: 'DC-070: Command Center', component: DC070CommandCenter },
      { id: 'dc080-enhanced-ccc-v1', name: 'DC-080: Enhanced CCC V1', component: DC080EnhancedCccV1 },
      { id: 'dc090-enhanced-ccc-v4', name: 'DC-090: Enhanced CCC V4', component: DC090EnhancedCccV4 },
      { id: 'dc100-enhanced-ccc-v5', name: 'DC-100: Enhanced CCC V5', component: DC100EnhancedCccV5 },
      { id: 'dc110-enhanced-ccc-v6', name: 'DC-110: Enhanced CCC V6', component: DC110EnhancedCccV6 },
      { id: 'dc120-enhanced-ccc-v4-alt', name: 'DC-120: Enhanced CCC V4 Alt', component: DC120EnhancedCccV4Alt },
      { id: 'dc130-enhanced-ccc-v5-alt', name: 'DC-130: Enhanced CCC V5 Alt', component: DC130EnhancedCccV5Alt },
    ],
  },
  'Mobile Command Center': {
    'MC Series': [
      { id: 'mc010-dashboard', name: 'MC-010: Mobile Dashboard', component: MC010Dashboard },
      { id: 'mc020-order', name: 'MC-020: Mobile Order Symphony', component: MC020Order },
      { id: 'mc030-navbar', name: 'MC-030: Mobile Navigation', component: MC030Navbar },
    ],
  },
  'Navigation Command': {
    'NC Series': [
      { id: 'nc020-sidebar', name: 'NC-020: Desktop Sidebar', component: NC020Sidebar },
      { id: 'nc030-header', name: 'NC-030: Executive Header', component: NC030ExecutiveHeader },
    ],
  },
  'Security Components': {
    'SC Series': [{ id: 'sc010-security', name: 'SC-010: Security Card', component: SC010SecurityCard }],
  },
  'Profile Management': {
    'PM Series': [{ id: 'pm010-profile', name: 'PM-010: User Profile', component: PM010UserProfile }],
  },
  'Settings & Utilities': {
    'SU Series': [
      { id: 'su010-404', name: 'SU-010: 404 Not Found', component: SU010NotFound },
      { id: 'su020-cookie', name: 'SU-020: Cookie Policy', component: SU020CookiePolicy },
      { id: 'su030-theme', name: 'SU-030: Theme Switcher', component: SU030ThemeSwitcher },
    ],
  },
  'Content & Privacy': {
    'CP Series': [
      { id: 'cp010-hero', name: 'CP-010: Hero Section', component: CP010Hero },
      { id: 'cp020-missions', name: 'CP-020: Open Missions', component: CP020OpenMissions },
    ],
  },
  'Legal Components': {
    'LP Series': [{ id: 'lp010-legal', name: 'LP-010: Legal Page', component: LP010Legal }],
  },
  'Blog Page Components': {
    'BP Series': [
      { id: 'bp-complete-hub', name: 'BP: Complete Content Hub', component: BPCompleteContentHub },
      { id: 'bp-toolbar', name: 'BP: Content Hub Toolbar', component: BPContentHubToolbar },
      { id: 'bp-post-card', name: 'BP: Post Card', component: BPPostCard },
    ],
  },
  'Article Components': {
    'AC Series - Foundation': [
      { id: 'ac-article-hero', name: 'AC: Article Hero', component: ACArticleHero },
      { id: 'ac-callout', name: 'AC: Callout', component: ACCallout },
      { id: 'ac-data-table', name: 'AC: Data Table', component: ACDataTable },
      { id: 'ac-key-takeaways', name: 'AC: Key Takeaways', component: ACKeyTakeawaysComponent },
      { id: 'ac-table-of-contents', name: 'AC: Table of Contents', component: ACTableOfContents },
    ],
    'AC Series - Batch 1': [
      { id: 'ac-author-briefing', name: 'AC: Author Briefing', component: ACAuthorBriefing },
      { id: 'ac-callout-advanced', name: 'AC: Advanced Callout', component: ACCalloutAdvanced },
      { id: 'ac-command-list', name: 'AC: Command List', component: ACCommandList },
      { id: 'ac-explore-further', name: 'AC: Explore Further', component: ACExploreFurther },
      { id: 'ac-share-dossier', name: 'AC: Share Dossier', component: ACShareDossier },
    ],
    'AC Series - Batch 2': [
      { id: 'ac-faq-accordion', name: 'AC: FAQ Accordion', component: ACFAQAccordion },
      { id: 'ac-milestone-celebration', name: 'AC: Milestone Celebration', component: ACMilestoneCelebration },
      { id: 'ac-profit-command', name: 'AC: Profit Command Dashboard', component: ACProfitCommandDashboard },
      { id: 'ac-summons-forge', name: 'AC: Summons to the Forge', component: ACSummonsToTheForge },
      { id: 'ac-testimonial-block', name: 'AC: Testimonial Block', component: ACTestimonialBlock },
      { id: 'ac-tiktok-metrics', name: 'AC: TikTok Metrics', component: ACTikTokMetrics },
    ],
  },
};

const UnifiedComponentBrowser: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Migrated Components');
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
  const [isGridView, setIsGridView] = useState<boolean>(true);

  // Auto-select first series when category changes
  useEffect(() => {
    const firstSeries = Object.keys(componentCategories[selectedCategory] || {})[0];
    setSelectedSeries(firstSeries);
    setSelectedComponent(null);
  }, [selectedCategory]);

  // Auto-select first component when series changes
  useEffect(() => {
    if (selectedSeries && componentCategories[selectedCategory]?.[selectedSeries]) {
      const firstComponent = componentCategories[selectedCategory][selectedSeries][0];
      setSelectedComponent(firstComponent);
    }
  }, [selectedSeries, selectedCategory]);

  const currentComponents = componentCategories[selectedCategory]?.[selectedSeries] || [];

  const goToPrevious = () => {
    if (!selectedComponent) return;
    const currentIndex = currentComponents.findIndex((comp) => comp.id === selectedComponent.id);
    if (currentIndex > 0) {
      setSelectedComponent(currentComponents[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (!selectedComponent) return;
    const currentIndex = currentComponents.findIndex((comp) => comp.id === selectedComponent.id);
    if (currentIndex < currentComponents.length - 1) {
      setSelectedComponent(currentComponents[currentIndex + 1]);
    }
  };

  const resetView = () => {
    setSelectedCategory('Migrated Components');
    setSelectedSeries('Phase 1 - Streamlined Migration');
    setSelectedComponent(null);
  };

  const renderComponentDisplay = () => {
    if (!selectedComponent) {
      return (
        <div className='flex h-full items-center justify-center text-muted-foreground'>
          Select a component to preview
        </div>
      );
    }

    const Component = selectedComponent.component;
    return (
      <div className='h-full w-full overflow-auto'>
        <Component />
      </div>
    );
  };

  const renderComponentGrid = () => {
    return (
      <div className='grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {currentComponents.map((component) => (
          <motion.div
            key={component.id}
            className='group relative cursor-pointer overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md'
            onClick={() => setSelectedComponent(component)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className='aspect-video w-full overflow-hidden bg-muted/30'>
              <div className='h-full w-full origin-top-left scale-50 transform'>
                <div className='h-[200%] w-[200%]'>
                  <component.component />
                </div>
              </div>
            </div>
            <div className='p-3'>
              <h3 className='font-medium text-foreground'>{component.name}</h3>
              <p className='text-xs text-muted-foreground'>ID: {component.id}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderComponentList = () => {
    return (
      <div className='space-y-2'>
        {currentComponents.map((component) => (
          <motion.div
            key={component.id}
            className={`cursor-pointer rounded-lg border p-3 transition-all hover:shadow-sm ${
              selectedComponent?.id === component.id ? 'border-primary bg-primary/5' : 'bg-background'
            }`}
            onClick={() => setSelectedComponent(component)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <h3 className='font-medium text-foreground'>{component.name}</h3>
            <p className='text-xs text-muted-foreground'>ID: {component.id}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className='flex h-screen flex-col bg-background'>
      {/* Header */}
      <div className='border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' onClick={resetView}>
              <Home className='h-4 w-4' />
            </Button>
            <h1 className='text-lg font-semibold'>Component Browser</h1>
            <Button variant='outline' size='sm' onClick={() => setIsGridView(!isGridView)}>
              {isGridView ? <List className='h-4 w-4' /> : <Grid3X3 className='h-4 w-4' />}
            </Button>
          </div>

          <div className='flex items-center gap-2'>
            {selectedComponent && (
              <>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={goToPrevious}
                  disabled={currentComponents.indexOf(selectedComponent) === 0}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={goToNext}
                  disabled={currentComponents.indexOf(selectedComponent) === currentComponents.length - 1}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
                <Button variant='outline' size='sm' onClick={() => setSelectedComponent(null)}>
                  <RotateCcw className='h-4 w-4' />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className='w-[200px]'>
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

          <Select value={selectedSeries} onValueChange={setSelectedSeries}>
            <SelectTrigger className='w-[250px]'>
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
      </div>

      {/* Main Content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <div className='w-96 border-r bg-muted/30 p-4'>
          <div className='h-full overflow-auto'>
            <h2 className='mb-3 font-medium text-foreground'>
              {selectedSeries} ({currentComponents.length})
            </h2>
            {isGridView ? renderComponentGrid() : renderComponentList()}
          </div>
        </div>

        {/* Preview Area */}
        <div className='flex-1 overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedComponent?.id || 'empty'}
              className='h-full w-full'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderComponentDisplay()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UnifiedComponentBrowser;
