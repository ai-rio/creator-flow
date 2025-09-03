# S001-DRAFT: Order Management System Technical Specifications

**Document Type**: Specifications  
**Status**: DRAFT  
**Priority**: Must Have (M)  
**Created**: 2025-09-03  
**Last Updated**: 2025-09-03  

## Overview

This document specifies the technical requirements for CreatorFlow's core Order Management system. As the central orchestrator of the fulfillment platform, it coordinates TikTok Shop integration, inventory tracking, shipping automation, and analytics to deliver seamless order processing at scale.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 ORDER MANAGEMENT CORE                      │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Order Engine   │  │ Workflow Engine │  │ Status Mgmt │ │
│  │                 │  │                 │  │             │ │
│  │ - State Machine │  │ - Rules Engine  │  │ - Sync      │ │
│  │ - Validation    │  │ - Triggers      │  │ - Updates   │ │
│  │ - Processing    │  │ - Conditions    │  │ - Tracking  │ │
│  │ - Audit Trail   │  │ - Actions       │  │ - History   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│           ▲                      ▲                  ▲       │
│           │                      │                  │       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Integration Layer                        │ │
│  │                                                         │ │
│  │ TikTok Shop ◄─► Inventory ◄─► Shipping ◄─► Analytics   │ │
│  │                                                         │ │
│  │ - Order API     - Stock Check  - Labels    - Metrics   │ │
│  │ - Webhooks      - Reservation  - Tracking  - Reports   │ │
│  │ - Status Sync   - Adjustment   - Delivery  - Insights  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                ▲                            │
│                                │                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Data Layer                           │ │
│  │                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │ │
│  │  │  Supabase   │  │    Redis    │  │   Message   │     │ │
│  │  │     DB      │  │   Cache     │  │    Queue    │     │ │
│  │  │             │  │             │  │             │     │ │
│  │  │ - Orders    │  │ - Sessions  │  │ - Jobs      │     │ │
│  │  │ - Workflows │  │ - Temp Data │  │ - Events    │     │ │
│  │  │ - Audit Log │  │ - Metrics   │  │ - Retries   │     │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

#### Order Engine
- **Order Lifecycle Management**: Complete state tracking from creation to completion
- **Data Validation**: Order data integrity and business rule validation
- **Conflict Resolution**: Handle simultaneous updates and data conflicts
- **Audit Trail**: Complete transaction history for compliance and debugging

#### Workflow Engine
- **Rules Processing**: Execute configurable business rules and conditions
- **State Transitions**: Manage order state changes based on triggers
- **Integration Orchestration**: Coordinate calls to inventory, shipping, and analytics
- **Exception Handling**: Manage workflow failures and manual interventions

#### Status Management
- **Synchronization**: Bidirectional sync with TikTok Shop order status
- **Real-time Updates**: Push status changes to creators and customers
- **History Tracking**: Maintain complete status change timeline
- **Notification Triggers**: Generate alerts for status changes and exceptions

## Data Models

### Core Order Model

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  tiktok_order_id VARCHAR(255) UNIQUE NOT NULL,
  
  -- Order Details
  order_number VARCHAR(100) NOT NULL,
  order_status order_status_enum NOT NULL DEFAULT 'pending',
  workflow_status workflow_status_enum NOT NULL DEFAULT 'new',
  
  -- Financial Information
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  payment_status payment_status_enum NOT NULL DEFAULT 'pending',
  
  -- Customer Information
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  
  -- Shipping Information
  shipping_address JSONB NOT NULL,
  shipping_method VARCHAR(100),
  shipping_cost DECIMAL(10,2),
  
  -- Timestamps
  order_date TIMESTAMP WITH TIME ZONE NOT NULL,
  expected_ship_date TIMESTAMP WITH TIME ZONE,
  shipped_date TIMESTAMP WITH TIME ZONE,
  delivered_date TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  order_source VARCHAR(50) DEFAULT 'tiktok_shop',
  priority_level INTEGER DEFAULT 1,
  tags TEXT[],
  notes TEXT,
  
  -- Sync Information
  last_tiktok_sync TIMESTAMP WITH TIME ZONE,
  sync_status VARCHAR(50) DEFAULT 'pending',
  sync_attempts INTEGER DEFAULT 0,
  
  -- Audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  version INTEGER DEFAULT 1
);

-- Enums
CREATE TYPE order_status_enum AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'
);

CREATE TYPE workflow_status_enum AS ENUM (
  'new', 'validated', 'inventory_reserved', 'ready_to_ship', 'shipped', 'completed', 'failed'
);

