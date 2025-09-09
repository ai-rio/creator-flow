/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid3X3, Home, List, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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

const componentCategories = {
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
    'Utility Components': [
      { id: 'cookie-bar', name: 'Cookie Policy Bar', component: SU020CookiePolicy },
      { id: 'theme-switcher', name: 'Theme Switcher', component: SU030ThemeSwitcher },
      { id: 'gdpr', name: 'GDPR Data Sovereignty', component: SU040DataSovereignty },
      { id: '404', name: '404 Not Found', component: SU010NotFound },
    ],
    'FP Series': [
      { id: 'fp020', name: 'FP020: Order Management', component: FP020OrderManagement },
      { id: 'fp030', name: 'FP030: Digital Twin Command', component: FP030DigitalTwinCommand },
      { id: 'fp040', name: 'FP040: Logistics CoPilot', component: FP040LogisticsCoPilot },
      { id: 'fp050', name: 'FP050: Data Prism', component: FP050DataPrism },
    ],
  },
  'Blog Components': {
    'Blog Page Components': [
      { id: 'bp-hub', name: 'BP: Complete Content Hub', component: BPCompleteContentHub },
      { id: 'bp-toolbar', name: 'BP: Content Hub Toolbar', component: BPContentHubToolbar },
      { id: 'bp-card', name: 'BP: Post Card', component: BPPostCard },
    ],
    'Blog Post Components': [
      { id: 'ac-hero', name: 'AC: Article Hero', component: ACArticleHero },
      { id: 'ac-callout', name: 'AC: Callout', component: ACCallout },
      { id: 'ac-callout-advanced', name: 'AC: Callout Advanced', component: ACCalloutAdvanced },
      { id: 'ac-datatable', name: 'AC: Data Table', component: ACDataTable },
      { id: 'ac-keytakeaways', name: 'AC: Key Takeaways', component: ACKeyTakeawaysComponent },
      { id: 'ac-toc', name: 'AC: Table of Contents', component: ACTableOfContents },
      { id: 'ac-faq', name: 'AC: FAQ Accordion', component: ACFAQAccordion },
      { id: 'ac-milestone', name: 'AC: Milestone Celebration', component: ACMilestoneCelebration },
      { id: 'ac-profit', name: 'AC: Profit Command Dashboard', component: ACProfitCommandDashboard },
      { id: 'ac-author', name: 'AC: Author Briefing', component: ACAuthorBriefing },
      { id: 'ac-command', name: 'AC: Command List', component: ACCommandList },
      { id: 'ac-explore', name: 'AC: Explore Further', component: ACExploreFurther },
      { id: 'ac-share', name: 'AC: Share Dossier', component: ACShareDossier },
      { id: 'ac-summons', name: 'AC: Summons to the Forge', component: ACSummonsToTheForge },
      { id: 'ac-testimonial', name: 'AC: Testimonial Block', component: ACTestimonialBlock },
      { id: 'ac-tiktok', name: 'AC: TikTok Metrics', component: ACTikTokMetrics },
    ],
  },
  // Component Series - REMOVED (duplicate files no longer exist)
  // These were duplicates of the numbered series components
};

// Flatten all components for navigation
const allComponents = Object.values(componentCategories)
  .flatMap((category) => Object.values(category))
  .flat();

interface UnifiedComponentBrowserProps {
  initialComponent?: string;
}

