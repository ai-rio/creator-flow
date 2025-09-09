# S001: Unified Component Navigation UX Patterns

## Overview

This specification defines the unified navigation UX patterns implemented for component browsing across all series (A, O, D, I, M, Dx, FP), providing a centralized, accessible, and efficient component discovery experience.

## Unified Navigation Architecture

### Single-Source Navigation System

#### Unified Component Browser
- **URL**: `/en/component-browser`
- **Purpose**: Centralized navigation for all component series with category-based organization
- **Navigation**: Hierarchical category → series → component selection
- **State Management**: React useState with URL parameter synchronization

#### Legacy Series Support
- **URLs**: `/en/[series]` (e.g., `/en/a-series`)
- **Purpose**: Backward compatibility with simplified notification
- **Behavior**: Displays notification directing users to unified browser

### Floating Navigation Panel Architecture

#### Positioning & Interaction
```css
.unified-navigation-panel {
  position: fixed;
  top: 16px;                    /* Configurable via drag */
  right: 16px;                  /* Configurable via drag */
  z-index: 50;
  width: 384px;                 /* w-96 when expanded */
  max-height: 90vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 2px solid #d1d5db;    /* AAA contrast compliance */
}
```

**Key Features**:
- ✅ **Draggable**: Click and drag header to reposition anywhere on screen
- ✅ **Collapsible**: Toggle between full panel (384px) and compact mode (48px)
- ✅ **Persistent Position**: Maintains position during drag operations
- ✅ **AAA Contrast**: WCAG AAA compliant color ratios (>7:1)
- ✅ **Responsive**: Adapts to different screen sizes

#### Collapsible States

**Expanded State** (Default):
- Full 384px width with complete navigation interface
- Category selection, series selection, component list
- Navigation controls and component information
- All interactive elements visible

**Collapsed State**:
- Compact 48x48px panel with toggle button only
- Minimal visual footprint for focused component viewing
- Single button (📋) to expand back to full interface

### Hierarchical Navigation Structure

#### Three-Level Hierarchy

**Level 1: Categories**
```typescript
const componentCategories = {
  'Dashboard Components': {
    'A Series': [...], // SHM Dashboard variants
    'O Series': [...], // Order system components  
    'D Series': [...], // Enhanced desktop components
    'I Series': [...], // Inventory management
    'M Series': [...]  // Executive/mobile components
  },
  'Desktop Components': {
    'Dx Series': [...] // Desktop-specific components (02-18)
  },
  'Public Pages': {
    'FP Series': [...] // Feature page components
  }
};
```

**Level 2: Series Selection**
- Dynamic dropdown based on selected category
- Automatic series selection when category changes
- Clear visual hierarchy with bold typography

**Level 3: Component Selection**
- List view: Full component names with selection highlighting
- Grid view: Compact component cards with abbreviated names
- Real-time component count display

### Visual Design System

#### AAA Contrast Compliance
```css
/* High contrast color palette */
.header-section {
  background: #f3f4f6;         /* Gray-100 background */
  color: #111827;              /* Gray-900 text (21:1 ratio) */
  border-bottom: 2px solid #d1d5db; /* Strong visual separation */
}

.interactive-elements {
  border: 2px solid #6b7280;   /* Strong borders for definition */
  color: #111827;              /* High contrast text */
  font-weight: 700;            /* Bold typography for readability */
}

.selected-state {
  background: #dcfce7;         /* Green-200 background */
  color: #14532d;              /* Green-900 text (>7:1 ratio) */
  border: 2px solid #16a34a;   /* Green-600 border */
}
```

#### Interactive States
- **Default**: High contrast borders and bold typography
- **Hover**: Enhanced background with maintained contrast ratios
- **Focus**: Strong focus rings for keyboard navigation
- **Selected**: Green color scheme with maximum contrast
- **Disabled**: Clear visual indication with reduced opacity

### Component Organization Patterns

#### Category-Based Grouping

**Dashboard Components** (Primary UI Elements):
- A Series: SHM Dashboard variations (A1-A6)
- O Series: Order system components (O2, O5)
- D Series: Enhanced desktop components (D1, D4-D6)
- I Series: Inventory management (I1, I3)
- M Series: Executive and mobile components (M1-M6)

**Desktop Components** (Desktop-Specific):
- Dx Series: Desktop application components (DX2-DX18)

**Public Pages** (Marketing/Landing):
- FP Series: Feature page components (FP020-FP050)

#### Component Flattening Strategy
```typescript
// Flatten all components for navigation
const allComponents = Object.values(componentCategories)
  .flatMap(category => Object.values(category))
  .flat();

// Safe index calculation with fallback
const initialIndex = allComponents.findIndex(c => c.id === initialComponent);
const currentIndex = initialIndex >= 0 ? initialIndex : 0;
```

## Interaction Design Patterns

### Drag and Drop Functionality

#### Mouse Event Handling
```typescript
const handleMouseDown = (e: React.MouseEvent) => {
  setIsDragging(true);
  setDragStart({
    x: e.clientX - position.x,
    y: e.clientY - position.y
  });
};

const handleMouseMove = (e: MouseEvent) => {
  if (isDragging) {
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }
};
```

