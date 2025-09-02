# Components Context for CreatorFlow

## Creator-Focused UI Components

### Core Components
- `account-menu.tsx` - Creator profile dropdown with TikTok Shop status
- `container.tsx` - Responsive layout container for creator dashboard
- `logo.tsx` - CreatorFlow branding with TikTok integration indicators
- `sexy-boarder.tsx` - Premium UI styling for creator interface

### UI Library (Shadcn/UI)
- `button.tsx` - Action buttons for order processing and shipping
- `dropdown-menu.tsx` - Creator navigation and quick actions
- `input.tsx` - Form inputs for product and shipping data
- `sheet.tsx` - Sliding panels for order details and analytics
- `tabs.tsx` - Dashboard sections (Orders, Products, Analytics)
- `toast.tsx` - Real-time notifications for order updates
- `collapsible.tsx` - Expandable sections for order details

### Creator-Specific Components (To Be Added)
- `order-card.tsx` - TikTok Shop order display with fulfillment status
- `product-sync.tsx` - TikTok Shop product catalog synchronization
- `shipping-label.tsx` - Automated shipping label generation
- `analytics-chart.tsx` - Creator performance metrics visualization
- `tiktok-connect.tsx` - TikTok Shop account connection interface

### Mandatory shadcn/ui v4 MCP Usage
**CRITICAL**: Always use `mcp__shadcn-ui-v4__get_component` before ANY UI work:
```bash
# Never build components manually - always use MCP tools
mcp__shadcn-ui-v4__list_components
mcp__shadcn-ui-v4__get_component componentName="button"
mcp__shadcn-ui-v4__get_component_demo componentName="dialog"
```

### CreatorFlow Component Organization

#### Business Feature Components (`src/features/*/components/`)
- **Orders**: `OrderCard`, `FulfillmentStatus`, `OrderTimeline`
- **Products**: `ProductSync`, `TikTokCatalog`, `InventoryTracker`  
- **Shipping**: `LabelGenerator`, `CarrierSelector`, `TrackingDisplay`
- **Analytics**: `CreatorMetrics`, `RevenueChart`, `OrderVolume`

#### Creator-Specific Patterns
```tsx
// Use CVA for order status variants
const orderStatusVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800", 
        shipped: "bg-green-100 text-green-800",
        delivered: "bg-purple-100 text-purple-800"
      }
    }
  }
)
```

#### TikTok Integration Components
```tsx
// TikTok Shop connection status
const TikTokStatus = ({ connected }: { connected: boolean }) => (
  <div className={cn(
    "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
    connected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  )}>
    <div className={cn("w-2 h-2 rounded-full", 
      connected ? "bg-green-500" : "bg-red-500")} />
    {connected ? "TikTok Shop Connected" : "Connect TikTok Shop"}
  </div>
)
```
