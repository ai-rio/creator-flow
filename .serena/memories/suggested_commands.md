# Suggested Commands for CreatorFlow Development

## Development Commands

### Starting the Development Server
```bash
bun run dev              # Start development server with Turbopack
```

### Code Quality and Type Checking
```bash
bun run type-check       # TypeScript checking
bun run lint             # ESLint checking
bun run lint:fix         # Fix linting issues
```

### Testing
```bash
bun test                 # Run all unit tests
bun run test:watch       # Run unit tests in watch mode
bun run test:coverage    # Run unit tests with coverage report
bun run test:e2e         # Run E2E tests
bun run test:e2e:ui      # Run E2E tests with UI
```

### Database Management
```bash
bun run generate-types   # Generate Supabase types
bun run supabase:link    # Link local project to Supabase project
bun run migration:new    # Create new database migration
bun run migration:up     # Run database migrations
bun run migration:squash # Squash database migrations
```

### Stripe Integration
```bash
bun run stripe:listen    # Listen to Stripe webhooks
```

### Email Development
```bash
bun run email:dev        # Start email development server
bun run email:build      # Build email templates
bun run email:export     # Export email templates
```

## Production Commands

### Building and Starting the Application
```bash
bun run build            # Build the Next.js application
bun run start            # Start the built Next.js application
```

## Package Management
```bash
bun install              # Install dependencies
bun add <package>        # Add a new dependency
bun remove <package>     # Remove a dependency
```

## Git Hooks
The project uses Husky for Git hooks, which will automatically run:
- Linting fixes on staged files before commit (via lint-staged)