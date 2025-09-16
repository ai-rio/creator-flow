/**
 * Layout Composition Components
 *
 * These compositions provide reusable layout templates that can be composed
 * with other atomic components to create complete page layouts.
 */

// Bento Grid System
export type { BentoCardProps, BentoGridProps, BentoSectionProps } from './BentoGrid';
export { BentoCard, BentoGrid, BentoSection } from './BentoGrid';

// Enhanced Motion System
export * from './AccessibilityMotionProvider';
export * from './BentoMotion';

// Layout Compositions (will be uncommented as they are implemented)
// export { DashboardLayout } from './DashboardLayout';
// export { ContentLayout } from './ContentLayout';
// export { MarketingLayout } from './MarketingLayout';

// Import components for grouped exports
import { BentoCard, BentoGrid, BentoSection } from './BentoGrid';

// Grouped layout compositions for easy import
export const LayoutCompositions = {
  BentoGrid,
  BentoCard,
  BentoSection,
  // Dashboard: DashboardLayout,
  // Content: ContentLayout,
  // Marketing: MarketingLayout,
};

// Layout types for TypeScript support
export type LayoutType = 'dashboard' | 'content' | 'marketing' | 'bento';

// Layout configuration interface
export interface LayoutConfig {
  type: LayoutType;
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  maxWidth?: string;
  padding?: string;
}

// Bento Grid configuration interface
export interface BentoGridConfig {
  animation?: boolean;
  mobileColumns?: 1 | 2;
  tabletColumns?: 2 | 3;
  desktopColumns?: 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

// Note: Individual exports will be uncommented as layouts are implemented
