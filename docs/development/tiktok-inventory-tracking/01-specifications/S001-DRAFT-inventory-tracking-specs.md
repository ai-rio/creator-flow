# S001-DRAFT: TikTok Shop Inventory Tracking Specifications

**Document Type**: Specifications  
**Status**: DRAFT  
**Priority**: Must Have (M)  
**Created**: 2025-09-03  
**Last Updated**: 2025-09-03  

## Overview

This document specifies the technical requirements for implementing TikTok Shop inventory tracking in CreatorFlow. It details the system architecture, data models, API endpoints, and integration points needed to enable real-time inventory synchronization and automated stock level adjustments.

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌────────────────────┐    ┌─────────────────┐
│   TikTok Shop   │◄──►│  Inventory Engine  │◄──►│   Order System  │
│   Product API   │    │                    │    │                 │
│                 │    │  ┌──────────────┐  │    │  - Fulfillment  │
│  - Products     │    │  │ Sync Service │  │    │  - Cancellation │
│  - Webhooks     │    │  │ Alert Engine │  │    │  - Returns      │
│  - Rate Limits  │    │  │ Transaction  │  │    │                 │
└─────────────────┘    │  │ Manager      │  │    └─────────────────┘
                       │  └──────────────┘  │
                       └────────────────────┘
                                ▲
                                │
                       ┌─────────────────┐
                       │  Notification   │
                       │     System      │
                       │                 │
                       │  - Email Queue  │
                       │  - In-App       │
                       │  - SMS Gateway  │
                       └─────────────────┘
                                ▲
                                │
                ┌─────────────────────────────────────┐
                │           Data Layer                │
                │                                     │
                │  ┌─────────────┐  ┌─────────────┐   │
                │  │  Supabase   │  │    Redis    │   │
                │  │     DB      │  │   Cache     │   │
                │  │             │  │             │   │
                │  │ - Products  │  │ - Sessions  │   │
                │  │ - Transactions│ │ - Temp Data │   │
                │  │ - Alerts    │  │ - Rate Limits│   │
                │  └─────────────┘  └─────────────┘   │
                └─────────────────────────────────────┘
```

### Detailed Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Inventory Engine                         │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Sync Service   │  │  Alert Engine   │  │ Transaction │ │
│  │                 │  │                 │  │  Manager    │ │
│  │ - Webhook       │  │ - Threshold     │  │             │ │
│  │   Handler       │  │   Monitor       │  │ - ACID      │ │
│  │ - Polling       │  │ - Notification  │  │   Operations│ │
│  │   Scheduler     │  │   Dispatcher    │  │ - Conflict  │ │
│  │ - Rate Limiter  │  │ - Alert Rules   │  │   Resolution│ │
│  │ - Retry Logic   │  │                 │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 Message Queue                           │ │
│  │                                                         │ │
│  │  [Sync Jobs] → [Alert Jobs] → [Notification Jobs]      │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Diagrams

#### Inventory Sync Flow
```
Creator Order → TikTok Shop → Webhook → CreatorFlow
     ↓              ↓           ↓           ↓
   Fulfilled    Stock Update  Validation  Process
     ↓              ↓           ↓           ↓
Update Local ← Sync Response ← Verify ← Update DB
Inventory         ↓         Signature      ↓
     ↓         Success/Error     ↓      Transaction
Alert Check       ↓              ↓         Log
     ↓         Log Event    Send Response   ↓
Notification      ↓              ↓      Check Alerts
     ↓         Monitor            ↓         ↓
Send Alert    Dashboard      Return 200  Generate
                                         Notifications
```

#### Concurrent Update Resolution
```
Request A ────┐
              ├─→ Database Lock ─→ Process A ─→ Commit A
Request B ────┘                      ↓
                                  Wait for A
                                     ↓
                              Process B ─→ Commit B
                                     ↓
                              Release Lock
