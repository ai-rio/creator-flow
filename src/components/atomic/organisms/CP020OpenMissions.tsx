'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

// Types
interface CP020OpenMissionsProps {
  className?: string;
}

interface Mission {
  id: string;
  titleKey: string;
  directiveKey: string;
  successCriteriaKey: string;
}

interface ThemeConfig {
  background: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  glassBg: string;
  border: string;
  inputBg: string;
  inputBorder: string;
  inputFocusBorder: string;
  buttonBorder: string;
  buttonHoverBg: string;
  buttonHoverText: string;
}

// Theme configurations
const darkTheme: ThemeConfig = {
  background: '#0A090F',
  textPrimary: 'text-slate-200',
  textSecondary: 'text-slate-400',
  accent: 'text-teal-300',
  glassBg: 'bg-black/30',
  border: 'border-slate-100/10',
  inputBg: 'bg-slate-900/50',
  inputBorder: 'border-slate-100/10',
  inputFocusBorder: 'border-teal-300',
  buttonBorder: 'border-teal-300',
  buttonHoverBg: 'bg-teal-300',
  buttonHoverText: 'text-black',
};

const lightTheme: ThemeConfig = {
  background: 'linear-gradient(180deg, #eef2ff 0%, #fafafa 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  accent: 'text-teal-600',
  glassBg: 'bg-white/60',
  border: 'border-slate-300',
  inputBg: 'bg-white/50',
  inputBorder: 'border-slate-300',
  inputFocusBorder: 'border-teal-600',
  buttonBorder: 'border-teal-600',
  buttonHoverBg: 'bg-teal-600',
  buttonHoverText: 'text-white',
};

// Mission configuration
const missions: Mission[] = [
  {
    id: 'shipping-system',
    titleKey: 'missions.shipping.title',
    directiveKey: 'missions.shipping.directive',
    successCriteriaKey: 'missions.shipping.successCriteria',
  },
  {
    id: 'analytics-engine',
    titleKey: 'missions.analytics.title',
    directiveKey: 'missions.analytics.directive',
    successCriteriaKey: 'missions.analytics.successCriteria',
  },
];

// Animation variants
const dossierVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1] as const,
    },
  },
};

