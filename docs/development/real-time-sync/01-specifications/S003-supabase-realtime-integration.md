# S003 - Supabase Real-Time Integration Specification

**Document Type**: Technical Specifications  
**Status**: Draft  
**Priority**: Must Have (M)  
**Last Updated**: 2025-09-07  
**Owner**: Real-Time Sync Specialist

## Executive Summary

This document specifies the implementation of Supabase Real-Time capabilities for CreatorFlow's synchronization architecture. It covers WebSocket management, database triggers, Edge Functions, and client-side subscription patterns optimized for dashboard components and cross-system coordination.

## Supabase Real-Time Architecture

### Core Real-Time Tables

```sql
-- Real-time dashboard metrics table
CREATE TABLE dashboard_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES auth.users(id),
    metric_type TEXT NOT NULL,
    metric_key TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    metadata JSONB DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    
    -- Composite unique constraint for upsert operations
    UNIQUE(creator_id, metric_type, metric_key)
);

-- Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE dashboard_metrics;

-- System health metrics for real-time monitoring
CREATE TABLE system_health_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('nominal', 'warning', 'critical')),
    metrics JSONB NOT NULL DEFAULT '{}',
    error_message TEXT,
    measured_at TIMESTAMPTZ DEFAULT NOW(),
    creator_id UUID REFERENCES auth.users(id),
    
    -- Index for efficient real-time queries
    INDEX idx_system_health_component_measured (component, measured_at DESC),
    INDEX idx_system_health_creator (creator_id, measured_at DESC)
);

ALTER PUBLICATION supabase_realtime ADD TABLE system_health_metrics;

-- Inventory alerts for critical stock notifications
CREATE TABLE inventory_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES auth.users(id),
    product_id UUID NOT NULL,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('low_stock', 'stockout', 'velocity_anomaly')),
    severity TEXT NOT NULL CHECK (severity IN ('warning', 'critical', 'emergency')),
    current_stock INTEGER,
    threshold INTEGER,
    velocity_per_hour NUMERIC,
    estimated_stockout_hours INTEGER,
    message TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    
    INDEX idx_inventory_alerts_creator_status (creator_id, status, created_at DESC)
);

ALTER PUBLICATION supabase_realtime ADD TABLE inventory_alerts;

-- Sync operation status for real-time sync monitoring
CREATE TABLE sync_operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES auth.users(id),
    operation_type TEXT NOT NULL,
    source_system TEXT NOT NULL,
    target_system TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed', 'retrying')),
    entity_count INTEGER DEFAULT 0,
    processed_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    last_error TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    estimated_completion_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}',
    
    INDEX idx_sync_operations_creator_status (creator_id, status, started_at DESC)
);

ALTER PUBLICATION supabase_realtime ADD TABLE sync_operations;
```

### Database Triggers for Real-Time Updates