```

### Component Responsibilities

1. **Inventory Engine**:
   - Manage real-time inventory synchronization
   - Process inventory updates from TikTok Shop
   - Adjust stock levels based on order fulfillment
   - Generate low stock alerts

2. **TikTok Shop Integration**:
   - Poll TikTok Shop Product API for inventory data
   - Process webhook notifications for inventory changes
   - Update TikTok Shop when stock levels change

3. **Order System Integration**:
   - Receive notifications when orders are fulfilled
   - Automatically adjust inventory levels
   - Handle order cancellations and returns

4. **Alert System**:
   - Monitor stock levels
   - Generate notifications for low stock conditions
   - Send alerts to creators via preferred channels

## Data Models

### Product Inventory

Enhancement to existing product model:

```sql
ALTER TABLE products ADD COLUMN current_stock INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN reserved_stock INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN available_stock INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN last_inventory_sync TIMESTAMP WITH TIME ZONE;
ALTER TABLE products ADD COLUMN inventory_sync_status TEXT;
```

### Inventory Transactions

New table for tracking inventory changes:

```sql
CREATE TABLE inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  transaction_type TEXT, -- 'IN', 'OUT', 'ADJUSTMENT'
  quantity INTEGER,
  previous_stock INTEGER,
  new_stock INTEGER,
  reason TEXT,
  reference_id UUID, -- Order ID, manual adjustment ID, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id)
);
```

### Low Stock Alerts

New table for tracking low stock conditions:

```sql
CREATE TABLE low_stock_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  current_stock INTEGER,
  threshold INTEGER,
  alert_sent BOOLEAN DEFAULT FALSE,
  alert_sent_at TIMESTAMP WITH TIME ZONE,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### Inventory Queries

```
GET /api/inventory/products
Query Parameters:
- page (optional): Page number for pagination
- limit (optional): Number of items per page
- status (optional): Filter by inventory status (low_stock, out_of_stock, in_stock)
- search (optional): Search by product name or SKU

Response:
{
  "products": [
    {
      "id": "uuid",
      "name": "string",
      "sku": "string",
      "current_stock": 100,
      "reserved_stock": 10,
      "available_stock": 90,
      "last_inventory_sync": "2025-09-03T10:00:00Z",
      "inventory_sync_status": "synced"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

```
GET /api/inventory/products/{productId}
Response:
{
  "id": "uuid",
  "name": "string",
  "sku": "string",
  "current_stock": 100,
  "reserved_stock": 10,
  "available_stock": 90,
  "last_inventory_sync": "2025-09-03T10:00:00Z",
  "inventory_sync_status": "synced",
  "history": [
    {
      "date": "2025-09-03T10:00:00Z",
      "type": "OUT",
      "quantity": 5,
      "reason": "Order fulfillment"
    }
  ]
}
```

### Inventory Updates

```
POST /api/inventory/products/{productId}/adjust
Request Body:
{
  "quantity": 10,
  "reason": "Manual adjustment"
}

