# S003-DRAFT: CreatorFlow Responsive Design System

**Document Type**: Specification  
**Initiative**: Design System  
**Status**: DRAFT  
**Created**: 2025-09-10  
**Last Updated**: 2025-09-10

## Executive Summary

CreatorFlow's responsive design system is built on **mobile-first principles** specifically tailored for the creator economy. This specification defines responsive breakpoints, component behavior, and interaction patterns that ensure optimal experiences across all devices used by TikTok Shop creators, from mobile content creation to desktop order management at scale.

**Strategic Approach:**

- **TikTok-Native Mobile Experience** for creators' primary workflow
- **Productivity-Focused Tablet Experience** for multi-tasking creators
- **Professional Desktop Experience** for high-volume scaling creators
- **Accessibility-First Design** ensuring inclusive creator experiences

---

## 1. Mobile-First Breakpoint Strategy

### 1.1 Creator-Optimized Breakpoints

```typescript
// Tailwind CSS Breakpoints (CreatorFlow Standard)
const breakpoints = {
  xs: '320px', // Small mobile devices (iPhone SE)
  sm: '640px', // Large mobile devices (iPhone 14 Pro)
  md: '768px', // Tablets (iPad)
  lg: '1024px', // Small laptops (MacBook Air)
  xl: '1280px', // Large laptops (MacBook Pro)
  '2xl': '1536px', // Desktop monitors
  executive: '1600px', // Premium executive displays
};

// Usage in components
const responsiveClasses = {
  container: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
  grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  text: 'text-sm sm:text-base lg:text-lg',
  spacing: 'space-y-4 md:space-y-6 lg:space-y-8',
};
```

### 1.2 Device-Specific Creator Experiences

#### **TikTok-Native Mobile Experience (320px - 767px)**

```css
/* Portrait-first layout optimization */
.mobile-creator-layout {
  @apply flex min-h-screen flex-col;
  /* Full-width cards for easy scanning */
  /* Thumb-friendly navigation with bottom tab bar */
  /* Swipe gestures for order management */
  /* Minimal taps to complete critical actions (1-2 taps max) */
}

.mobile-card-stack {
  @apply space-y-4 p-4;
}

.mobile-touch-target {
  @apply min-h-[44px] min-w-[44px]; /* WCAG 2.1 AAA standard */
}
```

#### **Creator Productivity Tablet Experience (768px - 1023px)**

```css
/* Hybrid layout for multi-tasking creators */
.tablet-creator-layout {
  @apply grid grid-cols-1 gap-6 p-6 md:grid-cols-2;
  /* Side-by-side panels for efficiency */
  /* Larger touch targets for precision tasks */
  /* Contextual toolbars on selection */
}

.tablet-panel-system {
  @apply flex flex-col gap-6 md:flex-row;
}
```

#### **Professional Desktop Experience (1024px+)**

```css
/* Advanced features for scaling creators */
.desktop-creator-layout {
  @apply grid grid-cols-12 gap-8 p-8;
  /* Sidebar navigation for high order volume */
  /* Multi-column layouts for data-dense interfaces */
  /* Bulk operations for 500+ orders/day */
}

.desktop-sidebar {
  @apply col-span-2 lg:col-span-3;
}

.desktop-main-content {
  @apply col-span-10 lg:col-span-9;
}
```

---

## 2. Component Responsive Behavior

### 2.1 Dashboard Grid Responsive Transformation

```css
/* Progressive Enhancement Grid System */
.dashboard-grid {
  /* Mobile: Single column stack */
  @apply grid grid-cols-1 gap-4 p-4;
}

/* Tablet: Two columns with breathing room */
@screen md {
  .dashboard-grid {
    @apply grid-cols-2 gap-6 p-6;
  }
}

/* Desktop: Four columns for comprehensive overview */
@screen lg {
  .dashboard-grid {
    @apply grid-cols-4 gap-8 p-8;
  }
}

/* Executive Display: Maintain 4 columns with max width */
@screen xl {
  .dashboard-grid {
    @apply mx-auto max-w-7xl;
  }
}

@screen executive {
  .dashboard-grid {
    @apply max-w-8xl gap-12 p-12;
  }
}
```

