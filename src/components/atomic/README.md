# Atomic Design System Components

## Overview

This folder contains all atomic design system components following Brad Frost's atomic design methodology. Components are organized into four categories: atoms, molecules, organisms, and compositions.

## Atomic Design Hierarchy

### Atoms (`./atoms/`)

Basic building blocks with single responsibility:

- **Purpose**: Fundamental UI elements that cannot be broken down further
- **Examples**: Button, Badge, Avatar, Icon, Input, Label
- **Characteristics**: No composition, highly reusable, design token integration

### Molecules (`./molecules/`)

Simple combinations of atoms with business purpose:

- **Purpose**: Coherent groups of atoms serving a specific function
- **Examples**: MetricsCard, UserProfile, SearchField, NavigationItem
- **Characteristics**: 2-5 atoms, single business function, props-based configuration

### Organisms (`./organisms/`)

Complex components with business logic:

- **Purpose**: Sophisticated compositions with domain knowledge
- **Examples**: DashboardHeader, ChartContainer, DataTable, NavigationSidebar
- **Characteristics**: Complex logic, API integration, advanced state management

### Compositions (`./compositions/`)

Page-level layouts recreating legacy components:

- **Purpose**: Exact visual recreation of existing mock components
- **Examples**: CommandCenterComposition, ArticleHeroComposition
- **Characteristics**: Layout-focused, visual testing preservation, minimal logic

## Usage Patterns

### Basic Component Import

```typescript
// Import atoms
import { Button, Badge, Avatar } from '@/components/atomic/atoms';

// Import molecules
import { MetricsCard, UserProfile } from '@/components/atomic/molecules';

// Import organisms
import { DashboardHeader, ChartContainer } from '@/components/atomic/organisms';

// Import compositions
import { CommandCenterComposition } from '@/components/atomic/compositions/dashboard';
```

### Grouped Imports

```typescript
// Import grouped components
import { FormElements, DisplayElements } from '@/components/atomic/atoms';
import { BusinessMolecules, NavigationMolecules } from '@/components/atomic/molecules';

// Use grouped components
const { Button, Input, Label } = FormElements;
const { Badge, Avatar, Icon } = DisplayElements;
```

### Composition Usage

```typescript
// Using compositions to replace legacy components
import { CommandCenterComposition } from '@/components/atomic/compositions/dashboard';

// Direct replacement for legacy mock
function DashboardPage() {
  return (
    <div className='dashboard'>
      <CommandCenterComposition data={dashboardData} onAction={handleAction} />
    </div>
  );
}
```

## Development Standards

### Design Token Integration

All atomic components must use design tokens exclusively:

```typescript
// ✅ Correct - uses design tokens
const Button = ({ variant = 'primary' }) => (
  <button
    className={cn(
      'px-spacing-md py-spacing-sm',
      'text-typography-body font-weight-medium',
      'bg-color-primary-500 text-color-white',
      'border-radius-md shadow-elevation-sm'
    )}
  >
    {children}
  </button>
);

// ❌ Incorrect - hardcoded values
const Button = ({ variant = 'primary' }) => (
  <button className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white'>{children}</button>
);
```

### Component Structure

Every atomic component follows this structure:

```
ComponentName/
├── ComponentName.tsx           # Main component implementation
├── ComponentName.types.ts      # TypeScript interfaces
├── ComponentName.stories.tsx   # Storybook stories
├── ComponentName.test.tsx      # Unit tests
├── index.ts                   # Public API
└── README.md                  # Documentation
```

### TypeScript Requirements

```typescript
// Component props interface
export interface ButtonProps {
  /**
   * Button variant controlling visual style
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';

  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Button content
   */
  children: ReactNode;
}
```

## Testing Requirements

### Unit Testing

```typescript
// Component unit tests
describe('Button', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant='primary'>Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-color-primary-500');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('meets accessibility standards', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Storybook Stories

```typescript
// Component stories
export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Basic button component with multiple variants and sizes.',
      },
    },
  },
} as Meta<ButtonProps>;

export const Primary: Story<ButtonProps> = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
    </div>
  ),
};
```

## Migration Integration

### Composition Mapping

Compositions maintain exact visual parity with legacy components:

```typescript
// Legacy component mapping
const CompositionMapping = {
  CommandCenterComposition: 'DC-070-CommandCenter',
  ArticleHeroComposition: 'AC-ArticleHero',
  HeaderHeroComposition: 'HP-010-Header-Hero',
};

// Visual regression testing ensures pixel-perfect recreation
```

### Feature Flag Integration

```typescript
// Gradual rollout using feature flags
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

const ComponentRenderer = ({ legacyName, atomicComponent: AtomicComponent, ...props }) => {
  const useAtomic = useFeatureFlag(`atomic-${legacyName.toLowerCase()}`);

  if (useAtomic && AtomicComponent) {
    return <AtomicComponent {...props} />;
  }

  // Fallback to legacy component
  const LegacyComponent = legacyComponents[legacyName];
  return <LegacyComponent {...props} />;
};
```

## Quality Assurance

### Pre-Commit Checklist

Before committing any atomic component:

- [ ] **Design Tokens**: No hardcoded design values
- [ ] **TypeScript**: Complete interfaces with TSDoc comments
- [ ] **Testing**: Unit tests with >90% coverage
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Storybook**: Stories for all variants and states
- [ ] **Documentation**: Complete README with examples
- [ ] **Performance**: Bundle size impact assessment

### Automated Validation

```bash
# Run validation scripts
npm run validate:design-tokens  # Check for hardcoded values
npm run validate:typescript     # Type checking
npm run validate:accessibility  # A11y compliance
npm run validate:performance    # Bundle size impact
```

## Related Documentation

- [Design System Overview](../../../docs/development/design-system/01-specifications/S001-DRAFT-design-system-overview.md)
- [Component Migration Analysis](../../../docs/development/design-system/02-implementation/I004-DRAFT-component-migration-analysis.md)
- [Testing Strategy](../../../docs/development/design-system/02-implementation/I003-DRAFT-testing-strategy.md)

---

_Atomic design system components provide the foundation for CreatorFlow's scalable, maintainable UI architecture._
