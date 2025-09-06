'use client';

import * as React from 'react';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


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

// --- HIGH-QUALITY ICONS ---
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const RevenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;

// --- Helper Components ---
const GlassPane = React.forwardRef<any, any>(({ children, className }: any, ref: any) => (
    <div ref={ref} className={`relative rounded-2xl border bg-slate-200/50 dark:bg-black/20 border-slate-300/50 dark:border-white/10 backdrop-blur-xl transition-all duration-300 ${className}`}>
        {children}
    </div>
));


// --- ONBOARDING TOUR COMPONENTS ---
const OnboardingTour: React.FC<any> = ({ tourSteps, active, setActiveStep, onFinish  }: any) => {
    const [targetRect, setTargetRect] = useState<any>(null);
    const activeStep = tourSteps[active];

    const handleNext = () => {
        if (active < tourSteps.length - 1) {
            setActiveStep(active + 1);
        } else {
            onFinish();
        }
    };

    const handleBack = () => {
        if (active > 0) {
            setActiveStep(active - 1);
        }
    };

    // --- NEW: Keyboard Navigation Effect ---
    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (!activeStep) return;

            switch (e.key) {
                case "ArrowRight":
                    handleNext();
                    break;
                case "ArrowLeft":
                    handleBack();
                    break;
                case "Enter":
                    handleNext();
                    break;
                case "Escape":
                    onFinish();
                    break;
                default:
                    break;
            }
        };

        if (active > -1) {
            window.addEventListener('keydown', handleKeyDown);
        }

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [active, activeStep, onFinish]);


    useEffect(() => {
        if (activeStep && activeStep.targetRef.current) {
            const rect = activeStep.targetRef.current.getBoundingClientRect();
            setTargetRect(rect);
        } else {
            setTargetRect(null);
        }
    }, [active, activeStep]);
    
    return (
        <AnimatePresence>
            {activeStep && targetRect && (
                <motion.div
                    className="fixed inset-0 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Spotlight Backdrop */}
                    <svg className="absolute inset-0 w-full h-full">
                        <defs>
                            <mask id="spotlight-mask">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                <motion.rect
                                    x={targetRect.left - 12}
                                    y={targetRect.top - 12}
                                    width={targetRect.width + 24}
                                    height={targetRect.height + 24}
                                    rx="20"
                                    fill="black"
                                    animate={{ 
                                        x: targetRect.left - 12,
                                        y: targetRect.top - 12,
                                        width: targetRect.width + 24,
                                        height: targetRect.height + 24
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            </mask>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.7)" mask="url(#spotlight-mask)" />
                    </svg>

                    {/* Tooltip Pod */}
                    <motion.div
                        animate={{ 
                            top: targetRect.top + targetRect.height + 20, 
                            left: targetRect.left + targetRect.width / 2 
                        }}
                        initial={{
                             top: targetRect.top + targetRect.height + 20, 
                             left: targetRect.left + targetRect.width / 2
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute -translate-x-1/2"
                    >
                         <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                         >
                            <GlassPane className="w-80 p-4">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{activeStep.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{activeStep.content}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{active + 1} / {tourSteps.length}</span>
                                    <div className="flex gap-2">
                                        {active > 0 && <button onClick={handleBack} className="text-sm font-semibold text-slate-600 dark:text-slate-400 px-3 py-1 rounded-md hover:bg-slate-300/50 dark:hover:bg-slate-700/50">Back</button>}
                                        <button onClick={handleNext} className="text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-1.5 rounded-md">{active === tourSteps.length - 1 ? 'Finish' : 'Next'}</button>
                                    </div>
                                </div>
                            </GlassPane>
                         </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- DEMO APP ---
function AppContent() {
    const [tourActive, setTourActive] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(0);
    const { theme, setTheme } = useTheme();

    const kpiRef = useRef(null);
    const crisisRef = useRef(null);
    const masterpieceRef = useRef(null);

    const tourSteps = [
        {
            targetRef: kpiRef,
            title: "Your At-a-Glance KPIs",
            content: "This top row gives you an instant, CEO-level overview of your business's core vital signs. Track revenue, orders, and more in real-time."
        },
        {
            targetRef: crisisRef,
            title: "The Crisis Command Center",
            content: "When a piece of content goes viral, this module activates. It's your dedicated hub for managing high-urgency threats and opportunities."
        },
        {
            targetRef: masterpieceRef,
            title: "The Revenue Masterpiece",
            content: "This is where data becomes art. Dive deep into your financial trends, uncover insights, and make the strategic decisions that will define your growth."
        }
    ];

    const startTour = () => {
        setActiveStep(0);
        setTourActive(true);
    };

    const finishTour = () => {
        setTourActive(false);
        // Set active to -1 to ensure the component unmounts and cleans up listeners
        setActiveStep(-1);
    };

    // Static placeholder components for the demo stage
    const KpiCard = ({ title, value, icon, refProp  }: any) => (<GlassPane ref={refProp} className="p-4"><div className="flex justify-between items-start"><div className="flex flex-col"><p className="text-sm text-slate-600 dark:text-slate-400">{title}</p><p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p></div><div className="text-slate-500 dark:text-slate-400">{icon}</div></div></GlassPane>);
    const CrisisCard = ({ refProp  }: any) => (<GlassPane ref={refProp} className="p-6 h-full"><h2 className="text-xl font-bold text-amber-600 dark:text-amber-300 mb-4 flex items-center gap-2"><AlertIcon/> Crisis Command</h2><p className="text-slate-600 dark:text-slate-400">This is where you manage viral events...</p></GlassPane>);
    const MasterpieceCard = ({ refProp  }: any) => (<GlassPane ref={refProp} className="p-6 h-full"><h2 className="text-xl font-bold text-slate-900 dark:text-white">Revenue Masterpiece</h2><p className="text-slate-600 dark:text-slate-400">Your interactive financial landscape...</p></GlassPane>);

    return (
        <div className="bg-slate-100 dark:bg-[#0A090F] min-h-screen text-slate-900 dark:text-slate-200 font-sans p-8">
             <div className="absolute top-6 right-6 z-10">
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-10 w-10 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Onboarding Tour System</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">A cinematic first-flight experience for the CEO.</p>
                 <button onClick={startTour} className="mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg">
                    {tourActive ? "Restart Tour" : "Start Tour"}
                </button>
            </div>
            
            {/* The Stage */}
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KpiCard title="Revenue Flow" value="$12,847" icon={<RevenueIcon/>} refProp={kpiRef} />
                    <div className="hidden sm:block"><KpiCard title="Growth" value="347 Orders" icon={<RevenueIcon/>}/></div>
                    <div className="hidden lg:block"><KpiCard title="Profit" value="$8,921" icon={<RevenueIcon/>}/></div>
                     <div className="hidden lg:block"><KpiCard title="Health" value="96%" icon={<RevenueIcon/>}/></div>
                </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-64">
                    <CrisisCard refProp={crisisRef}/>
                    <MasterpieceCard refProp={masterpieceRef}/>
                </div>
            </div>

            <OnboardingTour
                active={tourActive ? activeStep : -1}
                setActiveStep={setActiveStep}
                tourSteps={tourSteps}
                onFinish={finishTour}
            />
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