### 2.2 Order Management Responsive Patterns

```typescript
// Mobile: Card-based list (thumb navigation optimized)
const MobileOrderView = ({ orders }: { orders: Order[] }) => (
  <div className='space-y-3'>
    {orders.map((order) => (
      <SwipeableOrderCard key={order.id} order={order} variant='mobile' />
    ))}
  </div>
);

// Desktop: Table-based list (data density for scaling creators)
const DesktopOrderView = ({ orders }: { orders: Order[] }) => (
  <div className='glass-card'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderTableRow key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  </div>
);

// Responsive wrapper with progressive enhancement
const ResponsiveOrderList = ({ orders }: { orders: Order[] }) => {
  return (
    <>
      <div className='block lg:hidden'>
        <MobileOrderView orders={orders} />
      </div>
      <div className='hidden lg:block'>
        <DesktopOrderView orders={orders} />
      </div>
    </>
  );
};
```

### 2.3 Navigation Responsive Strategy

```typescript
// TikTok-Style Bottom Navigation (Mobile)
const MobileBottomNav = () => (
  <nav className='bg-glass-card-dark fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl lg:hidden'>
    <div className='grid grid-cols-4 py-2'>
      {navItems.map((item) => (
        <NavItem key={item.id} {...item} className='touch-target flex flex-col items-center justify-center p-2' />
      ))}
    </div>
  </nav>
);

// Professional Sidebar Navigation (Desktop)
const DesktopSidebar = () => (
  <aside className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
    <div className='glass-card-dark flex min-h-0 flex-1 flex-col border-r backdrop-blur-xl'>
      <div className='flex flex-1 flex-col overflow-y-auto pb-4 pt-5'>
        <nav className='mt-5 flex-1 space-y-1 px-2'>
          {navItems.map((item) => (
            <SidebarNavItem key={item.id} {...item} />
          ))}
        </nav>
      </div>
    </div>
  </aside>
);

// Responsive Navigation Wrapper
const ResponsiveNavigation = () => (
  <>
    <MobileBottomNav />
    <DesktopSidebar />
  </>
);
```

---

## 3. CreatorFlow Brand Color Integration

### 3.1 Responsive Color System

```css
:root {
  /* CreatorFlow Brand Colors */
  --brand-teal-primary: #0d9488;
  --brand-teal-light: #2dd4bf;
  --brand-purple-primary: #8b5cf6;
  --brand-blue-primary: #3b82f6;

  /* Creator Economy Semantic Colors */
  --viral-gradient: linear-gradient(135deg, var(--brand-teal-primary) 0%, var(--brand-purple-primary) 100%);
  --success-creator: #22c55e; /* Successful orders */
  --warning-creator: #f59e0b; /* Low stock/issues */
  --error-creator: #ef4444; /* Failed operations */

  /* Responsive Background System */
  --bg-mobile: #fafafa;
  --bg-tablet: #f8fafc;
  --bg-desktop: var(--bg-dark-primary);

  /* Glass Morphism Responsive */
  --glass-mobile: rgba(255, 255, 255, 0.9);
  --glass-tablet: rgba(255, 255, 255, 0.8);
  --glass-desktop: var(--glass-card-dark);
}

/* Dark mode support for late-night creators */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-mobile: var(--bg-dark-primary);
    --bg-tablet: var(--bg-dark-secondary);
    --glass-mobile: var(--glass-card-dark);
    --glass-tablet: var(--glass-card-dark);
  }
}

/* Device-specific color applications */
@screen md {
  .responsive-bg {
    background: var(--bg-tablet);
  }

  .responsive-glass {
    background: var(--glass-tablet);
  }
}

@screen lg {
  .responsive-bg {
    background: var(--bg-desktop);
  }

  .responsive-glass {
    background: var(--glass-desktop);
  }
}
```

