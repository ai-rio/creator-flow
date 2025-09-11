# Mock to Atomic Component Migration Workflow

## Overview

This workflow documents the process of migrating mock components to production-ready atomic design system components using shadcn/ui and comprehensive design tokens.

## Prerequisites

- Understanding of atomic design principles
- Familiarity with shadcn/ui components
- Knowledge of CreatorFlow design token system
- Access to component browser for testing

## Component Browser Cleanup Workflow

### Critical System Requirements

**MANDATORY:** After migrating components, the component browser cleanup is essential for system stability. Failure to properly clean up will cause:

- TypeScript compilation errors
- ESLint hanging/timeouts
- Runtime ReferenceErrors
- Component browser crashes

### Step-by-Step Cleanup Process

#### Step 1: Remove Source File

```bash
# Delete the original mock component file
rm src/components/mocks/[COMPONENT-NAME].tsx
```

#### Step 2: Remove Broken Imports

```typescript
// In src/components/mocks/UnifiedComponentBrowser.tsx
// Remove import statements for deleted files

// REMOVE THESE LINES:
// import NC010Header from './NC-010-Header';
// import UX010Modals from './UX-010-Modals';
// import AM010BillingOverview from './AM-010-BillingOverview';
```

#### Step 3: Remove Component References from Categories

```typescript
// Remove component entries from respective categories

// BEFORE (broken references):
'Navigation Components': {
  'NC Series': [
    { id: 'nc010', name: 'NC-010: Header', component: NC010Header }, // ❌ REMOVE
    { id: 'nc020', name: 'NC-020: Sidebar', component: NC020Sidebar },
  ],
},

// AFTER (clean references):
'Navigation Components': {
  'NC Series': [
    { id: 'nc020', name: 'NC-020: Sidebar', component: NC020Sidebar }, // ✅ Keep existing
  ],
},

// For fully migrated series, use empty array:
'User Experience Components': {
  'UX Series': [], // ✅ All components migrated to atomic
},
```

#### Step 4: Critical System Validation

```bash
# 1. TypeScript validation (MANDATORY)
bunx tsc --noEmit src/components/mocks/UnifiedComponentBrowser.tsx

# 2. ESLint validation (MANDATORY)
bunx eslint src/components/mocks/UnifiedComponentBrowser.tsx

# 3. Runtime validation (MANDATORY)
# Visit: http://localhost:3000/en/component-browser
# - Verify no console errors
# - Test category dropdowns work
# - Confirm atomic components accessible
```

### Complete Cleanup Checklist

**File Operations:**

- [ ] Source file deleted from `/src/components/mocks/`
- [ ] Import statement removed from `UnifiedComponentBrowser.tsx`
- [ ] Component reference removed from category array

**System Validation:**

- [ ] TypeScript check passes (zero errors)
- [ ] ESLint check passes (no blocking errors)
- [ ] Component browser loads without runtime errors
- [ ] Category dropdowns function properly
- [ ] No ReferenceError in browser console

**Atomic Access:**

- [ ] Atomic version accessible via component browser
- [ ] Direct URL works: `/en/component-browser?component=atomic-[id]`
- [ ] Component renders without errors

### Common Critical Issues

**Issue: ReferenceError: [Component] is not defined**

```typescript
// Problem: Import removed but reference still exists
{ id: 'nc010', name: 'NC-010: Header', component: NC010Header }, // ❌

// Solution: Remove the entire component entry
// Don't just comment it out - delete the line completely
```

**Issue: TypeScript/ESLint hanging**

```bash
# Problem: Module resolution errors cause infinite loops
# Solution: Remove ALL broken imports before running type-check
```

### Migration Status Reference

**Fully Migrated Series (Use Empty Arrays):**

- User Experience Components → UX Series: []
- Account Management Components → AM Series: []
- Data & Analytics Components → DA Series: []
- Sidebar Components → SB Series: []

**System Requirements for Stability:**

1. **Zero TypeScript errors** - System will hang with TS errors
2. **Zero module resolution errors** - Broken imports cause runtime failures
3. **Valid component references** - All referenced components must exist
4. **Proper category structure** - Empty arrays for migrated series

## Mobile Component Migration Strategy

### Overview

The mobile component migration strategy introduces a streamlined copy/move approach combined with comprehensive design token application. This method has proven highly effective for large-scale component migrations, as demonstrated in the successful migration of MC-030-Navbar.tsx and MC-020-Order.tsx.

### Mobile-First Migration Strategy

#### Streamlined Copy/Move Approach

Unlike the traditional atomic decomposition approach, the mobile component migration uses a **copy/move + design tokens** strategy:

