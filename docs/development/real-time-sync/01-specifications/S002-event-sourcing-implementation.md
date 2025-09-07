# S002 - Event Sourcing Implementation Specification

**Document Type**: Technical Specifications  
**Status**: Draft  
**Priority**: Must Have (M)  
**Last Updated**: 2025-09-07  
**Owner**: Real-Time Sync Specialist

## Executive Summary

This document specifies the event sourcing implementation for CreatorFlow's real-time synchronization system. Event sourcing provides the foundation for conflict resolution, audit trails, system recovery, and real-time dashboard updates by storing all state changes as immutable events.

## Event Store Architecture

### Core Event Store Schema

```sql
-- Primary event store table
CREATE TABLE event_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_id UUID NOT NULL,
    aggregate_type TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_data JSONB NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}',
    version INTEGER NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    correlation_id UUID,
    causation_id UUID,
    user_id UUID,
    
    -- Performance indexes
    CONSTRAINT event_store_aggregate_version_unique 
        UNIQUE (aggregate_id, version)
) PARTITION BY RANGE (occurred_at);

-- Monthly partitions for performance
CREATE TABLE event_store_y2025m01 PARTITION OF event_store
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Additional partitions created automatically via cron job

-- Indexes for optimal query performance
CREATE INDEX idx_event_store_aggregate_id ON event_store (aggregate_id);
CREATE INDEX idx_event_store_event_type ON event_store (event_type);
CREATE INDEX idx_event_store_occurred_at ON event_store (occurred_at DESC);
CREATE INDEX idx_event_store_correlation_id ON event_store (correlation_id) 
    WHERE correlation_id IS NOT NULL;
CREATE INDEX idx_event_store_user_id ON event_store (user_id) 
    WHERE user_id IS NOT NULL;

-- Composite indexes for common query patterns
CREATE INDEX idx_event_store_aggregate_type_occurred 
    ON event_store (aggregate_type, occurred_at DESC);
CREATE INDEX idx_event_store_aggregate_version 
    ON event_store (aggregate_id, version);
```

### Event Metadata Schema

```typescript
interface EventMetadata {
  // Tracing and correlation
  correlation_id?: string;     // Links related events across aggregates
  causation_id?: string;       // The event that caused this event
  request_id?: string;         // HTTP request that triggered this event
  
  // Source information
  source: 'tiktok_webhook' | 'admin_panel' | 'automated_system' | 'api_call';
  source_ip?: string;          // IP address of the request origin
  user_agent?: string;         // User agent if from web request
  
  // Processing metadata
  idempotency_key?: string;    // For duplicate detection
  retry_count?: number;        // Number of processing attempts
  processing_time_ms?: number; // Time taken to process event
  
  // Business context
  shop_id?: string;           // TikTok Shop identifier
  creator_id: string;         // CreatorFlow user identifier
  order_value?: number;       // Financial impact of the event
  priority: 'low' | 'normal' | 'high' | 'critical';
  
  // System metadata
  service_version: string;     // Version of service that created event
  environment: 'development' | 'staging' | 'production';
  region?: string;            // Geographic region where event occurred
}
```

### Aggregate Definition Patterns

```typescript
// Base aggregate interface
interface Aggregate {
  id: string;
  version: number;
  created_at: Date;
  updated_at: Date;
  
  // Apply events to rebuild state
  apply(event: DomainEvent): void;
  
  // Get uncommitted events
  getUncommittedEvents(): DomainEvent[];
  
  // Mark events as committed
  markEventsAsCommitted(): void;
}

// Order aggregate example
interface OrderAggregate extends Aggregate {
  // Current state
  tiktok_order_id: string;
  status: OrderStatus;
  items: OrderItem[];
  shipping_address: Address;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  
  // Business methods that generate events
  processPayment(payment_info: PaymentInfo): void;
  allocateInventory(inventory_allocation: InventoryAllocation): void;
  ship(tracking_info: TrackingInfo): void;
  cancel(reason: string): void;
}

// Inventory aggregate example
interface InventoryAggregate extends Aggregate {
  // Current state
  product_id: string;
  sku: string;
  available_quantity: number;
  reserved_quantity: number;
  total_quantity: number;
  reorder_point: number;
  velocity_per_hour: number;
  last_sync_at: Date;
  
  // Business methods
  updateStock(new_quantity: number, source: string): void;
  reserve(quantity: number, order_id: string): void;
  release(quantity: number, order_id: string): void;
  sync(external_quantity: number, source: string): void;
}
```

