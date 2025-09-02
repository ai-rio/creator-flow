# CreatorFlow - TikTok Shop Fulfillment Automation Platform

## Project Overview

CreatorFlow is a comprehensive TikTok Shop fulfillment automation platform designed to scale creators from 50 to 500+ orders per day without operational headaches. Built with Next.js 15, React, TypeScript, and Supabase.

**Target Users**: TikTok Shop sellers, e-commerce creators, scaling micro-brands
**Business Model**: Subscription-based SaaS ($49-$199/month) with usage-based pricing
**Status**: Production-ready MVP with active development roadmap

## Tech Stack

- **Framework**: Next.js 15 with App Router, React 19, TypeScript 5.7+
- **Database**: Supabase (PostgreSQL) with RLS, Edge Functions (Deno runtime)
- **Payments**: Stripe integration with webhooks and subscription management
- **UI**: Tailwind CSS, Radix UI, Shadcn/ui components, Lucide React icons
- **Testing**: Jest (unit), Playwright (E2E), Testing Library (React)
- **Analytics**: PostHog (product analytics), Vercel Analytics
- **Deployment**: Vercel/Fly.io with global CDN, Bun package manager

## Project Structure

```
creator-flow/
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Main application pages
│   │   ├── api/            # API routes and webhooks
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable UI components (Shadcn/ui based)
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
├── supabase/              # Database migrations, Edge Functions, config
├── docs/                  # Comprehensive project documentation
├── tests/                 # E2E tests and testing utilities
└── scripts/               # Development, testing, and deployment scripts
```

## Essential Commands

### Development Workflow

```bash
# Start development (hot reload on :3000)
bun run dev

# Type checking (ALWAYS run after code changes)
bun run type-check

# Linting and formatting
bun run lint
bun run lint:fix

# Complete type safety check
bun run type-fix
```

### Database Operations

```bash
# Generate TypeScript types from Supabase schema
bun run generate-types

# Database migrations
bun run migration:new <name>
bun run migration:up

# Link to Supabase project
bun run supabase:link
```

### Testing Commands

```bash
# Unit tests
bun test

# End-to-end tests
bun run test:e2e
bun run test:e2e:ui          # Playwright UI mode

# Test specific features
bun run test:orders
bun run test:shipping
```

### Production & Deployment

```bash
# Production build
bun run build

# Bundle analysis
bun run analyze

# Security audit
bun run security:audit
```

## Code Style & Conventions

### TypeScript Best Practices

- Use **ES modules** (import/export), not CommonJS (require)
- Destructure imports: `import { foo } from 'bar'`
- Prefer type assertions `(result as any)` for complex union types
- Use null assertions `session!.user.id` after proper null checks
- Add explicit type annotations for callback parameters:
  `orders.map((order: Order) => ...)`

### UI Development Guidelines

- **MANDATORY**: Use **shadcn/ui components** as base building blocks
- Apply **CreatorFlow design system** patterns consistently
- **ALL interactive elements** must have proper accessibility
- Use **Tailwind CSS** with consistent design tokens
- Implement **responsive design** with mobile-first approach

### Component Patterns

- Use **Shadcn/ui** components as foundation
- Implement **discriminated unions** for component variants
- Follow **composition patterns** with compound components
- Use **CVA (Class Variance Authority)** for variant management

### Database Patterns

- Always use **RLS (Row Level Security)** for data access
- Include optional **relationship properties** in types:
  ```typescript
  interface Order {
    id: string;
    user_id: string;
    tiktok_order_id: string;
    // Relationships (optional for queries with joins)
    user?: {
      id: string;
      email: string;
    };
    items?: OrderItem[];
  }
  ```

## Development Guidelines

### Workflow Rules

1. **Always run `bun run type-check` after code changes**
2. **Use feature branches**: `feature/description`, `fix/issue-name`
3. **Test locally** before committing: `bun test && bun run test:e2e`
4. **Security first**: Never commit secrets, always use environment variables

