import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Download, Eraser, Loader, Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

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
  danger: 'text-red-400',
  glassBg: 'bg-black/30',
  border: 'border-slate-100/10',
  buttonBorder: 'border-slate-100/20',
  buttonHoverBg: 'bg-white/10',
  dangerButtonBg: 'bg-red-500/80',
  dangerButtonHoverBg: 'bg-red-500',
  dangerButtonText: 'text-white',
  toggleButton: 'bg-white/5 border-slate-100/10 text-slate-200',
};

const lightTheme = {
  background: 'linear-gradient(180deg, #f0f9ff 0%, #fafafa 100%)',
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  accent: 'text-teal-600',
  danger: 'text-red-600',
  glassBg: 'bg-white/60',
  border: 'border-slate-300',
  buttonBorder: 'border-slate-400',
  buttonHoverBg: 'bg-black/5',
  dangerButtonBg: 'bg-red-600',
  dangerButtonHoverBg: 'bg-red-700',
  dangerButtonText: 'text-white',
  toggleButton: 'bg-slate-800/5 border-slate-900/10 text-slate-800',
};

// --- Data Dossier Compilation Steps ---
const compilationSteps = [
  'Collating Account Data...',
  'Compiling Operational Logs...',
  'Encrypting Secure Dossier...',
  'Ready for Transmission.',
];

// --- Sub Components ---
const CompilationChamber: React.FC<any> = ({ theme }: any) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (currentStep < compilationSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const isComplete = currentStep === compilationSteps.length - 1;

  return (
    <div className='mt-4 border-t border-slate-100/10 pt-4'>
      <div className='space-y-3'>
        {compilationSteps.map((step, index) => (
          <div key={index} className='flex items-center gap-3'>
            {index < currentStep ? (
              <CheckCircle className={`${theme.accent} h-5 w-5`} />
            ) : (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Loader className={`${theme.textSecondary} h-5 w-5`} />
              </motion.div>
            )}
            <span className={index <= currentStep ? theme.textPrimary : theme.textSecondary}>{step}</span>
          </div>
        ))}
      </div>
      {isComplete && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-6 w-full rounded-md border px-5 py-2 font-semibold transition-colors duration-300 ${theme.buttonBorder} ${theme.accent} hover:${theme.buttonHoverBg}`}
        >
          Download Secure Dossier
        </motion.button>
      )}
    </div>
  );
};

const DataRightModule: React.FC<any> = ({ right, onAction, theme }: any) => {
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (right.id === 'access') {
      setIsCompiling(true);
    } else {
      onAction(right);
    }
  };

  return (
    <motion.div
      layout
      className={`rounded-2xl border p-6 backdrop-blur-xl ${theme.glassBg} ${
        right.isDangerous ? 'border-red-500/30' : theme.border
      }`}
    >
      <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
        <div className='flex items-start gap-4'>
          <right.Icon className={`${right.isDangerous ? theme.danger : theme.accent} mt-1 h-8 w-8 flex-shrink-0`} />
          <div>
            <h3 className={`text-xl font-bold ${theme.textPrimary}`}>{right.title}</h3>
            <p className={`${theme.textSecondary} mt-1`}>{right.description}</p>
          </div>
        </div>
        {!isCompiling && (
          <button
            onClick={handleButtonClick}
            className={`mt-4 flex-shrink-0 rounded-md border px-5 py-2 font-semibold transition-colors duration-300 md:ml-6 md:mt-0 ${
              right.isDangerous
                ? `border-red-500/50 ${theme.danger} hover:bg-red-500/10`
                : `${theme.buttonBorder} ${theme.textPrimary} hover:${theme.buttonHoverBg}`
            }`}
          >
            {right.buttonText}
          </button>
        )}
      </div>
      <AnimatePresence>{isCompiling && <CompilationChamber theme={theme} />}</AnimatePresence>
    </motion.div>
  );
};

const ConfirmationModal = ({ onConfirm, onCancel, theme }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className={`relative w-full max-w-md rounded-2xl border p-8 text-center ${theme.glassBg} ${theme.border}`}
    >
      <AlertTriangle className={`mx-auto h-12 w-12 ${theme.danger}`} />
      <h2 className={`mt-4 text-2xl font-bold ${theme.textPrimary}`}>Final Confirmation Required</h2>
      <p className={`mt-2 text-base ${theme.textSecondary}`}>
        This action is permanent and cannot be undone. All of your data will be queued for irreversible erasure. Are you
        absolutely certain you wish to proceed?
      </p>
      <div className='mt-6 flex justify-center gap-4'>
        <button
          onClick={onCancel}
          className={`rounded-md border px-6 py-2 font-semibold ${theme.buttonBorder} ${theme.textPrimary} hover:${theme.buttonHoverBg}`}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`rounded-md px-6 py-2 font-semibold ${theme.dangerButtonBg} ${theme.dangerButtonText} hover:${theme.dangerButtonHoverBg}`}
        >
          Confirm Erasure
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// --- Main Component ---
export default function GDPRDataSovereignty(): React.JSX.Element {
  const [theme, setTheme] = useState<string>('dark');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const dataRights = [
    {
      id: 'access',
      Icon: Download,
      title: 'Request Full Data Dossier',
      description:
        'Initiate a secure, automated process to download a complete dossier of your account information, operational data, and system logs.',
      buttonText: 'Request Dossier',
      isDangerous: false,
    },
    {
      id: 'erasure',
      Icon: Eraser,
      title: "Initiate 'Right to be Forgotten' Protocol",
      description:
        'Execute the permanent and irreversible erasure of your entire account. This action cannot be undone.',
      buttonText: 'Initiate Protocol',
      isDangerous: true,
    },
  ];

  const handleActionClick = (right: any) => {
    if (right.isDangerous) setIsModalOpen(true);
  };

  const handleConfirmErasure = () => {
    setIsModalOpen(false);
    alert("'Right to be Forgotten' protocol has been initiated.");
  };

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
          Data Sovereignty Protocol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mx-auto mt-4 max-w-3xl text-lg ${currentTheme.textSecondary}`}
        >
          You are the sovereign owner of your data. This is not a policy to be read; it is a command center for you to
          control your data&apos;s lifecycle.
        </motion.p>
      </div>

      <div className='w-full max-w-3xl space-y-6'>
        {dataRights.map((right, i) => (
          <motion.div
            key={right.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <DataRightModule right={right} onAction={handleActionClick} theme={currentTheme} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ConfirmationModal
            onConfirm={handleConfirmErasure}
            onCancel={() => setIsModalOpen(false)}
            theme={currentTheme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const ThemeToggleButton = ({ theme, setTheme, currentTheme }: any) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className={`fixed right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl ${currentTheme.toggleButton}`}
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