CREATE TYPE payment_status_enum AS ENUM (
  'pending', 'paid', 'failed', 'refunded', 'partially_refunded'
);
```

### Order Items Model

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  tiktok_product_id VARCHAR(255) NOT NULL,
  
  -- Product Details
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100) NOT NULL,
  variant_name VARCHAR(255),
  
  -- Quantity and Pricing
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  
  -- Fulfillment Status
  fulfillment_status fulfillment_status_enum DEFAULT 'pending',
  shipped_quantity INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE fulfillment_status_enum AS ENUM (
  'pending', 'reserved', 'picked', 'packed', 'shipped', 'delivered', 'cancelled'
);
```

### Order Workflow Model

```sql
CREATE TABLE order_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  workflow_name VARCHAR(100) NOT NULL,
  
  -- Workflow State
  current_step VARCHAR(100) NOT NULL,
  workflow_status workflow_execution_status DEFAULT 'running',
  
  -- Execution Details
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  
  -- Configuration
  workflow_config JSONB,
  step_history JSONB DEFAULT '[]',
  
  -- Error Handling
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  retry_after TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE workflow_execution_status AS ENUM (
  'running', 'completed', 'failed', 'paused', 'cancelled'
);
```

### Order Status History

```sql
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  
  -- Status Change
  previous_status order_status_enum,
  new_status order_status_enum NOT NULL,
  status_reason VARCHAR(255),
  
  -- Change Details
  changed_by UUID REFERENCES users(id),
  change_source VARCHAR(50) DEFAULT 'system', -- 'system', 'user', 'tiktok_shop'
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### Order Query Endpoints

```typescript
// GET /api/orders
interface GetOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus[];
  workflow_status?: WorkflowStatus[];
  date_from?: string;
  date_to?: string;
  search?: string;
  sort_by?: 'order_date' | 'updated_at' | 'total_amount';
  sort_order?: 'asc' | 'desc';
}

interface GetOrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  summary: {
    total_orders: number;
    total_amount: number;
    status_breakdown: Record<OrderStatus, number>;
  };
}
```

```typescript
// GET /api/orders/{orderId}
interface GetOrderResponse {
  order: Order & {
    items: OrderItem[];
    workflow: OrderWorkflow;
    status_history: OrderStatusHistory[];
    shipping_info?: ShippingInfo;
    tracking_info?: TrackingInfo;
  };
}
```

### Order Management Endpoints

```typescript
// POST /api/orders/{orderId}/status
interface UpdateOrderStatusRequest {
  status: OrderStatus;
  reason?: string;
  notify_customer?: boolean;
  sync_to_tiktok?: boolean;
}

interface UpdateOrderStatusResponse {
  success: boolean;
  order: Order;
  workflow_triggered?: string;
}
```

```typescript
// POST /api/orders/{orderId}/workflow
interface TriggerWorkflowRequest {
  workflow_name: string;
  config?: Record<string, any>;
  force_restart?: boolean;
}

interface TriggerWorkflowResponse {
  success: boolean;
  workflow_id: string;
  estimated_completion?: string;
}
```

### Bulk Operations

```typescript
// POST /api/orders/bulk/status
interface BulkUpdateStatusRequest {
  order_ids: string[];
  status: OrderStatus;
  reason?: string;
  batch_size?: number;
}

interface BulkUpdateStatusResponse {
  success: boolean;
  processed: number;
  failed: number;
  batch_id: string;
  errors?: Array<{
    order_id: string;
    error: string;
  }>;
}
```

## Workflow Engine Specifications

### State Machine Definition

```typescript
interface OrderStateMachine {
  states: {
    [key in WorkflowStatus]: {
      entry_actions?: string[];
      exit_actions?: string[];
      transitions: {
        [trigger: string]: {
          target: WorkflowStatus;
          conditions?: string[];
          actions?: string[];
        };
      };
    };
  };
}