### 3.2 Responsive Component Variants

```typescript
// Creator-optimized button variants with responsive sizing
const creatorButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // TikTok-inspired gradient for primary actions
        tiktok:
          'bg-gradient-to-r from-brand-teal-primary to-brand-purple-primary text-white hover:shadow-lg hover:scale-105 active:scale-95',

        // Viral content emphasis with animation
        viral:
          'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-white animate-gradient-x hover:shadow-xl',

        // Professional variant for desktop
        professional: 'bg-brand-teal-primary text-white hover:bg-brand-teal-600 shadow-sm hover:shadow-lg',
      },
      size: {
        // Mobile-optimized touch targets
        mobile: 'h-12 px-6 py-3 text-base min-w-[44px]',
        tablet: 'h-11 px-5 py-2.5 text-sm',
        desktop: 'h-10 px-4 py-2 text-sm',
        // Responsive default
        responsive:
          'h-12 px-6 py-3 text-base min-w-[44px] sm:h-11 sm:px-5 sm:py-2.5 sm:text-sm lg:h-10 lg:px-4 lg:py-2',
      },
    },
    defaultVariants: {
      variant: 'tiktok',
      size: 'responsive',
    },
  }
);

// Responsive card variants
const creatorCardVariants = cva('rounded-lg border transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground shadow-sm hover:shadow-md',
      viral:
        'bg-gradient-to-br from-pink-50 to-blue-50 border-l-4 border-l-brand-teal-primary shadow-md hover:shadow-lg',
      metric: 'bg-gradient-to-br from-white to-gray-50 border-0 shadow-sm hover:shadow-md',
    },
    responsive: {
      mobile: 'p-4 rounded-lg',
      tablet: 'p-5 rounded-xl',
      desktop: 'p-6 rounded-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    responsive: 'mobile',
  },
});
```

---

## 4. Responsive Typography System

### 4.1 Creator-Focused Typography Scale

```css
/* Mobile-first typography with smooth scaling */
.text-creator-hero {
  @apply text-2xl font-black leading-tight;
  font-size: clamp(1.75rem, 4vw, 4rem);
  letter-spacing: -0.02em;
}

.text-creator-h1 {
  @apply text-xl font-bold leading-tight text-gray-900;
  font-size: clamp(1.25rem, 3vw, 2.25rem);
}

.text-creator-h2 {
  @apply text-lg font-semibold leading-tight text-gray-900;
  font-size: clamp(1.125rem, 2.5vw, 1.875rem);
}

.text-creator-h3 {
  @apply text-base font-medium leading-normal text-gray-900;
  font-size: clamp(1rem, 2vw, 1.5rem);
}

/* Body text optimized for mobile reading */
.text-creator-body {
  @apply text-sm leading-relaxed text-gray-700;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.75;
}

.text-creator-caption {
  @apply text-xs text-gray-500;
  font-size: clamp(0.75rem, 1.2vw, 0.875rem);
}

/* Metric display with responsive scaling */
.text-creator-metric {
  @apply font-black text-gray-900;
  font-size: clamp(1.5rem, 5vw, 3rem);
  line-height: 1.1;
}

.text-creator-metric-label {
  @apply text-xs font-medium uppercase tracking-wide text-gray-600;
  font-size: clamp(0.625rem, 1vw, 0.75rem);
  letter-spacing: 0.1em;
}

/* Brand gradient text for viral content */
.text-creator-viral {
  @apply font-bold;
  font-size: clamp(1rem, 3vw, 1.5rem);
  background: var(--viral-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 4.2 Content-Specific Responsive Typography

```css
/* Blog and content typography with reading optimization */
.content-typography {
  /* Hero content - responsive scaling */
  .content-hero-title {
    font-size: var(--text-content-hero);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-tight-content);
    letter-spacing: var(--letter-spacing-hero);
  }

  /* Article content - optimal reading width */
  .content-article-body {
    max-width: var(--width-content-max); /* 65ch optimal reading */
    font-family: var(--font-content-reading);
    line-height: var(--line-height-content);
    font-size: clamp(0.875rem, 1.5vw, 1rem);
  }

  /* Quote styling */
  .content-quote {
    font-family: var(--font-content-serif);
    font-size: var(--text-content-quote);
    font-style: italic;
    line-height: var(--line-height-relaxed-content);
  }

  /* Category labels */
  .content-category {
    font-family: var(--font-mono);
    font-size: var(--text-content-category);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-category);
  }
}