## Event Type Definitions

### Order Events

```typescript
interface OrderEventTypes {
  'order.received_from_tiktok': {
    tiktok_order_id: string;
    order_data: TikTokOrderData;
    webhook_signature: string;
    received_at: Date;
  };
  
  'order.validated': {
    order_id: string;
    validation_results: ValidationResult[];
    is_valid: boolean;
    validation_time_ms: number;
  };
  
  'order.inventory_allocated': {
    order_id: string;
    allocations: Array<{
      product_id: string;
      quantity: number;
      reserved_at: Date;
    }>;
    total_items_allocated: number;
  };
  
  'order.payment_processed': {
    order_id: string;
    payment_method: string;
    amount: number;
    currency: string;
    transaction_id: string;
    processed_at: Date;
  };
  
  'order.shipped': {
    order_id: string;
    tracking_number: string;
    carrier: string;
    shipping_method: string;
    estimated_delivery: Date;
    shipped_at: Date;
  };
  
  'order.delivered': {
    order_id: string;
    delivered_at: Date;
    signature?: string;
    delivery_confirmation: string;
  };
  
  'order.cancelled': {
    order_id: string;
    reason: string;
    cancelled_by: 'customer' | 'admin' | 'system';
    refund_amount?: number;
    cancelled_at: Date;
  };
  
  'order.refunded': {
    order_id: string;
    refund_amount: number;
    refund_reason: string;
    refund_transaction_id: string;
    refunded_at: Date;
  };
}
```

### Inventory Events

```typescript
interface InventoryEventTypes {
  'inventory.stock_updated': {
    product_id: string;
    previous_quantity: number;
    new_quantity: number;
    change_delta: number;
    source: 'manual' | 'sync' | 'sale' | 'restock' | 'adjustment';
    updated_by?: string;
    sync_source?: string;
  };
  
  'inventory.reserved': {
    product_id: string;
    quantity: number;
    order_id: string;
    reservation_id: string;
    expires_at: Date;
    reserved_at: Date;
  };
  
  'inventory.released': {
    product_id: string;
    quantity: number;
    order_id: string;
    reservation_id: string;
    reason: 'order_cancelled' | 'reservation_expired' | 'manual_release';
    released_at: Date;
  };
  
  'inventory.low_stock_detected': {
    product_id: string;
    current_quantity: number;
    reorder_point: number;
    velocity_per_hour: number;
    estimated_stockout_hours: number;
    severity: 'warning' | 'critical' | 'emergency';
  };
  
  'inventory.reorder_triggered': {
    product_id: string;
    current_quantity: number;
    suggested_quantity: number;
    supplier_id?: string;
    trigger_reason: 'low_stock' | 'velocity_increase' | 'manual';
    expected_delivery_date?: Date;
  };
  
  'inventory.sync_conflict_detected': {
    product_id: string;
    local_quantity: number;
    external_quantity: number;
    external_source: string;
    conflict_type: 'quantity_mismatch' | 'concurrent_update' | 'stale_data';
    detected_at: Date;
  };
  
  'inventory.sync_conflict_resolved': {
    product_id: string;
    conflict_id: string;
    resolution_method: 'manual' | 'automatic' | 'business_rule';
    winning_value: number;
    losing_value: number;
    resolved_by?: string;
    resolved_at: Date;
  };
}
```

### System Events

```typescript
interface SystemEventTypes {
  'system.health_check_completed': {
    component: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
    response_time_ms: number;
    error_message?: string;
    metrics: Record<string, number>;
    checked_at: Date;
  };
  
  'system.performance_threshold_exceeded': {
    metric: string;
    current_value: number;
    threshold: number;
    severity: 'warning' | 'critical';
    component: string;
    duration_seconds: number;
  };
  
  'system.api_rate_limit_approached': {
    api_provider: string;
    current_requests_per_minute: number;
    rate_limit: number;
    utilization_percentage: number;
    estimated_limit_hit_time?: Date;
  };
  
  'system.sync_failure_detected': {
    sync_type: string;
    source_system: string;
    target_system: string;
    error_type: string;
    error_message: string;
    failed_records_count: number;
    last_successful_sync?: Date;
  };
  
  'system.recovery_completed': {
    recovery_type: string;
    failed_component: string;
    recovery_duration_seconds: number;
    recovery_method: 'automatic' | 'manual';
    data_loss_occurred: boolean;
    recovered_records_count?: number;
  };
}
```

## Event Processing Patterns

### Event Handler Implementation

