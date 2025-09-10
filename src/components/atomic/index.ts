/**
 * Atomic Design System - Main Exports
 *
 * This file provides access to all atomic design components following
 * the atomic design methodology: atoms → molecules → organisms → compositions
 */

// Atomic Components (Single responsibility)
export * from './atoms';

// Molecular Components (Simple compositions)
export * from './molecules';

// Organism Components (Complex compositions)
export * from './organisms';

// Composition Components (Page-level layouts)
export * from './compositions';

// Atomic Design System Utilities
export const AtomicDesignCategories = {
  ATOMS: 'atoms',
  MOLECULES: 'molecules',
  ORGANISMS: 'organisms',
  COMPOSITIONS: 'compositions',
} as const;

export type AtomicDesignCategory = (typeof AtomicDesignCategories)[keyof typeof AtomicDesignCategories];
