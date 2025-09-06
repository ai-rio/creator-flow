# S001: Component Navigation UX Patterns

## Overview

This specification defines the standardized navigation UX patterns developed for component series browsing, ensuring consistent user experience across all component collections (A-Series, O-Series, D-Series, I-Series).

## Navigation Architecture

### Dual-Mode System

#### Browser Mode
- **URL**: `/en/[series]-browser`
- **Purpose**: Overview mode with horizontal navigation and component switching
- **Navigation**: Internal state management with React useState

#### Individual Mode  
- **URL**: `/en/[series]-browser?component=[ComponentName]`
- **Purpose**: Focused view of single components
- **Navigation**: URL-based navigation with browser history

### Vertical Navigation Panel

#### Positioning Strategy
```css
.navigation-panel {
  position: fixed;
  right: 1rem;              /* right-4 */
  top: 50%;                 /* top-1/2 */
  transform: translateY(-50%); /* -translate-y-1/2 */
  z-index: 100;             /* z-[100] */
  display: flex;
  flex-direction: column;   /* flex-col */
  gap: 0.75rem;            /* gap-3 */
}
```

**Advantages**:
- ✅ No header conflicts (floats independently)
- ✅ Always accessible regardless of component content
- ✅ Consistent positioning across all viewports
- ✅ Intuitive vertical metaphor (↑ previous, ↓ next)

#### Visual Design System

**Color Coding**:
- **Yellow** (`bg-yellow-100/95`): Exit/Back actions
- **Blue** (`bg-blue-100/95`): Information displays
- **Green** (`bg-green-100/95`): Navigation actions  
- **Purple** (`bg-purple-100/95`): Mode switching
- **Gray** (`bg-slate-100/75`): Disabled states

**Component Sizes**:
- **Circular buttons**: 48x48px (`w-12 h-12`) for actions
- **Info card**: Variable width with padding (`px-3 py-4`)
- **Border radius**: Full circles (`rounded-full`) for buttons, larger radius (`rounded-xl`) for cards

### Browser Mode Navigation

#### Structure (Top to Bottom)
1. **Component Info Card** (Blue)
   - Current component name
   - Position indicator (e.g., "1/6")
   - Mode indicator ("Browser Mode")
   - Keyboard shortcuts hint ("←→ Nav")

2. **Previous Button** (Green)
   - ↑ Arrow icon
   - Tooltip showing previous component name
   - Disabled state when at first component

3. **Next Button** (Green)  
   - ↓ Arrow icon
   - Tooltip showing next component name
   - Disabled state when at last component

4. **Individual View Link** (Purple)
   - ↗ Arrow icon
   - Opens current component in individual mode
   - New tab/focused viewing

#### Implementation
```typescript
// Browser mode navigation logic
const currentIndex = COMPONENT_NAMES.indexOf(selectedComponent);
const hasPrevious = currentIndex > 0;
const hasNext = currentIndex < COMPONENT_NAMES.length - 1;

// State-based navigation (no URL changes)
<button onClick={() => setSelectedComponent(previousComponent!)}>
  ↑
</button>
```

### Individual Mode Navigation

#### Structure (Top to Bottom)
1. **Back to Browser** (Yellow)
   - ← Arrow icon
   - Returns to browser mode
   - Clear exit path

2. **Component Info Card** (Blue)
   - Current component name
   - Position indicator (e.g., "1/6") 
   - Keyboard shortcuts ("←→ Navigate • ESC Exit")

3. **Previous Button** (Green)
   - ↑ Arrow icon  
   - URL-based navigation to previous component
   - Maintains individual mode

4. **Next Button** (Green)
   - ↓ Arrow icon
   - URL-based navigation to next component
   - Maintains individual mode

#### Implementation
```typescript
// Individual mode navigation logic - URL based
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft' && hasPrevious && previousComponent) {
    window.location.href = `/en/a-series-browser?component=${previousComponent}`;
  } else if (event.key === 'ArrowRight' && hasNext && nextComponent) {
    window.location.href = `/en/a-series-browser?component=${nextComponent}`;
  } else if (event.key === 'Escape') {
    window.location.href = '/en/a-series-browser';
  }
};
```

## Keyboard Interaction Design

### Browser Mode Shortcuts
- **← Left Arrow**: Navigate to previous component (internal state)
- **→ Right Arrow**: Navigate to next component (internal state)
- **Enter**: Open current component in individual mode
- **Tab**: Focus next navigation element