1. **Copy/Move Strategy**: Components are migrated as cohesive units rather than decomposed into individual atoms
2. **Design Token Application**: Comprehensive design system integration during migration
3. **Advanced UX Preservation**: Maintains complex mobile interactions like swipe gestures and motion patterns
4. **Component Browser Integration**: Seamless integration with phase-based organization

#### Success Metrics

**MC-030-Navbar Migration Results:**

- 7 mobile navigation components extracted
- Complete FAB (Floating Action Button) pattern implementation
- Bottom navigation with glass morphism design
- System status indicators integration

**MC-020-Order Migration Results:**

- 10 order management components extracted
- Swipe-to-action gesture functionality preserved
- Motion value transforms for visual feedback
- Complete order interface with responsive design

### Mobile Component Examples

#### MC-MobileExecutiveHeader.tsx

Advanced header component with system status indicators:

```typescript
// Key Features:
// - Executive-level status dashboard
// - Real-time system indicators
// - Glass morphism background effects
// - Touch-optimized interaction zones

<motion.header
  className='fixed left-0 right-0 top-0 z-header border-b border-border/20 bg-background/80 backdrop-blur-lg'
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: 'spring', damping: 20 }}
>
  <div className='flex items-center justify-between p-tactical'>
    <div className='flex items-center gap-tactical'>
      <StatusIndicator variant='online' />
      <Text variant='heading-sm'>Executive Dashboard</Text>
    </div>
    <motion.div className='flex items-center gap-2' whileTap={{ scale: 0.95 }}>
      <NotificationBadge count={3} />
      <Avatar size='sm' />
    </motion.div>
  </div>
</motion.header>
```

#### MC-MobileNavBar.tsx

FAB pattern with bottom navigation:

```typescript
// Key Features:
// - Floating Action Button (FAB) pattern
// - Bottom navigation with backdrop blur
// - Touch-friendly minimum 44px targets
// - Smooth micro-interactions

<motion.nav
  className='z-navigation fixed bottom-0 left-0 right-0 border-t border-border/20 bg-background/90 backdrop-blur-xl'
  initial={{ y: 100 }}
  animate={{ y: 0 }}
  transition={{ type: 'spring', damping: 25 }}
>
  <div className='flex items-center justify-around p-tactical'>
    {navigationItems.map((item) => (
      <motion.button
        key={item.id}
        className='flex min-h-12 min-w-12 flex-col items-center gap-1 rounded-premium p-tactical'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <item.icon className='h-icon-md w-icon-md' />
        <Text variant='body-xs'>{item.label}</Text>
      </motion.button>
    ))}
  </div>

  {/* FAB for primary action */}
  <motion.button
    className='absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-brand-teal-primary p-4 shadow-lg'
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Plus className='h-icon-lg w-icon-lg text-white' />
  </motion.button>
</motion.nav>
```

#### MC-OrderCard.tsx

Swipe gesture functionality with Framer Motion:

```typescript
// Key Features:
// - Swipe-to-action gestures with drag constraints
// - Visual feedback through motion values
// - Card-based order representation
// - Contextual action reveal

const OrderCard = ({ order, onSwipeAction }) => {
  const x = useMotionValue(0);
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    ['rgba(239, 68, 68, 0.1)', 'rgba(0, 0, 0, 0)', 'rgba(34, 197, 94, 0.1)']
  );

  return (
    <motion.div
      className='relative rounded-executive border border-border/20 bg-card p-strategic'
      style={{ backgroundColor }}
    >
      <motion.div
        drag='x'
        dragConstraints={{ left: -120, right: 120 }}
        style={{ x }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 80) {
            onSwipeAction(info.offset.x > 0 ? 'approve' : 'reject', order.id);
          }
        }}
        className='cursor-grab rounded-executive bg-background p-strategic active:cursor-grabbing'
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-tactical'>
            <OrderStatus status={order.status} />
            <div>
              <Text variant='heading-sm'>Order #{order.id}</Text>
              <Text variant='body-md' className='text-muted-foreground'>
                {order.customer}
              </Text>
            </div>
          </div>
          <Text variant='metric-lg'>${order.total}</Text>
        </div>
      </motion.div>

      {/* Swipe Action Indicators */}
      <div className='absolute left-4 top-1/2 -translate-y-1/2 text-green-500 opacity-30'>
        <Check className='h-icon-lg w-icon-lg' />
      </div>
      <div className='absolute right-4 top-1/2 -translate-y-1/2 text-red-500 opacity-30'>
        <X className='h-icon-lg w-icon-lg' />
      </div>
    </motion.div>
  );
};
```

#### MC-OrderManagement.tsx

