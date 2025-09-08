/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { AnimatePresence, motion } from 'framer-motion';
import {
  AreaChart,
  BarChart,
  Bell,
  Book,
  Bot,
  ChevronDown,
  CircleHelp,
  Flame,
  Gauge,
  LogOut,
  Moon,
  Pin,
  PinOff,
  Radio,
  ServerCog,
  Settings,
  ShieldAlert,
  Sun,
  Target,
  User,
  Wrench,
  Zap,
} from 'lucide-react';

// --- THEME MANAGEMENT (Placeholder for brevity) ---
const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className='rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-500/10 dark:text-slate-400'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

// --- BASE COMPONENT: GlassPane (Placeholder for brevity) ---
const GlassPane: React.FC<any> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/60 backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-400/10 ${className}`}
  >
    {children}
  </div>
);

// --- HOOK for detecting outside clicks (Placeholder for brevity) ---
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

// --- A-SERIES COMPONENTS (Admin) ---

// [BUILT & THEMED] A1: AdminDesktopHeader
const AdminDesktopHeader = ({ theme, setTheme }) => {
  const [isDropdownOpen, setisDropdownOpen] = useState<any>(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className='fixed left-4 right-4 top-4 z-50'
    >
      <GlassPane className='flex items-center justify-between p-3 px-6'>
        <div className='flex items-center gap-4'>
          <Zap className='text-purple-700 dark:text-purple-400' />
          <h1 className='hidden text-xl font-bold text-slate-900 dark:text-slate-100 md:block'>
            CreatorFlow Admin Command Center
          </h1>
        </div>
        <div className='flex items-center gap-4'>
          {/* ... other header items ... */}
          <div className='relative' ref={dropdownRef}>
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2'
            >
              <img
                src='https://placehold.co/32x32/0A090F/E2E8F0?text=A'
                alt='Admin Avatar'
                className='h-8 w-8 rounded-full'
              />
              <span className='hidden text-sm font-bold lg:block'>admin</span>
              <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>
            {/* Dropdown Menu */}
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </GlassPane>
    </motion.header>
  );
};

// [REBUILT with Hover & Pin] A2: AdminSidebarNav
const NavItem = ({ item, isExpanded }) => {
  return (
    <li>
      <button
        className={`flex w-full items-center gap-4 rounded-lg p-3 text-left text-slate-700 transition-colors hover:bg-slate-500/10 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-slate-300 ${
          !isExpanded && 'justify-center'
        }`}
      >
        {item.icon}
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='whitespace-nowrap text-sm font-semibold'
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </li>
  );
};
const AdminSidebarNav = ({ isExpanded, isPinned, onPinToggle, onHoverStart, onHoverEnd }) => {
  const navItems = [
    { icon: <ServerCog size={20} />, label: 'System Monitoring' },
    { icon: <ShieldAlert size={20} />, label: 'Crisis Management' },
    { icon: <Gauge size={20} />, label: 'Performance' },
    { icon: <BarChart size={20} />, label: 'Analytics' },
    { icon: <Bell size={20} />, label: 'Alert Management' },
    { icon: <Settings size={20} />, label: 'System Controls' },
    { icon: <AreaChart size={20} />, label: 'Capacity Planning' },
    { icon: <CircleHelp size={20} />, label: 'Help & Support' },
  ];

  return (
    <motion.aside
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className='fixed bottom-4 left-4 top-24 z-40 hidden flex-col md:flex'
      initial={false}
      animate={{ width: isExpanded ? '16rem' : '4.5rem' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-white/30 p-2 dark:bg-slate-500/5'>
        <nav className='flex-grow'>
          <ul className='flex flex-col gap-2'>
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} isExpanded={isExpanded} />
            ))}
          </ul>
        </nav>
        <div>
          <button
            onClick={onPinToggle}
            className={`flex w-full items-center gap-4 rounded-lg p-3 text-slate-700 hover:bg-slate-500/10 dark:text-slate-300 ${
              !isExpanded && 'justify-center'
            }`}
            aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            <motion.div animate={{ rotate: isPinned ? 45 : 0 }}>
              <Pin size={20} />
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='text-sm font-semibold'
                >
                  Pin
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

// --- PLACEHOLDER COMPONENTS ---
const PlaceholderCard: React.FC<any> = ({ title }) => (
  <motion.div>
    <GlassPane className='flex min-h-[12rem] items-center justify-center p-4'>
      <h2 className='text-xl font-bold text-slate-500'>{title}</h2>
    </GlassPane>
  </motion.div>
);

// --- MAIN ADMIN APP CONTAINER ---
export default function App(): React.JSX.Element {
  const [theme, settheme] = useState<any>('dark');
  const [isHovered, setisHovered] = useState<any>(false);
  const [isPinned, setisPinned] = useState<any>(false);

  const isExpanded = isPinned || isHovered;

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className='min-h-screen bg-slate-100 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0A090F] dark:text-slate-100'>
      <AdminDesktopHeader theme={theme} setTheme={setTheme} />
      <AdminSidebarNav
        isExpanded={isExpanded}
        isPinned={isPinned}
        onPinToggle={() => setIsPinned(!isPinned)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      />
      <main className={`px-4 pt-24 transition-all duration-300 ease-in-out ${isExpanded ? 'md:ml-72' : 'md:ml-24'}`}>
        <div className='space-y-8 p-4'>
          <PlaceholderCard title='A3: Unified System Health' />
          <PlaceholderCard title='A4: Critical System Alerts' />
          <PlaceholderCard title='A5: System Performance Artistry' />
          <PlaceholderCard title='A6: Emergency System Controls' />
        </div>
      </main>
    </div>
  );
}