```sql
-- Trigger function to update dashboard metrics
CREATE OR REPLACE FUNCTION update_dashboard_metrics()
RETURNS TRIGGER AS $$
DECLARE
    creator_uuid UUID;
    metric_updates JSONB;
BEGIN
    -- Extract creator_id from the triggering table
    IF TG_TABLE_NAME = 'orders' THEN
        creator_uuid := COALESCE(NEW.creator_id, OLD.creator_id);
        
        -- Update order metrics
        INSERT INTO dashboard_metrics (creator_id, metric_type, metric_key, metric_value)
        VALUES 
            (creator_uuid, 'orders', 'total_count', (
                SELECT COUNT(*) FROM orders WHERE creator_id = creator_uuid
            )),
            (creator_uuid, 'orders', 'today_count', (
                SELECT COUNT(*) FROM orders 
                WHERE creator_id = creator_uuid 
                AND DATE(created_at) = CURRENT_DATE
            )),
            (creator_uuid, 'orders', 'total_revenue', (
                SELECT COALESCE(SUM(total_amount), 0) FROM orders 
                WHERE creator_id = creator_uuid 
                AND status = 'completed'
            ))
        ON CONFLICT (creator_id, metric_type, metric_key) 
        DO UPDATE SET 
            metric_value = EXCLUDED.metric_value,
            updated_at = NOW();
            
    ELSIF TG_TABLE_NAME = 'inventory' THEN
        creator_uuid := COALESCE(NEW.creator_id, OLD.creator_id);
        
        -- Update inventory metrics
        INSERT INTO dashboard_metrics (creator_id, metric_type, metric_key, metric_value)
        VALUES 
            (creator_uuid, 'inventory', 'total_products', (
                SELECT COUNT(*) FROM inventory WHERE creator_id = creator_uuid
            )),
            (creator_uuid, 'inventory', 'low_stock_count', (
                SELECT COUNT(*) FROM inventory 
                WHERE creator_id = creator_uuid 
                AND available_quantity <= reorder_point
            )),
            (creator_uuid, 'inventory', 'total_value', (
                SELECT COALESCE(SUM(available_quantity * unit_cost), 0) 
                FROM inventory 
                WHERE creator_id = creator_uuid
            ))
        ON CONFLICT (creator_id, metric_type, metric_key) 
        DO UPDATE SET 
            metric_value = EXCLUDED.metric_value,
            updated_at = NOW();
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to relevant tables
CREATE TRIGGER orders_dashboard_metrics_trigger
    AFTER INSERT OR UPDATE OR DELETE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_dashboard_metrics();

CREATE TRIGGER inventory_dashboard_metrics_trigger
    AFTER INSERT OR UPDATE OR DELETE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_dashboard_metrics();

-- Trigger function for inventory alerts
CREATE OR REPLACE FUNCTION check_inventory_alerts()
RETURNS TRIGGER AS $$
DECLARE
    velocity NUMERIC;
    stockout_hours INTEGER;
    alert_severity TEXT;
BEGIN
    -- Only process updates that change stock levels
    IF OLD IS NULL OR NEW.available_quantity != OLD.available_quantity THEN
        
        -- Calculate recent velocity (sales per hour over last 24 hours)
        SELECT COALESCE(
            (COUNT(*) / 24.0), 0
        ) INTO velocity
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE oi.product_id = NEW.id
        AND o.created_at >= NOW() - INTERVAL '24 hours'
        AND o.status IN ('completed', 'shipped', 'delivered');
        
        -- Update velocity in inventory table
        UPDATE inventory 
        SET 
            velocity_per_hour = velocity,
            updated_at = NOW()
        WHERE id = NEW.id;
        
        -- Calculate estimated stockout time
        IF velocity > 0 THEN
            stockout_hours := CEILING(NEW.available_quantity / velocity);
        ELSE
            stockout_hours := NULL;
        END IF;
        
        -- Determine alert severity
        IF NEW.available_quantity = 0 THEN
            alert_severity := 'emergency';
        ELSIF NEW.available_quantity <= (NEW.reorder_point * 0.5) THEN
            alert_severity := 'critical';
        ELSIF NEW.available_quantity <= NEW.reorder_point THEN
            alert_severity := 'warning';
        ELSE
            alert_severity := NULL;
        END IF;
        
        -- Create or update alert if needed
        IF alert_severity IS NOT NULL THEN
            INSERT INTO inventory_alerts (
                creator_id,
                product_id,
                alert_type,
                severity,
                current_stock,
                threshold,
                velocity_per_hour,
                estimated_stockout_hours,
                message
            ) VALUES (
                NEW.creator_id,
                NEW.id,
                CASE WHEN NEW.available_quantity = 0 THEN 'stockout' ELSE 'low_stock' END,
                alert_severity,
                NEW.available_quantity,
                NEW.reorder_point,
                velocity,
                stockout_hours,
                FORMAT(
                    'Product "%s" has %s units remaining. Estimated stockout in %s hours.',
                    NEW.name,
                    NEW.available_quantity,
                    COALESCE(stockout_hours::TEXT, 'unknown')
                )
            )
            ON CONFLICT (creator_id, product_id, alert_type) 
            WHERE status = 'active'
            DO UPDATE SET
                severity = EXCLUDED.severity,
                current_stock = EXCLUDED.current_stock,
                velocity_per_hour = EXCLUDED.velocity_per_hour,
                estimated_stockout_hours = EXCLUDED.estimated_stockout_hours,
                message = EXCLUDED.message,
                created_at = NOW();
        ELSE
            -- Resolve existing alerts if stock is above threshold
            UPDATE inventory_alerts 
            SET 
                status = 'resolved',
                resolved_at = NOW()
            WHERE creator_id = NEW.creator_id
            AND product_id = NEW.id
            AND status = 'active';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inventory_alerts_trigger
    AFTER INSERT OR UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION check_inventory_alerts();
```