#### Visual Feedback
- **Cursor States**: `grab` → `grabbing` during drag operations
- **Drag Handle**: Entire header area acts as drag handle
- **Position Persistence**: Maintains position across component changes

### Keyboard Navigation

#### Global Shortcuts
- **← Left Arrow**: Navigate to previous component in sequence
- **→ Right Arrow**: Navigate to next component in sequence  
- **Escape**: Return to home page (`/en`)

#### Component-Specific Navigation
- **Category Selection**: Dropdown with keyboard navigation
- **Series Selection**: Automatic focus management
- **Component List**: Arrow key navigation with visual feedback

### View Mode Switching

#### List View (Default)
- Full component names with clear hierarchy
- Selection highlighting with high contrast
- Optimal for component discovery and identification

#### Grid View
- Compact 2-column layout
- Abbreviated component names (e.g., "A1", "DX5")
- Space-efficient for quick navigation

## URL Parameter Integration

### Component Deep Linking
```typescript
// URL structure: /en/component-browser?component=a1
const navigateToComponent = (index: number) => {
  setCurrentIndex(index);
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('component', allComponents[index].id);
  window.history.pushState({}, '', newUrl.toString());
};
```

### State Synchronization
- URL parameters reflect current component selection
- Browser back/forward navigation supported
- Shareable URLs for specific components
- Initial component loading from URL parameters

## Accessibility Implementation

### WCAG AAA Compliance

#### Color Contrast
- **Text on Background**: Minimum 7:1 contrast ratio
- **Interactive Elements**: Enhanced contrast with bold typography
- **Focus Indicators**: Strong visual focus rings
- **State Changes**: Clear visual feedback for all interactions

#### Keyboard Navigation
- **Tab Order**: Logical progression through interface elements
- **Focus Management**: Proper focus handling during state changes
- **Keyboard Shortcuts**: Consistent across all components
- **Screen Reader Support**: Proper ARIA labels and descriptions

#### Motor Accessibility
- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Drag Tolerance**: Forgiving drag detection with proper thresholds
- **Alternative Navigation**: Keyboard alternatives for all mouse interactions

## Performance Optimization

### Component Loading Strategy

#### Lazy Loading
```typescript
// Components loaded on-demand to reduce initial bundle size
const CurrentComponent = currentComponent?.component;

// Safe rendering with fallback
{CurrentComponent ? <CurrentComponent /> : <div>Component not found</div>}
```

#### State Management
- Minimal re-renders through targeted state updates
- Efficient component flattening with memoization
- Optimized drag event handling with proper cleanup

### Memory Management
- Event listener cleanup on component unmount
- Proper dependency arrays in useEffect hooks
- Efficient state updates without unnecessary re-renders

## Implementation Guidelines

### Component Integration Checklist

For adding new component series:

- [ ] Add component imports to UnifiedComponentBrowser
- [ ] Define component entries in componentCategories object
- [ ] Assign appropriate category (Dashboard/Desktop/Public Pages)
- [ ] Ensure component follows naming convention (ID + display name)
- [ ] Test component loading and navigation
- [ ] Verify keyboard shortcuts work correctly
- [ ] Confirm AAA contrast compliance
- [ ] Test drag and collapse functionality

### Quality Gates

#### Functionality
- [ ] All components load without errors
- [ ] Navigation works in both directions
- [ ] URL parameters sync correctly
- [ ] Keyboard shortcuts respond properly
- [ ] Drag and drop functions smoothly
- [ ] Collapse/expand maintains state

#### Accessibility  
- [ ] WCAG AAA contrast ratios verified
- [ ] Keyboard navigation complete
- [ ] Screen reader compatibility tested
- [ ] Focus management working properly
- [ ] Touch targets meet minimum size requirements

#### Performance
- [ ] Initial load time < 2 seconds
- [ ] Navigation response time < 100ms
- [ ] Drag operations smooth (60fps)
- [ ] Memory usage stable during extended use

## Future Enhancement Opportunities

### Advanced Navigation Features
- **Search Functionality**: Filter components by name or category
- **Favorites System**: Bookmark frequently used components
- **Recent History**: Quick access to recently viewed components
- **Comparison Mode**: Side-by-side component viewing

### Customization Options
- **Panel Themes**: Light/dark mode support
- **Size Preferences**: Configurable panel dimensions
- **Keyboard Shortcuts**: User-customizable key bindings
- **Layout Options**: Alternative panel positions and orientations

### Integration Enhancements
- **Component Documentation**: Inline documentation display
- **Usage Analytics**: Track popular components and usage patterns
- **Export Functionality**: Export component configurations
- **Collaboration Features**: Share component collections

## Related Documents

- [AST-Based JSX to TypeScript Methodology](../00-planning/P001-ast-based-jsx-to-tsx-methodology.md)
- [Component Architecture Standards](../../architecture/component-patterns.md)
- [Accessibility Guidelines](../../accessibility/wcag-aaa-compliance.md)
- [Performance Optimization Guide](../../performance/component-loading-strategies.md)