/* Responsive spacing for content */
@screen md {
  .content-typography {
    .content-article-body {
      font-size: 1rem;
    }
  }
}

@screen lg {
  .content-typography {
    .content-article-body {
      font-size: 1.125rem;
      line-height: 1.8;
    }
  }
}
```

---

## 5. Performance-Optimized Responsive Images

### 5.1 Creator Avatar and Product Images

```typescript
// Responsive image component with creator-specific optimization
const ResponsiveCreatorImage = ({ src, alt, priority = false, ...props }: ResponsiveImageProps) => (
  <Image
    src={src}
    alt={alt}
    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    priority={priority}
    quality={85} // Optimized for creator workflow speed
    {...props}
    className={cn('transition-all duration-300', props.className)}
  />
);

// Creator avatar with responsive sizing
const CreatorAvatar = ({ user, size = 'default', interactive = false }: CreatorAvatarProps) => {
  const sizeClasses = {
    xs: 'w-6 h-6 sm:w-8 sm:h-8',
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    default: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
    hero: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full border-2 border-brand-teal-400/20',
        sizeClasses[size],
        interactive && 'cursor-pointer transition-colors duration-300 hover:scale-105 hover:border-brand-teal-primary'
      )}
    >
      <ResponsiveCreatorImage
        src={user.avatar || '/default-creator-avatar.png'}
        alt={`${user.username} avatar`}
        fill
        className='object-cover'
        sizes={
          size === 'hero'
            ? '(max-width: 640px) 80px, (max-width: 1024px) 96px, 128px'
            : '(max-width: 640px) 40px, (max-width: 1024px) 48px, 64px'
        }
      />
    </div>
  );
};

// Product image with responsive gallery
const ResponsiveProductGallery = ({ products, variant = 'grid' }: ProductGalleryProps) => {
  const gridClasses = {
    grid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6',
    carousel: 'flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2',
    masonry: 'columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 lg:gap-6',
  };

  return (
    <div className={gridClasses[variant]}>
      {products.map((product) => (
        <div
          key={product.id}
          className={cn(
            'group relative',
            variant === 'carousel' && 'flex-shrink-0 snap-start',
            variant === 'masonry' && 'mb-3 break-inside-avoid sm:mb-4 lg:mb-6'
          )}
        >
          <ResponsiveCreatorImage
            src={product.imageUrl}
            alt={product.name}
            width={variant === 'carousel' ? 200 : undefined}
            height={variant === 'carousel' ? 200 : undefined}
            fill={variant !== 'carousel'}
            className={cn('rounded-lg object-cover transition-transform duration-300', 'group-hover:scale-105')}
          />
        </div>
      ))}
    </div>
  );
};
```

### 5.2 Loading States and Progressive Enhancement

```typescript
// Creator-optimized skeleton loading with responsive behavior
const ResponsiveDashboardSkeleton = () => (
  <div className='space-y-4 sm:space-y-6'>
    {/* Metrics skeleton - responsive grid */}
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className='p-4 sm:p-6'>
          <Skeleton className='mb-2 h-4 w-20' />
          <Skeleton className='mb-1 h-6 w-16 sm:h-8' />
          <Skeleton className='h-3 w-12' />
        </Card>
      ))}
    </div>

    {/* Order list skeleton - different layouts per device */}
    <div className='space-y-3 lg:space-y-0'>
      {/* Mobile: Card layout */}
      <div className='block space-y-3 lg:hidden'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Skeleton className='h-4 w-4' />
                <div>
                  <Skeleton className='mb-1 h-4 w-24' />
                  <Skeleton className='h-3 w-16' />
                </div>
              </div>
              <Skeleton className='h-6 w-20' />
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop: Table layout */}
      <div className='hidden lg:block'>
        <Card className='overflow-hidden'>
          <div className='p-0'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='flex items-center space-x-4 border-b p-4 last:border-b-0'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-6 w-16' />
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-8 w-20' />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// Progressive loading with device-specific priorities
const useResponsiveDashboardLoading = () => {
  const [loadingStates, setLoadingStates] = useState({
    metrics: true,
    orders: true,
    analytics: true,
    alerts: true,
  });

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  useEffect(() => {
    // Prioritize loading order based on device
    const loadingOrder = isMobile
      ? ['metrics', 'orders', 'alerts', 'analytics'] // Mobile: critical first
      : isTablet
      ? ['metrics', 'orders', 'analytics', 'alerts'] // Tablet: balanced
      : ['metrics', 'analytics', 'orders', 'alerts']; // Desktop: data first

    const timers = loadingOrder.map((key, index) =>
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, (index + 1) * 300)
    );

    return () => timers.forEach(clearTimeout);
  }, [isMobile, isTablet]);

  return loadingStates;
};
```

---

## 6. Touch and Gesture Optimization

### 6.1 Mobile Touch Patterns

```css
/* Ensure all interactive elements meet accessibility standards */
.touch-target {
  @apply min-h-[44px] min-w-[44px]; /* WCAG 2.1 AAA standard */
  touch-action: manipulation; /* Prevent zoom on double-tap */
}

