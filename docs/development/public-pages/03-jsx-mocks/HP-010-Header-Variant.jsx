import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Bolt, Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';

// --- Configuration & Theming ---
const brandColor = '#2DD4BF';
const darkTheme = {
    glassBg: 'rgba(0, 0, 0, 0.2)',
    border: 'rgba(255, 255, 255, 0.1)',
    textPrimary: 'rgb(241, 245, 249)',
    textSecondary: 'rgb(156, 163, 175)',
    glow: `0px 2px 12px 0px rgba(45, 212, 191, 0.3)`,
};
const lightTheme = {
    glassBg: 'rgba(255, 255, 255, 0.4)',
    border: 'rgba(0, 0, 0, 0.1)',
    textPrimary: 'rgb(30, 41, 59)',
    textSecondary: 'rgb(71, 85, 105)',
    glow: `0px 2px 12px 0px rgba(13, 148, 136, 0.2)`,
};

// --- Main App Component (for demo) ---
export default function App() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.body.style.backgroundColor = theme === 'dark' ? '#0A090F' : '#f0f9ff';
    }, [theme]);

    return (
        <div className={`font-sans ${theme === 'dark' ? 'dark' : ''}`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
                body { font-family: 'Inter', sans-serif; transition: background-color 0.5s; }
                .supernova-cta::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0) 70%);
                    border-radius: inherit;
                    animation: pulse 4s infinite;
                    z-index: -1;
                }
                @keyframes pulse { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
            `}</style>
            
            <HP010HeaderDefinitive theme={theme} />

            <main className="relative z-0 px-4 pt-48 pb-12">
                <div className="mx-auto max-w-4xl space-y-8">
                    <h1 className={`text-center text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Content Example</h1>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`h-48 w-full rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} border ${theme === 'dark' ? 'border-slate-100/10' : 'border-slate-900/10'}`} />
                    ))}
                </div>
            </main>
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </div>
    );
}

// --- The Definitive Header Component ---
const HP010HeaderDefinitive = ({ theme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <header className="fixed top-4 left-4 right-4 z-50">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
                style={{
                    backdropFilter: 'blur(16px)',
                    backgroundColor: currentTheme.glassBg,
                    borderColor: currentTheme.border,
                    boxShadow: currentTheme.glow,
                }}
                className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-lg border shadow-lg"
            >
                <Spark theme={theme} />
                <motion.div
                    animate={{ height: isScrolled ? '60px' : '80px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex items-center justify-between px-4"
                >
                    <Logo theme={theme} />
                    <Navigation isScrolled={isScrolled} theme={theme} />
                    <CTA isScrolled={isScrolled} />
                </motion.div>
            </motion.div>
        </header>
    );
};

// --- Header Sub-Components ---
const Spark = ({ theme }) => (
    <motion.div
        className="absolute top-0 h-[2px]"
        style={{
            backgroundColor: theme === 'dark' ? brandColor : '#0d9488',
            boxShadow: `0 0 10px 2px ${theme === 'dark' ? brandColor : '#0d9488'}`,
        }}
        initial={{ x: '-150%', width: '50%' }}
        animate={{ x: '150%', width: '150%' }}
        transition={{
            duration: 2,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 5,
            repeatType: 'loop',
        }}
    />
);

const Logo = ({ theme }) => (
    <motion.a href="#" className="flex flex-shrink-0 items-center gap-2 text-xl font-bold" whileHover="hover">
        <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.5 }}
            variants={{ hover: { scale: 1.2, rotate: 15 } }}
        >
            <Bolt className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`} />
        </motion.div>
        <span className={`${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>CreatorFlow</span>
    </motion.a>
);

const Navigation = ({ isScrolled, theme }) => {
    const navLinks = ['Features', 'Pricing', 'Testimonials'];
    return (
        <div className="hidden md:flex items-center gap-6">
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-6"
                    >
                        {navLinks.map((link) => (
                            <motion.a 
                                key={link} 
                                href="#" 
                                className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'}`}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CTA = ({ isScrolled }) => (
    <div className="hidden md:block">
        <AnimatePresence mode="popLayout">
            {isScrolled ? (
                <motion.button
                    layoutId="cta-button"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowRight size={16} />
                </motion.button>
            ) : (
                <motion.button
                    layoutId="cta-button"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="supernova-cta relative px-4 py-2 text-sm font-semibold text-white rounded-lg bg-purple-600"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start Free Trial
                </motion.button>
            )}
        </AnimatePresence>
    </div>
);

const ThemeToggleButton = ({ theme, setTheme }) => (
    <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`fixed bottom-4 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full border ${theme === 'dark' ? 'bg-white/5 border-slate-100/10 text-slate-200' : 'bg-slate-800/5 border-slate-900/10 text-slate-800'}`}
        aria-label="Toggle theme"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
    >
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);