### Documentation Standards

1. **Follow Documentation Standards**: All docs follow [Project Documentation Standards](./docs/development/documentation-standards/DOCUMENTATION_STANDARDS.md)
2. **Four-category structure**: Use 00-planning/, 01-specifications/, 02-implementation/, 03-reports/
3. **Proper naming convention**: P###/S###/I###-DRAFT/R###-DRAFT format
4. **No root-level documentation**: All docs in appropriate `docs/` subdirectories
5. **DRAFT prefixes required**: Implementation and Report docs use DRAFT prefix until approved

### File Naming Conventions

- **Components**: PascalCase (`OrderList.tsx`)
- **Utilities**: camelCase (`formatOrderStatus.ts`)
- **API Routes**: lowercase with hyphens (`api/tiktok-orders/route.ts`)
- **Types**: PascalCase with descriptive names (`TikTokOrder.ts`)

### Error Handling Patterns

- Use **ActionResponse<T>** for consistent server action returns
- Implement proper **null checking** before object access
- Create **type guards** for union type disambiguation
- Log errors appropriately without exposing sensitive data

## Testing Strategy

### Unit Tests (Jest)

- Focus on **business logic** and utility functions
- Mock external dependencies (Supabase, TikTok API, Stripe)
- Test **edge cases** and error scenarios
- Maintain **>80% coverage** for critical paths

### E2E Tests (Playwright)

- Test **complete user journeys** (auth, order processing, fulfillment)
- Use **Page Object Model** for maintainable tests
- Test across **multiple browsers** (Chrome, Firefox, Safari)
- Include **accessibility testing** with axe-core

### Integration Testing

- Test **TikTok Shop webhook** handling
- Test **shipping API** integrations
- Test **Stripe webhook** processing
- Test **database operations** with real data

## Security Considerations

- **Environment variables** for all sensitive data
- **RLS policies** on all database tables
- **Input validation** with Zod schemas
- **CORS configuration** for API routes
- **Webhook signature verification** for TikTok Shop and Stripe
- **SQL injection prevention** via parameterized queries
- **Rate limiting** on public API endpoints

## CreatorFlow-Specific Error Patterns & Solutions

### Common TikTok Shop Integration Errors
- **"TikTok webhook verification failed"** → `bun test src/features/tiktok/webhook-handler.test.ts`
- **"Order sync failed"** → `bun run debug-tiktok-sync` - Debug TikTok API connection
- **"Shipping label generation failed"** → `bun test src/features/shipping/` - Test carrier integrations
- **"Stripe subscription webhook failed"** → `bun run stripe:listen` - Test webhook handling
- **"Order status update failed"** → `bun test --grep="order.*status"` - Test workflow states

### CreatorFlow Development Commands
- **New TikTok Shop setup** → Use `/setup-tiktok-shop` command
- **Order workflow testing** → Use `/test-order-workflow` command
- **Shipping integration debugging** → Use `/debug-shipping` command
- **Analytics validation** → Use `/validate-analytics` command

### CreatorFlow Development Flow
1. TikTok Order Webhook → Order Processing → Shipping Label → Fulfillment Update → Analytics
2. Test with realistic TikTok Shop scenarios (viral products, high volume)
3. Verify webhook signature validation and error handling
4. Ensure proper order status synchronization with TikTok Shop

## Known Issues & Warnings

- **Next.js 15**: Some packages may have compatibility warnings
- **React 19**: Ensure all dependencies support latest React
- **Supabase Edge Functions**: Use Deno runtime, not Node.js
- **TikTok Shop API**: Rate limiting at 1000 requests/minute
- **Stripe Webhooks**: Test with `bun run stripe:listen` in development

## Quality Checklist

Before committing:

- [ ] `bun run type-check` passes
- [ ] `bun run lint` passes
- [ ] Critical tests pass: `bun test`
- [ ] **UI Components**: Used shadcn/ui components properly
- [ ] **Design System**: Applied CreatorFlow design tokens
- [ ] **Accessibility**: All interactive elements accessible
- [ ] **Mobile**: Tested on mobile devices
- [ ] No console.errors in development
- [ ] Environment variables documented
- [ ] Security considerations addressed

### Documentation Quality Gates

- [ ] **Follows Documentation Standards**: All docs follow project standards
- [ ] **Four-category structure**: Uses proper folder organization
- [ ] **Proper naming convention**: Follows P###/S###/I###/R### format
- [ ] **No root-level documentation**: All docs in appropriate subdirectories
- [ ] **No premature completion claims**: No "COMPLETE" files without validation
- [ ] **DRAFT prefixes required**: Implementation docs use DRAFT until approved

### TikTok Shop Integration Quality Gates

- [ ] **Webhook Verification**: Proper signature validation implemented
- [ ] **Rate Limiting**: Respects TikTok Shop API limits
- [ ] **Error Handling**: Graceful handling of API failures
- [ ] **Order Sync**: Bidirectional order status synchronization
- [ ] **Testing**: Comprehensive webhook and API testing

## Learning Resources

- [Next.js 15 App Router Docs](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TikTok Shop API Documentation](https://partner.tiktokshop.com/docv2/page/6507ead7b99d5302be949ba9)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)

## Documentation & Development Resources (MANDATORY READING)

- **[Project Documentation Standards](./docs/development/documentation-standards/DOCUMENTATION_STANDARDS.md)** - Official documentation organization standard
- [Development Guide](./docs/development/README.md) - Complete development setup
- [Architecture Overview](./docs/architecture/README.md) - System architecture and design
- [Features Overview](./docs/features/README.md) - Feature specifications and roadmap
- [Business Overview](./docs/business/README.md) - Business model and strategy

## 🤖 **AI Agent Guidelines**

### **CRITICAL Documentation Rules for AI Agents**

1. **MANDATORY**: Follow [Project Documentation Standards](./docs/development/documentation-standards/DOCUMENTATION_STANDARDS.md) for ALL documentation
2. **NEVER** create documentation files in project root
3. **NEVER** claim implementation is "COMPLETE" without user validation
4. **ALWAYS** use four-category structure: 00-planning/, 01-specifications/, 02-implementation/, 03-reports/
5. **ALWAYS** use P###/S###/I###-DRAFT-/R###-DRAFT- naming convention
6. **ALWAYS** place docs in `docs/development/[initiative]/[category]/` structure

### **Prohibited Documentation Practices**

❌ Creating `IMPLEMENTATION_COMPLETE.md` in root
❌ Creating `PHASE_X_SUMMARY.md` without user approval
❌ Claiming completion before user testing
❌ Root-level status files
❌ Final reports before validation

### **Required Documentation Practices**

✅ `docs/development/[initiative]/02-implementation/I001-DRAFT-implementation-progress.md`
✅ `docs/development/[initiative]/01-specifications/S001-technical-requirements.md`
✅ `docs/development/[initiative]/00-planning/P001-investigation-findings.md`
✅ Wait for user validation before removing `DRAFT-` prefix

### **CreatorFlow-Specific Guidelines**

- **TikTok Shop Integration**: Always test webhook handling and API rate limits
- **Order Processing**: Ensure proper error handling for high-volume scenarios
- **Shipping Integration**: Test with multiple carriers and edge cases
- **Analytics**: Validate data accuracy and real-time updates
- **Security**: Implement proper webhook signature verification

### **Documentation Approval Flow**

1. **Start**: Create `DRAFT_` prefixed files in proper `docs/` location
2. **Progress**: Update drafts with implementation progress
3. **User Testing**: User validates functionality
4. **User Approval**: User explicitly approves completion
5. **Finalize**: Remove `DRAFT_` prefix only after user approval

---

_This CLAUDE.md is version-controlled and shared across the team. Update it when conventions change or new patterns emerge._
