import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scaling, ShieldCheck, Binary, Zap, Sun, Moon } from 'lucide-react';

// --- Configuration & Theming ---
const darkTheme = {
    background: '#0A090F',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    glassBg: 'bg-black/20',
    border: 'border-slate-100/10',
    prismGradient: 'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.15), transparent 70%)',
    beamColor: '#2DD4BF',
    beamGradient: 'linear-gradient(90deg, #2DD4BF 0%, #8b5cf6 100%)',
    glyphBg: 'bg-slate-500/5',
};

const lightTheme = {
    background: 'linear-gradient(180deg, #f5f3ff 0%, #fafafa 100%)',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    glassBg: 'bg-white/60', // Increased opacity
    border: 'border-slate-300', // Strengthened, solid border
    prismGradient: 'radial-gradient(circle at 50% 50%, rgba(6, 95, 70, 0.2), transparent 70%)', // More vibrant
    beamColor: '#065f46', 
    beamGradient: 'linear-gradient(90deg, #065f46 0%, #5b21b6 100%)',
    glyphBg: 'bg-white/50', // More substantial background
};

// --- Architectural Principles Data ---
const principles = [
    {
        id: 'scalability',
        Icon: Scaling,
        title: 'Scalability',
        description: 'Engineered for 10x viral spikes. Our systems anticipate your success, ensuring you never miss an order.',
        position: { angle: -45, distance: 160 },
    },
    {
        id: 'reliability',
        Icon: ShieldCheck,
        title: 'Reliability',
        description: 'Built on enterprise-grade infrastructure. We provide the stability you need to build a lasting business.',
        position: { angle: 45, distance: 160 },
    },
    {
        id: 'clarity',
        Icon: Binary,
        title: 'Clarity',
        description: 'We transform operational complexity into actionable wisdom, giving you a clear view of your entire business.',
        position: { angle: 135, distance: 160 },
    },
    {
        id: 'velocity',
        Icon: Zap,
        title: 'Velocity',
        description: 'Automate repetitive tasks and accelerate your fulfillment process, freeing you to focus on growth.',
        position: { angle: 225, distance: 160 },
    },
];

// --- Main Hero Component ---
export default function AP010Hero() {
    const [theme, setTheme] = useState('dark');
    const [activePrinciple, setActivePrinciple] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    const activePrincipleData = principles.find(p => p.id === activePrinciple);

    return (
        <div style={{ background: currentTheme.background }} className="font-sans antialiased">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display.swap');`}</style>
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <h1 className={`text-6xl font-black md:text-8xl ${currentTheme.textPrimary}`}>
                        The Architects of Scale.
                    </h1>
                    <p className={`mx-auto mt-4 max-w-3xl text-lg md:text-xl ${currentTheme.textSecondary}`}>
                        We built the definitive command structure for one reason: to ensure your viral moment becomes a lasting enterprise, not an operational collapse.
                    </p>
                </motion.div>

                <div 
                    className="relative mt-24 flex h-96 w-96 items-center justify-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => { setIsHovered(false); setActivePrinciple(null); }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: currentTheme.prismGradient }}
                        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    
                    <ArchitectPrism isHovered={isHovered} theme={currentTheme} />
                    
                    <AnimatePresence>
                    {isHovered && principles.map((principle) => (
                        <PrincipleNode
                            key={principle.id}
                            principle={principle}
                            onHoverStart={() => setActivePrinciple(principle.id)}
                            theme={currentTheme}
                        />
                    ))}
                    </AnimatePresence>

                    <AnimatePresence>
                        {activePrincipleData && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className={`pointer-events-none absolute z-20 w-64 rounded-xl border p-4 text-left backdrop-blur-md ${currentTheme.glassBg} ${currentTheme.border}`}
                            >
                                <div className="flex items-center gap-3">
                                    <activePrincipleData.Icon className={`h-5 w-5 ${currentTheme.textPrimary}`} />
                                    <h3 className={`font-bold ${currentTheme.textPrimary}`}>{activePrincipleData.title}</h3>
                                </div>
                                <p className={`mt-2 text-sm ${currentTheme.textSecondary}`}>{activePrincipleData.description}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// --- Sub-Components ---

const ArchitectPrism = ({ isHovered, theme }) => (
    <motion.div 
        className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-3xl border backdrop-blur-lg ${theme.glassBg} ${theme.border}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    >
        <motion.div 
            className="absolute h-full w-full rounded-3xl opacity-50"
            style={{background: theme.beamGradient}}
            animate={{ rotate: -720 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
            className="h-16 w-16"
            animate={{ scale: isHovered ? 1.1 : 1, transition: { type: 'spring', stiffness: 300 } }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path d="M50 2 L98 50 L50 98 L2 50 Z" stroke={theme.beamColor} strokeWidth="4" 
                    animate={{ scale: [1, 1.05, 1], rotate: isHovered ? 45 : 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                 <motion.path d="M25 25 L75 25 L75 75 L25 75 Z" stroke={theme.beamColor} strokeWidth="2"
                    animate={{ scale: [1, 0.95, 1], rotate: isHovered ? -45 : 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                />
            </svg>
        </motion.div>
    </motion.div>
);

const PrincipleNode = ({ principle, onHoverStart, theme }) => {
    const { angle, distance } = principle.position;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    return (
        <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            onHoverStart={onHoverStart}
        >
            <motion.div 
                whileHover={{ scale: 1.2 }}
                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border ${theme.border} ${theme.glyphBg}`}
            >
                <principle.Icon className={`h-6 w-6 ${theme.textPrimary}`} />
            </motion.div>
        </motion.div>
    );
};


const ThemeToggleButton = ({ theme, setTheme }) => {
    const buttonClasses = theme === 'dark' ? "bg-white/5 border-slate-100/10 text-slate-200" : "bg-slate-800/5 border-slate-300 text-slate-800";
    return (
        <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`fixed bottom-4 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl border ${buttonClasses}`}
            aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

