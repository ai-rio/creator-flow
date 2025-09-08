import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}


import { AnimatePresence,motion } from 'framer-motion';

// --- Theme Context & Provider ---
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
    const [theme, settheme] = useState<any>('dark');
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// --- HIGH-QUALITY ICONS ---
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const HealthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IntelligenceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707-.707m12.728 10.607l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;

// --- Helper Components ---
const GlassPane: React.FC<any> = ({ children, className  }) => ( <div className={`relative rounded-2xl border bg-slate-200/50 dark:bg-black/20 border-slate-300/50 dark:border-white/10 backdrop-blur-xl transition-all duration-300 ${className}`}>{children}</div>);

// --- Core Header Component ---
const CEOHeader = () => {
    const [time, setTime] = useState(new Date());
    const [isProfileOpen, setisProfileOpen] = useState<any>(false);
    const [isActionsOpen, setisActionsOpen] = useState<any>(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const StatusIndicator: React.FC<any> = ({ icon, colorClass, pulse = false  }) => (
        <div className={`relative w-8 h-8 rounded-full flex items-center justify-center bg-slate-300/50 dark:bg-slate-800/50 border border-slate-400/50 dark:border-slate-700/50 text-${colorClass}-500 dark:text-${colorClass}-400`}>
            {pulse && <div className={`absolute inset-0 rounded-full bg-current opacity-50 animate-ping`}></div>}
            <div className="relative">{icon}</div>
        </div>
    );

    const DropdownMenuItem: React.FC<any> = ({ children  }) => (
        <a href="#" className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 rounded-md">
            {children}
        </a>
    );

    return (
        <GlassPane className="w-full p-4 flex items-center justify-between">
            {/* Left Side: Title & Time */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">CreatorFlow CEO Command Center</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">{formattedDate} • {formattedTime}</p>
            </div>

            {/* Center: Global Command Bar */}
            <div className="hidden lg:flex items-center gap-2 p-1 rounded-full bg-slate-300/50 dark:bg-slate-800/50 border border-slate-400/50 dark:border-slate-700/50">
                <div className="relative flex items-center">
                    <SearchIcon className="absolute left-3 w-5 h-5 text-slate-500 dark:text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Global Search (Orders, Products, Intel...)" 
                        className="w-96 bg-transparent pl-10 pr-4 py-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 text-slate-900 dark:text-white"
                    />
                </div>
                <div className="relative">
                     <motion.button 
                        onClick={() => setActionsOpen(!isActionsOpen)}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    >
                        <PlusIcon/>
                    </motion.button>
                     <AnimatePresence>
                        {isActionsOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full right-0 mt-2 w-48"
                            >
                                <GlassPane className="p-2">
                                    <DropdownMenuItem>New Report</DropdownMenuItem>
                                    <DropdownMenuItem>Create Workflow</DropdownMenuItem>
                                    <DropdownMenuItem>Add Team Member</DropdownMenuItem>
                                </GlassPane>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Side: Status & Profile */}
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                    <StatusIndicator icon={<AlertIcon/>} colorClass="amber" pulse={true}/>
                    <StatusIndicator icon={<HealthIcon/>} colorClass="teal"/>
                    <StatusIndicator icon={<IntelligenceIcon/>} colorClass="purple"/>
                </div>

                <div className="relative">
                    <motion.button 
                        onClick={() => setProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2"
                        whileTap={{ scale: 0.98 }}
                    >
                        <img className="h-10 w-10 rounded-full object-cover border-2 border-slate-400 dark:border-slate-600" src="https://placehold.co/100x100/8466D3/FFFFFF?text=C" alt="Creator Avatar" />
                        <div className="hidden md:block text-left">
                            <p className="font-bold text-slate-900 dark:text-white">@ceo</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Creator Tier</p>
                        </div>
                        <motion.div animate={{ rotate: isProfileOpen ? 180 : 0 }}>
                            <ChevronDownIcon className="text-slate-600 dark:text-slate-400"/>
                        </motion.div>
                    </motion.button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full right-0 mt-2 w-48"
                            >
                                <GlassPane className="p-2">
                                    <DropdownMenuItem>Account Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Billing & Subscription</DropdownMenuItem>
                                    <DropdownMenuItem>Help Center</DropdownMenuItem>
                                    <div className="my-1 h-px bg-slate-300/70 dark:bg-slate-700/50" />
                                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                                </GlassPane>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                 <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-10 w-10 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </GlassPane>
    );
};


// --- DEMO APP ---
export default function App(): React.JSX.Element {
    return (
        <ThemeProvider>
            <div className="bg-slate-100 dark:bg-[#0A090F] min-h-screen font-sans p-8">
                <div className="max-w-7xl mx-auto">
                    <CEOHeader />
                    <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Main Content Area</h2>
                        <p>This is a focused demonstration of the high-quality desktop header component.</p>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
