/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, PlusCircle, Star, Trash2 } from 'lucide-react';
import React from 'react';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface PaymentMethodsProps {
  title?: string;
  subtitle?: string;
  paymentMethods: PaymentMethod[];
  onAddNew?: () => void;
  onSetDefault?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  title = 'Payment Methods',
  subtitle = 'Manage your saved payment options.',
  paymentMethods,
  onAddNew,
  onSetDefault,
  onRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className='w-full max-w-2xl'
    >
      <div className='rounded-2xl border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20'>
        <div className='flex items-center justify-between border-b border-slate-300/50 p-8 dark:border-slate-700/50'>
          <div>
            <h1 className='flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100'>
              <CreditCard className='text-teal-600 dark:text-teal-400' size={32} />
              {title}
            </h1>
            <p className='mt-1 text-slate-600 dark:text-slate-400'>{subtitle}</p>
          </div>
          <motion.button
            onClick={onAddNew}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className='flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-bold text-white shadow-md dark:bg-teal-500 dark:text-slate-900'
          >
            <PlusCircle size={18} />
            Add New
          </motion.button>
        </div>

        <div className='space-y-4 p-8'>
          <AnimatePresence>
            {paymentMethods.map((pm) => (
              <motion.div
                key={pm.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                className='flex items-center justify-between rounded-lg bg-slate-200/50 p-4 dark:bg-slate-900/50'
              >
                <div className='flex items-center gap-4'>
                  <div className='font-bold text-slate-800 dark:text-slate-200'>{pm.brand}</div>
                  <div>
                    <p className='font-semibold text-slate-800 dark:text-slate-200'>Ending in {pm.last4}</p>
                    <p className='text-sm text-slate-600 dark:text-slate-500'>Expires {pm.expiry}</p>
                  </div>
                  {pm.isDefault && (
                    <div className='flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-bold text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'>
                      <Star size={12} />
                      Default
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-4'>
                  {!pm.isDefault && (
                    <motion.button
                      onClick={() => onSetDefault?.(pm.id)}
                      className='text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Set as Default
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => onRemove?.(pm.id)}
                    className='p-2 text-red-500 hover:text-red-400'
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export { PaymentMethods };
export type { PaymentMethod, PaymentMethodsProps };
