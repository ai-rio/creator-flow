import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Megaphone, Share2, MessageSquare, Sun, Moon, X } from 'lucide-react';

// --- Configuration & Theming ---
const darkTheme = {
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
  toggleButton: 'bg-white/5 border-slate-100/10 text-slate-200',
};

const lightTheme = {
  background: 'linear-gradient(180deg, #f0f9ff 0%, #fafafa 100%)',
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
  toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

// --- Triage Data ---
const triageOptions = [
  {
    id: 'support',
    Icon: HelpCircle,
    title: 'Technical & Platform Support',
    subtitle: 'For active creators requiring operational assistance.',
    content: 'supportForm',
  },
  {
    id: 'press',
    Icon: Megaphone,
    title: 'Press & Media Inquiries',
    subtitle: 'For journalists, analysts, and content creators.',
    content: 'pressForm',
  },
  {
    id: 'partnerships',
    Icon: Share2,
    title: 'Partnership & Integration',
    subtitle: 'For technology partners and strategic alliances.',
    content: 'partnershipInfo',
  },
  {
    id: 'general',
    Icon: MessageSquare,
    title: 'General Inquiry',
    subtitle: 'For all other communication.',
    content: 'generalForm',
  },
];

// --- Content Components for Triage ---
const ContentRenderer = ({ contentId, theme }) => {
  switch (contentId) {
    case 'supportForm':
      return (
        <div>
          <p className={`${theme.textSecondary} mb-4`}>
            Please access our dedicated support portal for priority assistance.
          </p>
          <button
            className={`w-full border px-6 py-3 transition-colors duration-300 ${theme.buttonBorder} ${theme.accent} hover:${theme.buttonHoverBg} hover:${theme.buttonHoverText}`}
          >
            Access Support Portal
          </button>
        </div>
      );
    case 'pressForm':
      return (
        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Publication'
            className={`w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
          />
          <input
            type='text'
            placeholder='Topic / Subject'
            className={`w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
          />
          <textarea
            placeholder='Your message...'
            rows='4'
            className={`w-full resize-none rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
          />
          <button
            className={`w-full border px-6 py-3 transition-colors duration-300 ${theme.buttonBorder} ${theme.accent} hover:${theme.buttonHoverBg} hover:${theme.buttonHoverText}`}
          >
            Transmit Inquiry
          </button>
        </div>
      );
    case 'partnershipInfo':
      return (
        <div className='text-center'>
          <p className={`${theme.textSecondary} mb-2`}>
            For partnership proposals, please contact our strategic alliances team directly.
          </p>
          <a href='mailto:partnerships@creatorflow.com' className={`text-xl font-bold ${theme.accent}`}>
            partnerships@creatorflow.com
          </a>
        </div>
      );
    case 'generalForm':
      return (
        <div className='space-y-4'>
          <input
            type='email'
            placeholder='Your Email'
            className={`w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
          />
          <textarea
            placeholder='Your message...'
            rows='5'
            className={`w-full resize-none rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
          />
          <button
            className={`w-full border px-6 py-3 transition-colors duration-300 ${theme.buttonBorder} ${theme.accent} hover:${theme.buttonHoverBg} hover:${theme.buttonHoverText}`}
          >
            Send Message
          </button>
        </div>
      );
    default:
      return null;
  }
};

// --- Main Component ---
export default function TP010Contact() {
  const [theme, setTheme] = useState('dark');
  const [selectedId, setSelectedId] = useState(null);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const selectedOption = triageOptions.find((opt) => opt.id === selectedId);

  return (
    <div
      style={{ background: currentTheme.background }}
      className='flex min-h-screen flex-col items-center justify-center p-4 font-sans antialiased'
    >
      <ThemeToggleButton theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
      <div className='mb-12 w-full max-w-4xl text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-5xl font-black md:text-7xl ${currentTheme.textPrimary}`}
        >
          Communication Nexus
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mx-auto mt-4 max-w-2xl text-lg ${currentTheme.textSecondary}`}
        >
          How can the architects assist you? Select your intent to open the appropriate secure channel.
        </motion.p>
      </div>

      <div className='w-full max-w-4xl'>
        <motion.div layout className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {triageOptions.map((item) => (
            <motion.div
              layout
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`cursor-pointer rounded-2xl border p-6 ${currentTheme.glassBg} ${currentTheme.border}`}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div layout='position' className='flex items-center gap-4'>
                <item.Icon className={`${currentTheme.accent} h-8 w-8`} />
                <div>
                  <h3 className={`text-xl font-bold ${currentTheme.textPrimary}`}>{item.title}</h3>
                  <p className={`${currentTheme.textSecondary}`}>{item.subtitle}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
          >
            <div className='absolute inset-0 bg-black/70 backdrop-blur-sm' onClick={() => setSelectedId(null)} />
            <motion.div
              layout
              className={`relative w-full max-w-lg rounded-2xl border p-8 ${currentTheme.glassBg} ${currentTheme.border}`}
            >
              <button
                onClick={() => setSelectedId(null)}
                className={`absolute right-4 top-4 rounded-full p-2 ${currentTheme.textSecondary} hover:${currentTheme.accent}`}
              >
                <X size={20} />
              </button>
              <div className='mb-6 flex items-center gap-4'>
                <selectedOption.Icon className={`${currentTheme.accent} h-8 w-8`} />
                <h3 className={`text-2xl font-bold ${currentTheme.textPrimary}`}>{selectedOption.title}</h3>
              </div>
              <ContentRenderer contentId={selectedOption.content} theme={currentTheme} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ThemeToggleButton = ({ theme, setTheme, currentTheme }) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className={`fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${currentTheme.toggleButton}`}
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