```typescript
interface EventHandler<T = any> {
  eventType: string;
  handle(event: DomainEvent<T>, context: EventContext): Promise<void>;
  canHandle(event: DomainEvent): boolean;
  getRetryPolicy(): RetryPolicy;
}

// Base event handler class
abstract class BaseEventHandler<T> implements EventHandler<T> {
  abstract eventType: string;
  
  abstract handle(event: DomainEvent<T>, context: EventContext): Promise<void>;
  
  canHandle(event: DomainEvent): boolean {
    return event.event_type === this.eventType;
  }
  
  getRetryPolicy(): RetryPolicy {
    return {
      maxRetries: 3,
      backoffStrategy: 'exponential',
      baseDelayMs: 1000,
      maxDelayMs: 30000
    };
  }
  
  protected async withErrorHandling<R>(
    operation: () => Promise<R>,
    context: EventContext
  ): Promise<R> {
    try {
      return await operation();
    } catch (error) {
      await this.logError(error, context);
      throw error;
    }
  }
  
  private async logError(error: Error, context: EventContext): Promise<void> {
    // Log error details for debugging and monitoring
    console.error('Event processing error:', {
      eventId: context.event.id,
      eventType: context.event.event_type,
      aggregateId: context.event.aggregate_id,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}

// Example: Inventory stock update handler
class InventoryStockUpdateHandler extends BaseEventHandler<InventoryEventTypes['inventory.stock_updated']> {
  eventType = 'inventory.stock_updated';
  
  constructor(
    private inventoryService: InventoryService,
    private metricsService: MetricsService,
    private alertService: AlertService
  ) {
    super();
  }
  
  async handle(
    event: DomainEvent<InventoryEventTypes['inventory.stock_updated']>,
    context: EventContext
  ): Promise<void> {
    await this.withErrorHandling(async () => {
      const { product_id, new_quantity, change_delta, source } = event.event_data;
      
      // Update read models
      await this.inventoryService.updateStockLevel(product_id, new_quantity);
      
      // Update velocity calculations
      await this.inventoryService.updateVelocityMetrics(product_id);
      
      // Check for low stock alerts
      const inventory = await this.inventoryService.getInventory(product_id);
      if (inventory.available_quantity <= inventory.reorder_point) {
        await this.alertService.createLowStockAlert(inventory);
      }
      
      // Update dashboard metrics
      await this.metricsService.updateInventoryMetrics(product_id);
      
      // Publish real-time updates
      await this.publishRealtimeUpdate({
        type: 'inventory_updated',
        product_id,
        new_quantity,
        change_delta,
        updated_at: event.occurred_at
      });
      
    }, context);
  }
  
  private async publishRealtimeUpdate(update: any): Promise<void> {
    // Send real-time update to subscribed clients
    const supabase = createServerClient();
    await supabase.channel('inventory_updates').send({
      type: 'broadcast',
      event: 'inventory_changed',
      payload: update
    });
  }
}
```

### Saga Implementation for Complex Workflows

```typescript
// Order fulfillment saga
class OrderFulfillmentSaga {
  private steps: SagaStep[] = [
    { name: 'validate_order', handler: this.validateOrder },
    { name: 'allocate_inventory', handler: this.allocateInventory },
    { name: 'process_payment', handler: this.processPayment },
    { name: 'generate_shipping_label', handler: this.generateShippingLabel },
    { name: 'update_tiktok_status', handler: this.updateTikTokStatus }
  ];
  
  private compensations: Record<string, CompensationHandler> = {
    'allocate_inventory': this.releaseInventory,
    'process_payment': this.refundPayment,
    'generate_shipping_label': this.cancelShipping,
    'update_tiktok_status': this.revertTikTokStatus
  };
  
  async execute(orderId: string): Promise<SagaResult> {
    const sagaId = generateUUID();
    const completedSteps: string[] = [];
    
    try {
      for (const step of this.steps) {
        await step.handler(orderId, sagaId);
        completedSteps.push(step.name);
        
        // Store saga progress for recovery
        await this.storeSagaProgress(sagaId, step.name, 'completed');
      }
      
      return { success: true, sagaId, completedSteps };
      
    } catch (error) {
      // Execute compensations in reverse order
      await this.executeCompensations(completedSteps.reverse(), orderId, sagaId);
      
      return { 
        success: false, 
        sagaId, 
        error: error.message,
        compensatedSteps: completedSteps 
      };
    }
  }
  
  private async executeCompensations(
    completedSteps: string[], 
    orderId: string, 
    sagaId: string
  ): Promise<void> {
    for (const stepName of completedSteps) {
      const compensation = this.compensations[stepName];
      if (compensation) {
        try {
          await compensation(orderId, sagaId);
          await this.storeSagaProgress(sagaId, stepName, 'compensated');
        } catch (compensationError) {
          // Log compensation failure but continue
          console.error('Compensation failed:', {
            sagaId,
            step: stepName,
            error: compensationError.message
          });
        }
      }
    }
  }
  
  private async validateOrder(orderId: string, sagaId: string): Promise<void> {
    const order = await this.orderService.getOrder(orderId);
    
    // Emit event for validation
    await this.eventStore.append({
      aggregate_id: orderId,
      aggregate_type: 'order',
      event_type: 'order.validation_started',
      event_data: { saga_id: sagaId },
      metadata: { correlation_id: sagaId }
    });
    
    // Perform validation logic
    const validationResult = await this.orderValidationService.validate(order);
    
    if (!validationResult.isValid) {
      throw new Error(`Order validation failed: ${validationResult.errors.join(', ')}`);
    }
    
    await this.eventStore.append({
      aggregate_id: orderId,
      aggregate_type: 'order',
      event_type: 'order.validated',
      event_data: { 
        saga_id: sagaId,
        validation_results: validationResult.results
      },
      metadata: { correlation_id: sagaId }
    });
  }
  
  // Additional saga step implementations...
}
```

