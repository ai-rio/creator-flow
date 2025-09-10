/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import React, { useEffect, useCallback, useState, createContext, useContext } from 'react';

import { Button } from '@/components/ui/button';

interface Toast {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const toastTypes = {
  success: {
    Icon: CheckCircle,
    iconClass: 'text-green-500',
    borderClass: 'border-green-500/30',
    glowColor: '34, 197, 94', // green-500
  },
  warning: {
    Icon: AlertTriangle,
    iconClass: 'text-yellow-500',
    borderClass: 'border-yellow-500/30',
    glowColor: '234, 179, 8', // yellow-500
  },
  error: {
    Icon: XCircle,
    iconClass: 'text-red-500',
    borderClass: 'border-red-500/30',
    glowColor: '239, 68, 68', // red-500
  },
  info: {
    Icon: Info,
    iconClass: 'text-blue-500',
    borderClass: 'border-blue-500/30',
    glowColor: '59, 130, 246', // blue-500
  },
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const { Icon, iconClass, borderClass, glowColor } = toastTypes[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const glowStyle = {
    '--toast-glow-color': glowColor,
    boxShadow: `0 0 20px rgba(${glowColor}, 0.3)`,
  } as React.CSSProperties;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`relative w-full max-w-sm overflow-hidden rounded-premium border ${borderClass} 
                 bg-background/95 p-tactical shadow-xl backdrop-blur-lg`}
      style={glowStyle}
    >
      <div className='flex items-start gap-tactical'>
        <div className='flex-shrink-0'>
          <Icon className={`h-icon-md w-icon-md ${iconClass}`} aria-hidden='true' />
        </div>

        <div className='min-w-0 flex-1'>
          <p className='text-body-md font-semibold text-foreground'>{toast.title}</p>
          <p className='mt-1 text-body-sm text-muted-foreground'>{toast.message}</p>
        </div>

        <Button
          variant='ghost'
          size='sm'
          onClick={() => onDismiss(toast.id)}
          className='h-auto p-1 text-muted-foreground hover:text-foreground'
        >
          <span className='sr-only'>Close</span>
          <X className='h-icon-sm w-icon-sm' aria-hidden='true' />
        </Button>
      </div>
    </motion.div>
  );
};

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  children?: React.ReactNode;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right', children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    setToasts((current) => [{ ...toastData, id }, ...current]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const positionClasses = {
    'top-right': 'top-strategic right-strategic',
    'top-left': 'top-strategic left-strategic',
    'bottom-right': 'bottom-strategic right-strategic',
    'bottom-left': 'bottom-strategic left-strategic',
  };

  return (
    <ToastContext.Provider value={{ addToast, dismissToast }}>
      {children}
      <div aria-live='assertive' className={`pointer-events-none fixed z-modal ${positionClasses[position]}`}>
        <div className='flex flex-col space-y-tactical'>
          <AnimatePresence>
            {toasts.map((toast) => (
              <div key={toast.id} className='pointer-events-auto'>
                <ToastItem toast={toast} onDismiss={dismissToast} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

// Convenience hook for adding toasts
const useToastActions = () => {
  const { addToast } = useToast();

  return {
    success: (title: string, message: string, duration?: number) =>
      addToast({ type: 'success', title, message, duration }),
    warning: (title: string, message: string, duration?: number) =>
      addToast({ type: 'warning', title, message, duration }),
    error: (title: string, message: string, duration?: number) => addToast({ type: 'error', title, message, duration }),
    info: (title: string, message: string, duration?: number) => addToast({ type: 'info', title, message, duration }),
  };
};

export { ToastContainer, useToast, useToastActions };
export type { Toast, ToastContextType, ToastContainerProps };