export default function UnifiedComponentBrowser({ initialComponent = 'dc010' }: UnifiedComponentBrowserProps) {
  const initialIndex = allComponents.findIndex((c) => c.id === initialComponent);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Dashboard Components');
  const [selectedSeries, setSelectedSeries] = useState<string>('DC Series');
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

  const getComponentsByCategory = (category: string, series?: string) => {
    if (series) {
      return (componentCategories as any)[category][series] || [];
    }
    return Object.values((componentCategories as any)[category]).flat();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
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

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div className='relative min-h-screen bg-gray-50'>
      {/* Unified Navigation Panel */}
      <div
        className={`fixed z-50 rounded-lg border-2 border-gray-300 bg-white shadow-xl transition-all duration-300 ${
          isCollapsed ? 'h-12 w-12' : 'max-h-[90vh] w-96'
        }`}
        style={{
          top: position.y || 16,
          right: position.x || 16,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {/* Drag Handle & Collapse Toggle */}
        <div
          className='flex cursor-grab items-center justify-between rounded-t-lg border-b border-gray-300 bg-gray-100 p-4 active:cursor-grabbing'
          onMouseDown={handleMouseDown}
        >
          {!isCollapsed && <h3 className='font-bold text-gray-900'>Component Browser</h3>}
          <div className='flex gap-2'>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className='rounded border border-gray-400 p-2 font-bold text-gray-800 hover:bg-gray-200'
              title={isCollapsed ? 'Expand Panel' : 'Collapse Panel'}
            >
              {isCollapsed ? '📋' : '➖'}
            </button>
            {!isCollapsed && (
              <>
                <button
                  onClick={() => (window.location.href = '/en')}
                  className='rounded border border-yellow-400 p-2 text-yellow-800 hover:bg-yellow-100'
                  title='Back to Home (ESC)'
                >
                  <Home className='h-4 w-4' />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className='rounded border border-blue-400 p-2 text-blue-800 hover:bg-blue-100'
                  title='Reload Component'
                >
                  <RotateCcw className='h-4 w-4' />
                </button>
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className='rounded border border-purple-400 p-2 text-purple-800 hover:bg-purple-100'
                  title='Toggle View Mode'
                >
                  {viewMode === 'grid' ? <List className='h-4 w-4' /> : <Grid3X3 className='h-4 w-4' />}
                </button>
              </>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div className='overflow-y-auto bg-white px-4 pb-4' style={{ maxHeight: 'calc(90vh - 80px)' }}>
            {/* Category Selection */}
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-900'>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSeries(
                    Object.keys(componentCategories[e.target.value as keyof typeof componentCategories])[0]
                  );
                }}
                className='w-full rounded border-2 border-gray-400 bg-white p-3 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
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
              <label className='mb-2 block text-sm font-bold text-gray-900'>Series</label>
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                className='w-full rounded border-2 border-gray-400 bg-white p-3 text-sm font-medium text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
              >
                {Object.keys(componentCategories[selectedCategory as keyof typeof componentCategories]).map(
                  (series) => (
                    <option key={series} value={series}>
                      {series}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Component List */}
            <div className='mb-4 space-y-2'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-bold text-gray-900'>Components</label>
                <span className='rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800'>
                  {getComponentsByCategory(selectedCategory, selectedSeries).length} items
                </span>
              </div>

              {viewMode === 'list' ? (
                <div className='space-y-1'>
                  {getComponentsByCategory(selectedCategory, selectedSeries).map((comp: any) => {
                    const globalIndex = allComponents.findIndex((c) => c.id === comp.id);
                    return (
                      <button
                        key={comp.id}
                        onClick={() => navigateToComponent(globalIndex)}
                        className={`w-full rounded-md border-2 p-3 text-left text-sm font-medium transition-colors ${
                          globalIndex === currentIndex
                            ? 'border-green-600 bg-green-200 text-green-900'
                            : 'border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {comp.name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className='grid grid-cols-2 gap-2'>
                  {getComponentsByCategory(selectedCategory, selectedSeries).map((comp: any) => {
                    const globalIndex = allComponents.findIndex((c) => c.id === comp.id);
                    return (
                      <button
                        key={comp.id}
                        onClick={() => navigateToComponent(globalIndex)}
                        className={`rounded-md border-2 p-3 text-center text-xs font-medium transition-colors ${
                          globalIndex === currentIndex
                            ? 'border-green-600 bg-green-200 text-green-900'
                            : 'border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {comp.name.split(':')[0]}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className='flex items-center justify-between border-t-2 border-gray-300 pt-3'>
              <button
                onClick={() => navigateToComponent(currentIndex > 0 ? currentIndex - 1 : allComponents.length - 1)}
                className='flex items-center gap-1 rounded-md border-2 border-green-600 px-4 py-2 text-sm font-bold text-green-800 hover:bg-green-100'
              >
                <ChevronLeft className='h-4 w-4' />
                Prev
              </button>

              <span className='rounded bg-gray-200 px-3 py-1 text-sm font-bold text-gray-900'>
                {currentIndex + 1} / {allComponents.length}
              </span>

              <button
                onClick={() => navigateToComponent(currentIndex < allComponents.length - 1 ? currentIndex + 1 : 0)}
                className='flex items-center gap-1 rounded-md border-2 border-green-600 px-4 py-2 text-sm font-bold text-green-800 hover:bg-green-100'
              >
                Next
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>

            {/* Current Component Info */}
            <div className='mt-3 border-t-2 border-gray-300 pt-3'>
              <div className='text-sm text-gray-900'>
                <div className='font-bold'>{currentComponent?.name || 'Unknown Component'}</div>
                <div className='mt-1 text-xs font-medium text-gray-800'>
                  {selectedCategory} → {selectedSeries}
                </div>
              </div>
            </div>

            <div className='mt-3 border-t-2 border-gray-300 pt-3 text-xs font-medium text-gray-900'>
              <div>← → Navigate | ESC Home | Drag to move</div>
              <div className='mt-1'>
                <span className='text-yellow-800'>●</span> Back |<span className='text-blue-800'>●</span> Reload |
                <span className='text-green-800'>●</span> Nav |<span className='text-purple-800'>●</span> View
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Component Display */}
      <div className=''>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentComponent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {CurrentComponent ? <CurrentComponent /> : <div>Component not found</div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
