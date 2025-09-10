# S004-DRAFT: CreatorFlow Component Patterns

**Document Type**: Specification  
**Initiative**: Design System  
**Status**: DRAFT  
**Created**: 2025-09-10  
**Last Updated**: 2025-09-10

## Executive Summary

This document provides comprehensive implementation patterns for all CreatorFlow components, extracted from **100+ working components** across dashboard, blog, and content systems. Each pattern includes complete TypeScript definitions, CSS implementations, and usage guidelines that preserve the premium, CEO-level user experience.

**Pattern Categories:**

- **Foundation Components**: Cards, buttons, typography, status indicators
- **Dashboard Components**: Metrics, charts, navigation, data tables
- **Content Components**: Blog articles, testimonials, callouts, media
- **Interactive Components**: Forms, modals, animations, gestures

---

## 1. Foundation Component Patterns

### 1.1 Card System

#### **Primary Glass Morphism Card**

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'executive' | 'metric' | 'viral' | 'alert' | 'success';
  interactive?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'primary', interactive = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-2xl border transition-all duration-300',

          // Variant styles
          {
            primary: 'card-primary', // Uses design tokens
            executive:
              'card-executive to-brand-purple-primary/10 border-2 border-brand-teal-primary/20 bg-gradient-to-br from-brand-teal-primary/10',
            metric: 'border-0 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-md',
            viral:
              'animate-pulse-slow border-l-4 border-l-brand-teal-primary bg-gradient-to-br from-pink-50 to-blue-50 shadow-md hover:shadow-lg',
            alert: 'border-l-4 border-l-warning-amber-500 bg-amber-50 shadow-sm',
            success: 'border-l-4 border-l-success-green-500 bg-green-50 shadow-sm',
          }[variant],

          // Interactive styles
          interactive && 'hover:scale-102 cursor-pointer hover:shadow-teal-glow',

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
```

#### **Usage Examples**

```tsx
// Basic metric card
<Card variant="metric">
  <div className="space-y-2">
    <p className="text-sm text-gray-600">Total Orders</p>
    <p className="text-creator-metric">1,247</p>
    <Badge variant="success">↗ 12%</Badge>
  </div>
</Card>

// Interactive dashboard card
<Card variant="executive" interactive onClick={handleCardClick}>
  <div className="flex items-center gap-4">
    <div className="p-3 bg-brand-teal-primary/10 rounded-xl">
      <ShoppingCart className="h-6 w-6 text-brand-teal-primary" />
    </div>
    <div>
      <h3 className="heading-ceo">Command Center</h3>
      <p className="text-sm text-gray-600">Manage all operations</p>
    </div>
  </div>
</Card>

// Viral content emphasis
<Card variant="viral">
  <div className="flex items-center gap-3">
    <div className="w-2 h-2 bg-brand-teal-primary rounded-full animate-pulse"></div>
    <span className="text-creator-viral">Trending Product Alert!</span>
  </div>
</Card>
```

### 1.2 Button System

#### **CEO-Level Button Components**

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'executive' | 'viral' | 'professional' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg' | 'icon' | 'touch' | 'responsive';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', loading = false, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base button styles
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',

          // Variant styles
          {
            primary: 'btn-primary', // Uses design tokens
            executive: 'btn-executive', // Premium gradient
            viral:
              'animate-gradient-x bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-white hover:scale-105 hover:shadow-xl active:scale-95',
            professional: 'bg-brand-teal-primary text-white shadow-sm hover:bg-brand-teal-600 hover:shadow-lg',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            outline:
              'border border-brand-teal-primary text-brand-teal-primary hover:bg-brand-teal-primary hover:text-white',
          }[variant],

          // Size styles
          {
            sm: 'h-8 px-3 text-xs',
            default: 'h-10 px-4 py-2 text-sm',
            lg: 'h-12 px-6 py-3 text-base',
            icon: 'h-10 w-10',
            touch: 'h-12 min-w-[44px] px-6 py-3 text-base', // Mobile optimized
            responsive:
              'h-12 min-w-[44px] px-6 py-3 text-base sm:h-11 sm:px-5 sm:py-2.5 sm:text-sm lg:h-10 lg:px-4 lg:py-2',
          }[size],

          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
        )}
        {icon && <span className='mr-2'>{icon}</span>}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

#### **Usage Examples**

```tsx
// Executive action button
<Button variant="executive" size="lg">
  <Crown className="w-5 h-5" />
  Execute Strategic Order
