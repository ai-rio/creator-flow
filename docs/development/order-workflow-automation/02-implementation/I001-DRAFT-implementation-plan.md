# I001: Implementation Plan - Order Workflow Automation

## Document Information
- **Type**: Implementation Plan
- **Status**: DRAFT
- **Created**: 2025-09-07
- **MoSCoW Priority**: Must Have (M) - Development roadmap

## Implementation Overview

Based on comprehensive analysis of mock components and technical specifications, this implementation plan outlines the development approach for the CreatorFlow order workflow automation system.

## Phase 1: Core Infrastructure (Week 1-2)

### 1.1 Database Schema Implementation

```sql
-- Priority: Must Have (M)
-- Implementation: Week 1, Days 1-3

-- Core order workflow tables
CREATE TYPE order_state_enum AS ENUM (
    'received', 'validated', 'processing', 
    'inventory_reserved', 'label_generated', 
    'shipped', 'delivered', 'cancelled', 'failed'
);

CREATE TYPE order_priority_enum AS ENUM ('high', 'urgent', 'standard', 'automated');
CREATE TYPE order_impact_enum AS ENUM ('VIRAL', 'HIGH', 'MED', 'AUTO');
CREATE TYPE customer_tier_enum AS ENUM ('vip', 'regular', 'new');

-- Enhanced orders table with workflow metadata
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    tiktok_order_id VARCHAR NOT NULL UNIQUE,
    
    -- State Machine Fields
    current_state order_state_enum NOT NULL DEFAULT 'received',
    previous_state order_state_enum,
    priority order_priority_enum NOT NULL DEFAULT 'standard',
    impact order_impact_enum NOT NULL DEFAULT 'MED',
    automation_status VARCHAR NOT NULL DEFAULT 'Processing',
    
    -- Customer Information
    customer_handle VARCHAR NOT NULL,
    customer_tier customer_tier_enum DEFAULT 'regular',
    customer_id UUID,
    
    -- Product Information
    product_name VARCHAR NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    
    -- Workflow Metadata
    processing_time_ms INTEGER DEFAULT 0,
    automation_score INTEGER DEFAULT 0 CHECK (automation_score BETWEEN 0 AND 100),
    flow_progress INTEGER DEFAULT 0 CHECK (flow_progress BETWEEN 0 AND 100),
    
    -- Viral Detection Indicators
    viral_indicators JSONB DEFAULT '[]',
    orders_per_hour_current DECIMAL(8,2) DEFAULT 0,
    velocity_multiplier DECIMAL(4,2) DEFAULT 1.0,
    
    -- Logistics Information
    shipping_location VARCHAR,
    deadline TIMESTAMP,
    carrier_preference VARCHAR,
    shipping_zone VARCHAR,
    
    -- Timestamps and Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    state_changed_at TIMESTAMP DEFAULT NOW(),
    
    -- RLS Policy Reference
    CONSTRAINT orders_user_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- State transition history
CREATE TABLE order_state_transitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    from_state order_state_enum,
    to_state order_state_enum NOT NULL,
    transition_reason VARCHAR,
    automated BOOLEAN DEFAULT true,
    duration_ms INTEGER,
    actions_executed JSONB DEFAULT '[]',
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Index for performance
    INDEX idx_order_state_transitions_order_id ON order_state_transitions(order_id),
    INDEX idx_order_state_transitions_created_at ON order_state_transitions(created_at)
);

-- Business rules configuration
CREATE TABLE business_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    description TEXT,
    category VARCHAR NOT NULL,
    priority INTEGER NOT NULL CHECK (priority BETWEEN 0 AND 100),
    
    -- Rule Definition
    conditions JSONB NOT NULL,
    condition_logic VARCHAR NOT NULL DEFAULT 'AND' CHECK (condition_logic IN ('AND', 'OR', 'CUSTOM')),
    custom_logic TEXT,
    actions JSONB NOT NULL,
    
    -- Rule Constraints
    enabled BOOLEAN DEFAULT true,
    version INTEGER DEFAULT 1,
    tags TEXT[] DEFAULT '{}',
    max_executions_per_hour INTEGER,
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    
    -- Performance Metrics
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    last_executed_at TIMESTAMP,
    average_execution_time_ms INTEGER DEFAULT 0,
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    
    INDEX idx_business_rules_category ON business_rules(category),
    INDEX idx_business_rules_priority ON business_rules(priority DESC),
    INDEX idx_business_rules_enabled ON business_rules(enabled) WHERE enabled = true
);

-- Workflow execution metrics
CREATE TABLE workflow_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    metric_type VARCHAR NOT NULL,
    metric_name VARCHAR NOT NULL,
    metric_value DECIMAL NOT NULL,
    dimensions JSONB DEFAULT '{}',
    recorded_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_workflow_metrics_type ON workflow_metrics(metric_type),
    INDEX idx_workflow_metrics_recorded_at ON workflow_metrics(recorded_at)
);

-- RLS Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_state_transitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies Implementation
CREATE POLICY "Users can manage their own orders" ON orders
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their order transitions" ON order_state_transitions
    FOR SELECT USING (auth.uid() IN (SELECT user_id FROM orders WHERE id = order_id));

CREATE POLICY "Admin users can manage business rules" ON business_rules
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view their workflow metrics" ON workflow_metrics
    FOR SELECT USING (auth.uid() IN (SELECT user_id FROM orders WHERE id = order_id));
```

### 1.2 Core TypeScript Types

