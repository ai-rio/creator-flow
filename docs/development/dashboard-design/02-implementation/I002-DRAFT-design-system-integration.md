# CreatorFlow Design System Integration Guide

## 1. Extending Existing Shadcn/UI Components

### 1.1 Enhancing Button Component for Creator Economy

Based on the existing button component at `/src/components/ui/button.tsx`, here are the creator-specific enhancements:

```typescript
// src/components/ui/button.tsx (Enhanced)
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { SexyBoarder } from '../sexy-boarder'; // Existing component

const buttonVariants = cva(
  'w-fit inline-flex items-center justify-center whitespace-nowrap text-sm rounded-md font-alt font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        orange: 'bg-orange-500 hover:bg-orange-400',
        sexy: 'transition-all bg-black hover:bg-opacity-0',
        
        // NEW: Creator-specific variants
        tiktok: 'bg-gradient-to-r from-[#ff0050] to-[#25f4ee] text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300',
        viral: 'bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-white animate-pulse-slow hover:shadow-xl',
        creator: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300',
        success: 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md',
        warning: 'bg-amber-500 text-white hover:bg-amber-600',
        creator-outline: 'border-2 border-[#ff0050] text-[#ff0050] hover:bg-[#ff0050] hover:text-white transition-all duration-300'
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        touch: 'h-12 px-6 py-3 text-base min-w-[44px]', // WCAG touch target
        creator: 'h-11 px-6 py-2.5 text-sm font-medium' // Optimized for creator workflow
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Enhanced props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean; // NEW: Loading state support
  icon?: React.ReactNode; // NEW: Icon support
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <WithSexyBorder variant={variant} className={cn('w-fit', className)}>
        <Comp 
          className={cn(buttonVariants({ variant, size, className }))} 
          ref={ref} 
          disabled={loading || props.disabled}
          {...props}
        >
          {loading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {icon && !loading && <span className="mr-2">{icon}</span>}
          {children}
        </Comp>
      </WithSexyBorder>
    );
  }
);
Button.displayName = 'Button';

// Keep existing WithSexyBorder component logic
export function WithSexyBorder({
  variant,
  className,
  children,
}: {
  variant: string | null | undefined;
  className?: string;
  children: React.ReactNode;
}) {
  if (variant === 'sexy') {
    return <SexyBoarder className={className}>{children}</SexyBoarder>;
  } else {
    return <>{children}</>;
  }
}

export { Button, buttonVariants };
```

### 1.2 Creating Missing Shadcn/UI Components

We need several components that aren't in the existing codebase:

```typescript
// src/components/ui/card.tsx (NEW - Required for dashboard)
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

```typescript
// src/components/ui/badge.tsx (NEW - Required for status indicators)
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        
        // Creator-specific badge variants
        tiktok: "border-transparent bg-gradient-to-r from-[#ff0050] to-[#25f4ee] text-white",
        viral: "border-transparent bg-gradient-to-r from-orange-400 to-pink-400 text-white animate-pulse-slow",
        success: "border-transparent bg-green-100 text-green-800",
        warning: "border-transparent bg-amber-100 text-amber-800",
        processing: "border-transparent bg-blue-100 text-blue-800",
        shipped: "border-transparent bg-purple-100 text-purple-800",
        delivered: "border-transparent bg-green-100 text-green-800"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

```typescript
// src/components/ui/progress.tsx (NEW - Required for order progress)
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

```typescript
// src/components/ui/skeleton.tsx (NEW - Required for loading states)
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

## 2. CSS Customizations for CreatorFlow Theme

### 2.1 Enhanced Global Styles

