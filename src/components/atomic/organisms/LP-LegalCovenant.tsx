/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Banknote, BrainCircuit, ChevronDown, GitCommit, Moon, Shield, Sun, X } from 'lucide-react';
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

// Covenant Data
const covenantTenets = [
  {
    Icon: Shield,
    title: 'You Own Your Data. Period.',
    content:
      'Your business data, customer information, and analytics are yours alone. We are the custodians of your data, not the owners. We will never sell it, share it, or use it for any purpose other than providing and improving the CreatorFlow service you pay for.',
  },
  {
    Icon: GitCommit,
    title: 'Our Uptime is Your Lifeline.',
    content:
      'We understand that platform downtime equals lost revenue. We are architected for enterprise-grade reliability and commit to a 99.9% uptime, as outlined in our Service Level Agreement. When we fail to meet this standard, we will be transparent and make it right.',
  },
  {
    Icon: Banknote,
    title: 'Billing will be Clear and Fair.',
    content:
      'Your subscription costs will be transparent and based on the usage tiers you select. There will be no hidden fees or surprise charges. You can upgrade, downgrade, or cancel your plan at any time, with no questions asked.',
  },
  {
    Icon: BrainCircuit,
    title: 'We are a Tool, You are the Architect.',
    content:
      'CreatorFlow is a powerful operational tool, but you are the ultimate decision-maker for your business. Our relationship is based on this shared understanding. We are responsible for the performance and reliability of our platform; you are responsible for the strategic decisions you make using it.',
  },
];

const fullLegalText = `This is a placeholder for the full, unabridged legal Terms of Service. This document would contain all the necessary clauses, definitions, and legal requirements, ensuring full compliance and legal protection. It would be drafted by legal professionals to be comprehensive and binding. Key sections would include: Definitions, User Accounts, Permitted Use, Subscription and Billing, Data Ownership and Privacy, Service Level Agreement (SLA), Intellectual Property, Disclaimers, Limitation of Liability, Indemnification, Governing Law, and Changes to Terms. For the purpose of this definitive prototype, we acknowledge its necessity and place this text here to represent where the legally binding document would reside, accessible after the user has been presented with the clear, human-readable 'Definitive Summary' of our core principles.`;

// Accordion Item Component
const AccordionItem = ({ tenet, isOpen, onClick }: any) => (
  <div className='border-b border-border'>
    <button onClick={onClick} className='flex w-full items-center justify-between p-tactical text-left'>
      <div className='flex items-center gap-tactical'>
        <tenet.Icon className='h-icon-md w-icon-md flex-shrink-0 text-brand-teal-primary' />
        <span className='text-heading-md font-bold text-foreground'>{tenet.title}</span>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
        <ChevronDown className='h-icon-sm w-icon-sm text-muted-foreground' />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key='content'
          initial='collapsed'
          animate='open'
          exit='collapsed'
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='overflow-hidden'
        >
          <p className='px-tactical pb-tactical text-body-lg text-muted-foreground'>{tenet.content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Legal Modal Component
const LegalModal = ({ onClose }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='fixed inset-0 z-modal flex items-center justify-center bg-background/70 p-tactical backdrop-blur-sm'
    onClick={onClose}
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className='relative flex h-[80vh] w-full max-w-content flex-col rounded-executive border border-border bg-card/60 p-strategic backdrop-blur-lg'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='mb-tactical flex items-center justify-between'>
        <h3 className='text-heading-lg font-black text-brand-teal-primary'>Full Legal Covenant</h3>
        <Button
          onClick={onClose}
          variant='ghost'
          size='icon'
          className='rounded-full text-muted-foreground hover:text-brand-teal-primary'
        >
          <X className='h-icon-sm w-icon-sm' />
        </Button>
      </div>
      <div className='flex-grow overflow-y-auto whitespace-pre-wrap pr-tactical text-body-sm text-muted-foreground'>
        {fullLegalText}
      </div>
    </motion.div>
  </motion.div>
);

// Main Legal Covenant Component
const LegalCovenant = () => {
  const { theme, setTheme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background p-tactical font-sans antialiased'>
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
      <div className='mb-command w-full max-w-content text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-heading-2xl md:text-heading-3xl font-black text-foreground'
        >
          The Covenant of Clarity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mx-auto mt-tactical max-w-prose text-body-lg text-muted-foreground'
        >
          Legal documents are necessary, but they shouldn&apos;t be confusing. These are the core, human-readable
          principles that govern our relationship. This is our promise to you.
        </motion.p>
      </div>

      <div className='w-full max-w-content overflow-hidden rounded-executive border border-border bg-card/60 backdrop-blur-xl'>
        {covenantTenets.map((tenet, index) => (
          <AccordionItem
            key={index}
            tenet={tenet}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>

      <Button
        onClick={() => setIsModalOpen(true)}
        variant='outline'
        className='mt-strategic border-brand-teal-primary text-brand-teal-primary hover:bg-brand-teal-primary hover:text-background'
      >
        View Full Legal Covenant
      </Button>

      <AnimatePresence>{isModalOpen && <LegalModal onClose={() => setIsModalOpen(false)} />}</AnimatePresence>
    </div>
  );
};

// Theme Toggle Button Component
const ThemeToggleButton: React.FC<any> = ({ theme, setTheme }: any) => {
  return (
    <motion.div
      className='fixed bottom-tactical right-tactical z-header'
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9, rotate: -15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variant='outline'
        size='icon'
        className='h-12 w-12 rounded-full border-border/20 bg-card/80 backdrop-blur-xl'
        aria-label='Toggle theme'
      >
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? <Sun className='h-icon-sm w-icon-sm' /> : <Moon className='h-icon-sm w-icon-sm' />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

// Export wrapper
const AppContent = () => {
  return <LegalCovenant />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