Complete order interface:

```typescript
// Key Features:
// - Comprehensive order management interface
// - Filter and sort functionality
// - Bulk action capabilities
// - Real-time status updates

<motion.div
  className='flex h-screen flex-col bg-background'
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  {/* Header with filters */}
  <div className='sticky top-0 border-b border-border/20 bg-background/95 p-strategic backdrop-blur-sm'>
    <div className='mb-tactical flex items-center justify-between'>
      <Text variant='heading-lg'>Order Management</Text>
      <div className='flex items-center gap-2'>
        <FilterToggle />
        <SortSelector />
      </div>
    </div>
    <SearchBar placeholder='Search orders...' />
  </div>

  {/* Order List */}
  <div className='flex-1 space-y-tactical overflow-auto p-strategic'>
    <AnimatePresence>
      {filteredOrders.map((order) => (
        <motion.div
          key={order.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <MC-OrderCard order={order} onSwipeAction={handleSwipeAction} />
        </motion.div>
      ))}
    </AnimatePresence>
  </div>

  {/* Bulk Actions Footer */}
  <motion.div
    className='sticky bottom-0 border-t border-border/20 bg-background/95 p-strategic backdrop-blur-sm'
    initial={{ y: 100 }}
    animate={{ y: selectedOrders.length > 0 ? 0 : 100 }}
  >
    <BulkActionBar selectedCount={selectedOrders.length} />
  </motion.div>
</motion.div>
```

### Advanced UX Patterns Preserved

#### Swipe-to-Action Gestures

```typescript
// Drag constraints for controlled swipe range
dragConstraints={{ left: -120, right: 120 }}

// Visual feedback through motion values
const backgroundColor = useTransform(
  x,
  [-100, 0, 100],
  ['rgba(239, 68, 68, 0.1)', 'rgba(0, 0, 0, 0)', 'rgba(34, 197, 94, 0.1)']
);
```

#### Motion Value Transforms

```typescript
// Smooth transitions with spring physics
transition={{ type: "spring", damping: 20, stiffness: 300 }}

// Scale feedback for touch interactions
whileTap={{ scale: 0.95 }}
whileHover={{ scale: 1.05 }}
```

#### Glass Morphism Design Patterns

```typescript
// Backdrop blur with transparency
className = 'backdrop-blur-lg bg-background/80 border border-border/20';

// Layered glass effect
className = 'backdrop-blur-xl bg-card/90 shadow-lg border border-border/10';
```

### Component Browser Integration

#### Phase-Based Organization

The mobile components have been integrated into the component browser using a phase-based approach:

**Phase 3 - Mobile Navigation Migration**

```typescript
'Mobile Navigation Components': {
  'Phase 3 - Navigation Migration': [
    { id: 'mc-mobile-header', name: 'MC-MobileExecutiveHeader', component: MCMobileExecutiveHeader },
    { id: 'mc-mobile-navbar', name: 'MC-MobileNavBar', component: MCMobileNavBar },
    { id: 'mc-status-indicators', name: 'MC-StatusIndicators', component: MCStatusIndicators },
    { id: 'mc-notification-system', name: 'MC-NotificationSystem', component: MCNotificationSystem },
    { id: 'mc-fab-navigation', name: 'MC-FABNavigation', component: MCFABNavigation },
    { id: 'mc-mobile-search', name: 'MC-MobileSearch', component: MCMobileSearch },
    { id: 'mc-gesture-handler', name: 'MC-GestureHandler', component: MCGestureHandler },
  ],
},
```

**Phase 4 - Order Management Migration**

```typescript
'Order Management Components': {
  'Phase 4 - Order Migration': [
    { id: 'mc-order-card', name: 'MC-OrderCard', component: MCOrderCard },
    { id: 'mc-order-management', name: 'MC-OrderManagement', component: MCOrderManagement },
    { id: 'mc-order-filters', name: 'MC-OrderFilters', component: MCOrderFilters },
    { id: 'mc-bulk-actions', name: 'MC-BulkActions', component: MCBulkActions },
    { id: 'mc-order-status', name: 'MC-OrderStatus', component: MCOrderStatus },
    { id: 'mc-swipe-actions', name: 'MC-SwipeActions', component: MCSwipeActions },
    { id: 'mc-order-timeline', name: 'MC-OrderTimeline', component: MCOrderTimeline },
    { id: 'mc-payment-status', name: 'MC-PaymentStatus', component: MCPaymentStatus },
    { id: 'mc-delivery-tracker', name: 'MC-DeliveryTracker', component: MCDeliveryTracker },
    { id: 'mc-customer-contact', name: 'MC-CustomerContact', component: MCCustomerContact },
  ],
},
```

