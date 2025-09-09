import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate, useSpring, useTransform } from 'framer-motion';
import { Zap, Target, Flame, Bot, Sun, Moon, Palette, DollarSign, Package, Truck, Video, AlertTriangle, TrendingUp, Clock, Wand2 } from 'lucide-react';

// --- Mock Data ---
const initialSystemStatus = { sales: 'nominal', viral: 'warning', automation: 'critical' };
const dailyStats = { revenue: 12847, revenueTrend: [5, 10, 20, 40, 30, 60, 75, 90], unitsSold: 1247, autoFulfilledPercent: 98, unitsShipped: 347, shippingSavings: 1200, topVideo: { id: 'xyz789', orders: 2300 } };
const strategicAlerts = [ { id: 1, type: 'critical', text: 'Low stock on "Viral Tee"', source: 'Inventory' }, { id: 2, type: 'insight', text: 'Viral spike: Scale inventory?', source: 'TikTok' }, { id: 3, type: 'operational', text: 'Carrier issue: UPS delayed', source: 'Shipping' }, ];
const automationStats = { hoursSaved: 47, tasksAutomated: 89, flowHealth: 96 };

// --- Reusable Components (Condensed for brevity) ---
const GlassPane = ({ children, className = '' }) => <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 shadow-lg ${className}`}>{children}</div>;
const ThemeToggle = ({ theme, setTheme }) => ( <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="absolute top-20 right-4 z-50 p-2 rounded-full text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-800/40" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}> <AnimatePresence mode="wait" initial={false}> <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}> {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} </motion.div> </AnimatePresence> </motion.button> );
const StatusIcon = ({ icon: Icon, status }) => { const c = { nominal: 'text-teal-800 dark:text-teal-400', warning: 'text-amber-600 dark:text-amber-400', critical: 'text-red-600 dark:text-red-400' }; return <Icon size={20} className={c[status] || c.nominal} />; };
const AnimatedNumber = ({ value, isCurrency = false }) => { const [val, setVal] = useState(0); useEffect(() => { const anim = animate(0, value, { duration: 1.5, ease: "easeOut", onUpdate(l) { setVal(Math.round(l)); } }); return () => anim.stop(); }, [value]); return (<span>{isCurrency && '$'}{val.toLocaleString()}</span>); };
const Sparkline = ({ data, className = '' }) => { const w = 100, h = 20, max = Math.max(...data), min = Math.min(...data); const p = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d - min) / (max - min) * h)}`).join(' '); return (<svg viewBox={`0 0 ${w} ${h}`} className={`w-full h-auto ${className}`} preserveAspectRatio="none"><motion.polyline fill="none" stroke="currentColor" strokeWidth="2" points={p} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} /></svg>); };

// --- New Reusable Component for M4 ---
const CircularProgress = ({ percentage }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const spring = useSpring(0, { stiffness: 50, damping: 20 });
    const progressText = useTransform(spring, (latest) => `${Math.round(latest)}%`);
    
    useEffect(() => {
        spring.set(percentage);
    }, [percentage, spring]);
    
    return (
        <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} strokeWidth="10" className="stroke-slate-300/50 dark:stroke-slate-700/50" fill="transparent" />
                <motion.circle
                    cx="50" cy="50" r={radius} strokeWidth="10"
                    className="stroke-teal-800 dark:stroke-teal-400"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ strokeDashoffset: useTransform(spring, p => circumference - (p / 100) * circumference) }}
                />
            </svg>
            <motion.div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-900 dark:text-slate-100">
                {progressText}
            </motion.div>
        </div>
    );
};

