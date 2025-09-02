# CreatorFlow Essential Commands

## Development Workflow
```bash
# Start development server (hot reload on :3000)
bun run dev

# Type checking (ALWAYS run after code changes)
bun run type-check

# Linting and auto-fix
bun run lint
bun run lint:fix

# Build for production
bun run build
```

## Testing Commands
```bash
# Run all unit tests
bun test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage report
bun run test:coverage

# End-to-end testing
bun run test:e2e
bun run test:e2e:ui          # Playwright UI mode
```

## Database Operations (Supabase)
```bash
# Generate TypeScript types from database schema
bun run generate-types

# Create new migration
bun run migration:new <name>

# Run migrations
bun run migration:up

# Link to Supabase project
bun run supabase:link
```

## External Service Commands
```bash
# Listen to Stripe webhooks locally
bun run stripe:listen

# Email development server
bun run email:dev

# Build email templates
bun run email:build
```

## System Commands (Linux)
```bash
# File operations
ls -la                       # List files with details
find . -name "*.tsx"         # Find TypeScript React files
grep -r "searchterm" src/    # Search in source code

# Git operations
git status                   # Check repository status
git add .                    # Stage all changes
git commit -m "message"      # Commit changes
git push origin main         # Push to main branch
```