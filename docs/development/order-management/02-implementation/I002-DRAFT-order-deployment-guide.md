# I002-DRAFT: Order Management System Deployment Guide

**Document Type**: Implementation  
**Status**: DRAFT  
**Priority**: Must Have (M)  
**Created**: 2025-09-03  
**Last Updated**: 2025-09-03  

## Overview

This document provides comprehensive deployment procedures for CreatorFlow's core Order Management system, including environment setup, database migrations, service deployment, integration configuration, and rollout strategy.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT PIPELINE                     │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Development   │  │     Staging     │  │ Production  │ │
│  │                 │  │                 │  │             │ │
│  │ - Local DB      │──►│ - Staging DB    │──►│ - Prod DB   │ │
│  │ - Mock APIs     │  │ - Test APIs     │  │ - Live APIs │ │
│  │ - Feature ON    │  │ - Feature ON    │  │ - Gradual   │ │
│  │ - Hot Reload    │  │ - Full Testing  │  │ - Rollout   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│           ▲                      ▲                  ▲       │
│           │                      │                  │       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 CI/CD Pipeline                          │ │
│  │                                                         │ │
│  │  Build → Test → Security → Deploy → Monitor → Rollback │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                ▲                            │
│                                │                            │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Infrastructure Layer                       │ │
│  │                                                         │ │
│  │ Supabase DB ◄─► Redis Cache ◄─► Message Queue ◄─► CDN  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Pre-Deployment Checklist

### Environment Verification
- [ ] Supabase database accessible with proper connection pooling
- [ ] Redis cache cluster operational with failover configured
- [ ] Message queue system (BullMQ/Redis) running
- [ ] TikTok Shop API credentials configured and tested
- [ ] Monitoring and alerting systems operational
- [ ] Feature flags system configured
- [ ] CDN and static asset delivery configured

### Code Quality Gates
- [ ] All unit tests passing (>90% coverage)
- [ ] Integration tests passing (all external APIs)
- [ ] E2E tests passing (critical user journeys)
- [ ] Performance tests meeting benchmarks
- [ ] Security scan completed with no critical issues
- [ ] Code review approved by senior engineers
- [ ] Documentation updated and reviewed

### Infrastructure Requirements
- [ ] Database storage capacity verified (6 months growth)
- [ ] API rate limits configured for all external services
- [ ] Load balancer configuration tested
- [ ] Auto-scaling policies configured
- [ ] Backup and disaster recovery procedures tested
- [ ] SSL certificates valid and auto-renewal configured

## Database Migration Strategy

### Migration Scripts

#### 1. Core Order Tables
```sql
-- migrations/001_create_orders_table.sql
BEGIN;

-- Create order status enums
CREATE TYPE order_status_enum AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'
);

CREATE TYPE workflow_status_enum AS ENUM (
  'new', 'validated', 'inventory_reserved', 'ready_to_ship', 'shipped', 'completed', 'failed'
);

CREATE TYPE payment_status_enum AS ENUM (
  'pending', 'paid', 'failed', 'refunded', 'partially_refunded'
);

-- Create orders table
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

-- Indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_tiktok_order_id ON orders(tiktok_order_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_workflow_status ON orders(workflow_status);
CREATE INDEX idx_orders_order_date ON orders(order_date DESC);
CREATE INDEX idx_orders_sync_status ON orders(sync_status) WHERE sync_status != 'synced';

-- RLS Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (user_id = auth.uid());

COMMIT;
```

#### 2. Order Items and Workflow Tables
```sql
-- migrations/002_create_order_items_and_workflows.sql
BEGIN;

-- Order Items
CREATE TYPE fulfillment_status_enum AS ENUM (
  'pending', 'reserved', 'picked', 'packed', 'shipped', 'delivered', 'cancelled'
);

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

-- Order Workflows
CREATE TYPE workflow_execution_status AS ENUM (
  'running', 'completed', 'failed', 'paused', 'cancelled'
);

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
  context_variables JSONB DEFAULT '{}',
  
  -- Error Handling
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  retry_after TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Status History
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  
  -- Status Change
  previous_status order_status_enum,
  new_status order_status_enum NOT NULL,
  status_reason VARCHAR(255),
  
  -- Change Details
  changed_by UUID REFERENCES users(id),
  change_source VARCHAR(50) DEFAULT 'system',
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_order_workflows_order_id ON order_workflows(order_id);
CREATE INDEX idx_order_workflows_status ON order_workflows(workflow_status);
CREATE INDEX idx_order_status_history_order_id ON order_status_history(order_id);

-- RLS Policies
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access order items for their orders" ON order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can access workflows for their orders" ON order_workflows
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_workflows.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can access status history for their orders" ON order_status_history
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_status_history.order_id 
      AND orders.user_id = auth.uid()
    )
  );

COMMIT;
```

