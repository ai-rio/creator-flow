'use client';

import { AnimatePresence,motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';
import React, { useEffect,useState } from 'react';

// Import FP-Series components (Features Page)
import FP020OrderManagement from './FP-020-OrderManagement';
import FP030DigitalTwinCommand from './FP-030-DigitalTwinCommand';
import FP040LogisticsCoPilot from './FP-040-LogisticsCoPilot';
import FP050DataPrism from './FP-050-DataPrism';

const components = [
  { id: 'fp020', name: 'FP020: Order Management', component: FP020OrderManagement },
  { id: 'fp030', name: 'FP030: Digital Twin Command', component: FP030DigitalTwinCommand },
  { id: 'fp040', name: 'FP040: Logistics CoPilot', component: FP040LogisticsCoPilot },
  { id: 'fp050', name: 'FP050: Data Prism', component: FP050DataPrism },
];

interface FPSeriesProps {
  initialComponent?: string;
  mode?: 'browser' | 'individual';
}

export default function FPSeries({ initialComponent = 'fp020', mode = 'individual' }: FPSeriesProps) {
  const [currentIndex, setCurrentIndex] = useState(
    components.findIndex(c => c.id === initialComponent) || 0
  );

  const currentComponent = components[currentIndex];
  const CurrentComponent = currentComponent.component;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => prev > 0 ? prev - 1 : components.length - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => prev < components.length - 1 ? prev + 1 : 0);
      } else if (e.key === 'Escape') {
        window.location.href = '/en';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToComponent = (index: number) => {
    setCurrentIndex(index);
    if (mode === 'browser') {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('component', components[index].id);
      window.history.pushState({}, '', newUrl.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Navigation Panel */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4 w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">FP Series - Features Page</h3>
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
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {components.map((comp, index) => (
            <button
              key={comp.id}
              onClick={() => navigateToComponent(index)}
              className={`w-full text-left p-2 rounded text-sm transition-colors ${
                index === currentIndex
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {comp.name}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t">
          <button
            onClick={() => navigateToComponent(currentIndex > 0 ? currentIndex - 1 : components.length - 1)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {components.length}
          </span>
          
          <button
            onClick={() => navigateToComponent(currentIndex < components.length - 1 ? currentIndex + 1 : 0)}
            className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {mode === 'browser' && (
          <div className="mt-3 pt-3 border-t">
            <button
              onClick={() => window.location.href = `/en/fp-series?component=${currentComponent.id}`}
              className="w-full px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded border border-purple-200"
            >
              Switch to Individual Mode
            </button>
          </div>
        )}

        {mode === 'individual' && (
          <div className="mt-3 pt-3 border-t">
            <button
              onClick={() => window.location.href = `/en/fp-series-browser?component=${currentComponent.id}`}
              className="w-full px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded border border-purple-200"
            >
              Switch to Browser Mode
            </button>
          </div>
        )}

        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
          <div>← → Navigate | ESC Home</div>
          <div className="mt-1">
            <span className="text-yellow-600">●</span> Back | 
            <span className="text-blue-600">●</span> Info | 
            <span className="text-green-600">●</span> Nav | 
            <span className="text-purple-600">●</span> Mode
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
