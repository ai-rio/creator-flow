# CreatorFlow Component Library

## Overview

This is the main component library for CreatorFlow, implementing a comprehensive atomic design system while maintaining compatibility with legacy components during the migration process.

## Architecture

The component library is organized using atomic design principles combined with practical domain-based organization:

```
src/components/
├── atomic/              # Atomic Design System Components
├── legacy/              # Legacy Mock Components (during migration)
├── shared/              # Shared Utilities and Helpers
├── ui/                  # shadcn/ui Base Components (Enhanced)
├── charts/              # Specialized Chart Components
└── development/         # Development Tools and Testing
```

## Atomic Design System

Our atomic design system follows Brad Frost's methodology:

- **Atoms**: Basic building blocks (buttons, inputs, labels)
- **Molecules**: Simple combinations of atoms (search fields, user profiles)
- **Organisms**: Complex components with business logic (data tables, navigation)
- **Compositions**: Page-level layouts recreating legacy mock components

## Usage Examples

### Importing Atomic Components

```typescript
// Import from category level
import { Button, Badge, Avatar } from '@/components/atomic/atoms';

// Import specific components
import { Button } from '@/components/atomic/atoms/Button';

// Import compositions
import { CommandCenterComposition } from '@/components/atomic/compositions/dashboard';
```

### Using During Migration

```typescript
// Feature-flag based component selection
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { CommandCenterComposition, 'DC-070-CommandCenter' as LegacyCommandCenter } from '@/components';

const CommandCenter = useFeatureFlag('atomic-dashboard')
  ? CommandCenterComposition
  : LegacyCommandCenter;
```

## Migration Status

The migration from legacy mock components to atomic design system is in progress. Use the migration status tracking to understand current progress:

```typescript
import { getMigrationStatus, getMigrationProgress } from '@/components/legacy/migration-status';

const status = getMigrationStatus('DC-070-CommandCenter'); // 'PLANNED'
const progress = getMigrationProgress(); // { total: 10, completed: 2, percentComplete: 20 }
```

## Development Guidelines

### Component Creation

1. **Follow Atomic Principles**: Ensure components fit into the correct atomic category
2. **Use Design Tokens**: All styling must use design tokens from `tailwind.config.ts`
3. **TypeScript First**: All components must have proper TypeScript interfaces
4. **Accessibility**: Follow WCAG 2.1 AA compliance
5. **Testing**: Include unit tests, Storybook stories, and accessibility tests

### File Structure

Each component follows a standard structure:

```
ComponentName/
├── ComponentName.tsx      # Main implementation
├── ComponentName.types.ts # TypeScript interfaces
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx # Unit tests
├── index.ts              # Public API exports
└── README.md             # Component documentation
```

## Quality Gates

Before marking any component as complete:

- [ ] Design token compliance (no hardcoded values)
- [ ] TypeScript interfaces with TSDoc comments
- [ ] Unit tests with >90% coverage
- [ ] Storybook stories for all variants
- [ ] Accessibility compliance validation
- [ ] Visual regression testing (for compositions)
- [ ] Performance impact assessment

## Related Documentation

- [Design System Overview](../docs/development/design-system/01-specifications/S001-DRAFT-design-system-overview.md)
- [Component Folder Architecture](../docs/development/design-system/02-implementation/I005-DRAFT-component-folder-architecture.md)
- [Migration Guide](../docs/development/design-system/02-implementation/I002-DRAFT-migration-guide.md)

## Development Tools

- **UnifiedComponentBrowser**: Browse and test all components
- **Storybook**: Component development and documentation
- **Visual Regression Testing**: Automated visual testing
- **Migration Status Dashboard**: Track migration progress

---

_This component library is part of CreatorFlow's design system migration initiative, transitioning from legacy mock components to a scalable atomic design system._
