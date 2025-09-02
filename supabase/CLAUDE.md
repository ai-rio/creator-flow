# Supabase Database Context for CreatorFlow

## Core Tables & TikTok Creator Business Schema

### Primary Business Entities
- `users` - Creator authentication and profile data with RLS policies
- `creator_profiles` - TikTok creator business information and settings
- `products` - Creator merchandise and digital products
- `orders` - TikTok Shop order management and fulfillment tracking
- `shipments` - Multi-carrier shipping automation (UPS, FedEx, USPS)
- `subscriptions` - Creator subscription billing and usage tracking
- `analytics_events` - Creator performance and order analytics

### TikTok Integration Tables
- `tiktok_accounts` - Connected TikTok Shop accounts and API tokens
- `tiktok_products` - Synced product catalog from TikTok Shop
- `tiktok_orders` - Imported orders from TikTok Shop API
- `fulfillment_rules` - Automated shipping rules and preferences

### Creator Economy Tables
- `creator_metrics` - Revenue, orders, conversion tracking
- `shipping_rates` - Dynamic pricing based on volume and carrier
- `inventory_tracking` - Stock levels and reorder automation
- `customer_data` - End customer information for fulfillment

## Database Configuration
- Port: 54332 (separate from QuoteKit on 54321)
- Studio: http://localhost:54333
- API: http://localhost:54331
- Inbucket: http://localhost:54334

## Row Level Security (RLS) Patterns

### Creator Data Security
```sql
-- Standard creator data access
auth.uid() = creator_id

-- Creator-scoped access for TikTok Shop data
auth.uid() IN (SELECT creator_id FROM creator_profiles WHERE id = tiktok_accounts.creator_profile_id)

-- Order access for fulfillment
auth.uid() IN (SELECT creator_id FROM creator_profiles cp 
               JOIN tiktok_accounts ta ON ta.creator_profile_id = cp.id 
               WHERE ta.id = orders.tiktok_account_id)
```

### Public Content Patterns
- Shipping rates: `is_public = true AND active = true`
- Carrier options: role-based access via `subscription_tiers` table

## Edge Function Deployment

### CreatorFlow-Specific Functions
```bash
# TikTok Shop webhook processing
supabase functions deploy tiktok-webhook-orders

# Shipping label generation with multi-carrier support
supabase functions deploy shipping-automation
