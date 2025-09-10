/**
 * Layout Composition Components
 *
 * These compositions provide reusable layout templates that can be composed
 * with other atomic components to create complete page layouts.
 */

// Layout Compositions (will be uncommented as they are implemented)
// export { DashboardLayout } from './DashboardLayout';
// export { ContentLayout } from './ContentLayout';
// export { MarketingLayout } from './MarketingLayout';

// Grouped layout compositions for easy import
export const LayoutCompositions = {
  // Dashboard: DashboardLayout,
  // Content: ContentLayout,
  // Marketing: MarketingLayout,
};

// Layout types for TypeScript support
export type LayoutType = 'dashboard' | 'content' | 'marketing';

// Layout configuration interface
export interface LayoutConfig {
  type: LayoutType;
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  maxWidth?: string;
  padding?: string;
}

// Note: Individual exports will be uncommented as layouts are implemented