```typescript
// Priority: Must Have (M)
// Location: src/types/order-workflow.ts
// Implementation: Week 1, Days 2-3

export type OrderState = 
  | 'received' 
  | 'validated' 
  | 'processing' 
  | 'inventory_reserved' 
  | 'label_generated' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'failed';

export type OrderPriority = 'high' | 'urgent' | 'standard' | 'automated';
export type OrderImpact = 'VIRAL' | 'HIGH' | 'MED' | 'AUTO';
export type CustomerTier = 'vip' | 'regular' | 'new';
export type AutomationStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Manual Review';

// Enhanced Order interface based on mock analysis
export interface Order {
  id: string;
  user_id: string;
  tiktok_order_id: string;
  
  // State Machine
  current_state: OrderState;
  previous_state?: OrderState;
  priority: OrderPriority;
  impact: OrderImpact;
  automation_status: AutomationStatus;
  
  // Customer Data
  customer_handle: string;
  customer_tier: CustomerTier;
  customer_id?: string;
  
  // Product Data
  product_name: string;
  product_id: string;
  quantity: number;
  price: number;
  
  // Workflow Metadata
  processing_time_ms: number;
  automation_score: number; // 0-100
  flow_progress: number; // 0-100
  
  // Viral Detection
  viral_indicators: ViralIndicator[];
  orders_per_hour_current: number;
  velocity_multiplier: number;
  
  // Logistics
  shipping_location?: string;
  deadline?: Date;
  carrier_preference?: string;
  shipping_zone?: string;
  
  // Timestamps
  created_at: Date;
  updated_at: Date;
  state_changed_at: Date;
  
  // Optional Relationships
  user?: {
    id: string;
    email: string;
    creator_tier: string;
  };
  state_transitions?: OrderStateTransition[];
}

export interface ViralIndicator {
  type: 'content_spike' | 'hashtag_trending' | 'influencer_mention' | 'flash_sale';
  source: string;
  confidence: number; // 0-1
  impact_multiplier: number;
  detected_at: Date;
  metadata: Record<string, any>;
}

export interface OrderStateTransition {
  id: string;
  order_id: string;
  from_state?: OrderState;
  to_state: OrderState;
  transition_reason?: string;
  automated: boolean;
  duration_ms?: number;
  actions_executed: WorkflowAction[];
  error_message?: string;
  created_at: Date;
}

export interface WorkflowAction {
  type: ActionType;
  parameters: Record<string, any>;
  timeout_ms: number;
  retry_config: RetryConfig;
  rollback_action?: WorkflowAction;
}

export type ActionType = 
  | 'validate_address'
  | 'check_inventory'
  | 'reserve_inventory'
  | 'generate_shipping_label'
  | 'send_customer_notification'
  | 'update_tiktok_status'
  | 'log_analytics_event'
  | 'trigger_webhook'
  | 'schedule_follow_up'
  | 'escalate_to_manual'
  | 'auto_reorder_inventory'
  | 'escalate_priority'
  | 'select_carrier'
  | 'enable_fast_track';

export interface RetryConfig {
  max_attempts: number;
  backoff_strategy: 'exponential' | 'linear' | 'fixed';
  initial_delay_ms: number;
  max_delay_ms: number;
  retry_conditions: string[];
  circuit_breaker_threshold: number;
}

export interface BusinessRule {
  id: string;
  name: string;
  description: string;
  category: RuleCategory;
  priority: number;
  conditions: RuleCondition[];
  condition_logic: 'AND' | 'OR' | 'CUSTOM';
  custom_logic?: string;
  actions: WorkflowAction[];
  enabled: boolean;
  version: number;
  tags: string[];
  max_executions_per_hour?: number;
  valid_from?: Date;
  valid_until?: Date;
  execution_count: number;
  success_count: number;
  last_executed_at?: Date;
  average_execution_time_ms: number;
  created_at: Date;
  updated_at: Date;
  created_by: string;
}

export type RuleCategory = 
  | 'viral_detection'
  | 'priority_classification'
  | 'inventory_management'
  | 'shipping_optimization'
  | 'customer_segmentation'
  | 'fraud_prevention'
  | 'performance_optimization'
  | 'exception_handling';

export interface RuleCondition {
  type: string;
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'in' | 'not_in' | 'contains';
  value: any;
  timeWindow?: string;
}
```

### 1.3 Supabase Client Configuration

```typescript
// Priority: Must Have (M)
// Location: src/lib/supabase/workflow-client.ts
// Implementation: Week 1, Day 4

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import type { Order, OrderStateTransition, BusinessRule } from '@/types/order-workflow';

// Workflow-specific Supabase client
export const workflowSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Order workflow data access layer
export class OrderWorkflowRepository {
  
  async getOrder(orderId: string): Promise<Order | null> {
    const { data, error } = await workflowSupabase
      .from('orders')
      .select(`
        *,
        user:users(*),
        state_transitions:order_state_transitions(*)
      `)
      .eq('id', orderId)
      .single();
    
    if (error) throw error;
    return data as Order;
  }
  
  async updateOrderState(
    orderId: string, 
    newState: OrderState,
    transition: Omit<OrderStateTransition, 'id' | 'created_at'>
  ): Promise<void> {
    const { error: updateError } = await workflowSupabase
      .from('orders')
      .update({
        current_state: newState,
        previous_state: transition.from_state,
        state_changed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);
      
    if (updateError) throw updateError;
    
    // Record state transition
    const { error: transitionError } = await workflowSupabase
      .from('order_state_transitions')
      .insert({
        ...transition,
        order_id: orderId
      });
      
    if (transitionError) throw transitionError;
  }
  
  async getBusinessRules(category?: RuleCategory): Promise<BusinessRule[]> {
    let query = workflowSupabase
      .from('business_rules')
      .select('*')
      .eq('enabled', true)
      .order('priority', { ascending: false });
      
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    return data as BusinessRule[];
  }
  
  async recordWorkflowMetric(
    orderId: string,
    metricType: string,
    metricName: string,
    value: number,
    dimensions: Record<string, any> = {}
  ): Promise<void> {
    const { error } = await workflowSupabase
      .from('workflow_metrics')
      .insert({
        order_id: orderId,
        metric_type: metricType,
        metric_name: metricName,
        metric_value: value,
        dimensions
      });
      
    if (error) throw error;
  }
}
```

