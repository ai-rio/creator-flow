# Development Guide

## 🚀 Quick Start

CreatorFlow is a TikTok Shop fulfillment automation platform built with modern web technologies. This guide will get you up and running quickly.

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended)
- **Git** for version control
- **Supabase** account for database and auth
- **Stripe** account for payments
- **TikTok Shop** developer access

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ai-rio/creator-flow.git
   cd creator-flow
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database setup**
   ```bash
   bun run supabase:link
   bun run migration:up
   ```

5. **Start development server**
   ```bash
   bun run dev
   ```

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.7+
- **Runtime**: Bun (package manager & runtime)
- **Database**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Payments**: Stripe (subscriptions & billing)
- **UI**: Tailwind CSS + shadcn/ui components

### Development Tools
- **UI Components**: shadcn/ui + mvpblocks for rapid development
- **Design System**: Comprehensive design tokens with CDH manifesto alignment
- **Linting**: ESLint + Prettier
- **Testing**: Jest (unit) + Playwright (E2E)
- **Type Safety**: TypeScript strict mode
- **Code Quality**: Husky pre-commit hooks

### External Integrations
- **TikTok Shop API**: Order management and fulfillment
- **Shipping APIs**: Shippo, EasyPost for label generation
- **Email**: Resend for transactional emails
- **Analytics**: PostHog for product analytics

## 📁 Project Structure

```
creator-flow/
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Main application pages
│   │   ├── api/            # API routes and webhooks
│   │   └── globals.css     # Global styles with design tokens
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui + mvpblocks base components
│   │   ├── custom/        # Custom CreatorFlow components
│   │   └── dashboard/     # Premium dashboard components
│   ├── features/          # Feature-specific modules
│   │   ├── auth/          # Authentication logic
│   │   ├── orders/        # TikTok order management
│   │   ├── shipping/      # Shipping integration
│   │   ├── analytics/     # Analytics and reporting
│   │   └── tiktok/        # TikTok Shop integration
│   ├── lib/               # Utilities and configurations
│   │   ├── supabase/      # Database client and helpers
│   │   ├── stripe/        # Payment processing
│   │   ├── tiktok/        # TikTok Shop API client
│   │   └── utils/         # General utilities
│   └── types/             # TypeScript type definitions
├── supabase/              # Database migrations and functions
├── docs/                  # Project documentation
│   ├── development/       # Development guides and specifications
│   │   ├── order-management/          # Core orchestrator system
│   │   ├── tiktok-inventory-tracking/ # Inventory component system
│   │   ├── shipping-automation/       # Multi-carrier shipping system
│   │   ├── tiktok-shop-integration/   # TikTok Shop API integration
│   │   ├── creator-analytics/         # Analytics and reporting system
│   │   ├── creator-authentication/    # Auth and subscription system
│   │   ├── dashboard-design/          # Premium dashboard design system
│   │   ├── public-pages/              # Public-facing website components
│   │   └── documentation-standards/   # Project documentation standards
│   ├── architecture/      # System architecture documentation
│   └── business/          # Business model and strategy
├── tests/                 # Test files and utilities
└── scripts/               # Development and deployment scripts
```

## 🏗️ Core Systems Documentation

CreatorFlow is built around eight core systems that work together to deliver seamless TikTok Shop fulfillment automation:

### 📋 **Master Implementation Plan**
**[CreatorFlow Master Roadmap](./moscow-methodology/02-implementation/I001-DRAFT-roadmap.md)** - Single source of truth consolidating all system planning, specifications, and implementation details using MoSCoW methodology.

### 🎯 [Order Management](./order-management/) - Core Orchestrator
Central system coordinating all fulfillment operations. Manages order lifecycle, workflow engine, and system integrations.
- **Status**: Planning Complete - Comprehensive specs defined, implementation NOT STARTED
- **Performance Target**: 500+ orders/day per creator, <30s processing
- **Integration**: Coordinates all other systems

