# S002: State Machine Design - Order Workflow Automation

## Document Information
- **Type**: Technical Specifications - State Machine
- **Status**: DRAFT  
- **Created**: 2025-09-07
- **MoSCoW Priority**: Must Have (M) - Core workflow engine

## State Machine Architecture

### Core State Machine Definition

```typescript
// Order State Machine Implementation
export class OrderStateMachine {
  private currentState: OrderState;
  private order: Order;
  private transitionLog: StateTransition[] = [];
  
  constructor(order: Order) {
    this.order = order;
    this.currentState = order.current_state;
  }
  
  // Get allowed transitions from current state
  getAllowedTransitions(): OrderState[] {
    return ORDER_TRANSITIONS[this.currentState] || [];
  }
  
  // Check if transition is valid
  canTransition(toState: OrderState): boolean {
    const allowedStates = this.getAllowedTransitions();
    return allowedStates.includes(toState);
  }
  
  // Execute state transition with validation
  async transition(
    toState: OrderState, 
    context: OrderContext,
    reason?: string
  ): Promise<TransitionResult> {
    if (!this.canTransition(toState)) {
      throw new InvalidTransitionError(
        `Cannot transition from ${this.currentState} to ${toState}`
      );
    }
    
    const transition: StateTransition = {
      id: generateId(),
      orderId: this.order.id,
      fromState: this.currentState,
      toState: toState,
      reason: reason || 'Automated transition',
      automated: true,
      startedAt: new Date(),
      context: context
    };
    
    try {
      // Execute pre-transition actions
      await this.executePreTransitionActions(transition);
      
      // Execute actual state change
      const result = await this.executeStateChange(transition);
      
      // Execute post-transition actions  
      await this.executePostTransitionActions(transition);
      
      // Update current state
      this.currentState = toState;
      this.order.current_state = toState;
      this.order.updated_at = new Date();
      
      // Log successful transition
      transition.completedAt = new Date();
      transition.duration_ms = transition.completedAt.getTime() - transition.startedAt.getTime();
      this.transitionLog.push(transition);
      
      return {
        success: true,
        newState: toState,
        transition: transition,
        actions: result.actionsExecuted
      };
      
    } catch (error) {
      transition.error = error.message;
      transition.completedAt = new Date();
      this.transitionLog.push(transition);
      
      // Execute rollback if needed
      await this.executeRollback(transition, error);
      
      throw new TransitionExecutionError(
        `Failed to transition from ${this.currentState} to ${toState}: ${error.message}`
      );
    }
  }
}
```

### State Definitions and Behaviors

