import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Mail, AlertTriangle, Sun, Moon } from 'lucide-react';

// --- Configuration & Theming ---
const darkTheme = {
    background: '#0A090F',
    textPrimary: 'text-slate-200',
    textSecondary: 'text-slate-400',
    accent: 'text-teal-300',
    glassBg: 'bg-black/30',
    border: 'border-slate-100/10',
    toggleButton: 'bg-white/5 border-slate-100/10 text-slate-200',
};

const lightTheme = {
    background: 'linear-gradient(180deg, #f0f9ff 0%, #fafafa 100%)',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accent: 'text-teal-600',
    glassBg: 'bg-white/60',
    border: 'border-slate-300',
    toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

// --- Recalibration Options Data ---
const recalibrationOptions = [
    { Icon: Home, title: 'Return to Command Center', subtitle: 'Go to the Homepage', href: '#' },
    { Icon: Layers, title: 'Review the Armory', subtitle: 'Explore Features', href: '#' },
    { Icon: Mail, title: 'Open a Secure Channel', subtitle: 'Contact Us', href: '#' },
];

// --- Main Component ---
export default function NotFoundPage() {
    const [theme, setTheme] = useState('dark');
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <div style={{ background: currentTheme.background }} className="font-sans flex min-h-screen items-center justify-center p-4 antialiased overflow-hidden">
            <ThemeToggleButton theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`relative w-full max-w-3xl rounded-2xl border p-8 md:p-12 text-center backdrop-blur-xl ${currentTheme.glassBg} ${currentTheme.border}`}
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className={`mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-500/10 to-purple-500/10 mb-6`}
                >
                    <AlertTriangle className={`${currentTheme.accent}`} size={48} />
                </motion.div>

                <h1 className={`text-4xl md:text-5xl font-black ${currentTheme.accent}`}>
                    Transmission Error: Invalid Route
                </h1>
                <p className={`mt-4 max-w-xl mx-auto text-lg ${currentTheme.textSecondary}`}>
                    The path you requested is not a recognized vector within our current architecture. The system is stable. Your session is secure. Please select a valid strategic destination below.
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recalibrationOptions.map((option, i) => (
                        <motion.a
                            key={i}
                            href={option.href}
                            className={`block p-6 rounded-lg border text-left transition-colors duration-300 ${currentTheme.border} hover:bg-white/5`}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            <option.Icon className={`${currentTheme.accent} h-8 w-8 mb-3`} />
                            <h3 className={`font-bold text-lg ${currentTheme.textPrimary}`}>{option.title}</h3>
                            <p className={`${currentTheme.textSecondary} text-sm`}>{option.subtitle}</p>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

const ThemeToggleButton = ({ theme, setTheme, currentTheme }) => (
    <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`fixed top-4 right-4 z-[60] h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl border ${currentTheme.toggleButton}`}
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
