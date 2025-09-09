/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid3X3, Home, List, RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import DesktopHeaderDemo from './02DesktopHeaderDemo';
import DesktopToastNotifications from './03DesktopToastNotifications';
import DesktopSidebarDemo from './04DesktopSidebarDemo';
import DesktopModals from './05DesktopModals';
import DesktopOnboardingTourDemo from './06DesktopOnboardingTour.demo';
import DesktopFeedbackWidget from './07DesktopFeedbackWidget';
import MobileOrder from './08MobileOrder';
import DesktopOrderTableComponent from './09DesktopOrderTableComponent';
import DesktopDashboardCommandCenter from './10DesktopDashboardCommandCenter';
import DesktopOrderFlowVisualisation from './11DesktopOrderFlowVisualisation';
import DesktopStrategicInsights from './12DesktopStrategicInsights';
import DesktopUserProfileCard from './13DesktopUserProfileCard';
import DesktopSecurityCard from './14DesktopSecurityCard';
import DesktopEmailNotificationsCard from './15DesktopEmailNotificationsCard';
import DesktopBillinqOverview from './16DesktopBillinqOverview';
import DesktopBillingHistory from './17DesktopBillingHistory';
import DesktopPaymentMethod from './18DesktopPaymentMethod';
// Import all series components
import A1ShmDashboard from './A1ShmDashboard';
import A2ShmDashboard from './A2ShmDashboard';
import A3ShmDashboard from './A3ShmDashboard';
import A4ShmDashboard from './A4ShmDashboard';
import A5ShmDashboard from './A5ShmDashboard';
import A6ShmDashboard from './A6ShmDashboard';
import D1D3EnhancedDesctopCcc768px from './D1D3EnhancedDesctopCcc-768px';
import D4EnhancedDesctopCcc768px from './D4EnhancedDesctopCcc-768px';
import D5EnhancedDesctopCcc768px from './D5EnhancedDesctopCcc-768px';
import D6EnhancedDesctopCcc768px from './D6EnhancedDesctopCcc-768px';
import FP020OrderManagement from './FP-020-OrderManagement';
import FP030DigitalTwinCommand from './FP-030-DigitalTwinCommand';
import FP040LogisticsCoPilot from './FP-040-LogisticsCoPilot';
import FP050DataPrism from './FP-050-DataPrism';
import I1I5InventoryManagementFocusComponents from './I1I5InventoryManagementFocusComponents';
import I3CriticalStockCard from './I3CriticalStockCard';
import M1ExecutiveHeader from './M1ExecutiveHeader';
import M2BusinessSimphonyCard from './M2BusinessSimphonyCard';
import M3StrategicCommandCard from './M3StrategicCommandCard';
import M4LiberationOrchestraCard from './M4LiberationOrchestraCard';
import M5IntelBriefingCard from './M5IntelBriefingCard';
import M6MobileNavbar from './M6MobileNavbar';
import O2OrderSystemStatsCard from './O2OrderSystemStatsCard';
import O5OrderSubNavbar from './O5OrderSubNavbar';
// Import Component-prefixed files
import Component01mobileDashboard from './Component01mobileDashboard';
import Component02desktopHeaderDemo from './Component02desktopHeaderDemo';
import Component03desktopToastNotifications from './Component03desktopToastNotifications';
import Component04desktopSidebarDemo from './Component04desktopSidebarDemo';
import Component05desktopModals from './Component05desktopModals';
import Component06desktopOnboardingTourDemo from './Component06desktopOnboardingTour.demo';
import Component07desktopFeedbackWidget from './Component07desktopFeedbackWidget';
import Component08mobileOrder from './Component08mobileOrder';
import Component09desktopOrderTableComponent from './Component09desktopOrderTableComponent';
import Component10desktopDashboardCommandCenter from './Component10desktopDashboardCommandCenter';
import Component11desktopOrderFlowVisualisation from './Component11desktopOrderFlowVisualisation';
import Component12desktopStrategicInsights from './Component12desktopStrategicInsights';
import Component13desktopUserProfileCard from './Component13desktopUserProfileCard';
import Component14desktopSecurityCard from './Component14desktopSecurityCard';
import Component15desktopEmailNotificationsCard from './Component15desktopEmailNotificationsCard';
import Component16desktopBillinqOverview from './Component16desktopBillinqOverview';
import Component17desktopBillingHistory from './Component17desktopBillingHistory';
import Component18desktopPaymentMethod from './Component18desktopPaymentMethod';
import HP010Header from './HP-010-Header';
import HP010HeaderHero from './HP-010-Header-Hero';
import HP010HeaderVariant from './HP-010-Header-Variant';
import HP020Hero from './HP-020-Hero';
import HP030BenefitsReelShowcase from './HP-030-BenefitsReel-Showcase';
import HP040Manifesto from './HP-040-Manifesto';

