'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Banknote, BrainCircuit, ChevronDown, GitCommit, Shield, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useCallback, useState } from 'react';

// --- Types ---
interface CovenantTenet {
  Icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  contentKey: string;
}

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

const accordionVariants: Variants = {
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

// --- Covenant Data ---
const getCovenantTenets = (): CovenantTenet[] => [
  {
    Icon: Shield,
    titleKey: 'dataOwnership.title',
    contentKey: 'dataOwnership.content',
  },
  {
    Icon: GitCommit,
    titleKey: 'uptime.title',
    contentKey: 'uptime.content',
  },
  {
    Icon: Banknote,
    titleKey: 'billing.title',
    contentKey: 'billing.content',
  },
  {
    Icon: BrainCircuit,
    titleKey: 'toolRelationship.title',
    contentKey: 'toolRelationship.content',
  },
];

// --- Main Component ---
const LegalPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('components.atomic.organisms.legalPage');
  const covenantTenets = getCovenantTenets();

  // Handle hydration
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAccordionClick = useCallback(
    (index: number) => {
      setOpenIndex(openIndex === index ? -1 : index);
    },
    [openIndex]
  );

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Accessibility: Reduce motion for users who prefer it
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Use CSS classes that work with the theme system instead of dynamic objects
  const containerClasses =
    'font-sans flex min-h-screen flex-col items-center justify-center p-4 antialiased bg-background';
  const titleClasses = 'text-5xl font-black md:text-7xl text-teal-500';
  const descriptionClasses = 'mx-auto mt-4 max-w-3xl text-lg text-muted-foreground';
  const cardClasses = 'w-full max-w-4xl rounded-2xl border backdrop-blur-xl bg-card/60 border-border overflow-hidden';
  const buttonClasses =
    'mt-8 border px-6 py-3 transition-colors duration-300 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white';

  // Prevent hydration mismatch by not rendering animations until mounted
  if (!isMounted) {
    return (
      <div className={containerClasses}>
        <div className='mb-12 w-full max-w-4xl text-center'>
          <h1 className={titleClasses}>{t('hero.title')}</h1>
          <p className={descriptionClasses}>{t('hero.description')}</p>
        </div>

        <div className={cardClasses}>
          {covenantTenets.map((tenet, index) => (
            <div key={index} className='border-b border-border'>
              <button
                onClick={() => handleAccordionClick(index)}
                className='flex w-full items-center justify-between p-6 text-left'
                aria-expanded={openIndex === index}
              >
                <div className='flex items-center gap-4'>
                  <tenet.Icon className='h-7 w-7 flex-shrink-0 text-teal-500' />
                  <span className='text-xl font-bold text-teal-500'>
                    {t(
                      `covenant.${
                        Object.keys({
                          dataOwnership: 'dataOwnership',
                          uptime: 'uptime',
                          billing: 'billing',
                          toolRelationship: 'toolRelationship',
                        })[index]
                      }.title`
                    )}
                  </span>
                </div>
                <ChevronDown className='h-6 w-6 text-muted-foreground' />
              </button>
              {openIndex === index && (
                <div className='px-6 pb-6'>
                  <p className='text-lg text-muted-foreground'>
                    {t(
                      `covenant.${
                        Object.keys({
                          dataOwnership: 'dataOwnership',
                          uptime: 'uptime',
                          billing: 'billing',
                          toolRelationship: 'toolRelationship',
                        })[index]
                      }.content`
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={handleModalOpen} className={buttonClasses}>
          {t('viewFullLegal.buttonText')}
        </button>

        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'>
            <div className='relative flex h-[80vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-card p-8'>
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-2xl font-black text-teal-500'>{t('modal.title')}</h3>
                <button
                  onClick={handleModalClose}
                  className='rounded-full p-2 text-muted-foreground transition-colors hover:text-teal-500'
                >
                  <X size={20} />
                </button>
              </div>
              <div className='flex-grow overflow-y-auto whitespace-pre-wrap pr-4 text-sm text-muted-foreground'>
                {t('modal.fullLegalText')}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={containerClasses}
      initial='hidden'
      animate='visible'
      variants={prefersReducedMotion ? {} : containerVariants}
    >
      <div className='mb-12 w-full max-w-4xl text-center'>
        <motion.h1
          variants={prefersReducedMotion ? {} : itemVariants}
          className={`${titleClasses} will-change-transform`}
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p variants={prefersReducedMotion ? {} : itemVariants} className={descriptionClasses}>
          {t('hero.description')}
        </motion.p>
      </div>

      <motion.div
        variants={prefersReducedMotion ? {} : itemVariants}
        className={`${cardClasses} will-change-transform`}
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {covenantTenets.map((tenet, index) => (
          <div key={index} className='border-b border-border'>
            <button
              onClick={() => handleAccordionClick(index)}
              className='flex w-full items-center justify-between p-6 text-left'
              aria-expanded={openIndex === index}
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <div className='flex items-center gap-4'>
                <tenet.Icon className='h-7 w-7 flex-shrink-0 text-teal-500 will-change-transform' />
                <span className='text-xl font-bold text-teal-500'>
                  {t(
                    `covenant.${
                      Object.keys({
                        dataOwnership: 'dataOwnership',
                        uptime: 'uptime',
                        billing: 'billing',
                        toolRelationship: 'toolRelationship',
                      })[index]
                    }.title`
                  )}
                </span>
              </div>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='will-change-transform'
              >
                <ChevronDown className='h-6 w-6 text-muted-foreground' />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key='content'
                  initial='collapsed'
                  animate='open'
                  exit='collapsed'
                  variants={accordionVariants}
                  className='overflow-hidden'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                >
                  <p className='px-6 pb-6 text-lg text-muted-foreground'>
                    {t(
                      `covenant.${
                        Object.keys({
                          dataOwnership: 'dataOwnership',
                          uptime: 'uptime',
                          billing: 'billing',
                          toolRelationship: 'toolRelationship',
                        })[index]
                      }.content`
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      <motion.button
        onClick={handleModalOpen}
        variants={prefersReducedMotion ? {} : itemVariants}
        className={`${buttonClasses} will-change-transform`}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {t('viewFullLegal.buttonText')}
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
            onClick={(e) => e.target === e.currentTarget && handleModalClose()}
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              className='relative flex h-[80vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-card p-8 will-change-transform'
              onClick={(e) => e.stopPropagation()}
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-2xl font-black text-teal-500'>{t('modal.title')}</h3>
                <button
                  onClick={handleModalClose}
                  className='rounded-full p-2 text-muted-foreground transition-colors hover:text-teal-500'
                >
                  <X size={20} />
                </button>
              </div>
              <div className='flex-grow overflow-y-auto whitespace-pre-wrap pr-4 text-sm text-muted-foreground'>
                {t('modal.fullLegalText')}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LegalPage;
