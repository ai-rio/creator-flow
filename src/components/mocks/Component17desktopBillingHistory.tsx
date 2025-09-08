/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp, DownloadCloud, History, Moon, Sun } from 'lucide-react';

// --- Mock Data ---
// A realistic set of invoices for a user.
const mockInvoices = [
  {
    id: 'INV-2025-09-0012',
    date: '2025-09-05',
    description: 'Creator Pro - Monthly Subscription',
    amount: 99.0,
    status: 'Paid',
  },
  {
    id: 'INV-2025-08-0011',
    date: '2025-08-05',
    description: 'Creator Pro - Monthly Subscription',
    amount: 99.0,
    status: 'Paid',
  },
  {
    id: 'INV-2025-07-0010',
    date: '2025-07-05',
    description: 'Creator Pro - Monthly Subscription',
    amount: 99.0,
    status: 'Paid',
  },
  {
    id: 'INV-2025-06-0009',
    date: '2025-06-05',
    description: 'Creator - Monthly Subscription',
    amount: 49.0,
    status: 'Paid',
  },
  {
    id: 'INV-2025-05-0008',
    date: '2025-05-05',
    description: 'Creator - Monthly Subscription',
    amount: 49.0,
    status: 'Failed',
  },
  {
    id: 'INV-2025-04-0007',
    date: '2025-04-05',
    description: 'Creator - Monthly Subscription',
    amount: 49.0,
    status: 'Paid',
  },
];

// --- Reusable Components ---
const GlassPane: React.FC<any> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20 ${className}`}
  >
    {children}
  </div>
);

const ThemeToggle: React.FC<any> = ({ theme, setTheme }) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='absolute right-8 top-8 z-20 rounded-full bg-white/40 p-2 text-slate-500 dark:bg-slate-800/40 dark:text-slate-400'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
  >
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

const StatusBadge = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full inline-block';
  const statusClasses = {
    Paid: 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300',
    Failed: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
    Pending: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

// --- Main Component ---
const InvoiceHistoryCard = () => {
  const [theme, settheme] = useState<any>('dark');
  const [invoices] = useState(mockInvoices);
  const [sortConfig, setsortConfig] = useState<any>({ key: 'date', direction: 'descending' });

  const sortedInvoices = useMemo(() => {
    const sortableItems = [...invoices];
    if (sortConfig !== null) {
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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  return (
    <div className={`${theme} font-sans`}>
      <div className='relative flex min-h-screen items-center justify-center bg-slate-100 p-4 transition-colors duration-500 dark:bg-[#0A090F]'>
        <ThemeToggle theme={theme} setTheme={setTheme} />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          className='w-full max-w-5xl'
        >
          <GlassPane>
            <div className='p-8'>
              <h1 className='flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100'>
                <History className='text-purple-600 dark:text-purple-400' size={32} />
                Billing History
              </h1>
              <p className='mt-1 text-slate-600 dark:text-slate-400'>Review and download your past invoices.</p>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full text-left'>
                <thead className='border-b border-slate-300/50 dark:border-slate-700/50'>
                  <tr>
                    {['Invoice ID', 'Date', 'Description', 'Amount', 'Status', 'Actions'].map((head) => {
                      const key = head.toLowerCase().replace(/ /g, '');
                      return (
                        <th
                          key={key}
                          className='cursor-pointer p-4 text-sm font-semibold text-slate-600 dark:text-slate-400'
                          onClick={() => requestSort(key)}
                        >
                          <div className='flex items-center gap-1'>
                            {head} {getSortIcon(key)}
                          </div>
                        </th>
                      );
                    })}
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
          </GlassPane>
        </motion.div>
      </div>
    </div>
  );
};

export default InvoiceHistoryCard;