Update `/src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 6% 10%;
    --foreground: 60 0% 90%;
    --muted: 240 6% 10%;
    --muted-foreground: 240 5% 84%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
    --ring: 215 20.2% 65.1%;
    --radius: 0.5rem;

    /* NEW: CreatorFlow-specific CSS variables */
    --creator-pink: 255 0 80;
    --creator-blue: 37 244 238;
    --creator-black: 22 24 35;
    --creator-gray: 248 248 248;
    
    /* Semantic colors for creator workflow */
    --success-green: 16 185 129;
    --warning-amber: 245 158 11;
    --error-red: 239 68 68;
    
    /* Dashboard specific */
    --dashboard-bg: 250 250 250;
    --viral-gradient: linear-gradient(135deg, rgb(255 0 80) 0%, rgb(37 244 238) 100%);
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
    --border: 216 34% 17%;
    --input: 216 34% 17%;
    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --ring: 216 34% 17%;
    --radius: 0.5rem;
    
    /* Dark mode creator colors */
    --dashboard-bg: 15 15 15;
  }
  
  /* Existing styles preserved */
  ::selection {
    @apply text-black;
    @apply bg-cyan-400;
  }
  *:focus-visible {
    @apply outline;
    @apply outline-2;
    @apply outline-offset-2;
    @apply outline-pink-500;
  }
  * {
    @apply border-border;
    @apply min-w-0;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
  html {
    @apply h-full;
  }
  body {
    @apply h-full;
  }
  h1 {
    @apply font-bold;
    @apply text-4xl;
    @apply text-white;
    @apply lg:text-6xl;
    @apply bg-clip-text;
    @apply drop-shadow-[0_0_15px_rgba(0,0,0,1)];
    @apply lg:text-transparent;
    @apply lg:bg-gradient-to-br;
    @apply from-white;
    @apply to-neutral-400;
  }
}

/* NEW: Creator-specific utility classes */
@layer components {
  .creator-gradient {
    background: var(--viral-gradient);
  }
  
  .creator-card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md;
  }
  
  .creator-button-touch {
    @apply min-h-[44px] min-w-[44px] touch-manipulation;
  }
  
  .viral-glow {
    box-shadow: 0 0 20px rgba(255, 0, 80, 0.3);
  }
  
  .dashboard-container {
    @apply px-4 pb-20 md:pb-6 md:px-6 lg:px-8 max-w-7xl mx-auto;
  }
}

/* NEW: Creator-specific animations */
@layer utilities {
  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite;
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease infinite;
  }
  
  /* Mobile-first spacing utilities */
  .space-y-creator {
    @apply space-y-4 md:space-y-6 lg:space-y-8;
  }
  
  .gap-creator {
    @apply gap-4 md:gap-6 lg:gap-8;
  }
}

/* Safe area support for mobile devices */
@supports(padding: max(0px)) {
  .safe-area-bottom {
    padding-bottom: max(env(safe-area-inset-bottom), 1rem);
  }
}
```

### 2.2 Tailwind Config Enhancements