### Event Projection and Read Models

```typescript
// Dashboard metrics projection
class DashboardMetricsProjection {
  async project(event: DomainEvent): Promise<void> {
    switch (event.event_type) {
      case 'order.completed':
        await this.updateRevenueMetrics(event);
        await this.updateOrderMetrics(event);
        break;
        
      case 'inventory.stock_updated':
        await this.updateInventoryMetrics(event);
        break;
        
      case 'system.performance_threshold_exceeded':
        await this.updateSystemHealthMetrics(event);
        break;
        
      default:
        // Log unhandled event type
        console.debug('Unhandled event type in dashboard projection:', event.event_type);
    }
  }
  
  private async updateRevenueMetrics(event: DomainEvent<OrderEventTypes['order.completed']>): Promise<void> {
    const { order_value, currency, completed_at } = event.event_data;
    
    // Update daily revenue aggregation
    await this.metricsStore.increment('daily_revenue', {
      date: format(completed_at, 'yyyy-MM-dd'),
      creator_id: event.metadata.creator_id,
      currency
    }, order_value);
    
    // Update real-time revenue counter
    await this.metricsStore.increment('realtime_revenue', {
      creator_id: event.metadata.creator_id
    }, order_value);
    
    // Trigger real-time dashboard update
    await this.publishDashboardUpdate({
      type: 'revenue_updated',
      creator_id: event.metadata.creator_id,
      new_revenue: order_value,
      timestamp: completed_at
    });
  }
  
  private async updateOrderMetrics(event: DomainEvent): Promise<void> {
    const creatorId = event.metadata.creator_id;
    
    // Update order count metrics
    await this.metricsStore.increment('daily_orders', {
      date: format(event.occurred_at, 'yyyy-MM-dd'),
      creator_id: creatorId
    }, 1);
    
    // Update processing time metrics
    const processingTime = event.metadata.processing_time_ms;
    if (processingTime) {
      await this.metricsStore.recordTimestamp('order_processing_time', {
        creator_id: creatorId
      }, processingTime);
    }
  }
  
  private async updateInventoryMetrics(event: DomainEvent<InventoryEventTypes['inventory.stock_updated']>): Promise<void> {
    const { product_id, new_quantity, change_delta } = event.event_data;
    const creatorId = event.metadata.creator_id;
    
    // Update inventory level metrics
    await this.metricsStore.set('current_stock_level', {
      product_id,
      creator_id: creatorId
    }, new_quantity);
    
    // Calculate and update velocity metrics
    const velocity = await this.calculateVelocity(product_id);
    await this.metricsStore.set('inventory_velocity', {
      product_id,
      creator_id: creatorId
    }, velocity);
    
    // Check for critical stock alerts
    if (new_quantity <= await this.getReorderPoint(product_id)) {
      await this.publishDashboardUpdate({
        type: 'critical_stock_alert',
        creator_id: creatorId,
        product_id,
        current_stock: new_quantity,
        velocity,
        estimated_stockout_hours: new_quantity / Math.max(velocity, 1)
      });
    }
  }
}
```

