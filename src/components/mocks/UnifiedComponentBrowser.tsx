/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid3X3, Home, List, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { GlobalThemeToggle } from '@/components/ui/theme-toggle';

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
import NC010Header from './NC-010-Header';
import NC020Sidebar from './NC-020-Sidebar';
import NC030ExecutiveHeader from './NC-030-ExecutiveHeader';
// Order Management Components (OM-)
import OM010SystemStats from './OM-010-SystemStats';
import OM020FlowVisualization from './OM-020-FlowVisualization';
import OM030SubNavbar from './OM-030-SubNavbar';
// Business Intelligence Components (BI-)
import BI010StrategicInsights from './BI-010-StrategicInsights';
import BI020BusinessSymphony from './BI-020-BusinessSymphony';
import BI030StrategicCommand from './BI-030-StrategicCommand';
import BI040LiberationOrchestra from './BI-040-LiberationOrchestra';
import BI050IntelBriefing from './BI-050-IntelBriefing';
// User Experience Components (UX-)
import UX010Modals from './UX-010-Modals';
import UX020OnboardingTour from './UX-020-OnboardingTour';
import UX030FeedbackWidget from './UX-030-FeedbackWidget';
import UX040ToastNotifications from './UX-040-ToastNotifications';
// Account Management Components (AM-)
import AM010BillingOverview from './AM-010-BillingOverview';
import AM020BillingHistory from './AM-020-BillingHistory';
import AM030PaymentMethod from './AM-030-PaymentMethod';
import AM040EmailNotifications from './AM-040-EmailNotifications';
// Inventory Management Components (IM-)
import IM010CriticalStock from './IM-010-CriticalStock';
import IM020ManagementFocus from './IM-020-ManagementFocus';
// Data & Analytics Components (DA-)
import DA010OrderTable from './DA-010-OrderTable';
// Profile Management Components (PM-)
import PM010UserProfile from './PM-010-UserProfile';
// Security & Compliance Components (SC-)
import SC010SecurityCard from './SC-010-SecurityCard';
import SC010StrategicCommandCenter from './SC-010-StrategicCommandCenter';
// Sidebar Components (SB-)
import SB010AdminSidebar from './SB-010-AdminSidebar';
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
import SCStrategicCommand from '../atomic/organisms/SC-StrategicCommand';
import SBAdminSidebar from '../atomic/organisms/SB-AdminSidebar';
import ALAutomationOrchestra from '../atomic/organisms/AL-AutomationOrchestra';
import BIExecutiveIntelligence from '../atomic/organisms/BI-ExecutiveIntelligence';

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
    // O Series renamed to OM Series
    // All D-series components have been renamed to DC-series
  },
  'Mobile Components': {
    'MC Series': [
      { id: 'mc010', name: 'MC-010: Dashboard', component: MC010Dashboard },
      { id: 'mc020', name: 'MC-020: Order', component: MC020Order },
      { id: 'mc030', name: 'MC-030: Navbar', component: MC030Navbar },
    ],
  },
  'Legacy Components': {
    'I Series': [
      { id: 'i1', name: 'I1: Inventory Management', component: IM020ManagementFocus },
      { id: 'i3', name: 'I3: Critical Stock Card', component: IM010CriticalStock },
    ],
    'M Series': [
      { id: 'm1', name: 'M1: Executive Header', component: NC030ExecutiveHeader },
      { id: 'm2', name: 'M2: Business Symphony', component: BI020BusinessSymphony },
      { id: 'm3', name: 'M3: Strategic Command', component: BI030StrategicCommand },
      { id: 'm4', name: 'M4: Liberation Orchestra', component: BI040LiberationOrchestra },
      { id: 'm5', name: 'M5: Intel Briefing', component: BI050IntelBriefing },
      { id: 'm6', name: 'M6: Mobile Navbar', component: MC030Navbar },
    ],
  },
  'Desktop Components': {
    'Dx Series': [
      { id: 'dx2', name: 'DX2: Desktop Header', component: NC010Header },
      { id: 'dx3', name: 'DX3: Toast Notifications', component: UX040ToastNotifications },
      { id: 'dx4', name: 'DX4: Desktop Sidebar', component: NC020Sidebar },
      { id: 'dx5', name: 'DX5: Desktop Modals', component: UX010Modals },
      { id: 'dx6', name: 'DX6: Onboarding Tour', component: UX020OnboardingTour },
      { id: 'dx7', name: 'DX7: Feedback Widget', component: UX030FeedbackWidget },
      { id: 'dx8', name: 'DX8: Mobile Order', component: MC020Order },
      { id: 'dx9', name: 'DX9: Order Table', component: DA010OrderTable },
      { id: 'dx10', name: 'DX10: Command Center', component: DC070CommandCenter },
      { id: 'dx11', name: 'DX11: Order Flow', component: OM020FlowVisualization },
      { id: 'dx12', name: 'DX12: Strategic Insights', component: BI010StrategicInsights },
      { id: 'dx13', name: 'DX13: User Profile', component: PM010UserProfile },
      { id: 'dx14', name: 'DX14: Security Card', component: SC010SecurityCard },
      { id: 'dx15', name: 'DX15: Email Notifications', component: AM040EmailNotifications },
      { id: 'dx16', name: 'DX16: Billing Overview', component: AM010BillingOverview },
      { id: 'dx17', name: 'DX17: Billing History', component: AM020BillingHistory },
      { id: 'dx18', name: 'DX18: Payment Method', component: AM030PaymentMethod },
    ],
  },
  'Public Pages': {
    'HP Series': [
      { id: 'hp010', name: 'HP010: Header', component: HP010Header },
      { id: 'hp010hero', name: 'HP010: Header Hero', component: HP010HeaderHero },
      { id: 'hp010variant', name: 'HP010: Header Variant', component: HP010HeaderVariant },
      { id: 'hp020', name: 'HP020: Hero', component: HP020Hero },
      { id: 'hp030', name: 'HP030: Benefits Reel Showcase', component: HP030BenefitsReelShowcase },
      { id: 'hp040', name: 'HP040: Manifesto', component: HP040Manifesto },
      { id: 'hp050', name: 'HP050: Interactive Showcase', component: HP050InteractiveShowcase },
      { id: 'hp060', name: 'HP060: Testimonials', component: HP060Testimonials },
      { id: 'hp070', name: 'HP070: Pricing Tiers', component: HP070PricingTiers },
      { id: 'hp080', name: 'HP080: Final CTA Variant', component: HP080FinalCTAVariant },
      { id: 'hp090', name: 'HP090: Footer', component: HP090Footer },
    ],
    'AP Series': [
      { id: 'ap010', name: 'AP010: Hero', component: AP010Hero },
      { id: 'ap020', name: 'AP020: Our Mission', component: AP020OurMission },
      { id: 'ap030', name: 'AP030: The Team', component: AP030TheTeam },
    ],
    'CP Series': [
      { id: 'cp010', name: 'CP010: Hero', component: CP010Hero },
      { id: 'cp020', name: 'CP020: Open Missions', component: CP020OpenMissions },
    ],
    'LP Series': [{ id: 'lp010', name: 'LP010: Legal', component: LP010Legal }],
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
            <GlobalThemeToggle />
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
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  const firstSeries = Object.keys(componentCategories[e.target.value] || {})[0];
                  if (firstSeries) setSelectedSeries(firstSeries);
                }}
                className='w-full rounded border border-border bg-background p-2 text-sm text-foreground'
              >
                {Object.keys(componentCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Series Selection */}
            <div className='mb-4'>
              <label className='mb-2 block text-xs font-medium text-muted-foreground'>Series</label>
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className='w-full rounded border border-border bg-background p-2 text-sm text-foreground'
              >
                {Object.keys(componentCategories[selectedCategory] || {}).map((series) => (
                  <option key={series} value={series}>
                    {series}
                  </option>
                ))}
              </select>
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
