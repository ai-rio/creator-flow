'use client';

import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Filter button component for order management with active/inactive states
 * Provides consistent styling for filter buttons with proper design tokens
 */
export function FilterButton({ label, isActive = false, onClick, className = '' }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
        isActive ? 'bg-foreground text-background' : 'text-foreground/60 hover:bg-muted hover:text-foreground/80',
        className
      )}
    >
      {label}
    </button>
  );
}

export default FilterButton;