Response:
{
  "success": true,
  "new_stock_level": 110
}
```

```
POST /api/inventory/products/{productId}/sync
Response:
{
  "success": true,
  "current_stock": 105,
  "last_sync": "2025-09-03T10:05:00Z"
}
```

## Integration Specifications

### TikTok Shop Product API Integration

#### Retrieving Product Inventory

Endpoint: `GET /products` (TikTok Shop Product API)
- Poll every 15 minutes for full catalog sync
- Use webhooks for real-time updates
- Handle rate limiting with exponential backoff

#### Updating Product Inventory

Endpoint: `PUT /products/{productId}/inventory` (TikTok Shop Product API)
- Update when stock levels change in CreatorFlow
- Batch updates for efficiency during high-volume periods
- Handle API errors with retry logic

### Webhook Processing

#### Inventory Change Notifications

Webhook Event: `product.inventory.updated`
Payload:
```json
{
  "event": "product.inventory.updated",
  "timestamp": "2025-09-03T10:00:00Z",
  "data": {
    "product_id": "tiktok_product_id",
    "sku": "product_sku",
    "previous_stock": 100,
    "new_stock": 95,
    "change_reason": "sale"
  }
}
```

Processing Requirements:
- Validate webhook signature
- Match TikTok product ID to CreatorFlow product
- Update local inventory records
- Trigger any necessary alerts

### Order System Integration

#### Order Fulfillment Notification

Event: `order.fulfilled`
Processing Requirements:
- Decrease available stock by order quantity
- Create inventory transaction record
- Check if new stock level triggers low stock alert

#### Order Cancellation/Return

Event: `order.cancelled` or `order.returned`
Processing Requirements:
- Increase available stock by returned quantity
- Create inventory transaction record
- Update any active low stock alerts

## Alerting System

### Low Stock Thresholds

- Default threshold: 10 units or 10% of average monthly sales (whichever is higher)
- Creator-configurable per product
- Automatic threshold adjustment based on sales velocity

### Alert Types

1. **Low Stock Alert**:
   - Triggered when available stock falls below threshold
   - Sent via email and in-app notification
   - Includes reorder recommendations

2. **Out of Stock Alert**:
   - Triggered when available stock reaches zero
   - Higher priority notification
   - Immediate action required

3. **Inventory Sync Failure**:
   - Triggered when inventory sync fails for 3 consecutive attempts
   - Alert engineering team for investigation

### Alert Delivery

- Email notifications to creator
- In-app notifications in dashboard
- SMS for critical alerts (optional premium feature)

## Performance Requirements

### Latency Targets

- Inventory sync: <5 seconds for webhook processing
- API response times: <500ms for 95th percentile
- Dashboard updates: <2 seconds for inventory data

### Scalability

#### Horizontal Scaling Strategy
- **Service Layer**: Stateless services with load balancing
- **Database**: Read replicas for query distribution
- **Cache Layer**: Redis cluster with consistent hashing
- **Message Queue**: Partitioned queues by creator/product

#### Caching Strategy
```typescript
const cacheConfig = {
  // Product inventory cache
  productInventory: {
    ttl: 300, // 5 minutes
    keyPattern: 'inventory:product:{productId}',
    invalidateOn: ['inventory_update', 'sync_complete']
  },
  
  // Creator catalog cache
  creatorCatalog: {
    ttl: 900, // 15 minutes
    keyPattern: 'inventory:creator:{userId}:catalog',
    invalidateOn: ['product_added', 'product_removed']
  },
  
  // Alert status cache
  alertStatus: {
    ttl: 600, // 10 minutes
    keyPattern: 'alerts:product:{productId}',
    invalidateOn: ['alert_resolved', 'stock_updated']
  }
};
```

#### Database Optimization
```sql
-- Indexes for performance
CREATE INDEX CONCURRENTLY idx_products_available_stock_btree 
ON products USING btree(available_stock) 
WHERE available_stock > 0;

CREATE INDEX CONCURRENTLY idx_inventory_transactions_product_created 
ON inventory_transactions(product_id, created_at DESC);

CREATE INDEX CONCURRENTLY idx_low_stock_alerts_unresolved 
ON low_stock_alerts(product_id, created_at DESC) 
WHERE resolved = false;