/* Mobile-optimized button spacing */
.button-group-mobile {
  @apply flex flex-col space-y-3;
}

@screen sm {
  .button-group-mobile {
    @apply flex-row space-x-3 space-y-0;
  }
}

/* Swipe-friendly card design with hardware acceleration */
.swipe-card {
  @apply touch-pan-x; /* Allow horizontal swiping */
  transform: translateZ(0); /* Enable hardware acceleration */
  will-change: transform; /* Optimize for animations */
}

/* Pull-to-refresh indicator */
.pull-refresh {
  @apply touch-pan-y; /* Allow vertical swiping */
  overscroll-behavior: contain;
}
```

### 6.2 Advanced Gesture Support

```typescript
// Enhanced swipe actions for order management
const useCreatorSwipeActions = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void
) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft?.(),
    onSwipedRight: () => onSwipeRight?.(),
    onSwipedUp: () => onSwipeUp?.(),
    onSwipedDown: () => onSwipeDown?.(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enable for desktop testing
    delta: 10, // Minimum distance for swipe detection
    velocity: 0.3, // Minimum velocity for swipe detection
  });

  return handlers;
};

// Advanced swipeable order card with multiple actions
const AdvancedSwipeableOrderCard = ({
  order,
  onArchive,
  onComplete,
  onExpand,
  onQuickEdit,
}: SwipeableOrderCardProps) => {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

  const swipeHandlers = useCreatorSwipeActions(
    () => {
      setSwipeDirection('left');
      onArchive(order.id); // Swipe left to archive
    },
    () => {
      setSwipeDirection('right');
      onComplete(order.id); // Swipe right to complete
    },
    () => {
      setSwipeDirection('up');
      onExpand(order.id); // Swipe up to expand details
    },
    () => {
      setSwipeDirection('down');
      onQuickEdit(order.id); // Swipe down for quick edit
    }
  );

  return (
    <div {...swipeHandlers} className={cn('swipe-card relative', swipeDirection && 'animate-swipe-feedback')}>
      <OrderCard order={order} />

      {/* Visual feedback for swipe actions */}
      <SwipeActionIndicators direction={swipeDirection} onComplete={() => setSwipeDirection(null)} />
    </div>
  );
};

