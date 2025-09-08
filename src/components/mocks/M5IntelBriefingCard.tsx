/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { animate, AnimatePresence, motion, useSpring, useTransform } from 'framer-motion';
import {
  AlertTriangle,
  Bot,
  BrainCircuit,
  Clock,
  Crosshair,
  DollarSign,
  Download,
  Flame,
  Moon,
  Package,
  Palette,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Truck,
  Video,
  Wand2,
  Zap,
} from 'lucide-react';

// --- Mock Data ---
const initialSystemStatus = { sales: 'nominal', viral: 'warning', automation: 'nominal' };
const dailyStats = {
  revenue: 12847,
  revenueTrend: [5, 10, 20, 40, 30, 60, 75, 90],
  unitsSold: 1247,
  autoFulfilledPercent: 98,
  unitsShipped: 347,
  shippingSavings: 1200,
  topVideo: { id: 'xyz789', orders: 2300 },
};
const strategicAlerts = [
  { id: 1, type: 'critical', text: 'Low stock on "Viral Tee"', source: 'Inventory' },
  { id: 2, type: 'insight', text: 'Viral spike: Scale inventory?', source: 'TikTok' },
  { id: 3, type: 'operational', text: 'Carrier issue: UPS delayed', source: 'Shipping' },
];
const automationStats = { hoursSaved: 47, tasksAutomated: 89, flowHealth: 96 };
const intelligenceBriefing = [
  {
    id: 1,
    type: 'performance',
    title: 'Content ROI: $247/video avg',
    subtitle: 'Focus on short-form unboxing videos.',
  },
  { id: 2, type: 'trend', title: 'Growth: 340%/yr sustainable', subtitle: 'Based on current supply chain capacity.' },
  { id: 3, type: 'ai', title: 'Next: EU expansion ready', subtitle: 'AI recommends targeting Germany & France.' },
];

// --- Reusable Components (Condensed for brevity) ---
const GlassPane = ({ children, className = '' }) => (
  <div
    className={`border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20 ${className}`}
  >
    {children}
  </div>
);
const ThemeToggle: React.FC<any> = ({ theme, setTheme }) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='absolute right-4 top-20 z-50 rounded-full bg-white/40 p-2 text-slate-500 dark:bg-slate-800/40 dark:text-slate-400'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
  >
    {' '}
    <AnimatePresence mode='wait' initial={false}>
      {' '}
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        {' '}
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}{' '}
      </motion.div>{' '}
    </AnimatePresence>{' '}
  </motion.button>
);
const StatusIcon = ({ icon: Icon, status }) => {
  const c = {
    nominal: 'text-teal-800 dark:text-teal-400',
    warning: 'text-amber-600 dark:text-amber-400',
    critical: 'text-red-600 dark:text-red-400',
  };
  return <Icon size={20} className={c[status] || c.nominal} />;
};
const AnimatedNumber = ({ value, isCurrency = false }) => {
  const [val, setval] = useState<any>(0);
  useEffect(() => {
    const anim = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(l) {
        setVal(Math.round(l));
      },
    });
    return () => anim.stop();
  }, [value]);
  return (
    <span>
      {isCurrency && '$'}
      {val.toLocaleString()}
    </span>
  );
};
const Sparkline = ({ data, className = '' }) => {
  const w = 100,
    h = 20,
    max = Math.max(...data),
    min = Math.min(...data);
  const p = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d - min) / (max - min)) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`h-auto w-full ${className}`} preserveAspectRatio='none'>
      <motion.polyline
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        points={p}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
    </svg>
  );
};
const CircularProgress = ({ percentage }) => {
  const r = 40,
    c = 2 * Math.PI * r;
  const s = useSpring(0, { stiffness: 50, damping: 20 });
  const t = useTransform(s, (l) => `${Math.round(l)}%`);
  useEffect(() => {
    s.set(percentage);
  }, [percentage, s]);
  return (
    <div className='relative h-24 w-24'>
      <svg className='h-full w-full' viewBox='0 0 100 100'>
        <circle
          cx='50'
          cy='50'
          r={r}
          strokeWidth='10'
          className='stroke-slate-300/50 dark:stroke-slate-700/50'
          fill='transparent'
        />
        <motion.circle
          cx='50'
          cy='50'
          r={r}
          strokeWidth='10'
          className='stroke-teal-800 dark:stroke-teal-400'
          fill='transparent'
          strokeDasharray={c}
          strokeLinecap='round'
          transform='rotate(-90 50 50)'
          style={{ strokeDashoffset: useTransform(s, (p) => c - (p / 100) * c) }}
        />
      </svg>
      <motion.div className='absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-900 dark:text-slate-100'>
        {t}
      </motion.div>
    </div>
  );
};
const AlertIcon = ({ type }) => {
  const i = {
    critical: <AlertTriangle className='text-red-600 dark:text-red-400' size={20} />,
    insight: <TrendingUp className='text-amber-600 dark:text-amber-400' size={20} />,
    operational: <Truck className='text-purple-700 dark:text-purple-400' size={20} />,
  };
  return i[type] || null;
};