### Edge Functions for Real-Time Processing

```typescript
// supabase/functions/process-tiktok-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface TikTokWebhookPayload {
  type: string;
  shop_id: string;
  data: {
    order_id: string;
    status: string;
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
    total_amount: number;
    customer_info: any;
  };
  timestamp: number;
  signature: string;
}

serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const payload: TikTokWebhookPayload = await req.json();
    
    // Verify webhook signature
    const isValid = await verifyTikTokSignature(payload, req.headers.get('signature'));
    if (!isValid) {
      return new Response('Invalid signature', { status: 401 });
    }

    // Get creator mapping from shop_id
    const { data: creatorMapping } = await supabase
      .from('creator_shop_mappings')
      .select('creator_id')
      .eq('tiktok_shop_id', payload.shop_id)
      .single();

    if (!creatorMapping) {
      return new Response('Shop not found', { status: 404 });
    }

    const creatorId = creatorMapping.creator_id;

    // Process different webhook types
    switch (payload.type) {
      case 'ORDER_STATUS_CHANGE':
        await processOrderStatusChange(supabase, creatorId, payload.data);
        break;
      case 'INVENTORY_UPDATE':
        await processInventoryUpdate(supabase, creatorId, payload.data);
        break;
      default:
        console.log('Unhandled webhook type:', payload.type);
    }

    // Update sync operation status
    await supabase
      .from('sync_operations')
      .insert({
        creator_id: creatorId,
        operation_type: 'webhook_processing',
        source_system: 'tiktok_shop',
        target_system: 'creatorflow',
        status: 'completed',
        entity_count: 1,
        processed_count: 1,
        metadata: {
          webhook_type: payload.type,
          tiktok_order_id: payload.data.order_id
        }
      });

    return new Response('Webhook processed successfully', { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    // Log error to monitoring
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    await supabase
      .from('system_health_metrics')
      .insert({
        component: 'tiktok_webhook_processor',
        status: 'critical',
        metrics: { error_count: 1 },
        error_message: error.message
      });

    return new Response('Internal server error', { status: 500 });
  }
});

async function processOrderStatusChange(
  supabase: any, 
  creatorId: string, 
  orderData: any
): Promise<void> {
  // Create or update order
  const { error } = await supabase
    .from('orders')
    .upsert({
      creator_id: creatorId,
      tiktok_order_id: orderData.order_id,
      status: orderData.status,
      total_amount: orderData.total_amount,
      order_data: orderData,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'creator_id,tiktok_order_id'
    });

  if (error) throw error;

  // Process order items and update inventory
  for (const item of orderData.items) {
    await processOrderItem(supabase, creatorId, orderData.order_id, item);
  }
}

async function processOrderItem(
  supabase: any,
  creatorId: string, 
  orderId: string,
  item: any
): Promise<void> {
  // Reserve inventory
  const { error: inventoryError } = await supabase
    .rpc('reserve_inventory', {
      p_creator_id: creatorId,
      p_product_id: item.product_id,
      p_quantity: item.quantity,
      p_order_id: orderId
    });

  if (inventoryError) {
    console.error('Inventory reservation failed:', inventoryError);
    
    // Create inventory alert for insufficient stock
    await supabase
      .from('inventory_alerts')
      .insert({
        creator_id: creatorId,
        product_id: item.product_id,
        alert_type: 'insufficient_stock',
        severity: 'critical',
        message: `Failed to reserve ${item.quantity} units for order ${orderId}`
      });
  }
}

// Database function for atomic inventory reservation
CREATE OR REPLACE FUNCTION reserve_inventory(
    p_creator_id UUID,
    p_product_id UUID,
    p_quantity INTEGER,
    p_order_id TEXT
) RETURNS VOID AS $$
DECLARE
    current_stock INTEGER;
BEGIN
    -- Lock the inventory row for update
    SELECT available_quantity INTO current_stock
    FROM inventory 
    WHERE creator_id = p_creator_id AND id = p_product_id
    FOR UPDATE;
    
    -- Check if sufficient stock is available
    IF current_stock IS NULL THEN
        RAISE EXCEPTION 'Product not found: %', p_product_id;
    END IF;
    
    IF current_stock < p_quantity THEN
        RAISE EXCEPTION 'Insufficient stock. Available: %, Requested: %', current_stock, p_quantity;
    END IF;
    
    -- Update inventory levels
    UPDATE inventory 
    SET 
        available_quantity = available_quantity - p_quantity,
        reserved_quantity = reserved_quantity + p_quantity,
        updated_at = NOW()
    WHERE creator_id = p_creator_id AND id = p_product_id;
    
    -- Create reservation record
    INSERT INTO inventory_reservations (
        creator_id,
        product_id,
        order_id,
        quantity,
        reserved_at,
        expires_at
    ) VALUES (
        p_creator_id,
        p_product_id,
        p_order_id,
        p_quantity,
        NOW(),
        NOW() + INTERVAL '24 hours'
    );
END;
$$ LANGUAGE plpgsql;
```