## Phase 2: State Machine Engine (Week 2-3)

### 2.1 Core State Machine Implementation

```typescript
// Priority: Must Have (M)
// Location: src/lib/workflow/state-machine.ts
// Implementation: Week 2, Days 1-4

import type { Order, OrderState, OrderStateTransition, WorkflowAction } from '@/types/order-workflow';
import { OrderWorkflowRepository } from '@/lib/supabase/workflow-client';

// State transition mapping from mock analysis
export const ORDER_TRANSITIONS: Record<OrderState, OrderState[]> = {
  received: ['validated', 'failed'],
  validated: ['processing', 'cancelled'],
  processing: ['inventory_reserved', 'failed'],
  inventory_reserved: ['label_generated', 'failed'],
  label_generated: ['shipped', 'failed'],
  shipped: ['delivered', 'cancelled'],
  delivered: [], // Terminal state
  cancelled: [], // Terminal state
  failed: ['processing'] // Retry capability
};

export interface OrderContext {
  userId: string;
  repository: OrderWorkflowRepository;
  inventoryService: InventoryService;
  shippingService: ShippingService;
  analyticsService: AnalyticsService;
  notificationService: NotificationService;
}

export interface TransitionResult {
  success: boolean;
  newState: OrderState;
  transition: OrderStateTransition;
  actionsExecuted: ActionResult[];
  duration: number;
  error?: string;
}

export class OrderStateMachine {
  private currentState: OrderState;
  private order: Order;
  private context: OrderContext;
  private transitionLog: OrderStateTransition[] = [];
  
  constructor(order: Order, context: OrderContext) {
    this.order = order;
    this.currentState = order.current_state;
    this.context = context;
  }
  
  // Core state machine methods from specification
  getAllowedTransitions(): OrderState[] {
    return ORDER_TRANSITIONS[this.currentState] || [];
  }
  
  canTransition(toState: OrderState): boolean {
    const allowedStates = this.getAllowedTransitions();
    return allowedStates.includes(toState);
  }
  
  async transition(
    toState: OrderState, 
    reason?: string
  ): Promise<TransitionResult> {
    const startTime = Date.now();
    
    if (!this.canTransition(toState)) {
      throw new Error(
        `Invalid transition from ${this.currentState} to ${toState}`
      );
    }
    
    const transition: Omit<OrderStateTransition, 'id' | 'created_at'> = {
      order_id: this.order.id,
      from_state: this.currentState,
      to_state: toState,
      transition_reason: reason || 'Automated transition',
      automated: true,
      actions_executed: []
    };
    
    try {
      // Execute pre-transition actions
      const preActions = await this.getPreTransitionActions(toState);
      const preResults = await this.executeActions(preActions);
      
      // Update order state in database
      await this.context.repository.updateOrderState(
        this.order.id,
        toState,
        {
          ...transition,
          actions_executed: preResults.map(r => r.action),
          duration_ms: Date.now() - startTime
        }
      );
      
      // Execute post-transition actions
      const postActions = await this.getPostTransitionActions(toState);
      const postResults = await this.executeActions(postActions);
      
      // Update internal state
      this.currentState = toState;
      this.order.current_state = toState;
      this.order.previous_state = transition.from_state;
      this.order.state_changed_at = new Date();
      
      const allResults = [...preResults, ...postResults];
      
      return {
        success: true,
        newState: toState,
        transition: {
          ...transition,
          id: generateId(),
          created_at: new Date(),
          duration_ms: Date.now() - startTime
        },
        actionsExecuted: allResults,
        duration: Date.now() - startTime
      };
      
    } catch (error) {
      const failedTransition = {
        ...transition,
        error_message: error.message,
        duration_ms: Date.now() - startTime
      };
      
      // Log failed transition
      await this.context.repository.updateOrderState(
        this.order.id,
        this.currentState, // Stay in current state
        failedTransition
      );
      
      throw error;
    }
  }
  
  private async executeActions(actions: WorkflowAction[]): Promise<ActionResult[]> {
    // Implementation for action execution with retries and error handling
    // This will be detailed in Phase 3
    return [];
  }
  
  private async getPreTransitionActions(toState: OrderState): Promise<WorkflowAction[]> {
    // Get actions to execute before state transition
    // Based on business rules and state configuration
    return [];
  }
  
  private async getPostTransitionActions(toState: OrderState): Promise<WorkflowAction[]> {
    // Get actions to execute after state transition
    return [];
  }
}

// Utility functions
function generateId(): string {
  return crypto.randomUUID();
}
```

### 2.2 Priority-Based Processing Queues

