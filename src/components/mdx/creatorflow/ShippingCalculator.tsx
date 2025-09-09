/**
 * Shipping Calculator Component
 * Interactive shipping cost calculator for creators
 */

import { Calculator, Truck } from 'lucide-react';
import React, { useState } from 'react';

interface ShippingRate {
  provider: string;
  service: string;
  cost: number;
  days: string;
}

export function ShippingCalculator() {
  const [weight, setWeight] = useState<number>(1);
  const [zone, setZone] = useState<string>('1-3');

  const calculateRates = (): ShippingRate[] => {
    const baseRates = {
      USPS: { ground: 8.5, express: 25.0 },
      UPS: { ground: 12.0, express: 35.0 },
      FedEx: { ground: 11.5, express: 32.0 },
    };

    const zoneMultiplier = zone === '1-3' ? 1 : zone === '4-6' ? 1.3 : 1.6;
    const weightMultiplier = Math.max(1, weight * 0.5);

    return [
      {
        provider: 'USPS',
        service: 'Ground Advantage',
        cost: baseRates.USPS.ground * zoneMultiplier * weightMultiplier,
        days: '2-5',
      },
      {
        provider: 'UPS',
        service: 'Ground',
        cost: baseRates.UPS.ground * zoneMultiplier * weightMultiplier,
        days: '1-3',
      },
      {
        provider: 'FedEx',
        service: 'Ground',
        cost: baseRates.FedEx.ground * zoneMultiplier * weightMultiplier,
        days: '1-3',
      },
    ];
  };

  const rates = calculateRates();

  return (
    <div className='bg-light-concrete border-stone-gray/20 mb-6 rounded-2xl border p-6'>
      <h3 className='text-forest-green mb-4 flex items-center gap-2 text-xl font-bold'>
        <Calculator className='h-5 w-5' />
        Shipping Calculator
      </h3>

      <div className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-4'>
          <div>
            <label className='text-charcoal mb-2 block text-sm font-medium'>Package Weight (lbs)</label>
            <input
              type='number'
              min='0.1'
              step='0.1'
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 1)}
              className='border-stone-gray/30 focus:ring-forest-green w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2'
            />
          </div>

          <div>
            <label className='text-charcoal mb-2 block text-sm font-medium'>Shipping Zone</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className='border-stone-gray/30 focus:ring-forest-green w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2'
            >
              <option value='1-3'>Zones 1-3 (Local/Regional)</option>
              <option value='4-6'>Zones 4-6 (National)</option>
              <option value='7-8'>Zones 7-8 (Cross Country)</option>
            </select>
          </div>
        </div>

        <div className='space-y-3'>
          <h4 className='text-charcoal flex items-center gap-2 font-medium'>
            <Truck className='h-4 w-4' />
            Estimated Rates
          </h4>
          {rates.map((rate, index) => (
            <div
              key={index}
              className='border-stone-gray/20 flex items-center justify-between rounded-lg border bg-white p-3'
            >
              <div>
                <div className='text-charcoal font-medium'>
                  {rate.provider} {rate.service}
                </div>
                <div className='text-stone-gray text-sm'>{rate.days} business days</div>
              </div>
              <div className='text-forest-green text-lg font-bold'>${rate.cost.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
