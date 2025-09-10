# Mock to Atomic Component Migration Workflow

## Overview

This workflow documents the process of migrating mock components to production-ready atomic design system components using shadcn/ui and comprehensive design tokens.

## Prerequisites

- Understanding of atomic design principles
- Familiarity with shadcn/ui components
- Knowledge of CreatorFlow design token system
- Access to component browser for testing

## Migration Process

### Phase 1: Analysis & Planning

#### 1.1 Identify Target Component

```bash
# Locate mock component
src/components/mocks/[COMPONENT-NAME].tsx

# Analyze component structure and functionality
- Layout patterns
- Interactive elements
- Animation requirements
- Theme support needs
```

#### 1.2 Determine Atomic Classification

- **Atoms**: Basic UI elements (Button, Input, Icon)
- **Molecules**: Simple combinations (SearchField, MetricsCard)
- **Organisms**: Complex components with business logic (Sidebar, Command Center)
- **Compositions**: Page-level layouts

### Phase 2: Component Creation

#### 2.1 Create Atomic Component Structure

```bash
# Create component file
src/components/atomic/[CATEGORY]/[COMPONENT-NAME].tsx

# Categories:
# - atoms/
# - molecules/
# - organisms/
# - compositions/
```

#### 2.2 Component Template

```typescript
/* eslint-disable */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { [REQUIRED_ICONS] } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { [SHADCN_COMPONENTS] } from '@/components/ui/[component]';

// Theme Context & Provider (if needed)
const ThemeContext = createContext<any>(null);
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Main Component
const ComponentName = () => {
  // Component logic here
  return (
    <div className='min-h-screen bg-background p-strategic'>
      {/* Component JSX using design tokens */}
    </div>
  );
};

// Export wrapper
const AppContent = () => {
  return <ComponentName />;
};

export default function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
```

### Phase 3: Design Token Integration

#### 3.1 Replace Hardcoded Styles

```typescript
// ❌ Before - Hardcoded styles
className = 'p-8 text-xl rounded-2xl bg-slate-100';

// ✅ After - Design tokens
className = 'p-strategic text-heading-lg rounded-executive bg-background';
```

#### 3.2 Design Token Categories

- **Spacing**: `p-tactical`, `gap-strategic`, `mb-command`
- **Typography**: `text-heading-lg`, `text-metric-lg`, `text-body-md`
- **Colors**: `bg-background`, `text-foreground`, `text-brand-teal-primary`
- **Radius**: `rounded-premium`, `rounded-executive`
- **Layout**: `max-w-content`, `w-sidebar-expanded`
- **Z-Index**: `z-header`, `z-sidebar`, `z-modal`

#### 3.3 Add Missing Design Tokens (if needed)

```typescript
// In tailwind.config.ts
extend: {
  spacing: {
    'new-token': '2rem', // 32px
  },
  zIndex: {
    'new-layer': '45',
  },
}

// In globals.css
:root {
  --new-custom-property: value;
}
```

### Phase 4: Accessibility & Responsiveness

#### 4.1 AAA Contrast Compliance

```css
/* Ensure 7:1 contrast ratio */
--foreground: 222.2 84% 4.9%; /* Very dark for light theme */
--background: 210 20% 98%; /* Very light for light theme */

.dark {
  --foreground: 210 40% 98%; /* Very light for dark theme */
  --background: 245 15% 3%; /* Very dark for dark theme */
}
```

#### 4.2 Mobile Responsiveness

```typescript
// Mobile header
<div className='fixed top-tactical left-tactical right-tactical z-header md:hidden'>

// Mobile sidebar with backdrop
<AnimatePresence>
  {isMobileOpen && (
    <motion.div
      className='fixed inset-0 z-modal bg-background/80 backdrop-blur-sm md:hidden'
      onClick={() => setIsMobileOpen(false)}
    />
  )}
</AnimatePresence>

// Desktop-only elements
<div className='hidden md:block'>
```

#### 4.3 Touch-Friendly Interactions

```typescript
// Larger touch targets
className='min-h-12 p-tactical'

// Touch animations
<motion.button
  whileTap={{ scale: 0.95 }}
  className='...'
>
```

### Phase 5: Integration & Testing

#### 5.1 Update Atomic Index Files

```typescript
// src/components/atomic/organisms/index.ts
export { ComponentName } from './ComponentName';

// Grouped exports
export const CategoryOrganisms = {
  ComponentName,
  // ... other components
};
```

#### 5.2 Add to Component Browser

