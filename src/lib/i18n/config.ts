import { routing } from '@/i18n/routing';

// Use the routing configuration from next-intl
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

export type Locale = (typeof locales)[number];