```typescript
// Comprehensive state definitions with behaviors
interface OrderStateDefinition {
  name: OrderState;
  description: string;
  isTerminal: boolean;
  maxDurationMs: number;
  requiredActions: WorkflowAction[];
  optionalActions: WorkflowAction[];
  timeoutAction: WorkflowAction;
  retryableStates: OrderState[];
}

const ORDER_STATE_DEFINITIONS: Record<OrderState, OrderStateDefinition> = {
  received: {
    name: 'received',
    description: 'Order received from TikTok Shop webhook',
    isTerminal: false,
    maxDurationMs: 30000, // 30 seconds max in received state
    requiredActions: [
      {
        type: 'log_analytics_event',
        parameters: { event: 'order_received' },
        timeout_ms: 5000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'send_customer_notification', 
        parameters: { template: 'order_confirmation' },
        timeout_ms: 10000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'escalate_to_manual',
      parameters: { reason: 'processing_timeout' },
      timeout_ms: 60000,
      retry_config: { max_attempts: 1, backoff_strategy: 'fixed', initial_delay_ms: 0, max_delay_ms: 0, retry_conditions: [] }
    },
    retryableStates: ['received']
  },
  
  validated: {
    name: 'validated',
    description: 'Order data validated and sanitized',
    isTerminal: false,
    maxDurationMs: 15000, // 15 seconds max
    requiredActions: [
      {
        type: 'validate_address',
        parameters: { strict: true },
        timeout_ms: 10000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'update_tiktok_status',
        parameters: { status: 'processing' },
        timeout_ms: 5000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'escalate_to_manual',
      parameters: { reason: 'validation_timeout' },
      timeout_ms: 30000,
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: ['received']
  },
  
  processing: {
    name: 'processing',
    description: 'Order actively being processed by automation',
    isTerminal: false, 
    maxDurationMs: 60000, // 1 minute max processing time
    requiredActions: [
      {
        type: 'check_inventory',
        parameters: { reserve: false },
        timeout_ms: 15000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'trigger_webhook',
        parameters: { url: '/api/analytics/order-processing' },
        timeout_ms: 5000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'escalate_to_manual',
      parameters: { reason: 'processing_timeout', priority: 'high' },
      timeout_ms: 60000,
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: ['received', 'validated']
  },
  
  inventory_reserved: {
    name: 'inventory_reserved',
    description: 'Inventory successfully allocated to order',
    isTerminal: false,
    maxDurationMs: 30000, // 30 seconds max
    requiredActions: [
      {
        type: 'reserve_inventory',
        parameters: { hold_duration_minutes: 30 },
        timeout_ms: 20000,
        retry_config: EXTENDED_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'auto_reorder_inventory',
        parameters: { threshold_check: true },
        timeout_ms: 10000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'escalate_to_manual',
      parameters: { reason: 'inventory_reservation_timeout' },
      timeout_ms: 45000,
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: ['processing']
  },
  
  label_generated: {
    name: 'label_generated',
    description: 'Shipping label generated and ready for fulfillment',
    isTerminal: false,
    maxDurationMs: 45000, // 45 seconds max
    requiredActions: [
      {
        type: 'generate_shipping_label',
        parameters: { 
          carrier_selection: 'auto',
          service_level: 'standard',
          insurance: true 
        },
        timeout_ms: 30000,
        retry_config: EXTENDED_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'send_customer_notification',
        parameters: { template: 'label_generated' },
        timeout_ms: 5000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'escalate_to_manual',
      parameters: { reason: 'label_generation_timeout' },
      timeout_ms: 60000,
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: ['inventory_reserved']
  },
  
  shipped: {
    name: 'shipped',
    description: 'Order shipped and in transit',
    isTerminal: false,
    maxDurationMs: 864000000, // 10 days max shipping time
    requiredActions: [
      {
        type: 'update_tiktok_status',
        parameters: { 
          status: 'shipped',
          tracking_number: true,
          carrier_info: true 
        },
        timeout_ms: 15000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'schedule_follow_up',
        parameters: { 
          follow_up_type: 'delivery_tracking',
          delay_hours: 24 
        },
        timeout_ms: 5000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'escalate_to_manual',
      parameters: { reason: 'shipping_timeout' },
      timeout_ms: 1080000000, // 12.5 days
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: []
  },
  
  delivered: {
    name: 'delivered',
    description: 'Order successfully delivered to customer',
    isTerminal: true,
    maxDurationMs: 0, // Terminal state
    requiredActions: [
      {
        type: 'log_analytics_event',
        parameters: { 
          event: 'order_delivered',
          customer_satisfaction_survey: true 
        },
        timeout_ms: 10000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'trigger_webhook',
        parameters: { url: '/api/analytics/order-completed' },
        timeout_ms: 5000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'log_analytics_event',
      parameters: { event: 'delivery_confirmation_timeout' },
      timeout_ms: 0,
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: []
  },
  
  cancelled: {
    name: 'cancelled',
    description: 'Order cancelled by customer or system',
    isTerminal: true,
    maxDurationMs: 0, // Terminal state
    requiredActions: [
      {
        type: 'log_analytics_event',
        parameters: { 
          event: 'order_cancelled',
          refund_initiated: true 
        },
        timeout_ms: 15000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'send_customer_notification',
        parameters: { template: 'order_cancelled' },
        timeout_ms: 10000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'log_analytics_event',
      parameters: { event: 'cancellation_timeout' },
      timeout_ms: 0,
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: []
  },
  
  failed: {
    name: 'failed',
    description: 'Order processing failed and requires intervention',
    isTerminal: false,
    maxDurationMs: 3600000, // 1 hour before escalation
    requiredActions: [
      {
        type: 'escalate_to_manual',
        parameters: { 
          priority: 'high',
          include_error_details: true 
        },
        timeout_ms: 30000,
        retry_config: MINIMAL_RETRY_CONFIG
      }
    ],
    optionalActions: [
      {
        type: 'send_customer_notification',
        parameters: { template: 'processing_delayed' },
        timeout_ms: 10000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    timeoutAction: {
      type: 'escalate_to_manual',
      parameters: { 
        priority: 'critical',
        reason: 'failed_state_timeout' 
      },
      timeout_ms: 3600000,
      retry_config: MINIMAL_RETRY_CONFIG
    },
    retryableStates: ['processing', 'validated', 'received']
  }
};
```

