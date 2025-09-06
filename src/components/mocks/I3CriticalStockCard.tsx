'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; import { animate } from 'framer-motion';
import { ArrowRight, Bell, CheckCircle2, ChevronDown, Clock, Home, Inbox, Layers, Settings, ShoppingCart, Siren, Zap } from 'lucide-react';


// --- TypeScript Interfaces ---
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- MOCK DATA FOR I3: CriticalStockCard ---
const criticalStockData = [
    {
        id: 1,
        productName: "iPhone Case Pro",
        stockLeft: 12,
        cause: "Viral video driving orders",
        causeIcon: "🔥",
        velocity: 47,
        timeToStockout: "6hr",
        suggestion: 500
    },
    {
        id: 2,
        productName: "Magnetic Charging Stand",
        stockLeft: 23,
        cause: "Mentioned by @techguru",
        causeIcon: "🚀",
        velocity: 21,
        timeToStockout: "11hr",
        suggestion: 300
    },
    {
        id: 3,
        productName: "Creator Ring Light Max",
        stockLeft: 8,
        cause: "Flash sale ending soon",
        causeIcon: "⚡️",
        velocity: 60,
        timeToStockout: "2hr",
        suggestion: 800
    }
];


// --- REUSABLE GlassPane COMPONENT ---
// This ensures all components share the exact same base style as defined in the style guide.
const GlassPane: React.FC<any> = ({ children, className = ''  }: any) => {
    return (
        <div className={`bg-slate-400/10 backdrop-blur-xl border border-slate-100/10 rounded-2xl ${className}`}>
            {children}
        </div>
    );
};


// --- I-SERIES COMPONENTS ---

// [COMPLETED] I1: InventoryFocusHeader
const InventoryFocusHeader = () => {
    return (
        <GlassPane className="p-4 flex items-center justify-between sticky top-4 z-10">
            <div className="flex items-center gap-3">
                <Layers className="text-slate-200" />
                <h1 className="text-xl font-bold text-slate-100">Inventory Command</h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/20 border border-teal-500/30 rounded-full">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                <span className="text-sm font-medium text-teal-300">System Nominal</span>
            </div>
        </GlassPane>
    );
};

// [COMPLETED] I2: SyncStatusCard
const SyncStatusCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 } as any}
            animate={{ opacity: 1, y: 0 } as any}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 } as any}
        >
            <GlassPane className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-teal-400" />
                    <div>
                        <p className="font-semibold text-slate-100">All Channels Synced</p>
                        <p className="text-sm text-slate-400">Last sync: 32 seconds ago</p>
                    </div>
                </div>
                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Force Sync
                </button>
            </GlassPane>
        </motion.div>
    );
};


// [NEWLY BUILT] I3: The CriticalStockCard
const CriticalStockCard = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                type: 'spring',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 120, damping: 20 },
        },
    };

    return (
        <motion.div variants={containerVariants as any} initial="hidden" animate="visible">
            <motion.div variants={itemVariants as any} className="flex items-center gap-2 px-1 mb-2">
                <Siren className="text-red-400" size={20} />
                <h2 className="text-lg font-bold text-red-400 tracking-wide">CRITICAL STOCK ALERTS</h2>
            </motion.div>
            <motion.div variants={containerVariants as any} className="space-y-4">
                {criticalStockData.map((item) => (
                    <motion.div key={item.id} variants={itemVariants as any}>
                        <GlassPane className="p-4 overflow-hidden">
                            {/* Card Header */}
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-slate-100">{item.productName}</h3>
                                <p className="text-2xl font-bold text-amber-400">{item.stockLeft} <span className="text-base text-slate-400 font-medium">left</span></p>
                            </div>

                            {/* Contextual Intelligence */}
                            <div className="mt-2 text-sm text-slate-300 flex items-center gap-2">
                                <span>{item.causeIcon}</span>
                                <span>{item.cause}</span>
                            </div>

                            {/* Predictive Analysis */}
                             <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                                <div className="bg-slate-900/50 p-2 rounded-lg">
                                    <p className="text-xs text-slate-400">SALES VELOCITY</p>
                                    <p className="text-lg font-bold text-slate-100">📈 {item.velocity}/hour</p>
                                </div>
                                <div className="bg-slate-900/50 p-2 rounded-lg">
                                    <p className="text-xs text-slate-400">EST. STOCKOUT</p>
                                    <p className="text-lg font-bold text-slate-100"><Clock size={16} className="inline mr-1" /> {item.timeToStockout}</p>
                                </div>
                            </div>
                           
                            {/* AI Suggestion */}
                            <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center gap-3">
                                <Zap className="text-purple-400" />
                                <p className="text-sm font-medium text-slate-200">
                                    <span className="text-purple-300">AI Suggestion:</span> Auto-reorder {item.suggestion} units.
                                </p>
                            </div>

                             {/* Action Bar */}
                            <div className="mt-4 grid grid-cols-3 gap-3">
                                <motion.button 
                                    whileTap={{ scale: 0.95 } as any}
                                    className="bg-teal-500/80 text-white font-semibold py-2 rounded-lg hover:bg-teal-500 transition-colors">
                                    Auto-Order
                                </motion.button>
                                <motion.button 
                                     whileTap={{ scale: 0.95 } as any}
                                    className="bg-slate-500/60 text-slate-100 font-semibold py-2 rounded-lg hover:bg-slate-500/80 transition-colors">
                                    Manual
                                </motion.button>
                                 <motion.button 
                                     whileTap={{ scale: 0.95 } as any}
                                    className="bg-slate-800/60 text-slate-300 font-semibold py-2 rounded-lg hover:bg-slate-700/80 transition-colors">
                                    Defer
                                </motion.button>
                            </div>

                        </GlassPane>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

// --- MAIN APP CONTAINER ---
// This component assembles the full view for demonstration.
export default function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#0A090F] font-sans p-4">
        <div className="max-w-md mx-auto space-y-4">
            {/* --- INVENTORY MANAGEMENT FOCUS VIEW (I-Series) --- */}
            <InventoryFocusHeader />
            <SyncStatusCard />
            <CriticalStockCard />
        </div>
    </div>
  );
}

