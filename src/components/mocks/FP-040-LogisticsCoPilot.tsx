import { AnimatePresence,motion } from 'framer-motion';
import { Moon, Package, Sun, X,Zap } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- SVG Icons for Carriers (replaces react-icons dependency) ---
const UpsIcon = ({ size = 48  }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V8L12 3L3 8Z" fill="#351C15"/>
        <text x="12" y="15" fontFamily="Arial, sans-serif" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">UPS</text>
    </svg>
);
const FedexIcon = ({ size = 48  }: any) => (
     <svg width={size} height={size} viewBox="0 0 100 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="5" y="45" fontFamily="Arial, sans-serif" fontSize="40" fill="#4d148c" fontWeight="bold">Fed</text>
        <text x="50" y="45" fontFamily="Arial, sans-serif" fontSize="40" fill="#FF6600" fontWeight="bold">Ex</text>
    </svg>
);
const DhlIcon = ({ size = 48  }: any) => (
    <svg width={size} height={size*0.6} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="60" fill="#ffcc00" rx="10"/>
        <text x="50" y="42" fontFamily="Arial, sans-serif" fontSize="32" fill="#D40511" textAnchor="middle" fontWeight="bold" fontStyle="italic">DHL</text>
    </svg>
);


// --- Configuration & Theming ---
const darkTheme = {
    background: '#0A090F',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    glassBg: 'bg-black/20',
    border: 'border-slate-100/10',
    sparkColor: '#2DD4BF',
    chaosColor: 'rgba(255, 255, 255, 0.1)',
    savingsBg: 'bg-green-500/20',
    savingsText: 'text-green-300',
};

const lightTheme = {
    background: 'linear-gradient(180deg, #f5f3ff 0%, #fafafa 100%)',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    glassBg: 'bg-white/40',
    border: 'border-slate-900/10',
    sparkColor: '#0d9488',
    chaosColor: 'rgba(30, 41, 59, 0.1)',
    savingsBg: 'bg-green-100',
    savingsText: 'text-green-800',
};

// --- Data ---
const carriers = [
    { id: 'ups', Icon: UpsIcon, name: 'UPS' },
    { id: 'fedex', Icon: FedexIcon, name: 'FedEx' },
    { id: 'dhl', Icon: DhlIcon, name: 'DHL' },
];
const optimalCarrierId = 'fedex';

// --- Main Demo Component ---
export default function App(): React.JSX.Element {
    const [theme, setTheme] = useState<string>('dark');
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    return (
        <div className="font-sans" style={{ background: currentTheme.background, color: currentTheme.textPrimary }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display.swap');
                body { font-family: 'Inter', sans-serif; }
            `}</style>
            <FP040LogisticsCoPilot theme={currentTheme} />
            <ThemeToggleButton currentTheme={theme} setTheme={setTheme} />
        </div>
    );
}

// --- The Definitive FP-040 "The Optimal Route" ---
const FP040LogisticsCoPilot: React.FC<any> = ({ theme  }: any) => {
    const [state, setState] = useState<string>('idle'); // idle -> calculating -> revealed

    const handleFindRoute = () => {
        setState('calculating');
        setTimeout(() => setState('revealed'), 1500);
    };

    const handleReset = () => {
        setState('idle');
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <div className="text-center">
                 <h2 className={`text-6xl font-black md:text-8xl ${theme.textPrimary}`}>The Logistics Co-Pilot.</h2>
                 <p className={`mx-auto mt-4 max-w-3xl text-lg ${theme.textSecondary}`}>
                     Our AI Rate Shopping Engine analyzes millions of variables to find the single most optimal shipping route for every order. Stop guessing.
                 </p>
            </div>

            <div className="relative mt-16 h-[500px] w-full max-w-3xl" style={{ perspective: '1500px' }}>
                <PackageNode />
                <CarrierNodes state={state} theme={theme} />
                <PathCanvas state={state} theme={theme} />
                <AnimatePresence>
                    {state === 'revealed' && <ResultTooltip theme={theme} onReset={handleReset} />}
                </AnimatePresence>
            </div>
            
            <div className="mt-8 h-14">
                 <AnimatePresence mode="wait">
                    {state === 'idle' && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={handleFindRoute}
                            className={`flex items-center gap-3 rounded-lg bg-indigo-500 px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-indigo-600`}
                        >
                            <Zap size={20} />
                            Find Optimal Route
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Interactive Sub-Components ---

const PackageNode = () => (
    <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, z: 200 }}
        animate={{ opacity: 1, z: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
    >
        <Package size={64} className="text-amber-500" />
    </motion.div>
);

const CarrierNodes = ({ state, theme  }: any) => (
    <div className="absolute bottom-0 flex w-full justify-around">
        {carriers.map(carrier => (
            <motion.div
                key={carrier.id}
                animate={{
                    opacity: state === 'revealed' && carrier.id !== optimalCarrierId ? 0.3 : 1,
                    scale: state === 'revealed' && carrier.id === optimalCarrierId ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col items-center gap-2 rounded-lg p-4`}
            >
                <carrier.Icon />
                <span className={`text-sm font-bold ${theme.textSecondary}`}>{carrier.name}</span>
            </motion.div>
        ))}
    </div>
);

