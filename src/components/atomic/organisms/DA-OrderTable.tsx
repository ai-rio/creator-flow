/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart,
  Bot,
  Flame,
  Gem,
  HardDriveDownload,
  LucideIcon,
  Package,
  PackageCheck,
  Rocket,
  Target,
  Zap,
} from 'lucide-react';
import React from 'react';

interface Order {
  id: string;
  priority: 'high' | 'urgent' | 'standard' | 'automated';
  creator: string;
  impact: 'VIRAL' | 'HIGH' | 'MED' | 'AUTO';
  status: 'Processing' | 'Shipped' | 'Delivered';
  value: number;
}

interface OrderTableProps {
  title?: string;
  subtitle?: string;
  orders: Order[];
}

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

const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th className='border-b border-gray-200 p-4 text-left text-sm font-semibold text-gray-500 dark:border-gray-800 dark:text-gray-400'>
    {children}
  </th>
);

const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <td
    className={`border-b border-gray-200/50 p-4 text-sm text-gray-800 dark:border-gray-800/50 dark:text-gray-200 ${className}`}
  >
    {children}
  </td>
);

const OrderTable: React.FC<OrderTableProps> = ({
  title = 'Creator Orders Command',
  subtitle = 'Real-time overview of your most impactful orders.',
  orders,
}) => {
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
    <div className='w-full max-w-6xl'>
      <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white/60 shadow-xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/60'>
        <div className='border-b border-gray-200 p-6 dark:border-gray-800'>
          <h2 className='text-xl font-bold text-gray-900 dark:text-white'>{title}</h2>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>{subtitle}</p>
        </div>
        <table className='w-full'>
          <thead>
            <tr>
              <TableHeader>Priority</TableHeader>
              <TableHeader>Order</TableHeader>
              <TableHeader>Creator</TableHeader>
              <TableHeader>Impact</TableHeader>
              <TableHeader>Auto Status</TableHeader>
              <TableHeader>Value</TableHeader>
            </tr>
          </thead>
          <motion.tbody variants={containerVariants} initial='hidden' animate='visible'>
            {orders.map((order) => {
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
  );
};

export { OrderTable };
export type { Order, OrderTableProps };