// Long press support for context menus
const useLongPress = (onLongPress: () => void, options: { threshold?: number; preventDefault?: boolean } = {}) => {
  const { threshold = 500, preventDefault = true } = options;
  const isLongPress = useRef(false);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event: TouchEvent | MouseEvent) => {
      if (preventDefault) {
        event.preventDefault();
      }
      target.current = event.target;
      timeout.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress();
      }, threshold);
    },
    [onLongPress, threshold, preventDefault]
  );

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    isLongPress.current = false;
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
    onTouchCancel: clear,
  };
};
```

---

## 7. Accessibility and Inclusive Design

### 7.1 Focus Management and Navigation

```css
/* Creator-friendly focus indicators with brand colors */
*:focus-visible {
  @apply outline-none ring-2 ring-brand-teal-primary ring-offset-2 ring-offset-background;
  outline: 2px solid var(--brand-teal-primary);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .card-creator {
    @apply border-2 border-gray-900;
  }

  .button-creator {
    @apply border-2 border-current;
  }

  .text-creator-viral {
    /* Fallback for high contrast */
    background: none;
    -webkit-text-fill-color: currentColor;
    color: var(--brand-teal-primary);
  }
}

/* Reduced motion support for creators with vestibular disorders */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-slow,
  .animate-gradient-x,
  .animate-bounce,
  .transition-all,
  .animate-swipe-feedback {
    animation: none;
    transition: none;
  }

  /* Maintain essential functionality without animation */
  .swipe-card {
    transform: none;
  }

  /* Provide alternative visual feedback */
  .hover-feedback {
    @apply hover:bg-brand-teal-50;
  }
}

