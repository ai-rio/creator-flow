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
const DashboardIcon = () => (
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
      d='M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    />
  </svg>
);
const DataArtIcon = () => (
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
      d='M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
    />
  </svg>
);
const AutomationIcon = () => (
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
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    />
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
  </svg>
);
const IntelligenceIcon = () => (
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
      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M6.343 6.343l-.707-.707m12.728 10.607l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);
const TiktokIcon = () => (
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
      d='M15.55 5.55a5 5 0 017.07 7.07M15.55 5.55a5 5 0 00-7.07 7.07M6.46 19.54a5 5 0 010-7.07M6.46 19.54L2 22'
    />
  </svg>
);
const MarketIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
  </svg>
);
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

// --- Helper Components ---
const GlassPane: React.FC<any> = ({ children, className }) => (
  <div
    className={`relative rounded-2xl border border-slate-300/50 bg-slate-200/50 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-black/20 ${className}`}
  >
    {children}
  </div>
);

// --- Core Sidebar Component ---
const Sidebar = () => {
  const [isCollapsed, setisCollapsed] = useState<any>(true);

  const NavLink: React.FC<any> = ({ icon, children }) => (
    <a
      href='#'
      className='flex items-center gap-4 rounded-lg px-4 py-2.5 text-slate-600 transition-colors duration-200 hover:bg-slate-300/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-white'
    >
      <div className='h-6 w-6 flex-shrink-0'>{icon}</div>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='whitespace-nowrap font-semibold'
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 88 : 256 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className='relative h-full'
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <GlassPane className='flex h-full flex-col justify-between p-4'>
        <div>
          <div className={`mb-12 flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
            <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-teal-500 to-purple-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='whitespace-nowrap text-xl font-bold text-slate-900 dark:text-white'
                >
                  CreatorFlow
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
          <nav className='flex flex-col gap-3'>
            <NavLink icon={<DashboardIcon />}>Strategic Command</NavLink>
            <NavLink icon={<DataArtIcon />}>Data Art</NavLink>
            <NavLink icon={<AutomationIcon />}>Automation</NavLink>
            <NavLink icon={<IntelligenceIcon />}>Executive Intel</NavLink>
            <NavLink icon={<TiktokIcon />}>TikTok Empire</NavLink>
            <NavLink icon={<MarketIcon />}>Market Intel</NavLink>
          </nav>
        </div>
        <div
          className={`flex items-center gap-3 border-t border-slate-300/70 pt-4 dark:border-slate-700/50 ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <img
            className='h-10 w-10 flex-shrink-0 rounded-full object-cover'
            src='https://placehold.co/100x100/8466D3/FFFFFF?text=C'
            alt='Creator Avatar'
          />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='whitespace-nowrap'
              >
                <p className='font-bold text-slate-900 dark:text-white'>@ceo</p>
                <p className='text-xs text-slate-600 dark:text-slate-400'>Creator Tier</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassPane>
    </motion.aside>
  );
};

// --- DEMO APP ---
export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex h-screen min-h-screen gap-6 bg-slate-100 p-6 font-sans text-slate-900 dark:bg-[#0A090F] dark:text-slate-200'>
      <Sidebar />
      <main className='flex flex-1 flex-col'>
        <div className='flex flex-grow items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-slate-900 dark:text-white'>Main Content Area</h1>
            <p className='mt-2 text-slate-600 dark:text-slate-400'>
              Hover over the floating sidebar to see the expansion effect.
            </p>
          </div>
        </div>
      </main>
      <div className='absolute right-6 top-6'>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-200/50 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50'
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
}