### Client-Side Real-Time Integration

```typescript
// lib/hooks/useRealtimeMetrics.ts
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface DashboardMetrics {
  orders: {
    total_count: number;
    today_count: number;
    total_revenue: number;
    avg_processing_time: number;
  };
  inventory: {
    total_products: number;
    low_stock_count: number;
    total_value: number;
    critical_alerts: number;
  };
  system: {
    health_status: 'nominal' | 'warning' | 'critical';
    sync_status: 'synced' | 'syncing' | 'error';
    last_sync: Date;
  };
}

interface UseRealtimeMetricsOptions {
  creatorId: string;
  refreshInterval?: number;
  enableOptimisticUpdates?: boolean;
}

export function useRealtimeMetrics(options: UseRealtimeMetricsOptions) {
  const { creatorId, refreshInterval = 30000, enableOptimisticUpdates = true } = options;
  
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const channelRef = useRef<RealtimeChannel | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const optimisticUpdatesRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    const supabase = createClient();
    
    // Initial data fetch
    fetchInitialMetrics();
    
    // Setup real-time subscription
    setupRealtimeSubscription();
    
    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [creatorId]);

  const fetchInitialMetrics = async () => {
    try {
      const supabase = createClient();
      
      // Fetch dashboard metrics
      const { data: metricsData, error: metricsError } = await supabase
        .from('dashboard_metrics')
        .select('metric_type, metric_key, metric_value, updated_at')
        .eq('creator_id', creatorId);

      if (metricsError) throw metricsError;

      // Fetch system health
      const { data: healthData, error: healthError } = await supabase
        .from('system_health_metrics')
        .select('component, status, measured_at')
        .eq('creator_id', creatorId)
        .order('measured_at', { ascending: false })
        .limit(10);

      if (healthError) throw healthError;

      // Transform metrics data
      const transformedMetrics = transformMetricsData(metricsData, healthData);
      setMetrics(transformedMetrics);
      setLastUpdated(new Date());
      setError(null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      console.error('Failed to fetch initial metrics:', err);
    }
  };

  const setupRealtimeSubscription = () => {
    const supabase = createClient();
    
    channelRef.current = supabase
      .channel(`dashboard_metrics_${creatorId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dashboard_metrics',
          filter: `creator_id=eq.${creatorId}`,
        },
        handleMetricsUpdate
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_health_metrics',
          filter: `creator_id=eq.${creatorId}`,
        },
        handleHealthUpdate
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inventory_alerts',
          filter: `creator_id=eq.${creatorId}`,
        },
        handleInventoryAlert
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
        
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setError(null);
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          setError('Real-time connection error');
          scheduleReconnect();
        } else if (status === 'TIMED_OUT') {
          setIsConnected(false);
          setError('Real-time connection timed out');
          scheduleReconnect();
        }
      });
  };

  const handleMetricsUpdate = (payload: any) => {
    console.log('Metrics update received:', payload);
    
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    setMetrics(currentMetrics => {
      if (!currentMetrics) return currentMetrics;
      
      const updatedMetrics = { ...currentMetrics };
      
      // Apply optimistic update if available
      const optimisticKey = `${newRecord?.metric_type}_${newRecord?.metric_key}`;
      const optimisticValue = optimisticUpdatesRef.current.get(optimisticKey);
      
      if (optimisticValue && enableOptimisticUpdates) {
        // Use optimistic value and remove from pending updates
        updateMetricValue(updatedMetrics, newRecord.metric_type, newRecord.metric_key, optimisticValue);
        optimisticUpdatesRef.current.delete(optimisticKey);
      } else {
        // Use actual value from database
        updateMetricValue(updatedMetrics, newRecord.metric_type, newRecord.metric_key, newRecord.metric_value);
      }
      
      return updatedMetrics;
    });
    
    setLastUpdated(new Date());
  };

  const handleHealthUpdate = (payload: any) => {
    console.log('Health update received:', payload);
    
    setMetrics(currentMetrics => {
      if (!currentMetrics) return currentMetrics;
      
      const { new: newRecord } = payload;
      
      // Determine overall system health
      let overallHealth: 'nominal' | 'warning' | 'critical' = 'nominal';
      
      if (newRecord.status === 'critical') {
        overallHealth = 'critical';
      } else if (newRecord.status === 'warning' && currentMetrics.system.health_status !== 'critical') {
        overallHealth = 'warning';
      }
      
      return {
        ...currentMetrics,
        system: {
          ...currentMetrics.system,
          health_status: overallHealth,
          last_sync: new Date(newRecord.measured_at)
        }
      };
    });
  };

  const handleInventoryAlert = (payload: any) => {
    console.log('Inventory alert received:', payload);
    
    // Trigger notification for critical alerts
    if (payload.new?.severity === 'critical' || payload.new?.severity === 'emergency') {
      // Show browser notification if permissions granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Critical Stock Alert', {
          body: payload.new.message,
          icon: '/icons/alert.png',
          tag: `inventory_alert_${payload.new.product_id}`
        });
      }
    }
    
    // Update critical alerts count
    setMetrics(currentMetrics => {
      if (!currentMetrics) return currentMetrics;
      
      return {
        ...currentMetrics,
        inventory: {
          ...currentMetrics.inventory,
          critical_alerts: currentMetrics.inventory.critical_alerts + 1
        }
      };
    });
  };

  const scheduleReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    // Exponential backoff for reconnection
    const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
    
    reconnectTimeoutRef.current = setTimeout(() => {
      console.log('Attempting to reconnect real-time subscription...');
      setupRealtimeSubscription();
    }, backoffDelay);
  };

  // Optimistic update function
  const optimisticUpdate = (metricType: string, metricKey: string, newValue: number) => {
    if (!enableOptimisticUpdates) return;
    
    const optimisticKey = `${metricType}_${metricKey}`;
    optimisticUpdatesRef.current.set(optimisticKey, newValue);
    
    setMetrics(currentMetrics => {
      if (!currentMetrics) return currentMetrics;
      
      const updatedMetrics = { ...currentMetrics };
      updateMetricValue(updatedMetrics, metricType, metricKey, newValue);
      
      return updatedMetrics;
    });
    
    // Clear optimistic update after timeout
    setTimeout(() => {
      optimisticUpdatesRef.current.delete(optimisticKey);
    }, 10000);
  };

  return {
    metrics,
    isConnected,
    lastUpdated,
    error,
    optimisticUpdate,
    refetch: fetchInitialMetrics
  };
}

