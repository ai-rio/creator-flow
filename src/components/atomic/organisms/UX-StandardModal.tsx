/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

// Theme Context & Provider
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Standard Modal Component
const StandardModal = ({ isOpen, onClose, config }: any) => {
  const { title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm } = config;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-modal flex items-center justify-center'
        >
          {/* Backdrop */}
          <motion.div
            className='absolute inset-0 bg-black/60 backdrop-blur-md'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Pane */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='relative w-full max-w-md rounded-executive border-2 bg-background/95 p-strategic backdrop-blur-xl'
          >
            <div className='flex items-start gap-tactical'>
              <div className='flex-grow'>
                <h2 className='text-heading-lg font-bold text-foreground'>{title}</h2>
                <p className='mt-tactical text-body-md text-muted-foreground'>{message}</p>
              </div>
            </div>

            <div className='mt-strategic flex justify-end gap-tactical'>
              <Button onClick={onClose} variant='outline' className='rounded-premium border-2'>
                {cancelText}
              </Button>
              <Button
                onClick={onConfirm}
                className='rounded-premium bg-foreground text-background hover:bg-foreground/90'
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Export wrapper
const AppContent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const standardConfig = {
    title: 'Deploy New Automation?',
    message:
      "This will activate the 'Auto-Fulfill High-Priority Orders' workflow. This action can be reversed later from the automation dashboard.",
    confirmText: 'Activate Workflow',
    onConfirm: () => {
      console.log('Standard action confirmed');
      setModalOpen(false);
    },
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content text-center'>
        <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Standard Modal Component</h1>
        <p className='mb-strategic text-body-md text-muted-foreground'>
          Clean confirmation modal for standard actions.
        </p>

        <Button onClick={() => setModalOpen(true)} className='rounded-premium bg-foreground text-background'>
          Open Standard Modal
        </Button>
      </div>

      <StandardModal isOpen={modalOpen} onClose={() => setModalOpen(false)} config={standardConfig} />
    </div>
  );
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
