'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; import { animate } from 'framer-motion';
import { Zap, Target, Flame, Bot, Sun, Moon, ArrowLeft, Clock, Music, Timer } from 'lucide-react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface SystemStatus {
  sales: 'nominal' | 'warning' | 'critical';
  viral: 'nominal' | 'warning' | 'critical';
  automation: 'nominal' | 'warning' | 'critical';
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- Mock Data ---
const initialSystemStatus = { sales: 'nominal', automation: 'nominal' };
const activeOrderCount = 347;
const orderSystemStats = {
    automationHealth: 96,
    avgProcessingTimeSec: 12,
    processingTimeChangePercent: -67
};

// --- Reusable Components (Condensed) ---
const GlassPane = ({ children, className = '' }: any) => <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 shadow-lg ${className}`}>{children}</div>;
const ThemeToggle = ({ theme, setTheme  }: any) => ( <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="absolute top-20 right-4 z-50 p-2 rounded-full text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-800/40" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}> <AnimatePresence mode="wait" initial={false}> <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}> {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} </motion.div> </AnimatePresence> </motion.button> );
const StatusIcon: React.FC<any> = ({ icon: Icon, status  }: any) => { const c: any = { nominal: 'text-teal-800 dark:text-teal-400', warning: 'text-amber-600 dark:text-amber-400', critical: 'text-red-600 dark:text-red-400' }; return <Icon size={20} className={c[status] || c.nominal} />; };
const AnimatedNumber: React.FC<any> = ({ value  }: any) => { const [displayValue, setDisplayValue] = useState<number>(0); useEffect(() => { const controls = animate(0, value, { duration: 1, ease: "easeOut", onUpdate(latest: any) { setDisplayValue(Math.round(latest)); } }); return () => controls.stop(); }, [value]); return (<span>{displayValue.toLocaleString()}</span>); };

// --- O1: The System Focus Header Component ---
const SystemFocusHeader = ({ title, metric, metricLabel, systemStatus  }: any) => (
    <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }} className="fixed top-2 left-2 right-2 z-40">
        <GlassPane className="px-3 py-3 rounded-xl border-b-0">
            <div className="flex items-center justify-between">
                <motion.button className="p-2 rounded-full" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><ArrowLeft className="text-slate-800 dark:text-slate-200" size={22} /></motion.button>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><span className="font-semibold text-teal-800 dark:text-teal-400">{metric}</span> {metricLabel}</p>
                </div>
                <div className="flex items-center gap-3 pr-2">
                    <StatusIcon icon={Target} status={systemStatus.sales} />
                    <StatusIcon icon={Bot} status={systemStatus.automation} />
                </div>
            </div>
        </GlassPane>
    </motion.header>
);

// --- O2: The Order System Stats Card ---
const OrderSystemStatsCard: React.FC<any> = ({ stats  }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
        >
            <GlassPane className="rounded-xl">
                <div className="grid grid-cols-2 divide-x divide-slate-300/50 dark:divide-slate-700/50">
                    <div className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Music className="text-purple-700 dark:text-purple-400" size={18} />
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Automation Health</h3>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            <AnimatedNumber value={stats.automationHealth} />%
                        </p>
                    </div>
                    <div className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Timer className="text-purple-700 dark:text-purple-400" size={18} />
                             <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Avg. Processing</h3>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                           <AnimatedNumber value={stats.avgProcessingTimeSec} />s
                        </p>
                        <div className="flex items-center justify-center gap-1 text-xs font-semibold text-teal-800 dark:text-teal-400">
                            (↓<AnimatedNumber value={Math.abs(stats.processingTimeChangePercent)} />%)
                            <Zap size={12} />
                        </div>
                    </div>
                </div>
            </GlassPane>
        </motion.div>
    );
};

// --- Main App Frame for this View ---
const OrderManagementView = () => {
    const [theme, setTheme] = useState<string>('dark');

    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] transition-colors duration-500 relative">
                <div className="w-full max-w-sm h-[800px] mx-auto bg-slate-200 dark:bg-slate-900/50 rounded-3xl shadow-2xl p-2">
                    <div className="relative h-full w-full bg-slate-100 dark:bg-[#0A090F] rounded-[20px] overflow-hidden">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        
                        <SystemFocusHeader 
                            title="Order Empire"
                            metric={activeOrderCount}
                            metricLabel="active"
                            systemStatus={initialSystemStatus}
                        />
                        
                        <main className="p-2 pt-20 space-y-4 overflow-y-auto h-full scrollbar-hide">
                           <OrderSystemStatsCard stats={orderSystemStats} />
                           
                           {/* O3, O4 will be built here */}
                           <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                                <p>Priority Orders List (O3)</p>
                                <p>Automated Flow Cards (O4)</p>
                           </div>
                           <div className="h-24"></div> {/* Spacer for bottom nav */}
                        </main>
                        
                        {/* O5 Sub Nav Bar will be built here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManagementView;

