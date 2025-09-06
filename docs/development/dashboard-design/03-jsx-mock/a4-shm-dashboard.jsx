import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, Target, Flame, Bot, Wrench, Moon, Sun, ChevronDown, User, Book, Radio, LogOut,
    ServerCog, ShieldAlert, Gauge, BarChart, Bell, Settings, AreaChart, CircleHelp,
    Pin, PinOff, ShoppingCart, Box, Truck, Clapperboard
} from 'lucide-react';

// --- THEME MANAGEMENT (Placeholder for brevity) ---
const ThemeToggle = ({ theme, setTheme }) => { return ( <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} whileTap={{ scale: 0.9, rotate: 15 }} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-500/10 transition-colors" aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</motion.button> );};

// --- BASE COMPONENT: GlassPane (Placeholder for brevity) ---
const GlassPane = ({ children, className = '' }) => ( <div className={`bg-white/60 dark:bg-slate-400/10 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl ${className}`}>{children}</div> );

// --- HOOK for detecting outside clicks (Placeholder for brevity) ---
const useOutsideClick = (ref, callback) => { useEffect(() => { const handleClick = e => { if (ref.current && !ref.current.contains(e.target)) callback(); }; document.addEventListener("mousedown", handleClick); return () => document.removeEventListener("mousedown", handleClick); }, [ref, callback]); };

// --- A-SERIES COMPONENTS (Admin) ---

// A1: AdminDesktopHeader (Placeholder for brevity)
const AdminDesktopHeader = ({ theme, setTheme }) => { return ( <motion.header className="fixed top-4 left-4 right-4 z-50"><GlassPane className="p-3 px-6 h-16 flex items-center justify-between"><h1 className="font-bold">A1: Header</h1><ThemeToggle theme={theme} setTheme={setTheme} /></GlassPane></motion.header> );};

// A2: AdminSidebarNav (Placeholder for brevity)
const AdminSidebarNav = ({ isExpanded, isPinned, onPinToggle, onHoverStart, onHoverEnd }) => { return ( <motion.aside onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} className="fixed top-24 left-4 bottom-4 hidden md:flex z-40" animate={{ width: isExpanded ? '16rem' : '4.5rem' }}><div className="h-full w-full p-2 bg-white/30 dark:bg-slate-500/5 rounded-2xl flex items-end justify-center"><button onClick={onPinToggle} className="p-2"><Pin size={20}/></button></div></motion.aside> );};


// [NEWLY BUILT & THEMED] A3: UnifiedSystemHealthCard
const HealthMetricCard = ({ icon, title, metrics, status, colorClass }) => {
    const statusConfig = {
        automated: { text: "Automated", color: "bg-teal-700 dark:bg-teal-400" },
        tiktok: { text: "Healthy", color: "bg-green-600 dark:bg-green-400" }
    };
    return (
        <GlassPane className="p-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    {React.cloneElement(icon, { className: colorClass })}
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">{title}</h3>
                </div>
                <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {metrics.map((metric, i) => <li key={i}>{metric}</li>)}
                </ul>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[status].color}`}></div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{statusConfig[status].text}</span>
            </div>
        </GlassPane>
    );
};

const UnifiedSystemHealthCard = () => {
    const healthData = [
        { icon: <ShoppingCart size={20}/>, title: "Orders", metrics: ["500/day avg", "96% automated", "12s avg proc"], status: "automated", colorClass: "text-purple-700 dark:text-purple-400" },
        { icon: <Box size={20}/>, title: "Inventory", metrics: ["1,247 SKUs", "3.2s sync", "99.9% accuracy"], status: "automated", colorClass: "text-blue-700 dark:text-blue-500" },
        { icon: <Truck size={20}/>, title: "Shipping", metrics: ["4 carriers", "<30s labels", "$1.2K saved"], status: "automated", colorClass: "text-purple-700 dark:text-purple-400" },
        { icon: <Clapperboard size={20}/>, title: "TikTok", metrics: ["API healthy", "<500ms resp", "99.9% uptime"], status: "tiktok", colorClass: "text-blue-700 dark:text-blue-500" }
    ];
    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', staggerChildren: 0.1 } }}}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            <div className="flex items-center gap-3 px-2">
                <Target className="text-purple-700 dark:text-purple-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">UNIFIED SYSTEM HEALTH OVERVIEW</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {healthData.map((data, i) => (
                    <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <HealthMetricCard {...data} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

// --- PLACEHOLDER COMPONENTS ---
const PlaceholderCard = ({ title }) => (<motion.div><GlassPane className="p-4 min-h-[12rem] flex items-center justify-center"><h2 className="text-xl font-bold text-slate-500">{title}</h2></GlassPane></motion.div>);

// --- MAIN ADMIN APP CONTAINER ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isExpanded = isPinned || isHovered;
  useEffect(() => { document.documentElement.className = theme; }, [theme]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0A090F] font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <AdminDesktopHeader theme={theme} setTheme={setTheme} />
        <AdminSidebarNav isExpanded={isExpanded} isPinned={isPinned} onPinToggle={() => setIsPinned(!isPinned)} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} />
        <main className={`pt-24 px-4 transition-all duration-300 ease-in-out ${isExpanded ? 'md:ml-72' : 'md:ml-24'}`}>
             <div className="p-4 space-y-8">
                <UnifiedSystemHealthCard />
                <PlaceholderCard title="A4: Critical System Alerts" />
                <PlaceholderCard title="A5: System Performance Artistry" />
                <PlaceholderCard title="A6: Emergency System Controls" />
             </div>
        </main>
    </div>
  );
}

