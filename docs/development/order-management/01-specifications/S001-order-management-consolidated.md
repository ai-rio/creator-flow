# S001: Order Management System - Consolidated Specifications

**Document Type**: Specifications  
**Status**: IMPLEMENTATION READY  
**Priority**: Must Have (M)  
**Created**: 2025-09-04  
**Consolidates**: S001-DRAFT, S002-DRAFT, S003-DRAFT  

## Implementation-First Approach

This consolidated specification focuses on **buildable components** with clear implementation paths. All theoretical elements have been removed in favor of actionable technical requirements.

## Core System Components

### 1. Order State Machine (IMMEDIATE IMPLEMENTATION)

```typescript
// Minimal viable state machine
type OrderState = 'received' | 'processing' | 'shipped' | 'delivered' | 'failed';

const ORDER_TRANSITIONS = {
  received: ['processing', 'failed'],
  processing: ['shipped', 'failed'], 
  shipped: ['delivered'],
  delivered: [],
  failed: ['processing'] // retry
};

interface Order {
  id: string;
  tiktok_order_id: string;
  state: OrderState;
  created_at: Date;
  updated_at: Date;
}
```

### 2. TikTok Integration (PHASE 1 ONLY)

```typescript
// Essential TikTok operations only
interface TikTokOrderSync {
  fetchNewOrders(): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: string): Promise<void>;
  processWebhook(payload: any): Promise<void>;
}
```

### 3. Database Schema (MINIMAL VIABLE)

```sql
-- Core tables only - no premature optimization
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  tiktok_order_id TEXT UNIQUE NOT NULL,
  state TEXT NOT NULL DEFAULT 'received',
  order_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_state ON orders(state);
CREATE INDEX idx_orders_tiktok_id ON orders(tiktok_order_id);
```

## Implementation Checklist

### Week 1: Foundation
- [ ] Create order table in Supabase
- [ ] Implement basic Order model
- [ ] Create state transition functions
- [ ] Add order creation endpoint

### Week 2: TikTok Integration  
- [ ] TikTok webhook endpoint
- [ ] Order sync from TikTok API
- [ ] Status update to TikTok
- [ ] Basic error handling

### Week 3: Dashboard Integration
- [ ] Order list component
- [ ] Order detail view
- [ ] State transition UI
- [ ] Real-time updates

### Week 4: Testing & Validation
- [ ] Unit tests for state machine
- [ ] Integration tests with TikTok
- [ ] End-to-end order flow test
- [ ] Performance validation

## Success Criteria

**Implementation Proof Required**:
1. Process 10 real TikTok orders end-to-end
2. State transitions work in production
3. Dashboard shows real order data
4. <30 second processing time achieved

**No Additional Specifications** until above criteria met.

## Removed Complexity

**Archived for Future Implementation**:
- Advanced workflow engine (S002)
- Multi-platform integration (S003)  
- AI-powered routing
- Enterprise features
- Complex business rules

**Focus**: Build working order processing first, optimize later.

---

## Related Documents

- Implementation: `I001-DRAFT-order-management-implementation.md`
- Testing: Order management test scenarios
- Architecture: Core system architecture overview