const componentCategories = {
  'Dashboard Components': {
    'A Series': [
      { id: 'a1', name: 'A1: SHM Dashboard', component: A1ShmDashboard },
      { id: 'a2', name: 'A2: SHM Dashboard', component: A2ShmDashboard },
      { id: 'a3', name: 'A3: SHM Dashboard', component: A3ShmDashboard },
      { id: 'a4', name: 'A4: SHM Dashboard', component: A4ShmDashboard },
      { id: 'a5', name: 'A5: SHM Dashboard', component: A5ShmDashboard },
      { id: 'a6', name: 'A6: SHM Dashboard', component: A6ShmDashboard },
    ],
    'O Series': [
      { id: 'o2', name: 'O2: Order System Stats', component: O2OrderSystemStatsCard },
      { id: 'o5', name: 'O5: Order Sub Navbar', component: O5OrderSubNavbar },
    ],
    'D Series': [
      { id: 'd1', name: 'D1: Enhanced Desktop CCC', component: D1D3EnhancedDesctopCcc768px },
      { id: 'd4', name: 'D4: Enhanced Desktop CCC', component: D4EnhancedDesctopCcc768px },
      { id: 'd5', name: 'D5: Enhanced Desktop CCC', component: D5EnhancedDesctopCcc768px },
      { id: 'd6', name: 'D6: Enhanced Desktop CCC', component: D6EnhancedDesctopCcc768px },
    ],
    'I Series': [
      { id: 'i1', name: 'I1: Inventory Management', component: I1I5InventoryManagementFocusComponents },
      { id: 'i3', name: 'I3: Critical Stock Card', component: I3CriticalStockCard },
    ],
    'M Series': [
      { id: 'm1', name: 'M1: Executive Header', component: M1ExecutiveHeader },
      { id: 'm2', name: 'M2: Business Symphony', component: M2BusinessSimphonyCard },
      { id: 'm3', name: 'M3: Strategic Command', component: M3StrategicCommandCard },
      { id: 'm4', name: 'M4: Liberation Orchestra', component: M4LiberationOrchestraCard },
      { id: 'm5', name: 'M5: Intel Briefing', component: M5IntelBriefingCard },
      { id: 'm6', name: 'M6: Mobile Navbar', component: M6MobileNavbar },
    ],
  },
  'Desktop Components': {
    'Dx Series': [
      { id: 'dx2', name: 'DX2: Desktop Header', component: DesktopHeaderDemo },
      { id: 'dx3', name: 'DX3: Toast Notifications', component: DesktopToastNotifications },
      { id: 'dx4', name: 'DX4: Desktop Sidebar', component: DesktopSidebarDemo },
      { id: 'dx5', name: 'DX5: Desktop Modals', component: DesktopModals },
      { id: 'dx6', name: 'DX6: Onboarding Tour', component: DesktopOnboardingTourDemo },
      { id: 'dx7', name: 'DX7: Feedback Widget', component: DesktopFeedbackWidget },
      { id: 'dx8', name: 'DX8: Mobile Order', component: MobileOrder },
      { id: 'dx9', name: 'DX9: Order Table', component: DesktopOrderTableComponent },
      { id: 'dx10', name: 'DX10: Command Center', component: DesktopDashboardCommandCenter },
      { id: 'dx11', name: 'DX11: Order Flow', component: DesktopOrderFlowVisualisation },
      { id: 'dx12', name: 'DX12: Strategic Insights', component: DesktopStrategicInsights },
      { id: 'dx13', name: 'DX13: User Profile', component: DesktopUserProfileCard },
      { id: 'dx14', name: 'DX14: Security Card', component: DesktopSecurityCard },
      { id: 'dx15', name: 'DX15: Email Notifications', component: DesktopEmailNotificationsCard },
      { id: 'dx16', name: 'DX16: Billing Overview', component: DesktopBillinqOverview },
      { id: 'dx17', name: 'DX17: Billing History', component: DesktopBillingHistory },
      { id: 'dx18', name: 'DX18: Payment Method', component: DesktopPaymentMethod },
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
    ],
    'FP Series': [
      { id: 'fp020', name: 'FP020: Order Management', component: FP020OrderManagement },
      { id: 'fp030', name: 'FP030: Digital Twin Command', component: FP030DigitalTwinCommand },
      { id: 'fp040', name: 'FP040: Logistics CoPilot', component: FP040LogisticsCoPilot },
      { id: 'fp050', name: 'FP050: Data Prism', component: FP050DataPrism },
    ],
  },
  'Component Series': {
    'Component Series': [
      { id: 'c01', name: 'C01: Mobile Dashboard', component: Component01mobileDashboard },
      { id: 'c02', name: 'C02: Desktop Header Demo', component: Component02desktopHeaderDemo },
      { id: 'c03', name: 'C03: Toast Notifications', component: Component03desktopToastNotifications },
      { id: 'c04', name: 'C04: Desktop Sidebar Demo', component: Component04desktopSidebarDemo },
      { id: 'c05', name: 'C05: Desktop Modals', component: Component05desktopModals },
      { id: 'c06', name: 'C06: Onboarding Tour Demo', component: Component06desktopOnboardingTourDemo },
      { id: 'c07', name: 'C07: Feedback Widget', component: Component07desktopFeedbackWidget },
      { id: 'c08', name: 'C08: Mobile Order', component: Component08mobileOrder },
      { id: 'c09', name: 'C09: Order Table Component', component: Component09desktopOrderTableComponent },
      { id: 'c10', name: 'C10: Dashboard Command Center', component: Component10desktopDashboardCommandCenter },
      { id: 'c11', name: 'C11: Order Flow Visualisation', component: Component11desktopOrderFlowVisualisation },
      { id: 'c12', name: 'C12: Strategic Insights', component: Component12desktopStrategicInsights },
      { id: 'c13', name: 'C13: User Profile Card', component: Component13desktopUserProfileCard },
      { id: 'c14', name: 'C14: Security Card', component: Component14desktopSecurityCard },
      { id: 'c15', name: 'C15: Email Notifications Card', component: Component15desktopEmailNotificationsCard },
      { id: 'c16', name: 'C16: Billing Overview', component: Component16desktopBillinqOverview },
      { id: 'c17', name: 'C17: Billing History', component: Component17desktopBillingHistory },
      { id: 'c18', name: 'C18: Payment Method', component: Component18desktopPaymentMethod },
    ],
  },
};

// Flatten all components for navigation
const allComponents = Object.values(componentCategories)
  .flatMap((category) => Object.values(category))
  .flat();

interface UnifiedComponentBrowserProps {
  initialComponent?: string;
}

export default function UnifiedComponentBrowser({ initialComponent = 'a1' }: UnifiedComponentBrowserProps) {
  const initialIndex = allComponents.findIndex((c) => c.id === initialComponent);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Dashboard Components');
  const [selectedSeries, setSelectedSeries] = useState<string>('A Series');
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
