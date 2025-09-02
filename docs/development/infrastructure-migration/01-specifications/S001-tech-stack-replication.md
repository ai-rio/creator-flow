# S001: Tech Stack Replication from QuoteKit to CreatorFlow

**Document Type**: Specifications  
**Status**: Active  
**Created**: 2025-09-02  

## Objective

Replicate QuoteKit's proven tech stack and infrastructure patterns in CreatorFlow while building creator-specific features from scratch.

## Tech Stack to Replicate

### Core Infrastructure
- **Framework**: Next.js 15 + App Router + TypeScript
- **Database**: Supabase (PostgreSQL + RLS + Edge Functions)
- **Payments**: Stripe (subscriptions + webhooks)
- **Email**: React Email + Resend
- **Testing**: Jest + Playwright + Testing Library
- **Deployment**: Fly.io + Vercel

### Configuration Files to Copy
```bash
# Essential config files from QuoteKit
- package.json (dependencies only)
- tsconfig.json
- tailwind.config.ts
- next.config.js
- jest.config.js
- playwright.config.ts
- components.json (shadcn/ui)
```

### Infrastructure Patterns to Replicate
```bash
# Client configurations
- src/libs/supabase/client.ts
- src/libs/stripe/config.ts
- src/libs/email/config.ts

# Utility patterns
- src/utils/stripe-error-guards.ts
- src/utils/supabase-helpers.ts
- src/types/database.ts (structure, not content)
```

### Scripts to Adapt
```bash
# Development scripts
- generate-types (Supabase)
- stripe:listen
- email:dev
- test:e2e
```

## What NOT to Copy

❌ Business logic (quotes, assessments, etc.)  
❌ Database schema/migrations  
❌ UI components (creator-flow needs its own)  
❌ API routes (different domain)  
❌ Feature-specific code  

## Implementation Approach

1. **Copy infrastructure configs** (tsconfig, package.json deps, etc.)
2. **Replicate client setups** (Supabase, Stripe, Email clients)
3. **Adapt utility patterns** (error handling, type guards)
4. **Build creator features** from scratch using these foundations

This gives you the proven infrastructure without QuoteKit's business logic contamination.