</Button>

// Viral content button
<Button variant="viral" className="animate-bounce-slow">
  🚀 Launch Viral Campaign
</Button>

// Responsive mobile-first button
<Button variant="primary" size="responsive" loading={isProcessing}>
  Process Orders
</Button>

// Touch-optimized mobile button
<Button variant="professional" size="touch">
  <ShoppingCart className="w-5 h-5" />
  Quick Order
</Button>
```

### 1.3 Typography Patterns

#### **CEO-Level Typography Components**

```tsx
interface HeadingProps {
  level?: 'hero' | 'h1' | 'h2' | 'h3' | 'h4';
  variant?: 'default' | 'ceo' | 'viral' | 'professional';
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ level = 'h1', variant = 'default', className, children }) => {
  const baseClasses = {
    hero: 'text-creator-hero font-black leading-tight tracking-hero',
    h1: 'text-creator-h1 font-bold leading-tight',
    h2: 'text-creator-h2 font-semibold leading-tight',
    h3: 'text-creator-h3 font-medium leading-normal',
    h4: 'text-creator-h4 font-medium leading-normal',
  };

  const variantClasses = {
    default: 'text-gray-900',
    ceo: 'heading-ceo', // Uses design tokens
    viral: 'text-creator-viral', // Gradient text
    professional: 'text-brand-teal-primary',
  };

  const Component = level === 'hero' ? 'h1' : level;

  return <Component className={cn(baseClasses[level], variantClasses[variant], className)}>{children}</Component>;
};

// Metric display component
interface MetricDisplayProps {
  value: string | number;
  label: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({ value, label, change, trend, className }) => {
  return (
    <div className={cn('space-y-1', className)}>
      <p className='text-creator-metric-label'>{label}</p>
      <div className='metric-display'>{value}</div>
      {change && (
        <div className='flex items-center gap-1'>
          <Badge variant={trend === 'up' ? 'success' : trend === 'down' ? 'destructive' : 'secondary'}>
            {trend === 'up' && <TrendingUp className='h-3 w-3' />}
            {trend === 'down' && <TrendingDown className='h-3 w-3' />}
            {Math.abs(change)}%
          </Badge>
        </div>
      )}
    </div>
  );
};
```

#### **Usage Examples**

```tsx
// Hero heading for landing pages
<Heading level="hero" variant="viral">
  Forge Your Creator Empire
</Heading>

// CEO dashboard heading
<Heading level="h1" variant="ceo">
  Command Center
</Heading>

// Professional metric display
<MetricDisplay
  value="$127,384"
  label="Monthly Revenue"
  change={23}
  trend="up"
/>

// Blog content heading
<Heading level="h2" variant="professional">
  Advanced TikTok Shop Strategies
</Heading>
```

### 1.4 Status and Badge System

#### **Premium Status Components**

```tsx
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'automated' | 'viral';
  size?: 'sm' | 'default' | 'lg';
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', pulse = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base badge styles
          'inline-flex items-center rounded-full font-medium transition-all duration-300',

          // Size styles
          {
            sm: 'px-2 py-1 text-xs',
            default: 'px-3 py-1.5 text-sm',
            lg: 'px-4 py-2 text-base',
          }[size],

          // Variant styles
          {
            default: 'border border-gray-200 bg-gray-100 text-gray-800',
            success: 'status-success', // Uses design tokens
            warning: 'status-warning',
            error: 'bg-error-red-100 text-error-red-800 border-error-red-200 border',
            info: 'border border-blue-200 bg-blue-100 text-blue-800',
            automated: 'status-automated', // Animated gradient
            viral: 'animate-pulse-slow bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg',
          }[variant],