```typescript
// Priority: Should Have (S)
// Location: src/lib/workflow/priority-queue.ts
// Implementation: Week 2, Day 5

import type { Order, OrderPriority } from '@/types/order-workflow';

export interface PriorityQueueConfig {
  maxConcurrency: number;
  timeoutMs: number;
  retryConfig: RetryConfig;
}

// Priority queue configurations from mock analysis
export const PRIORITY_QUEUE_CONFIGS: Record<OrderPriority, PriorityQueueConfig> = {
  high: {
    maxConcurrency: 50,    // Process up to 50 viral orders simultaneously
    timeoutMs: 30000,      // 30 second timeout
    retryConfig: AGGRESSIVE_RETRY_CONFIG
  },
  urgent: {
    maxConcurrency: 30,    // 30 urgent orders
    timeoutMs: 60000,      // 1 minute timeout
    retryConfig: DEFAULT_RETRY_CONFIG
  },
  standard: {
    maxConcurrency: 100,   // 100 standard orders
    timeoutMs: 180000,     // 3 minute timeout
    retryConfig: DEFAULT_RETRY_CONFIG
  },
  automated: {
    maxConcurrency: 200,   // 200 automated orders (fastest processing)
    timeoutMs: 15000,      // 15 second timeout
    retryConfig: MINIMAL_RETRY_CONFIG
  }
};

export class OrderProcessingQueue {
  private queues: Map<OrderPriority, Order[]> = new Map();
  private processing: Map<OrderPriority, Set<string>> = new Map();
  
  constructor() {
    // Initialize queues
    Object.keys(PRIORITY_QUEUE_CONFIGS).forEach(priority => {
      this.queues.set(priority as OrderPriority, []);
      this.processing.set(priority as OrderPriority, new Set());
    });
  }
  
  async enqueue(order: Order): Promise<void> {
    const queue = this.queues.get(order.priority);
    if (!queue) {
      throw new Error(`Invalid priority: ${order.priority}`);
    }
    
    // Insert order based on impact and creation time
    const insertIndex = this.findInsertionPoint(queue, order);
    queue.splice(insertIndex, 0, order);
    
    // Start processing if queue has capacity
    await this.processQueueIfPossible(order.priority);
  }
  
  private findInsertionPoint(queue: Order[], newOrder: Order): number {
    // Priority insertion logic based on impact and viral indicators
    for (let i = 0; i < queue.length; i++) {
      const existingOrder = queue[i];
      
      // Viral orders go to front
      if (newOrder.impact === 'VIRAL' && existingOrder.impact !== 'VIRAL') {
        return i;
      }
      
      // Within same impact level, sort by creation time
      if (newOrder.impact === existingOrder.impact) {
        if (newOrder.created_at < existingOrder.created_at) {
          return i;
        }
      }
    }
    
    return queue.length; // Insert at end
  }
  
  private async processQueueIfPossible(priority: OrderPriority): Promise<void> {
    const config = PRIORITY_QUEUE_CONFIGS[priority];
    const processingSet = this.processing.get(priority)!;
    const queue = this.queues.get(priority)!;
    
    // Check if we can process more orders
    if (processingSet.size >= config.maxConcurrency || queue.length === 0) {
      return;
    }
    
    // Get next order to process
    const order = queue.shift()!;
    processingSet.add(order.id);
    
    // Process order asynchronously
    this.processOrder(order, priority)
      .finally(() => {
        processingSet.delete(order.id);
        // Try to process next order
        this.processQueueIfPossible(priority);
      });
  }
  
  private async processOrder(order: Order, priority: OrderPriority): Promise<void> {
    // This will integrate with state machine in Phase 3
    console.log(`Processing order ${order.id} with priority ${priority}`);
  }
}
```

## Phase 3: Business Rules Engine (Week 3-4)

### 3.1 Rule Evaluation Engine

```typescript
// Priority: Must Have (M)
// Location: src/lib/workflow/business-rules.ts
// Implementation: Week 3, Days 1-3

import type { BusinessRule, Order, OrderContext, RuleCondition } from '@/types/order-workflow';

export interface RuleEvaluationResult {
  matchedRules: BusinessRule[];
  actions: WorkflowAction[];
  priority: number;
  executionPlan: ExecutionPlan;
  estimatedDuration: number;
}

export class BusinessRulesEngine {
  private rules: Map<string, BusinessRule> = new Map();
  
  async evaluateRules(order: Order, context: OrderContext): Promise<RuleEvaluationResult> {
    const startTime = Date.now();
    
    // Get applicable rules for the order
    const applicableRules = await this.getApplicableRules(order, context);
    
    // Sort rules by priority (highest first)
    const sortedRules = applicableRules.sort((a, b) => b.priority - a.priority);
    
    // Evaluate conditions for each rule
    const matchedRules: BusinessRule[] = [];
    const allActions: WorkflowAction[] = [];
    let maxPriority = 0;
    
    for (const rule of sortedRules) {
      try {
        const conditionResult = await this.evaluateConditions(rule, order, context);
        
        if (conditionResult.matches) {
          matchedRules.push(rule);
          allActions.push(...rule.actions);
          maxPriority = Math.max(maxPriority, rule.priority);
          
          // Record successful rule evaluation
          await this.recordRuleExecution(rule.id, order.id, true);
          
          // Update rule metrics
          rule.execution_count++;
          rule.success_count++;
          rule.last_executed_at = new Date();
        }
      } catch (error) {
        console.error(`Rule evaluation failed for ${rule.id}:`, error);
        await this.recordRuleExecution(rule.id, order.id, false, error.message);
      }
    }
    
    // Create execution plan
    const executionPlan = this.createExecutionPlan(allActions, maxPriority);
    
    return {
      matchedRules,
      actions: allActions,
      priority: maxPriority,
      executionPlan,
      estimatedDuration: executionPlan.estimatedDurationMs
    };
  }
  
  private async evaluateConditions(
    rule: BusinessRule,
    order: Order,
    context: OrderContext
  ): Promise<{ matches: boolean; results: boolean[] }> {
    const results: boolean[] = [];
    
    for (const condition of rule.conditions) {
      const result = await this.evaluateCondition(condition, order, context);
      results.push(result);
    }
    
    // Apply condition logic
    let finalResult: boolean;
    switch (rule.condition_logic) {
      case 'AND':
        finalResult = results.every(r => r);
        break;
      case 'OR':
        finalResult = results.some(r => r);
        break;
      case 'CUSTOM':
        finalResult = this.evaluateCustomLogic(rule.custom_logic!, results);
        break;
      default:
        finalResult = results.every(r => r);
    }
    
    return { matches: finalResult, results };
  }
  
  private async evaluateCondition(
    condition: RuleCondition,
    order: Order,
    context: OrderContext
  ): Promise<boolean> {
    const value = this.getFieldValue(order, condition.field);
    
    switch (condition.operator) {
      case 'equals':
        return value === condition.value;
      case 'greater_than':
        return Number(value) > Number(condition.value);
      case 'less_than':
        return Number(value) < Number(condition.value);
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(value);
      case 'not_in':
        return Array.isArray(condition.value) && !condition.value.includes(value);
      case 'contains':
        return String(value).includes(String(condition.value));
      default:
        throw new Error(`Unknown operator: ${condition.operator}`);
    }
  }
  
  private getFieldValue(order: Order, field: string): any {
    // Support nested field access (e.g., 'user.tier', 'product.category')
    const fieldPath = field.split('.');
    let value: any = order;
    
    for (const segment of fieldPath) {
      value = value?.[segment];
      if (value === undefined) break;
    }
    
    return value;
  }
}
```

