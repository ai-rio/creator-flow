'use client';

import * as React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';


// --- TypeScript Interfaces ---
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- Theme Context & Provider ---
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children  }: any) => {
    const [theme, setTheme] = useState<string>('dark');
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// --- Responsive Hook ---
const useMediaQuery = (query: any) => {
    const [matches, setMatches] = useState<boolean>(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
    return matches;
};


// --- HIGH-QUALITY ICONS ---
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const AutomationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IntelligenceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const GrowthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const RevenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
const OrdersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const MarginIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const HealthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// --- Helper Components ---
const GlassPane = ({ children, className  }: any) => (
    <div className={`relative rounded-2xl border bg-slate-200/50 dark:bg-black/20 border-slate-300/50 dark:border-white/10 backdrop-blur-xl transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const BorderBeam = ({ className  }: any) => (
    <div className={`absolute inset-0 rounded-2xl overflow-hidden pointer-events-none ${className}`}>
        <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }} />
        <motion.div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-teal-400 to-transparent" initial={{ y: "-100%" }} animate={{ y: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }} />
        <motion.div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-teal-400 to-transparent" initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2.5 }} />
        <motion.div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-t from-transparent via-teal-400 to-transparent" initial={{ y: "100%" }} animate={{ y: "-100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 3.5 }} />
    </div>
);

// --- Command Center Cards ---
const KpiCard = ({ title, value, change, icon, variants  }: any) => (
    <motion.div variants={variants}>
        <GlassPane className="p-4 h-full">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
                </div>
                <div className="text-slate-500 dark:text-slate-400">{icon}</div>
            </div>
            <p className="text-sm mt-2 text-teal-600 dark:text-teal-400">{change}</p>
        </GlassPane>
    </motion.div>
);

const businessArtData = [{ name: 'Revenue', value: 12847, max: 15000 }, { name: 'Orders', value: 347, max: 500 }, { name: 'Health', value: 96, max: 100 }];
const BusinessArtCard: React.FC<any> = ({ variants  }: any) => { const { theme } = useTheme(); const colors = theme === 'dark' ? ['#2dd4bf', '#a78bfa', '#f472b6'] : ['#0d9488', '#7c3aed', '#db2777']; return (<motion.div variants={variants}><GlassPane className="p-6 h-full flex flex-col"><h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Today's Business Art</h2><div className="flex-grow"><ResponsiveContainer width="100%" height="100%"><BarChart data={businessArtData} layout="vertical" margin={{ top: 0, right: 10, left: -20, bottom: 0 }}><XAxis type="number" hide /><YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 14 }} /><Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>{businessArtData.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />))}</Bar></BarChart></ResponsiveContainer></div><div className="mt-4 pt-4 border-t border-slate-300/70 dark:border-slate-700/50 grid grid-cols-3 gap-2 text-center"><div><p className="text-xl font-bold text-slate-900 dark:text-white">$12.8k</p><p className="text-xs text-slate-600 dark:text-slate-400">Revenue</p></div><div><p className="text-xl font-bold text-slate-900 dark:text-white">347</p><p className="text-xs text-slate-600 dark:text-slate-400">Orders</p></div><div><p className="text-xl font-bold text-slate-900 dark:text-white">96%</p><p className="text-xs text-slate-600 dark:text-slate-400">Health</p></div></div></GlassPane></motion.div>)};
const StrategicCommandCard = ({ variants  }: any) => ( <motion.div variants={variants}><GlassPane className="p-6 h-full relative"><BorderBeam /><div className="relative z-10"><h2 className="text-xl font-bold text-amber-600 dark:text-amber-300 mb-4 flex items-center gap-2"><AlertIcon/> Strategic Command Center</h2><div className="space-y-4"><p className="font-bold text-slate-900 dark:text-white">VIRAL ALERT: Video #xyz789</p><p className="text-2xl font-bold text-slate-900 dark:text-white">+ $8,921 in 6h (347 orders)</p><p className="text-md text-slate-600 dark:text-slate-300">Market Share: +2.3% today</p><div className="pt-2 flex flex-col sm:flex-row gap-4"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold py-2 px-5 rounded-lg w-full">Strategic Response</motion.button><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-transparent border border-slate-500/50 dark:border-slate-600 font-bold py-2 px-5 rounded-lg w-full hover:bg-slate-500/20 dark:hover:bg-slate-700/50 transition-colors">Scale Up</motion.button></div></div></div></GlassPane></motion.div>);
const AutomationLiberationCard = ({ variants  }: any) => (<motion.div variants={variants}><GlassPane className="p-6 h-full flex flex-col justify-between"><h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Automation Liberation</h2><div className="space-y-4"><div className="flex items-center gap-3"><ClockIcon /><div><p className="text-2xl font-bold text-slate-900 dark:text-white">47 hours saved</p><p className="text-sm text-slate-600 dark:text-slate-400">this month</p></div></div><div className="flex items-center gap-3"><CheckCircleIcon /><div><p className="text-2xl font-bold text-slate-900 dark:text-white">89 orders processed</p><p className="text-sm text-slate-600 dark:text-slate-400">while you slept</p></div></div></div><div className="pt-4 mt-4 border-t border-slate-300/70 dark:border-slate-700/50"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-transparent border border-slate-500/50 dark:border-slate-600 font-bold py-2 px-5 rounded-lg hover:bg-slate-500/20 dark:hover:bg-slate-700/50 transition-colors">View Automation Health</motion.button></div></GlassPane></motion.div>);
const ExecutiveIntelligenceCard = ({ variants  }: any) => (<motion.div variants={variants}><GlassPane className="p-6 h-full flex flex-col justify-between"><h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Executive Intelligence</h2><div className="space-y-4"><div className="flex items-center gap-3"><TargetIcon /><div><p className="text-2xl font-bold text-slate-900 dark:text-white">$247 (+12%)</p><p className="text-sm text-slate-600 dark:text-slate-400">Customer LTV</p></div></div><div className="flex items-center gap-3"><GrowthIcon/><div><p className="text-2xl font-bold text-slate-900 dark:text-white">340%/yr</p><p className="text-sm text-slate-600 dark:text-slate-400">Growth Trajectory</p></div></div><div className="flex items-center gap-3"><StarIcon /><div><p className="text-2xl font-bold text-slate-900 dark:text-white">Next Opportunity</p><p className="text-sm text-teal-600 dark:text-teal-400">AI Rec: EU Market Expansion</p></div></div></div><div className="pt-4 mt-4 border-t border-slate-300/70 dark:border-slate-700/50"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold py-2 px-5 rounded-lg">Strategic Planning</motion.button></div></GlassPane></motion.div>);


// --- Core App Structure (Updated with Responsive Sidebar) ---
const Sidebar: React.FC<any> = ({ isCollapsed, isMobile, setMobileOpen  }: any) => {
    const NavLink = ({ icon, children  }: any) => (
        <a href="#" className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-300/60 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
            {icon}
            <AnimatePresence>
                {!isCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="font-semibold whitespace-nowrap">
                    {children}
                </motion.span>
                )}
            </AnimatePresence>
        </a>
    );

    const content = (
        <GlassPane className="h-full p-4 flex flex-col justify-between">
            <div>
                <div className={`flex items-center gap-3 mb-12 ${isCollapsed && !isMobile ? 'justify-center' : 'justify-start'}`}>
                     <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-tr from-teal-500 to-purple-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && <motion.h1 initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-xl font-bold text-slate-900 dark:text-white">CreatorFlow</motion.h1>}
                    </AnimatePresence>
                </div>
                <nav className="flex flex-col gap-3">
                    <NavLink icon={<DashboardIcon />}>Dashboard</NavLink>
                    <NavLink icon={<AutomationIcon />}>Automation</NavLink>
                    <NavLink icon={<IntelligenceIcon />}>Intelligence</NavLink>
                </nav>
            </div>
             <div className={`flex items-center gap-3 border-t border-slate-300/70 dark:border-slate-700/50 pt-4 ${isCollapsed && !isMobile ? 'justify-center' : 'justify-start'}`}>
                <img className="h-10 w-10 flex-shrink-0 rounded-full object-cover" src="https://placehold.co/100x100/8466D3/FFFFFF?text=C" alt="Creator Avatar" />
                <AnimatePresence>
                   {!isCollapsed && (
                       <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                            <p className="font-bold text-slate-900 dark:text-white">@ceo</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Creator Tier</p>
                       </motion.div>
                   )}
                </AnimatePresence>
            </div>
        </GlassPane>
    );

    if (isMobile) {
        return (
             <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-y-0 left-0 z-50 w-64 h-screen p-4"
                onClick={() => setMobileOpen(false)}
            >
                {content}
            </motion.div>
        )
    }

    return (
         <motion.aside
            animate={{ width: isCollapsed ? 88 : 256 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full"
        >
            {content}
        </motion.aside>
    )
};

const Header: React.FC<any> = ({ setMobileOpen, isMobile  }: any) => {
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex justify-between items-center">
             <div className="flex items-center gap-4">
                {isMobile && <button onClick={() => setMobileOpen(true)}><MenuIcon/></button>}
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">CEO Dashboard</h1>
                    <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400">At-a-glance command center.</p>
                </div>
             </div>
             <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-10 w-10 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center backdrop-blur-sm">
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
        </div>
    );
};

const AppContent = () => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false); // Default to expanded on desktop
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsSidebarCollapsed(isMobile ? false : true);
    }, [isMobile]);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };
  
    return (
        <div className="bg-slate-100 dark:bg-[#0A090F] min-h-screen text-slate-900 dark:text-slate-200 font-sans flex flex-col lg:flex-row p-4 gap-4 h-screen overflow-hidden">
            <AnimatePresence>
            {isMobile && isMobileMenuOpen && (
                 <>
                    <Sidebar isCollapsed={false} isMobile={true} setMobileOpen={setMobileMenuOpen} />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                 </>
            )}
            </AnimatePresence>

            {!isMobile && (
                 <div className="relative flex-shrink-0">
                    <Sidebar isCollapsed={isSidebarCollapsed} isMobile={false} />
                     <button 
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
                        className="absolute -right-3 top-[50%] -translate-y-1/2 h-8 w-8 bg-slate-200 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 backdrop-blur-sm"
                    >
                        <motion.div animate={{ rotate: isSidebarCollapsed ? 180 : 0 }}>
                            <ChevronLeftIcon />
                        </motion.div>
                    </button>
                 </div>
            )}
            
            <main className="flex-1 flex flex-col overflow-auto">
                <Header setMobileOpen={setMobileMenuOpen} isMobile={isMobile}/>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 flex-grow py-6"
                >
                    {/* Responsive Grid Layout */}
                    <div className="lg:col-span-1 xl:col-span-1"> <KpiCard title="Revenue Flow" value="$12,847" change="+23% vs last week" icon={<RevenueIcon/>} variants={itemVariants} /></div>
                    <div className="lg:col-span-1 xl:col-span-1"> <KpiCard title="Growth Trajectory" value="347 Orders" change="+12% vs last week" icon={<OrdersIcon/>} variants={itemVariants} /></div>
                    <div className="lg:col-span-1 xl:col-span-1"> <KpiCard title="Profit Landscape" value="$8,921" change="48% Margin" icon={<MarginIcon/>} variants={itemVariants} /></div>
                    <div className="lg:col-span-1 xl:col-span-1"> <KpiCard title="Automation Health" value="96%" change="All systems green" icon={<HealthIcon/>} variants={itemVariants} /></div>
                    
                    <div className="lg:col-span-2 xl:col-span-2 xl:row-span-2">
                         <StrategicCommandCard variants={itemVariants} />
                    </div>
                    <div className="lg:col-span-2 xl:col-span-2 xl:row-span-2">
                        <BusinessArtCard variants={itemVariants} />
                    </div>
                     <div className="lg:col-span-2 xl:col-span-2">
                        <AutomationLiberationCard variants={itemVariants} />
                    </div>
                    <div className="lg:col-span-2 xl:col-span-2">
                       <ExecutiveIntelligenceCard variants={itemVariants} />
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default function App(): React.JSX.Element {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

