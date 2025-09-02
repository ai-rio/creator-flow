# CreatorFlow Tech Stack

## Core Framework
- **Next.js 15** with App Router and React 19
- **TypeScript 5.7+** with strict mode enabled
- **Bun** as package manager (v1.2.17)

## Database & Backend
- **Supabase** (PostgreSQL) with Row Level Security (RLS)
- **Supabase Edge Functions** (Deno runtime)
- Server-side rendering and API routes via Next.js

## UI & Styling
- **Tailwind CSS** with custom design system
- **Radix UI** primitives for accessible components
- **Shadcn/ui** component library
- **Lucide React** for icons
- **CVA (Class Variance Authority)** for component variants

## Payment & Integrations
- **Stripe** for subscription management and webhooks
- **TikTok Shop API** for order synchronization
- **PostHog** for product analytics
- **React Email** for transactional emails
- **Resend** as email service provider

## Testing & Quality
- **Jest** for unit testing with separate unit/integration configs
- **Playwright** for end-to-end testing
- **Testing Library** for React component testing
- **ESLint** with TypeScript and Next.js configs
- **Prettier** with Tailwind plugin for code formatting
- **Husky** with pre-commit hooks

## Development Tools
- **Vercel Analytics** for performance monitoring
- **Bundle Analyzer** for build optimization
- **Formbricks** for user feedback collection
- **env-cmd** for environment management