### 📦 [TikTok Inventory Tracking](./tiktok-inventory-tracking/) - Component System  
Real-time inventory synchronization with TikTok Shop, preventing oversells and managing stock levels.
- **Status**: Specifications Complete - Comprehensive docs, implementation IN PROGRESS
- **Performance Target**: <5min sync latency, 99.9% accuracy
- **Integration**: Feeds order management system

### 🚚 [Shipping Automation](./shipping-automation/) - Multi-Carrier System
Automated label generation, rate shopping, and tracking across USPS, UPS, FedEx, and DHL carriers.
- **Status**: Planning Only - Multi-carrier investigation, no specifications yet
- **Performance Target**: <30s label generation, 15-25% cost savings
- **Integration**: Receives orders from order management

### 🔗 [TikTok Shop Integration](./tiktok-shop-integration/) - External API System
Comprehensive TikTok Shop API integration for orders, products, webhooks, and seller management.
- **Status**: Planning Complete - API specs defined, implementation NOT STARTED
- **Performance Target**: <500ms API response, 99.9% uptime
- **Integration**: Primary data source for order management

### 📊 [Creator Analytics](./creator-analytics/) - Reporting System
Performance metrics, revenue tracking, and business intelligence for creator growth optimization.
- **Status**: Planning Complete - Business intelligence specs, implementation NOT STARTED
- **Performance Target**: Real-time dashboards, <2s query response
- **Integration**: Aggregates data from all systems

### 🔐 [Creator Authentication](./creator-authentication/) - Auth & Subscription System
User authentication, subscription management, and creator tier access control with Stripe integration.
- **Status**: Planning Complete - Security foundation specs, implementation NOT STARTED
- **Performance Target**: <200ms auth response, 99.99% uptime
- **Integration**: Secures access to all systems

### 🎨 [Dashboard Design](./dashboard-design/) - Premium User Interface System
Premium dashboard design system implementing CDH manifesto principles with comprehensive design tokens and MVPBlocks integration.
- **Status**: Specifications Complete - CDH manifesto UI specs, component library IN PROGRESS
- **Performance Target**: CEO-grade interface experience, 100% design consistency
- **Integration**: Unified design language across all dashboard interfaces

### 🌐 [Public Pages](./public-pages/) - Marketing Website Components
Public-facing website development using strategic MVPBlocks integration while preserving CDH manifesto principles for creator marketing.
- **Status**: Specifications Complete - MVPBlocks strategy defined, implementation IN PROGRESS
- **Performance Target**: <2s page load, 90+ Lighthouse score, >5% conversion rate
- **Integration**: Marketing funnel feeding into authenticated dashboard experience

## 🔧 Essential Commands

### Development Workflow
```bash
# Start development server
bun run dev

# Type checking
bun run type-check

# Linting and formatting
bun run lint
bun run lint:fix

# Build for production
bun run build
```

### MVPBlocks Component Management
```bash
# Explore available components
bunx mvpblocks --help
bunx mvpblocks list

# Add specific components for dashboard
npx mvpblocks add admin-dashboard-1
npx mvpblocks add dashboard-card
npx mvpblocks add revenue-chart

# Search for specific component types
bunx mvpblocks search dashboard
bunx mvpblocks search analytics
```

### Database Operations
```bash
# Generate TypeScript types from Supabase
bun run generate-types

# Create new migration
bun run migration:new <name>

# Apply migrations
bun run migration:up

# Reset database (development only)
bun run migration:reset
```

### Testing
```bash
# Run unit tests
bun test

# Run E2E tests
bun run test:e2e

# Run tests in watch mode
bun test --watch
```

## 🎯 Development Guidelines

### Code Style
- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks
- Implement **proper error handling** with try/catch
- Use **Zod** for runtime type validation

### Component Development
- Use **shadcn/ui + mvpblocks** components as base building blocks
- Follow **CDH manifesto design principles** (Clarity, Art, Automation, CEO-grade)
- Use **design tokens** from comprehensive style guide (never hard-code colors)
- Follow **composition patterns** for complex components
- Implement **proper accessibility** (ARIA labels, keyboard navigation)
- Use **premium animations** aligned with manifesto tenets

