'use client';

import React from 'react';

// Design system imports
import { cn } from '@/utils/cn';

// ==================== TYPE DEFINITIONS ====================

interface GlassPaneProps {
  children: React.ReactNode;
  className?: string;
}

// ==================== MAIN COMPONENT ====================

/**
 * Glass morphism pane with backdrop blur and proper design system tokens
 * Provides consistent glass effect styling across mobile dashboard components
 */
export function GlassPane({ children, className = '' }: GlassPaneProps) {
  return (
    <div
      className={cn(
        'border border-border/10 bg-background/30 shadow-lg backdrop-blur-xl',
        'dark:border-border/10 dark:bg-background/20',
        className
      )}
    >
      {children}
    </div>
  );
}

export default GlassPane;
