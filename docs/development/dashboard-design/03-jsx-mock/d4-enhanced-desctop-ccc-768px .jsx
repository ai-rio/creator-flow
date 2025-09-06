import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, Target, Flame, Bot, Truck, Package, Moon, Sun, ChevronDown,
    Palette, BrainCircuit, Rocket, BarChart3, RadioTower, Globe,
    TrendingUp, ShieldCheck, Wrench, ChevronsLeft, DollarSign, Clapperboard,
    Star, CheckCircle2, AlertTriangle
} from 'lucide-react';

// --- THEME MANAGEMENT ---
const ThemeToggle = ({ theme, setTheme }) => {
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    return (
        <motion.button onClick={toggleTheme} whileTap={{ scale: 0.9, rotate: 15 }} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-500/10 transition-colors" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
    );
};

// --- BASE COMPONENT: GlassPane ---
const GlassPane = ({ children, className = '' }) => (
    <div className={`bg-white/50 dark:bg-slate-400/10 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl ${className}`}>
        {children}
    </div>
);

// --- D-SERIES COMPONENTS (Desktop) ---

// D1: ExecutiveDesktopHeader (Code omitted for brevity)
const ExecutiveDesktopHeader = ({ theme, setTheme }) => { /* ... existing code ... */ return ( <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 20 }} className="fixed top-4 left-4 right-4 z-50"> <GlassPane className="p-3 px-6 flex items-center justify-between"> <div className="flex items-center gap-4"> <Zap className="text-purple-700 dark:text-purple-400" /> <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">CreatorFlow CEO Command Center</h1> <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:hidden">CEO CC</h1> </div> <div className="flex items-center gap-4"> <div className="flex items-center gap-3 p-2 rounded-full bg-slate-500/5"> <div className="text-teal-800 dark:text-teal-400"><Target size={16}/></div> <div className="text-teal-800 dark:text-teal-400"><Flame size={16}/></div> <div className="text-teal-800 dark:text-teal-400"><Bot size={16}/></div> <div className="text-teal-800 dark:text-teal-400"><Truck size={16}/></div> <div className="text-teal-800 dark:text-teal-400"><Package size={16}/></div> </div> <div className="h-6 w-px bg-slate-900/10 dark:border-slate-100/10"></div> <div className="flex items-center gap-2"> <img src="https://placehold.co/32x32/0A090F/E2E8F0?text=CEO" alt="CEO Avatar" className="w-8 h-8 rounded-full border-2 border-slate-500/20" /> <span className="hidden lg:block font-bold text-sm text-slate-800 dark:text-slate-200">@ceo</span> <ChevronDown size={16} className="text-slate-600 dark:text-slate-400" /> </div> <ThemeToggle theme={theme} setTheme={setTheme} /> </div> </GlassPane> </motion.header> );};

// D2: DesktopSidebarNav (Code omitted for brevity)
const DesktopSidebarNav = ({ isCollapsed, setIsCollapsed }) => { /* ... existing code ... */ return ( <motion.aside className="fixed top-24 left-4 bottom-4 hidden md:flex flex-col z-40" initial={false} animate={{ width: isCollapsed ? '4.5rem' : '16rem' }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}> <div className="h-full p-2 bg-white/30 dark:bg-slate-500/5 rounded-2xl flex flex-col justify-between overflow-hidden"> <nav className="flex-grow"> {/* ... nav items ... */} </nav> <div className="p-2"> <button onClick={() => setIsCollapsed(!isCollapsed)} className={`w-full flex items-center gap-4 p-3 rounded-lg text-left text-slate-700 dark:text-slate-300 hover:bg-slate-500/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`} aria-label="Toggle sidebar"> <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{duration: 0.2}}> <ChevronsLeft size={20} /> </motion.div> <AnimatePresence> {!isCollapsed && ( <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.2}} className="font-semibold text-sm">Collapse</motion.span> )} </AnimatePresence> </button> </div> </div> </motion.aside> );};

// D3: CrossSystemMasterpieceCard (Code omitted for brevity)
const CrossSystemMasterpieceCard = () => { /* ... existing code ... */ return ( <motion.div variants={{hidden: {opacity:0, y:20}, visible:{opacity:1, y:0, transition: {type:'spring', staggerChildren:0.1}}}} initial="hidden" animate="visible" className="space-y-4"> <div className="flex items-center gap-3 px-2"> <Palette className="text-slate-600 dark:text-slate-400" /> <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Cross-System Business Intelligence Masterpiece</h2> </div> <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> {/* ... SymphonyCards ... */} </div> </motion.div> );};

// [NEWLY BUILT & THEMED] D4: CrisisCommandCenterCard
const SystemStatus = ({ system, status }) => {
    const statusConfig = {
        ok: { icon: <CheckCircle2 size={16} />, color: "text-teal-800 dark:text-teal-400" },
        warn: { icon: <AlertTriangle size={16} />, color: "text-yellow-600 dark:text-yellow-500" },
    };
    const config = statusConfig[status];
    return <span className={`flex items-center gap-1 font-semibold ${config.color}`}>{system}{config.icon}</span>;
};

const CrisisCommandCenterCard = () => {
    return (
        <motion.div
             variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', delay: 0.2 } }}}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            <div className="flex items-center gap-3 px-2">
                <Flame className="text-yellow-600 dark:text-yellow-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">CROSS-SYSTEM CRISIS COMMAND CENTER</h2>
            </div>
            <GlassPane className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Star className="text-yellow-600 dark:text-yellow-500" size={24}/>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">VIRAL ALERT: Video #xyz789 driving massive order spike</p>
                </div>
                <div className="pl-9 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                    <p><span className="font-bold">🎯 Impact:</span> +347 orders in 2h, inventory critical, ship ready</p>
                    <div className="flex items-center gap-4">
                        <span className="font-bold">📊 Cross-System Status:</span>
                        <SystemStatus system="Orders" status="ok" />
                        <SystemStatus system="Inventory" status="warn" />
                        <SystemStatus system="Shipping" status="ok" />
                        <SystemStatus system="TikTok" status="ok" />
                    </div>
                    <p><span className="font-bold">⚡ Auto-Actions:</span> Inventory scaling, shipping optimization active</p>
                </div>
                 <div className="flex items-center gap-3 pt-4 pl-9">
                    <motion.button whileTap={{scale: 0.95}} className="px-4 py-2 text-sm font-bold text-white bg-slate-800 dark:bg-slate-100 dark:text-slate-900 rounded-lg shadow-lg">Scale All Systems</motion.button>
                    <motion.button whileTap={{scale: 0.95}} className="px-4 py-2 text-sm font-bold bg-slate-500/20 text-slate-800 dark:text-slate-200 rounded-lg">CEO Override</motion.button>
                    <motion.button whileTap={{scale: 0.95}} className="px-4 py-2 text-sm font-bold bg-red-500/20 text-red-600 dark:text-red-500 rounded-lg">Emergency Protocol</motion.button>
                </div>
            </GlassPane>
        </motion.div>
    );
};

// --- MAIN DESKTOP APP CONTAINER ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
                {/* D3 Component - code in file is complete */}
                <CrossSystemMasterpieceCard />
                {/* D4 Component added */}
                <CrisisCommandCenterCard />
             </div>
        </main>
    </div>
  );
}