### Transition Rules and Conditions

```typescript
// State transition validation rules
interface TransitionRule {
  fromState: OrderState;
  toState: OrderState;
  conditions: TransitionCondition[];
  preActions: WorkflowAction[];
  postActions: WorkflowAction[];
  rollbackActions: WorkflowAction[];
}

interface TransitionCondition {
  type: 'order_property' | 'inventory_check' | 'business_rule' | 'time_constraint';
  condition: (order: Order, context: OrderContext) => Promise<boolean>;
  errorMessage: string;
  retryable: boolean;
}

// Example transition rules
const TRANSITION_RULES: TransitionRule[] = [
  {
    fromState: 'received',
    toState: 'validated',
    conditions: [
      {
        type: 'order_property',
        condition: async (order) => !!order.customer_handle && !!order.product_id,
        errorMessage: 'Missing required order data',
        retryable: false
      },
      {
        type: 'business_rule',
        condition: async (order) => order.price > 0,
        errorMessage: 'Invalid order price',
        retryable: false
      }
    ],
    preActions: [
      {
        type: 'log_analytics_event',
        parameters: { event: 'validation_started' },
        timeout_ms: 5000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    postActions: [
      {
        type: 'update_tiktok_status', 
        parameters: { status: 'validated' },
        timeout_ms: 10000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    rollbackActions: [
      {
        type: 'log_analytics_event',
        parameters: { event: 'validation_failed' },
        timeout_ms: 5000,
        retry_config: MINIMAL_RETRY_CONFIG
      }
    ]
  },
  
  {
    fromState: 'processing',
    toState: 'inventory_reserved',
    conditions: [
      {
        type: 'inventory_check',
        condition: async (order, context) => {
          const inventory = await context.inventoryService.checkAvailability(order.product_id);
          return inventory.available >= order.quantity;
        },
        errorMessage: 'Insufficient inventory available',
        retryable: true
      }
    ],
    preActions: [
      {
        type: 'check_inventory',
        parameters: { strict: true },
        timeout_ms: 15000,
        retry_config: DEFAULT_RETRY_CONFIG
      }
    ],
    postActions: [
      {
        type: 'reserve_inventory',
        parameters: { 
          duration_minutes: 30,
          priority: 'high' 
        },
        timeout_ms: 20000,
        retry_config: EXTENDED_RETRY_CONFIG
      }
    ],
    rollbackActions: [
      {
        type: 'log_analytics_event',
        parameters: { event: 'inventory_reservation_failed' },
        timeout_ms: 5000,
        retry_config: MINIMAL_RETRY_CONFIG
      }
    ]
  }
];
```

### Priority-Based State Machine Behavior

