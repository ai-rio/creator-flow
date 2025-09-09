import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Moon, Sun, X } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

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
  toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

// --- Mission Data ---
const missions = [
  {
    title: 'Architect the Multi-Carrier Shipping System',
    directive:
      "The single greatest threat to a creator's profitability is the 'shipping tax'—a silent killer composed of non-optimized rates, manual processing, and operational friction. Your mission is to architect and build a definitive, multi-carrier rate shopping engine from first principles, transforming shipping from a creator's biggest cost center into a new source of competitive advantage and profit.",
    successCriteria: [
      'Achieve a 15-25% average shipping cost reduction.',
      'Execute label generation in under 30 seconds.',
      'Maintain 99.5% uptime across all carrier API integrations.',
      'Provide strategic, actionable tracking intelligence.',
    ],
  },
  {
    title: 'Forge the Predictive Analytics Engine',
    directive:
      'Creator growth is driven by momentum, but momentum creates chaos. The mission is to build an analytics engine that transforms raw sales data into predictive wisdom. This system must forecast inventory needs, identify emerging product trends, and provide clear, actionable insights that allow creators to make strategic decisions before they become operational emergencies.',
    successCriteria: [
      'Reduce stockouts by 78% through accurate demand forecasting.',
      'Deliver growth analytics with <5 minute data freshness.',
      'Maintain <500ms query response for all standard reports.',
      'Achieve a 23% average revenue increase for creators using the engine.',
    ],
  },
];

// --- Animation Variants ---
const dossierVariants = {
  enter: (direction: any) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: any) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' as any } },
};

// --- Sub Components ---
const SubmissionModal = ({ mission, onClose, theme }: any) => (
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
      <h3 className={`text-2xl font-black ${theme.accent}`}>Transmit Protocol</h3>
      <p className={`${theme.textPrimary} mt-1`}>Mission: {mission.title}</p>

      <div className='mt-6 border-t border-slate-100/10 pt-6'>
        <p className={`mb-4 font-bold ${theme.textPrimary}`}>Secure Transmission Header:</p>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <label className={`text-sm ${theme.textSecondary}`}>Codename / Alias</label>
            <input
              type='text'
              className={`mt-1 w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
            />
          </div>
          <div>
            <label className={`text-sm ${theme.textSecondary}`}>Secure Channel (Email)</label>
            <input
              type='email'
              className={`mt-1 w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
            />
          </div>
        </div>
        <div className='mt-4'>
          <label className={`text-sm ${theme.textSecondary}`}>Proof of Work (URL)</label>
          <input
            type='url'
            className={`mt-1 w-full rounded-md border bg-transparent p-2 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
          />
        </div>
      </div>

      <div className='mt-6 border-t border-slate-100/10 pt-6'>
        <label className={`mb-2 block font-bold ${theme.textPrimary}`}>The Challenge:</label>
        <p className={`${theme.textSecondary} mb-4 text-sm`}>
          In 500 words or less, outline your first-principles approach to architecting a system that achieves the
          non-negotiable success criteria. We are not looking for a list of technologies; we are looking for your
          strategic and architectural philosophy.
        </p>
        <textarea
          rows={6}
          className={`w-full resize-none rounded-lg border bg-transparent p-3 focus:outline-none focus:ring-2 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} focus:${theme.inputFocusBorder}`}
        />
      </div>

      <button
        className={`mt-6 w-full border px-6 py-3 transition-colors duration-300 ${theme.buttonBorder} ${theme.accent} hover:${theme.buttonHoverBg} hover:${theme.buttonHoverText}`}
      >
        Transmit Protocol
      </button>
    </motion.div>
  </motion.div>
);

const ThemeToggleButton = ({ theme, setTheme, currentTheme }: any) => (
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

// --- Main Component ---
export default function CP020OpenMissions(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const [[page, direction], setPage] = useState([0, 0]);
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const paginate = (newDirection: any) => {
    const newPageIndex = (page + newDirection + missions.length) % missions.length;
    setPage([newPageIndex, newDirection]);
  };

  const mission = missions[page];

  return (
    <div
      style={{ background: currentTheme.background }}
      className='flex min-h-screen items-center justify-center p-4 font-sans antialiased'
    >
      <ThemeToggleButton theme={theme} setTheme={setTheme} currentTheme={currentTheme} />

      <motion.div
        className={`relative h-[650px] w-full max-w-4xl rounded-2xl border backdrop-blur-xl ${currentTheme.glassBg} ${currentTheme.border}`}
        animate={{ filter: isModalOpen ? 'blur(10px)' : 'blur(0px)' }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex h-full flex-col p-8 md:p-12'>
          <div className='flex items-center justify-between border-b border-slate-100/10 pb-4'>
            <h2 className={`${currentTheme.textSecondary} text-sm font-bold uppercase tracking-widest`}>
              Active Missions
            </h2>
            <div className='flex gap-2'>
              <button
                onClick={() => paginate(-1)}
                className={`rounded-full p-2 ${currentTheme.textSecondary} hover:${currentTheme.accent}`}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => paginate(1)}
                className={`rounded-full p-2 ${currentTheme.textSecondary} hover:${currentTheme.accent}`}
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
                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className='absolute inset-0 flex flex-col'
              >
                <h3 className={`text-3xl font-black ${currentTheme.accent} mb-4`}>{mission.title}</h3>
                <p className={`${currentTheme.textSecondary} text-lg leading-relaxed`}>{mission.directive}</p>

                <div className='my-6 space-y-3'>
                  <h4 className={`${currentTheme.textPrimary} font-bold`}>Success Criteria (Non-Negotiable):</h4>
                  {mission.successCriteria.map((criterion, i) => (
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
                  Accept Mission & Submit Protocol
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
}
