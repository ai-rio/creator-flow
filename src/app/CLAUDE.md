# App Router Context for CreatorFlow

## Route Structure & Creator Dashboard

### Authentication Routes
- `(auth)/login` - Creator login with TikTok OAuth
- `(auth)/signup` - Creator onboarding and TikTok Shop connection
- `(auth)/auth` - Auth callback handling

### Creator Dashboard Routes
- `(account)/account` - Creator profile and TikTok Shop settings
- `(account)/manage-subscription` - Billing and usage management
- `/pricing` - Subscription tiers and feature comparison

### Core App Routes
- `/` - Creator dashboard with order overview and analytics
- `/orders` - Order management and fulfillment tracking
- `/products` - Product catalog sync with TikTok Shop
- `/shipping` - Shipping automation and carrier management
- `/analytics` - Creator performance metrics and insights

### API Routes
- `api/webhooks/tiktok` - TikTok Shop order webhooks
- `api/webhooks/stripe` - Subscription billing webhooks
- `api/shipping/labels` - Shipping label generation
- `api/analytics/events` - Creator analytics tracking

## Key Components
- `navigation.tsx` - Creator-focused navigation with order counts
- `auth-ui.tsx` - TikTok Shop connection interface
- `layout.tsx` - Creator dashboard layout with real-time updates

## App Directory Structure
```
src/app/
   (auth)/                 # TikTok OAuth and creator onboarding
   (account)/             # Creator dashboard and settings
   api/                   # TikTok Shop and shipping API routes
   globals.css            # Creator-focused styling
   layout.tsx             # Creator dashboard layout
   page.tsx               # Order overview dashboard
   navigation.tsx         # Creator navigation with order counts
```

## Creator-Specific Route Handlers

### TikTok Shop Integration
```typescript
// api/webhooks/tiktok/route.ts
export async function POST(request: Request) {
  const { order_id, status, creator_id } = await request.json()
  
  await supabase
    .from('orders')
    .upsert({
      tiktok_order_id: order_id,
      status,
      creator_profile_id: creator_id
    })
}
```

### Shipping Automation
```typescript
// api/shipping/labels/route.ts
export async function POST(request: Request) {
  const { order_id, carrier } = await request.json()
  
  const label = await generateShippingLabel({
    order_id,
    carrier, // 'ups' | 'fedex' | 'usps'
  })
  
  return Response.json({ label_url: label.url })
}
```
