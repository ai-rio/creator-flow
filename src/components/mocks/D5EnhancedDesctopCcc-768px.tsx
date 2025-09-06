'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; import { animate } from 'framer-motion';
import {
    Zap, Target, Flame, Bot, Truck, Package, Moon, Sun, ChevronDown,
    Palette, BrainCircuit, Rocket, BarChart3, RadioTower, Globe,
    TrendingUp, ShieldCheck, Wrench, ChevronsLeft, DollarSign, Clapperboard,
    Star, CheckCircle2, AlertTriangle, Timer, Heart, Bed, Workflow
} from 'lucide-react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- THEME MANAGEMENT (Code omitted for brevity) ---
const ThemeToggle: React.FC<any> = ({ theme, setTheme  }: any) => { /* ... existing code ... */ return ( <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} whileTap={{ scale: 0.9, rotate: 15 }} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-500/10 transition-colors" aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</motion.button> );};

// --- BASE COMPONENT: GlassPane (Code omitted for brevity) ---
const GlassPane = ({ children, className = ''  }: any) => ( <div className={`bg-white/50 dark:bg-slate-400/10 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl ${className}`}>{children}</div> );

// --- D-SERIES COMPONENTS (Desktop) ---

// D1: ExecutiveDesktopHeader (Placeholder for brevity)
const ExecutiveDesktopHeader: React.FC<any> = ({ theme, setTheme  }: any) => { return ( <motion.header className="fixed top-4 left-4 right-4 z-50"> <GlassPane className="p-3 px-6 flex items-center justify-between h-16"> <h1 className="text-xl font-bold">D1: Header</h1> <ThemeToggle theme={theme} setTheme={setTheme} /> </GlassPane> </motion.header> );};

// D2: DesktopSidebarNav (Placeholder for brevity)
const DesktopSidebarNav: React.FC<any> = ({ isCollapsed, setIsCollapsed  }: any) => { return ( <motion.aside className="fixed top-24 left-4 bottom-4 hidden md:flex z-40" animate={{ width: isCollapsed ? '4.5rem' : '16rem' }}> <div className="h-full w-full p-2 bg-white/30 dark:bg-slate-500/5 rounded-2xl flex items-end justify-center"> <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2" aria-label="Toggle sidebar"><ChevronsLeft /></button> </div> </motion.aside> );};

// D3: CrossSystemMasterpieceCard (Placeholder for brevity)
const CrossSystemMasterpieceCard = () => { return (<motion.div><GlassPane className="p-4 h-48"><h2 className="font-bold">D3: Cross-System Masterpiece</h2></GlassPane></motion.div>);};

// D4: CrisisCommandCenterCard (Placeholder for brevity)
const CrisisCommandCenterCard = () => { return (<motion.div><GlassPane className="p-4 h-48"><h2 className="font-bold">D4: Crisis Command Center</h2></GlassPane></motion.div>);};

// [NEWLY REBUILT & THEMED] D5: AutomationLiberationOrchestraCard
const LiberationMetric = ({ icon, label, value, valueElement  }: any) => (
    <div className="flex items-center justify-between text-sm py-2 border-b border-slate-900/5 dark:border-slate-100/5">
        <div className="flex items-center gap-4">
            {icon}
            <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        </div>
        {valueElement || <span className="font-bold text-slate-900 dark:text-slate-100 text-right">{value}</span>}
    </div>
);

const SystemSymphonyIndicator = () => (
    <div className="flex items-center gap-2">
        <div className="flex items-center">
            {[...Array(3)].map((_, i) => (
                <motion.div key={i} className="w-2 h-2 rounded-full bg-teal-800 dark:bg-teal-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7]}}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
            ))}
        </div>
        <span className="font-bold text-slate-900 dark:text-slate-100">94% harmony</span>
    </div>
);

const AutomationLiberationOrchestraCard = () => {
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', delay: 0.2 } }}}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            <div className="flex items-center gap-3 px-2">
                <Bot className="text-teal-800 dark:text-teal-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">AUTOMATION LIBERATION ORCHESTRA</h2>
            </div>
            <GlassPane className="p-6 space-y-3">
                <LiberationMetric 
                    icon={<Timer className="text-slate-600 dark:text-slate-400" />}
                    label="LIBERATION METRICS"
                    valueElement={
                        <span className="font-bold text-teal-800 dark:text-teal-400 text-lg relative">
                            47h saved
                            <motion.div
                                className="absolute -inset-2"
                                animate={{
                                    boxShadow: [
                                        "0 0 0px 0px hsla(160, 100%, 37%, 0)",
                                        "0 0 10px 0px hsla(160, 100%, 37%, 0.5)",
                                        "0 0 0px 0px hsla(160, 100%, 37%, 0)",
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </span>
                    }
                />
                 <LiberationMetric 
                    icon={<Heart className="text-slate-600 dark:text-slate-400" />}
                    label="STRESS ELIMINATION"
                    value="89% tasks automated"
                />
                 <LiberationMetric 
                    icon={<Bed className="text-slate-600 dark:text-slate-400" />}
                    label="WHILE YOU SLEPT"
                    value="127 orders fully processed"
                />
                <LiberationMetric 
                    icon={<Workflow className="text-slate-600 dark:text-slate-400" />}
                    label="SYSTEM SYMPHONY"
                    valueElement={<SystemSymphonyIndicator />}
                />
                 <div className="flex items-center gap-3 pt-4">
                    <motion.button whileTap={{scale: 0.95}} className="px-4 py-2 text-sm font-bold bg-slate-500/20 text-slate-800 dark:text-slate-200 rounded-lg">View Full Orchestra</motion.button>
                    <motion.button whileTap={{scale: 0.95}} className="px-4 py-2 text-sm font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 rounded-lg">Optimize Workflows</motion.button>
                     <motion.button whileTap={{scale: 0.95}} className="px-4 py-2 text-sm font-bold bg-teal-800/10 dark:bg-teal-400/10 text-teal-800 dark:text-teal-400 rounded-lg">Add Automation</motion.button>
                </div>
            </GlassPane>
        </motion.div>
    );
};

// --- MAIN DESKTOP APP CONTAINER ---
export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
      document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
      document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0A090F] font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <ExecutiveDesktopHeader theme={theme} setTheme={setTheme} />
        <DesktopSidebarNav isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        
        <main className={`pt-24 px-4 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}>
             <div className="p-4 space-y-8">
                <CrossSystemMasterpieceCard />
                <CrisisCommandCenterCard />
                <AutomationLiberationOrchestraCard />
             </div>
        </main>
    </div>
  );
}
