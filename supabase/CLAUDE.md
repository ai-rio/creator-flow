# Supabase Database Context for CreatorFlow

## Core Tables & TikTok Shop Fulfillment Schema

### Primary Business Entities
- `users` - Authentication and creator profile data with RLS policies
- `creators` - TikTok Shop seller profiles and business settings
- `customers` - TikTok Shop buyers and shipping information
- `products` - TikTok Shop product catalog with SKUs and variants
- `orders` - TikTok Shop orders with fulfillment status tracking
- `order_items` - Individual products within orders (quantity, variants)
- `shipping_labels` - Generated shipping labels and tracking information
- `payments` - Stripe subscription tracking for CreatorFlow SaaS billing
- `analytics_events` - PostHog event tracking for e-commerce workflows

### TikTok Shop Integration Tables
- `tiktok_shops` - Connected TikTok Shop accounts and OAuth tokens
- `tiktok_webhooks` - Webhook event processing and retry logic
- `fulfillment_rules` - Automated fulfillment triggers and conditions
- `shipping_profiles` - Creator shipping preferences and carrier settings
- `inventory_sync` - Real-time inventory synchronization across platforms

## Row Level Security (RLS) Patterns

### Creator Data Security
```sql
-- Standard user data access
auth.uid() = user_id

-- Creator-scoped access for TikTok Shop sellers
auth.uid() IN (SELECT user_id FROM creator_users WHERE creator_id = creators.id)

-- Order access for fulfillment and analytics
auth.uid() IN (SELECT user_id FROM creator_users cu 
               JOIN creators c ON c.id = cu.creator_id 
               WHERE c.id = orders.creator_id)

-- Multi-shop access for enterprise creators
auth.uid() IN (SELECT user_id FROM creator_users cu
               JOIN tiktok_shops ts ON ts.creator_id = cu.creator_id
               WHERE ts.id = orders.tiktok_shop_id)
```

### Public Content Patterns
- Shipping templates: `is_template = true AND visibility = 'public'`
- Fulfillment rules: `public_rule = true AND status = 'active'`
- Product catalogs: role-based access via `creator_permissions` table

## Edge Function Deployment

### CreatorFlow-Specific Functions
```bash
# TikTok Shop webhook processing and order synchronization
supabase functions deploy tiktok-shop-webhook

# Shipping label generation with multi-carrier support
supabase functions deploy generate-shipping-label

# Order fulfillment automation and status updates
supabase functions deploy process-order-fulfillment

# E-commerce analytics processing and creator insights
supabase functions deploy process-creator-analytics

# Stripe subscription management for CreatorFlow SaaS billing
supabase functions deploy stripe-subscription-webhook

# Inventory synchronization across TikTok Shop and other platforms
supabase functions deploy sync-inventory-levels

# Order notification emails to customers and creators
supabase functions deploy send-order-notifications
```

### Function Environment Variables
- `TIKTOK_SHOP_APP_SECRET` - TikTok Shop API authentication
- `STRIPE_SECRET_KEY` - SaaS subscription processing
- `SHIPPO_API_TOKEN` - Shipping label generation
- `EASYPOST_API_KEY` - Alternative shipping provider
- `RESEND_API_KEY` - Transactional email delivery
- `POSTHOG_API_KEY` - E-commerce analytics tracking

## Migration Best Practices for TikTok Shop Fulfillment SaaS

### Development Workflow
```bash
# Always test TikTok Shop schema changes locally first
supabase db reset
bun run test -- --grep="tiktok.*order.*fulfillment"

# Apply migrations with e-commerce workflow validation
supabase db push --dry-run
supabase db push

# Generate TypeScript types for CreatorFlow features
bun run generate-types
```

### Schema Evolution Patterns
- Document breaking changes affecting order processing workflows
- Use transactions for multi-table fulfillment operations
- Version TikTok Shop API integration schema for backward compatibility
- Test order-to-fulfillment conversion after schema changes
- Maintain shipping label generation compatibility across schema updates

## Common Supabase Operations for CreatorFlow

### Database Debugging
```bash
# Check creator and TikTok Shop connection data
supabase auth users list
supabase logs --type=database

# Monitor order processing performance  
supabase logs --function=process-order-fulfillment
supabase logs --function=generate-shipping-label
```

### Edge Function Monitoring
```bash
# Monitor TikTok Shop webhook processing
supabase functions logs tiktok-shop-webhook

# Check shipping label generation
supabase functions logs generate-shipping-label

# Monitor order fulfillment automation
supabase functions logs process-order-fulfillment

# Check subscription billing webhooks
supabase functions logs stripe-subscription-webhook
```

### Performance Optimization
- Index on `orders.tiktok_shop_id` for TikTok Shop order lookups
- Composite index on `orders(creator_id, status, created_at)` for creator dashboard queries
- Partial index on `shipping_labels(status)` WHERE status IN ('pending', 'processing')
- Full-text search index on `customers(name, email)` for customer lookup
- Index on `products.sku` for inventory synchronization performance

## TikTok Shop Fulfillment Business Context

CreatorFlow's Supabase schema is optimized for:
- **TikTok Shop Integration**: OAuth authentication → webhook processing → order sync
- **Order Fulfillment Automation**: TikTok order received → shipping label generated → tracking updated
- **Multi-Carrier Shipping**: Shippo, EasyPost integration with rate shopping and optimization
- **Creator SaaS Billing**: Stripe subscription management for CreatorFlow platform fees
- **Real-time Analytics**: PostHog integration for creator performance insights and business metrics
- **Inventory Synchronization**: Multi-platform inventory tracking and automatic stock updates
- **Scalable Architecture**: Handle viral order spikes (50-500+ orders/day) with automated workflows