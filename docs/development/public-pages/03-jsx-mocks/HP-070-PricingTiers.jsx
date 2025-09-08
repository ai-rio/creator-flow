import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Check } from 'lucide-react';

// --- Data for Pricing Tiers ---
const pricingData = [
    { name: "Launch", price: 49, description: "For the solo creator taking flight.", features: ["500 Orders/Mo", "Basic Automation", "Community Support"], color: "purple" },
    { name: "Ascend", price: 99, description: "The command center for scaling your empire.", features: ["2,000 Orders/Mo", "Advanced Automation", "AI Insights", "Priority Support"], color: "blue", recommended: true },
    { name: "Galaxy", price: 199, description: "For established brands dominating their market.", features: ["10,000 Orders/Mo", "Full Automation Suite", "API Access", "Dedicated Agent"], color: "teal" },
];

// --- Color Palette ---
const colors = {
    blue: { base: '#3b82f6', light: '#60a5fa', dark: '#2563eb', glow: 'rgba(59, 130, 246, 0.5)' },
    purple: { base: '#8b5cf6', light: '#c084fc', dark: '#7c3aed', glow: 'rgba(139, 92, 246, 0.5)' },
    teal: { base: '#14b8a6', light: '#2dd4bf', dark: '#0d9488', glow: 'rgba(20, 184, 166, 0.5)' },
};

// --- Main Showcase Component ---
export default function PricingShowcase() {
    const [theme, setTheme] = useState('dark');
    useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);

    return (
        <div className="font-sans bg-slate-100 dark:bg-[#0A090F] transition-colors duration-300">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display.swap'); body { font-family: 'Inter', sans-serif; }`}</style>
            <Starfield />
            <div className="relative z-10">
                <HP070PricingTiers />
            </div>
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </div>
    );
}

// --- HP-070-PricingTiers Component ---
const HP070PricingTiers = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight">
                    Find Your Orbit.
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-400">
                    Select the perfect plan to propel your brand from a single spark to a galactic presence.
                </p>
            </div>
            
            <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                {pricingData.map((plan, i) => (
                    <PricingCard key={plan.name} {...plan} billingCycle={billingCycle} index={i} />
                ))}
            </div>
        </section>
    );
};

// --- Billing Toggle Component ---
const BillingToggle = ({ billingCycle, setBillingCycle }) => (
    <div className="p-1 rounded-full bg-slate-200/50 dark:bg-black/30 backdrop-blur-lg border border-slate-900/10 dark:border-slate-100/10 flex items-center gap-2">
        <button onClick={() => setBillingCycle('monthly')} className="relative px-4 py-2 rounded-full text-sm font-semibold text-slate-800 dark:text-white">
            {billingCycle === 'monthly' && <motion.div layoutId="billing-pill" className="absolute inset-0 bg-white/80 dark:bg-slate-700/50 rounded-full" />}
            <span className="relative">Monthly</span>
        </button>
        <button onClick={() => setBillingCycle('yearly')} className="relative px-4 py-2 rounded-full text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2">
             {billingCycle === 'yearly' && <motion.div layoutId="billing-pill" className="absolute inset-0 bg-white/80 dark:bg-slate-700/50 rounded-full" />}
            <span className="relative">Yearly</span>
            <motion.div 
                className="relative px-2 py-0.5 rounded-full text-xs text-green-800 dark:text-green-200 bg-green-200/50 dark:bg-green-500/30"
                animate={{ scale: billingCycle === 'yearly' ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                Save 20%
            </motion.div>
        </button>
    </div>
);


// --- Pricing Card (Conventional Rounded Rectangle) ---
const PricingCard = ({ name, price, description, features, recommended, color, billingCycle, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const accentColor = colors[color];
    
    const yearlyPrice = Math.round((price * 12) * 0.8);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 * index }}
            className="relative w-[320px] h-[420px]"
        >
             {recommended && 
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full z-10">
                    Most Popular
                </div>
             }
             <motion.div 
                className="absolute inset-0 rounded-2xl bg-slate-200/50 dark:bg-black/30 backdrop-blur-2xl border border-slate-900/10 dark:border-slate-100/10"
                animate={{ 
                    scale: isHovered ? 1.05 : 1,
                    boxShadow: isHovered ? `0 0 40px -10px ${accentColor.glow}` : `0 0 0px 0px rgba(0,0,0,0)`
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
             />
            
            <div className="absolute inset-0 flex flex-col justify-between p-6 rounded-2xl">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
                    <div className="text-4xl font-extrabold text-slate-800 dark:text-white mt-4 flex items-baseline">
                         <AnimatePresence mode="wait">
                             <motion.span
                                key={billingCycle}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                             >
                                ${billingCycle === 'monthly' ? price : yearlyPrice}
                             </motion.span>
                         </AnimatePresence>
                         <span className="text-lg text-slate-700 dark:text-slate-300">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                </div>
                <motion.ul className="space-y-2">
                    {features.map((feature, i) => (
                        <motion.li key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: isHovered ? 1 : 0.5 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Check className="w-4 h-4" style={{ color: accentColor.light }}/> {feature}
                        </motion.li>
                    ))}
                </motion.ul>
                <motion.button 
                    className="w-full py-2 rounded-lg text-white font-bold mt-4"
                    style={{ backgroundColor: accentColor.base }}
                    whileHover={{ backgroundColor: accentColor.dark }}
                >
                    Start your 14 day trial
                </motion.button>
            </div>
        </motion.div>
    );
};

// --- Starfield Background Component ---
const Starfield = () => (
    <motion.div className="fixed inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        <svg width="100%" height="100%" className="absolute inset-0">
            {Array.from({ length: 150 }).map((_, i) => {
                const cx = Math.random() * 100; const cy = Math.random() * 100; const r = Math.random() * 0.75 + 0.25; const duration = Math.random() * 5 + 5;
                return (<motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r} fill="white" animate={{ opacity: [0, 1, 0] }} transition={{ duration, repeat: Infinity, ease: "easeInOut" }} />);
            })}
        </svg>
    </motion.div>
);

// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ theme, setTheme }) => (
    <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed top-4 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl bg-slate-200/50 dark:bg-white/5 border border-slate-900/10 dark:border-slate-100/10 text-slate-800 dark:text-slate-200" aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);

