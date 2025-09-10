/* eslint-disable */
'use client';

import React, { useState } from 'react';

import { PaymentMethods, PaymentMethod } from './AM-PaymentMethods';

export default function PaymentMethodsDemo(): React.JSX.Element {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'pm_1', brand: 'Visa', last4: '4242', expiry: '12 / 26', isDefault: true },
    { id: 'pm_2', brand: 'Mastercard', last4: '5555', expiry: '08 / 28', isDefault: false },
    { id: 'pm_3', brand: 'American Express', last4: '1005', expiry: '03 / 27', isDefault: false },
  ]);

  const handleAddNew = () => {
    console.log('Add new payment method');
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handleRemove = (id: string) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-strategic'>
      <div className='w-full space-y-strategic'>
        <div className='text-center'>
          <h1 className='mb-tactical text-heading-xl font-bold text-foreground'>Payment Methods Demo</h1>
          <p className='text-body-lg text-muted-foreground'>
            Manage saved payment options with add/remove/default functionality
          </p>
        </div>

        <PaymentMethods
          paymentMethods={paymentMethods}
          onAddNew={handleAddNew}
          onSetDefault={handleSetDefault}
          onRemove={handleRemove}
        />

        <div className='mx-auto max-w-2xl rounded-executive border border-border bg-card p-strategic'>
          <h3 className='mb-tactical text-heading-md font-semibold text-foreground'>Features:</h3>
          <ul className='space-y-2 text-body-md text-muted-foreground'>
            <li>• Add new payment method with animated button</li>
            <li>• Set default payment method with star indicator</li>
            <li>• Remove payment methods with confirmation</li>
            <li>• Layout animations when items are added/removed</li>
            <li>• Card brand display with expiry information</li>
            <li>• Responsive design with proper spacing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