### 3.2 Viral Detection Rules Implementation

```typescript
// Priority: Must Have (M)
// Location: src/lib/workflow/viral-detection.ts
// Implementation: Week 3, Day 4

import type { Order, ViralIndicator } from '@/types/order-workflow';

export interface ViralDetectionService {
  detectViralContent(order: Order): Promise<ViralIndicator[]>;
  calculateVelocityMultiplier(order: Order): Promise<number>;
  shouldEscalatePriority(order: Order, indicators: ViralIndicator[]): boolean;
}

export class ViralDetectionEngine implements ViralDetectionService {
  
  async detectViralContent(order: Order): Promise<ViralIndicator[]> {
    const indicators: ViralIndicator[] = [];
    
    // Detect order velocity spike (from mock data: 47 orders/hour)
    const currentVelocity = await this.getOrderVelocity(order.product_id);
    if (currentVelocity > 40) {
      indicators.push({
        type: 'content_spike',
        source: 'velocity_monitoring',
        confidence: Math.min(currentVelocity / 50, 1.0),
        impact_multiplier: Math.min(currentVelocity / 20, 3.0),
        detected_at: new Date(),
        metadata: {
          current_velocity: currentVelocity,
          threshold: 40,
          product_id: order.product_id
        }
      });
    }
    
    // Detect hashtag trending
    const trendingHashtags = await this.checkTrendingHashtags(order);
    if (trendingHashtags.length > 0) {
      indicators.push({
        type: 'hashtag_trending',
        source: 'hashtag_monitoring',
        confidence: 0.8,
        impact_multiplier: 2.0,
        detected_at: new Date(),
        metadata: {
          hashtags: trendingHashtags,
          product_id: order.product_id
        }
      });
    }
    
    // Detect influencer mentions
    const influencerMention = await this.checkInfluencerMentions(order);
    if (influencerMention) {
      indicators.push({
        type: 'influencer_mention',
        source: 'influencer_tracking',
        confidence: influencerMention.confidence,
        impact_multiplier: influencerMention.impact_multiplier,
        detected_at: new Date(),
        metadata: influencerMention.metadata
      });
    }
    
    return indicators;
  }
  
  async calculateVelocityMultiplier(order: Order): Promise<number> {
    const baseVelocity = await this.getBaselineVelocity(order.product_id);
    const currentVelocity = await this.getOrderVelocity(order.product_id);
    
    if (baseVelocity === 0) return 1.0;
    
    return Math.min(currentVelocity / baseVelocity, 5.0); // Cap at 5x multiplier
  }
  
  shouldEscalatePriority(order: Order, indicators: ViralIndicator[]): boolean {
    // Escalate if any indicator has high confidence and impact
    return indicators.some(indicator => 
      indicator.confidence > 0.7 && indicator.impact_multiplier > 2.0
    );
  }
  
  private async getOrderVelocity(productId: string): Promise<number> {
    // Implementation to calculate orders per hour for product
    // This would query the database for recent orders
    return 0;
  }
  
  private async getBaselineVelocity(productId: string): Promise<number> {
    // Implementation to get historical baseline velocity
    return 1;
  }
  
  private async checkTrendingHashtags(order: Order): Promise<string[]> {
    // Implementation to check if product is associated with trending hashtags
    return [];
  }
  
  private async checkInfluencerMentions(order: Order): Promise<any> {
    // Implementation to detect influencer mentions
    return null;
  }
}
```

## Phase 4: Integration Layer (Week 4-5)

### 4.1 TikTok Shop Webhook Handler