// --- M1, M2, M3, M4 Components (Condensed) ---
const MobileExecutiveHeader: React.FC<any> = ({ systemStatus, user }) => (
  <motion.header
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
    className='fixed left-2 right-2 top-2 z-40'
  >
    {' '}
    <GlassPane className='rounded-xl px-4 py-3'>
      {' '}
      <div className='flex items-center justify-between'>
        {' '}
        <div className='flex items-center gap-2'>
          <Zap className='text-purple-700 dark:text-purple-400' size={24} />
          <h1 className='text-lg font-bold text-slate-900 dark:text-slate-100'>CreatorFlow</h1>
        </div>{' '}
        <div className='flex items-center gap-4'>
          <StatusIcon icon={Target} status={systemStatus.sales} />
          <StatusIcon icon={Flame} status={systemStatus.viral} />
          <StatusIcon icon={Bot} status={systemStatus.automation} />
        </div>{' '}
        <motion.div
          className='flex cursor-pointer items-center gap-2'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className='hidden text-sm font-semibold text-slate-600 dark:text-slate-400 sm:inline'>
            {user.handle}
          </span>
          <img
            src={user.avatarUrl}
            alt='User Avatar'
            className='h-8 w-8 rounded-full border-2 border-purple-700/50 dark:border-purple-400/50'
          />
        </motion.div>{' '}
      </div>{' '}
    </GlassPane>{' '}
  </motion.header>
);
const BusinessSymphonyCard: React.FC<any> = ({ stats }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
  >
    {' '}
    <GlassPane className='rounded-xl p-4'>
      {' '}
      <div className='mb-4 flex items-center gap-2'>
        {' '}
        <Palette className='text-slate-600 dark:text-slate-400' />{' '}
        <h2 className='text-lg font-semibold text-slate-800 dark:text-slate-200'>Today's Business Symphony</h2>{' '}
      </div>{' '}
      <div className='space-y-4'>
        {' '}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <DollarSign className='text-teal-800 dark:text-teal-400' size={24} />
            <span className='text-3xl font-bold text-slate-900 dark:text-slate-100'>
              <AnimatedNumber value={stats.revenue} isCurrency />
            </span>
          </div>
          <div className='w-1/3'>
            <Sparkline data={stats.revenueTrend} className='text-teal-800 dark:text-teal-400' />
          </div>
        </div>{' '}
        <div className='flex items-center gap-3 rounded-lg bg-slate-200/50 p-2 dark:bg-slate-900/50'>
          <Package className='text-purple-700 dark:text-purple-400' />
          <p className='font-semibold text-slate-800 dark:text-slate-200'>
            <AnimatedNumber value={stats.unitsSold} /> units
          </p>
          <p className='text-sm text-slate-600 dark:text-slate-400'>({stats.autoFulfilledPercent}% auto)</p>
        </div>{' '}
        <div className='flex items-center gap-3 rounded-lg bg-slate-200/50 p-2 dark:bg-slate-900/50'>
          <Truck className='text-purple-700 dark:text-purple-400' />
          <p className='font-semibold text-slate-800 dark:text-slate-200'>
            <AnimatedNumber value={stats.unitsShipped} /> shipped
          </p>
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            (<AnimatedNumber value={stats.shippingSavings} isCurrency /> saved)
          </p>
        </div>{' '}
        <div className='flex items-center gap-3 rounded-lg bg-slate-200/50 p-2 dark:bg-slate-900/50'>
          <Video className='text-red-600 dark:text-red-400' />
          <p className='font-semibold text-slate-800 dark:text-slate-200'>Video #{stats.topVideo.id}:</p>
          <p className='text-sm text-slate-600 dark:text-slate-400'>
            <AnimatedNumber value={stats.topVideo.orders} /> orders
          </p>
          <Flame className='text-red-600 dark:text-red-400' size={16} />
        </div>{' '}
      </div>{' '}
    </GlassPane>{' '}
  </motion.div>
);
const StrategicCommandCard: React.FC<any> = ({ alerts }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.8 }}
  >
    {' '}
    <GlassPane className='rounded-xl p-4'>
      {' '}
      <div className='mb-4 flex items-center gap-2'>
        {' '}
        <Target className='text-slate-600 dark:text-slate-400' />{' '}
        <h2 className='text-lg font-semibold text-slate-800 dark:text-slate-200'>Strategic Command</h2>{' '}
      </div>{' '}
      <motion.div
        className='mb-4 space-y-3'
        initial='hidden'
        animate='visible'
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {' '}
        {alerts.map((a) => (
          <motion.div
            key={a.id}
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className='flex items-center justify-between rounded-lg bg-slate-200/50 p-2 dark:bg-slate-900/50'
          >
            <div className='flex items-center gap-3'>
              <AlertIcon type={a.type} />
              <p className='text-sm font-semibold text-slate-800 dark:text-slate-200'>{a.text}</p>
            </div>
            <span className='rounded-full bg-slate-300/50 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700/50'>
              {a.source}
            </span>
          </motion.div>
        ))}{' '}
      </motion.div>{' '}
      <div className='grid grid-cols-3 gap-2'>
        {' '}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className='col-span-2 rounded-lg bg-teal-700 px-3 py-2 text-sm font-bold text-white shadow-md dark:bg-teal-500 dark:text-slate-900'
        >
          Auto-Scale
        </motion.button>{' '}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className='rounded-lg bg-slate-200/80 px-3 py-2 text-sm font-bold text-slate-800 dark:bg-slate-800/80 dark:text-slate-200'
        >
          Manual
        </motion.button>{' '}
      </div>{' '}
    </GlassPane>{' '}
  </motion.div>
);
const LiberationOrchestraCard: React.FC<any> = ({ stats }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 1.1 }}
  >
    {' '}
    <GlassPane className='rounded-xl p-4'>
      {' '}
      <div className='mb-4 flex items-center gap-2'>
        {' '}
        <Bot className='text-slate-600 dark:text-slate-400' />{' '}
        <h2 className='text-lg font-semibold text-slate-800 dark:text-slate-200'>Liberation Orchestra</h2>{' '}
      </div>{' '}
      <div className='flex items-center justify-between gap-4'>
        {' '}
        <div className='flex-1 space-y-3'>
          {' '}
          <div className='flex items-center gap-3'>
            <Clock className='text-purple-700 dark:text-purple-400' size={24} />
            <div>
              <div className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                <AnimatedNumber value={stats.hoursSaved} />
              </div>
              <div className='text-sm text-slate-600 dark:text-slate-400'>hours saved</div>
            </div>
          </div>{' '}
          <div className='flex items-center gap-3'>
            <Wand2 className='text-purple-700 dark:text-purple-400' size={24} />
            <div>
              <div className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
                <AnimatedNumber value={stats.tasksAutomated} />
              </div>
              <div className='text-sm text-slate-600 dark:text-slate-400'>tasks automated</div>
            </div>
          </div>{' '}
        </div>{' '}
        <div className='flex-shrink-0'>
          <CircularProgress percentage={stats.flowHealth} />
          <p className='mt-1 text-center text-xs text-slate-600 dark:text-slate-400'>Flow Health</p>
        </div>{' '}
      </div>{' '}
      <div className='mt-4 grid grid-cols-2 gap-2'>
        {' '}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className='rounded-lg bg-teal-700 px-3 py-2 text-sm font-bold text-white shadow-md dark:bg-teal-500 dark:text-slate-900'
        >
          View Orchestra
        </motion.button>{' '}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className='rounded-lg bg-slate-200/80 px-3 py-2 text-sm font-bold text-slate-800 dark:bg-slate-800/80 dark:text-slate-200'
        >
          Optimize
        </motion.button>{' '}
      </div>{' '}
    </GlassPane>{' '}
  </motion.div>
);