-- Partitioning for transaction history
CREATE TABLE inventory_transactions_y2025m09 
PARTITION OF inventory_transactions 
FOR VALUES FROM ('2025-09-01') TO ('2025-10-01');
```

- Support 10,000+ SKU catalogs with <500ms query response
- Handle 1,000+ concurrent inventory updates with queue management
- Process 100,000+ daily inventory transactions with partitioned storage
- Auto-scaling based on queue depth and CPU utilization

### Reliability

- 99.9% uptime for inventory services
- Data durability for inventory transactions
- Automatic failover for critical components

## Error Handling & Recovery

### Error Classification

| Error Type | Severity | Recovery Strategy | Example |
|------------|----------|-------------------|---------|
| **Transient** | Low | Automatic retry with exponential backoff | Network timeout, rate limit |
| **Data** | Medium | Log error, alert admin, manual intervention | Invalid product ID, malformed webhook |
| **System** | High | Failover to backup, immediate alert | Database down, service crash |
| **Business** | Critical | Stop processing, escalate immediately | Negative inventory, data corruption |

### Retry Mechanisms

#### TikTok Shop API Calls
```typescript
const retryConfig = {
  maxAttempts: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 30000, // 30 seconds
  backoffMultiplier: 2,
  retryableErrors: [429, 500, 502, 503, 504]
};
```

#### Webhook Processing
```typescript
const webhookRetry = {
  maxAttempts: 5,
  delays: [1000, 5000, 15000, 60000, 300000], // 1s, 5s, 15s, 1m, 5m
  deadLetterQueue: true,
  alertAfterAttempts: 3
};
```

### Circuit Breaker Pattern

```typescript
const circuitBreakerConfig = {
  failureThreshold: 5,     // Open after 5 failures
  resetTimeout: 60000,     // Try again after 1 minute
  monitoringPeriod: 30000  // 30 second monitoring window
};
```

## Concurrency Control

### Database Locking Strategy

#### Optimistic Locking
```sql
-- Add version column to products table
ALTER TABLE products ADD COLUMN version INTEGER DEFAULT 1;

-- Update with version check
UPDATE products 
SET current_stock = $1, version = version + 1
WHERE id = $2 AND version = $3;
```

#### Pessimistic Locking for Critical Operations
```sql
-- Lock product row during inventory adjustment
SELECT * FROM products 
WHERE id = $1 
FOR UPDATE NOWAIT;
```

### Conflict Resolution Rules

1. **TikTok Shop Wins**: External updates take precedence over local changes
2. **Order Fulfillment Priority**: Completed orders always reduce inventory
3. **Manual Adjustments**: Require admin approval for large changes (>100 units)
4. **Timestamp-based**: Most recent valid update wins in case of simultaneous changes

### Queue Management

#### Job Priorities
```typescript
enum JobPriority {
  CRITICAL = 1,    // Order fulfillment updates
  HIGH = 2,        // Webhook processing
  MEDIUM = 3,      // Scheduled syncs
  LOW = 4          // Bulk operations
}
```

#### Rate Limiting
```typescript
const rateLimits = {
  tiktokAPI: {
    requestsPerMinute: 100,
    burstLimit: 20
  },
  webhookProcessing: {
    requestsPerSecond: 50,
    maxConcurrent: 10
  },
  userAPI: {
    requestsPerMinute: 1000,
    perUserLimit: 100
  }
};
```

## Monitoring & Observability

### Key Metrics

#### System Health Metrics
```typescript
const systemMetrics = {
  // Performance
  'inventory.sync.latency.p95': '<5000ms',
  'inventory.api.response_time.p95': '<500ms',
  'inventory.webhook.processing_time.avg': '<2000ms',
  
  // Reliability
  'inventory.sync.success_rate': '>99.5%',
  'inventory.webhook.success_rate': '>99.9%',
  'inventory.api.error_rate': '<1%',
  
  // Business
  'inventory.alerts.accuracy': '>95%',
  'inventory.overselling.prevention_rate': '>99%',
  'inventory.sync.coverage': '>98%'
};
```

#### Alert Thresholds
```yaml
alerts:
  critical:
    - metric: inventory.sync.failure_rate
      threshold: '>5%'
      duration: '5m'
    - metric: inventory.data.corruption
      threshold: '>0'
      duration: '1m'
  
  warning:
    - metric: inventory.sync.latency.p95
      threshold: '>10s'
      duration: '10m'
    - metric: inventory.api.error_rate
      threshold: '>2%'
      duration: '5m'
