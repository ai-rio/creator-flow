'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Flame, Bot, Sun, Moon } from 'lucide-react';


// --- TypeScript Interfaces ---
interface User {
  handle: string;
  avatarUrl: string;
}

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
// This simulates the live status of different backend systems.
const initialSystemStatus = {
    sales: 'nominal',   // 'nominal', 'warning', 'critical'
    viral: 'warning',
    automation: 'critical'
};

// --- Reusable Components ---
const GlassPane = ({ children, className = ''  }: any) => (
    <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border-b border-slate-900/10 dark:border-slate-100/10 shadow-md ${className}`}>
        {children}
    </div>
);

const ThemeToggle = ({ theme, setTheme  }: any) => (
    <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-20 right-4 z-50 p-2 rounded-full text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-800/40"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
    >
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);

const StatusIcon: React.FC<any> = ({ icon: Icon, status  }: any) => {
    const statusConfig = {
        nominal: {
            color: 'text-teal-800 dark:text-teal-400',
            glow: 'shadow-[0_0_8px_rgba(29,255,233,0.7)]'
        },
        warning: {
            color: 'text-amber-600 dark:text-amber-400',
            glow: 'shadow-[0_0_8px_rgba(251,191,36,0.7)]'
        },
        critical: {
            color: 'text-red-600 dark:text-red-400',
            glow: 'shadow-[0_0_8px_rgba(239,68,68,0.7)]'
        }
    };

    const config = (statusConfig as any)[status] || statusConfig.nominal;

    return (
        <motion.div
            className={`p-1 rounded-full ${config.color}`}
            animate={{
                boxShadow: [`0 0 0px ${config.glow.split('[')[1].split(']')[0]}`, config.glow.replace('shadow-',''), `0 0 0px ${config.glow.split('[')[1].split(']')[0]}`],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <Icon size={20} />
        </motion.div>
    );
};


// --- M1: The Header Component ---
const MobileExecutiveHeader: React.FC<any> = ({ systemStatus, user  }: any) => {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-40"
        >
            <GlassPane className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left: Identity & Brand */}
                    <div className="flex items-center gap-2">
                        <Zap className="text-purple-700 dark:text-purple-400" size={24} />
                        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">CreatorFlow</h1>
                    </div>

                    {/* Center: System Status */}
                    <div className="flex items-center gap-4">
                        <StatusIcon icon={Target} status={systemStatus.sales} />
                        <StatusIcon icon={Flame} status={systemStatus.viral} />
                        <StatusIcon icon={Bot} status={systemStatus.automation} />
                    </div>

                    {/* Right: User Profile */}
                    <motion.div 
                        className="flex items-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline">{user.handle}</span>
                         <img 
                            src={user.avatarUrl} 
                            alt="User Avatar" 
                            className="w-8 h-8 rounded-full border-2 border-purple-700/50 dark:border-purple-400/50"
                        />
                    </motion.div>
                </div>
            </GlassPane>
        </motion.header>
    );
};

// --- Main App Frame ---
const MobileDashboard = () => {
    const [theme, setTheme] = useState<string>('dark');
    const user = { handle: '@ceo', avatarUrl: 'https://placehold.co/64x64/0A090F/FFF?text=CEO' };

    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] transition-colors duration-500 relative">
                <div className="w-full max-w-sm h-[800px] mx-auto bg-slate-200 dark:bg-slate-900/50 rounded-3xl shadow-2xl p-2">
                    <div className="relative h-full w-full bg-slate-100 dark:bg-[#0A090F] rounded-[20px] overflow-hidden">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <MobileExecutiveHeader systemStatus={initialSystemStatus} user={user} />
                        {/* The rest of the dashboard components (M2, M3, etc.) would go here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDashboard;