### Event Replay and Recovery

```typescript
class EventReplayService {
  async replayEventsForAggregate(
    aggregateId: string,
    fromVersion?: number,
    toVersion?: number
  ): Promise<any> {
    const events = await this.eventStore.getEventsForAggregate(
      aggregateId,
      fromVersion,
      toVersion
    );
    
    // Determine aggregate type from first event
    const aggregateType = events[0]?.aggregate_type;
    if (!aggregateType) {
      throw new Error(`No events found for aggregate ${aggregateId}`);
    }
    
    // Create aggregate instance
    const aggregate = this.aggregateFactory.create(aggregateType, aggregateId);
    
    // Apply events in order
    for (const event of events) {
      aggregate.apply(event);
    }
    
    return aggregate;
  }
  
  async replayEventsForTimeRange(
    fromDate: Date,
    toDate: Date,
    eventTypes?: string[]
  ): Promise<void> {
    const batchSize = 1000;
    let offset = 0;
    let hasMoreEvents = true;
    
    while (hasMoreEvents) {
      const events = await this.eventStore.getEventsByTimeRange(
        fromDate,
        toDate,
        { 
          eventTypes,
          limit: batchSize,
          offset 
        }
      );
      
      if (events.length === 0) {
        hasMoreEvents = false;
        break;
      }
      
      // Process events in parallel batches
      const processingPromises = events.map(event => 
        this.reprocessEvent(event)
      );
      
      await Promise.allSettled(processingPromises);
      
      offset += batchSize;
      hasMoreEvents = events.length === batchSize;
    }
  }
  
  private async reprocessEvent(event: DomainEvent): Promise<void> {
    try {
      // Mark as reprocessing to avoid duplicate side effects
      const context: EventContext = {
        event,
        isReplay: true,
        originalProcessedAt: event.processed_at
      };
      
      // Find appropriate handler
      const handler = this.eventHandlerRegistry.getHandler(event.event_type);
      if (handler) {
        await handler.handle(event, context);
      }
      
      // Update processed timestamp
      await this.eventStore.markAsReprocessed(event.id);
      
    } catch (error) {
      console.error('Event replay failed:', {
        eventId: event.id,
        eventType: event.event_type,
        error: error.message
      });
    }
  }
}
```

### Snapshot Management

```typescript
class SnapshotService {
  async createSnapshot(aggregate: Aggregate): Promise<void> {
    const snapshot = {
      aggregate_id: aggregate.id,
      aggregate_type: aggregate.constructor.name,
      version: aggregate.version,
      data: aggregate.toSnapshot(),
      created_at: new Date()
    };
    
    await this.snapshotStore.save(snapshot);
    
    // Clean up old snapshots (keep last 5)
    await this.snapshotStore.cleanup(aggregate.id, 5);
  }
  
  async loadFromSnapshot(
    aggregateId: string,
    aggregateType: string
  ): Promise<{ aggregate: Aggregate; fromVersion: number } | null> {
    const snapshot = await this.snapshotStore.getLatest(aggregateId);
    
    if (!snapshot) {
      return null;
    }
    
    const aggregate = this.aggregateFactory.create(aggregateType, aggregateId);
    aggregate.loadFromSnapshot(snapshot.data, snapshot.version);
    
    return {
      aggregate,
      fromVersion: snapshot.version + 1
    };
  }
  
  async shouldCreateSnapshot(aggregate: Aggregate): Promise<boolean> {
    const eventsSinceLastSnapshot = await this.eventStore.countEventsSinceVersion(
      aggregate.id,
      await this.getLastSnapshotVersion(aggregate.id)
    );
    
    // Create snapshot every 100 events
    return eventsSinceLastSnapshot >= 100;
  }
}
```

## Performance Optimization

### Event Store Optimization

