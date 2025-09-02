# Task Completion Checklist

## Pre-Commit Validation (MANDATORY)
Before committing any code changes:

- [ ] `bun run type-check` passes without errors
- [ ] `bun run lint` passes without errors  
- [ ] Critical tests pass: `bun test`
- [ ] No console.errors in development
- [ ] Security considerations addressed (no secrets committed)

## UI/Component Development
- [ ] **Shadcn/ui components** used as base building blocks
- [ ] **CreatorFlow design system** patterns applied consistently
- [ ] **Accessibility**: All interactive elements properly accessible
- [ ] **Mobile-first**: Tested on mobile devices and responsive
- [ ] **Design tokens**: Used consistent Tailwind CSS classes

## Database & API Changes
- [ ] **RLS policies** implemented for data access
- [ ] **Input validation** with Zod schemas where applicable
- [ ] **Error handling** with proper ActionResponse<T> patterns
- [ ] **Webhook signatures** verified for external integrations

## Testing Requirements
- [ ] **Unit tests** for business logic components
- [ ] **Integration tests** for API routes and external services
- [ ] **E2E tests** for critical user journeys (if applicable)
- [ ] **>80% coverage** maintained for critical paths

## CreatorFlow-Specific Quality Gates
- [ ] **TikTok Shop integration**: Webhook verification and rate limiting respected
- [ ] **Order processing**: Error handling for high-volume scenarios
- [ ] **Shipping integration**: Multiple carrier support and edge cases
- [ ] **Analytics validation**: Data accuracy and real-time updates
- [ ] **Stripe webhooks**: Proper signature verification

## Documentation Quality Gates (AI Agents)
- [ ] **Documentation Standards**: All docs follow project standards
- [ ] **Proper location**: No root-level documentation files
- [ ] **DRAFT prefixes**: Implementation docs use DRAFT until approved
- [ ] **Four-category structure**: Proper folder organization used
- [ ] **No premature completion**: No "COMPLETE" files without user validation

## Environment & Deployment
- [ ] **Environment variables** documented and not committed
- [ ] **Build succeeds**: `bun run build` completes without errors
- [ ] **Production considerations**: Rate limiting, CORS, security headers