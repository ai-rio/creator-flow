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
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;

// --- Helper Components ---
const GlassPane: React.FC<any> = ({ children, className  }) => ( <div className={`relative rounded-2xl border bg-slate-200/50 dark:bg-black/20 border-slate-300/50 dark:border-white/10 backdrop-blur-xl transition-all duration-300 ${className}`}>{children}</div>);
const BorderBeam: React.FC<any> = ({ className  }) => (<div className={`absolute inset-0 rounded-2xl overflow-hidden pointer-events-none ${className}`}><motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }} /><motion.div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-red-500 to-transparent" initial={{ y: "-100%" }} animate={{ y: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }} /><motion.div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-red-500 to-transparent" initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2.5 }} /><motion.div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-t from-transparent via-red-500 to-transparent" initial={{ y: "100%" }} animate={{ y: "-100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 3.5 }} /></div>);

// --- Core Modal Component ---
const ConfirmationModal = ({ isOpen, onClose, config }) => {
    const { 
        title, 
        message, 
        confirmText = "Confirm", 
        cancelText = "Cancel",
        onConfirm,
        type = "standard", // "standard" or "destructive"
        frictionText // The word to type for destructive actions
    } = config;

    const [inputValue, setinputValue] = useState<any>("");
    const isConfirmationDisabled = type === "destructive" && inputValue !== frictionText;

    useEffect(() => {
        // Reset input when modal opens for a fresh state
        if (isOpen) {
            setInputValue("");
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    {/* Backdrop */}
                    <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                    
                    {/* Modal Pane */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <GlassPane className="relative w-full max-w-md p-6">
                            {type === "destructive" && <BorderBeam />}
                            <div className="flex items-start gap-4">
                                {type === "destructive" && (
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 text-red-500">
                                        <AlertTriangleIcon />
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{message}</p>
                                </div>
                            </div>

                            {type === "destructive" && (
                                <div className="mt-4">
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">To confirm, please type &quot;<span className="font-bold">{frictionText}</span>&quot; in the box below.</p>
                                    <input 
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-400/50 dark:border-slate-700/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                                    />
                                </div>
                            )}

                            <div className="mt-6 flex justify-end gap-4">
                                <motion.button 
                                    onClick={onClose}
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    className="bg-transparent border border-slate-500/50 dark:border-slate-600 font-bold py-2 px-5 rounded-lg hover:bg-slate-500/20 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    {cancelText}
                                </motion.button>
                                <motion.button
                                    onClick={onConfirm}
                                    disabled={isConfirmationDisabled}
                                    whileHover={{ scale: isConfirmationDisabled ? 1 : 1.05 }} 
                                    whileTap={{ scale: isConfirmationDisabled ? 1 : 0.95 }}
                                    className={`font-bold py-2 px-5 rounded-lg transition-colors
                                        ${type === "destructive" ? 'bg-red-600 text-white' : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'}
                                        ${isConfirmationDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700 dark:hover:bg-slate-200'}
                                    `}
                                >
                                    {confirmText}
                                </motion.button>
                            </div>
                        </GlassPane>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// --- DEMO APP ---
function AppContent() {
    const [standardModalOpen, setstandardModalOpen] = useState<any>(false);
    const [destructiveModalOpen, setdestructiveModalOpen] = useState<any>(false);
    const { theme, setTheme } = useTheme();

    const standardConfig = {
        title: "Deploy New Automation?",
        message: "This will activate the 'Auto-Fulfill High-Priority Orders' workflow. This action can be reversed later from the automation dashboard.",
        confirmText: "Activate Workflow",
        onConfirm: () => {
            console.log("Standard action confirmed");
            setStandardModalOpen(false);
        }
    };

    const destructiveConfig = {
        title: "Permanently Delete Project?",
        message: "This action is irreversible. All associated data, including orders, analytics, and automation logs for 'Project Phoenix' will be permanently erased.",
        confirmText: "Delete Project",
        type: "destructive",
        frictionText: "DELETE",
        onConfirm: () => {
            console.log("Destructive action confirmed");
            setDestructiveModalOpen(false);
        }
    };

    return (
        <div className="bg-slate-100 dark:bg-[#0A090F] min-h-screen text-slate-900 dark:text-slate-200 font-sans flex items-center justify-center relative">
            <div className="absolute top-6 right-6">
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-10 w-10 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>

            <GlassPane className="p-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Confirmation Modal System</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">High-stakes decision-making for the modern CEO.</p>
                <div className="mt-8 flex gap-4">
                    <motion.button onClick={() => setStandardModalOpen(true)} whileHover={{scale: 1.05}} className="bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-bold py-3 px-6 rounded-lg">Trigger Standard Modal</motion.button>
                    <motion.button onClick={() => setDestructiveModalOpen(true)} whileHover={{scale: 1.05}} className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg">Trigger Destructive Modal</motion.button>
                </div>
            </GlassPane>
            
            <ConfirmationModal isOpen={standardModalOpen} onClose={() => setStandardModalOpen(false)} config={standardConfig} />
            <ConfirmationModal isOpen={destructiveModalOpen} onClose={() => setDestructiveModalOpen(false)} config={destructiveConfig} />
        </div>
    );
}

export default function App(): React.JSX.Element {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

