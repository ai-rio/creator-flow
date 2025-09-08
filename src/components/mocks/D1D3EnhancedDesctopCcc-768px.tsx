/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  BrainCircuit,
  ChevronDown,
  ChevronsLeft,
  Clapperboard,
  DollarSign,
  Flame,
  Globe,
  Moon,
  Package,
  Palette,
  RadioTower,
  Rocket,
  ShieldCheck,
  Sun,
  Target,
  TrendingUp,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react';

// --- THEME MANAGEMENT ---
const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className='rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-500/10 dark:text-slate-400'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

// --- BASE COMPONENT: GlassPane ---
const GlassPane: React.FC<any> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/50 backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-400/10 ${className}`}
  >
    {children}
  </div>
);

// --- D-SERIES COMPONENTS (Desktop) ---

// D1: ExecutiveDesktopHeader
const ExecutiveDesktopHeader = ({ theme, setTheme }) => {
  const systemIcons = [
    { icon: <Target size={16} />, key: 'target' },
    { icon: <Flame size={16} />, key: 'flame' },
    { icon: <Bot size={16} />, key: 'bot' },
    { icon: <Truck size={16} />, key: 'truck' },
    { icon: <Package size={16} />, key: 'package' },
  ];
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className='fixed left-4 right-4 top-4 z-50'
    >
      <GlassPane className='flex items-center justify-between p-3 px-6'>
        <div className='flex items-center gap-4'>
          <Zap className='text-purple-700 dark:text-purple-400' />
          <h1 className='hidden text-xl font-bold text-slate-900 dark:text-slate-100 md:block'>
            CreatorFlow CEO Command Center
          </h1>
          <h1 className='text-xl font-bold text-slate-900 dark:text-slate-100 md:hidden'>CEO CC</h1>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-3 rounded-full bg-slate-500/5 p-2'>
            {systemIcons.map((item) => (
              <div key={item.key} className='text-teal-800 dark:text-teal-400'>
                {item.icon}
              </div>
            ))}
          </div>
          <div className='h-6 w-px bg-slate-900/10 dark:border-slate-100/10'></div>
          <div className='flex items-center gap-2'>
            <img
              src='https://placehold.co/32x32/0A090F/E2E8F0?text=CEO'
              alt='CEO Avatar'
              className='h-8 w-8 rounded-full border-2 border-slate-500/20'
            />
            <span className='hidden text-sm font-bold text-slate-800 dark:text-slate-200 lg:block'>@ceo</span>
            <ChevronDown size={16} className='text-slate-600 dark:text-slate-400' />
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </GlassPane>
    </motion.header>
  );
};

// D2: DesktopSidebarNav (Collapsible)
const DesktopSidebarNav = ({ isCollapsed, setIsCollapsed }) => {
  const navItems = [
    { icon: <BrainCircuit size={20} />, label: 'Strategic Command' },
    { icon: <Palette size={20} />, label: 'Data Art' },
    { icon: <Rocket size={20} />, label: 'Automation Liberation' },
    { icon: <BarChart3 size={20} />, label: 'Executive Intelligence' },
    { icon: <RadioTower size={20} />, label: 'TikTok Empire' },
    { icon: <TrendingUp size={20} />, label: 'Market Intelligence' },
    { icon: <Globe size={20} />, label: 'Multi-Platform' },
    { icon: <ShieldCheck size={20} />, label: 'Advanced Analytics' },
    { icon: <Wrench size={20} />, label: 'Predictive Intel' },
  ];
  return (
    <motion.aside
      className='fixed bottom-4 left-4 top-24 z-40 hidden flex-col md:flex'
      initial={false}
      animate={{ width: isCollapsed ? '4.5rem' : '16rem' }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <div className='flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-white/30 p-2 dark:bg-slate-500/5'>
        <nav className='flex-grow'>
          <ul className='flex flex-col gap-2'>
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`flex w-full items-center gap-4 rounded-lg p-3 text-left text-slate-700 transition-colors hover:bg-slate-500/10 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-slate-300 ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                >
                  {item.icon}
                  <AnimatePresence>
                    {' '}
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className='whitespace-nowrap text-sm font-semibold'
                      >
                        {item.label}
                      </motion.span>
                    )}{' '}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className='p-2'>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex w-full items-center gap-4 rounded-lg p-3 text-left text-slate-700 transition-colors hover:bg-slate-500/10 dark:text-slate-300 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            aria-label='Toggle sidebar'
          >
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
              {' '}
              <ChevronsLeft size={20} />{' '}
            </motion.div>
            <AnimatePresence>
              {' '}
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='text-sm font-semibold'
                >
                  Collapse
                </motion.span>
              )}{' '}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

