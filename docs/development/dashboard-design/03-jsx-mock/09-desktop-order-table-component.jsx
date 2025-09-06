import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Flame, Target, Bot, Rocket, Gem, BarChart, HardDriveDownload, Package, PackageCheck } from 'lucide-react';

// --- Helper Components & Data ---

const priorityIcons = {
  high: { Icon: Flame, className: "text-red-500 dark:text-red-400 bg-red-500/10" },
  urgent: { Icon: Zap, className: "text-amber-500 dark:text-amber-400 bg-amber-500/10" },
  standard: { Icon: Target, className: "text-blue-500 dark:text-blue-400 bg-blue-500/10" },
  automated: { Icon: Bot, className: "text-gray-500 dark:text-gray-400 bg-gray-500/10" },
};

const impactTags = {
  VIRAL: { Icon: Rocket, className: "from-pink-500 to-orange-500" },
  HIGH: { Icon: Gem, className: "from-teal-400 to-purple-500" },
  MED: { Icon: BarChart, className: "from-blue-500 to-sky-500" },
  AUTO: { Icon: HardDriveDownload, className: "from-gray-500 to-gray-700" },
};

const autoStatus = {
  Processing: { Icon: Bot, className: "text-blue-500 dark:text-blue-400" },
  Shipped: { Icon: Package, className: "text-purple-500 dark:text-purple-400" },
  Delivered: { Icon: PackageCheck, className: "text-green-500 dark:text-green-400" },
};

const mockOrderData = [
  { id: '#TT12001', priority: 'high', creator: '@viral_creator', impact: 'VIRAL', status: 'Processing', value: 67.99 },
  { id: '#TT12002', priority: 'urgent', creator: '@big_accounts', impact: 'HIGH', status: 'Shipped', value: 124.50 },
  { id: '#TT12003', priority: 'standard', creator: '@steady_growth', impact: 'MED', status: 'Delivered', value: 89.99 },
  { id: '#TT12004', priority: 'automated', creator: '@auto_wins', impact: 'AUTO', status: 'Processing', value: 156.00 },
  { id: '#TT12005', priority: 'urgent', creator: '@flash_sale', impact: 'HIGH', status: 'Delivered', value: 212.75 },
  { id: '#TT12006', priority: 'high', creator: '@trending_now', impact: 'VIRAL', status: 'Shipped', value: 72.00 },
];

const TableHeader = ({ children }) => <th className="p-4 text-sm font-semibold text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">{children}</th>;
const TableCell = ({ children, className = '' }) => <td className={`p-4 text-sm text-gray-800 dark:text-gray-200 border-b border-gray-200/50 dark:border-gray-800/50 ${className}`}>{children}</td>;

// --- Main Table Component ---
export default function CreatorOrdersTable() {
  const [theme, setTheme] = useState('dark');
  
  const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
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
      <div className="bg-gray-100 dark:bg-[#111827] min-h-screen flex items-center justify-center font-sans p-8 transition-colors duration-300">
        <div className="w-full max-w-6xl">
           <button
                onClick={toggleTheme}
                className="mb-4 p-2 rounded-full bg-white/60 dark:bg-gray-900/60 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors backdrop-blur-md border border-gray-200 dark:border-gray-800"
                aria-label="Toggle theme"
            >
              {theme === 'dark' ? <span className="text-2xl">☀️</span> : <span className="text-2xl">🌙</span>}
            </button>
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Creator Orders Command</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time overview of your most impactful orders.</p>
              </div>
              <table className="w-full">
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
                <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                  {mockOrderData.map(order => {
                    const PriorityIcon = priorityIcons[order.priority].Icon;
                    const ImpactTag = impactTags[order.impact];
                    const Status = autoStatus[order.status];

                    return (
                      <motion.tr 
                        key={order.id} 
                        variants={rowVariants}
                        className="hover:bg-gray-200/40 dark:hover:bg-gray-800/40 transition-colors duration-200"
                      >
                        <TableCell>
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${priorityIcons[order.priority].className}`}>
                            <PriorityIcon size={16} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono font-medium text-gray-900 dark:text-white">{order.id}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{order.creator}</span>
                        </TableCell>
                        <TableCell>
                           <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${ImpactTag.className}`}>
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
                          <span className="font-mono font-semibold text-gray-900 dark:text-white">${order.value.toFixed(2)}</span>
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
