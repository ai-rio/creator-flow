import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, Target, Flame, Bot, Wrench, Moon, Sun, ChevronDown,
    User, Book, Radio, LogOut
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
    <div className={`bg-white/60 dark:bg-slate-400/10 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl ${className}`}>
        {children}
    </div>
);

// --- HOOK for detecting outside clicks ---
const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};


// --- A-SERIES COMPONENTS (Admin) ---

// [NEWLY BUILT & THEMED] A1: AdminDesktopHeader
const AdminDesktopHeader = ({ theme, setTheme }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

    const systemIcons = [
        { icon: <Wrench size={16} />, key: 'wrench' },
        { icon: <Target size={16} />, key: 'target' },
        { icon: <Flame size={16} />, key: 'flame' },
    ];

    const dropdownItems = [
        { icon: <User size={16} />, label: "Profile Settings" },
        { icon: <Radio size={16} />, label: "API Status" },
        { icon: <Book size={16} />, label: "Documentation" },
        { icon: <LogOut size={16} />, label: "Logout" },
    ];

    return (
        <motion.header 
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="fixed top-4 left-4 right-4 z-50"
        >
            <GlassPane className="p-3 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Zap className="text-purple-700 dark:text-purple-400" />
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 hidden md:block">
                        CreatorFlow Admin Command Center
                    </h1>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 md:hidden">
                        Admin CC
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 p-2 rounded-full bg-slate-500/5">
                        {systemIcons.map((item) => (
                            <div key={item.key} className="text-teal-800 dark:text-teal-400">
                                {item.icon}
                            </div>
                        ))}
                    </div>
                    <div className="h-6 w-px bg-slate-900/10 dark:border-slate-100/10"></div>
                    
                    {/* --- USER DROPDOWN --- */}
                    <div className="relative" ref={dropdownRef}>
                        <motion.button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2"
                        >
                            <img 
                                src="https://placehold.co/32x32/0A090F/E2E8F0?text=A" 
                                alt="Admin Avatar" 
                                className="w-8 h-8 rounded-full border-2 border-slate-500/20"
                            />
                            <span className="hidden lg:block font-bold text-sm text-slate-800 dark:text-slate-200">admin</span>
                            <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                                <ChevronDown size={16} className="text-slate-600 dark:text-slate-400" />
                            </motion.div>
                        </motion.button>
                        
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="absolute top-12 right-0 w-56 origin-top-right"
                                >
                                    <GlassPane className="p-2">
                                        <ul className="space-y-1">
                                            {dropdownItems.map(item => (
                                                <li key={item.label}>
                                                    <a href="#" className="flex items-center gap-3 p-2 text-sm font-semibold text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-500/10 transition-colors">
                                                        {item.icon}
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </GlassPane>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* --- END USER DROPDOWN --- */}

                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
            </GlassPane>
        </motion.header>
    );
};


// --- MAIN ADMIN APP CONTAINER ---
export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
      document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
      document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0A090F] font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <AdminDesktopHeader theme={theme} setTheme={setTheme} />
        
        <main className="pt-24 px-4">
            <p className="text-center text-slate-500 dark:text-slate-400">
                Main content area. A2 through A6 will be built here.
            </p>
        </main>
    </div>
  );
}
