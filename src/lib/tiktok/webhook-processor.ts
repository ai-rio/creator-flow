/**
 * TikTok Webhook Processing System
 * Handles real-time order updates, inventory changes, and viral content correlation
 */

import crypto from 'crypto';

import { createClient } from '@/libs/supabase/supabase-server-client';

import { EnhancedTikTokAPIClient, TikTokWebhookEvent, WebhookPerformanceStats,WebhookProcessingResult } from './enhanced-api-client';

// === WEBHOOK EVENT TYPES ===

export interface TikTokOrderEvent {
  type: 'order_status_update';
  shop_id: string;
  order_id: string;
  old_status: string;
  new_status: string;
  timestamp: string;
  data: {
    order: any;
    status_history: any[];
  };
}

export interface TikTokInventoryEvent {
  type: 'inventory_update';
  shop_id: string;
  product_id: string;
  old_quantity: number;
  new_quantity: number;
  timestamp: string;
  data: {
    product: any;
    inventory_change_reason: string;
  };
}

export interface TikTokProductEvent {
  type: 'product_update';
  shop_id: string;
  product_id: string;
  change_type: 'price' | 'inventory' | 'status' | 'details';
  timestamp: string;
  data: {
    product: any;
    changes: Record<string, { old_value: any; new_value: any }>;
  };
}

// === PROCESSING RESULTS ===

export interface ProcessingMetrics {
  event_id: string;
  event_type: string;
  processing_start: number;
  processing_end?: number;
  success: boolean;
  error_message?: string;
  retry_count: number;
  sync_actions_performed: string[];
}

export interface StockAlert {
  product_id: string;
  product_name: string;
  current_stock: number;
  alert_level: 'critical' | 'low' | 'medium';
  context: string; // e.g., "Viral video driving orders"
  velocity: string; // e.g., "Selling 47/hour, 6hr stock"
  suggestion: string; // e.g., "Auto-reorder suggested: 500"
  auto_reorder_enabled: boolean;
}

// === MAIN WEBHOOK PROCESSOR ===

export class TikTokWebhookProcessor {
  private supabase = createClient();
  private performanceStats: WebhookPerformanceStats = {
    average_processing_time: 0,
    success_rate: 0,
    total_events_processed: 0,
    failed_events: 0,
    retry_success_rate: 0
  };
  
  private processingMetrics: ProcessingMetrics[] = [];
  private maxMetricsHistory = 1000;

  constructor(private apiClient: EnhancedTikTokAPIClient) {}

  // === WEBHOOK SIGNATURE VERIFICATION ===

  verifyWebhookSignature(payload: string, signature: string, timestamp: string): boolean {
    const appSecret = process.env.TIKTOK_SHOP_APP_SECRET!;
    
    // Verify timestamp is recent (within 5 minutes)
    const currentTime = Math.floor(Date.now() / 1000);
    const webhookTime = parseInt(timestamp);
    
    if (Math.abs(currentTime - webhookTime) > 300) { // 5 minutes
      console.warn('Webhook timestamp too old or too far in future');
      return false;
    }

    return EnhancedTikTokAPIClient.verifyWebhookSignature(payload, signature, timestamp, appSecret);
  }

  // === EVENT PROCESSING ===

