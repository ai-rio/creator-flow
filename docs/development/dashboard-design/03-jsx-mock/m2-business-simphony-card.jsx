import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Zap, Target, Flame, Bot, Sun, Moon, Palette, DollarSign, Package, Truck, Video } from 'lucide-react';

// --- Mock Data ---
const initialSystemStatus = {
    sales: 'nominal',   // 'nominal', 'warning', 'critical'
    viral: 'warning',
    automation: 'critical'
};

const dailyStats = {
    revenue: 12847,
    revenueTrend: [5, 10, 20, 40, 30, 60, 75, 90],
    unitsSold: 1247,
    autoFulfilledPercent: 98,
    unitsShipped: 347,
    shippingSavings: 1200,
    topVideo: {
        id: 'xyz789',
        orders: 2300,
    }
};

// --- Reusable Components ---
const GlassPane = ({ children, className = '' }) => (
    <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 shadow-lg ${className}`}>
        {children}
    </div>
);

const ThemeToggle = ({ theme, setTheme }) => (
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

const StatusIcon = ({ icon: Icon, status }) => {
    const statusConfig = {
        nominal: { color: 'text-teal-800 dark:text-teal-400' },
        warning: { color: 'text-amber-600 dark:text-amber-400' },
        critical: { color: 'text-red-600 dark:text-red-400' }
    };
    const config = statusConfig[status] || statusConfig.nominal;
    return <Icon size={20} className={`${config.color}`} />;
};

const AnimatedNumber = ({ value, isCurrency = false }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 1.5,
            ease: "easeOut",
            onUpdate(latest) {
                setDisplayValue(Math.round(latest));
            }
        });
        return () => controls.stop();
    }, [value]);

    return (
        <span>
            {isCurrency && '$'}
            {displayValue.toLocaleString()}
        </span>
    );
};

const Sparkline = ({ data, className = '' }) => {
    const width = 100;
    const height = 20;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d - min) / (max - min) * height);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className={`w-full h-auto ${className}`} preserveAspectRatio="none">
            <motion.polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                points={points}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
        </svg>
    );
};


// --- M1: The Header Component ---
const MobileExecutiveHeader = ({ systemStatus, user }) => (
    <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        className="fixed top-2 left-2 right-2 z-40"
    >
        <GlassPane className="px-4 py-3 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Zap className="text-purple-700 dark:text-purple-400" size={24} /><h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">CreatorFlow</h1></div>
                <div className="flex items-center gap-4"><StatusIcon icon={Target} status={systemStatus.sales} /><StatusIcon icon={Flame} status={systemStatus.viral} /><StatusIcon icon={Bot} status={systemStatus.automation} /></div>
                <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}><span className="text-sm font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline">{user.handle}</span><img src={user.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-purple-700/50 dark:border-purple-400/50" /></motion.div>
            </div>
        </GlassPane>
    </motion.header>
);

// --- M2: The Business Symphony Card ---
const BusinessSymphonyCard = ({ stats }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
    >
        <GlassPane className="p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
                <Palette className="text-slate-600 dark:text-slate-400" size={20} />
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Today's Business Symphony</h2>
            </div>
            <div className="space-y-4">
                {/* Revenue */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <DollarSign className="text-teal-800 dark:text-teal-400" size={24} />
                        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                           <AnimatedNumber value={stats.revenue} isCurrency />
                        </span>
                    </div>
                    <div className="w-1/3">
                        <Sparkline data={stats.revenueTrend} className="text-teal-800 dark:text-teal-400" />
                    </div>
                </div>
                {/* Units Sold */}
                <div className="flex items-center gap-3 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg">
                    <Package className="text-purple-700 dark:text-purple-400" size={20} />
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">
                        <AnimatedNumber value={stats.unitsSold} /> units sold
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">({stats.autoFulfilledPercent}% auto)</p>
                </div>
                {/* Shipped */}
                 <div className="flex items-center gap-3 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg">
                    <Truck className="text-purple-700 dark:text-purple-400" size={20} />
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">
                        <AnimatedNumber value={stats.unitsShipped} /> shipped
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">(<AnimatedNumber value={stats.shippingSavings} isCurrency/> saved)</p>
                </div>
                 {/* Top Video */}
                <div className="flex items-center gap-3 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg">
                    <Video className="text-red-600 dark:text-red-400" size={20} />
                    <p className="text-slate-800 dark:text-slate-200 font-semibold">
                        Video #{stats.topVideo.id}:
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        <AnimatedNumber value={stats.topVideo.orders} /> orders
                    </p>
                    <Flame className="text-red-600 dark:text-red-400" size={16} />
                </div>
            </div>
        </GlassPane>
    </motion.div>
);


// --- Main App Frame ---
const MobileDashboard = () => {
    const [theme, setTheme] = useState('dark');
    const user = { handle: '@ceo', avatarUrl: 'https://placehold.co/64x64/0A090F/FFF?text=CEO' };

    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] transition-colors duration-500 relative">
                <div className="w-full max-w-sm h-[800px] mx-auto bg-slate-200 dark:bg-slate-900/50 rounded-3xl shadow-2xl p-2">
                    <div className="relative h-full w-full bg-slate-100 dark:bg-[#0A090F] rounded-[20px] overflow-hidden">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <MobileExecutiveHeader systemStatus={initialSystemStatus} user={user} />
                        
                        <main className="p-2 pt-20">
                            <BusinessSymphonyCard stats={dailyStats} />
                            {/* The rest of the dashboard components (M3, M4, etc.) would go here */}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDashboard;
