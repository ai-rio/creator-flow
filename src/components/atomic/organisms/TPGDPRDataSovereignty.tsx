'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Download, Eraser, Loader, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Types
interface DataRight {
  id: string;
  Icon: React.ComponentType<any>;
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
  isDangerous?: boolean;
}

interface TPGDPRDataSovereigntyProps {
  className?: string;
}

// Data Rights Configuration
const dataRights: DataRight[] = [
  {
    id: 'access',
    Icon: Download,
    titleKey: 'rights.access.title',
    descriptionKey: 'rights.access.description',
    buttonTextKey: 'rights.access.button',
    isDangerous: false,
  },
  {
    id: 'erasure',
    Icon: Eraser,
    titleKey: 'rights.erasure.title',
    descriptionKey: 'rights.erasure.description',
    buttonTextKey: 'rights.erasure.button',
    isDangerous: true,
  },
];

// Compilation Chamber Component
interface CompilationChamberProps {
  onComplete: () => void;
}

const CompilationChamber: React.FC<CompilationChamberProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const t = useTranslations('components.atomic.organisms.TPGDPRDataSovereignty');

  const compilationSteps = [
    t('compilation.step1'),
    t('compilation.step2'),
    t('compilation.step3'),
    t('compilation.step4'),
  ];

  useEffect(() => {
    if (currentStep < compilationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentStep, compilationSteps.length, onComplete]);

  const isComplete = currentStep === compilationSteps.length - 1;

  return (
    <div className='mt-4 border-t border-border pt-4'>
      <div className='space-y-3'>
        {compilationSteps.map((step, index) => (
          <div key={index} className='flex items-center gap-3'>
            {index < currentStep ? (
              <CheckCircle className='h-5 w-5 text-primary' />
            ) : (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Loader className='h-5 w-5 text-muted-foreground' />
              </motion.div>
            )}
            <span className={index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}>{step}</span>
          </div>
        ))}
      </div>
      {isComplete && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className='mt-6'>
          <Button className='w-full'>{t('compilation.download')}</Button>
        </motion.div>
      )}
    </div>
  );
};

// Data Right Module Component
interface DataRightModuleProps {
  right: DataRight;
  onAction: (right: DataRight) => void;
}

const DataRightModule: React.FC<DataRightModuleProps> = ({ right, onAction }) => {
  const [isCompiling, setIsCompiling] = useState(false);
  const t = useTranslations('components.atomic.organisms.TPGDPRDataSovereignty');

  const handleButtonClick = () => {
    if (right.id === 'access') {
      setIsCompiling(true);
    } else {
      onAction(right);
    }
  };

  const handleCompilationComplete = () => {
    // Compilation complete logic here
  };

  return (
    <motion.div layout>
      <Card className={`p-6 backdrop-blur-xl ${right.isDangerous ? 'border-destructive/30' : ''}`}>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <div className='flex items-start gap-4'>
            <right.Icon
              className={`${right.isDangerous ? 'text-destructive' : 'text-primary'} mt-1 h-8 w-8 flex-shrink-0`}
            />
            <div>
              <h3 className='text-xl font-bold text-foreground'>{t(right.titleKey)}</h3>
              <p className='mt-1 text-muted-foreground'>{t(right.descriptionKey)}</p>
            </div>
          </div>
          {!isCompiling && (
            <Button
              onClick={handleButtonClick}
              variant={right.isDangerous ? 'destructive' : 'outline'}
              className='mt-4 flex-shrink-0 md:ml-6 md:mt-0'
            >
              {t(right.buttonTextKey)}
            </Button>
          )}
        </div>
        <AnimatePresence>
          {isCompiling && <CompilationChamber onComplete={handleCompilationComplete} />}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

// Confirmation Modal Component
interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  const t = useTranslations('components.atomic.organisms.TPGDPRDataSovereignty');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
    >
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
        <Card className='relative w-full max-w-md p-8 text-center'>
          <AlertTriangle className='mx-auto h-12 w-12 text-destructive' />
          <h2 className='mt-4 text-2xl font-bold text-foreground'>{t('modal.title')}</h2>
          <p className='mt-2 text-base text-muted-foreground'>{t('modal.description')}</p>
          <div className='mt-6 flex justify-center gap-4'>
            <Button variant='outline' onClick={onCancel}>
              {t('modal.cancel')}
            </Button>
            <Button variant='destructive' onClick={onConfirm}>
              {t('modal.confirm')}
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Theme Toggle Component
const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-xl'>
        <div className='h-5 w-5' />
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-xl'
      aria-label='Toggle theme'
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <AnimatePresence mode='wait' initial={false}>
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
};

// Main Component
export const TPGDPRDataSovereignty: React.FC<TPGDPRDataSovereigntyProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('components.atomic.organisms.TPGDPRDataSovereignty');

  const handleActionClick = (right: DataRight) => {
    if (right.isDangerous) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmErasure = () => {
    setIsModalOpen(false);
    // Handle erasure logic here
    alert(t('modal.success'));
  };

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center p-4 font-sans antialiased ${className}`}>
      <ThemeToggleButton />

      {/* Hero Section */}
      <div className='mb-12 w-full max-w-4xl text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-5xl font-black text-primary md:text-7xl'
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'
        >
          {t('hero.description')}
        </motion.p>
      </div>

      {/* Data Rights */}
      <div className='w-full max-w-3xl space-y-6'>
        {dataRights.map((right, i) => (
          <motion.div
            key={right.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <DataRightModule right={right} onAction={handleActionClick} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && <ConfirmationModal onConfirm={handleConfirmErasure} onCancel={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default TPGDPRDataSovereignty;
