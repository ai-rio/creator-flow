import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}


import { AnimatePresence,motion } from 'framer-motion';
import { CreditCard, Moon,PlusCircle, Star, Sun, Trash2 } from 'lucide-react';

// --- Mock Data ---
// Represents the payment methods saved for a user.
const mockPaymentMethods = [
    { id: 'pm_1', brand: 'Visa', last4: '4242', expiry: '12 / 26', isDefault: true },
    { id: 'pm_2', brand: 'Mastercard', last4: '5555', expiry: '08 / 28', isDefault: false },
];

// --- Reusable Components ---
const GlassPane: React.FC<any> = ({ children, className = ''  }) => (
    <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

const ThemeToggle: React.FC<any> = ({ theme, setTheme  }) => (
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

// --- Main Component ---
const PaymentMethodsCard = () => {
    const [theme, settheme] = useState<any>('dark');
    const [paymentMethods, setpaymentMethods] = useState<any>(mockPaymentMethods);

    const handleSetDefault = (id) => {
        setPaymentMethods(
            paymentMethods.map(pm => ({
                ...pm,
                isDefault: pm.id === id,
            }))
        );
    };

    const handleRemove = (id) => {
        // In a real app, a confirmation modal would be shown first.
        setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    };

    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] p-4 transition-colors duration-500 relative">
                <ThemeToggle theme={theme} setTheme={setTheme} />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                    className="w-full max-w-2xl"
                >
                    <GlassPane>
                        <div className="p-8 border-b border-slate-300/50 dark:border-slate-700/50 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                                    <CreditCard className="text-teal-600 dark:text-teal-400" size={32} />
                                    Payment Methods
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your saved payment options.</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-900 font-bold py-2 px-4 rounded-lg shadow-md"
                            >
                                <PlusCircle size={18} />
                                Add New
                            </motion.button>
                        </div>
                        
                        <div className="p-8 space-y-4">
                            <AnimatePresence>
                                {paymentMethods.map(pm => (
                                    <motion.div
                                        key={pm.id}
                                        layout
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                                        className="p-4 flex items-center justify-between bg-slate-200/50 dark:bg-slate-900/50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* In a real app, use brand SVGs */}
                                            <div className="font-bold text-slate-800 dark:text-slate-200">{pm.brand}</div>
                                            <div>
                                                <p className="font-semibold text-slate-800 dark:text-slate-200">
                                                    Ending in {pm.last4}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-500">
                                                    Expires {pm.expiry}
                                                </p>
                                            </div>
                                            {pm.isDefault && (
                                                <div className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-full">
                                                    <Star size={12} />
                                                    Default
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {!pm.isDefault && (
                                                <motion.button 
                                                    onClick={() => handleSetDefault(pm.id)}
                                                    className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    Set as Default
                                                </motion.button>
                                            )}
                                            <motion.button 
                                                onClick={() => handleRemove(pm.id)}
                                                className="p-2 text-red-500 hover:text-red-400"
                                                whileHover={{ scale: 1.2, rotate: -5 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Trash2 size={18} />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </GlassPane>
                </motion.div>
            </div>
        </div>
    );
};

export default PaymentMethodsCard;