Update `/tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        
        // NEW: CreatorFlow brand colors
        creator: {
          pink: {
            DEFAULT: 'rgb(var(--creator-pink))',
            50: '#fef7ff',
            100: '#fdeeff',
            200: '#fbddff',
            300: '#f7baff',
            400: '#f186ff',
            500: '#e854f7',
            600: '#d532e6',
            700: '#b522c8',
            800: '#941da3',
            900: '#771c83',
            950: '#ff0050', // TikTok brand pink
          },
          blue: {
            DEFAULT: 'rgb(var(--creator-blue))',
            50: '#f0fdfc',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#25f4ee', // TikTok brand blue
          },
          black: 'rgb(var(--creator-black))',
          gray: 'rgb(var(--creator-gray))',
        },
        
        // Semantic colors for creator workflow
        success: {
          DEFAULT: 'rgb(var(--success-green))',
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          DEFAULT: 'rgb(var(--warning-amber))',
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        
        // Keep existing brand colors
        'forest-green': 'hsl(var(--forest-green))',
        'equipment-yellow': 'hsl(var(--equipment-yellow))',
        'light-concrete': 'hsl(var(--light-concrete))',
        'stone-gray': 'hsl(var(--stone-gray))',
        'charcoal': 'hsl(var(--charcoal))',
        'paper-white': 'hsl(var(--paper-white))',
        'success-green': 'hsl(var(--success-green))',
        'error-red': 'hsl(var(--error-red))',
        'info-blue': 'hsl(var(--info-blue))',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-roboto-mono)', ...fontFamily.mono],
        handwriting: ['var(--font-kalam)', 'cursive'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'spin-slow': {
          '0%': { rotate: '0deg' },
          '100%': { rotate: '360deg' },
        },
        // NEW: Creator-specific animations
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 10s linear infinite',
        // NEW: Creator-specific animations
        'pulse-slow': 'pulse-slow 3s infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'slide-in-from-top': 'slide-in-from-top 0.2s ease-out',
      },
      // NEW: Mobile-first spacing scale
      spacing: {
        'creator-xs': '0.5rem',
        'creator-sm': '1rem',
        'creator-md': '1.5rem',
        'creator-lg': '2rem',
        'creator-xl': '3rem',
        'safe-area-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // NEW: Custom plugin for creator utilities
    function({ addUtilities }) {
      const creatorUtilities = {
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.touch-pan-x': {
          'touch-action': 'pan-x',
        },
        '.transform-gpu': {
          'transform': 'translateZ(0)',
        },
        '.safe-area-bottom': {
          'padding-bottom': 'max(env(safe-area-inset-bottom), 1rem)',
        },
      };
      addUtilities(creatorUtilities);
    },
  ],
};

export default config;
```

## 3. Layout Integration Strategy

### 3.1 Dashboard Page Implementation

Create the main dashboard page:

```typescript
// src/app/(dashboard)/dashboard/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout';
import { getSession } from '@/features/account/controllers/get-session';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard | CreatorFlow',
  description: 'Your TikTok Shop fulfillment command center',
};

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <ResponsiveLayout>
      <div className="dashboard-container">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {session.user.user_metadata?.username || 'Creator'}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your TikTok Shop today
          </p>
        </div>
        
        <DashboardOverview />
      </div>
    </ResponsiveLayout>
  );
}
```

### 3.2 Dashboard Overview Component