```typescript
// Priority-specific state machine configurations
interface PriorityStateMachineConfig {
  priority: OrderPriority;
  stateTimeouts: Record<OrderState, number>;
  retryConfigurations: Record<OrderState, RetryConfig>;
  escalationRules: EscalationRule[];
}

const PRIORITY_CONFIGS: Record<OrderPriority, PriorityStateMachineConfig> = {
  high: {
    priority: 'high',
    stateTimeouts: {
      received: 15000,      // 15 seconds for viral orders
      validated: 10000,     // 10 seconds
      processing: 30000,    // 30 seconds  
      inventory_reserved: 20000, // 20 seconds
      label_generated: 25000,    // 25 seconds
      shipped: 864000000,        // 10 days
      delivered: 0,
      cancelled: 0,
      failed: 1800000            // 30 minutes before escalation
    },
    retryConfigurations: {
      received: AGGRESSIVE_RETRY_CONFIG,
      validated: AGGRESSIVE_RETRY_CONFIG,
      processing: AGGRESSIVE_RETRY_CONFIG,
      inventory_reserved: EXTENDED_RETRY_CONFIG,
      label_generated: EXTENDED_RETRY_CONFIG,
      shipped: DEFAULT_RETRY_CONFIG,
      delivered: MINIMAL_RETRY_CONFIG,
      cancelled: MINIMAL_RETRY_CONFIG,
      failed: MINIMAL_RETRY_CONFIG
    },
    escalationRules: [
      {
        trigger: 'state_timeout',
        action: 'notify_management',
        parameters: { urgency: 'high', sms_alert: true }
      },
      {
        trigger: 'retry_exhausted', 
        action: 'escalate_to_manual',
        parameters: { priority: 'critical', assign_specialist: true }
      }
    ]
  },
  
  urgent: {
    priority: 'urgent',
    stateTimeouts: {
      received: 20000,      // 20 seconds
      validated: 15000,     // 15 seconds
      processing: 45000,    // 45 seconds
      inventory_reserved: 30000, // 30 seconds
      label_generated: 35000,    // 35 seconds
      shipped: 864000000,        // 10 days
      delivered: 0,
      cancelled: 0,
      failed: 2700000            // 45 minutes
    },
    retryConfigurations: {
      received: DEFAULT_RETRY_CONFIG,
      validated: DEFAULT_RETRY_CONFIG,
      processing: EXTENDED_RETRY_CONFIG,
      inventory_reserved: EXTENDED_RETRY_CONFIG,
      label_generated: EXTENDED_RETRY_CONFIG,
      shipped: DEFAULT_RETRY_CONFIG,
      delivered: MINIMAL_RETRY_CONFIG,
      cancelled: MINIMAL_RETRY_CONFIG,
      failed: DEFAULT_RETRY_CONFIG
    },
    escalationRules: [
      {
        trigger: 'state_timeout',
        action: 'notify_team',
        parameters: { urgency: 'medium' }
      }
    ]
  },
  
  standard: {
    priority: 'standard',
    stateTimeouts: {
      received: 30000,      // 30 seconds
      validated: 20000,     // 20 seconds
      processing: 120000,   // 2 minutes
      inventory_reserved: 60000, // 1 minute
      label_generated: 90000,    // 1.5 minutes
      shipped: 864000000,        // 10 days
      delivered: 0,
      cancelled: 0,
      failed: 7200000            // 2 hours
    },
    retryConfigurations: {
      received: DEFAULT_RETRY_CONFIG,
      validated: DEFAULT_RETRY_CONFIG, 
      processing: DEFAULT_RETRY_CONFIG,
      inventory_reserved: DEFAULT_RETRY_CONFIG,
      label_generated: DEFAULT_RETRY_CONFIG,
      shipped: DEFAULT_RETRY_CONFIG,
      delivered: MINIMAL_RETRY_CONFIG,
      cancelled: MINIMAL_RETRY_CONFIG,
      failed: DEFAULT_RETRY_CONFIG
    },
    escalationRules: [
      {
        trigger: 'state_timeout',
        action: 'log_warning',
        parameters: { severity: 'medium' }
      }
    ]
  },
  
  automated: {
    priority: 'automated',
    stateTimeouts: {
      received: 10000,      // 10 seconds - fastest processing
      validated: 5000,      // 5 seconds
      processing: 15000,    // 15 seconds
      inventory_reserved: 10000, // 10 seconds
      label_generated: 15000,    // 15 seconds
      shipped: 864000000,        // 10 days
      delivered: 0,
      cancelled: 0,
      failed: 3600000            // 1 hour
    },
    retryConfigurations: {
      received: MINIMAL_RETRY_CONFIG,
      validated: MINIMAL_RETRY_CONFIG,
      processing: DEFAULT_RETRY_CONFIG,
      inventory_reserved: DEFAULT_RETRY_CONFIG,
      label_generated: DEFAULT_RETRY_CONFIG,
      shipped: DEFAULT_RETRY_CONFIG,
      delivered: MINIMAL_RETRY_CONFIG,
      cancelled: MINIMAL_RETRY_CONFIG,
      failed: DEFAULT_RETRY_CONFIG
    },
    escalationRules: [
      {
        trigger: 'automation_failure',
        action: 'reclassify_priority',
        parameters: { new_priority: 'standard' }
      }
    ]
  }
};
```

