# TypeScript Standards

## Mandatory TypeScript Rules

- Use **ES modules** (import/export), not CommonJS (require)
- Destructure imports: `import { foo } from 'bar'`
- Prefer type assertions `(result as any)` for complex union types
- Use null assertions `session!.user.id` after proper null checks
- Add explicit type annotations for callback parameters: `orders.map((order: Order) => ...)`
- **ALWAYS run `bun run type-check` after code changes**
- Ensure zero TypeScript errors before proceeding with any commit
- Use discriminated unions for component variants
- Include optional relationship properties in database types

## Type Check Methodology (MANDATORY)

**MUST follow docs/development/type-check/README.md methodology:**

### Error Priority System
1. **Critical (Fix First)**: Build-blocking errors, type generation failures
2. **High Impact (Fix Second)**: Errors affecting multiple files, database types
3. **Medium Impact (Fix Third)**: Component-specific errors, null safety issues

### Fixing Strategies
- **Type Assertions**: `(result as any)` for complex union types
- **Null Safety**: `session!.user.id` after proper null checks
- **Parameter Types**: `prices.map((price: any) => ({ ... }))`
- **Relationship Types**: Add optional relationship properties in database types

### Required Commands
- `bun run type-check` - Check all TypeScript errors
- `bunx tsc --noEmit src/path/to/file.ts` - Check specific file
- Fix errors in batches of 5-10, test frequently

## Type Safety Requirements

- All API responses must have proper TypeScript interfaces
- Database queries must use typed Supabase client methods
- Component props must have explicit TypeScript interfaces
- Utility functions must have proper input/output typing