```sql
-- Optimized queries for common event store operations

-- Get events for aggregate with pagination
CREATE OR REPLACE FUNCTION get_aggregate_events(
    p_aggregate_id UUID,
    p_from_version INTEGER DEFAULT 0,
    p_limit INTEGER DEFAULT 1000
) RETURNS SETOF event_store AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM event_store
    WHERE aggregate_id = p_aggregate_id
      AND version >= p_from_version
    ORDER BY version
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Get events by type with time range
CREATE OR REPLACE FUNCTION get_events_by_type_and_time(
    p_event_type TEXT,
    p_from_date TIMESTAMPTZ,
    p_to_date TIMESTAMPTZ,
    p_limit INTEGER DEFAULT 1000,
    p_offset INTEGER DEFAULT 0
) RETURNS SETOF event_store AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM event_store
    WHERE event_type = p_event_type
      AND occurred_at BETWEEN p_from_date AND p_to_date
    ORDER BY occurred_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- Optimized event count for metrics
CREATE MATERIALIZED VIEW event_metrics_hourly AS
SELECT 
    date_trunc('hour', occurred_at) as hour,
    event_type,
    aggregate_type,
    COUNT(*) as event_count,
    AVG(EXTRACT(EPOCH FROM (processed_at - occurred_at)) * 1000) as avg_processing_time_ms
FROM event_store
WHERE processed_at IS NOT NULL
GROUP BY date_trunc('hour', occurred_at), event_type, aggregate_type;

-- Refresh materialized view every hour
CREATE INDEX idx_event_metrics_hourly_hour ON event_metrics_hourly (hour DESC);

-- Auto-refresh materialized view
CREATE OR REPLACE FUNCTION refresh_event_metrics() RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY event_metrics_hourly;
END;
$$ LANGUAGE plpgsql;
```

### Memory and Processing Optimization

```typescript
interface EventProcessingOptimization {
  batch_processing: {
    batch_size: 100;
    parallel_batches: 5;
    batch_timeout_ms: 5000;
    memory_limit_mb: 512;
  };
  
  event_filtering: {
    relevance_scoring: 'Process high-priority events first';
    deduplication: 'Skip duplicate events within 1-second window';
    circuit_breaker: 'Skip processing if error rate >10%';
  };
  
  memory_management: {
    aggregate_cache_size: 1000;
    event_buffer_size: 10000;
    gc_trigger_threshold: '80% memory usage';
    memory_monitoring_interval: 30000; // 30 seconds
  };
}

class OptimizedEventProcessor {
  private processingQueue = new PriorityQueue<DomainEvent>();
  private batchProcessor = new BatchProcessor({
    batchSize: 100,
    maxWaitTime: 5000,
    processor: this.processBatch.bind(this)
  });
  
  async processEvent(event: DomainEvent): Promise<void> {
    // Add to priority queue based on event metadata
    const priority = this.calculateEventPriority(event);
    this.processingQueue.enqueue(event, priority);
    
    // Trigger batch processing if queue is full
    if (this.processingQueue.size() >= 100) {
      await this.processBatch();
    }
  }
  
  private calculateEventPriority(event: DomainEvent): number {
    const priorities = {
      'order.payment_processed': 10,
      'inventory.low_stock_detected': 9,
      'system.health_check_completed': 8,
      'order.shipped': 7,
      'inventory.stock_updated': 6
    };
    
    return priorities[event.event_type] || 5;
  }
  
  private async processBatch(events?: DomainEvent[]): Promise<void> {
    const batch = events || this.processingQueue.dequeueMultiple(100);
    
    if (batch.length === 0) return;
    
    // Group events by handler for efficient processing
    const handlerGroups = new Map<string, DomainEvent[]>();
    
    for (const event of batch) {
      const handlerKey = event.event_type;
      if (!handlerGroups.has(handlerKey)) {
        handlerGroups.set(handlerKey, []);
      }
      handlerGroups.get(handlerKey)!.push(event);
    }
    
    // Process each group in parallel
    const processingPromises = Array.from(handlerGroups.entries()).map(
      ([handlerKey, groupEvents]) => this.processEventGroup(handlerKey, groupEvents)
    );
    
    await Promise.allSettled(processingPromises);
  }
  
  private async processEventGroup(handlerKey: string, events: DomainEvent[]): Promise<void> {
    const handler = this.eventHandlerRegistry.getHandler(handlerKey);
    if (!handler) return;
    
    for (const event of events) {
      try {
        await handler.handle(event, { event, isReplay: false });
        await this.markEventAsProcessed(event.id);
      } catch (error) {
        await this.handleProcessingError(event, error);
      }
    }
  }
}
```

## Related Documents

- [S001-Comprehensive-Realtime-Sync-Architecture.md](S001-comprehensive-realtime-sync-architecture.md) - Overall synchronization architecture
- [S003-Supabase-Realtime-Integration.md](S003-supabase-realtime-integration.md) - Supabase-specific implementation
- [I001-DRAFT-Sync-Engine-Implementation.md](../02-implementation/I001-DRAFT-sync-engine-implementation.md) - Implementation progress
- [CreatorFlow Database Schema](../../architecture/database/README.md) - Database architecture context