# Immediate Implementation Plan

**Execution Date**: 2025-09-04  
**Focus**: Code-first approach, minimal viable implementations

## Week 1: Order Management Foundation

### Day 1-2: Database Setup
```bash
# Create order management tables
bun run supabase migration new create_orders_table
```

```sql
-- Migration content
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tiktok_order_id TEXT UNIQUE NOT NULL,
  state TEXT NOT NULL DEFAULT 'received',
  order_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Day 3-4: Core Order Model
```typescript
// src/lib/orders/order-model.ts
export interface Order {
  id: string;
  tiktok_order_id: string;
  state: OrderState;
  order_data: any;
  created_at: Date;
  updated_at: Date;
}

export type OrderState = 'received' | 'processing' | 'shipped' | 'delivered' | 'failed';
```

### Day 5-7: State Machine Implementation
```typescript
// src/lib/orders/state-machine.ts
export class OrderStateMachine {
  async transition(orderId: string, toState: OrderState): Promise<void> {
    // Minimal implementation - validate transition and update DB
  }
}
```

## Week 2: TikTok Integration

### Day 8-10: Webhook Endpoint
```typescript
// src/app/api/webhooks/tiktok/route.ts
export async function POST(request: Request) {
  // Process TikTok order webhooks
  // Create orders in database
  // Return success response
}
```

### Day 11-14: Order Sync
```typescript
// src/lib/tiktok/order-sync.ts
export class TikTokOrderSync {
  async fetchNewOrders(): Promise<Order[]> {
    // Fetch from TikTok API
    // Transform to internal format
    // Store in database
  }
}
```

## Week 3: Dashboard Integration

### Day 15-17: Order List Component
```tsx
// src/components/orders/order-list.tsx
export function OrderList() {
  // Display orders from database
  // Show current state
  // Allow state transitions
}
```

### Day 18-21: Real-time Updates
```typescript
// src/lib/realtime/order-updates.ts
// Supabase real-time subscription for order changes
```

## Week 4: Testing & Validation

### Day 22-24: Test Suite
```typescript
// tests/orders/order-flow.test.ts
describe('Order Processing Flow', () => {
  it('processes TikTok order end-to-end', async () => {
    // Test complete flow from webhook to dashboard
  });
});
```

### Day 25-28: Production Validation
- Process 10 real TikTok orders
- Measure processing times
- Validate state transitions
- Confirm dashboard updates

## Success Criteria (Week 4 End)

**Must Achieve**:
1. ✅ 10 real orders processed successfully
2. ✅ <30 second processing time
3. ✅ Dashboard shows real data
4. ✅ State transitions work correctly
5. ✅ Tests pass in CI/CD

**Documentation Updates**:
- Remove DRAFT from consolidated spec
- Update implementation status
- Archive unused planning docs

## Resource Allocation

**Time Distribution**:
- 80% Implementation (coding, testing)
- 15% Integration (TikTok API, database)
- 5% Documentation (updates only)

**No New Documentation** until implementation complete.

## Next Phase Trigger

**Phase 2 starts only when**:
- All Week 4 success criteria met
- Production validation complete
- User acceptance testing passed
- Performance benchmarks achieved