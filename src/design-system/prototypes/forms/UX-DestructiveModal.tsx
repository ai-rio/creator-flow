/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

// Border Beam Animation Component
const BorderBeam = () => (
  <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-executive'>
    <motion.div
      className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent'
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
    />
    <motion.div
      className='absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent'
      initial={{ y: '-100%' }}
      animate={{ y: '100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1.5 }}
    />
    <motion.div
      className='absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-transparent via-red-500 to-transparent'
      initial={{ x: '100%' }}
      animate={{ x: '-100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 2.5 }}
    />
    <motion.div
      className='absolute left-0 top-0 h-full w-1 bg-gradient-to-t from-transparent via-red-500 to-transparent'
      initial={{ y: '100%' }}
      animate={{ y: '-100%' }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 3.5 }}
    />
  </div>
);

// Destructive Modal Component
const DestructiveModal = ({ isOpen, onClose, config }: any) => {
  const { title, message, confirmText = 'Delete', cancelText = 'Cancel', onConfirm, frictionText } = config;

  const [inputValue, setInputValue] = useState<string>('');
  const isConfirmationDisabled = inputValue !== frictionText;

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

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
            transition={{ type: 'spring' as any, stiffness: 300, damping: 30 }}
            className='relative w-full max-w-md rounded-executive border-2 bg-background/95 p-strategic backdrop-blur-xl'
          >
            <BorderBeam />

            <div className='flex items-start gap-tactical'>
              <div className='h-icon-xl w-icon-xl flex flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500'>
                <AlertTriangle className='h-icon-lg w-icon-lg' />
              </div>
              <div className='flex-grow'>
                <h2 className='text-heading-lg font-bold text-foreground'>{title}</h2>
                <p className='mt-tactical text-body-md text-muted-foreground'>{message}</p>
              </div>
            </div>

            <div className='mt-tactical'>
              <p className='text-body-xs mb-tactical text-muted-foreground'>
                To confirm, please type "<span className='font-bold'>{frictionText}</span>" in the box below.
              </p>
              <Input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='w-full rounded-premium border-2 bg-background/50 focus-visible:ring-2 focus-visible:ring-red-500'
                placeholder={`Type ${frictionText} to confirm`}
              />
            </div>

            <div className='mt-strategic flex justify-end gap-tactical'>
              <Button onClick={onClose} variant='outline' className='rounded-premium border-2'>
                {cancelText}
              </Button>
              <Button
                onClick={onConfirm}
                disabled={isConfirmationDisabled}
                className={`rounded-premium ${
                  isConfirmationDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-700'
                } bg-red-600 text-white`}
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

  const destructiveConfig = {
    title: 'Permanently Delete Project?',
    message:
      "This action is irreversible. All associated data, including orders, analytics, and automation logs for 'Project Phoenix' will be permanently erased.",
    confirmText: 'Delete Project',
    frictionText: 'DELETE',
    onConfirm: () => {
      console.log('Destructive action confirmed');
      setModalOpen(false);
    },
  };

  return (
    <div className='min-h-screen bg-background p-strategic'>
      <div className='mx-auto max-w-content text-center'>
        <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Destructive Modal Component</h1>
        <p className='mb-strategic text-body-md text-muted-foreground'>
          High-friction modal for dangerous actions with confirmation text input.
        </p>

        <Button onClick={() => setModalOpen(true)} className='rounded-premium bg-red-600 text-white hover:bg-red-700'>
          Open Destructive Modal
        </Button>
      </div>

      <DestructiveModal isOpen={modalOpen} onClose={() => setModalOpen(false)} config={destructiveConfig} />
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
