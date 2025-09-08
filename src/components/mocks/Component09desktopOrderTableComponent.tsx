/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { motion } from 'framer-motion';
import { BarChart, Bot, Flame, Gem, HardDriveDownload, Package, PackageCheck, Rocket, Target, Zap } from 'lucide-react';

// --- Helper Components & Data ---

const priorityIcons = {
  high: { Icon: Flame, className: 'text-red-500 dark:text-red-400 bg-red-500/10' },
  urgent: { Icon: Zap, className: 'text-amber-500 dark:text-amber-400 bg-amber-500/10' },
  standard: { Icon: Target, className: 'text-blue-500 dark:text-blue-400 bg-blue-500/10' },
  automated: { Icon: Bot, className: 'text-gray-500 dark:text-gray-400 bg-gray-500/10' },
};

const impactTags = {
  VIRAL: { Icon: Rocket, className: 'from-pink-500 to-orange-500' },
  HIGH: { Icon: Gem, className: 'from-teal-400 to-purple-500' },
  MED: { Icon: BarChart, className: 'from-blue-500 to-sky-500' },
  AUTO: { Icon: HardDriveDownload, className: 'from-gray-500 to-gray-700' },
};

const autoStatus = {
  Processing: { Icon: Bot, className: 'text-blue-500 dark:text-blue-400' },
  Shipped: { Icon: Package, className: 'text-purple-500 dark:text-purple-400' },
  Delivered: { Icon: PackageCheck, className: 'text-green-500 dark:text-green-400' },
};

const mockOrderData = [
  { id: '#TT12001', priority: 'high', creator: '@viral_creator', impact: 'VIRAL', status: 'Processing', value: 67.99 },
  { id: '#TT12002', priority: 'urgent', creator: '@big_accounts', impact: 'HIGH', status: 'Shipped', value: 124.5 },
  { id: '#TT12003', priority: 'standard', creator: '@steady_growth', impact: 'MED', status: 'Delivered', value: 89.99 },
  { id: '#TT12004', priority: 'automated', creator: '@auto_wins', impact: 'AUTO', status: 'Processing', value: 156.0 },
  { id: '#TT12005', priority: 'urgent', creator: '@flash_sale', impact: 'HIGH', status: 'Delivered', value: 212.75 },
  { id: '#TT12006', priority: 'high', creator: '@trending_now', impact: 'VIRAL', status: 'Shipped', value: 72.0 },
];

const TableHeader = ({ children }) => (
  <th className='border-b border-gray-200 p-4 text-left text-sm font-semibold text-gray-500 dark:border-gray-800 dark:text-gray-400'>
    {children}
  </th>
);
const TableCell = ({ children, className = '' }) => (
  <td
    className={`border-b border-gray-200/50 p-4 text-sm text-gray-800 dark:border-gray-800/50 dark:text-gray-200 ${className}`}
  >
    {children}
  </td>
);

// --- Main Table Component ---
export default function CreatorOrdersTable(): React.JSX.Element {
  const [theme, settheme] = useState<any>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={theme}>
      <div className='flex min-h-screen items-center justify-center bg-gray-100 p-8 font-sans transition-colors duration-300 dark:bg-[#111827]'>
        <div className='w-full max-w-6xl'>
          <button
            onClick={toggleTheme}
            className='mb-4 rounded-full border border-gray-200 bg-white/60 p-2 text-gray-800 backdrop-blur-md transition-colors hover:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-200 dark:hover:bg-gray-800'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? <span className='text-2xl'>☀️</span> : <span className='text-2xl'>🌙</span>}
          </button>
          <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white/60 shadow-xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60'>
            <div className='border-b border-gray-200 p-6 dark:border-gray-800'>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white'>Creator Orders Command</h2>
              <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                Real-time overview of your most impactful orders.
              </p>
            </div>
            <table className='w-full'>
              <thead>
                <tr>
                  <TableHeader></TableHeader>
                  <TableHeader>Order</TableHeader>
                  <TableHeader>Creator</TableHeader>
                  <TableHeader>Impact</TableHeader>
                  <TableHeader>Auto Status</TableHeader>
                  <TableHeader>Value</TableHeader>
                </tr>
              </thead>
              <motion.tbody variants={containerVariants} initial='hidden' animate='visible'>
                {mockOrderData.map((order) => {
                  const PriorityIcon = priorityIcons[order.priority].Icon;
                  const ImpactTag = impactTags[order.impact];
                  const Status = autoStatus[order.status];

                  return (
                    <motion.tr
                      key={order.id}
                      variants={rowVariants}
                      className='transition-colors duration-200 hover:bg-gray-200/40 dark:hover:bg-gray-800/40'
                    >
                      <TableCell>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            priorityIcons[order.priority].className
                          }`}
                        >
                          <PriorityIcon size={16} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className='font-mono font-medium text-gray-900 dark:text-white'>{order.id}</span>
                      </TableCell>
                      <TableCell>
                        <span className='font-medium'>{order.creator}</span>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white ${ImpactTag.className}`}
                        >
                          <ImpactTag.Icon size={14} />
                          <span>{order.impact}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center gap-2 font-medium ${Status.className}`}>
                          <Status.Icon size={16} />
                          <span>{order.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className='font-mono font-semibold text-gray-900 dark:text-white'>
                          ${order.value.toFixed(2)}
                        </span>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
