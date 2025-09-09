import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, Target, Flame, Bot, Wrench, Moon, Sun, ChevronDown, User, Book, Radio, LogOut,
    ServerCog, ShieldAlert, Gauge, BarChart, Bell, Settings, AreaChart, CircleHelp,
    Pin, PinOff
} from 'lucide-react';

// --- THEME MANAGEMENT (Placeholder for brevity) ---
const ThemeToggle = ({ theme, setTheme }) => { return ( <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} whileTap={{ scale: 0.9, rotate: 15 }} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-500/10 transition-colors" aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</motion.button> );};

// --- BASE COMPONENT: GlassPane (Placeholder for brevity) ---
const GlassPane = ({ children, className = '' }) => ( <div className={`bg-white/60 dark:bg-slate-400/10 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl ${className}`}>{children}</div> );

// --- HOOK for detecting outside clicks (Placeholder for brevity) ---
const useOutsideClick = (ref, callback) => { useEffect(() => { const handleClick = e => { if (ref.current && !ref.current.contains(e.target)) callback(); }; document.addEventListener("mousedown", handleClick); return () => document.removeEventListener("mousedown", handleClick); }, [ref, callback]); };

// --- A-SERIES COMPONENTS (Admin) ---

// [BUILT & THEMED] A1: AdminDesktopHeader
const AdminDesktopHeader = ({ theme, setTheme }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));
    return (
        <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 20 }} className="fixed top-4 left-4 right-4 z-50">
            <GlassPane className="p-3 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Zap className="text-purple-700 dark:text-purple-400" />
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">CreatorFlow Admin Command Center</h1>
                </div>
                <div className="flex items-center gap-4">
                    {/* ... other header items ... */}
                    <div className="relative" ref={dropdownRef}>
                        <motion.button onClick={() => setIsDropdownOpen(!isDropdownOpen)} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
                             <img src="https://placehold.co/32x32/0A090F/E2E8F0?text=A" alt="Admin Avatar" className="w-8 h-8 rounded-full" />
                            <span className="hidden lg:block font-bold text-sm">admin</span>
                            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}><ChevronDown size={16} /></motion.div>
                        </motion.button>
                        {/* Dropdown Menu */}
                    </div>
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
            </GlassPane>
        </motion.header>
    );
};


// [REBUILT with Hover & Pin] A2: AdminSidebarNav
const NavItem = ({ item, isExpanded }) => {
    return (
        <li>
            <button className={`w-full flex items-center gap-4 p-3 rounded-lg text-left text-slate-700 dark:text-slate-300 hover:bg-slate-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 ${!isExpanded && 'justify-center'}`}>
                {item.icon}
                <AnimatePresence>{isExpanded && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2, ease: "easeOut" }} className="font-semibold text-sm whitespace-nowrap">{item.label}</motion.span>}</AnimatePresence>
            </button>
        </li>
    );
};
const AdminSidebarNav = ({ isExpanded, isPinned, onPinToggle, onHoverStart, onHoverEnd }) => {
    const navItems = [ { icon: <ServerCog size={20} />, label: "System Monitoring" }, { icon: <ShieldAlert size={20} />, label: "Crisis Management" }, { icon: <Gauge size={20} />, label: "Performance" }, { icon: <BarChart size={20} />, label: "Analytics" }, { icon: <Bell size={20} />, label: "Alert Management" }, { icon: <Settings size={20} />, label: "System Controls" }, { icon: <AreaChart size={20} />, label: "Capacity Planning" }, { icon: <CircleHelp size={20} />, label: "Help & Support" } ];

    return (
        <motion.aside onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} className="fixed top-24 left-4 bottom-4 hidden md:flex flex-col z-40" initial={false} animate={{ width: isExpanded ? '16rem' : '4.5rem' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="h-full p-2 bg-white/30 dark:bg-slate-500/5 rounded-2xl flex flex-col justify-between overflow-hidden">
                <nav className="flex-grow"><ul className="flex flex-col gap-2">{navItems.map(item => <NavItem key={item.label} item={item} isExpanded={isExpanded} />)}</ul></nav>
                <div>
                    <button onClick={onPinToggle} className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-slate-500/10 text-slate-700 dark:text-slate-300 ${!isExpanded && 'justify-center'}`} aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}>
                        <motion.div animate={{ rotate: isPinned ? 45 : 0 }}><Pin size={20} /></motion.div>
                        <AnimatePresence>{isExpanded && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-semibold text-sm">Pin</motion.span>}</AnimatePresence>
                    </button>
                </div>
            </div>
        </motion.aside>
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
        <AdminSidebarNav 
            isExpanded={isExpanded}
            isPinned={isPinned}
            onPinToggle={() => setIsPinned(!isPinned)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        />
        <main className={`pt-24 px-4 transition-all duration-300 ease-in-out ${isExpanded ? 'md:ml-72' : 'md:ml-24'}`}>
             <div className="p-4 space-y-8">
                <PlaceholderCard title="A3: Unified System Health" />
                <PlaceholderCard title="A4: Critical System Alerts" />
                <PlaceholderCard title="A5: System Performance Artistry" />
                <PlaceholderCard title="A6: Emergency System Controls" />
             </div>
        </main>
    </div>
  );
}
