# I002-DRAFT: CreatorFlow Design System Migration Guide

**Document Type**: Implementation  
**Initiative**: Design System  
**Status**: DRAFT  
**Created**: 2025-09-10  
**Last Updated**: 2025-09-10

## Executive Summary

This comprehensive migration guide provides step-by-step instructions for transitioning from hard-coded design values to the CreatorFlow Design System. The guide ensures **zero visual regression** while systematically improving maintainability, consistency, and developer experience.

**Migration Approach:**

- **Safe and Incremental**: Phase-based approach with rollback capabilities
- **Zero Downtime**: No interruption to creator workflows during migration
- **Automated Detection**: Tools to identify and replace hard-coded values
- **Quality Assurance**: Comprehensive testing at each phase

---

## MoSCoW Migration Prioritization

### Must Have (Critical - Week 1-3)

- **Foundation Setup** - Tailwind configuration replacement and design system dependencies
- **Core Component Migration** - Cards, buttons, typography (highest usage frequency)
- **Visual Regression Prevention** - Side-by-side comparison tools and rollback capabilities
- **Hard-coded Value Detection** - Automated scanning for hex colors, RGB values, and magic numbers
- **Production Safety** - Git checkpoints and backup procedures for safe migration

### Should Have (Important - Week 3-5)

- **Advanced Component Migration** - Navigation, forms, status indicators, modals
- **Cross-Reference Updates** - Documentation links and component import paths
- **Performance Validation** - Bundle size impact analysis and render performance testing
- **Developer Guidelines** - Clear migration patterns and troubleshooting documentation
- **Browser Compatibility Testing** - Cross-browser validation of migrated components

### Could Have (Nice-to-have - Week 5-7)

- **Automated Code Analysis** - ESLint rules to prevent future hard-coded values
- **Enhanced Developer Tools** - VS Code snippets and IntelliSense for design tokens
- **Advanced Testing** - Visual regression automation and accessibility compliance validation
- **Performance Optimization** - CSS custom properties optimization and animation tuning
- **Documentation Enhancement** - Interactive examples and live component previews

### Won't Have (Excluded from migration scope)

- **Complete Component Rewrites** - Maintaining existing component logic and functionality
- **Design System Library Creation** - Working within existing shadcn/ui framework
- **Legacy Code Removal** - Keeping existing components as fallbacks during transition
- **Third-party Dependency Updates** - Focusing on design token implementation only
- **Breaking API Changes** - Maintaining all existing component interfaces and props

---

## 🚀 Pre-Migration Setup

### Step 1: Install Design System Dependencies

```bash
# Update Tailwind CSS configuration
cp tailwind.config.ts tailwind.config.backup.ts

# Install additional dependencies if needed
bun install clsx tailwind-merge class-variance-authority

# Install development tools
bun install --dev @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
```

### Step 2: Backup Current Styles

```bash
# Create backup of critical style files
mkdir -p backups/pre-migration
cp src/app/globals.css backups/pre-migration/
cp tailwind.config.ts backups/pre-migration/
cp -r src/components backups/pre-migration/components

# Create git checkpoint
git add .
git commit -m "Pre-migration backup: Save current design implementation"
git tag pre-design-system-migration
```

### Step 3: Implement Design System Foundation

```bash
# Replace Tailwind configuration
cp docs/development/design-system/tailwind.config.ts ./tailwind.config.ts

# Update global styles
cp docs/development/design-system/globals.css ./src/app/globals.css

# Install design system utilities
cp docs/development/design-system/utils.ts ./src/lib/utils.ts
```

**Verification Checklist:**

- [ ] `bun run build` completes without errors
- [ ] All Tailwind classes compile correctly
- [ ] CSS custom properties are available in browser dev tools
- [ ] No console errors in development mode

---

## 📊 Migration Phase 1: Foundation Components

### Identify Hard-Coded Values

```bash
# Scan for hex colors
grep -r "#[0-9a-fA-F]\{6\}" src/components/ --include="*.tsx" --include="*.ts" > migration-audit-hex.txt

# Scan for RGB/RGBA values
grep -r "rgba\?\([0-9, ]\+\)" src/components/ --include="*.tsx" --include="*.ts" > migration-audit-rgb.txt

# Scan for hard-coded spacing
grep -r "p-[0-9]\+\|m-[0-9]\+\|w-[0-9]\+\|h-[0-9]\+" src/components/ --include="*.tsx" --include="*.ts" > migration-audit-spacing.txt

# Scan for magic numbers in styles
grep -r "padding:\|margin:\|width:\|height:" src/ --include="*.css" --include="*.scss" > migration-audit-css.txt
```

