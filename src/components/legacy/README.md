# Legacy Components

## Overview

This folder preserves existing mock components during the migration to atomic design system. Components in this folder will be gradually replaced by their atomic counterparts while maintaining full backward compatibility.

## Migration Strategy

### Preservation During Transition

Legacy components are preserved in their original form to ensure:

- **Zero Disruption**: Existing functionality remains unchanged
- **Visual Testing Continuity**: Original visual regression tests continue working
- **Gradual Migration**: Teams can migrate components at their own pace
- **Rollback Safety**: Ability to revert to legacy components if needed

### Folder Structure

```
legacy/
├── mocks/                    # Original mock components
│   ├── [existing mock files] # Preserved in original locations
│   └── index.ts              # Exports with migration status tracking
├── adapters/                 # Compatibility adapters for smooth transition
│   └── index.ts              # Feature flag based component selection
└── migration-status.ts       # Central migration progress tracking
```

## Migration Status Tracking

### Current Migration Status

Use the migration status system to track progress:

```typescript
import { getMigrationStatus, getMigrationProgress, MigrationRegistry } from './migration-status';

// Check individual component status
const status = getMigrationStatus('DC-070-CommandCenter');
// Returns: 'NOT_STARTED' | 'PLANNED' | 'IN_PROGRESS' | 'TESTING' | 'COMPLETED'

// Get overall progress
const progress = getMigrationProgress();
// Returns: { total: 10, completed: 2, percentComplete: 20, ... }

// View all components by status
const inProgress = getMigrationsByStatus('IN_PROGRESS');
const completed = getMigrationsByStatus('COMPLETED');
```

### Migration Registry

The central registry tracks all components being migrated:

```typescript
export const MigrationRegistry = {
  'DC-070-CommandCenter': {
    legacyName: 'DC-070-CommandCenter',
    atomicName: 'CommandCenterComposition',
    category: 'dashboard',
    status: 'PLANNED',
    notes: 'High-priority component with complex layout',
  },

  'HP-010-Header-Hero': {
    legacyName: 'HP-010-Header-Hero',
    atomicName: 'HeaderHeroComposition',
    category: 'homepage',
    status: 'NOT_STARTED',
  },

  // ... other components
};
```

## Using Legacy Components

### Direct Import

```typescript
// Continue importing legacy components as before
import DCCommandCenter from '@/components/mocks/DC-070-CommandCenter';

function DashboardPage() {
  return (
    <div className='dashboard'>
      <DCCommandCenter data={dashboardData} />
    </div>
  );
}
```

### Migration-Aware Import

```typescript
// Use adapters for gradual migration
import { CommandCenter } from '@/components/legacy/adapters';

function DashboardPage() {
  // Automatically uses atomic or legacy version based on feature flags
  return (
    <div className='dashboard'>
      <CommandCenter data={dashboardData} />
    </div>
  );
}
```

## Compatibility Adapters

### Feature Flag Based Selection

Adapters provide seamless transition between legacy and atomic components:

```typescript
// Adapter configuration example
const commandCenterAdapter = createMigrationAdapter({
  legacyComponent: DCCommandCenter,
  atomicComponent: CommandCenterComposition,
  featureFlag: 'atomic-dashboard-command-center',
  propsAdapter: (legacyProps) => ({
    // Transform legacy props to atomic props if needed
    data: legacyProps.data,
    onAction: legacyProps.onAction,
  }),
});
```

### Gradual Rollout

```typescript
// Enable atomic components for specific users/environments
const useAtomic = useFeatureFlag('atomic-dashboard') || process.env.NODE_ENV === 'development' || userIsInBetaGroup();

const Component = useAtomic ? AtomicComponent : LegacyComponent;
```

## Visual Testing Preservation

### Maintaining Test Coverage

Legacy components retain their visual regression tests:

```typescript
// Existing visual tests continue to work
describe('DC-070-CommandCenter Visual Tests', () => {
  it('matches screenshot', async () => {
    const component = render(<DCCommandCenter {...mockProps} />);
    await expect(component).toMatchImageSnapshot();
  });
});
```

### Dual Testing Approach

During migration, both legacy and atomic versions are tested:

```typescript
// Test both implementations
describe('Command Center Components', () => {
  describe('Legacy Implementation', () => {
    // Existing tests
  });

  describe('Atomic Implementation', () => {
    // New tests for atomic version
    it('atomic version matches legacy visually', async () => {
      const legacy = render(<DCCommandCenter {...props} />);
      const atomic = render(<CommandCenterComposition {...props} />);

      // Visual comparison between implementations
      expect(await atomic.screenshot()).toMatchImageSnapshot({
        customSnapshotIdentifier: 'command-center-atomic-vs-legacy',
      });
    });
  });
});
```

## Performance Monitoring

### Bundle Impact Tracking

Monitor the impact of maintaining dual implementations:

```typescript
// Bundle analysis for migration impact
const bundleAnalysis = {
  beforeMigration: {
    legacyComponents: '450KB',
    totalBundle: '2.1MB',
  },
  duringMigration: {
    legacyComponents: '450KB',
    atomicComponents: '200KB',
    totalBundle: '2.3MB', // Temporary increase
  },
  afterMigration: {
    atomicComponents: '200KB',
    totalBundle: '1.9MB', // Net improvement
  },
};
```

### Performance Budgets

Set performance budgets during migration:

```javascript
// webpack.config.js
module.exports = {
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 400000,
    hints: 'warning',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        legacy: {
          test: /[\\/]components[\\/]legacy[\\/]/,
          name: 'legacy-components',
          chunks: 'all',
        },
        atomic: {
          test: /[\\/]components[\\/]atomic[\\/]/,
          name: 'atomic-components',
          chunks: 'all',
        },
      },
    },
  },
};
```

## Migration Best Practices

### Phase-by-Phase Migration

1. **Preparation Phase**

   - Set up migration tracking
   - Create compatibility adapters
   - Establish feature flags

2. **Implementation Phase**

   - Migrate components by priority
   - Maintain visual testing parity
   - Monitor performance impact

3. **Validation Phase**

   - A/B test implementations
   - Validate user experience
   - Measure performance improvements

4. **Cleanup Phase**
   - Remove legacy components
   - Clean up adapters
   - Update documentation

### Team Coordination

```typescript
// Migration coordination interface
interface MigrationTask {
  componentName: string;
  assignee: string;
  estimatedEffort: string;
  dependencies: string[];
  blockingIssues?: string[];
  reviewers: string[];
  testingRequirements: string[];
}

// Track migration tasks
const migrationTasks: MigrationTask[] = [
  {
    componentName: 'DC-070-CommandCenter',
    assignee: 'frontend-team-lead',
    estimatedEffort: '2 weeks',
    dependencies: ['Button', 'MetricsCard', 'ChartContainer'],
    reviewers: ['design-team', 'qa-team'],
    testingRequirements: ['visual-regression', 'accessibility', 'performance'],
  },
];
```

## Troubleshooting

### Common Migration Issues

1. **Props Interface Changes**

   ```typescript
   // Use props adapters to handle interface differences
   const propsAdapter = (legacyProps: LegacyProps): AtomicProps => ({
     variant: legacyProps.type === 'primary' ? 'primary' : 'secondary',
     size: legacyProps.large ? 'large' : 'medium',
     children: legacyProps.text,
   });
   ```

2. **Style Differences**

   ```typescript
   // Use CSS custom properties for gradual style migration
   .legacy-component {
     --primary-color: var(--color-primary-500);
     --spacing-unit: var(--spacing-md);
   }
   ```

3. **Event Handler Changes**
   ```typescript
   // Adapter for event handling differences
   const handleLegacyClick = (legacyEvent: LegacyEvent) => {
     const atomicEvent = transformEvent(legacyEvent);
     onAtomicClick(atomicEvent);
   };
   ```

## Related Documentation

- [Migration Guide](../../../docs/development/design-system/02-implementation/I002-DRAFT-migration-guide.md)
- [Component Migration Analysis](../../../docs/development/design-system/02-implementation/I004-DRAFT-component-migration-analysis.md)
- [Testing Strategy](../../../docs/development/design-system/02-implementation/I003-DRAFT-testing-strategy.md)

---

_Legacy components provide a safety net during the migration to atomic design system, ensuring zero-disruption transition while maintaining full functionality._
