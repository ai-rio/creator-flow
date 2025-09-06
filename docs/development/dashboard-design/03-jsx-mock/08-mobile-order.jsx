import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// --- Theme Context & Provider ---
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// --- HIGH-QUALITY ICONS ---
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const ViralIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const AutoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ShippedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 16h2a2 2 0 002-2V6a2 2 0 00-2-2h-1" /></svg>;

// --- Helper Components ---
const GlassPane = React.forwardRef(({ children, className }, ref) => ( <div ref={ref} className={`relative rounded-2xl border bg-white/80 dark:bg-black/20 border-slate-300 dark:border-white/10 backdrop-blur-xl transition-all duration-300 ${className}`}>{children}</div>));

// --- MOCK DATA ---
const mockOrders = [
    { id: '#TT12001', source: 'viral', customer: '@tiktoker123', product: 'iPhone Case', value: 67.99, status: 'Auto-Processing', statusIcon: <AutoIcon /> },
    { id: '#TT12002', source: 'high_priority', customer: '@creator_pro', product: 'Phone Grip', value: 124.50, status: 'Shipped', statusIcon: <ShippedIcon /> },
    { id: '#TT12003', source: 'standard', customer: '@steady_seller', product: 'Ring Light', value: 89.99, status: 'Shipped', statusIcon: <ShippedIcon /> },
    { id: '#TT12004', source: 'viral', customer: '@auto_winner', product: 'Creator T-Shirt', value: 156.00, status: 'Auto-Processing', statusIcon: <AutoIcon /> },
    { id: '#TT12005', source: 'standard', customer: '@new_customer', product: 'Sticker Pack', value: 19.99, status: 'Shipped', statusIcon: <ShippedIcon /> },
    { id: '#TT12006', source: 'viral', customer: '@another_viral', product: 'iPhone Case', value: 67.99, status: 'Auto-Processing', statusIcon: <AutoIcon /> },
    { id: '#TT12007', source: 'standard', customer: '@regular_buy', product: 'Phone Grip', value: 124.50, status: 'Shipped', statusIcon: <ShippedIcon /> },
];

// --- Order Item Component with Swipe Gesture ---
const OrderItem = ({ order }) => {
    const x = useMotionValue(0);
    const background = useTransform(x, [-100, 0, 100], ["#ef4444", "#334155", "#22c55e"]);
    
    return (
        <div className="relative">
            <motion.div style={{ background }} className="absolute inset-0 rounded-2xl flex justify-between items-center px-8 text-white font-bold">
                 <span className="opacity-50">Cancel</span>
                 <span className="opacity-50">Approve</span>
            </motion.div>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ x }}
                className="relative z-10"
            >
                <GlassPane className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                {order.source === 'viral' && <ViralIcon />}
                                <p className="font-bold text-lg text-slate-900 dark:text-white">{order.id}</p>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{order.customer} • {order.product}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-slate-900 dark:text-white">${order.value.toFixed(2)}</p>
                            <div className="flex items-center gap-1.5 justify-end mt-1">
                                {order.statusIcon}
                                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{order.status}</p>
                            </div>
                        </div>
                    </div>
                     <div className="mt-4 flex gap-2">
                        <button className="text-xs w-full bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-bold py-2 px-3 rounded-lg">CEO Override</button>
                        <button className="text-xs w-full bg-transparent border border-slate-500/50 dark:border-slate-600 font-bold py-2 px-3 rounded-lg">View Journey</button>
                    </div>
                </GlassPane>
            </motion.div>
        </div>
    );
};

// --- DEMO APP ---
function AppContent() {
    const [activeFilter, setActiveFilter] = useState('Strategic');
    const { theme, setTheme } = useTheme();

    const FilterButton = ({ label }) => (
        <button 
            onClick={() => setActiveFilter(label)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors 
                ${activeFilter === label 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700/50'}`
            }
        >
            {label}
        </button>
    );

    return (
        <div className="bg-slate-100 dark:bg-[#0A090F] h-screen w-screen font-sans flex flex-col p-4">
            {/* Sticky Header */}
            <div className="flex-shrink-0">
                <GlassPane className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <BackIcon className="text-slate-800 dark:text-slate-200"/>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Order Symphony</h1>
                                <p className="text-sm text-slate-600 dark:text-slate-400">347 Total Orders</p>
                            </div>
                        </div>
                        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-10 w-10 bg-slate-200/80 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center backdrop-blur-sm">
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>
                     <div className="relative flex items-center mb-2">
                        <SearchIcon className="absolute left-3 w-5 h-5 text-slate-500 dark:text-slate-400" />
                        <input type="text" placeholder="Search by Order ID, Customer, Product..." className="w-full bg-slate-200/80 dark:bg-slate-800/50 border-none pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-slate-900 dark:text-white" />
                    </div>
                     <div className="flex justify-around items-center pt-2">
                        <FilterButton label="Strategic" />
                        <FilterButton label="Urgent" />
                        <FilterButton label="Automated" />
                        <FilterButton label="⚠️" />
                    </div>
                </GlassPane>
            </div>
            
            {/* Scrollable Order List */}
            <div className="flex-grow overflow-auto mt-4 pr-1">
                 <div className="space-y-4">
                    {mockOrders.map(order => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

