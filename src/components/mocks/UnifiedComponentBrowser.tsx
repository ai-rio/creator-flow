'use client';

import { AnimatePresence,motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid3X3, Home, List,RotateCcw } from 'lucide-react';
import React, { useEffect,useState } from 'react';

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
    'FP Series': [
      { id: 'fp020', name: 'FP020: Order Management', component: FP020OrderManagement },
      { id: 'fp030', name: 'FP030: Digital Twin Command', component: FP030DigitalTwinCommand },
      { id: 'fp040', name: 'FP040: Logistics CoPilot', component: FP040LogisticsCoPilot },
      { id: 'fp050', name: 'FP050: Data Prism', component: FP050DataPrism },
    ],
  },
};

// Flatten all components for navigation
const allComponents = Object.values(componentCategories)
  .flatMap(category => Object.values(category))
  .flat();

interface UnifiedComponentBrowserProps {
  initialComponent?: string;
}

export default function UnifiedComponentBrowser({ initialComponent = 'a1' }: UnifiedComponentBrowserProps) {
  const [currentIndex, setCurrentIndex] = useState(
    allComponents.findIndex(c => c.id === initialComponent) || 0
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('Dashboard Components');
  const [selectedSeries, setSelectedSeries] = useState<string>('A Series');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const currentComponent = allComponents[currentIndex];
  const CurrentComponent = currentComponent.component;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => prev > 0 ? prev - 1 : allComponents.length - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => prev < allComponents.length - 1 ? prev + 1 : 0);
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

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Unified Navigation Panel */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4 w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Component Browser</h3>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.href = '/en'}
              className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
              title="Back to Home (ESC)"
            >
              <Home className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              title="Reload Component"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-1 text-purple-600 hover:bg-purple-50 rounded"
              title="Toggle View Mode"
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSeries(Object.keys(componentCategories[e.target.value as keyof typeof componentCategories])[0]);
            }}
            className="w-full p-2 border rounded text-sm"
          >
            {Object.keys(componentCategories).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Series Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Series</label>
          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          >
            {Object.keys(componentCategories[selectedCategory as keyof typeof componentCategories]).map(series => (
              <option key={series} value={series}>{series}</option>
            ))}
          </select>
        </div>

        {/* Component List */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Components</label>
            <span className="text-xs text-gray-500">
              {getComponentsByCategory(selectedCategory, selectedSeries).length} items
            </span>
          </div>
          
          {viewMode === 'list' ? (
            <div className="space-y-1">
              {getComponentsByCategory(selectedCategory, selectedSeries).map((comp: any) => {
                const globalIndex = allComponents.findIndex(c => c.id === comp.id);
                return (
                  <button
                    key={comp.id}
                    onClick={() => navigateToComponent(globalIndex)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      globalIndex === currentIndex
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {comp.name}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {getComponentsByCategory(selectedCategory, selectedSeries).map((comp: any) => {
                const globalIndex = allComponents.findIndex(c => c.id === comp.id);
                return (
                  <button
                    key={comp.id}
                    onClick={() => navigateToComponent(globalIndex)}
                    className={`p-3 rounded text-xs transition-colors text-center ${
                      globalIndex === currentIndex
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'hover:bg-gray-100 text-gray-700 border border-gray-200'
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
        <div className="flex justify-between items-center pt-3 border-t">
          <button
            onClick={() => navigateToComponent(currentIndex > 0 ? currentIndex - 1 : allComponents.length - 1)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {allComponents.length}
          </span>
          
          <button
            onClick={() => navigateToComponent(currentIndex < allComponents.length - 1 ? currentIndex + 1 : 0)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Current Component Info */}
        <div className="mt-3 pt-3 border-t">
          <div className="text-sm text-gray-600">
            <div className="font-medium">{currentComponent.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {selectedCategory} → {selectedSeries}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
          <div>← → Navigate | ESC Home</div>
          <div className="mt-1">
            <span className="text-yellow-600">●</span> Back | 
            <span className="text-blue-600">●</span> Reload | 
            <span className="text-green-600">●</span> Nav | 
            <span className="text-purple-600">●</span> View
          </div>
        </div>
      </div>

      {/* Component Display */}
      <div className="">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentComponent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