          // Pulse animation
          pulse && 'animate-pulse',

          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

// Advanced status indicator with icons
interface StatusIndicatorProps {
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'automated';
  label?: string;
  showIcon?: boolean;
  animated?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, showIcon = true, animated = true }) => {
  const statusConfig = {
    pending: {
      badge: 'warning' as const,
      icon: Clock,
      label: label || 'Pending Review',
      pulse: false,
    },
    processing: {
      badge: 'info' as const,
      icon: RefreshCw,
      label: label || 'Processing',
      pulse: true,
    },
    completed: {
      badge: 'success' as const,
      icon: CheckCircle,
      label: label || 'Completed',
      pulse: false,
    },
    failed: {
      badge: 'error' as const,
      icon: XCircle,
      label: label || 'Failed',
      pulse: false,
    },
    automated: {
      badge: 'automated' as const,
      icon: Zap,
      label: label || 'Automated',
      pulse: true,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.badge} pulse={animated && config.pulse} className='gap-1.5'>
      {showIcon && (
        <Icon
          className={cn(
            'h-3 w-3',
            status === 'processing' && animated && 'animate-spin',
            status === 'automated' && animated && 'animate-bounce'
          )}
        />
      )}
      {config.label}
    </Badge>
  );
};
```

#### **Usage Examples**

```tsx
// Order status tracking
<StatusIndicator status="processing" animated />
<StatusIndicator status="completed" />
<StatusIndicator status="automated" label="Auto-fulfilled" />

// Metric badges
<Badge variant="success">
  <TrendingUp className="w-3 h-3" />
  +23%
</Badge>

<Badge variant="viral" pulse>
  🚀 Trending
</Badge>

// Alert indicators
<Badge variant="warning" size="lg">
  ⚠️ Low Stock Alert