```typescript
// src/components/dashboard/DashboardOverview.tsx
'use client';

import React from 'react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { ViralContentAlert } from '@/components/dashboard/ViralContentAlert';
import { RevenueChart } from '@/components/analytics/RevenueChart';
import { OrderListPreview } from '@/components/orders/OrderListPreview';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useViralContent } from '@/hooks/useViralContent';
import { DollarSign, Package, TrendingUp, CheckCircle } from 'lucide-react';

export function DashboardOverview() {
  const { metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { viralContent, isLoading: viralLoading } = useViralContent();

  return (
    <div className="space-y-creator">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-creator">
        <DashboardCard
          title="Today's Revenue"
          value={metrics ? `$${metrics.revenue.today.toLocaleString()}` : '$0'}
          change={metrics?.revenue.change}
          trend={metrics?.revenue.trend || 'neutral'}
          icon={DollarSign}
          loading={metricsLoading}
          variant="creator"
        />
        <DashboardCard
          title="Orders"
          value={metrics?.orders.count || 0}
          change={metrics?.orders.change}
          trend={metrics?.orders.change && metrics.orders.change > 0 ? 'up' : 'down'}
          icon={Package}
          loading={metricsLoading}
          variant="creator"
        />
        <DashboardCard
          title="Conversion Rate"
          value={metrics ? `${metrics.conversion.rate}%` : '0%'}
          change={metrics?.conversion.change}
          trend={metrics?.conversion.change && metrics.conversion.change > 0 ? 'up' : 'down'}
          icon={TrendingUp}
          loading={metricsLoading}
          variant="creator"
        />
        <DashboardCard
          title="Fulfillment Rate"
          value={metrics ? `${metrics.fulfillment.rate}%` : '0%'}
          change={metrics?.fulfillment.change}
          trend={metrics?.fulfillment.change && metrics.fulfillment.change > 0 ? 'up' : 'down'}
          icon={CheckCircle}
          loading={metricsLoading}
          variant="creator"
        />
      </div>

      {/* Viral Content Alerts */}
      {!viralLoading && viralContent && viralContent.length > 0 && (
        <div className="space-y-4">
          {viralContent.slice(0, 2).map((content) => (
            <ViralContentAlert
              key={content.videoId}
              videoId={content.videoId}
              metrics={{
                views: content.views,
                orders: content.orders,
                revenue: content.revenue,
                revenueIncrease: content.revenueIncrease,
                stockLevel: content.stockLevel,
                productName: content.productName
              }}
              onViewVideo={() => {
                // Handle view video action
                window.open(`https://tiktok.com/video/${content.videoId}`, '_blank');
              }}
              onRestock={() => {
                // Handle restock action
                console.log('Restock action for', content.productName);
              }}
            />
          ))}
        </div>
      )}

      {/* Chart and Order Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-creator">
        <RevenueChart
          data={[]} // This will be populated from API
          timeframe="30d"
          onTimeframeChange={() => {}}
          loading={metricsLoading}
        />
        
        <OrderListPreview />
      </div>
    </div>
  );
}
```

## 4. Route Organization

### 4.1 Dashboard Route Group Structure

```
src/app/(dashboard)/
├── layout.tsx              # Dashboard-specific layout
├── dashboard/
│   └── page.tsx            # Main dashboard overview
├── orders/
│   ├── page.tsx            # Order list view
│   └── [id]/
│       └── page.tsx        # Order detail view
├── analytics/
│   └── page.tsx            # Analytics dashboard
├── settings/
│   └── page.tsx            # Creator settings
└── admin/
    ├── page.tsx            # Admin dashboard
    ├── users/
    │   └── page.tsx        # User management
    └── system/
        └── page.tsx        # System health
```

### 4.2 Dashboard Layout Component

```typescript
// src/app/(dashboard)/layout.tsx
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout';
import { getSession } from '@/features/account/controllers/get-session';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <ResponsiveLayout showMobileNav={true}>
      {children}
    </ResponsiveLayout>
  );
}
```

## 5. Data Integration Points

### 5.1 API Route Integration

```typescript
// src/app/api/dashboard/metrics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/features/account/controllers/get-session';

export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // This would integrate with your existing Supabase queries
  const metrics = {
    revenue: {
      today: 2847,
      change: 15.3,
      trend: 'up' as const
    },
    orders: {
      count: 47,
      change: 12.5,
      byStatus: {
        pending: 5,
        processing: 15,
        shipped: 20,
        delivered: 7
      }
    },
    fulfillment: {
      rate: 94.2,
      change: 2.1
    },
    conversion: {
      rate: 3.4,
      change: 0.8
    }
  };

  return NextResponse.json(metrics);
}
```

### 5.2 Database Integration Hooks

```typescript
// src/hooks/useDashboardMetrics.ts
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const supabase = createClient();
      
      // Example integration with existing Supabase setup
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      const { data: revenue } = await supabase
        .from('orders')
        .select('amount')
        .eq('status', 'completed')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      // Transform data to match dashboard metrics interface
      return {
        revenue: {
          today: revenue?.reduce((sum, order) => sum + order.amount, 0) || 0,
          change: 15.3, // Calculate from historical data
          trend: 'up' as const
        },
        orders: {
          count: orders?.length || 0,
          change: 12.5, // Calculate from historical data
          byStatus: {} // Group orders by status
        },
        // ... other metrics
      };
    },
    refetchInterval: 30000,
  });
}
```

This integration guide provides a complete roadmap for implementing the CreatorFlow dashboard components while leveraging the existing codebase structure and maintaining consistency with the established patterns.