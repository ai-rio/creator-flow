/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { AnimatePresence, motion } from 'framer-motion';

// --- Theme Context & Provider ---
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [theme, settheme] = useState<any>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// --- HIGH-QUALITY ICONS ---
const SunIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
    />
  </svg>
);
const FeedbackIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    />
  </svg>
);
const LightbulbIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707-.707m12.728 10.607l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);
const BugIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);
const CommentIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-8 w-8'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
    />
  </svg>
);
const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-12 w-12'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
  </svg>
);

// --- Helper Components ---
const GlassPane: React.FC<any> = ({ children, className }) => (
  <div
    className={`relative rounded-2xl border border-slate-300/50 bg-slate-200/50 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-black/20 ${className}`}
  >
    {children}
  </div>
);

// --- Feedback Widget Component ---
const FeedbackWidget = ({ isOpen, onClose }) => {
  const [step, setstep] = useState<any>(0); // 0: category, 1: form, 2: success
  const [feedbackType, setfeedbackType] = useState<any>(null);

  const handleCategorySelect = (type) => {
    setFeedbackType(type);
    setStep(1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // In a real app, you would submit the form data here
    console.log('Feedback submitted:', { type: feedbackType, message: e.target.message.value });
    setStep(2);
    setTimeout(() => {
      onClose();
      // Reset state for next time
      setTimeout(() => setStep(0), 300);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='absolute inset-0 bg-black/60 backdrop-blur-md' onClick={onClose} />
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <GlassPane className='relative w-full max-w-sm p-6'>
              <AnimatePresence mode='wait'>
                {step === 0 && (
                  <motion.div
                    key='step-0'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className='text-center text-xl font-bold text-slate-900 dark:text-white'>
                      Share Your Feedback
                    </h2>
                    <p className='mt-1 text-center text-sm text-slate-600 dark:text-slate-400'>
                      Your insight is critical. How can we improve?
                    </p>
                    <div className='mt-6 grid grid-cols-3 gap-4'>
                      <CategoryButton
                        icon={<LightbulbIcon />}
                        label='Idea'
                        onClick={() => handleCategorySelect('Idea')}
                      />
                      <CategoryButton icon={<BugIcon />} label='Bug' onClick={() => handleCategorySelect('Bug')} />
                      <CategoryButton
                        icon={<CommentIcon />}
                        label='Comment'
                        onClick={() => handleCategorySelect('Comment')}
                      />
                    </div>
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div
                    key='step-1'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h2 className='text-xl font-bold text-slate-900 dark:text-white'>Share a {feedbackType}</h2>
                    <form onSubmit={handleSubmit}>
                      <textarea
                        name='message'
                        required
                        minLength={10}
                        placeholder='Please be as detailed as possible...'
                        className='mt-4 h-32 w-full resize-none rounded-lg border border-slate-400/50 bg-slate-200/50 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700/50 dark:bg-slate-800/50 dark:focus:ring-purple-400'
                      ></textarea>
                      <div className='mt-4 flex justify-end gap-4'>
                        <button
                          type='button'
                          onClick={() => setStep(0)}
                          className='rounded-md px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-300/50 dark:text-slate-400 dark:hover:bg-slate-700/50'
                        >
                          Back
                        </button>
                        <button
                          type='submit'
                          className='rounded-md bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-900'
                        >
                          Submit Feedback
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key='step-2'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='text-center'
                  >
                    <div className='mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-teal-500/10 text-teal-500 dark:text-teal-400'>
                      <CheckIcon />
                    </div>
                    <h2 className='mt-4 text-xl font-bold text-slate-900 dark:text-white'>Thank You, CEO</h2>
                    <p className='mt-1 text-sm text-slate-600 dark:text-slate-400'>Your feedback has been received.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPane>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CategoryButton: React.FC<any> = ({ icon, label, onClick }) => (
  <motion.button
    onClick={onClick}
    className='flex flex-col items-center justify-center rounded-lg bg-slate-300/50 p-4 transition-colors hover:bg-slate-400/50 dark:bg-slate-800/50 dark:hover:bg-slate-700/50'
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className='text-slate-700 dark:text-slate-300'>{icon}</div>
    <span className='mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200'>{label}</span>
  </motion.button>
);

// --- DEMO APP ---
function AppContent() {
  const [widgetOpen, setwidgetOpen] = useState<any>(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className='relative flex min-h-screen items-center justify-center bg-slate-100 p-8 font-sans text-slate-900 dark:bg-[#0A090F] dark:text-slate-200'>
      <div className='absolute right-6 top-6'>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-200/50 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50'
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className='text-center'>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>Feedback Widget System</h1>
        <p className='mt-2 text-slate-600 dark:text-slate-400'>A direct line to the CEO's strategic mind.</p>
      </div>

      {/* Floating Action Button Trigger */}
      <div className='absolute bottom-8 right-8'>
        <motion.button
          onClick={() => setWidgetOpen(true)}
          className='flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FeedbackIcon />
          </motion.div>
        </motion.button>
      </div>

      <FeedbackWidget isOpen={widgetOpen} onClose={() => setWidgetOpen(false)} />
    </div>
  );
}

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