// --- M5: The Intelligence Briefing Card ---
const InsightIcon = ({ type }) => {
  const icons = {
    performance: <Crosshair className='text-teal-800 dark:text-teal-400' size={20} />,
    trend: <TrendingUp className='text-amber-600 dark:text-amber-400' size={20} />,
    ai: (
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className='text-purple-700 dark:text-purple-400' size={20} />
      </motion.div>
    ),
  };
  return icons[type] || null;
};

const IntelligenceBriefingCard = ({ insights }) => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 1.4 }}
    >
      <GlassPane className='rounded-xl p-4'>
        <div className='mb-4 flex items-center gap-2'>
          <BrainCircuit className='text-slate-600 dark:text-slate-400' size={20} />
          <h2 className='text-lg font-semibold text-slate-800 dark:text-slate-200'>Your Intelligence Briefing</h2>
        </div>
        <motion.div className='space-y-4' variants={containerVariants} initial='hidden' animate='visible'>
          {insights.map((insight) => (
            <motion.div key={insight.id} variants={itemVariants} className='flex items-start gap-3'>
              <div className='mt-1'>
                <InsightIcon type={insight.type} />
              </div>
              <div>
                <p className='font-bold text-slate-900 dark:text-slate-100'>{insight.title}</p>
                <p className='text-sm text-slate-600 dark:text-slate-400'>{insight.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className='mt-4 grid grid-cols-2 gap-2 border-t border-slate-300/50 pt-4 dark:border-slate-700/50'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className='rounded-lg bg-teal-700 px-3 py-2 text-sm font-bold text-white shadow-md dark:bg-teal-500 dark:text-slate-900'
          >
            Strategic Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className='flex items-center justify-center gap-2 rounded-lg bg-slate-200/80 px-3 py-2 text-sm font-bold text-slate-800 dark:bg-slate-800/80 dark:text-slate-200'
          >
            <Download size={14} />
            Export
          </motion.button>
        </div>
      </GlassPane>
    </motion.div>
  );
};

// --- Main App Frame ---
const MobileDashboard = () => {
  const [theme, settheme] = useState<any>('dark');
  const user = { handle: '@ceo', avatarUrl: 'https://placehold.co/64x64/0A090F/FFF?text=CEO' };

  return (
    <div className={`${theme} font-sans`}>
      <div className='relative flex min-h-screen items-center justify-center bg-slate-100 transition-colors duration-500 dark:bg-[#0A090F]'>
        <div className='mx-auto h-[800px] w-full max-w-sm rounded-3xl bg-slate-200 p-2 shadow-2xl dark:bg-slate-900/50'>
          <div className='relative h-full w-full overflow-hidden rounded-[20px] bg-slate-100 dark:bg-[#0A090F]'>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <MobileExecutiveHeader systemStatus={initialSystemStatus} user={user} />

            <main className='h-full space-y-4 overflow-y-auto p-2 pt-20'>
              <BusinessSymphonyCard stats={dailyStats} />
              <StrategicCommandCard alerts={strategicAlerts} />
              <LiberationOrchestraCard stats={automationStats} />
              <IntelligenceBriefingCard insights={intelligenceBriefing} />
              <div className='h-24'></div> {/* Spacer for bottom nav */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