### Migration Execution Strategy

#### Development Environment
```bash
# Run migrations locally
bun run supabase:db:reset
bun run migration:up

# Verify schema
bun run db:verify-schema

# Seed test data
bun run db:seed:orders
```

#### Staging Environment
```bash
# Deploy to staging
bun run deploy:staging

# Run migrations with monitoring
bun run migration:up --env=staging --monitor

# Run smoke tests
bun run test:smoke:orders --env=staging

# Performance validation
bun run test:performance:orders --env=staging
```

#### Production Environment
```bash
# Create database backup
bun run db:backup --env=production --full

# Run migrations with zero-downtime strategy
bun run migration:up --env=production --zero-downtime

# Verify data integrity
bun run db:verify:orders --env=production

# Monitor system health
bun run monitor:health --duration=30m
```

## Service Deployment

### Order Management Services

#### Core Order Service
```yaml
# docker-compose.order-service.yml
version: '3.8'
services:
  order-service:
    image: creatorflow/order-service:${VERSION}
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - TIKTOK_SHOP_API_KEY=${TIKTOK_SHOP_API_KEY}
      - TIKTOK_SHOP_WEBHOOK_SECRET=${TIKTOK_SHOP_WEBHOOK_SECRET}
    ports:
      - "3001:3001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

#### Workflow Engine Service
```yaml
# docker-compose.workflow-engine.yml
version: '3.8'
services:
  workflow-engine:
    image: creatorflow/workflow-engine:${VERSION}
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - QUEUE_NAME=order_workflows
    ports:
      - "3002:3002"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3002/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
        reservations:
          memory: 512M
          cpus: '0.5'
```

### Environment Configuration

#### Production Environment Variables
```bash
# Order Management Core
ORDER_SERVICE_PORT=3001
ORDER_PROCESSING_QUEUE=order_processing
ORDER_BATCH_SIZE=50
ORDER_RETRY_ATTEMPTS=3
ORDER_TIMEOUT_MS=30000

# Workflow Engine
WORKFLOW_ENGINE_PORT=3002
WORKFLOW_QUEUE=order_workflows
WORKFLOW_CONCURRENCY=10
WORKFLOW_RETRY_ATTEMPTS=3
WORKFLOW_TIMEOUT_MS=60000

# TikTok Shop Integration
TIKTOK_SHOP_API_URL=https://api.tiktokshop.com
TIKTOK_SHOP_API_KEY=${TIKTOK_SHOP_API_KEY}
TIKTOK_SHOP_WEBHOOK_SECRET=${TIKTOK_SHOP_WEBHOOK_SECRET}
TIKTOK_SHOP_RATE_LIMIT=100
TIKTOK_SHOP_TIMEOUT_MS=10000

# Database Configuration
DATABASE_URL=${SUPABASE_DATABASE_URL}
DATABASE_POOL_SIZE=20
DATABASE_TIMEOUT_MS=5000

# Cache Configuration
REDIS_URL=${REDIS_CLUSTER_URL}
REDIS_TTL_DEFAULT=3600
REDIS_MAX_CONNECTIONS=50

# Monitoring
SENTRY_DSN=${SENTRY_DSN}
LOG_LEVEL=info
METRICS_PORT=9090
```

## Feature Flag Configuration

### Order Management Feature Flags

```typescript
// Feature flag definitions
export const ORDER_MANAGEMENT_FLAGS = {
  ORDER_PROCESSING_ENABLED: 'order_processing_enabled',
  WORKFLOW_ENGINE_ENABLED: 'workflow_engine_enabled',
  TIKTOK_SYNC_ENABLED: 'tiktok_sync_enabled',
  BULK_OPERATIONS_ENABLED: 'bulk_operations_enabled',
  ADVANCED_WORKFLOWS: 'advanced_workflows_enabled',
  REAL_TIME_UPDATES: 'real_time_updates_enabled'
};

// Flag configuration
const flagConfig = {
  order_processing_enabled: {
    enabled: false,
    rollout: {
      percentage: 0,
      userGroups: ['beta_testers'],
      createdAfter: '2025-09-01'
    }
  },
  
  workflow_engine_enabled: {
    enabled: false,
    rollout: {
      percentage: 0,
      userGroups: ['beta_testers'],
      requiresFeature: 'order_processing_enabled'
    }
  },
  
  tiktok_sync_enabled: {
    enabled: false,
    rollout: {
      percentage: 0,
      userGroups: ['beta_testers'],
      requiresFeature: 'order_processing_enabled'
    }
  }
};
```

## Rollout Strategy

### Phase 1: Alpha Testing (Week 1)
```
Target: Internal team + 5 selected creators
Scope: Core order processing only
Monitoring: 24/7 monitoring with immediate response