### Replace Card Components

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded card styling
const OrderCard = ({ order }) => {
  return (
    <div
      className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <h3 style={{ color: '#0d9488', fontSize: '18px', fontWeight: '600' }}>Order #{order.id}</h3>
      <p style={{ color: '#6b7280', fontSize: '14px' }}>{order.customerName}</p>
    </div>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const OrderCard = ({ order }) => {
  return (
    <Card variant='primary' interactive>
      <h3 className='text-creator-h3 text-brand-teal-primary'>Order #{order.id}</h3>
      <p className='text-creator-caption text-gray-500'>{order.customerName}</p>
    </Card>
  );
};
```

### Replace Button Components

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded button styling
const ActionButton = ({ children, onClick, variant = 'primary' }) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: '#3b82f6',
          border: '1px solid #3b82f6',
          padding: '12px 24px',
          borderRadius: '8px',
        };
    }
  };

  return (
    <button style={getButtonStyles()} onClick={onClick} className='transition-all duration-200 hover:opacity-80'>
      {children}
    </button>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const ActionButton = ({ children, onClick, variant = 'primary' }) => {
  return (
    <Button variant={variant === 'secondary' ? 'outline' : 'primary'} size='responsive' onClick={onClick}>
      {children}
    </Button>
  );
};
```

### Replace Typography Components

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded typography
const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className='mb-8'>
      <h1
        className='mb-2 font-bold'
        style={{
          fontSize: '32px',
          color: '#0d9488',
          fontWeight: '800',
          lineHeight: '1.2',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: '1.5',
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className='mb-8'>
      <Heading level='h1' variant='ceo' className='mb-2'>
        {title}
      </Heading>
      <p className='text-creator-body'>{subtitle}</p>
    </div>
  );
};
```

### Phase 1 Validation

```bash
# Run comprehensive tests
bun run type-check
bun run lint
bun run test
bun run test:visual-regression

# Performance comparison
bun run build --analyze
# Compare bundle sizes with pre-migration backup

# Manual testing checklist
- [ ] All cards render with glass morphism effects
- [ ] Buttons show proper hover states and animations
- [ ] Typography hierarchy maintains visual consistency
- [ ] No console errors or warnings
- [ ] Mobile responsive behavior preserved
```

---

## 📊 Migration Phase 2: Dashboard Components

### Replace Metric Cards

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded metric card
const MetricCard = ({ title, value, change }) => {
  return (
    <div
      className='rounded-lg bg-white p-6 shadow-sm'
      style={{
        background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
        border: '1px solid #e5e7eb',
      }}
    >
      <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>{title}</p>
      <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: '8px 0' }}>{value}</p>
      {change && (
        <span
          style={{
            fontSize: '12px',
            color: change > 0 ? '#059669' : '#dc2626',
            backgroundColor: change > 0 ? '#d1fae5' : '#fee2e2',
            padding: '4px 8px',
            borderRadius: '9999px',
          }}
        >
          {change > 0 ? '↗' : '↘'} {Math.abs(change)}%
        </span>
      )}
    </div>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const MetricCard = ({ title, value, change }) => {
  return (
    <DashboardMetricCard
      title={title}
      value={value}
      change={
        change
          ? {
              value: change,
              period: 'vs last period',
              trend: change > 0 ? 'up' : 'down',
            }
          : undefined
      }
    />
  );
};
```

### Replace Chart Containers

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded chart container
const ChartWidget = ({ title, children }) => {
  return (
    <div
      className='rounded-lg bg-white p-6'
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
      }}
    >
      <h3
        style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '24px',
          color: '#111827',
        }}
      >
        {title}
      </h3>
      <div style={{ height: '300px' }}>{children}</div>
    </div>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const ChartWidget = ({ title, children }) => {
  return <ChartContainer title={title}>{children}</ChartContainer>;
};
```

### Update Status Indicators

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded status badges
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          backgroundColor: '#d1fae5',
          color: '#065f46',
          border: '1px solid #a7f3d0',
        };
      case 'processing':
        return {
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          border: '1px solid #93c5fd',
        };
      case 'failed':
        return {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5',
        };
    }
  };

  return (
    <span
      style={{
        ...getStatusStyles(),
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '500',
      }}
    >
      {status}
    </span>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const StatusBadge = ({ status }) => {
  const statusMap = {
    completed: 'completed' as const,
    processing: 'processing' as const,
    failed: 'failed' as const,
  };

  return <StatusIndicator status={statusMap[status]} animated={status === 'processing'} />;
};
```

