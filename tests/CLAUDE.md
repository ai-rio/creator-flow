# Testing Context for CreatorFlow

## Creator-Focused Test Strategy

### Core Test Categories
- **TikTok Integration Tests** - API connections, order import, product sync
- **Shipping Automation Tests** - Multi-carrier label generation, rate calculation
- **Creator Analytics Tests** - Performance metrics, revenue tracking
- **Subscription Billing Tests** - Usage-based pricing, tier management

### Test Structure (Following QuoteKit Pattern)
```
tests/
├── unit/                    # Component and utility tests
├── integration/             # API and database tests
├── e2e/                     # Creator workflow tests
└── fixtures/                # Test data for TikTok orders
```

### Key Test Scenarios
- Creator onboarding with TikTok Shop connection
- Order import and fulfillment automation
- Shipping label generation across carriers
- Real-time analytics updates
- Subscription usage tracking and billing

### Test Structure (Following QuoteKit Pattern)
```
tests/
├── unit/                    # Component and utility tests
│   ├── components/          # Creator UI component tests
│   ├── utils/              # TikTok API utilities
│   └── hooks/              # Creator dashboard hooks
├── integration/             # API and database tests
│   ├── tiktok-api/         # TikTok Shop integration
│   ├── shipping/           # Multi-carrier automation
│   └── supabase/           # Database operations
├── e2e/                     # Creator workflow tests
│   ├── onboarding/         # TikTok Shop connection
│   ├── order-fulfillment/  # End-to-end order processing
│   └── analytics/          # Creator dashboard flows
└── fixtures/                # Test data for TikTok orders
    ├── tiktok-orders.json  # Sample order data
    ├── creator-profiles.json
    └── shipping-rates.json
```

### Creator Test Examples

#### TikTok Order Processing Test
```typescript
// tests/integration/tiktok-api/order-import.test.ts
describe('TikTok Order Import', () => {
  it('should import and process TikTok Shop orders', async () => {
    const mockOrder = {
      order_id: 'TT123456',
      status: 'AWAITING_SHIPMENT',
      creator_id: 'creator_123'
    }
    
    await POST('/api/webhooks/tiktok', { body: mockOrder })
    
    const order = await supabase
      .from('orders')
      .select('*')
      .eq('tiktok_order_id', 'TT123456')
      .single()
    
    expect(order.data.status).toBe('pending')
  })
})
```

#### Shipping Label Generation Test
```typescript
// tests/unit/shipping/label-generator.test.ts
describe('Shipping Label Generator', () => {
  it('should generate UPS label for creator order', async () => {
    const result = await generateShippingLabel({
      order_id: 'order_123',
      carrier: 'ups',
      creator_id: 'creator_123'
    })
    
    expect(result.label_url).toContain('ups.com')
    expect(result.tracking_number).toMatch(/^1Z/)
  })
})
```