```

### Health Check Endpoints

#### Service Health
```typescript
GET /api/health/inventory
Response: {
  status: 'healthy' | 'degraded' | 'unhealthy',
  timestamp: '2025-09-03T10:00:00Z',
  checks: {
    database: { status: 'healthy', latency: '45ms' },
    tiktokAPI: { status: 'healthy', latency: '120ms' },
    redis: { status: 'healthy', latency: '2ms' },
    messageQueue: { status: 'healthy', depth: 15 }
  },
  metrics: {
    syncedProducts: 1250,
    pendingJobs: 3,
    lastSyncTime: '2025-09-03T09:55:00Z'
  }
}
```

### Logging Strategy

#### Log Levels and Structure
```typescript
const logLevels = {
  ERROR: 'System errors, failed operations',
  WARN: 'Recoverable issues, rate limits',
  INFO: 'Business events, successful operations',
  DEBUG: 'Detailed execution flow'
};

const logStructure = {
  timestamp: 'ISO 8601',
  level: 'ERROR|WARN|INFO|DEBUG',
  service: 'inventory-tracking',
  operation: 'sync|alert|webhook',
  productId?: 'uuid',
  userId?: 'uuid',
  duration?: 'milliseconds',
  error?: 'error details'
};
```

## Security Considerations

### Data Protection

#### Encryption Standards
- **In Transit**: TLS 1.3 for all API communications
- **At Rest**: AES-256 encryption for sensitive inventory data
- **Database**: Supabase RLS with row-level security policies

#### Access Control Matrix
```typescript
const permissions = {
  'inventory:read': ['creator', 'admin', 'support'],
  'inventory:write': ['creator', 'admin'],
  'inventory:bulk_update': ['admin'],
  'inventory:system_sync': ['system'],
  'inventory:alerts_manage': ['creator', 'admin']
};
```

### API Security

#### Authentication & Authorization
```typescript
const securityConfig = {
  authentication: {
    method: 'JWT + Supabase Auth',
    tokenExpiry: '1h',
    refreshTokenExpiry: '30d'
  },
  
  webhookSecurity: {
    signatureValidation: 'HMAC-SHA256',
    timestampTolerance: '5m',
    replayProtection: true
  },
  
  rateLimiting: {
    global: '1000 req/min',
    perUser: '100 req/min',
    perIP: '500 req/min'
  }
};
```

#### Input Validation
```typescript
const validationRules = {
  productId: 'UUID format, exists in database',
  quantity: 'Integer, -10000 to +10000 range',
  reason: 'String, 1-500 characters, sanitized',
  threshold: 'Integer, 0 to 10000 range'
};
```

### Audit Trail

#### Audit Log Schema
```sql
CREATE TABLE inventory_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'sync', 'adjustment', 'alert'
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Testing Requirements

### Test Coverage Targets
- **Unit Tests**: 90% code coverage
- **Integration Tests**: All external API interactions
- **Performance Tests**: Load testing with 10K+ SKUs
- **Security Tests**: Penetration testing, vulnerability scanning

### Test Data Management
```typescript
const testDataSets = {
  smallCatalog: '100 products',
  mediumCatalog: '1,000 products', 
  largeCatalog: '10,000 products',
  stressTest: '50,000 products'
};
```

### Automated Testing Pipeline
```yaml
testPipeline:
  unit:
    trigger: 'every commit'
    timeout: '5 minutes'
  
  integration:
    trigger: 'pull request'
    timeout: '15 minutes'
    
  performance:
    trigger: 'weekly'
    timeout: '60 minutes'
    
  security:
    trigger: 'monthly'
    timeout: '120 minutes'
```

## Related Documentation

- [Investigation: Requirements Analysis](../00-planning/P001-DRAFT-inventory-tracking-investigation.md)
- [Implementation: Progress Tracking](../02-implementation/I001-DRAFT-inventory-tracking-progress.md)