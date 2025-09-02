/**
 * Shipping Calculator Component
 * Interactive shipping cost calculator for creators
 */

import React, { useState } from 'react';
import { Package, Truck, Calculator } from 'lucide-react';

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
      'USPS': { ground: 8.50, express: 25.00 },
      'UPS': { ground: 12.00, express: 35.00 },
      'FedEx': { ground: 11.50, express: 32.00 }
    };
    
    const zoneMultiplier = zone === '1-3' ? 1 : zone === '4-6' ? 1.3 : 1.6;
    const weightMultiplier = Math.max(1, weight * 0.5);
    
    return [
      {
        provider: 'USPS',
        service: 'Ground Advantage',
        cost: baseRates.USPS.ground * zoneMultiplier * weightMultiplier,
        days: '2-5'
      },
      {
        provider: 'UPS',
        service: 'Ground',
        cost: baseRates.UPS.ground * zoneMultiplier * weightMultiplier,
        days: '1-3'
      },
      {
        provider: 'FedEx',
        service: 'Ground',
        cost: baseRates.FedEx.ground * zoneMultiplier * weightMultiplier,
        days: '1-3'
      }
    ];
  };

  const rates = calculateRates();

  return (
    <div className="bg-light-concrete rounded-2xl p-6 mb-6 border border-stone-gray/20">
      <h3 className="text-xl font-bold text-forest-green mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5" />
        Shipping Calculator
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Package Weight (lbs)
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-stone-gray/30 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Shipping Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2 border border-stone-gray/30 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
            >
              <option value="1-3">Zones 1-3 (Local/Regional)</option>
              <option value="4-6">Zones 4-6 (National)</option>
              <option value="7-8">Zones 7-8 (Cross Country)</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-charcoal flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Estimated Rates
          </h4>
          {rates.map((rate, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-stone-gray/20">
              <div>
                <div className="font-medium text-charcoal">{rate.provider} {rate.service}</div>
                <div className="text-sm text-stone-gray">{rate.days} business days</div>
              </div>
              <div className="text-lg font-bold text-forest-green">
                ${rate.cost.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