### Retry Configurations

```typescript
// Retry configuration constants
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  max_attempts: 3,
  backoff_strategy: 'exponential',
  initial_delay_ms: 1000,
  max_delay_ms: 30000,
  retry_conditions: ['network_error', 'rate_limit', 'temporary_failure'],
  circuit_breaker_threshold: 5
};

const AGGRESSIVE_RETRY_CONFIG: RetryConfig = {
  max_attempts: 5,
  backoff_strategy: 'exponential',
  initial_delay_ms: 500,
  max_delay_ms: 15000,
  retry_conditions: ['network_error', 'rate_limit', 'temporary_failure', 'timeout'],
  circuit_breaker_threshold: 3
};

const EXTENDED_RETRY_CONFIG: RetryConfig = {
  max_attempts: 4,
  backoff_strategy: 'linear',
  initial_delay_ms: 2000,
  max_delay_ms: 60000,
  retry_conditions: ['network_error', 'rate_limit', 'temporary_failure'],
  circuit_breaker_threshold: 7
};

const MINIMAL_RETRY_CONFIG: RetryConfig = {
  max_attempts: 1,
  backoff_strategy: 'fixed',
  initial_delay_ms: 0,
  max_delay_ms: 0,
  retry_conditions: [],
  circuit_breaker_threshold: 10
};
```

### State Machine Events and Triggers

```typescript
// State machine event system
interface StateMachineEvent {
  type: StateMachineEventType;
  orderId: string;
  payload: Record<string, any>;
  timestamp: Date;
  source: string;
}

type StateMachineEventType = 
  | 'state_entered'
  | 'state_exited' 
  | 'transition_started'
  | 'transition_completed'
  | 'transition_failed'
  | 'action_executed'
  | 'timeout_triggered'
  | 'retry_attempted'
  | 'escalation_triggered';

// Event handlers for monitoring and observability
interface StateMachineEventHandler {
  eventType: StateMachineEventType;
  handler: (event: StateMachineEvent) => Promise<void>;
  priority: number;
}

const EVENT_HANDLERS: StateMachineEventHandler[] = [
  {
    eventType: 'state_entered',
    handler: async (event) => {
      await analyticsService.trackEvent('order_state_entered', {
        orderId: event.orderId,
        state: event.payload.state,
        timestamp: event.timestamp
      });
    },
    priority: 1
  },
  {
    eventType: 'transition_failed',
    handler: async (event) => {
      await alertingService.sendAlert({
        type: 'workflow_failure',
        severity: 'high',
        orderId: event.orderId,
        error: event.payload.error,
        timestamp: event.timestamp
      });
    },
    priority: 0
  },
  {
    eventType: 'timeout_triggered',
    handler: async (event) => {
      await escalationService.escalateOrder({
        orderId: event.orderId,
        reason: 'state_timeout',
        currentState: event.payload.state,
        timestamp: event.timestamp
      });
    },
    priority: 0
  }
];
```

## Related Documents

- [P001: Comprehensive Workflow Analysis](../00-planning/P001-comprehensive-workflow-analysis.md)
- [S001: Technical Requirements](S001-DRAFT-technical-requirements.md)
- [S003: Business Rules Engine](S003-DRAFT-business-rules-engine.md)
- [I001: Implementation Plan](../02-implementation/I001-DRAFT-implementation-plan.md)