```typescript
// Priority: Must Have (M)
// Location: src/app/api/webhooks/tiktok-shop/route.ts
// Implementation: Week 4, Days 1-2

import { NextRequest, NextResponse } from 'next/server';
import { OrderWorkflowOrchestrator } from '@/lib/workflow/orchestrator';
import { verifyTikTokSignature } from '@/lib/tiktok/webhook-verification';
import type { Order, OrderPriority, OrderImpact } from '@/types/order-workflow';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('X-TikTok-Signature');
    const body = await request.text();
    
    // Verify webhook signature
    if (!verifyTikTokSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    const payload = JSON.parse(body);
    
    // Handle different event types
    switch (payload.event_type) {
      case 'order_created':
        await handleOrderCreated(payload);
        break;
      case 'order_updated':
        await handleOrderUpdated(payload);
        break;
      case 'order_cancelled':
        await handleOrderCancelled(payload);
        break;
      default:
        console.log(`Unhandled event type: ${payload.event_type}`);
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('TikTok webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleOrderCreated(payload: any) {
  // Transform TikTok order data to internal Order format
  const order: Partial<Order> = {
    tiktok_order_id: payload.order_id,
    customer_handle: payload.customer?.username || 'unknown',
    product_name: payload.items?.[0]?.product_name || 'Unknown Product',
    product_id: payload.items?.[0]?.product_id || 'unknown',
    quantity: payload.items?.[0]?.quantity || 1,
    price: parseFloat(payload.total_amount) || 0,
    current_state: 'received',
    priority: 'standard', // Will be updated by business rules
    impact: 'MED', // Will be updated by viral detection
    automation_status: 'Processing',
    customer_tier: 'regular',
    processing_time_ms: 0,
    automation_score: 0,
    flow_progress: 0,
    viral_indicators: [],
    orders_per_hour_current: 0,
    velocity_multiplier: 1.0,
    shipping_location: payload.shipping_address?.region || '',
    created_at: new Date(),
    updated_at: new Date(),
    state_changed_at: new Date()
  };
  
  // Initialize workflow processing
  const orchestrator = new OrderWorkflowOrchestrator();
  await orchestrator.processNewOrder(order as Order);
}

async function handleOrderUpdated(payload: any) {
  // Handle order updates from TikTok Shop
  const orchestrator = new OrderWorkflowOrchestrator();
  await orchestrator.handleTikTokUpdate(payload);
}

async function handleOrderCancelled(payload: any) {
  // Handle order cancellations
  const orchestrator = new OrderWorkflowOrchestrator();
  await orchestrator.cancelOrder(payload.order_id);
}
```

### 4.2 Workflow Orchestrator