// Sub Components
const SubmissionModal: React.FC<{ mission: Mission; onClose: () => void; theme: ThemeConfig }> = ({
  mission,
  onClose,
  theme,
}) => {
  const t = useTranslations('components.atomic.organisms.CP020OpenMissions');

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      variants={modalBackdropVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />
      <motion.div
        className={`relative w-full max-w-3xl rounded-2xl border p-8 backdrop-blur-2xl ${theme.glassBg} ${theme.border}`}
        variants={modalVariants}
      >
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 rounded-full p-2 ${theme.textSecondary} hover:${theme.accent}`}
        >
          <X size={20} />
        </button>
        <h3 className={`text-2xl font-black ${theme.accent}`}>{t('modal.title')}</h3>
        <p className={`${theme.textPrimary} mt-1`}>
          {t('modal.missionLabel')}: {t(mission.titleKey)}
        </p>

        <div className='mt-6 border-t border-slate-100/10 pt-6'>
          <p className={`mb-4 font-bold ${theme.textPrimary}`}>{t('modal.headerLabel')}:</p>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className={`text-sm ${theme.textSecondary}`}>{t('modal.form.codename')}</label>
              <input
                type='text'
                className={`mt-1 w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
              />
            </div>
            <div>
              <label className={`text-sm ${theme.textSecondary}`}>{t('modal.form.email')}</label>
              <input
                type='email'
                className={`mt-1 w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
              />
            </div>
          </div>
          <div className='mt-4'>
            <label className={`text-sm ${theme.textSecondary}`}>{t('modal.form.proofOfWork')}</label>
            <input
              type='url'
              className={`mt-1 w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
            />
          </div>
        </div>

        <div className='mt-6 border-t border-slate-100/10 pt-6'>
          <label className={`mb-2 block font-bold ${theme.textPrimary}`}>{t('modal.challenge.title')}:</label>
          <p className={`${theme.textSecondary} mb-4 text-sm`}>{t('modal.challenge.description')}</p>
          <textarea
            rows={6}
            className={`w-full resize-none rounded-lg border bg-transparent p-3 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
          />
        </div>

        <button
          className={`mt-6 w-full border px-6 py-3 transition-colors duration-300 ${theme.buttonBorder} ${theme.accent} hover:${theme.buttonHoverBg} hover:${theme.buttonHoverText}`}
        >
          {t('modal.submit')}
        </button>
      </motion.div>
    </motion.div>
  );
};

// Main Component
export const CP020OpenMissions: React.FC<CP020OpenMissionsProps> = ({ className }) => {
  const { theme } = useTheme();
  const t = useTranslations('components.atomic.organisms.CP020OpenMissions');

  const [mounted, setMounted] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const paginate = (newDirection: number) => {
    const newPageIndex = (page + newDirection + missions.length) % missions.length;
    setPage([newPageIndex, newDirection]);
  };

  const mission = missions[page];
  const successCriteria = t.raw(mission.successCriteriaKey) as string[];

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-900 p-4'>
        <div className='relative h-[650px] w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-800/30 p-8'>
          <div className='animate-pulse'>
            <div className='mb-6 h-6 w-1/3 rounded bg-slate-700'></div>
            <div className='mb-4 h-8 w-3/4 rounded bg-slate-700'></div>
            <div className='space-y-3'>
              <div className='h-4 w-full rounded bg-slate-700'></div>
              <div className='h-4 w-5/6 rounded bg-slate-700'></div>
              <div className='h-4 w-4/5 rounded bg-slate-700'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ background: currentTheme.background }}
      className={`flex min-h-screen items-center justify-center p-4 font-sans antialiased ${className || ''}`}
    >
      <motion.div
        className={`relative h-[650px] w-full max-w-4xl rounded-2xl border backdrop-blur-xl ${currentTheme.glassBg} ${currentTheme.border}`}
        animate={{ filter: isModalOpen ? 'blur(10px)' : 'blur(0px)' }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex h-full flex-col p-8 md:p-12'>
          <div className='flex items-center justify-between border-b border-slate-100/10 pb-4'>
            <h2 className={`${currentTheme.textSecondary} text-sm font-bold uppercase tracking-widest`}>
              {t('header.title')}
            </h2>
            <div className='flex gap-2'>
              <button
                onClick={() => paginate(-1)}
                className={`rounded-full p-2 ${currentTheme.textSecondary} hover:${currentTheme.accent}`}
                aria-label={t('navigation.previous')}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => paginate(1)}
                className={`rounded-full p-2 ${currentTheme.textSecondary} hover:${currentTheme.accent}`}
                aria-label={t('navigation.next')}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className='relative mt-6 flex-grow overflow-hidden'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={dossierVariants}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className='absolute inset-0 flex flex-col'
              >
                <h3 className={`text-3xl font-black ${currentTheme.accent} mb-4`}>{t(mission.titleKey)}</h3>
                <p className={`${currentTheme.textSecondary} text-lg leading-relaxed`}>{t(mission.directiveKey)}</p>

                <div className='my-6 space-y-3'>
                  <h4 className={`${currentTheme.textPrimary} font-bold`}>{t('successCriteria.title')}:</h4>
                  {successCriteria.map((criterion: string, i: number) => (
                    <div key={i} className='flex items-start gap-3'>
                      <CheckCircle className={`${currentTheme.accent} mt-1 h-5 w-5 flex-shrink-0`} />
                      <span className={currentTheme.textSecondary}>{criterion}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className={`mt-auto w-full self-start border px-6 py-3 transition-colors duration-300 md:w-auto ${currentTheme.buttonBorder} ${currentTheme.accent} hover:${currentTheme.buttonHoverBg} hover:${currentTheme.buttonHoverText}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('acceptMission')}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <SubmissionModal mission={mission} onClose={() => setIsModalOpen(false)} theme={currentTheme} />
        )}
      </AnimatePresence>
    </div>
  );
};