### API Development
- Use **Next.js API routes** for backend logic
- Implement **proper error handling** and status codes
- Use **Zod** for request/response validation
- Follow **RESTful** conventions for endpoints

### Database Patterns
- Use **Row Level Security (RLS)** for all tables
- Implement **proper indexing** for performance
- Use **transactions** for multi-table operations
- Follow **normalized** database design principles

## 🔒 Security Best Practices

### Authentication & Authorization
- Use **Supabase Auth** for user management
- Implement **RLS policies** for data access control
- Use **JWT tokens** for API authentication
- Follow **principle of least privilege**

### Data Protection
- **Never** commit secrets to version control
- Use **environment variables** for sensitive data
- Implement **input validation** on all endpoints
- Use **HTTPS** for all communications

### API Security
- Implement **rate limiting** on public endpoints
- Use **webhook signature verification** for external APIs
- Validate **CORS** settings for production
- Log **security events** for monitoring

## 📊 Performance Guidelines

### Frontend Optimization
- Use **Next.js Image** component for optimized images
- Implement **code splitting** with dynamic imports
- Use **React.memo** for expensive components
- Optimize **bundle size** with tree shaking

### Backend Optimization
- Use **database indexes** for frequently queried fields
- Implement **caching** for expensive operations
- Use **connection pooling** for database connections
- Monitor **API response times** and optimize slow endpoints

## 🧪 Testing Strategy

### Unit Testing
- Test **business logic** and utility functions
- Mock **external dependencies** (APIs, database)
- Achieve **>80% code coverage** for critical paths
- Use **Jest** and **Testing Library** for React components

### Integration Testing
- Test **API endpoints** with real database
- Test **authentication flows** end-to-end
- Test **webhook handling** with mock payloads
- Use **Supabase local development** for isolated testing

### E2E Testing
- Test **complete user journeys** (signup to order fulfillment)
- Test **payment flows** with Stripe test mode
- Test **responsive design** across devices
- Use **Playwright** for cross-browser testing

## 🚀 Deployment

### Development Environment
- Use **Supabase local development** for database
- Use **Stripe test mode** for payments
- Use **ngrok** for webhook testing
- Use **hot reload** for rapid development

### Production Deployment
- Deploy to **Vercel** or **Fly.io**
- Use **Supabase production** instance
- Configure **Stripe live mode** webhooks
- Set up **monitoring** and **error tracking**

## 📚 Learning Resources

### Framework Documentation
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Database & Backend
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [TikTok Shop API Documentation](https://partner.tiktokshop.com/docv2)

### UI & Design System
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [MVPBlocks Documentation](https://mvpblocks.dev)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- **CreatorFlow Design System**: `docs/development/dashboard-design/01-specifications/S002-DRAFT-style-guide-design-tokens.md`

### Testing
- [Jest Documentation](https://jestjs.io/docs)
- [Playwright Documentation](https://playwright.dev/docs)
- [Testing Library](https://testing-library.com/docs)

### CreatorFlow-Specific Documentation
- **Master Implementation Roadmap**: `docs/development/moscow-methodology/02-implementation/I001-DRAFT-roadmap.md`
- **Dashboard Design System**: `docs/development/dashboard-design/01-specifications/S001-dashboard-wireframes.md`
- **Design Tokens & Style Guide**: `docs/development/dashboard-design/01-specifications/S002-DRAFT-style-guide-design-tokens.md`
- **Public Pages Strategy**: `docs/development/public-pages/01-specifications/S001-DRAFT-public-pages-component-strategy.md`
- **MVPBlocks Integration**: `docs/development/public-pages/02-implementation/I001-DRAFT-mvpblocks-installation-guide.md`
- **CDH vs MVPBlocks Analysis**: `docs/development/public-pages/00-planning/P001-cdh-vs-mvpblocks-analysis.md`
- **Documentation Standards**: `docs/development/documentation-standards/DOCUMENTATION_STANDARDS.md`

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Pull Request Guidelines
- Include **clear description** of changes
- Add **tests** for new functionality
- Ensure **all tests pass**
- Follow **code style** guidelines
- Update **documentation** as needed

---

*For more detailed information, see the specific documentation sections linked above.*