// Helper function to update nested metric values
function updateMetricValue(
  metrics: DashboardMetrics,
  metricType: string,
  metricKey: string,
  value: number
): void {
  if (metricType === 'orders') {
    (metrics.orders as any)[metricKey] = value;
  } else if (metricType === 'inventory') {
    (metrics.inventory as any)[metricKey] = value;
  } else if (metricType === 'system') {
    (metrics.system as any)[metricKey] = value;
  }
}

// Transform raw database metrics into typed structure
function transformMetricsData(
  metricsData: any[],
  healthData: any[]
): DashboardMetrics {
  const metricsByType = metricsData.reduce((acc, metric) => {
    if (!acc[metric.metric_type]) {
      acc[metric.metric_type] = {};
    }
    acc[metric.metric_type][metric.metric_key] = metric.metric_value;
    return acc;
  }, {});

  const latestHealth = healthData.find(h => h.component === 'overall') || 
                      { status: 'nominal', measured_at: new Date() };

  return {
    orders: {
      total_count: metricsByType.orders?.total_count || 0,
      today_count: metricsByType.orders?.today_count || 0,
      total_revenue: metricsByType.orders?.total_revenue || 0,
      avg_processing_time: metricsByType.orders?.avg_processing_time || 0,
    },
    inventory: {
      total_products: metricsByType.inventory?.total_products || 0,
      low_stock_count: metricsByType.inventory?.low_stock_count || 0,
      total_value: metricsByType.inventory?.total_value || 0,
      critical_alerts: metricsByType.inventory?.critical_alerts || 0,
    },
    system: {
      health_status: latestHealth.status,
      sync_status: 'synced', // Determine from sync operations
      last_sync: new Date(latestHealth.measured_at),
    }
  };
}
```

### React Component Integration

```typescript
// components/dashboard/RealtimeMetricsCard.tsx
import { useRealtimeMetrics } from '@/lib/hooks/useRealtimeMetrics';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType;
  status?: 'positive' | 'negative' | 'neutral';
  isLoading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  status = 'neutral',
  isLoading = false
}) => {
  const statusColors = {
    positive: 'text-green-500 dark:text-green-400',
    negative: 'text-red-500 dark:text-red-400',
    neutral: 'text-gray-500 dark:text-gray-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-200/10 dark:border-slate-100/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      
      <div className="flex items-baseline justify-between">
        <motion.div
          key={value}
          initial={{ scale: 1.05, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            value
          )}
        </motion.div>
        
        {change && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-sm font-medium ${statusColors[status]}`}
          >
            {change}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const RealtimeMetricsCard: React.FC = () => {
  const { user } = useAuth();
  const { metrics, isConnected, lastUpdated, error } = useRealtimeMetrics({
    creatorId: user?.id || '',
    enableOptimisticUpdates: true
  });

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Dashboard Metrics
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
          }`} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {isConnected ? 'Live' : 'Disconnected'}
          </span>
          {lastUpdated && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              • Updated {formatTimeAgo(lastUpdated)}
            </span>
          )}
        </div>
      </div>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Orders"
          value={metrics?.orders.today_count || 0}
          change={`+${Math.round((metrics?.orders.today_count || 0) * 0.12)}%`}
          icon={() => <ShoppingCart className="w-5 h-5" />}
          status="positive"
          isLoading={!metrics}
        />
        
        <MetricCard
          title="Total Revenue"
          value={`$${(metrics?.orders.total_revenue || 0).toLocaleString()}`}
          change="+8.2%"
          icon={() => <DollarSign className="w-5 h-5" />}
          status="positive"
          isLoading={!metrics}
        />
        
        <MetricCard
          title="Low Stock Items"
          value={metrics?.inventory.low_stock_count || 0}
          icon={() => <AlertTriangle className="w-5 h-5" />}
          status={metrics?.inventory.low_stock_count ? 'negative' : 'neutral'}
          isLoading={!metrics}
        />
        
        <MetricCard
          title="System Health"
          value={metrics?.system.health_status || 'Unknown'}
          icon={() => <Activity className="w-5 h-5" />}
          status={
            metrics?.system.health_status === 'critical' ? 'negative' :
            metrics?.system.health_status === 'warning' ? 'neutral' : 'positive'
          }
          isLoading={!metrics}
        />
      </div>

      {/* Critical Alerts */}
      {metrics?.inventory.critical_alerts > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-medium text-red-800 dark:text-red-200">
              {metrics.inventory.critical_alerts} Critical Stock Alert{metrics.inventory.critical_alerts > 1 ? 's' : ''}
            </h3>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            Some products are critically low on stock. Immediate attention required.
          </p>
        </motion.div>
      )}
    </div>
  );
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  
  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
