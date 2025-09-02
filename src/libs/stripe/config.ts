import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'CreatorFlow',
    version: '1.0.0',
  },
});

// Creator-specific product IDs
export const CREATOR_PRODUCTS = {
  STARTER: process.env.STRIPE_CREATOR_STARTER_PRICE_ID,
  PRO: process.env.STRIPE_CREATOR_PRO_PRICE_ID,
  ENTERPRISE: process.env.STRIPE_CREATOR_ENTERPRISE_PRICE_ID,
} as const;

export const CREATOR_FEATURES = {
  STARTER: ['Basic analytics', 'Up to 1000 followers'],
  PRO: ['Advanced analytics', 'Up to 10k followers', 'Custom branding'],
  ENTERPRISE: ['Full analytics suite', 'Unlimited followers', 'White label'],
} as const;
