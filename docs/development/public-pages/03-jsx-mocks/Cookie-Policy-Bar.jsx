import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BarChart2, Zap, Settings, Check, Sun, Moon } from 'lucide-react';

// --- Configuration & Theming ---
const darkTheme = {
    background: '#0A090F',
    textPrimary: 'text-slate-200',
    textSecondary: 'text-slate-400',
    accent: 'text-teal-300',
    glassBg: 'bg-black/50',
    border: 'border-slate-100/10',
    buttonPrimaryBg: 'bg-teal-300',
    buttonPrimaryText: 'text-black',
    buttonSecondaryBorder: 'border-slate-100/20',
    toggleBg: 'bg-slate-700',
    toggleHandle: 'bg-white',
    toggleButton: 'bg-white/5 border-slate-100/10 text-slate-200',
};

const lightTheme = {
    background: 'linear-gradient(180deg, #f0f9ff 0%, #fafafa 100%)',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accent: 'text-teal-600',
    glassBg: 'bg-white/70',
    border: 'border-slate-300',
    buttonPrimaryBg: 'bg-teal-600',
    buttonPrimaryText: 'text-white',
    buttonSecondaryBorder: 'border-slate-400',
    toggleBg: 'bg-slate-300',
    toggleHandle: 'bg-slate-700',
    toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

// --- Protocol Data ---
const protocols = [
    { id: 'core', Icon: Shield, title: 'Core Protocol (Required)', description: 'For system security, authentication, and core functionality. Cannot be disabled.' },
    { id: 'performance', Icon: BarChart2, title: 'Performance Protocol', description: 'Anonymous analytics to help us identify bottlenecks and improve platform speed.' },
    { id: 'growth', Icon: Zap, title: 'Growth Protocol', description: 'Data to help us improve our outreach to future architects and creators.' }
];

// --- Toggle Component ---
const ProtocolToggle = ({ protocol, enabled, onToggle, theme }) => (
    <div className="flex items-start justify-between py-4">
        <div className="flex items-start gap-4">
            <protocol.Icon className={`${theme.accent} h-6 w-6 flex-shrink-0 mt-1`} />
            <div>
                <h4 className={`font-bold ${theme.textPrimary}`}>{protocol.title}</h4>
                <p className={`text-sm ${theme.textSecondary}`}>{protocol.description}</p>
            </div>
        </div>
        <button
            onClick={onToggle}
            disabled={protocol.id === 'core'}
            className={`relative flex h-7 w-12 flex-shrink-0 items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme.accent.split('-')[1]}-500 ${enabled ? theme.buttonPrimaryBg : theme.toggleBg} ${protocol.id === 'core' ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <motion.span layout className={`inline-block h-5 w-5 transform rounded-full ${theme.toggleHandle} transition-transform duration-300 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
    </div>
);

// --- Main Component ---
export default function CookiePolicyBar() {
    const [theme, setTheme] = useState('dark');
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [settings, setSettings] = useState({ core: true, performance: false, growth: false });
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        // In a real app, check if the cookie consent has been given
        const consent = localStorage.getItem('creatorflow-consent');
        if (!consent) {
           setTimeout(() => setIsVisible(true), 2000);
        }
    }, []);

    const handleToggle = (id) => {
        if (id !== 'core') {
            setSettings(prev => ({ ...prev, [id]: !prev[id] }));
        }
    };

    const handleAccept = (acceptedSettings) => {
        localStorage.setItem('creatorflow-consent', JSON.stringify(acceptedSettings));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl ${currentTheme.glassBg} ${currentTheme.border}`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div layout transition={{ duration: 0.3, ease: 'easeOut' }}>
                        <div className="py-4">
                            <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isExpanded ? 'hidden' : 'flex'}`}>
                                <div className="text-center md:text-left">
                                    <h3 className={`text-lg font-bold ${currentTheme.textPrimary}`}>Activate Data Protocol</h3>
                                    <p className={`text-sm ${currentTheme.textSecondary}`}>We use a limited set of protocols to operate and enhance the system. You have precise command.</p>
                                </div>
                                <div className="flex flex-shrink-0 gap-3">
                                    <button onClick={() => setIsExpanded(true)} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${currentTheme.textPrimary}`}>
                                        <Settings size={16} /> Customize
                                    </button>
                                    <button onClick={() => handleAccept(settings)} className={`rounded-md px-4 py-2 text-sm font-semibold border transition-colors ${currentTheme.buttonSecondaryBorder} ${currentTheme.textSecondary} hover:${currentTheme.textPrimary}`}>
                                        Activate Selected
                                    </button>
                                    <button onClick={() => handleAccept({ core: true, performance: true, growth: true })} className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${currentTheme.buttonPrimaryBg} ${currentTheme.buttonPrimaryText}`}>
                                        Activate All Protocols
                                    </button>
                                </div>
                            </div>
                            
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                    >
                                        <h3 className={`text-lg font-bold mb-2 ${currentTheme.textPrimary}`}>Customize Data Protocol</h3>
                                        <div className="divide-y divide-slate-100/10">
                                            {protocols.map(p => (
                                                <ProtocolToggle key={p.id} protocol={p} enabled={settings[p.id]} onToggle={() => handleToggle(p.id)} theme={currentTheme}/>
                                            ))}
                                        </div>
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button onClick={() => handleAccept(settings)} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${currentTheme.buttonPrimaryBg} ${currentTheme.buttonPrimaryText}`}>
                                                <Check size={16} /> Save & Activate
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            <ThemeToggleButton theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
        </>
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
