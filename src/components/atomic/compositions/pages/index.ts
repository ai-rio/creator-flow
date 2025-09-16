/**
 * Page Composition Components
 *
 * These compositions provide complete page layouts using bento grid system
 * and atomic components to create optimized user experiences.
 */

// Bento Page Compositions
export type { BentoAboutPageProps } from './BentoAboutPage';
export { BentoAboutPage } from './BentoAboutPage';
export type { BentoContactPageProps } from './BentoContactPage';
export { BentoContactPage } from './BentoContactPage';
export type { BentoHomepageProps, HomepageStats } from './BentoHomepage';
export { BentoHomepage } from './BentoHomepage';
export type { BentoPricingPageProps } from './BentoPricingPage';
export { BentoPricingPage } from './BentoPricingPage';

// Import components for grouped exports
import { BentoAboutPage } from './BentoAboutPage';
import { BentoContactPage } from './BentoContactPage';
import { BentoHomepage } from './BentoHomepage';
import { BentoPricingPage } from './BentoPricingPage';

// Grouped page compositions for easy import
export const PageCompositions = {
  BentoHomepage,
  BentoPricingPage,
  BentoAboutPage,
  BentoContactPage,
};

// Page types for TypeScript support
export type PageType = 'homepage' | 'pricing' | 'about' | 'contact' | 'dashboard';

// Page configuration interface
export interface PageConfig {
  type: PageType;
  showHeader?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
  layout?: 'bento' | 'traditional' | 'minimal';
  animations?: boolean;
}

// All public pages are now implemented with bento grid layouts
