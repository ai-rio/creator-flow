'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';


// --- TypeScript Interfaces ---
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- Reusable Toast Component ---
const toastTypes = {
  success: {
    Icon: CheckCircle,
    iconClass: 'text-green-500 dark:text-green-400',
    borderClass: 'border-green-500/30',
    glowColor: '52, 211, 153', // RGB for green-400
  },
  warning: {
    Icon: AlertTriangle,
    iconClass: 'text-amber-500 dark:text-amber-400',
    borderClass: 'border-amber-500/30',
    glowColor: '251, 191, 36', // RGB for amber-400
  },
  error: {
    Icon: XCircle,
    iconClass: 'text-red-500 dark:text-red-400',
    borderClass: 'border-red-500/30',
    glowColor: '248, 113, 113', // RGB for red-400
  },
  info: {
    Icon: Info,
    iconClass: 'text-blue-500 dark:text-blue-400',
    borderClass: 'border-blue-500/30',
    glowColor: '96, 165, 250', // RGB for blue-400
  },
};

const Toast: React.FC<any> = ({ id, type, title, message, onDismiss  }: any) => {
  const { Icon, iconClass, borderClass, glowColor } = (toastTypes as any)[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const glowStyle = {
    '--toast-glow-color': glowColor,
    boxShadow: '0 0 20px rgba(var(--toast-glow-color), 0.3)',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`relative w-full max-w-sm overflow-hidden rounded-xl border ${borderClass} 
                 bg-white/80 dark:bg-gray-900/70 
                 p-4 backdrop-blur-lg 
                 shadow-xl dark:shadow-none`}
      style={glowStyle}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${iconClass}`} aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{message}</p>
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            onClick={() => onDismiss(id)}
            className="inline-flex rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Toast Manager & Showcase ---
export default function DesktopToastNotifications(): React.JSX.Element {
  const [toasts, setToasts] = useState<any>([]);
  const [theme, setTheme] = React.useState('dark');

  const addToast = useCallback((type: any, title: any, message: any) => {
    const id = Date.now();
    setToasts((currentToasts: any) => [{ id, type, title, message }, ...currentToasts]);
  }, []);
  
  const dismissToast = useCallback((id: any) => {
    setToasts((currentToasts: any) => currentToasts.filter((toast: any) => toast.id !== id));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // In a real app, you'd add/remove a 'dark' class on the HTML element
  };

  return (
    <div className={theme}>
        <div className="bg-gray-100 dark:bg-[#111827] text-gray-800 dark:text-gray-300 min-h-screen flex items-center justify-center font-sans transition-colors duration-300">
            {/* Container for the toasts, positioned at top-right */}
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <AnimatePresence>
                        {toasts.map((toast: any) => (
                            <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Showcase UI */}
            <div className="relative p-8 bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-200 dark:border-gray-800">
                <button
                    onClick={toggleTheme}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <span className="text-2xl">☀️</span> : <span className="text-2xl">🌙</span>}
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Toast Notification Showcase</h2>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => addToast('success', 'Success!', 'Your data has been saved correctly.')}
                        className="px-6 py-3 bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30 rounded-lg font-semibold hover:bg-green-500/30 transition-all"
                    >
                        Trigger Success
                    </button>
                    <button
                        onClick={() => addToast('warning', 'Warning', 'Your trial is ending in 3 days.')}
                        className="px-6 py-3 bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-lg font-semibold hover:bg-amber-500/30 transition-all"
                    >
                        Trigger Warning
                    </button>
                    <button
                        onClick={() => addToast('error', 'Error', 'Failed to connect to the server.')}
                        className="px-6 py-3 bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30 rounded-lg font-semibold hover:bg-red-500/30 transition-all"
                    >
                        Trigger Error
                    </button>
                    <button
                        onClick={() => addToast('info', 'Info', 'A new feature has been added.')}
                        className="px-6 py-3 bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 rounded-lg font-semibold hover:bg-blue-500/30 transition-all"
                    >
                        Trigger Info
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

