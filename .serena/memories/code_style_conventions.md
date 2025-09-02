# CreatorFlow Code Style & Conventions

## TypeScript Best Practices
- Use **ES modules** (import/export), not CommonJS (require)
- Destructure imports: `import { foo } from 'bar'`
- Prefer type assertions `(result as any)` for complex union types
- Use null assertions `session!.user.id` after proper null checks
- Add explicit type annotations for callback parameters: `orders.map((order: Order) => ...)`
- Strict mode enabled with comprehensive type checking

## ESLint Rules
- **Import sorting**: Simple-import-sort plugin enforces consistent import order
- **TypeScript**: Prefer const, no unused vars (warnings), explicit any warnings
- **Console usage**: Only warn/error allowed in production code, full access in tests
- **Stricter rules** for `src/features/creatorflow/` directory

## Prettier Configuration
- **Print width**: 120 characters
- **Quotes**: Single quotes for JS, JSX single quotes
- **Semicolons**: Always required
- **Tab width**: 2 spaces
- **Arrow parens**: Always use parentheses
- **Tailwind plugin**: Auto-sorts Tailwind classes

## File Naming Conventions
- **Components**: PascalCase (`OrderList.tsx`)
- **Utilities**: camelCase (`formatOrderStatus.ts`)
- **API Routes**: lowercase with hyphens (`api/tiktok-orders/route.ts`)
- **Types**: PascalCase with descriptive names (`TikTokOrder.ts`)

## Component Patterns
- Use **Shadcn/ui components** as foundation
- Implement **discriminated unions** for component variants
- Follow **composition patterns** with compound components
- Use **CVA (Class Variance Authority)** for variant management
- **Mandatory accessibility** for all interactive elements

## Database Patterns
- Always use **RLS (Row Level Security)** for data access
- Include optional **relationship properties** in types for joins
- Use **ActionResponse<T>** for consistent server action returns
- Implement proper **null checking** before object access

## Design System
- **Tailwind CSS** with consistent design tokens
- **Mobile-first** responsive design approach
- **CreatorFlow design system** patterns consistently applied
- HSL color values with CSS custom properties