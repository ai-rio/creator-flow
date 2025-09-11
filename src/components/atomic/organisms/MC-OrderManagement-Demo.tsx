'use client';

import React, { useState } from 'react';

// Component imports
import { OrderManagement } from './MC-OrderManagement';

// ==================== DEMO COMPONENT ====================

/**
 * Demo component showcasing the complete order management interface
 * Includes theme switching and action logging
 */
export function OrderManagementDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    // Apply theme to document root
    const root = document.documentElement;
    root.classList.toggle('dark');
  };

  const handleOrderAction = (action: string, order: any) => {
    console.log(`Action: ${action} on order:`, order.id);
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <OrderManagement
        title='Order Symphony Demo'
        totalOrders={7}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onBack={handleBack}
        onOrderAction={handleOrderAction}
      />
    </div>
  );
}

export default OrderManagementDemo;
