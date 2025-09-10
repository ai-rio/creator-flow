/* eslint-disable */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, PlusCircle, Star, Trash2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

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
      <div className='rounded-executive border border-border bg-background/95 shadow-xl backdrop-blur-lg'>
        <div className='flex items-center justify-between border-b border-border p-strategic'>
          <div>
            <h1 className='flex items-center gap-tactical text-heading-xl font-bold text-foreground'>
              <CreditCard className='text-primary' size={32} />
              {title}
            </h1>
            <p className='mt-1 text-body-md text-muted-foreground'>{subtitle}</p>
          </div>
          <Button
            onClick={onAddNew}
            className='flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90'
          >
            <PlusCircle size={18} />
            Add New
          </Button>
        </div>

        <div className='space-y-tactical p-strategic'>
          <AnimatePresence>
            {paymentMethods.map((pm) => (
              <motion.div
                key={pm.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                className='flex items-center justify-between rounded-premium bg-muted/50 p-tactical'
              >
                <div className='flex items-center gap-tactical'>
                  <div className='font-bold text-foreground'>{pm.brand}</div>
                  <div>
                    <p className='font-semibold text-foreground'>Ending in {pm.last4}</p>
                    <p className='text-body-sm text-muted-foreground'>Expires {pm.expiry}</p>
                  </div>
                  {pm.isDefault && (
                    <div className='flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary'>
                      <Star size={12} />
                      Default
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-tactical'>
                  {!pm.isDefault && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => onSetDefault?.(pm.id)}
                      className='text-muted-foreground hover:text-foreground'
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => onRemove?.(pm.id)}
                    className='p-2 text-destructive hover:text-destructive/80'
                  >
                    <Trash2 size={18} />
                  </Button>
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