</Badge>
```

---

## 2. Dashboard Component Patterns

### 2.1 Metrics Dashboard Cards

#### **Advanced Dashboard Metrics**

```tsx
interface DashboardMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: number;
    period: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'executive' | 'viral';
  loading?: boolean;
  onClick?: () => void;
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  variant = 'default',
  loading = false,
  onClick,
}) => {
  if (loading) {
    return (
      <Card variant='metric' className='p-6'>
        <div className='space-y-3'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-8 w-16' />
          <Skeleton className='h-3 w-12' />
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant={variant === 'executive' ? 'executive' : 'metric'}
      interactive={!!onClick}
      onClick={onClick}
      className={cn('space-y-4 p-6', variant === 'viral' && 'animate-heartbeat')}
    >
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <p className='text-creator-metric-label'>{title}</p>
          {subtitle && <p className='text-xs text-gray-500'>{subtitle}</p>}
        </div>
        {Icon && (
          <div
            className={cn(
              'rounded-xl p-3',
              variant === 'executive' ? 'bg-brand-teal-primary/10' : 'bg-gray-100',
              variant === 'viral' && 'animate-pulse'
            )}
          >
            <Icon className={cn('h-6 w-6', variant === 'executive' ? 'text-brand-teal-primary' : 'text-gray-600')} />
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <div
          className={cn(
            'text-2xl font-bold sm:text-3xl',
            variant === 'executive' && 'text-brand-teal-primary',
            variant === 'viral' && 'text-creator-viral'
          )}
        >
          {value}
        </div>

        {change && (
          <div className='flex items-center gap-2'>
            <Badge
              variant={change.trend === 'up' ? 'success' : change.trend === 'down' ? 'warning' : 'default'}
              size='sm'
              className='gap-1'
            >
              {change.trend === 'up' && <TrendingUp className='h-3 w-3' />}
              {change.trend === 'down' && <TrendingDown className='h-3 w-3' />}
              {Math.abs(change.value)}%
            </Badge>
            <span className='text-xs text-gray-500'>vs {change.period}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
```

#### **Usage Examples**

```tsx
// Executive revenue card
<DashboardMetricCard
  title="Monthly Revenue"
  value="$127,384"
  subtitle="TikTok Shop Sales"
  change={{
    value: 23,
    period: "last month",
    trend: "up"
  }}
  icon={DollarSign}
  variant="executive"
  onClick={handleRevenueClick}
/>

// Viral product alert
<DashboardMetricCard
  title="Trending Product"
  value="iPhone Cases"
  subtitle="Hot seller alert!"
  icon={TrendingUp}
  variant="viral"
/>

// Standard order metric
<DashboardMetricCard
  title="Orders Today"
  value={47}
  change={{
    value: 12,
    period: "yesterday",
    trend: "up"
  }}
  icon={ShoppingCart}
  loading={isLoading}
/>
```

### 2.2 Chart Integration Patterns

#### **EvilCharts Enhanced Components**

```tsx
interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  actions,
  loading = false,
  className,
}) => {
  return (
    <Card className={cn('p-6', className)}>
      <div className='space-y-6'>
        {/* Chart header */}
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h3 className='text-creator-h3'>{title}</h3>
            {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
          </div>
          {actions && <div className='flex items-center gap-2'>{actions}</div>}
        </div>

        {/* Chart content */}
        <div className='relative'>
          {loading ? (
            <div className='flex h-64 items-center justify-center'>
              <div className='w-full space-y-4'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>
          ) : (
            <div className='chart-container-enhanced'>{children}</div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Brand-enhanced chart colors
export const chartColors = {
  primary: 'var(--brand-teal-primary)',
  secondary: 'var(--brand-purple-primary)',
  tertiary: 'var(--brand-blue-primary)',
  success: 'var(--success-green-500)',
  warning: 'var(--warning-amber-500)',
  gradients: {
    brandPrimary: 'linear-gradient(90deg, var(--brand-teal-primary) 0%, var(--brand-purple-primary) 100%)',
    success: 'linear-gradient(90deg, var(--success-green-400) 0%, var(--success-green-600) 100%)',
    warning: 'linear-gradient(90deg, var(--warning-amber-400) 0%, var(--warning-amber-600) 100%)',
  },
};
```

#### **Usage Examples**

```tsx
// Revenue chart with brand styling
<ChartContainer
  title="Revenue Trends"
  subtitle="Last 30 days performance"
  actions={
    <Button variant="outline" size="sm">
      <Download className="w-4 h-4" />
      Export
    </Button>
  }
>
  <LineChart
    data={revenueData}
    colors={[chartColors.primary, chartColors.secondary]}
    gradient={chartColors.gradients.brandPrimary}
  />
</ChartContainer>

// Order volume with glass morphism
<ChartContainer
  title="Order Volume"
  className="glass-card backdrop-blur-xl"
>
  <BarChart
    data={orderData}
    colors={[chartColors.success, chartColors.warning]}
  />
</ChartContainer>
```

---

## 3. Content Component Patterns

### 3.1 Blog and Article Components

#### **Content Hero Components**

```tsx
interface ContentHeroProps {
  title: string;
  subtitle?: string;
  category?: string;
  author?: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt?: string;
  readTime?: string;
  backgroundImage?: string;
  variant?: 'default' | 'minimal' | 'magazine';
}

const ContentHero: React.FC<ContentHeroProps> = ({
  title,
  subtitle,
  category,
  author,
  publishedAt,
  readTime,
  backgroundImage,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'content-hero',
        variant === 'minimal' && 'max-h-[400px] min-h-[300px]',
        variant === 'magazine' && 'max-h-[700px] min-h-[500px]'
      )}
    >
      {/* Background */}
      {backgroundImage && (
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className='glass-hero-overlay' />
        </div>
      )}

      {/* Content */}
      <div className='relative z-10 mx-auto max-w-4xl space-y-6 px-6 text-center'>
        {category && (
          <Badge variant='viral' className='content-category'>
            {category}
          </Badge>
        )}

        <div className='space-y-4'>
          <h1 className='animate-hero-character-forge text-content-hero'>{title}</h1>
          {subtitle && <p className='mx-auto max-w-2xl text-xl text-blog-dark-content sm:text-2xl'>{subtitle}</p>}
        </div>

        {(author || publishedAt || readTime) && (
          <div className='flex flex-wrap items-center justify-center gap-4 text-content-meta'>
            {author && (
              <div className='flex items-center gap-3'>
                <CreatorAvatar user={author} size='sm' />
                <div className='text-left'>
                  <p className='font-medium text-blog-dark-title'>{author.name}</p>
                  <p className='text-blog-dark-meta'>{author.role}</p>
                </div>
              </div>
            )}
            <div className='flex items-center gap-4 text-blog-dark-meta'>
              {publishedAt && (
                <span className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  {publishedAt}
                </span>
              )}
              {readTime && (
                <span className='flex items-center gap-1'>
                  <Clock className='h-4 w-4' />
                  {readTime}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

#### **Testimonial Blocks**

```tsx
interface TestimonialProps {
  quote: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    company?: string;
  };
  variant?: 'default' | 'featured' | 'minimal';
  rating?: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, variant = 'default', rating }) => {
  return (
    <div
      className={cn(
        'testimonial-block',
        variant === 'featured' && 'relative overflow-hidden border-2 border-brand-teal-primary/20',
        variant === 'minimal' && 'border-l-4 border-l-brand-teal-primary bg-transparent pl-6'
      )}
    >
      {/* Quote icon */}
      <div className='absolute right-4 top-4 opacity-10'>
        <Quote className='h-12 w-12 text-brand-teal-primary' />
      </div>

      {/* Rating */}
      {rating && (
        <div className='mb-4 flex items-center gap-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('h-4 w-4', i < rating ? 'fill-current text-yellow-400' : 'text-gray-300')} />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className='testimonial-quote mb-6'>"{quote}"</blockquote>

      {/* Author */}
      <div className='testimonial-author'>
        <CreatorAvatar user={author} size='default' className='testimonial-avatar' />
        <div>
          <p className='font-semibold text-blog-dark-title'>{author.name}</p>
          <p className='text-sm text-blog-dark-meta'>{author.role}</p>
          {author.company && <p className='text-xs text-blog-dark-meta'>{author.company}</p>}
        </div>
      </div>
    </div>
  );
};
```

### 3.2 Interactive Content Components

#### **Key Takeaways Component**

```tsx
interface KeyTakeawaysProps {
  title?: string;
  items: Array<{
    id: string;
    text: string;
    icon?: React.ReactNode;
  }>;
  variant?: 'default' | 'checklist' | 'numbered';
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ title = 'Key Takeaways', items, variant = 'default' }) => {
  return (
    <div className='key-takeaways'>
      <div className='key-takeaways-title'>
        <Lightbulb className='mr-2 h-5 w-5 text-blog-dark-accent' />
        {title}
      </div>

      <ul className='key-takeaways-list'>
        {items.map((item, index) => (
          <li key={item.id} className='key-takeaways-item'>
            <div className='key-takeaways-icon'>
              {variant === 'numbered' ? (
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-brand-teal-primary text-sm font-bold text-white'>
                  {index + 1}
                </div>
              ) : variant === 'checklist' ? (
                <CheckCircle className='h-5 w-5' />
              ) : (
                item.icon || <ArrowRight className='h-5 w-5' />
              )}
            </div>
            <div className='flex-1'>{item.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

#### **Table of Contents Component**

```tsx
interface TableOfContentsProps {
  items: Array<{
    id: string;
    title: string;
    level: 2 | 3 | 4;
    anchor: string;
  }>;
  activeId?: string;
  onItemClick?: (anchor: string) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, activeId, onItemClick }) => {
  const [reticleStyle, setReticleStyle] = useState<React.CSSProperties>({});
  const [isLocking, setIsLocking] = useState(false);

  const handleItemClick = (anchor: string) => {
    setIsLocking(true);
    setTimeout(() => setIsLocking(false), 400);
    onItemClick?.(anchor);
  };

  useEffect(() => {
    if (activeId) {
      const activeElement = document.querySelector(`[data-toc-id="${activeId}"]`);
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const containerRect = activeElement.parentElement?.getBoundingClientRect();
        if (containerRect) {
          setReticleStyle({
            transform: `translateY(${rect.top - containerRect.top}px)`,
            height: `${rect.height}px`,
            opacity: 1,
          });
        }
      }
    }
  }, [activeId]);

  return (
    <div className='table-of-contents'>
      <div className='table-of-contents-title'>
        <Target className='mr-2 h-4 w-4' />
        Navigation Command
      </div>

      <div className='relative'>
        {/* Targeting reticle */}
        <div
          className={cn('targeting-reticle', activeId && 'is-active', isLocking && 'is-locking')}
          style={reticleStyle}
        />

        <ul className='table-of-contents-list'>
          {items.map((item) => (
            <li key={item.id} className='table-of-contents-item' data-level={item.level} data-toc-id={item.id}>
              <button
                className={cn('table-of-contents-link w-full text-left', activeId === item.id && 'active')}
                onClick={() => handleItemClick(item.anchor)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

---

## 4. Animation and Motion Patterns

### 4.1 Framer Motion Configurations

#### **Standard Animation Variants**

```tsx
// Container animations for staggered reveals
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Item animations for cards and components
export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

// Hero text animation
export const heroTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    textShadow: '0 0 50px rgba(255,255,255,1)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    textShadow: '0 0 15px rgba(45, 212, 191, 0.3)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Card hover animations
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 20px 0 rgba(52, 211, 153, 0.4)',
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};
```

#### **Usage Examples**

```tsx
// Animated card grid
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {cards.map((card) => (
    <motion.div
      key={card.id}
      variants={itemVariants}
      whileHover="hover"
      initial="rest"
    >
      <Card>{card.content}</Card>
    </motion.div>
  ))}
</motion.div>

// Hero section with text animation
<motion.div
  variants={heroTextVariants}
  initial="hidden"
  animate="visible"
  className="content-hero"
>
  <h1 className="text-content-hero">
    Forge Your Creator Empire
  </h1>
</motion.div>

// Interactive dashboard card
<motion.div
  variants={cardHoverVariants}
  initial="rest"
  whileHover="hover"
  whileTap={{ scale: 0.98 }}
  onClick={handleClick}
>
  <DashboardMetricCard {...cardProps} />
</motion.div>
```

### 4.2 Loading and Skeleton Patterns

#### **Progressive Loading Components**

```tsx
interface LoadingStateProps {
  type: 'dashboard' | 'content' | 'table' | 'chart';
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingStateProps> = ({ type, count = 1, className }) => {
  const skeletonPatterns = {
    dashboard: (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className='space-y-4 p-6'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-10 rounded-xl' />
            </div>
            <Skeleton className='h-8 w-16' />
            <Skeleton className='h-4 w-12' />
          </Card>
        ))}
      </div>
    ),

    content: (
      <div className='space-y-6'>
        <div className='space-y-3'>
          <Skeleton className='h-12 w-3/4' />
          <Skeleton className='h-6 w-1/2' />
        </div>
        <div className='space-y-2'>
          {Array.from({ length: count || 3 }).map((_, i) => (
            <Skeleton key={i} className='h-4 w-full' />
          ))}
        </div>
      </div>
    ),

    table: (
      <Card className='overflow-hidden'>
        <div className='p-0'>
          {Array.from({ length: count || 5 }).map((_, i) => (
            <div key={i} className='flex items-center space-x-4 border-b p-4 last:border-b-0'>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-6 w-16' />
            </div>
          ))}
        </div>
      </Card>
    ),

    chart: (
      <Card className='p-6'>
        <div className='space-y-6'>
          <div className='flex justify-between'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-8 w-20' />
          </div>
          <div className='h-64 space-y-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </div>
      </Card>
    ),
  };

  return <div className={cn('animate-pulse', className)}>{skeletonPatterns[type]}</div>;
};
```

---

## Related Documents

### **Core Specifications**

- [S001-DRAFT: Design System Overview](./S001-DRAFT-design-system-overview.md) - Design system overview and navigation hub
- [S002-DRAFT: Design Tokens](./S002-DRAFT-design-tokens.md) - Complete design token system and CSS implementation
- [S003-DRAFT: Responsive Design System](./S003-DRAFT-responsive-design-system.md) - Mobile-first responsive patterns and breakpoints

### **Implementation Guides**

- [I001-DRAFT: Implementation Roadmap](../02-implementation/I001-DRAFT-implementation-roadmap.md) - Step-by-step implementation strategy
- [I002-DRAFT: Migration Guide](../02-implementation/I002-DRAFT-migration-guide.md) - Migration from hard-coded values to design tokens
- [I003-DRAFT: Testing Strategy](../02-implementation/I003-DRAFT-testing-strategy.md) - Quality assurance and testing approach

### **Reference Documentation**

- [R001-DRAFT: Usage Guidelines](../03-reference/R001-DRAFT-usage-guidelines.md) - Design system governance and best practices
- [R002-DRAFT: Changelog](../03-reference/R002-DRAFT-changelog.md) - Design system evolution tracking

### **Project Context**

- [CLAUDE.md](../../../CLAUDE.md) - CreatorFlow project context and philosophy