```

### Performance Optimization for Supabase Real-Time

```typescript
// lib/supabase/realtime-optimizer.ts
interface RealtimeOptimizer {
  connectionPool: Map<string, RealtimeChannel>;
  subscriptionManager: SubscriptionManager;
  messageBuffer: MessageBuffer;
  performanceMonitor: PerformanceMonitor;
}

class SupabaseRealtimeOptimizer {
  private connectionPool = new Map<string, RealtimeChannel>();
  private subscriptionCount = new Map<string, number>();
  private messageBuffer = new Map<string, any[]>();
  private flushTimeouts = new Map<string, NodeJS.Timeout>();

  // Share connections across multiple components
  getOrCreateChannel(channelName: string, creatorId: string): RealtimeChannel {
    const channelKey = `${channelName}_${creatorId}`;
    
    if (this.connectionPool.has(channelKey)) {
      const count = this.subscriptionCount.get(channelKey) || 0;
      this.subscriptionCount.set(channelKey, count + 1);
      return this.connectionPool.get(channelKey)!;
    }

    const supabase = createClient();
    const channel = supabase.channel(channelKey);
    
    this.connectionPool.set(channelKey, channel);
    this.subscriptionCount.set(channelKey, 1);
    
    return channel;
  }

  // Clean up unused connections
  releaseChannel(channelName: string, creatorId: string): void {
    const channelKey = `${channelName}_${creatorId}`;
    const count = this.subscriptionCount.get(channelKey) || 0;
    
    if (count <= 1) {
      // Last subscription, clean up
      const channel = this.connectionPool.get(channelKey);
      if (channel) {
        channel.unsubscribe();
        this.connectionPool.delete(channelKey);
        this.subscriptionCount.delete(channelKey);
      }
    } else {
      this.subscriptionCount.set(channelKey, count - 1);
    }
  }