const PathCanvas = ({ state, theme  }: any) => (
    <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {/* Tangled Paths */}
        <AnimatePresence>
        {state !== 'revealed' && (
            <motion.g
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <path d="M 50% 64 C 20% 150, 80% 250, 16.67% 450" stroke={theme.chaosColor} strokeWidth="2" fill="none"/>
                <path d="M 50% 64 C 30% 200, 70% 300, 50% 450" stroke={theme.chaosColor} strokeWidth="2" fill="none"/>
                <path d="M 50% 64 C 80% 150, 20% 250, 83.33% 450" stroke={theme.chaosColor} strokeWidth="2" fill="none"/>
            </motion.g>
        )}
        </AnimatePresence>
        
        {/* Calculating Pulses */}
        <AnimatePresence>
        {state === 'calculating' && (
            <motion.path
                d="M 50% 64 C 30% 200, 70% 300, 50% 450"
                stroke={theme.sparkColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
            />
        )}
        </AnimatePresence>
        
        {/* Optimal Path */}
        <AnimatePresence>
        {state === 'revealed' && (
             <motion.path
                d="M 50% 64 C 30% 200, 70% 300, 50% 450"
                stroke={theme.sparkColor}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ filter: `drop-shadow(0 0 8px ${theme.sparkColor})`}}
            />
        )}
        </AnimatePresence>
    </svg>
);


const ResultTooltip = ({ theme, onReset  }: any) => (
    <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl border p-4 backdrop-blur-md ${theme.glassBg} ${theme.border}`}
    >
        <motion.button 
            onClick={onReset} 
            className={`absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full border ${theme.border} ${theme.glassBg}`}
            whileHover={{ scale: 1.1, rotate: 90 }}
        >
            <X size={16} className={theme.textPrimary} />
        </motion.button>

        <div className="text-center">
            <h4 className={`font-bold text-lg ${theme.textPrimary}`}>Optimal Route Found</h4>
            <div className="mt-3 flex items-center justify-center gap-2">
                <FedexIcon size={36} />
                <span className={`font-bold ${theme.textPrimary}`}>FedEx Ground</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className={`rounded p-2 ${theme === lightTheme ? 'bg-black/5' : 'bg-black/10'}`}>
                    <span className={`block text-xs ${theme.textSecondary}`}>Cost</span>
                    <span className={`font-bold ${theme.textPrimary}`}>$8.72</span>
                </div>
                 <div className={`rounded p-2 ${theme.savingsBg}`}>
                    <span className={`block text-xs ${theme.savingsText} font-semibold`}>Savings</span>
                    <span className={`font-bold ${theme.savingsText}`}>$3.15 (26%)</span>
                </div>
            </div>
        </div>
    </motion.div>
);


// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ currentTheme, setTheme  }: any) => (
    <motion.button onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} className={`fixed top-4 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl border ${currentTheme === 'dark' ? 'bg-white/5 border-slate-100/10 text-slate-200' : 'bg-slate-800/5 border-slate-900/10 text-slate-800'}`} aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={currentTheme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);