const defaultOrderWorkflow: OrderStateMachine = {
  states: {
    new: {
      entry_actions: ['validate_order_data'],
      transitions: {
        validate: {
          target: 'validated',
          conditions: ['order_data_valid', 'payment_confirmed'],
          actions: ['log_validation_success']
        },
        reject: {
          target: 'failed',
          actions: ['notify_creator', 'log_validation_failure']
        }
      }
    },
    validated: {
      entry_actions: ['check_inventory_availability'],
      transitions: {
        reserve_inventory: {
          target: 'inventory_reserved',
          conditions: ['inventory_available'],
          actions: ['reserve_stock', 'update_inventory']
        },
        backorder: {
          target: 'failed',
          conditions: ['inventory_unavailable'],
          actions: ['notify_out_of_stock', 'offer_alternatives']
        }
      }
    },
    inventory_reserved: {
      entry_actions: ['generate_pick_list', 'notify_warehouse'],
      transitions: {
        ready_to_ship: {
          target: 'ready_to_ship',
          conditions: ['items_picked', 'shipping_label_ready'],
          actions: ['create_shipping_label', 'update_tiktok_status']
        }
      }
    },
    ready_to_ship: {
      transitions: {
        ship: {
          target: 'shipped',
          actions: ['mark_shipped', 'send_tracking_info', 'notify_customer']
        }
      }
    },
    shipped: {
      transitions: {
        deliver: {
          target: 'completed',
          conditions: ['delivery_confirmed'],
          actions: ['mark_delivered', 'trigger_analytics', 'request_review']
        }
      }
    },
    completed: {
      entry_actions: ['finalize_order', 'update_creator_metrics']
    },
    failed: {
      entry_actions: ['log_failure_reason', 'notify_support']
    }
  }
};
```

### Workflow Actions

```typescript
interface WorkflowAction {
  name: string;
  handler: (context: WorkflowContext) => Promise<ActionResult>;
  retry_config?: {
    max_attempts: number;
    backoff_strategy: 'linear' | 'exponential';
    base_delay: number;
  };
}

interface WorkflowContext {
  order: Order;
  workflow: OrderWorkflow;
  user: User;
  metadata: Record<string, any>;
}

interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
  next_action?: string;
  delay?: number;
}
```

## Integration Specifications

### TikTok Shop Integration

#### Order Synchronization
```typescript
interface TikTokOrderSync {
  // Pull orders from TikTok Shop
  syncOrders(params: {
    since?: Date;
    status?: TikTokOrderStatus[];
    limit?: number;
  }): Promise<TikTokOrder[]>;
  
  // Push status updates to TikTok Shop
  updateOrderStatus(
    tiktokOrderId: string,
    status: TikTokOrderStatus,
    tracking?: TrackingInfo
  ): Promise<void>;
  
  // Handle webhook notifications
  processWebhook(payload: TikTokWebhookPayload): Promise<void>;
}
```

#### Webhook Processing
```typescript
interface TikTokWebhookPayload {
  event: 'order.created' | 'order.updated' | 'order.cancelled';
  timestamp: string;
  data: {
    order_id: string;
    status: TikTokOrderStatus;
    previous_status?: TikTokOrderStatus;
    metadata?: Record<string, any>;
  };
}

// Webhook handler
async function handleTikTokWebhook(payload: TikTokWebhookPayload) {
  // Verify signature
  if (!verifyWebhookSignature(payload)) {
    throw new Error('Invalid webhook signature');
  }
  
  // Process based on event type
  switch (payload.event) {
    case 'order.created':
      await createOrderFromTikTok(payload.data);
      break;
    case 'order.updated':
      await updateOrderFromTikTok(payload.data);
      break;
    case 'order.cancelled':
      await cancelOrderFromTikTok(payload.data);
      break;
  }
}
```

### Inventory System Integration

```typescript
interface InventoryIntegration {
  // Check product availability
  checkAvailability(items: OrderItem[]): Promise<AvailabilityResult>;
  
  // Reserve inventory for order
  reserveInventory(orderId: string, items: OrderItem[]): Promise<ReservationResult>;
  
  // Release reserved inventory
  releaseReservation(orderId: string): Promise<void>;
  
  // Adjust inventory after fulfillment
  adjustInventory(items: OrderItem[], reason: string): Promise<void>;
}

interface AvailabilityResult {
  available: boolean;
  items: Array<{
    product_id: string;
    requested_quantity: number;
    available_quantity: number;
    status: 'available' | 'partial' | 'unavailable';
  }>;
}
```

### Shipping System Integration

```typescript
interface ShippingIntegration {
  // Generate shipping label
  createShippingLabel(order: Order): Promise<ShippingLabel>;
  
  // Get shipping rates
  getShippingRates(order: Order): Promise<ShippingRate[]>;
  
  // Track shipment
  trackShipment(trackingNumber: string): Promise<TrackingInfo>;
  