/* Large text support */
@media (prefers-font-size: large) {
  .text-creator-body {
    font-size: 1.125rem;
    line-height: 1.8;
  }

  .text-creator-caption {
    font-size: 1rem;
  }

  .touch-target {
    @apply min-h-[48px] min-w-[48px]; /* Larger touch targets */
  }
}
```

### 7.2 Screen Reader and Keyboard Support

```typescript
// Accessible dashboard metrics with comprehensive ARIA support
const AccessibleCreatorDashboardCard = ({ title, value, change, trend, icon: Icon }: AccessibleDashboardCardProps) => {
  const cardId = `metric-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const changeId = `change-${cardId}`;

  return (
    <Card
      className='focus-within:ring-2 focus-within:ring-brand-teal-primary focus-within:ring-offset-2'
      tabIndex={0}
      role='region'
      aria-labelledby={cardId}
      aria-describedby={change ? changeId : undefined}
    >
      <CardHeader className='pb-2'>
        <CardTitle id={cardId} className='flex items-center gap-2 text-sm font-medium text-gray-600'>
          {Icon && <Icon className='h-4 w-4' aria-hidden='true' />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-1'>
          <div className='text-creator-metric' aria-label={`Current value: ${value}`}>
            {value}
          </div>

          {change && (
            <div id={changeId} className='flex items-center gap-1 text-sm'>
              <span className='sr-only'>
                Change: {change > 0 ? 'increased' : 'decreased'} by {Math.abs(change)}% compared to previous period
              </span>
              <Badge variant={change > 0 ? 'success' : 'destructive'} aria-hidden='true' className='gap-1'>
                {change > 0 ? <TrendingUp className='h-3 w-3' /> : <TrendingDown className='h-3 w-3' />}
                {Math.abs(change)}%
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Live regions for real-time creator dashboard updates
const LiveCreatorDashboardUpdates = ({ newOrderCount, lowStockAlerts, systemAlerts }: LiveDashboardUpdatesProps) => {
  return (
    <>
      {/* Polite updates for non-critical information */}
      <div aria-live='polite' aria-label='Dashboard updates' className='sr-only' role='log'>
        {newOrderCount > 0 && (
          <div>
            {newOrderCount} new order{newOrderCount === 1 ? '' : 's'} received
          </div>
        )}
      </div>

      {/* Assertive updates for critical alerts */}
      <div aria-live='assertive' aria-label='Critical alerts' className='sr-only' role='alert'>
        {lowStockAlerts.map((alert) => (
          <div key={alert.id}>
            Low stock alert: {alert.productName} - {alert.remainingStock} units left
          </div>
        ))}
        {systemAlerts.map((alert) => (
          <div key={alert.id}>System alert: {alert.message}</div>
        ))}
      </div>
    </>
  );
};

// Keyboard navigation for creator workflows
const useKeyboardNavigation = (items: any[], onSelect: (item: any) => void) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (selectedIndex >= 0 && items[selectedIndex]) {
            onSelect(items[selectedIndex]);
          }
          break;
        case 'Escape':
          setSelectedIndex(-1);
          break;
      }
    },
    [items, selectedIndex, onSelect]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { selectedIndex, setSelectedIndex };
};
```

---

## 8. Testing Strategy and Quality Assurance

### 8.1 Comprehensive Device Testing Matrix

```typescript
// Device testing configuration for creator workflows
const deviceTestingMatrix = {
  mobile: [
    { name: 'iPhone SE (2022)', width: 375, height: 667, userAgent: 'iOS Safari' },
    { name: 'iPhone 14 Pro', width: 393, height: 852, userAgent: 'iOS Safari' },
    { name: 'Samsung Galaxy S23', width: 384, height: 854, userAgent: 'Android Chrome' },
    { name: 'Google Pixel 7', width: 412, height: 915, userAgent: 'Android Chrome' },
  ],
  tablet: [
    { name: 'iPad (10th gen)', width: 820, height: 1180, userAgent: 'iPadOS Safari' },
    { name: 'iPad Pro 12.9"', width: 1024, height: 1366, userAgent: 'iPadOS Safari' },
    { name: 'Samsung Galaxy Tab S8', width: 753, height: 1037, userAgent: 'Android Chrome' },
  ],
  desktop: [
    { name: 'MacBook Air M2', width: 1280, height: 800, userAgent: 'macOS Safari' },
    { name: 'MacBook Pro 16"', width: 1728, height: 1117, userAgent: 'macOS Chrome' },
    { name: 'Dell XPS 15', width: 1920, height: 1080, userAgent: 'Windows Chrome' },
    { name: '4K Monitor', width: 2560, height: 1440, userAgent: 'Windows Edge' },
  ],
};

// Automated responsive testing suite
const runResponsiveTests = async () => {
  const testScenarios = [
    'creator-dashboard-load',
    'order-management-workflow',
    'mobile-navigation',
    'touch-interactions',
    'swipe-gestures',
    'keyboard-navigation',
    'screen-reader-accessibility',
  ];

  for (const device of Object.values(deviceTestingMatrix).flat()) {
    for (const scenario of testScenarios) {
      await runDeviceTest(device, scenario);
    }
  }
};
```

### 8.2 Creator User Journey Testing

```typescript
// Persona-based testing scenarios
const creatorPersonaTests = {
  newCreator: {
    profile: {
      device: 'mobile-primary',
      orderVolume: '1-5 per day',
      techComfort: 'basic',
      primaryTasks: ['setup', 'first-order', 'track-shipment', 'customer-support'],
    },
    testScenarios: [
      'onboarding-flow-completion',
      'first-order-processing',
      'mobile-dashboard-navigation',
      'basic-inventory-check',
      'support-ticket-creation',
    ],
  },

  scalingCreator: {
    profile: {
      device: 'tablet-and-mobile',
      orderVolume: '20-50 per day',
      techComfort: 'intermediate',
      primaryTasks: ['bulk-actions', 'analytics-review', 'inventory-management', 'customer-communication'],
    },
    testScenarios: [
      'bulk-order-processing',
      'tablet-dashboard-efficiency',
      'analytics-deep-dive',
      'inventory-alerts-management',
      'multi-device-sync',
    ],
  },

  powerCreator: {
    profile: {
      device: 'desktop-primary-mobile-secondary',
      orderVolume: '500+ per day',
      techComfort: 'advanced',
      primaryTasks: ['advanced-filtering', 'bulk-operations', 'performance-optimization', 'team-management'],
    },
    testScenarios: [
      'advanced-dashboard-customization',
      'bulk-operations-efficiency',
      'keyboard-shortcuts-workflow',
      'multi-monitor-support',
      'team-collaboration-tools',
    ],
  },
};

// Performance testing benchmarks
const performanceBenchmarks = {
  mobile: {
    firstContentfulPaint: '<2.5s',
    largestContentfulPaint: '<4s',
    cumulativeLayoutShift: '<0.1',
    firstInputDelay: '<100ms',
    interactionToNextPaint: '<200ms',
  },
  tablet: {
    firstContentfulPaint: '<2s',
    largestContentfulPaint: '<3s',
    cumulativeLayoutShift: '<0.1',
    firstInputDelay: '<100ms',
    interactionToNextPaint: '<200ms',
  },
  desktop: {
    firstContentfulPaint: '<1.5s',
    largestContentfulPaint: '<2.5s',
    cumulativeLayoutShift: '<0.1',
    firstInputDelay: '<100ms',
    interactionToNextPaint: '<200ms',
  },
};
```

### 8.3 Accessibility Testing Checklist

```typescript
// Comprehensive accessibility testing framework
const accessibilityTestSuite = {
  keyboardNavigation: [
    'tab-order-logical',
    'focus-visible-clear',
    'keyboard-shortcuts-functional',
    'escape-key-dismissal',
    'enter-space-activation',
  ],
  screenReader: [
    'aria-labels-descriptive',
    'heading-structure-logical',
    'live-regions-appropriate',
    'form-labels-associated',
    'button-purposes-clear',
  ],
  visualAccessibility: [
    'color-contrast-wcag-aa',
    'text-scalable-200-percent',
    'focus-indicators-visible',
    'motion-reduced-respected',
    'high-contrast-supported',
  ],
  touchAccessibility: [
    'touch-targets-44px-minimum',
    'swipe-alternatives-provided',
    'long-press-alternatives',
    'gesture-alternatives-keyboard',
    'pointer-cancel-supported',
  ],
};

// Automated accessibility testing
const runAccessibilityTests = async () => {
  const axeConfig = {
    rules: {
      'color-contrast': { enabled: true },
      keyboard: { enabled: true },
      aria: { enabled: true },
      wcag2a: { enabled: true },
      wcag2aa: { enabled: true },
    },
  };

  // Test each major creator workflow
  const workflows = ['/dashboard', '/orders', '/orders/new', '/inventory', '/analytics', '/settings'];

  for (const workflow of workflows) {
    await runAxeTests(workflow, axeConfig);
  }
};
```

---

## Related Documents

### **Core Specifications**

- [S001-DRAFT: Design System Overview](./S001-DRAFT-design-system-overview.md) - Complete design system hub and philosophy
- [S002-DRAFT: Design Tokens](./S002-DRAFT-design-tokens.md) - Complete design system specification with extracted design tokens
- [S004-DRAFT: Component Patterns](./S004-DRAFT-component-patterns.md) - Comprehensive component library patterns

### **Implementation Guides**

- [I001-DRAFT: Implementation Roadmap](../02-implementation/I001-DRAFT-implementation-roadmap.md) - Detailed implementation strategy and timeline
- [I002-DRAFT: Migration Guide](../02-implementation/I002-DRAFT-migration-guide.md) - Step-by-step migration instructions
- [I003-DRAFT: Testing Strategy](../02-implementation/I003-DRAFT-testing-strategy.md) - Complete testing approach and quality assurance

### **Reference Documentation**

- [R001-DRAFT: Usage Guidelines](../03-reference/R001-DRAFT-usage-guidelines.md) - Design system governance and best practices
- [R002-DRAFT: Changelog](../03-reference/R002-DRAFT-changelog.md) - Design system evolution tracking

### **Project Context**

- [CLAUDE.md](../../../CLAUDE.md) - CreatorFlow project context and design philosophy
