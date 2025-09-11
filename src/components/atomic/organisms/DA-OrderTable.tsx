/* eslint-disable */
'use client';

import { motion } from 'framer-motion';
import { BarChart, Bot, Flame, Gem, HardDriveDownload, Package, PackageCheck, Rocket, Target, Zap } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';

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

const priorityConfig = {
  high: { Icon: Flame, variant: 'destructive' as any },
  urgent: { Icon: Zap, variant: 'secondary' as any },
  standard: { Icon: Target, variant: 'default' as any },
  automated: { Icon: Bot, variant: 'outline' as any },
};

const impactConfig = {
  VIRAL: { Icon: Rocket, className: 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' },
  HIGH: { Icon: Gem, className: 'bg-gradient-to-r from-teal-500 to-purple-500 text-white' },
  MED: { Icon: BarChart, className: 'bg-gradient-to-r from-blue-500 to-sky-500 text-white' },
  AUTO: { Icon: HardDriveDownload, className: 'bg-gradient-to-r from-muted-foreground to-muted text-muted-foreground' },
};

const statusConfig = {
  Processing: { Icon: Bot, className: 'text-blue-500' },
  Shipped: { Icon: Package, className: 'text-purple-500' },
  Delivered: { Icon: PackageCheck, className: 'text-green-500' },
};

const OrderTable: React.FC<OrderTableProps> = ({
  title = 'Creator Orders Command',
  subtitle = 'Real-time overview of your most impactful orders.',
  orders,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='w-full max-w-6xl'>
      <div className='rounded-executive border border-border bg-background/95 shadow-xl backdrop-blur-lg'>
        <div className='border-b border-border p-strategic'>
          <h2 className='text-heading-lg font-bold text-foreground'>{title}</h2>
          <p className='mt-1 text-body-md text-muted-foreground'>{subtitle}</p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border'>
                <th className='p-tactical text-left text-body-sm font-semibold text-muted-foreground'>Priority</th>
                <th className='p-tactical text-left text-body-sm font-semibold text-muted-foreground'>Order</th>
                <th className='p-tactical text-left text-body-sm font-semibold text-muted-foreground'>Creator</th>
                <th className='p-tactical text-left text-body-sm font-semibold text-muted-foreground'>Impact</th>
                <th className='p-tactical text-left text-body-sm font-semibold text-muted-foreground'>Status</th>
                <th className='p-tactical text-left text-body-sm font-semibold text-muted-foreground'>Value</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants as any} initial='hidden' animate='visible'>
              {orders.map((order) => {
                const Priority = priorityConfig[order.priority];
                const Impact = impactConfig[order.impact];
                const Status = statusConfig[order.status];

                return (
                  <motion.tr
                    key={order.id}
                    variants={rowVariants}
                    className='border-b border-border transition-colors hover:bg-muted/20'
                  >
                    <td className='p-tactical'>
                      <Badge
                        variant={Priority.variant}
                        className='flex h-8 w-8 items-center justify-center rounded-full p-0'
                      >
                        <Priority.Icon size={16} />
                      </Badge>
                    </td>
                    <td className='p-tactical'>
                      <span className='font-mono font-medium text-foreground'>{order.id}</span>
                    </td>
                    <td className='p-tactical'>
                      <span className='font-medium text-foreground'>{order.creator}</span>
                    </td>
                    <td className='p-tactical'>
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-tactical py-1 text-xs font-bold ${Impact.className}`}
                      >
                        <Impact.Icon size={14} />
                        <span>{order.impact}</span>
                      </div>
                    </td>
                    <td className='p-tactical'>
                      <div className={`inline-flex items-center gap-2 font-medium ${Status.className}`}>
                        <Status.Icon size={16} />
                        <span className='text-foreground'>{order.status}</span>
                      </div>
                    </td>
                    <td className='p-tactical'>
                      <span className='font-mono font-semibold text-foreground'>${order.value.toFixed(2)}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { OrderTable };
export type { Order, OrderTableProps };
