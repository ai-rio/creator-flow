<p align="center">
  <h1 align="center">CreatorFlow</h1>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/kolbysisk/next-supabase-stripe-starter" alt="License"></a>
</p>

## Introduction

TikTok Shop fulfillment automation platform designed to scale creators from 50 to 500+ orders per day without operational headaches. Built with Next.js 15, React, TypeScript, and Supabase.

**Target Users**: TikTok Shop sellers, e-commerce creators, scaling micro-brands  
**Business Model**: Subscription-based SaaS ($49-$199/month) with usage-based pricing  
**Status**: Production-ready MVP with active development roadmap

### What's included

- **Framework**: Next.js 15 with App Router, React 19, TypeScript 5.7+
- **Database**: Supabase (PostgreSQL) with RLS, Edge Functions (Deno runtime)
- **Payments**: Stripe integration with webhooks and subscription management
- **UI**: Tailwind CSS, Radix UI, Shadcn/ui components, Lucide React icons
- **Testing**: Jest (unit), Playwright (E2E), Testing Library (React)
- **Analytics**: PostHog (product analytics), Vercel Analytics
- **Deployment**: Vercel/Fly.io with global CDN, Bun package manager

## Getting started

### 1. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to Project Settings → Database → Database password and click reset database password then click generate a new password
3. Save this password somewhere, you can't see it after closing the box

### 2. Setup Stripe

1. Go to [stripe.com](https://stripe.com) and create a project
2. Go to [Customer Portal Settings](https://dashboard.stripe.com/test/settings/billing/portal) and click the `Active test link` button

### 3. Setup Resend

1. Go to [resend.com](https://resend.com) and create an account
2. Go to the [API Keys page](https://resend.com/api-keys) and create an API Key
3. Add the [Supabase Resend integration](https://supabase.com/partners/integrations/resend)

### 4. Environment Setup

1. Clone the repository
2. Create `.env.local` file from `.env.local.example`
3. Add your Supabase, Stripe, and Resend credentials
4. Run `bun install` to install dependencies

### 5. Database Setup

1. Run `bunx supabase login`
2. Run `bunx supabase init`
3. Update `package.json` with your Supabase project ID
4. Run `bun run supabase:link`
5. Run `bun run migration:up`

### 6. Stripe Configuration

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli#install)
2. Run `stripe fixtures ./stripe-fixtures.json --api-key YOUR_STRIPE_SK`
3. Setup webhook endpoint at `/api/webhooks`

### 7. Development

1. Run `bun run dev` to start development server
2. Visit `http://localhost:3000`
3. Test TikTok Shop integration and creator workflows

## Core Features

### TikTok Shop Integration
- Automated order synchronization
- Real-time webhook handling
- Order status management
- Product catalog sync

### Creator Analytics
- Performance metrics dashboard
- Revenue tracking
- Order fulfillment analytics
- Growth insights

### Shipping Automation
- Multi-carrier integration
- Automated label generation
- Tracking synchronization
- Delivery notifications

### Subscription Management
- Creator tier subscriptions
- Usage-based billing
- Payment processing
- Account management

## Development Commands

```bash
# Development
bun run dev              # Start development server
bun run type-check       # TypeScript checking
bun run lint            # ESLint checking
bun run lint:fix        # Fix linting issues

# Testing
bun test                # Unit tests
bun run test:e2e        # E2E tests
bun run test:e2e:ui     # E2E tests with UI

# Database
bun run generate-types  # Generate Supabase types
bun run migration:new   # Create new migration
bun run migration:up    # Run migrations

# Stripe
bun run stripe:listen   # Listen to webhooks

# Email
bun run email:dev       # Email development server
```

## Project Structure

```
creator-flow/
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Main application pages
│   │   └── api/            # API routes and webhooks
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base shadcn/ui components
│   │   └── custom/        # Custom application components
│   ├── features/          # Feature-specific modules
│   │   ├── auth/          # Authentication logic
│   │   ├── orders/        # Order management
│   │   ├── shipping/      # Shipping integration
│   │   ├── analytics/     # Analytics and reporting
│   │   └── tiktok/        # TikTok Shop integration
│   ├── lib/               # Utilities, Supabase client, helpers
│   │   ├── supabase/      # Database client and helpers
│   │   ├── stripe/        # Payment processing
│   │   ├── tiktok/        # TikTok Shop API client
│   │   └── utils/         # General utilities
│   └── types/             # TypeScript type definitions
├── supabase/              # Database migrations, Edge Functions
├── docs/                  # Comprehensive project documentation
├── tests/                 # E2E tests and testing utilities
└── scripts/               # Development and deployment scripts
```

## Documentation

- **[Complete Documentation](./docs/README.md)** - Full documentation index
- **[Development Guide](./docs/development/README.md)** - Development setup and guidelines
- **[Architecture Overview](./docs/architecture/README.md)** - System architecture
- **[Features Overview](./docs/features/README.md)** - Feature specifications
- **[Business Model](./docs/business/README.md)** - Business strategy and roadmap

## Contributing

1. Follow the [Development Standards](./CLAUDE.md)
2. Use feature branches: `feature/description`
3. Run tests before committing: `bun test && bun run test:e2e`
4. Follow the [Documentation Standards](./docs/development/documentation-standards/DOCUMENTATION_STANDARDS.md)

## License

MIT License - see [LICENSE](./LICENSE) file for details.

---

*CreatorFlow - Scaling TikTok Shop creators through automation*