  // Handle delivery confirmation
  confirmDelivery(trackingNumber: string): Promise<DeliveryConfirmation>;
}
```

## Performance Requirements

### Latency Targets
- **Order Creation**: <500ms for order ingestion and validation
- **Status Updates**: <200ms for status change processing
- **Workflow Execution**: <30s for standard order workflow completion
- **API Response Times**: <300ms for 95th percentile
- **TikTok Shop Sync**: <5s for bidirectional synchronization

### Scalability Requirements
- **Concurrent Orders**: 1,000+ simultaneous order processing
- **Daily Volume**: 50,000+ orders across all creators
- **Peak Load**: 10x normal volume during viral product events
- **Database Performance**: <100ms query response time
- **Queue Processing**: 100+ orders/second throughput

### Reliability Standards
- **System Uptime**: 99.95% availability
- **Data Durability**: Zero order data loss
- **Recovery Time**: <5 minutes for system recovery
- **Backup Frequency**: Real-time data replication
- **Failover**: Automatic failover for critical components

## Error Handling & Recovery

### Error Classification

| Error Type | Severity | Recovery Strategy | Example |
|------------|----------|-------------------|---------|
| **Validation** | Low | Automatic retry with corrected data | Invalid order format |
| **Integration** | Medium | Exponential backoff retry | TikTok API timeout |
| **Business Logic** | High | Manual intervention required | Inventory conflict |
| **System** | Critical | Immediate failover and alert | Database connection failure |

### Retry Mechanisms

```typescript
const retryConfig = {
  tiktokAPI: {
    maxAttempts: 5,
    baseDelay: 1000,
    maxDelay: 30000,
    backoffMultiplier: 2,
    retryableErrors: [429, 500, 502, 503, 504]
  },
  
  workflowActions: {
    maxAttempts: 3,
    baseDelay: 2000,
    maxDelay: 60000,
    backoffMultiplier: 1.5
  },
  
  inventoryOperations: {
    maxAttempts: 2,
    baseDelay: 500,
    maxDelay: 5000,
    backoffMultiplier: 2
  }
};
```

### Circuit Breaker Pattern

```typescript
const circuitBreakerConfig = {
  tiktokAPI: {
    failureThreshold: 10,
    resetTimeout: 60000,
    monitoringPeriod: 30000
  },
  
  inventoryService: {
    failureThreshold: 5,
    resetTimeout: 30000,
    monitoringPeriod: 15000
  }
};
```

## Security Considerations

### Data Protection
- **Encryption**: AES-256 encryption for PII data at rest
- **Transit Security**: TLS 1.3 for all API communications
- **Access Control**: Role-based permissions with RLS policies
- **Data Retention**: Configurable retention policies for order data

### API Security
- **Authentication**: JWT tokens with Supabase Auth integration
- **Authorization**: Fine-grained permissions for order operations
- **Rate Limiting**: Per-user and global rate limits
- **Input Validation**: Comprehensive validation with Zod schemas

### Webhook Security
```typescript
interface WebhookSecurity {
  // Verify TikTok Shop webhook signatures
  verifySignature(payload: string, signature: string): boolean;
  
  // Implement replay attack protection
  validateTimestamp(timestamp: string, tolerance: number): boolean;
  
  // Rate limiting for webhook endpoints
  rateLimitWebhooks(source: string): boolean;
}
```

## Monitoring & Observability

### Key Metrics

```typescript
const orderMetrics = {
  // Performance metrics
  'order.processing.latency.p95': '<30s',
  'order.api.response_time.p95': '<300ms',
  'order.workflow.completion_rate': '>99%',
  
  // Business metrics
  'order.daily.volume': 'count',
  'order.status.distribution': 'percentage',
  'order.error.rate': '<1%',
  
  // Integration metrics
  'tiktok.sync.success_rate': '>99.5%',
  'inventory.reservation.success_rate': '>99%',
  'shipping.label.generation.success_rate': '>98%'
};
```

### Health Checks

```typescript
// GET /api/health/orders
interface OrderHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    database: HealthStatus;
    tiktokAPI: HealthStatus;
    workflowEngine: HealthStatus;
    messageQueue: HealthStatus;
  };
  metrics: {
    activeOrders: number;
    pendingWorkflows: number;
    queueDepth: number;
    lastProcessedOrder: string;
  };
}
```

### Alerting Thresholds

```yaml
alerts:
  critical:
    - metric: order.processing.failure_rate
      threshold: '>5%'
      duration: '5m'
    - metric: tiktok.sync.failure_rate
      threshold: '>10%'
      duration: '10m'
  
  warning:
    - metric: order.processing.latency.p95
      threshold: '>60s'
      duration: '15m'
    - metric: workflow.queue.depth
      threshold: '>1000'
      duration: '10m'
```

## Related Documentation

- [Investigation: Requirements Analysis](../00-planning/P001-DRAFT-order-management-investigation.md)
- [Workflow Engine Specifications](./S002-DRAFT-order-workflow-engine.md)
- [Integration Specifications](./S003-DRAFT-order-integration-specs.md)
- [Implementation: Progress Tracking](../02-implementation/I001-DRAFT-order-management-progress.md)