// [NEWLY BUILT & THEMED] D3: CrossSystemMasterpieceCard
const SymphonyCard: React.FC<any> = ({ icon, title, subtitle, primaryMetric, secondaryMetric, colorClass }) => (
  <GlassPane className='flex flex-col justify-between p-4'>
    <div>
      <div className={`mb-2 flex items-center gap-3`}>
        <div className={colorClass}>{icon}</div>
        <h3 className='font-bold text-slate-900 dark:text-slate-100'>{title}</h3>
      </div>
      <p className='mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400'>{subtitle}</p>
    </div>
    <div>
      <p className='text-3xl font-bold text-slate-900 dark:text-slate-100'>{primaryMetric}</p>
      <p className={`text-sm font-semibold ${colorClass}`}>{secondaryMetric}</p>
    </div>
  </GlassPane>
);

const CrossSystemMasterpieceCard = () => {
  const masterpieceData = [
    {
      icon: <DollarSign />,
      title: 'Revenue',
      subtitle: 'Symphony',
      primaryMetric: '$12,847',
      secondaryMetric: '+23% growth',
      colorClass: 'text-teal-800 dark:text-teal-400',
    },
    {
      icon: <Package />,
      title: 'Inventory',
      subtitle: 'Orchestra',
      primaryMetric: '98% auto-sync',
      secondaryMetric: '3.2s latency',
      colorClass: 'text-purple-700 dark:text-purple-400',
    },
    {
      icon: <Truck />,
      title: 'Shipping',
      subtitle: 'Liberation',
      primaryMetric: '$1.2K saved',
      secondaryMetric: '96% automated',
      colorClass: 'text-blue-700 dark:text-blue-500',
    },
    {
      icon: <Clapperboard />,
      title: 'TikTok',
      subtitle: 'Viral Engine',
      primaryMetric: '+347 orders',
      secondaryMetric: 'viral impact',
      colorClass: 'text-pink-600 dark:text-pink-500',
    },
  ];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', staggerChildren: 0.1 } },
      }}
      initial='hidden'
      animate='visible'
      className='space-y-4'
    >
      <div className='flex items-center gap-3 px-2'>
        <Palette className='text-slate-600 dark:text-slate-400' />
        <h2 className='text-xl font-bold text-slate-900 dark:text-slate-100'>
          Cross-System Business Intelligence Masterpiece
        </h2>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {masterpieceData.map((data, index) => (
          <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SymphonyCard {...data} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- MAIN DESKTOP APP CONTAINER ---
export default function App(): React.JSX.Element {
  const [theme, settheme] = useState<any>('dark');
  const [isSidebarCollapsed, setisSidebarCollapsed] = useState<any>(false);

  useEffect(() => {
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className='min-h-screen bg-slate-100 font-sans text-slate-800 transition-colors duration-300 dark:bg-[#0A090F] dark:text-slate-200'>
      <ExecutiveDesktopHeader theme={theme} setTheme={setTheme} />
      <DesktopSidebarNav isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      <main
        className={`px-4 pt-24 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}
      >
        <div className='p-4'>
          <CrossSystemMasterpieceCard />
        </div>
      </main>
    </div>
  );
}