```typescript
// Priority: Must Have (M)
// Location: src/lib/workflow/orchestrator.ts
// Implementation: Week 4, Days 3-5

import { OrderStateMachine } from './state-machine';
import { BusinessRulesEngine } from './business-rules';
import { ViralDetectionEngine } from './viral-detection';
import { OrderProcessingQueue } from './priority-queue';
import { ActionExecutor } from './action-executor';
import { OrderWorkflowRepository } from '@/lib/supabase/workflow-client';
import type { Order, OrderContext } from '@/types/order-workflow';

export class OrderWorkflowOrchestrator {
  private rulesEngine: BusinessRulesEngine;
  private viralDetection: ViralDetectionEngine;
  private processingQueue: OrderProcessingQueue;
  private repository: OrderWorkflowRepository;
  private actionExecutor: ActionExecutor;
  
  constructor() {
    this.rulesEngine = new BusinessRulesEngine();
    this.viralDetection = new ViralDetectionEngine();
    this.processingQueue = new OrderProcessingQueue();
    this.repository = new OrderWorkflowRepository();
    this.actionExecutor = new ActionExecutor();
  }
  
  async processNewOrder(order: Order): Promise<void> {
    try {
      // Step 1: Detect viral indicators
      const viralIndicators = await this.viralDetection.detectViralContent(order);
      order.viral_indicators = viralIndicators;
      order.velocity_multiplier = await this.viralDetection.calculateVelocityMultiplier(order);
      
      // Step 2: Evaluate business rules for priority classification
      const context = this.createOrderContext(order);
      const ruleResult = await this.rulesEngine.evaluateRules(order, context);
      
      // Step 3: Update order priority and impact based on rules
      if (ruleResult.matchedRules.length > 0) {
        // Apply priority escalation from rules
        const priorityActions = ruleResult.actions.filter(a => a.type === 'escalate_priority');
        for (const action of priorityActions) {
          if (action.parameters.new_priority) {
            order.priority = action.parameters.new_priority;
          }
          if (action.parameters.new_impact) {
            order.impact = action.parameters.new_impact;
          }
        }
      }
      
      // Step 4: Save order to database
      const savedOrder = await this.repository.createOrder(order);
      
      // Step 5: Execute immediate actions from rules
      await this.actionExecutor.executeActions(ruleResult.actions, savedOrder, context);
      
      // Step 6: Enqueue for processing
      await this.processingQueue.enqueue(savedOrder);
      
      // Step 7: Record metrics
      await this.recordProcessingMetrics(savedOrder, ruleResult);
      
    } catch (error) {
      console.error(`Failed to process new order ${order.tiktok_order_id}:`, error);
      
      // Create order in failed state for manual review
      await this.repository.createOrder({
        ...order,
        current_state: 'failed',
        priority: 'urgent' // Escalate failed orders
      });
      
      throw error;
    }
  }
  
  async processOrderWorkflow(order: Order): Promise<void> {
    const context = this.createOrderContext(order);
    const stateMachine = new OrderStateMachine(order, context);
    
    try {
      // Determine next state based on current state and business rules
      const nextState = await this.determineNextState(order, context);
      
      if (nextState && stateMachine.canTransition(nextState)) {
        const result = await stateMachine.transition(nextState);
        
        if (result.success) {
          // Update progress tracking
          await this.updateOrderProgress(order, nextState);
          
          // Continue processing if not in terminal state
          if (!this.isTerminalState(nextState)) {
            // Re-enqueue for next processing step
            setTimeout(() => this.processOrderWorkflow(order), 1000);
          }
        }
      }
      
    } catch (error) {
      console.error(`Workflow processing failed for order ${order.id}:`, error);
      
      // Transition to failed state
      if (stateMachine.canTransition('failed')) {
        await stateMachine.transition('failed', 'Processing error');
      }
    }
  }
  
  private createOrderContext(order: Order): OrderContext {
    return {
      userId: order.user_id,
      repository: this.repository,
      inventoryService: new InventoryService(),
      shippingService: new ShippingService(),
      analyticsService: new AnalyticsService(),
      notificationService: new NotificationService()
    };
  }
  
  private async determineNextState(order: Order, context: OrderContext): Promise<OrderState | null> {
    // Business logic to determine next state based on current state
    switch (order.current_state) {
      case 'received':
        return 'validated';
      case 'validated':
        return 'processing';
      case 'processing':
        // Check inventory before proceeding
        const inventoryAvailable = await context.inventoryService.checkAvailability(
          order.product_id, 
          order.quantity
        );
        return inventoryAvailable ? 'inventory_reserved' : 'failed';
      case 'inventory_reserved':
        return 'label_generated';
      case 'label_generated':
        return 'shipped';
      case 'shipped':
        // Check if delivery is confirmed
        const deliveryConfirmed = await context.shippingService.checkDeliveryStatus(order.id);
        return deliveryConfirmed ? 'delivered' : null; // Stay in shipped until confirmed
      default:
        return null; // No automatic transition
    }
  }
  
  private isTerminalState(state: OrderState): boolean {
    return ['delivered', 'cancelled'].includes(state);
  }
  
  private async updateOrderProgress(order: Order, newState: OrderState): Promise<void> {
    // Calculate progress percentage based on state
    const stateProgress = {
      received: 10,
      validated: 25,
      processing: 40,
      inventory_reserved: 60,
      label_generated: 80,
      shipped: 90,
      delivered: 100,
      cancelled: 0,
      failed: 0
    };
    
    const progress = stateProgress[newState] || 0;
    
    await this.repository.updateOrderProgress(order.id, progress);
  }
  
  private async recordProcessingMetrics(order: Order, ruleResult: any): Promise<void> {
    // Record metrics for monitoring and analytics
    await this.repository.recordWorkflowMetric(
      order.id,
      'processing',
      'rules_matched',
      ruleResult.matchedRules.length,
      {
        priority: order.priority,
        impact: order.impact,
        viral_indicators: order.viral_indicators.length
      }
    );
    
    await this.repository.recordWorkflowMetric(
      order.id,
      'processing',
      'velocity_multiplier',
      order.velocity_multiplier,
      {
        product_id: order.product_id
      }
    );
  }
}

// Placeholder service classes - will be implemented in subsequent phases
class InventoryService {
  async checkAvailability(productId: string, quantity: number): Promise<boolean> {
    // Implementation for inventory checking
    return true;
  }
}

class ShippingService {
  async checkDeliveryStatus(orderId: string): Promise<boolean> {
    // Implementation for delivery status checking
    return false;
  }
}

class AnalyticsService {
  async trackEvent(event: string, properties: Record<string, any>): Promise<void> {
    // Implementation for analytics tracking
  }
}

class NotificationService {
  async sendNotification(type: string, recipient: string, data: any): Promise<void> {
    // Implementation for sending notifications
  }
}
```

## Phase 5: Dashboard Integration (Week 5-6)

### 5.1 Real-time Dashboard Updates

```typescript
// Priority: Should Have (S)
// Location: src/components/workflow/OrderWorkflowDashboard.tsx
// Implementation: Week 5, Days 1-3

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Bot, Package, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { OrderWorkflowRepository } from '@/lib/supabase/workflow-client';
import type { Order, OrderState, OrderPriority } from '@/types/order-workflow';

interface WorkflowMetrics {
  orders_processed_per_minute: number;
  automation_health: number;
  avg_processing_time_sec: number;
  processing_time_change_percent: number;
  orders_by_state: Record<OrderState, number>;
  orders_by_priority: Record<OrderPriority, number>;
  viral_orders_count: number;
}

export default function OrderWorkflowDashboard() {
  const [metrics, setMetrics] = useState<WorkflowMetrics | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const repository = new OrderWorkflowRepository();
    
    // Initial data load
    loadDashboardData();
    
    // Set up real-time updates every 5 seconds
    const interval = setInterval(loadDashboardData, 5000);
    
    return () => clearInterval(interval);
    
    async function loadDashboardData() {
      try {
        const [workflowMetrics, orders] = await Promise.all([
          repository.getWorkflowMetrics(),
          repository.getActiveOrders(50) // Get top 50 active orders
        ]);
        
        setMetrics(workflowMetrics);
        setActiveOrders(orders);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    }
  }, []);
  
  if (loading || !metrics) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-[#0A090F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0A090F] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with real-time metrics */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Order Workflow Command Center
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Automation Health"
              value={`${metrics.automation_health}%`}
              change={`+${Math.abs(metrics.processing_time_change_percent)}%`}
              icon={Bot}
              positive={true}
            />
            <MetricCard
              title="Avg Processing Time"
              value={`${metrics.avg_processing_time_sec}s`}
              change={`-${Math.abs(metrics.processing_time_change_percent)}%`}
              icon={Clock}
              positive={metrics.processing_time_change_percent < 0}
            />
            <MetricCard
              title="Orders/Minute"
              value={metrics.orders_processed_per_minute.toString()}
              change="+12%"
              icon={TrendingUp}
              positive={true}
            />
            <MetricCard
              title="Viral Orders"
              value={metrics.viral_orders_count.toString()}
              change="Active"
              icon={Zap}
              positive={true}
              highlight={metrics.viral_orders_count > 0}
            />
          </div>
        </motion.div>
        
        {/* Workflow State Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderFlowVisualization metrics={metrics} />
          <PriorityBreakdown orders={activeOrders} />
        </div>
        
        {/* Active Orders Table */}
        <ActiveOrdersTable orders={activeOrders} />
      </div>
    </div>
  );
}

// Component implementations for dashboard widgets
const MetricCard = ({ title, value, change, icon: Icon, positive, highlight = false }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-4 rounded-xl ${highlight ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20' : 'bg-slate-200/50 dark:bg-slate-700/50'}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className={`text-sm ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {change}
        </p>
      </div>
      <Icon size={24} className={`${highlight ? 'text-orange-500' : 'text-slate-500 dark:text-slate-400'}`} />
    </div>
  </motion.div>
);

