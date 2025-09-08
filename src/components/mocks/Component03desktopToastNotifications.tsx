/* eslint-disable */
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

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

const Toast = ({ id, type, title, message, onDismiss }) => {
  const { Icon, iconClass, borderClass, glowColor } = toastTypes[type];

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
                 bg-white/80 p-4 
                 shadow-xl backdrop-blur-lg 
                 dark:bg-gray-900/70 dark:shadow-none`}
      style={glowStyle}
    >
      <div className='flex items-start'>
        <div className='flex-shrink-0'>
          <Icon className={`h-6 w-6 ${iconClass}`} aria-hidden='true' />
        </div>
        <div className='ml-3 w-0 flex-1 pt-0.5'>
          <p className='text-sm font-semibold text-gray-900 dark:text-white'>{title}</p>
          <p className='mt-1 text-sm text-gray-700 dark:text-gray-300'>{message}</p>
        </div>
        <div className='ml-4 flex flex-shrink-0'>
          <button
            onClick={() => onDismiss(id)}
            className='inline-flex rounded-md text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-500 dark:hover:text-gray-300'
          >
            <span className='sr-only'>Close</span>
            <X className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Toast Manager & Showcase ---
export default function DesktopToastNotifications(): React.JSX.Element {
  const [toasts, settoasts] = useState<any>([]);
  const [theme, setTheme] = React.useState('dark');

  const addToast = useCallback((type, title, message) => {
    const id = Date.now();
    setToasts((currentToasts) => [{ id, type, title, message }, ...currentToasts]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // In a real app, you'd add/remove a 'dark' class on the HTML element
  };

  return (
    <div className={theme}>
      <div className='flex min-h-screen items-center justify-center bg-gray-100 font-sans text-gray-800 transition-colors duration-300 dark:bg-[#111827] dark:text-gray-300'>
        {/* Container for the toasts, positioned at top-right */}
        <div
          aria-live='assertive'
          className='pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6'
        >
          <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
            <AnimatePresence>
              {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Showcase UI */}
        <div className='relative rounded-2xl border border-gray-200 bg-white/50 p-8 shadow-xl backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/50'>
          <button
            onClick={toggleTheme}
            className='absolute right-4 top-4 rounded-full bg-gray-200/50 p-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? <span className='text-2xl'>☀️</span> : <span className='text-2xl'>🌙</span>}
          </button>
          <h2 className='mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white'>
            Toast Notification Showcase
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            <button
              onClick={() => addToast('success', 'Success!', 'Your data has been saved correctly.')}
              className='rounded-lg border border-green-500/30 bg-green-500/20 px-6 py-3 font-semibold text-green-700 transition-all hover:bg-green-500/30 dark:text-green-300'
            >
              Trigger Success
            </button>
            <button
              onClick={() => addToast('warning', 'Warning', 'Your trial is ending in 3 days.')}
              className='rounded-lg border border-amber-500/30 bg-amber-500/20 px-6 py-3 font-semibold text-amber-700 transition-all hover:bg-amber-500/30 dark:text-amber-300'
            >
              Trigger Warning
            </button>
            <button
              onClick={() => addToast('error', 'Error', 'Failed to connect to the server.')}
              className='rounded-lg border border-red-500/30 bg-red-500/20 px-6 py-3 font-semibold text-red-700 transition-all hover:bg-red-500/30 dark:text-red-300'
            >
              Trigger Error
            </button>
            <button
              onClick={() => addToast('info', 'Info', 'A new feature has been added.')}
              className='rounded-lg border border-blue-500/30 bg-blue-500/20 px-6 py-3 font-semibold text-blue-700 transition-all hover:bg-blue-500/30 dark:text-blue-300'
            >
              Trigger Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