### Individual Mode Shortcuts  
- **← Left Arrow**: Navigate to previous component (URL change)
- **→ Right Arrow**: Navigate to next component (URL change)
- **Escape**: Return to browser mode
- **Home**: Jump to first component
- **End**: Jump to last component

### Accessibility Considerations
- All buttons have proper `title` attributes
- Keyboard navigation follows logical tab order
- Disabled states clearly indicated visually and programmatically
- ARIA labels for screen readers
- High contrast mode support

## Component Integration Pattern

### Wrapper Component Structure
```typescript
interface SeriesProps {
  mode?: 'individual' | 'browser';
  componentName?: string;
}

export default function Series({ mode = 'browser', componentName }: SeriesProps) {
  // Component registry
  const COMPONENTS = {
    'Component1': Component1,
    'Component2': Component2,
    // ...
  };
  
  // Mode switching logic
  if (mode === 'individual' && componentName) {
    return <IndividualView />;
  }
  
  return <BrowserView />;
}
```

### Page Route Integration
```typescript
// pages/[locale]/[series]-browser/page.tsx
interface PageProps {
  searchParams: Promise<{ component?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedComponent = params.component;
  
  if (selectedComponent) {
    return <Series mode="individual" componentName={selectedComponent} />;
  }
  
  return <Series mode="browser" />;
}
```

## User Experience Flows

### Primary User Journeys

#### Component Discovery Flow
1. User visits `/en/a-series-browser`
2. Sees all components in browser mode with horizontal tabs
3. Uses vertical navigation or horizontal tabs to explore
4. Clicks ↗ button or uses keyboard shortcut to focus on specific component

#### Component Deep Dive Flow  
1. User visits `/en/a-series-browser?component=A3ShmDashboard`
2. Sees focused view of A3 component
3. Uses ↑↓ navigation or ←→ keyboard shortcuts to browse series
4. Uses ← Back button or ESC key to return to browser overview

#### Comparative Analysis Flow
1. User opens browser mode
2. Opens multiple individual components in new tabs using ↗ buttons
3. Compares components side-by-side
4. Uses keyboard shortcuts for rapid navigation within each tab

### Error Handling

#### Invalid Component Names
```typescript
if (!SelectedComponent) {
  return (
    <div className="error-state">
      <h1>Component Not Found</h1>
      <p>Component "{componentName}" does not exist.</p>
      <p>Available: {COMPONENT_NAMES.join(', ')}</p>
      <a href="/en/a-series-browser">← Back to Browser</a>
    </div>
  );
}
```

#### Network/Loading States
- Skeleton placeholders during component loading
- Error boundaries for component rendering failures
- Graceful degradation when navigation fails

## Implementation Checklist

### For Each New Component Series

- [ ] Create wrapper component with COMPONENTS registry
- [ ] Implement dual-mode rendering logic  
- [ ] Add vertical navigation panel with proper positioning
- [ ] Configure keyboard event handlers
- [ ] Set up page route with async searchParams
- [ ] Add proper TypeScript interfaces
- [ ] Implement error handling for invalid components
- [ ] Test navigation flows in both modes
- [ ] Verify keyboard shortcuts work correctly
- [ ] Ensure accessibility compliance

### Quality Gates

- [ ] Navigation works without JavaScript (progressive enhancement)
- [ ] Keyboard navigation follows logical tab order
- [ ] Screen readers can access all functionality  
- [ ] High contrast mode displays properly
- [ ] Mobile responsive design maintained
- [ ] Performance: Navigation actions < 100ms response time
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## Future Enhancements

### Planned Improvements
- **Component search/filter** within browser mode
- **Bookmarking** favorite components  
- **Comparison mode** for side-by-side viewing
- **Component documentation** integration
- **Usage analytics** for popular components

### Advanced Navigation Features  
- **Breadcrumb navigation** for nested component hierarchies
- **Tag-based filtering** by component type/category
- **Recently viewed** component history
- **Keyboard shortcut customization**

## Related Documents

- [AST-Based JSX to TypeScript Methodology](../00-planning/P001-ast-based-jsx-to-tsx-methodology.md)
- [Component Architecture Standards](../../architecture/component-patterns.md)
- [Accessibility Guidelines](../../accessibility/navigation-patterns.md)