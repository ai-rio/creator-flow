# CreatorFlow Project Structure

## Root Directory
```
creator-flow/
├── src/                     # Main application source
├── supabase/               # Database migrations, Edge Functions, config
├── docs/                   # Comprehensive project documentation
├── tests/                  # E2E tests and testing utilities
├── scripts/                # Development, testing, and deployment scripts
├── public/                 # Static assets
└── [config files]          # Various configuration files
```

## Source Structure (`src/`)
```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── (auth)/            # Authentication pages (grouped route)
│   ├── (account)/         # Account management pages
│   ├── api/               # API routes and webhooks
│   ├── pricing/           # Pricing page
│   └── [core files]       # layout.tsx, page.tsx, etc.
├── components/            # Reusable UI components
│   ├── ui/               # Base shadcn/ui components
│   ├── mdx/              # MDX-specific components
│   └── [custom components] # Application-specific components
├── features/             # Feature-specific modules
│   ├── account/          # Account management logic
│   ├── emails/           # Email templates and logic
│   └── pricing/          # Pricing logic
├── libs/                 # External service integrations
│   ├── supabase/         # Database client and helpers
│   ├── stripe/           # Payment processing
│   ├── posthog/          # Analytics integration
│   └── resend/           # Email service
├── types/                # TypeScript type definitions
├── utils/                # General utilities
├── constants/            # Application constants
└── styles/               # Global styles
```

## Key Configuration Files
- `package.json` - Dependencies and scripts (Bun package manager)
- `tsconfig.json` - TypeScript configuration with strict mode
- `.eslintrc.json` - ESLint rules with TypeScript integration
- `tailwind.config.ts` - Tailwind CSS with custom design tokens
- `jest.config.js` - Testing configuration (unit + integration)
- `playwright.config.ts` - E2E testing configuration
- `prettier.config.js` - Code formatting rules
- `next.config.js` - Next.js configuration
- `supabase/config.toml` - Supabase project configuration

## Feature Organization
Features are organized in `src/features/` with each feature containing:
- Controllers for business logic
- Components for UI
- Types for feature-specific interfaces
- Integration with external services