Feature Flags:
- order_processing_enabled: internal_team + selected_creators
- workflow_engine_enabled: false
- tiktok_sync_enabled: false
```

### Phase 2: Beta Testing (Weeks 2-3)
```
Target: 25 high-volume creators
Scope: Full order management with basic workflows
Monitoring: Enhanced monitoring with daily health checks

Feature Flags:
- order_processing_enabled: 25 beta creators
- workflow_engine_enabled: 25 beta creators
- tiktok_sync_enabled: 25 beta creators
```

### Phase 3: Limited Release (Weeks 4-6)
```
Week 4: 10% of active creators
Week 5: 25% of active creators
Week 6: 50% of active creators

Monitoring: Standard monitoring with weekly reviews
```

### Phase 4: Full Rollout (Weeks 7-8)
```
Week 7: 75% of creators
Week 8: 100% of creators

Monitoring: Production monitoring with monthly reviews
```

### Rollout Monitoring Dashboard

```typescript
// Key metrics to monitor during rollout
export const ROLLOUT_METRICS = {
  // System Performance
  ORDER_PROCESSING_LATENCY: 'order_processing_latency_p95',
  WORKFLOW_EXECUTION_TIME: 'workflow_execution_time_avg',
  API_ERROR_RATE: 'order_api_error_rate',
  DATABASE_QUERY_TIME: 'order_db_query_time_p95',
  
  // Business Metrics
  ORDER_PROCESSING_SUCCESS_RATE: 'order_processing_success_rate',
  TIKTOK_SYNC_ACCURACY: 'tiktok_sync_accuracy_rate',
  CREATOR_ADOPTION_RATE: 'order_mgmt_adoption_rate',
  ORDER_VOLUME_HANDLED: 'daily_order_volume',
  
  // System Health
  SERVICE_UPTIME: 'order_service_uptime',
  QUEUE_DEPTH: 'order_queue_depth',
  MEMORY_USAGE: 'order_service_memory_usage',
  CPU_UTILIZATION: 'order_service_cpu_usage'
};
```

### Alert Thresholds

```yaml
# monitoring/order-management-alerts.yml
alerts:
  critical:
    - name: Order Processing Failure Rate
      condition: order_processing_error_rate > 5%
      duration: 5m
      severity: critical
      
    - name: TikTok Sync Failure Rate
      condition: tiktok_sync_error_rate > 10%
      duration: 10m
      severity: critical
      
    - name: Database Connection Failure
      condition: order_db_connection_errors > 0
      duration: 1m
      severity: critical
  
  warning:
    - name: High Order Processing Latency
      condition: order_processing_latency_p95 > 60s
      duration: 15m
      severity: warning
      
    - name: High Queue Depth
      condition: order_queue_depth > 1000
      duration: 10m
      severity: warning
      
    - name: Memory Usage High
      condition: order_service_memory_usage > 80%
      duration: 10m
      severity: warning
```

## Health Checks and Monitoring

### Service Health Endpoints

```typescript
// GET /api/health/orders
export async function GET() {
  const checks = await Promise.allSettled([
    checkDatabaseConnection(),
    checkRedisConnection(),
    checkTikTokAPIConnection(),
    checkWorkflowEngineStatus(),
    checkQueueHealth()
  ]);

  const health = {
    status: checks.every(c => c.status === 'fulfilled') ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION,
    checks: {
      database: checks[0].status === 'fulfilled',
      redis: checks[1].status === 'fulfilled',
      tiktokAPI: checks[2].status === 'fulfilled',
      workflowEngine: checks[3].status === 'fulfilled',
      messageQueue: checks[4].status === 'fulfilled'
    },
    metrics: {
      activeOrders: await getActiveOrderCount(),
      pendingWorkflows: await getPendingWorkflowCount(),
      queueDepth: await getQueueDepth(),
      lastProcessedOrder: await getLastProcessedOrderTime()
    }
  };

  return Response.json(health);
}
```

### Performance Monitoring

```typescript
// Performance metrics collection
export const performanceMetrics = {
  // Order processing metrics
  orderProcessingTime: new Histogram({
    name: 'order_processing_duration_seconds',
    help: 'Time taken to process an order',
    buckets: [0.1, 0.5, 1, 5, 10, 30, 60]
  }),
  
  // Workflow execution metrics
  workflowExecutionTime: new Histogram({
    name: 'workflow_execution_duration_seconds',
    help: 'Time taken to execute a workflow',
    buckets: [1, 5, 10, 30, 60, 120, 300]
  }),
  
  // API response time metrics
  apiResponseTime: new Histogram({
    name: 'order_api_response_duration_seconds',
    help: 'Order API response time',
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
  }),
  
  // Business metrics
  orderVolumeCounter: new Counter({
    name: 'orders_processed_total',
    help: 'Total number of orders processed',
    labelNames: ['status', 'source']
  })
};
```

## Rollback Procedures

### Immediate Rollback (Emergency)

```bash
# Disable all order management features
curl -X POST "https://api.featureflags.com/flags/order_processing_enabled" \
  -H "Authorization: Bearer $FF_TOKEN" \
  -d '{"enabled": false}'