### Default Props Strategy

#### Component Browser Compatibility Solution

To ensure component browser compatibility, all mobile components include comprehensive default props:

```typescript
// MC-OrderCard.tsx - Default Props Example
interface OrderCardProps {
  order?: Order;
  onSwipeAction?: (action: string, orderId: string) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

const MC_OrderCard: React.FC<OrderCardProps> = ({
  order = {
    id: 'ORD-2024-001',
    customer: 'Sarah Johnson',
    total: 89.99,
    status: 'pending',
    items: 3,
    timestamp: new Date().toISOString(),
    priority: 'standard',
  },
  onSwipeAction = (action, id) => console.log(`${action} action on order ${id}`),
  className = '',
  variant = 'default',
}) => {
  // Component implementation
};

// Mobile Navigation - Default Props Example
const MC_MobileNavBar: React.FC<MobileNavBarProps> = ({
  navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/orders' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ],
  onNavigate = (path) => console.log(`Navigate to: ${path}`),
  currentPath = '/dashboard',
  showFAB = true,
  fabAction = () => console.log('FAB clicked'),
}) => {
  // Component implementation
};
```

### Design Token Application

#### Mobile-Specific Design Tokens

```css
/* Mobile spacing tokens */
--spacing-touch: 44px; /* Minimum touch target */
--spacing-mobile-safe: 16px; /* Safe area padding */
--spacing-gesture: 120px; /* Swipe gesture threshold */

/* Backdrop effects */
--backdrop-blur-sm: blur(4px);
--backdrop-blur-lg: blur(16px);
--backdrop-blur-xl: blur(24px);

/* Mobile shadows */
--shadow-mobile: 0 4px 20px rgba(0, 0, 0, 0.15);
--shadow-card-mobile: 0 2px 12px rgba(0, 0, 0, 0.1);

/* Z-index layers for mobile */
--z-mobile-header: 60;
--z-mobile-navigation: 50;
--z-mobile-overlay: 55;
--z-mobile-fab: 52;
```

#### Touch-Friendly Sizing

```typescript
// Minimum 44px touch targets
className = 'min-h-12 min-w-12 p-tactical';

// Gesture-friendly spacing
className = 'gap-touch'; // 44px gap

// Safe area considerations
className = 'pb-mobile-safe'; // 16px safe padding
```

#### Proper Contrast Ratios

```css
/* AAA contrast compliance for mobile */
:root {
  --mobile-text-high: 222.2 84% 4.9%; /* 21:1 contrast */
  --mobile-text-medium: 215.4 16.3% 46.9%; /* 7:1 contrast */
  --mobile-background: 210 20% 98%; /* High contrast background */
}

.dark {
  --mobile-text-high: 210 40% 98%; /* 21:1 contrast */
  --mobile-text-medium: 217.9 10.6% 64.9%; /* 7:1 contrast */
  --mobile-background: 245 15% 3%; /* High contrast background */
}
```

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

#### 2.1 Choose Migration Strategy

**Traditional Atomic Decomposition:**

- Best for: Simple components with clear atomic boundaries
- Process: Break down into atoms → molecules → organisms
- Example: Basic forms, simple cards, navigation items

**Mobile Copy/Move + Design Tokens:**

- Best for: Complex mobile components with advanced UX patterns
- Process: Migrate as cohesive units → apply design tokens → preserve interactions
- Example: MC-030-Navbar (7 components), MC-020-Order (10 components)

#### 2.2 Create Atomic Component Structure

```bash
# Create component file
src/components/atomic/[CATEGORY]/[COMPONENT-NAME].tsx

# Categories:
# - atoms/
# - molecules/
# - organisms/
# - compositions/
```

#### 2.3 Component Template

**Standard Atomic Component:**

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

**Mobile Component Template:**