  async processOrderStatusUpdate(event: TikTokOrderEvent): Promise<WebhookProcessingResult> {
    const startTime = Date.now();
    const metrics: ProcessingMetrics = {
      event_id: crypto.randomUUID(),
      event_type: 'order_status_update',
      processing_start: startTime,
      success: false,
      retry_count: 0,
      sync_actions_performed: []
    };

    try {
      // 1. Update order in database
      const { error: updateError } = await this.supabase
        .from('tiktok_orders')
        .update({
          order_status: event.new_status,
          order_data: event.data.order,
          sync_status: 'synced',
          updated_at: new Date().toISOString()
        })
        .eq('tiktok_order_id', event.order_id)
        .eq('shop_id', event.shop_id);

      if (updateError) throw updateError;
      metrics.sync_actions_performed.push('database_order_update');

      // 2. Update CreatorFlow order status
      await this.syncOrderStatusToCreatorFlow(event);
      metrics.sync_actions_performed.push('creatorflow_order_sync');

      // 3. Trigger real-time UI updates
      await this.publishRealTimeUpdate('order_updates', {
        shop_id: event.shop_id,
        order_id: event.order_id,
        new_status: event.new_status,
        timestamp: event.timestamp
      });
      metrics.sync_actions_performed.push('realtime_ui_update');

      // 4. Check for viral content correlation
      if (event.new_status === 'PAID' || event.new_status === 'AWAITING_SHIPMENT') {
        await this.checkViralContentCorrelation(event);
        metrics.sync_actions_performed.push('viral_content_check');
      }

      // 5. Update performance metrics
      const processingTime = Date.now() - startTime;
      this.updateProcessingStats(processingTime, true);

      metrics.success = true;
      metrics.processing_end = Date.now();
      this.addProcessingMetric(metrics);

      return {
        success: true,
        processing_time_ms: processingTime,
        event_type: 'order_status_update',
        retry_count: 0
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.updateProcessingStats(processingTime, false);

      metrics.success = false;
      metrics.error_message = error instanceof Error ? error.message : 'Unknown error';
      metrics.processing_end = Date.now();
      this.addProcessingMetric(metrics);

      console.error('Order status update failed:', error);
      
      return {
        success: false,
        processing_time_ms: processingTime,
        event_type: 'order_status_update',
        error: metrics.error_message,
        retry_count: 0,
        next_retry_at: new Date(Date.now() + 30000).toISOString() // 30 seconds
      };
    }
  }

  async processInventoryUpdate(event: TikTokInventoryEvent): Promise<WebhookProcessingResult> {
    const startTime = Date.now();
    const metrics: ProcessingMetrics = {
      event_id: crypto.randomUUID(),
      event_type: 'inventory_update',
      processing_start: startTime,
      success: false,
      retry_count: 0,
      sync_actions_performed: []
    };

    try {
      // 1. Update product inventory in database
      const { error: updateError } = await this.supabase
        .from('tiktok_products')
        .update({
          inventory_quantity: event.new_quantity,
          product_data: event.data.product,
          last_synced_at: new Date().toISOString()
        })
        .eq('tiktok_product_id', event.product_id)
        .eq('shop_id', event.shop_id);

      if (updateError) throw updateError;
      metrics.sync_actions_performed.push('database_inventory_update');

      // 2. Calculate new velocity and alerts
      const velocityData = await this.calculateProductVelocity(event.product_id, event.shop_id);
      const stockAlert = await this.generateStockAlert(event, velocityData);
      
      if (stockAlert) {
        metrics.sync_actions_performed.push('stock_alert_generated');
        
        // 3. Publish critical stock alert if needed
        if (stockAlert.alert_level === 'critical') {
          await this.publishRealTimeUpdate('critical_stock_alerts', stockAlert);
          metrics.sync_actions_performed.push('critical_alert_published');
        }
      }

      // 4. Update inventory visualization data
      await this.updateInventoryVisualization(event.shop_id);
      metrics.sync_actions_performed.push('visualization_update');

      // 5. Check for auto-reorder triggers
      if (event.new_quantity <= await this.getAutoReorderThreshold(event.product_id)) {
        await this.triggerAutoReorder(event.product_id, event.shop_id);
        metrics.sync_actions_performed.push('auto_reorder_triggered');
      }

      const processingTime = Date.now() - startTime;
      this.updateProcessingStats(processingTime, true);

      metrics.success = true;
      metrics.processing_end = Date.now();
      this.addProcessingMetric(metrics);

      return {
        success: true,
        processing_time_ms: processingTime,
        event_type: 'inventory_update',
        retry_count: 0
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.updateProcessingStats(processingTime, false);

      metrics.success = false;
      metrics.error_message = error instanceof Error ? error.message : 'Unknown error';
      metrics.processing_end = Date.now();
      this.addProcessingMetric(metrics);

      console.error('Inventory update failed:', error);

      return {
        success: false,
        processing_time_ms: processingTime,
        event_type: 'inventory_update',
        error: metrics.error_message,
        retry_count: 0,
        next_retry_at: new Date(Date.now() + 15000).toISOString() // 15 seconds
      };
    }
  }

  async processProductUpdate(event: TikTokProductEvent): Promise<WebhookProcessingResult> {
    const startTime = Date.now();
    
    try {
      // Update product data in database
      const { error } = await this.supabase
        .from('tiktok_products')
        .update({
          product_data: event.data.product,
          last_synced_at: new Date().toISOString()
        })
        .eq('tiktok_product_id', event.product_id)
        .eq('shop_id', event.shop_id);

      if (error) throw error;

      // Trigger real-time UI update
      await this.publishRealTimeUpdate('product_updates', {
        shop_id: event.shop_id,
        product_id: event.product_id,
        change_type: event.change_type,
        changes: event.data.changes
      });

      const processingTime = Date.now() - startTime;
      this.updateProcessingStats(processingTime, true);

      return {
        success: true,
        processing_time_ms: processingTime,
        event_type: 'product_update',
        retry_count: 0
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.updateProcessingStats(processingTime, false);

      return {
        success: false,
        processing_time_ms: processingTime,
        event_type: 'product_update',
        error: error instanceof Error ? error.message : 'Unknown error',
        retry_count: 0,
        next_retry_at: new Date(Date.now() + 10000).toISOString() // 10 seconds
      };
    }
  }

  // === HELPER METHODS ===

  private async syncOrderStatusToCreatorFlow(event: TikTokOrderEvent): Promise<void> {
    // Map TikTok order status to CreatorFlow order status
    const creatorFlowStatus = this.mapTikTokStatusToCreatorFlow(event.new_status);
    
    // Update in orders table (assuming it exists)
    const { error } = await this.supabase
      .from('orders')
      .update({ 
        status: creatorFlowStatus,
        tiktok_sync_status: 'synced',
        updated_at: new Date().toISOString()
      })
      .eq('external_order_id', event.order_id)
      .eq('platform', 'tiktok_shop');

    if (error) {
      console.error('Failed to sync order status to CreatorFlow:', error);
    }
  }

  private mapTikTokStatusToCreatorFlow(tiktokStatus: string): string {
    const statusMap: Record<string, string> = {
      'UNPAID': 'pending',
      'PAID': 'confirmed',
      'AWAITING_SHIPMENT': 'processing',
      'PARTIAL_SHIPPING': 'partially_shipped',
      'IN_TRANSIT': 'shipped',
      'SHIPPED': 'shipped',
      'DELIVERED': 'delivered',
      'CANCELLED': 'cancelled',
      'COMPLETED': 'completed'
    };

    return statusMap[tiktokStatus] || 'unknown';
  }

  private async checkViralContentCorrelation(event: TikTokOrderEvent): Promise<void> {
    // This would integrate with TikTok Content API or analytics service
    // For now, it's a placeholder that logs the correlation check
    console.log(`Checking viral content correlation for order ${event.order_id}`);
    
    // Future implementation:
    // 1. Query recent viral content for the shop
    // 2. Correlate order timing with content performance
    // 3. Update viral_content_tracking table
    // 4. Adjust inventory velocity predictions
  }

  private async calculateProductVelocity(productId: string, shopId: string): Promise<any> {
    // Query recent orders for this product to calculate velocity
    const { data: recentOrders } = await this.supabase
      .from('tiktok_orders')
      .select('order_data, created_at')
      .eq('shop_id', shopId)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
      .order('created_at', { ascending: false });

    if (!recentOrders) return null;

    // Calculate units sold in last 24 hours
    let totalUnits = 0;
    for (const order of recentOrders) {
      const items = order.order_data?.items || [];
      for (const item of items) {
        if (item.product_id === productId) {
          totalUnits += item.quantity || 0;
        }
      }
    }

    return {
      current_velocity: totalUnits / 24, // units per hour
      last_calculated: new Date().toISOString(),
      sample_period_hours: 24
    };
  }

  private async generateStockAlert(event: TikTokInventoryEvent, velocityData: any): Promise<StockAlert | null> {
    if (!velocityData || velocityData.current_velocity === 0) return null;

    const hoursUntilStockout = event.new_quantity / velocityData.current_velocity;
    
    let alertLevel: 'critical' | 'low' | 'medium' = 'medium';
    if (hoursUntilStockout <= 6) alertLevel = 'critical';
    else if (hoursUntilStockout <= 24) alertLevel = 'low';

    if (alertLevel === 'medium') return null; // Only alert for critical and low

    return {
      product_id: event.product_id,
      product_name: event.data.product?.name || 'Unknown Product',
      current_stock: event.new_quantity,
      alert_level: alertLevel,
      context: 'Automated velocity calculation',
      velocity: `Selling ${Math.round(velocityData.current_velocity)}/hour, ${Math.round(hoursUntilStockout)}hr stock`,
      suggestion: `Auto-reorder suggested: ${Math.ceil(velocityData.current_velocity * 48)}`, // 48 hours worth
      auto_reorder_enabled: false // Would be configured per product
    };
  }

  private async updateInventoryVisualization(shopId: string): Promise<void> {
    // Update the inventory visualization data for real-time UI updates
    const { data: products } = await this.supabase
      .from('tiktok_products')
      .select('*')
      .eq('shop_id', shopId);

    if (!products) return;

    // Generate visualization data (this would match the UI component requirements)
    const visualizationData = products.map(product => ({
      name: product.product_data?.name || 'Unknown',
      level: product.inventory_quantity > 100 ? 'High' : 
             product.inventory_quantity > 50 ? 'Med' : 'Low',
      height: `h-${Math.min(20, Math.max(6, Math.floor(product.inventory_quantity / 10)))}`
    }));

    // Publish to real-time channel for inventory visualization
    await this.publishRealTimeUpdate('inventory_visualization', {
      shop_id: shopId,
      landscape_data: visualizationData,
      updated_at: new Date().toISOString()
    });
  }

  private async getAutoReorderThreshold(productId: string): Promise<number> {
    const { data } = await this.supabase
      .from('tiktok_products')
      .select('stock_alerts')
      .eq('tiktok_product_id', productId)
      .single();

    return data?.stock_alerts?.auto_reorder_threshold || 10; // Default threshold
  }

  private async triggerAutoReorder(productId: string, shopId: string): Promise<void> {
    // This would integrate with inventory management system
    console.log(`Auto-reorder triggered for product ${productId} in shop ${shopId}`);
    
    // Future implementation:
    // 1. Calculate reorder quantity based on velocity
    // 2. Create purchase order or supplier notification
    // 3. Update reorder status in database
    // 4. Notify creator of auto-reorder action
  }

  private async publishRealTimeUpdate(channel: string, payload: any): Promise<void> {
    // Publish to Supabase real-time channel
    const channelInstance = this.supabase.channel(channel);
    await channelInstance.send({
      type: 'broadcast',
      event: 'update',
      payload
    });
  }

  private updateProcessingStats(processingTime: number, success: boolean): void {
    this.performanceStats.total_events_processed++;
    
    if (success) {
      // Update running average
      const totalTime = this.performanceStats.average_processing_time * (this.performanceStats.total_events_processed - 1);
      this.performanceStats.average_processing_time = (totalTime + processingTime) / this.performanceStats.total_events_processed;
    } else {
      this.performanceStats.failed_events++;
    }

    // Calculate success rate
    this.performanceStats.success_rate = 
      ((this.performanceStats.total_events_processed - this.performanceStats.failed_events) / 
       this.performanceStats.total_events_processed) * 100;
  }

  private addProcessingMetric(metric: ProcessingMetrics): void {
    this.processingMetrics.push(metric);
    
    // Keep only the most recent metrics
    if (this.processingMetrics.length > this.maxMetricsHistory) {
      this.processingMetrics = this.processingMetrics.slice(-this.maxMetricsHistory);
    }
  }

  // === PUBLIC METHODS ===

  getPerformanceStats(): WebhookPerformanceStats {
    return { ...this.performanceStats };
  }

  getProcessingMetrics(limit: number = 100): ProcessingMetrics[] {
    return this.processingMetrics.slice(-limit);
  }

  // === RETRY MECHANISMS ===

  async retryFailedWebhook(webhookId: string, maxRetries: number = 3): Promise<boolean> {
    // Implementation for webhook retry logic
    // This would be called by a background job processor
    console.log(`Retrying failed webhook ${webhookId}, max retries: ${maxRetries}`);
    return true; // Placeholder
  }
}

// === EXPORT SINGLETON ===

export const webhookProcessor = new TikTokWebhookProcessor(
  new EnhancedTikTokAPIClient({
    appKey: process.env.TIKTOK_SHOP_APP_KEY!,
    appSecret: process.env.TIKTOK_SHOP_APP_SECRET!,
    apiVersion: '202309',
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
  })
);