### Phase 2 Validation

```bash
# Dashboard-specific testing
bun run test src/components/dashboard/
bun run test:visual-regression --scope=dashboard

# Metric validation
- [ ] All metric cards use consistent spacing and typography
- [ ] Charts have proper glass morphism containers
- [ ] Status indicators show correct colors and animations
- [ ] Dashboard grid system works across all breakpoints
```

---

## 📊 Migration Phase 3: Content Components

### Replace Blog Components

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded blog hero
const BlogHero = ({ title, category, author }) => {
  return (
    <div
      className='relative flex h-screen items-center justify-center'
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className='max-w-4xl px-6 text-center'>
        {category && (
          <span
            style={{
              backgroundColor: 'rgba(45, 212, 191, 0.1)',
              color: '#2dd4bf',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {category}
          </span>
        )}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            color: '#f1f5f9',
            marginTop: '24px',
            textShadow: '0 0 15px rgba(45, 212, 191, 0.3)',
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const BlogHero = ({ title, category, author }) => {
  return <ContentHero title={title} category={category} author={author} variant='magazine' />;
};
```

### Replace Testimonial Components

#### Before (Hard-coded):

```tsx
// ❌ Hard-coded testimonial
const TestimonialCard = ({ quote, author }) => {
  return (
    <div
      style={{
        background: 'rgba(17, 24, 39, 0.5)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(45, 212, 191, 0.8)',
        borderRadius: '16px',
        padding: '32px',
        position: 'relative',
      }}
    >
      <blockquote
        style={{
          fontFamily: 'Lora, Georgia, serif',
          fontSize: '32px',
          fontStyle: 'italic',
          lineHeight: '1.8',
          color: '#cbd5e1',
          marginBottom: '24px',
        }}
      >
        "{quote}"
      </blockquote>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={author.avatar}
          alt={author.name}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        />
        <div>
          <p style={{ fontWeight: '600', color: '#f1f5f9' }}>{author.name}</p>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{author.role}</p>
        </div>
      </div>
    </div>
  );
};
```

#### After (Design System):

```tsx
// ✅ Design system implementation
const TestimonialCard = ({ quote, author }) => {
  return <Testimonial quote={quote} author={author} variant='featured' />;
};
```

### Phase 3 Validation

```bash
# Content component testing
bun run test src/components/content/
bun run test:accessibility

# Content validation checklist
- [ ] Blog heroes use proper content typography
- [ ] Testimonials have glass morphism effects
- [ ] Table of contents shows targeting reticle animation
- [ ] Key takeaways use consistent iconography
- [ ] All content components are screen reader accessible
```

---

## 🔧 Automated Migration Tools

### ESLint Rules for Design Token Enforcement

Create `.eslintrc.design-tokens.js`:

```javascript
module.exports = {
  rules: {
    'no-hardcoded-colors': {
      create: function (context) {
        return {
          Literal(node) {
            // Detect hex colors
            if (typeof node.value === 'string' && /^#[0-9a-fA-F]{6}$/.test(node.value)) {
              context.report({
                node,
                message:
                  'Use design tokens instead of hard-coded hex colors. Replace with brand color classes or CSS variables.',
                fix: function (fixer) {
                  const colorMap = {
                    '#0d9488': 'var(--brand-teal-primary)',
                    '#8b5cf6': 'var(--brand-purple-primary)',
                    '#3b82f6': 'var(--brand-blue-primary)',
                  };
                  if (colorMap[node.value]) {
                    return fixer.replaceText(node, `"${colorMap[node.value]}"`);
                  }
                },
              });
            }
          },

          Property(node) {
            // Detect CSS properties with hard-coded values
            if (node.method === 'object' && node.key) {
              const hardcodedPatterns = [
                { pattern: /padding|margin/, replacement: 'Use spacing design tokens (--space-*)' },
                { pattern: /fontSize/, replacement: 'Use typography scale classes (text-creator-*)' },
                { pattern: /backgroundColor|color/, replacement: 'Use brand color tokens (--brand-*)' },
              ];

              hardcodedPatterns.forEach(({ pattern, replacement }) => {
                if (pattern.test(node.key.name || node.key.value)) {
                  context.report({
                    node,
                    message: replacement,
                  });
                }
              });
            }
          },
        };
      },
    },
  },
};
```

### Migration Script

Create `scripts/migrate-design-tokens.js`:

```javascript
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color mapping from hard-coded to design tokens
const colorMigrationMap = {
  '#0d9488': 'brand-teal-primary',
  '#2dd4bf': 'brand-teal-light',
  '#8b5cf6': 'brand-purple-primary',
  '#3b82f6': 'brand-blue-primary',
  '#22c55e': 'success-green-500',
  '#f59e0b': 'warning-amber-500',
  '#ef4444': 'error-red-500',
  'rgba(17, 24, 39, 0.5)': 'bg-glass-card-dark',
  'rgba(255, 255, 255, 0.95)': 'bg-glass-card-light',
};

// Spacing migration map
const spacingMigrationMap = {
  '24px': 'space-6',
  '32px': 'space-8',
  '48px': 'space-12',
  '64px': 'space-16',
};

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  // Replace hex colors
  Object.entries(colorMigrationMap).forEach(([hardcoded, token]) => {
    const hexPattern = new RegExp(`['"\`]${hardcoded.replace('#', '#')}['"\`]`, 'g');
    if (hexPattern.test(content)) {
      content = content.replace(hexPattern, `'var(--${token})'`);
      hasChanges = true;
      console.log(`✓ Replaced ${hardcoded} with var(--${token}) in ${filePath}`);
    }
  });

  // Replace common style patterns
  const stylePatterns = [
    {
      pattern: /className="bg-white rounded-lg shadow-sm border"/g,
      replacement: 'className="card-primary"',
      description: 'card styling',
    },
    {
      pattern: /className=".*font-bold.*text-\w+-\d+.*"/g,
      replacement: 'className="text-creator-h1"',
      description: 'heading typography',
    },
    {
      pattern: /style=\{\{[^}]*backgroundColor:\s*['"]#3b82f6['"][^}]*\}\}/g,
      replacement: 'className="btn-primary"',
      description: 'button styling',
    },
  ];

  stylePatterns.forEach(({ pattern, replacement, description }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      hasChanges = true;
      console.log(`✓ Migrated ${description} in ${filePath}`);
    }
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, content);
  }

  return hasChanges;
}

function runMigration() {
  console.log('🚀 Starting design system migration...\n');

  const files = glob.sync('src/**/*.{ts,tsx}', {
    ignore: ['**/*.test.*', '**/*.spec.*', '**/node_modules/**'],
  });

  let migratedFiles = 0;

  files.forEach((filePath) => {
    if (migrateFile(filePath)) {
      migratedFiles++;
    }
  });

  console.log(`\n✅ Migration complete! Updated ${migratedFiles} files.`);
  console.log('\nNext steps:');
  console.log('1. Run `bun run type-check` to verify no TypeScript errors');
  console.log('2. Run `bun run test` to ensure all tests pass');
  console.log('3. Run `bun run test:visual-regression` for UI validation');
  console.log('4. Manual review of complex styling patterns');
}

runMigration();
```

Run the migration:

```bash
# Execute automated migration
node scripts/migrate-design-tokens.js

# Validate results
bun run type-check
bun run lint --fix
bun run test
```

---

## 🧪 Quality Assurance and Validation

### Visual Regression Testing

```bash
# Set up visual regression tests
npm install --save-dev @storybook/test-runner playwright

# Create visual test configuration
echo "module.exports = {
  testDir: './tests/visual',
  testMatch: '**/*.visual.spec.ts',
  use: {
    baseURL: 'http://localhost:6006',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'Desktop', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'Tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'Mobile', use: { viewport: { width: 375, height: 667 } } }
  ]
};" > playwright.config.js

# Run comprehensive visual tests
bun run test:visual-regression
```

### Automated Accessibility Testing

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/playwright

# Run accessibility audit
bun run test:a11y

# Manual accessibility checklist
- [ ] All interactive elements have proper focus indicators
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Screen reader navigation is logical
- [ ] Keyboard navigation works for all components
- [ ] Alternative text provided for visual elements
```

### Performance Validation

```bash
# Bundle size analysis
bun run build --analyze

# Performance comparison
echo "Pre-migration bundle size:"
cat backups/pre-migration/bundle-stats.json | jq '.assets | map(.size) | add'

echo "Post-migration bundle size:"
cat dist/bundle-stats.json | jq '.assets | map(.size) | add'

# Core Web Vitals testing
bun run lighthouse --url=http://localhost:3000/dashboard
```

---

## 🚨 Rollback Procedures

### Quick Rollback

```bash
# If migration fails, rollback immediately
git reset --hard pre-design-system-migration
git clean -fd

# Restore original files
cp backups/pre-migration/tailwind.config.ts ./
cp backups/pre-migration/globals.css ./src/app/
cp -r backups/pre-migration/components/* ./src/components/

# Verify rollback
bun run build
bun run test
```

### Selective Component Rollback

```bash
# Rollback specific components if needed
cp backups/pre-migration/components/ui/Button.tsx ./src/components/ui/
cp backups/pre-migration/components/dashboard/MetricCard.tsx ./src/components/dashboard/

# Re-run validation
bun run type-check
bun run test src/components/ui/Button.test.tsx
```

---

## 📋 Post-Migration Checklist

### Technical Validation

- [ ] `bun run type-check` passes without errors
- [ ] `bun run lint` shows no design token violations
- [ ] `bun run test` - All unit tests pass
- [ ] `bun run test:visual-regression` - No visual regressions
- [ ] `bun run test:a11y` - Accessibility compliance maintained
- [ ] Bundle size increase <5% from baseline
- [ ] Core Web Vitals maintain or improve scores

### Functional Validation

- [ ] Dashboard loads and displays all metrics correctly
- [ ] All interactive elements (buttons, links, forms) work
- [ ] Navigation functions properly across all devices
- [ ] Charts and visualizations render correctly
- [ ] Mobile responsiveness maintained
- [ ] Dark/light theme switching works (if applicable)

### Visual Validation

- [ ] Brand consistency maintained across all components
- [ ] Typography hierarchy looks correct
- [ ] Spacing and layout preserve visual structure
- [ ] Glass morphism effects render properly
- [ ] Animations and transitions work smoothly
- [ ] Status indicators show correct colors and states

### Creator Workflow Validation

- [ ] Order management workflow functions correctly
- [ ] Dashboard provides clear overview of metrics
- [ ] Mobile experience optimized for creators
- [ ] Performance suitable for high-volume operations
- [ ] No disruption to critical creator tasks

---

## 📞 Support and Troubleshooting

### Common Migration Issues

#### Issue: TypeScript Errors After Migration

```bash
# Solution: Update type definitions
bun run generate-types
bun run type-check --verbose
```

#### Issue: Missing Design Tokens

```bash
# Verify token availability
grep -r "var(--missing-token)" src/
# Add missing tokens to design-tokens.md
# Update Tailwind configuration
```

#### Issue: Visual Inconsistencies

```bash
# Compare with design system examples
bun run storybook
# Review component usage in component-patterns.md
# Check for conflicting CSS rules
```

#### Issue: Performance Regression

```bash
# Analyze bundle impact
bun run build --analyze
# Optimize CSS delivery
# Consider code splitting for large components
```

### Getting Help

**Immediate Support:**

- Slack: `#design-system` channel
- Email: design-system-support@creatorflow.com
- GitHub: Open issue with `migration-help` label

**Documentation:**

- [Design System README](./README.md) - Complete overview and navigation
- [Component Patterns](./component-patterns.md) - Implementation examples
- [Design Tokens](./design-tokens.md) - Complete token reference

**Emergency Rollback:**
If critical issues occur, execute the rollback procedure immediately and contact the design system team for emergency support.

---

## Related Documents

### **Core Specifications**

- [S001-DRAFT: Design System Overview](../01-specifications/S001-DRAFT-design-system-overview.md) - Design system overview and quick start guide
- [S002-DRAFT: Design Tokens](../01-specifications/S002-DRAFT-design-tokens.md) - Complete design token specification and CSS implementation
- [S003-DRAFT: Responsive Design System](../01-specifications/S003-DRAFT-responsive-design-system.md) - Mobile-first responsive design patterns
- [S004-DRAFT: Component Patterns](../01-specifications/S004-DRAFT-component-patterns.md) - Comprehensive component implementation examples

### **Implementation Guides**

- [I001-DRAFT: Implementation Roadmap](./I001-DRAFT-implementation-roadmap.md) - Overall implementation strategy and timeline
- [I003-DRAFT: Testing Strategy](./I003-DRAFT-testing-strategy.md) - Quality assurance approach and testing methods

### **Reference Documentation**

- [R001-DRAFT: Usage Guidelines](../03-reference/R001-DRAFT-usage-guidelines.md) - Design system governance and best practices
- [R002-DRAFT: Changelog](../03-reference/R002-DRAFT-changelog.md) - Design system evolution tracking

### **Project Context**

- [CLAUDE.md](../../../CLAUDE.md) - CreatorFlow project context and development philosophy
