import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GitCommit, Banknote, BrainCircuit, ChevronDown, Sun, Moon, X } from 'lucide-react';

// --- Configuration & Theming ---
const darkTheme = {
    background: '#0A090F',
    textPrimary: 'text-slate-200',
    textSecondary: 'text-slate-400',
    accent: 'text-teal-300',
    glassBg: 'bg-black/30',
    border: 'border-slate-100/10',
    buttonBorder: 'border-teal-300',
    buttonHoverBg: 'bg-teal-300',
    buttonHoverText: 'text-black',
    toggleButton: 'bg-white/5 border-slate-100/10 text-slate-200',
};

const lightTheme = {
    background: 'linear-gradient(180deg, #f0f9ff 0%, #fafafa 100%)',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accent: 'text-teal-600',
    glassBg: 'bg-white/60',
    border: 'border-slate-300',
    buttonBorder: 'border-teal-600',
    buttonHoverBg: 'bg-teal-600',
    buttonHoverText: 'text-white',
    toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

// --- Covenant Data ---
const covenantTenets = [
    {
        Icon: Shield,
        title: "You Own Your Data. Period.",
        content: "Your business data, customer information, and analytics are yours alone. We are the custodians of your data, not the owners. We will never sell it, share it, or use it for any purpose other than providing and improving the CreatorFlow service you pay for."
    },
    {
        Icon: GitCommit,
        title: "Our Uptime is Your Lifeline.",
        content: "We understand that platform downtime equals lost revenue. We are architected for enterprise-grade reliability and commit to a 99.9% uptime, as outlined in our Service Level Agreement. When we fail to meet this standard, we will be transparent and make it right."
    },
    {
        Icon: Banknote,
        title: "Billing will be Clear and Fair.",
        content: "Your subscription costs will be transparent and based on the usage tiers you select. There will be no hidden fees or surprise charges. You can upgrade, downgrade, or cancel your plan at any time, with no questions asked."
    },
    {
        Icon: BrainCircuit,
        title: "We are a Tool, You are the Architect.",
        content: "CreatorFlow is a powerful operational tool, but you are the ultimate decision-maker for your business. Our relationship is based on this shared understanding. We are responsible for the performance and reliability of our platform; you are responsible for the strategic decisions you make using it."
    }
];

const fullLegalText = `This is a placeholder for the full, unabridged legal Terms of Service. This document would contain all the necessary clauses, definitions, and legal requirements, ensuring full compliance and legal protection. It would be drafted by legal professionals to be comprehensive and binding. Key sections would include: Definitions, User Accounts, Permitted Use, Subscription and Billing, Data Ownership and Privacy, Service Level Agreement (SLA), Intellectual Property, Disclaimers, Limitation of Liability, Indemnification, Governing Law, and Changes to Terms. For the purpose of this definitive prototype, we acknowledge its necessity and place this text here to represent where the legally binding document would reside, accessible after the user has been presented with the clear, human-readable 'Definitive Summary' of our core principles.`;

// --- Accordion Item Component ---
const AccordionItem = ({ tenet, isOpen, onClick, theme }) => (
    <div className={`border-b ${theme.border}`}>
        <button onClick={onClick} className="flex w-full items-center justify-between p-6 text-left">
            <div className="flex items-center gap-4">
                <tenet.Icon className={`${theme.accent} h-7 w-7 flex-shrink-0`} />
                <span className={`text-xl font-bold ${theme.textPrimary}`}>{tenet.title}</span>
            </div>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown className={`${theme.textSecondary} h-6 w-6`} />
            </motion.div>
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                >
                    <p className={`px-6 pb-6 text-lg ${theme.textSecondary}`}>{tenet.content}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// --- Legal Modal ---
const LegalModal = ({ onClose, theme }) => (
     <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
    >
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={`relative h-[80vh] w-full max-w-4xl rounded-2xl border p-8 flex flex-col ${theme.glassBg} ${theme.border}`}
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-2xl font-black ${theme.accent}`}>Full Legal Covenant</h3>
                 <button onClick={onClose} className={`p-2 rounded-full ${theme.textSecondary} hover:${theme.accent}`}>
                    <X size={20} />
                </button>
            </div>
            <div className={`flex-grow overflow-y-auto pr-4 text-sm ${theme.textSecondary} whitespace-pre-wrap`}>
                {fullLegalText}
            </div>
        </motion.div>
    </motion.div>
);

// --- Main Component ---
export default function LP010Legal() {
    const [theme, setTheme] = useState('dark');
    const [openIndex, setOpenIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    return (
        <div style={{ background: currentTheme.background }} className="font-sans flex min-h-screen flex-col items-center justify-center p-4 antialiased">
            <ThemeToggleButton theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
            <div className="w-full max-w-4xl text-center mb-12">
                 <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`text-5xl font-black md:text-7xl ${currentTheme.textPrimary}`}>
                    The Covenant of Clarity
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`mx-auto mt-4 max-w-3xl text-lg ${currentTheme.textSecondary}`}>
                    Legal documents are necessary, but they shouldn't be confusing. These are the core, human-readable principles that govern our relationship. This is our promise to you.
                </motion.p>
            </div>
            
            <div className={`w-full max-w-4xl rounded-2xl border backdrop-blur-xl ${currentTheme.glassBg} ${currentTheme.border} overflow-hidden`}>
                {covenantTenets.map((tenet, index) => (
                    <AccordionItem 
                        key={index}
                        tenet={tenet}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        theme={currentTheme}
                    />
                ))}
            </div>

            <motion.button 
                onClick={() => setIsModalOpen(true)}
                className={`mt-8 border px-6 py-3 transition-colors duration-300 ${currentTheme.buttonBorder} ${currentTheme.accent} hover:${currentTheme.buttonHoverBg} hover:${currentTheme.buttonHoverText}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                View Full Legal Covenant
            </motion.button>
            
            <AnimatePresence>
                {isModalOpen && <LegalModal onClose={() => setIsModalOpen(false)} theme={currentTheme} />}
            </AnimatePresence>

        </div>
    );
}

const ThemeToggleButton = ({ theme, setTheme, currentTheme }) => (
    <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`fixed bottom-4 right-4 z-[60] h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl border ${currentTheme.toggleButton}`}
        aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);
