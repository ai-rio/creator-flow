import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, BarChartBig, CheckCircle2, Sun, Moon } from 'lucide-react';

// --- Data Configuration ---
const subscriptionPlans = [
    {
        id: 'creator',
        name: 'Creator',
        icon: Zap,
        price: { monthly: 49, annually: 490 },
        features: [
            'Up to 1,000 orders/month',
            'Standard analytics',
            'Email support',
            'Basic integrations'
        ],
        cta: 'Your Current Plan'
    },
    {
        id: 'pro',
        name: 'Creator Pro',
        icon: ShieldCheck,
        price: { monthly: 99, annually: 990 },
        features: [
            'Up to 5,000 orders/month',
            'Advanced analytics & insights',
            'Priority email & chat support',
            'Premium integrations'
        ],
        cta: 'Upgrade to Pro'
    },
    {
        id: 'scale',
        name: 'Scale',
        icon: BarChartBig,
        price: { monthly: 249, annually: 2490 },
        features: [
            'Unlimited orders',
            'AI-powered predictive analytics',
            'Dedicated account manager',
            'API access & custom integrations'
        ],
        cta: 'Upgrade to Scale'
    }
];

// --- Reusable Components ---
const GlassPane = ({ children, className = '' }) => (
    <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

const ThemeToggle = ({ theme, setTheme }) => (
    <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-8 right-8 z-20 p-2 rounded-full text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-800/40"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
    >
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);

const BillingToggle = ({ billingCycle, setBillingCycle }) => (
    <div className="flex items-center justify-center p-1 rounded-full bg-slate-200/80 dark:bg-slate-900/60">
        <button 
            onClick={() => setBillingCycle('monthly')}
            className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}
        >
             {billingCycle === 'monthly' && (
                <motion.div 
                    layoutId="billing-highlight" 
                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            )}
            <span className="relative z-10">Monthly</span>
        </button>
        <button 
            onClick={() => setBillingCycle('annually')}
            className="relative px-6 py-2 rounded-full text-sm font-semibold transition-colors"
        >
            <span className={`relative z-10 transition-colors ${billingCycle === 'annually' ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>Annually</span>
            {billingCycle === 'annually' && (
                <motion.div 
                    layoutId="billing-highlight" 
                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            )}
             <span className="absolute -top-2 -right-2 text-xs font-bold text-white bg-teal-500 dark:bg-teal-400 rounded-full px-2 py-0.5 z-10">SAVE 20%</span>
        </button>
    </div>
);

const PlanCard = ({ plan, billingCycle, isCurrent }) => {
    const price = plan.price[billingCycle];
    const accentClass = isCurrent ? 'border-teal-500/80 dark:border-teal-400/80' : 'border-slate-300/50 dark:border-slate-700/50';
    const buttonClass = isCurrent 
        ? 'bg-transparent text-teal-600 dark:text-teal-400 border-2 border-teal-600 dark:border-teal-400 cursor-default' 
        : 'bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-900 hover:bg-teal-700 dark:hover:bg-teal-400';

    return (
        <motion.div
            className={`relative w-full p-6 rounded-xl border ${accentClass} bg-slate-100/50 dark:bg-slate-900/50 flex flex-col`}
            whileHover={!isCurrent ? { scale: 1.03 } : {}}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {isCurrent && <div className="absolute top-0 right-4 -translate-y-1/2 bg-teal-500 dark:bg-teal-400 text-white dark:text-slate-900 text-xs font-bold px-3 py-1 rounded-full">CURRENT PLAN</div>}
            
            <div className="flex items-center gap-3 mb-4">
                <plan.icon className="text-purple-600 dark:text-purple-400" size={28} />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{plan.name}</h3>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-50">${price}</span>
                <span className="text-slate-600 dark:text-slate-400">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>

            <ul className="space-y-3 mb-8 text-slate-700 dark:text-slate-300 flex-grow">
                {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="text-teal-500 dark:text-teal-400 flex-shrink-0" size={18} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            
            <motion.button 
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${buttonClass}`}
                whileHover={!isCurrent ? { scale: 1.05 } : {}}
                whileTap={!isCurrent ? { scale: 0.98 } : {}}
            >
                {plan.cta}
            </motion.button>
        </motion.div>
    );
};

// --- Main Component ---
const SubscriptionPlanManager = () => {
    const [theme, setTheme] = useState('dark');
    const [billingCycle, setBillingCycle] = useState('annually');
    const [currentPlanId, setCurrentPlanId] = useState('creator');

    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] p-4 transition-colors duration-500 relative">
                <ThemeToggle theme={theme} setTheme={setTheme} />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                    className="w-full max-w-6xl"
                >
                    <GlassPane className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                                Choose the Plan That's Right for You
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                                Scale your business with powerful features. Cancel or switch plans anytime.
                            </p>
                        </div>

                        <div className="flex justify-center mb-10">
                            <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {subscriptionPlans.map(plan => (
                                <PlanCard 
                                    key={plan.id}
                                    plan={plan}
                                    billingCycle={billingCycle}
                                    isCurrent={plan.id === currentPlanId}
                                />
                            ))}
                        </div>
                    </GlassPane>
                </motion.div>
            </div>
        </div>
    );
};

export default SubscriptionPlanManager;

