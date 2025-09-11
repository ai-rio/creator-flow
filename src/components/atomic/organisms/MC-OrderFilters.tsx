'use client';

import React from 'react';

// Component imports
import { FilterButton } from '../molecules/MC-FilterButton';

// ==================== TYPE DEFINITIONS ====================

export interface OrderFiltersProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  filters?: string[];
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Order filter system with predefined filter buttons
 * Provides filtering functionality for order management interface
 */
export function OrderFilters({
  activeFilter = 'Strategic',
  onFilterChange,
  filters = ['Strategic', 'Urgent', 'Automated', '⚠️'],
  className = '',
}: OrderFiltersProps) {
  const handleFilterClick = (filter: string) => {
    onFilterChange?.(filter);
  };

  return (
    <div className={`flex items-center justify-around pt-2 ${className}`}>
      {filters.map((filter) => (
        <FilterButton
          key={filter}
          label={filter}
          isActive={activeFilter === filter}
          onClick={() => handleFilterClick(filter)}
        />
      ))}
    </div>
  );
}

export default OrderFilters;
