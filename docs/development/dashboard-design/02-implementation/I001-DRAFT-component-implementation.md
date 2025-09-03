# CreatorFlow Dashboard Component Implementation Guide

## 1. Core Dashboard Components Implementation

### 1.1 DashboardCard Component

```typescript
// src/components/dashboard/DashboardCard.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  loading?: boolean;
  variant?: 'creator' | 'admin';
  className?: string;
}

export function DashboardCard({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  loading = false,
  variant = 'creator',
  className
}: DashboardCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-16" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      variant === 'creator' && "bg-gradient-to-br from-white to-gray-50 border-0 shadow-sm",
      variant === 'admin' && "bg-white border border-gray-200",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-full",
          variant === 'creator' ? "bg-primary/10" : "bg-blue-100"
        )}>
          <Icon className={cn(
            "h-4 w-4",
            variant === 'creator' ? "text-primary" : "text-blue-600"
          )} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {change !== undefined && (
            <Badge variant="secondary" className={cn("text-xs", getTrendColor())}>
              {getTrendIcon()} {change > 0 ? '+' : ''}{change}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 1.2 ViralContentAlert Component

```typescript
// src/components/dashboard/ViralContentAlert.tsx
import React from 'react';
import { TrendingUp, Eye, DollarSign, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ViralContentAlertProps {
  videoId: string;
  metrics: {
    views: number;
    orders: number;
    revenue: number;
    revenueIncrease: number;
    stockLevel: number;
    productName: string;
  };
  onViewVideo?: () => void;
  onRestock?: () => void;
  className?: string;
}

export function ViralContentAlert({
  videoId,
  metrics,
  onViewVideo,
  onRestock,
  className
}: ViralContentAlertProps) {
  const isLowStock = metrics.stockLevel < 50;

  return (
    <Card className={cn(
      "border-l-4 border-l-[#ff0050] bg-gradient-to-r from-pink-50/50 to-blue-50/50",
      "animate-pulse-slow", // Custom animation for viral content
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-[#ff0050] to-[#25f4ee] rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                🔥 Viral Content Alert
                <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                  VIRAL
                </Badge>
              </CardTitle>
              <p className="text-sm text-gray-600">Video #{videoId}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Views</p>
              <p className="font-semibold">{metrics.views.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Orders</p>
              <p className="font-semibold text-green-600">+{metrics.orders}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="font-semibold text-green-600">
                +${metrics.revenue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Increase</p>
              <p className="font-semibold text-green-600">
                +{metrics.revenueIncrease}%
              </p>
            </div>
          </div>
        </div>

        {/* Stock Alert */}
        {isLowStock && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-amber-600" />
              <p className="text-sm text-amber-800">
                <strong>Stock Alert:</strong> {metrics.productName} - Only {metrics.stockLevel} left
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={onViewVideo}
            className="bg-gradient-to-r from-[#ff0050] to-[#25f4ee] hover:opacity-90 text-white flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Video
          </Button>
          <Button 
            onClick={onRestock}
            variant="outline"
            className={cn(
              "flex-1",
              isLowStock && "border-amber-300 text-amber-700 hover:bg-amber-50"
            )}
          >
            <Package className="h-4 w-4 mr-2" />
            {isLowStock ? 'Restock Now' : 'Boost Inventory'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Custom animation for viral content
// Add to globals.css:
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}
*/
```

### 1.3 OrderListItem Component

```typescript
// src/components/orders/OrderListItem.tsx
import React from 'react';
import { Package, MapPin, Clock, Check, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  tiktok_order_id: string;
  customer_username: string;
  product_name: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shipping_address: {
    city: string;
    state: string;
  };
  created_at: string;
}

interface OrderListItemProps {
  order: Order;
  isSelected?: boolean;
  onSelect?: (orderId: string) => void;
  showActions?: boolean;
  variant?: 'mobile' | 'desktop';
  className?: string;
}

export function OrderListItem({
  order,
  isSelected = false,
  onSelect,
  showActions = true,
  variant = 'mobile',
  className
}: OrderListItemProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-amber-100 text-amber-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressValue = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 25;
      case 'processing': return 50;
      case 'shipped': return 75;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'delivered': return Check;
      default: return Package;
    }
  };

  const StatusIcon = getStatusIcon(order.status);

  if (variant === 'desktop') {
    return (
      <tr className={cn("border-b border-gray-200 hover:bg-gray-50", className)}>
        <td className="px-4 py-3">
          {onSelect && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(order.id)}
            />
          )}
        </td>
        <td className="px-4 py-3 font-medium">{order.tiktok_order_id}</td>
        <td className="px-4 py-3">@{order.customer_username}</td>
        <td className="px-4 py-3">{order.product_name}</td>
        <td className="px-4 py-3">
          <Badge className={getStatusColor(order.status)}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {order.status}
          </Badge>
        </td>
        <td className="px-4 py-3 font-semibold">${order.amount}</td>
        <td className="px-4 py-3">
          {showActions && (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                View
              </Button>
              <Button size="sm">
                {order.status === 'processing' ? 'Ship' : 'Track'}
              </Button>
            </div>
          )}
        </td>
      </tr>
    );
  }

  return (
    <Card className={cn("mb-3", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {onSelect && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelect(order.id)}
              />
            )}
            <div>
              <h4 className="font-semibold text-gray-900">
                {order.tiktok_order_id}
              </h4>
              <p className="text-sm text-gray-600">
                @{order.customer_username}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(order.status)}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {order.status}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{order.product_name}</span>
            <span className="font-semibold text-gray-900">${order.amount}</span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <MapPin className="h-3 w-3" />
            <span>{order.shipping_address.city}, {order.shipping_address.state}</span>
          </div>
        </div>

        {/* Order Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Received</span>
            <span>Processing</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
          <Progress 
            value={getProgressValue(order.status)} 
            className="h-2"
          />
        </div>

        {showActions && (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1">
              {order.status === 'processing' ? 'Generate Label' : 'Track Package'}
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### 1.4 MobileNavigation Component

```typescript
// src/components/navigation/MobileNavigation.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, BarChart3, Settings, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
}

interface MobileNavigationProps {
  notificationCount?: number;
  className?: string;
}

export function MobileNavigation({ 
  notificationCount = 0, 
  className 
}: MobileNavigationProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/dashboard'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      href: '/orders'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      href: '/analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings'
    }
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-white border-t border-gray-200 shadow-lg",
      "md:hidden", // Only show on mobile
      className
    )}>
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors",
                "min-w-[64px]", // Ensure touch targets are large enough
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              )}
            >
              <div className="relative">
                <Icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-current"
                )} />
                {item.id === 'orders' && notificationCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500"
                    variant="destructive"
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Badge>
                )}
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-primary" : "text-current"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* Safe area for newer mobile devices */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
```

### 1.5 ResponsiveLayout Component

```typescript
// src/components/layout/ResponsiveLayout.tsx
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { DesktopSidebar } from '@/components/navigation/DesktopSidebar';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  showMobileNav?: boolean;
  className?: string;
}

export function ResponsiveLayout({ 
  children, 
  showMobileNav = true,
  className 
}: ResponsiveLayoutProps) {
  return (
    <SidebarProvider>
      <div className={cn("min-h-screen bg-gray-50", className)}>
        {/* Desktop Sidebar */}
        <DesktopSidebar />
        
        {/* Main Content Area */}
        <div className="lg:ml-64"> {/* Adjust margin for sidebar width */}
          <main className={cn(
            "flex-1",
            showMobileNav ? "pb-20 md:pb-0" : "pb-4" // Account for mobile nav
          )}>
            <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
        
        {/* Mobile Navigation */}
        {showMobileNav && <MobileNavigation />}
      </div>
    </SidebarProvider>
  );
}
```

## 2. Advanced Dashboard Components

### 2.1 RevenueChart Component

```typescript
// src/components/analytics/RevenueChart.tsx
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  timeframe: '7d' | '30d' | '90d';
  onTimeframeChange: (timeframe: '7d' | '30d' | '90d') => void;
  loading?: boolean;
}

export function RevenueChart({ 
  data, 
  timeframe, 
  onTimeframeChange,
  loading = false 
}: RevenueChartProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    switch (timeframe) {
      case '7d': return format(date, 'MMM dd');
      case '30d': return format(date, 'MMM dd');
      case '90d': return format(date, 'MMM dd');
      default: return format(date, 'MMM dd');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Revenue Trends
          </CardTitle>
          <Select value={timeframe} onValueChange={onTimeframeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={formatDate}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value as number) : value,
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]}
                  labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" // Primary purple
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 2.2 BulkActionsToolbar Component

```typescript
// src/components/orders/BulkActionsToolbar.tsx
import React from 'react';
import { Package, RefreshCw, Download, Printer, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface BulkActionsToolbarProps {
  selectedOrders: string[];
  onAction: (action: string, orderIds: string[]) => void;
  loading?: boolean;
  className?: string;
}

export function BulkActionsToolbar({
  selectedOrders,
  onAction,
  loading = false,
  className
}: BulkActionsToolbarProps) {
  const selectedCount = selectedOrders.length;

  if (selectedCount === 0) {
    return null;
  }

  const actions = [
    {
      id: 'generate_labels',
      label: 'Generate Labels',
      icon: Printer,
      variant: 'default' as const
    },
    {
      id: 'update_status',
      label: 'Update Status',
      icon: RefreshCw,
      variant: 'outline' as const
    },
    {
      id: 'export',
      label: 'Export CSV',
      icon: Download,
      variant: 'outline' as const
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: Archive,
      variant: 'outline' as const
    }
  ];

  return (
    <div className={cn(
      "flex items-center justify-between p-4",
      "bg-primary-50 border border-primary-200 rounded-lg",
      "animate-in slide-in-from-top-2 duration-200",
      className
    )}>
      <div className="flex items-center space-x-3">
        <Badge variant="secondary" className="bg-primary-100 text-primary-800">
          {selectedCount} selected
        </Badge>
        <span className="text-sm text-gray-600">
          {selectedCount === 1 ? '1 order selected' : `${selectedCount} orders selected`}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Quick Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {actions.slice(0, 3).map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                disabled={loading}
                onClick={() => onAction(action.id, selectedOrders)}
                className="transition-all duration-200 hover:scale-105"
              >
                <Icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            );
          })}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions
                <RefreshCw className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={() => onAction(action.id, selectedOrders)}
                    disabled={loading}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* More Actions Dropdown for Desktop */}
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                More Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.slice(3).map((action) => {
                const Icon = action.icon;
                return (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={() => onAction(action.id, selectedOrders)}
                    disabled={loading}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
```

## 3. Admin-Specific Components

### 3.1 SystemHealthCard Component

```typescript
// src/components/admin/SystemHealthCard.tsx
import React from 'react';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SystemService {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number; // percentage
  responseTime: number; // milliseconds
  lastCheck: string;
}

interface SystemHealthCardProps {
  services: SystemService[];
  className?: string;
}

export function SystemHealthCard({ services, className }: SystemHealthCardProps) {
  const getStatusIcon = (status: SystemService['status']) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'degraded': return Clock;
      case 'down': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: SystemService['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const overallHealth = services.every(s => s.status === 'healthy') 
    ? 'healthy' 
    : services.some(s => s.status === 'down') 
      ? 'down' 
      : 'degraded';

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">System Health</CardTitle>
          <Badge className={getStatusColor(overallHealth)}>
            {overallHealth === 'healthy' && <CheckCircle className="h-3 w-3 mr-1" />}
            {overallHealth === 'degraded' && <Clock className="h-3 w-3 mr-1" />}
            {overallHealth === 'down' && <AlertCircle className="h-3 w-3 mr-1" />}
            {overallHealth.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {services.map((service) => {
          const StatusIcon = getStatusIcon(service.status);
          
          return (
            <div key={service.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StatusIcon className={cn(
                    "h-4 w-4",
                    service.status === 'healthy' ? "text-green-600" :
                    service.status === 'degraded' ? "text-yellow-600" :
                    "text-red-600"
                  )} />
                  <span className="font-medium text-gray-900">
                    {service.name}
                  </span>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>{service.uptime}% uptime</div>
                  <div>{service.responseTime}ms avg</div>
                </div>
              </div>
              
              <Progress 
                value={service.uptime} 
                className={cn(
                  "h-2",
                  service.status === 'healthy' ? "bg-green-100" :
                  service.status === 'degraded' ? "bg-yellow-100" :
                  "bg-red-100"
                )}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

### 3.2 AlertsPanel Component

```typescript
// src/components/admin/AlertsPanel.tsx
import React from 'react';
import { AlertTriangle, Info, AlertCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  isResolved: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onResolve: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
  className?: string;
}

export function AlertsPanel({ 
  alerts, 
  onResolve, 
  onDismiss, 
  className 
}: AlertsPanelProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.isResolved);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Critical Alerts & Issues
          </CardTitle>
          {activeAlerts.length > 0 && (
            <Badge variant="destructive">
              {activeAlerts.length} active
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No active alerts</p>
            <p className="text-sm">All systems running smoothly</p>
          </div>
        ) : (
          activeAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            
            return (
              <div
                key={alert.id}
                className={cn(
                  "p-4 border rounded-lg",
                  getAlertColor(alert.type)
                )}
              >
                <div className="flex items-start space-x-3">
                  <Icon className={cn(
                    "h-5 w-5 mt-0.5 flex-shrink-0",
                    alert.type === 'error' ? "text-red-600" :
                    alert.type === 'warning' ? "text-yellow-600" :
                    "text-blue-600"
                  )} />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">
                      {alert.title}
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {alert.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onResolve(alert.id)}
                    >
                      Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDismiss(alert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {activeAlerts.length > 0 && (
          <div className="flex justify-center pt-4">
            <Button variant="outline" size="sm">
              View All Alerts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

## 4. Custom Hooks for Dashboard Data

### 4.1 useDashboardMetrics Hook

```typescript
// src/hooks/useDashboardMetrics.ts
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface DashboardMetrics {
  revenue: {
    today: number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
  };
  orders: {
    count: number;
    change: number;
    byStatus: Record<string, number>;
  };
  fulfillment: {
    rate: number;
    change: number;
  };
  conversion: {
    rate: number;
    change: number;
  };
}

export function useDashboardMetrics() {
  const {
    data: metrics,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async (): Promise<DashboardMetrics> => {
      const response = await fetch('/api/dashboard/metrics');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard metrics');
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });

  return {
    metrics,
    isLoading,
    error,
    refetch
  };
}
```

### 4.2 useViralContent Hook

```typescript
// src/hooks/useViralContent.ts
import { useQuery } from '@tanstack/react-query';

interface ViralContentAlert {
  videoId: string;
  views: number;
  orders: number;
  revenue: number;
  revenueIncrease: number;
  stockLevel: number;
  productName: string;
  timestamp: string;
}

export function useViralContent() {
  const {
    data: viralContent,
    isLoading,
    error
  } = useQuery({
    queryKey: ['viral-content'],
    queryFn: async (): Promise<ViralContentAlert[]> => {
      const response = await fetch('/api/tiktok/viral-content');
      if (!response.ok) {
        throw new Error('Failed to fetch viral content');
      }
      return response.json();
    },
    refetchInterval: 60000, // Check for viral content every minute
  });

  return {
    viralContent: viralContent || [],
    isLoading,
    error
  };
}
```

This implementation guide provides the core components needed for both creator and admin dashboards, following CreatorFlow's mobile-first, TikTok-native design principles while leveraging the existing shadcn/ui component system.