```typescript
/* eslint-disable */
'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { [REQUIRED_ICONS] } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { [SHADCN_COMPONENTS] } from '@/components/ui/[component]';

// Component Props with Default Values
interface ComponentProps {
  // Define props with defaults for component browser compatibility
  prop1?: string;
  prop2?: () => void;
  className?: string;
}

// Mobile Theme Context
const MobileThemeContext = createContext<any>(null);
const useMobileTheme = () => useContext(MobileThemeContext);

const MobileThemeProvider: React.FC<any> = ({ children }: any) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    // Mobile-specific theme adjustments
    root.style.setProperty('--mobile-safe-area', '16px');
  }, [theme]);
  return <MobileThemeContext.Provider value={{ theme, setTheme }}>{children}</MobileThemeContext.Provider>;
};

// Main Mobile Component
const MC_ComponentName: React.FC<ComponentProps> = ({
  prop1 = 'default-value',
  prop2 = () => console.log('Default action'),
  className = ''
}) => {
  // Mobile-specific state
  const x = useMotionValue(0);
  const backgroundColor = useTransform(x, [-100, 0, 100], [
    'rgba(239, 68, 68, 0.1)',
    'rgba(0, 0, 0, 0)',
    'rgba(34, 197, 94, 0.1)'
  ]);

  return (
    <motion.div
      className={`min-h-screen bg-background ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile component JSX with design tokens and touch interactions */}
      <div className="fixed top-0 left-0 right-0 z-mobile-header backdrop-blur-lg bg-background/80 p-tactical min-h-12">
        {/* Header content */}
      </div>

      <div className="pt-16 pb-mobile-safe">
        {/* Main content with safe area padding */}
      </div>

      <motion.nav className="fixed bottom-0 left-0 right-0 z-mobile-navigation backdrop-blur-xl bg-background/90 p-tactical">
        {/* Bottom navigation */}
      </motion.nav>
    </motion.div>
  );
};

// Export wrapper
const MobileAppContent = () => {
  return <MC_ComponentName />;
};

export default function MobileApp(): React.JSX.Element {
  return (
    <MobileThemeProvider>
      <MobileAppContent />
    </MobileThemeProvider>
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

### ✅ Mobile Component Specific

- [ ] Swipe gestures with drag constraints (-120px to 120px)
- [ ] Motion value transforms for visual feedback
- [ ] Glass morphism backdrop blur effects
- [ ] Safe area padding for mobile devices
- [ ] FAB (Floating Action Button) patterns implemented
- [ ] Bottom navigation with proper z-index layering
- [ ] Default props for component browser compatibility
- [ ] Mobile-specific design tokens applied
- [ ] Touch-optimized animation performance (spring physics)
- [ ] Phase-based component browser organization

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

**Traditional Atomic Components:**

- Strategic Command Center: `/en/component-browser?component=atomic-sc-strategic`
- Admin Sidebar: `/en/component-browser?component=atomic-sb-sidebar`

**Mobile Components - Phase 3 Navigation:**

- Mobile Executive Header: `/en/component-browser?component=mc-mobile-header`
- Mobile NavBar with FAB: `/en/component-browser?component=mc-mobile-navbar`
- Status Indicators: `/en/component-browser?component=mc-status-indicators`
- Notification System: `/en/component-browser?component=mc-notification-system`
- FAB Navigation: `/en/component-browser?component=mc-fab-navigation`
- Mobile Search: `/en/component-browser?component=mc-mobile-search`
- Gesture Handler: `/en/component-browser?component=mc-gesture-handler`

**Mobile Components - Phase 4 Order Management:**

- Order Card (Swipe): `/en/component-browser?component=mc-order-card`
- Order Management: `/en/component-browser?component=mc-order-management`
- Order Filters: `/en/component-browser?component=mc-order-filters`
- Bulk Actions: `/en/component-browser?component=mc-bulk-actions`
- Order Status: `/en/component-browser?component=mc-order-status`
- Swipe Actions: `/en/component-browser?component=mc-swipe-actions`
- Order Timeline: `/en/component-browser?component=mc-order-timeline`
- Payment Status: `/en/component-browser?component=mc-payment-status`
- Delivery Tracker: `/en/component-browser?component=mc-delivery-tracker`
- Customer Contact: `/en/component-browser?component=mc-customer-contact`

### File Locations

**Traditional Atomic Components:**

- `src/components/atomic/organisms/SC-StrategicCommand.tsx`
- `src/components/atomic/organisms/SB-AdminSidebar.tsx`

**Mobile Component Locations:**

- `src/components/atomic/organisms/mobile/MC-MobileExecutiveHeader.tsx`
- `src/components/atomic/organisms/mobile/MC-MobileNavBar.tsx`
- `src/components/atomic/organisms/mobile/MC-OrderCard.tsx`
- `src/components/atomic/organisms/mobile/MC-OrderManagement.tsx`
- `src/components/atomic/molecules/mobile/MC-StatusIndicators.tsx`
- `src/components/atomic/molecules/mobile/MC-NotificationSystem.tsx`
- `src/components/atomic/molecules/mobile/MC-OrderFilters.tsx`
- `src/components/atomic/molecules/mobile/MC-BulkActions.tsx`
- `src/components/atomic/molecules/mobile/MC-SwipeActions.tsx`
- `src/components/atomic/atoms/mobile/MC-FABNavigation.tsx`

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
