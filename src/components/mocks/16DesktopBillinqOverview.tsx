'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, RefreshCw, CreditCard, Sun, Moon } from 'lucide-react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- Mock Data ---
// This data simulates what would be fetched from a backend.
const billingData = {
    plan: {
        name: 'Creator Pro',
        cost: 99,
        billingCycle: 'month',
        usage: {
            current: 4210,
            limit: 5000,
            label: 'Orders'
        }
    },
    nextBilling: {
        // Based on the user's current date of Sept 5, 2025
        date: 'October 5, 2025',
        amount: 99.00
    },
    paymentMethod: {
        brand: 'Visa',
        last4: '4242',
        expiry: '12 / 26'
    }
};

// --- Reusable Components ---
const GlassPane = ({ children, className = ''  }: any) => (
    <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

const ThemeToggle = ({ theme, setTheme  }: any) => (
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

const UsageBar: React.FC<any> = ({ current, limit, label  }: any) => {
    const percentage = (current / limit) * 100;
    return (
        <div>
            <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 mb-1">
                <span>{label}</span>
                <span>{current.toLocaleString()} / {limit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200/80 dark:bg-slate-900/60 rounded-full h-2.5">
                <motion.div
                    className="bg-purple-600 dark:bg-purple-400 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, type: 'spring', stiffness: 80 }}
                />
            </div>
        </div>
    );
};

const InfoBlock = ({ icon: Icon, title, children  }: any) => (
    <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
            <Icon className="text-slate-500" size={22} />
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
        </div>
        {children}
    </div>
);


// --- Main Component ---
const BillingOverviewCard = () => {
    const [theme, setTheme] = useState<string>('dark');
    const { plan, nextBilling, paymentMethod } = billingData;

    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] p-4 transition-colors duration-500 relative">
                <ThemeToggle theme={theme} setTheme={setTheme} />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                    className="w-full max-w-4xl"
                >
                    <GlassPane>
                        <div className="p-8 border-b border-slate-300/50 dark:border-slate-700/50">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                                <Wallet className="text-teal-600 dark:text-teal-400" size={32} />
                                Billing Overview
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Your current subscription status and upcoming charges.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-slate-300/50 dark:divide-slate-700/50">
                            {/* Current Plan Block */}
                            <InfoBlock icon={Wallet} title="Current Plan">
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{plan.name}</p>
                                <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                                    ${plan.cost} <span className="text-sm text-slate-500">/ {plan.billingCycle}</span>
                                </p>
                                <UsageBar {...plan.usage} />
                            </InfoBlock>
                            
                            {/* Next Billing Block */}
                            <InfoBlock icon={RefreshCw} title="Next Bill">
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{nextBilling.date}</p>
                                <p className="text-lg text-slate-700 dark:text-slate-300">
                                    Amount: <span className="font-semibold">${nextBilling.amount.toFixed(2)}</span>
                                </p>
                            </InfoBlock>

                            {/* Payment Method Block */}
                            <InfoBlock icon={CreditCard} title="Paid With">
                                <div className="flex items-center gap-3">
                                     {/* In a real app, this would be an SVG logo */}
                                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{paymentMethod.brand}</div>
                                    <div>
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">ending in {paymentMethod.last4}</p>
                                        <p className="text-sm text-slate-500">Expires {paymentMethod.expiry}</p>
                                    </div>
                                </div>
                            </InfoBlock>
                        </div>
                        
                        <div className="p-6 bg-slate-100/30 dark:bg-slate-900/20 rounded-b-2xl flex justify-end">
                             <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                className="bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-[0px_0px_12px_rgba(29,255,233,0.5)] transition-all duration-300"
                            >
                                Manage Subscription & Billing
                            </motion.button>
                        </div>
                    </GlassPane>
                </motion.div>
            </div>
        </div>
    );
};

export default BillingOverviewCard;
