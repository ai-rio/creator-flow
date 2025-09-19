import type { AbstractIntlMessages } from 'next-intl';

import enAuth from '../../locales/en/auth.json';
// Import the English translations as the type source
import enCommon from '../../locales/en/common.json';
import enDashboard from '../../locales/en/dashboard.json';
import enFeatures from '../../locales/en/features.json';
import enHomepage from '../../locales/en/homepage.json';
import enTest from '../../locales/en/test.json';

// Merge all translation modules to create the complete message type
type Messages = typeof enCommon &
  typeof enHomepage &
  typeof enFeatures &
  typeof enAuth &
  typeof enDashboard &
  typeof enTest;

// Augment next-intl's AbstractIntlMessages interface with our message types
declare global {
  interface IntlMessages extends Messages {
    // Explicitly define at least one property to avoid empty interface
    _version?: string;
  }
}

// Export useful types for the application
export type MessageKeys = keyof Messages;
export type TranslationFunction = (key: MessageKeys, params?: any) => string;

// Type for locale
export type Locale = 'en' | 'es' | 'pt-br';

// Type for translation modules
export type TranslationModule = 'common' | 'homepage' | 'features' | 'auth' | 'dashboard' | 'test';

// Utility type to get keys from a specific module
export type ModuleKeys<T extends TranslationModule> = T extends 'common'
  ? keyof typeof enCommon
  : T extends 'homepage'
  ? keyof typeof enHomepage
  : T extends 'features'
  ? keyof typeof enFeatures
  : T extends 'auth'
  ? keyof typeof enAuth
  : T extends 'dashboard'
  ? keyof typeof enDashboard
  : T extends 'test'
  ? keyof typeof enTest
  : never;

// Helper type for translation parameters
export type TranslationParams = Record<string, string | number | boolean>;

// Type for the complete messages object
export type CompleteMessages = Messages;

export default Messages;