```typescript
// src/components/mocks/UnifiedComponentBrowser.tsx

// Import
import ComponentName from '../atomic/organisms/ComponentName';

// Add to componentCategories
'Atomic Components': {
  'Organisms': [
    { id: 'atomic-component-id', name: 'Component: Display Name', component: ComponentName },
  ],
},
```

#### 5.3 Test Component

```bash
# Run type check
bun run type-check

# Test in browser
/en/component-browser?component=atomic-component-id

# Verify:
# - Light/dark theme switching
# - Mobile responsiveness
# - Accessibility (screen readers, keyboard navigation)
# - Animation performance
# - Design token usage (no hardcoded styles)
```

## Quality Checklist

### ✅ Design System Compliance

- [ ] Uses shadcn/ui components as base
- [ ] All styles use design tokens (zero hardcoded values)
- [ ] Follows CreatorFlow color palette
- [ ] Consistent spacing and typography

### ✅ Accessibility (WCAG AAA)

- [ ] 7:1 contrast ratio in both themes
- [ ] Proper ARIA labels and semantic HTML
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility

### ✅ Responsiveness

- [ ] Mobile-first design approach
- [ ] Touch-friendly interactions (min 44px targets)
- [ ] Proper mobile navigation patterns
- [ ] Responsive breakpoints

### ✅ Performance

- [ ] Efficient animations (60fps)
- [ ] Proper component lazy loading
- [ ] Minimal bundle size impact
- [ ] No layout shifts

### ✅ Code Quality

- [ ] TypeScript compliance (zero errors)
- [ ] ESLint compliance
- [ ] Proper component composition
- [ ] Clean, maintainable code structure

## Example Migration

### Before (Mock Component)

```typescript
// src/components/mocks/SC-010-StrategicCommandCenter.tsx
<div className='max-w-2xl rounded-2xl bg-slate-100 p-8 dark:bg-[#0A090F]'>
  <h2 className='text-xl text-amber-600'>Strategic Command Center</h2>
  <p className='text-2xl'>+ $8,921 in 6h (347 orders)</p>
  <button className='rounded-lg bg-slate-900 px-5 py-2 text-white'>Strategic Response</button>
</div>
```

### After (Atomic Component)

```typescript
// src/components/atomic/organisms/SC-StrategicCommand.tsx
<div className='max-w-content rounded-executive bg-background p-strategic'>
  <CardTitle className='text-heading-lg text-warning-amber-500'>
    <Zap className='h-icon-sm w-icon-sm' />
    Strategic Command Center
  </CardTitle>
  <p className='text-metric-lg text-foreground'>+ $8,921 in 6h (347 orders)</p>
  <Button className='rounded-premium bg-foreground px-strategic py-tactical text-background'>Strategic Response</Button>
</div>
```

## URLs for Migrated Components

### Component Browser Access

- Strategic Command Center: `/en/component-browser?component=atomic-sc-strategic`
- Admin Sidebar: `/en/component-browser?component=atomic-sb-sidebar`

### File Locations

- `src/components/atomic/organisms/SC-StrategicCommand.tsx`
- `src/components/atomic/organisms/SB-AdminSidebar.tsx`

## Best Practices

### 1. Design Token First

Always check if required design tokens exist before creating hardcoded values.

### 2. Component Composition

Use shadcn/ui components as building blocks, don't recreate basic functionality.

### 3. Progressive Enhancement

Start with basic functionality, then add animations and advanced features.

### 4. Theme Consistency

Ensure components work perfectly in both light and dark themes.

### 5. Mobile Priority

Design for mobile first, then enhance for desktop.

## Troubleshooting

### Common Issues

#### Design Tokens Not Working

```bash
# Check if token exists in tailwind.config.ts
# Add to globals.css if needed
# Verify CSS custom property syntax
```

#### TypeScript Errors

```bash
# Run type check
bun run type-check

# Fix type assertions
(result as ComponentType)

# Add proper interfaces
interface ComponentProps { ... }
```

#### Animation Performance

```typescript
// Use transform instead of layout properties
transform: 'translateX(0)' // ✅ Good
left: '0px' // ❌ Causes layout shift

// Prefer CSS transforms in Framer Motion
animate={{ x: 0 }} // ✅ Good
animate={{ left: 0 }} // ❌ Poor performance
```

## Next Steps

1. **Identify next mock component** for migration
2. **Follow this workflow** systematically
3. **Update component browser** with new atomic component
4. **Document any new design tokens** added
5. **Test thoroughly** across devices and themes

---

_This workflow ensures consistent, high-quality migration from mock components to production-ready atomic design system components._
