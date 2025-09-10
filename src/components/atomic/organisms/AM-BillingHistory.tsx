/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp, DownloadCloud, History } from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Failed' | 'Pending';
}

interface BillingHistoryProps {
  title?: string;
  subtitle?: string;
  invoices: Invoice[];
  onDownload?: (invoiceId: string) => void;
}

interface SortConfig {
  key: keyof Invoice;
  direction: 'ascending' | 'descending';
}

const StatusBadge: React.FC<{ status: Invoice['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  const statusClasses = {
    Paid: 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300',
    Failed: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
    Pending: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
  };

  return <span className={`${baseClasses} ${(statusClasses as any)[status]}`}>{status}</span>;
};

const BillingHistory: React.FC<BillingHistoryProps> = ({
  title = 'Billing History',
  subtitle = 'Review and download your past invoices.',
  invoices,
  onDownload,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'descending' });

  const sortedInvoices = useMemo(() => {
    const sortableItems = [...invoices];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [invoices, sortConfig]);

  const requestSort = (key: keyof Invoice) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: keyof Invoice) => {
    if (sortConfig.key !== name) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const headers: { label: string; key: keyof Invoice }[] = [
    { label: 'Invoice ID', key: 'id' },
    { label: 'Date', key: 'date' },
    { label: 'Description', key: 'description' },
    { label: 'Amount', key: 'amount' },
    { label: 'Status', key: 'status' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className='w-full max-w-5xl'
    >
      <div className='rounded-2xl border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20'>
        <div className='p-8'>
          <h1 className='flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100'>
            <History className='text-purple-600 dark:text-purple-400' size={32} />
            {title}
          </h1>
          <p className='mt-1 text-slate-600 dark:text-slate-400'>{subtitle}</p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='border-b border-slate-300/50 dark:border-slate-700/50'>
              <tr>
                {headers.map(({ label, key }) => (
                  <th
                    key={key}
                    className='cursor-pointer p-4 text-sm font-semibold text-slate-600 dark:text-slate-400'
                    onClick={() => requestSort(key)}
                  >
                    <div className='flex items-center gap-1'>
                      {label} {getSortIcon(key)}
                    </div>
                  </th>
                ))}
                <th className='p-4 text-sm font-semibold text-slate-600 dark:text-slate-400'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sortedInvoices.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className='border-b border-slate-200/50 hover:bg-slate-200/20 dark:border-slate-800/50 dark:hover:bg-slate-800/20'
                  >
                    <td className='p-4 font-mono text-sm text-slate-700 dark:text-slate-300'>{invoice.id}</td>
                    <td className='p-4 text-slate-800 dark:text-slate-200'>{invoice.date}</td>
                    <td className='p-4 text-slate-800 dark:text-slate-200'>{invoice.description}</td>
                    <td className='p-4 font-semibold text-slate-900 dark:text-slate-100'>
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className='p-4'>
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className='p-4'>
                      {invoice.status === 'Paid' && (
                        <motion.button
                          onClick={() => onDownload?.(invoice.id)}
                          className='flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400'
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <DownloadCloud size={16} />
                          Download
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export { BillingHistory };
export type { Invoice, BillingHistoryProps };