  // Buffer and batch frequent updates
  bufferMessage(channelKey: string, message: any, flushDelay = 100): void {
    if (!this.messageBuffer.has(channelKey)) {
      this.messageBuffer.set(channelKey, []);
    }
    
    this.messageBuffer.get(channelKey)!.push(message);
    
    // Schedule flush if not already scheduled
    if (!this.flushTimeouts.has(channelKey)) {
      const timeout = setTimeout(() => {
        this.flushMessages(channelKey);
      }, flushDelay);
      
      this.flushTimeouts.set(channelKey, timeout);
    }
  }

  private flushMessages(channelKey: string): void {
    const messages = this.messageBuffer.get(channelKey) || [];
    if (messages.length === 0) return;
    
    // Batch process messages
    const consolidatedUpdate = this.consolidateMessages(messages);
    
    // Emit consolidated update
    this.emitUpdate(channelKey, consolidatedUpdate);
    
    // Clear buffer
    this.messageBuffer.set(channelKey, []);
    this.flushTimeouts.delete(channelKey);
  }

  private consolidateMessages(messages: any[]): any {
    // Merge multiple messages into single update
    // Keep latest values, sum numerical changes
    return messages.reduce((consolidated, message) => {
      // Merge logic based on message type
      if (message.type === 'metric_update') {
        consolidated.metrics = { ...consolidated.metrics, ...message.metrics };
      } else if (message.type === 'count_increment') {
        consolidated.count = (consolidated.count || 0) + (message.increment || 0);
      }
      
      return consolidated;
    }, { type: 'consolidated_update' });
  }

  private emitUpdate(channelKey: string, update: any): void {
    const channel = this.connectionPool.get(channelKey);
    if (channel) {
      // Emit to all subscribers of this channel
      channel.send({
        type: 'broadcast',
        event: 'consolidated_update',
        payload: update
      });
    }
  }

  // Monitor performance metrics
  monitorPerformance(): void {
    setInterval(() => {
      const metrics = {
        active_connections: this.connectionPool.size,
        total_subscriptions: Array.from(this.subscriptionCount.values()).reduce((a, b) => a + b, 0),
        buffered_messages: Array.from(this.messageBuffer.values()).reduce((a, b) => a + b.length, 0),
        memory_usage: process.memoryUsage?.()?.heapUsed || 0
      };
      
      console.log('Realtime performance metrics:', metrics);
      
      // Alert if performance degrades
      if (metrics.active_connections > 50) {
        console.warn('High number of realtime connections:', metrics.active_connections);
      }
      
      if (metrics.buffered_messages > 1000) {
        console.warn('High message buffer size:', metrics.buffered_messages);
      }
    }, 30000); // Every 30 seconds
  }
}

// Global instance
export const realtimeOptimizer = new SupabaseRealtimeOptimizer();
```

## Related Documents

- [S001-Comprehensive-Realtime-Sync-Architecture.md](S001-comprehensive-realtime-sync-architecture.md) - Overall architecture specification
- [S002-Event-Sourcing-Implementation.md](S002-event-sourcing-implementation.md) - Event sourcing patterns
- [I001-DRAFT-Sync-Engine-Implementation.md](../02-implementation/I001-DRAFT-sync-engine-implementation.md) - Implementation progress
- [Supabase Documentation](https://supabase.com/docs/guides/realtime) - Official Supabase real-time guide