// --- M1, M2, M3 Components (Condensed) ---
const MobileExecutiveHeader = ({ systemStatus, user }) => ( <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }} className="fixed top-2 left-2 right-2 z-40"> <GlassPane className="px-4 py-3 rounded-xl"> <div className="flex items-center justify-between"> <div className="flex items-center gap-2"><Zap className="text-purple-700 dark:text-purple-400" size={24} /><h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">CreatorFlow</h1></div> <div className="flex items-center gap-4"><StatusIcon icon={Target} status={systemStatus.sales} /><StatusIcon icon={Flame} status={systemStatus.viral} /><StatusIcon icon={Bot} status={systemStatus.automation} /></div> <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}><span className="text-sm font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline">{user.handle}</span><img src={user.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-purple-700/50 dark:border-purple-400/50" /></motion.div> </div> </GlassPane> </motion.header> );
const BusinessSymphonyCard = ({ stats }) => ( <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}> <GlassPane className="p-4 rounded-xl"> <div className="flex items-center gap-2 mb-4"> <Palette className="text-slate-600 dark:text-slate-400" /> <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Today's Business Symphony</h2> </div> <div className="space-y-4"> <div className="flex justify-between items-center"><div className="flex items-center gap-3"><DollarSign className="text-teal-800 dark:text-teal-400" size={24} /><span className="text-3xl font-bold text-slate-900 dark:text-slate-100"><AnimatedNumber value={stats.revenue} isCurrency /></span></div><div className="w-1/3"><Sparkline data={stats.revenueTrend} className="text-teal-800 dark:text-teal-400" /></div></div> <div className="flex items-center gap-3 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg"><Package className="text-purple-700 dark:text-purple-400" /><p className="text-slate-800 dark:text-slate-200 font-semibold"><AnimatedNumber value={stats.unitsSold} /> units</p><p className="text-sm text-slate-600 dark:text-slate-400">({stats.autoFulfilledPercent}% auto)</p></div> <div className="flex items-center gap-3 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg"><Truck className="text-purple-700 dark:text-purple-400" /><p className="text-slate-800 dark:text-slate-200 font-semibold"><AnimatedNumber value={stats.unitsShipped} /> shipped</p><p className="text-sm text-slate-600 dark:text-slate-400">(<AnimatedNumber value={stats.shippingSavings} isCurrency /> saved)</p></div> <div className="flex items-center gap-3 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg"><Video className="text-red-600 dark:text-red-400" /><p className="text-slate-800 dark:text-slate-200 font-semibold">Video #{stats.topVideo.id}:</p><p className="text-sm text-slate-600 dark:text-slate-400"><AnimatedNumber value={stats.topVideo.orders} /> orders</p><Flame className="text-red-600 dark:text-red-400" size={16} /></div> </div> </GlassPane> </motion.div> );
const StrategicCommandCard = ({ alerts }) => ( <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.8 }}> <GlassPane className="p-4 rounded-xl"> <div className="flex items-center gap-2 mb-4"> <Target className="text-slate-600 dark:text-slate-400" /> <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Strategic Command</h2> </div> <motion.div className="space-y-3 mb-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}> {alerts.map(a => <motion.div key={a.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex items-center justify-between p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg"><div className="flex items-center gap-3"><AlertIcon type={a.type} /><p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{a.text}</p></div><span className="text-xs font-medium text-slate-500 bg-slate-300/50 dark:bg-slate-700/50 px-2 py-0.5 rounded-full">{a.source}</span></motion.div>)} </motion.div> <div className="grid grid-cols-3 gap-2"> <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="col-span-2 bg-teal-700 dark:bg-teal-500 text-white dark:text-slate-900 font-bold py-2 px-3 text-sm rounded-lg shadow-md">Auto-Scale</motion.button> <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-bold py-2 px-3 text-sm rounded-lg">Manual</motion.button> </div> </GlassPane> </motion.div> );
const AlertIcon = ({ type }) => { const i = { critical: <AlertTriangle className="text-red-600 dark:text-red-400" size={20} />, insight: <TrendingUp className="text-amber-600 dark:text-amber-400" size={20} />, operational: <Truck className="text-purple-700 dark:text-purple-400" size={20} /> }; return i[type] || null; };

// --- M4: The Liberation Orchestra Card ---
const LiberationOrchestraCard = ({ stats }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 1.1 }}
    >
        <GlassPane className="p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
                <Bot className="text-slate-600 dark:text-slate-400" size={20} />
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Liberation Orchestra</h2>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <Clock className="text-purple-700 dark:text-purple-400" size={24} />
                        <div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100"><AnimatedNumber value={stats.hoursSaved} /></div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">hours saved</div>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <Wand2 className="text-purple-700 dark:text-purple-400" size={24} />
                        <div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100"><AnimatedNumber value={stats.tasksAutomated} /></div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">tasks automated</div>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <CircularProgress percentage={stats.flowHealth} />
                    <p className="text-xs text-center mt-1 text-slate-600 dark:text-slate-400">Flow Health</p>
                </div>
            </div>
             <div className="grid grid-cols-2 gap-2 mt-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="bg-teal-700 dark:bg-teal-500 text-white dark:text-slate-900 font-bold py-2 px-3 text-sm rounded-lg shadow-md">View Orchestra</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-bold py-2 px-3 text-sm rounded-lg">Optimize</motion.button>
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
                        
                        <main className="p-2 pt-20 space-y-4 overflow-y-auto h-full">
                            <BusinessSymphonyCard stats={dailyStats} />
                            <StrategicCommandCard alerts={strategicAlerts} />
                            <LiberationOrchestraCard stats={automationStats} />
                            {/* The rest of the dashboard components (M5, M6) would go here */}
                             <div className="h-24"></div> {/* Spacer for bottom nav */}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDashboard;

