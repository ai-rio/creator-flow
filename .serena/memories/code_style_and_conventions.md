# Code Style and Conventions for CreatorFlow

## Language and Framework Standards
- **Language**: TypeScript 5.7+ with strict mode enabled
- **Framework**: Next.js 15 with App Router
- **React Version**: React 19

## Code Style Guidelines

### General Principles
1. Follow the established patterns in the codebase
2. Prefer functional components over class components
3. Use TypeScript for all new code
4. Favor composition over inheritance
5. Keep components small and focused on a single responsibility

### Naming Conventions
1. **Files and Directories**: Use kebab-case for file and directory names
2. **Components**: Use PascalCase for component names
3. **Variables and Functions**: Use camelCase for variables and functions
4. **Constants**: Use UPPER_SNAKE_CASE for constants
5. **Types and Interfaces**: Use PascalCase, prefix with 'I' for interfaces when beneficial for clarity

### TypeScript Conventions
1. Enable strict TypeScript settings (strict: true in tsconfig.json)
2. Avoid using 'any' type; use specific types or 'unknown' when type is unclear
3. Use interfaces for object shapes and types for unions/primitives
4. Leverage TypeScript's advanced types (generics, conditional types) when appropriate
5. Use type guards for narrowing types

### React Conventions
1. Use functional components with hooks
2. Prefer custom hooks for reusable logic
3. Use React.memo() for performance optimization when needed
4. Use forwardRef and useRef appropriately
5. Handle component state with useState or useReducer as appropriate

## UI and Styling

### Component Library
- **Shadcn/ui**: Primary component library built on Radix UI
- **Tailwind CSS**: For styling with utility classes
- **Lucide React**: For icons

### Tailwind CSS Guidelines
1. Use Tailwind utility classes for styling
2. Leverage the custom color system defined in tailwind.config.ts
3. Use the defined spacing scale (xs, sm, tactical, strategic, command, executive, presidential, imperial)
4. Utilize the custom animation system for interactive elements
5. Follow the defined typography system (display, heading, body, metric sizes)

### Responsive Design
1. Use mobile-first approach with responsive breakpoints
2. Leverage Tailwind's responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
3. Follow the defined container widths and breakpoints

## Code Organization

### Project Structure
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

### Import Conventions
1. Use absolute imports with '@/' alias for src directory
2. Organize imports in the following order:
   - External libraries
   - Internal libraries (components, hooks, utilities)
   - Relative imports
3. Separate import groups with a blank line

## Testing Standards

### Unit Testing
- Use Jest for unit testing
- Place test files adjacent to the code they're testing with .test.ts/.test.tsx extension
- Use React Testing Library for component testing
- Aim for high test coverage but prioritize testing critical business logic

### E2E Testing
- Use Playwright for E2E testing
- Place E2E tests in tests/e2e directory
- Test critical user flows and integration points

## Documentation Standards
- Follow the documentation standards outlined in docs/development/documentation-standards/DOCUMENTATION_STANDARDS.md
- Document complex logic and business rules
- Keep README.md and other documentation files up to date