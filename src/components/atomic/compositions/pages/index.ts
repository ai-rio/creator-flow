/**
 * Page Composition Components
 *
 * These compositions provide complete page layouts using bento grid system
 * and atomic components to create optimized user experiences.
 */

// Bento Page Compositions
export type { BentoHomepageProps, HomepageStats } from './BentoHomepage';
export { BentoHomepage } from './BentoHomepage';

// Import components for grouped exports
import { BentoHomepage } from './BentoHomepage';

// Page Compositions (will be uncommented as they are implemented)
// export { LandingPageComposition } from './LandingPageComposition';
// export { AboutPageComposition } from './AboutPageComposition';
// export { PricingPageComposition } from './PricingPageComposition';

// Grouped page compositions for easy import
export const PageCompositions = {
  BentoHomepage,
  // LandingPage: LandingPageComposition,
  // AboutPage: AboutPageComposition,
  // PricingPage: PricingPageComposition,
};

// Page types for TypeScript support
export type PageType = 'homepage' | 'landing' | 'about' | 'pricing' | 'dashboard';

// Page configuration interface
export interface PageConfig {
  type: PageType;
  showHeader?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
  layout?: 'bento' | 'traditional' | 'minimal';
  animations?: boolean;
}

// Note: Individual exports will be uncommented as pages are implemented