# Revert to previous deployment
vercel rollback --env=production

# Scale down new services
docker service scale order-service=0
docker service scale workflow-engine=0

# Monitor system stability
bun run monitor:health --duration=60m
```

### Database Rollback

```sql
-- rollback/001_remove_order_management.sql
BEGIN;

-- Drop order management tables
DROP TABLE IF EXISTS order_status_history CASCADE;
DROP TABLE IF EXISTS order_workflows CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS order_status_enum CASCADE;
DROP TYPE IF EXISTS workflow_status_enum CASCADE;
DROP TYPE IF EXISTS payment_status_enum CASCADE;
DROP TYPE IF EXISTS fulfillment_status_enum CASCADE;
DROP TYPE IF EXISTS workflow_execution_status CASCADE;

COMMIT;
```

### Gradual Rollback Strategy

```typescript
// Gradual rollback phases
const rollbackPhases = [
  { percentage: 75, duration: '2h', description: 'Reduce to 75% of users' },
  { percentage: 50, duration: '4h', description: 'Reduce to 50% of users' },
  { percentage: 25, duration: '8h', description: 'Reduce to 25% of users' },
  { percentage: 0, duration: 'complete', description: 'Complete rollback' }
];

async function executeGradualRollback() {
  for (const phase of rollbackPhases) {
    console.log(`Rolling back to ${phase.percentage}%: ${phase.description}`);
    
    await updateFeatureFlag('order_processing_enabled', {
      percentage: phase.percentage
    });
    
    if (phase.duration !== 'complete') {
      await sleep(parseDuration(phase.duration));
      await checkSystemHealth();
    }
  }
}
```

## Post-Deployment Verification

### Smoke Tests

```typescript
// tests/smoke/order-management.test.ts
describe('Order Management Deployment Smoke Tests', () => {
  test('Order API endpoints are accessible', async () => {
    const response = await fetch('/api/orders');
    expect(response.status).toBe(200);
  });

  test('Database migrations applied correctly', async () => {
    const result = await db.raw(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'orders'
    `);
    expect(result.rows).toHaveLength(1);
  });

  test('TikTok Shop integration working', async () => {
    const testOrder = await createTestOrder();
    const syncResult = await tiktokService.syncOrder(testOrder.id);
    expect(syncResult.success).toBe(true);
  });

  test('Workflow engine operational', async () => {
    const workflow = await workflowEngine.startWorkflow(
      'test-order-id',
      'standard_order_processing'
    );
    expect(workflow.status).toBe('running');
  });
});
```

### Performance Validation

```bash
# Load test order processing endpoints
artillery run tests/load/order-processing.yml

# Validate database performance
bun run db:performance-check:orders

# Monitor resource usage
kubectl top pods -l app=order-service

# Verify queue processing
bun run queue:health-check
```

## Troubleshooting Guide

### Common Deployment Issues

#### Database Migration Failures
```bash
# Check migration status
bun run migration:status --env=production

# Rollback failed migration
bun run migration:rollback --steps=1 --env=production

# Re-run with verbose logging
bun run migration:up --verbose --env=production
```

#### Service Startup Issues
```bash
# Check service logs
docker service logs order-service --tail=100

# Verify environment variables
docker exec -it order-service env | grep ORDER_

# Test database connectivity
docker exec -it order-service npm run db:test-connection
```

#### TikTok Shop Integration Issues
```bash
# Test API connectivity
curl -H "Authorization: Bearer $TIKTOK_API_KEY" \
  https://api.tiktokshop.com/orders

# Verify webhook endpoint
curl -X POST http://localhost:3001/api/webhooks/tiktok \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Check webhook signature validation
bun run test:webhook-signature
```

## Related Documentation

- [Investigation: Requirements Analysis](../00-planning/P001-DRAFT-order-management-investigation.md)
- [Specifications: Technical Requirements](../01-specifications/S001-DRAFT-order-management-specs.md)
- [Implementation Progress](./I001-DRAFT-order-management-progress.md)
- [Reports: Implementation Report](../03-reports/R001-DRAFT-order-management-report.md)
