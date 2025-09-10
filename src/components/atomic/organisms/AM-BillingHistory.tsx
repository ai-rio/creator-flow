/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp, DownloadCloud, History } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

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
  const statusClasses = {
    Paid: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    Failed: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
  };

  return (
    <span className={`inline-block rounded-full px-tactical py-1 text-xs font-semibold ${statusClasses[status]}`}>
      {status}
    </span>
  );
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
      <div className='rounded-executive border border-border bg-background/95 shadow-xl backdrop-blur-lg'>
        <div className='p-strategic'>
          <h1 className='flex items-center gap-tactical text-heading-xl font-bold text-foreground'>
            <History className='text-primary' size={32} />
            {title}
          </h1>
          <p className='mt-1 text-body-md text-muted-foreground'>{subtitle}</p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='border-b border-border'>
              <tr>
                {headers.map(({ label, key }) => (
                  <th
                    key={key}
                    className='cursor-pointer p-tactical text-body-sm font-semibold text-muted-foreground hover:text-foreground'
                    onClick={() => requestSort(key)}
                  >
                    <div className='flex items-center gap-1'>
                      {label} {getSortIcon(key)}
                    </div>
                  </th>
                ))}
                <th className='p-tactical text-body-sm font-semibold text-muted-foreground'>Actions</th>
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
                    className='border-b border-border hover:bg-muted/20'
                  >
                    <td className='p-tactical font-mono text-body-sm text-foreground'>{invoice.id}</td>
                    <td className='p-tactical text-body-md text-foreground'>{invoice.date}</td>
                    <td className='p-tactical text-body-md text-foreground'>{invoice.description}</td>
                    <td className='p-tactical font-semibold text-foreground'>${invoice.amount.toFixed(2)}</td>
                    <td className='p-tactical'>
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className='p-tactical'>
                      {invoice.status === 'Paid' && (
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => onDownload?.(invoice.id)}
                          className='flex items-center gap-2 text-primary hover:text-primary/80'
                        >
                          <DownloadCloud size={16} />
                          Download
                        </Button>
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