const OrderFlowVisualization = ({ metrics }: { metrics: WorkflowMetrics }) => {
  const flowStages = [
    { name: 'RECEIVED', count: metrics.orders_by_state.received || 0, icon: Package, color: 'text-blue-500' },
    { name: 'PROCESSING', count: metrics.orders_by_state.processing || 0, icon: Bot, color: 'text-teal-500' },
    { name: 'SHIPPED', count: metrics.orders_by_state.shipped || 0, icon: Package, color: 'text-purple-500' },
    { name: 'DELIVERED', count: metrics.orders_by_state.delivered || 0, icon: CheckCircle, color: 'text-green-500' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Workflow Pipeline
      </h2>
      
      <div className="space-y-4">
        {flowStages.map((stage, index) => (
          <div key={stage.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <stage.icon className={`${stage.color} w-5 h-5`} />
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {stage.name}
              </span>
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {stage.count}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PriorityBreakdown = ({ orders }: { orders: Order[] }) => {
  const priorityStats = orders.reduce((acc, order) => {
    acc[order.priority] = (acc[order.priority] || 0) + 1;
    return acc;
  }, {} as Record<OrderPriority, number>);
  
  const priorityColors = {
    high: 'text-red-500 bg-red-500/10',
    urgent: 'text-orange-500 bg-orange-500/10', 
    standard: 'text-blue-500 bg-blue-500/10',
    automated: 'text-gray-500 bg-gray-500/10'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Priority Distribution
      </h2>
      
      <div className="space-y-3">
        {Object.entries(priorityStats).map(([priority, count]) => (
          <div key={priority} className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[priority as OrderPriority]}`}>
              {priority.toUpperCase()}
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {count}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ActiveOrdersTable = ({ orders }: { orders: Order[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden"
  >
    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Active Orders
      </h2>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {orders.slice(0, 10).map((order) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-900 dark:text-white">
                {order.tiktok_order_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[order.priority]}`}>
                  {order.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                {order.current_state}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: `${order.flow_progress}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">
                    {order.flow_progress}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                {order.customer_handle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">
                ${order.price.toFixed(2)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);
```

## Implementation Timeline Summary

### Week 1-2: Foundation
- ✅ Database schema with RLS policies
- ✅ Core TypeScript types and interfaces
- ✅ Supabase client configuration
- ✅ Basic repository pattern implementation

### Week 3-4: Core Engine
- ✅ State machine implementation with priority handling
- ✅ Business rules engine with viral detection
- ✅ Priority-based processing queues
- ✅ Action execution framework

### Week 4-5: Integration
- ✅ TikTok Shop webhook handling
- ✅ Workflow orchestration engine
- ✅ Error handling and retry mechanisms
- ✅ Performance monitoring implementation

### Week 5-6: Dashboard & Analytics
- ✅ Real-time dashboard components
- ✅ Metrics visualization
- ✅ Order tracking interfaces
- ✅ Performance analytics

## Testing Strategy

### Unit Testing (Week 6)
- State machine transition logic
- Business rules evaluation
- Viral detection algorithms
- Priority classification rules

### Integration Testing (Week 7)
- TikTok webhook processing
- Database operations with RLS
- End-to-end order workflows
- Error handling scenarios

### Load Testing (Week 8)
- High-volume order processing (1000+ concurrent orders)
- Viral spike simulation (2000+ orders in 1 hour)
- Database performance under load
- Queue processing efficiency

## Production Deployment

### Phase 1: Staging Deployment
- Deploy core infrastructure
- Configure webhook endpoints
- Set up monitoring and alerting
- Performance baseline establishment

### Phase 2: Limited Production
- Enable for 10% of orders
- Monitor performance metrics
- Gather user feedback
- Iterate based on findings

### Phase 3: Full Production
- Scale to 100% of orders
- Complete monitoring setup
- Documentation finalization
- Team training completion

## Related Documents

- [P001: Comprehensive Workflow Analysis](../00-planning/P001-comprehensive-workflow-analysis.md)
- [S001: Technical Requirements](../01-specifications/S001-DRAFT-technical-requirements.md)
- [S002: State Machine Design](../01-specifications/S002-DRAFT-state-machine-design.md)
- [S003: Business Rules Engine](../01-specifications/S003-DRAFT-business-rules-engine.md)