/**
 * TikTok Webhook Processor - Supabase Edge Function
 * High-performance webhook processing with real-time updates
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { corsHeaders } from '../_shared/cors.ts';

// === TYPES ===

interface TikTokWebhookEvent {
  type: string;
  shop_id: string;
  timestamp: string;
  data: any;
}

interface WebhookProcessingResult {
  success: boolean;
  processing_time_ms: number;
  event_type: string;
  error?: string;
  actions_performed: string[];
}

// === WEBHOOK SIGNATURE VERIFICATION ===

async function verifyWebhookSignature(
  payload: string,
  signature: string,
  timestamp: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const message = timestamp + payload;
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const expectedSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  const expectedHex = Array.from(new Uint8Array(expectedSignature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return expectedHex === signature;
}

// === MAIN HANDLER ===

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extract headers
    const signature = req.headers.get('x-tts-signature');
    const timestamp = req.headers.get('x-tts-timestamp');
    
    if (!signature || !timestamp) {
      return new Response(
        JSON.stringify({ error: 'Missing required headers' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get request body
    const body = await req.text();
    
    // Verify signature
    const appSecret = Deno.env.get('TIKTOK_SHOP_APP_SECRET')!;
    const isValid = await verifyWebhookSignature(body, signature, timestamp, appSecret);
    
    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse webhook event
    const webhookEvent: TikTokWebhookEvent = JSON.parse(body);
    
    // Process based on event type
    let result: WebhookProcessingResult;
    
    switch (webhookEvent.type) {
      case 'order_status_update':
        result = await processOrderStatusUpdate(webhookEvent, supabase);
        break;
        
      case 'inventory_update':
        result = await processInventoryUpdate(webhookEvent, supabase);
        break;
        
      case 'product_update':
        result = await processProductUpdate(webhookEvent, supabase);
        break;
        
      default:
        console.warn(`Unhandled event type: ${webhookEvent.type}`);
        result = {
          success: true,
          processing_time_ms: Date.now() - startTime,
          event_type: webhookEvent.type,
          actions_performed: ['event_acknowledged']
        };
    }

    // Log processing result
    await logWebhookProcessing(webhookEvent, result, supabase);

    return new Response(
      JSON.stringify(result),
      { 
        status: result.success ? 200 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    const errorResult: WebhookProcessingResult = {
      success: false,
      processing_time_ms: Date.now() - startTime,
      event_type: 'unknown',
      error: error.message || 'Unknown error',
      actions_performed: ['error_handling']
    };

    return new Response(
      JSON.stringify(errorResult),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// === ORDER STATUS UPDATE PROCESSOR ===

async function processOrderStatusUpdate(
  event: TikTokWebhookEvent,
  supabase: any
): Promise<WebhookProcessingResult> {
  const startTime = Date.now();
  const actions: string[] = [];

  try {
    // 1. Update TikTok order in database
    const { error: updateError } = await supabase
      .from('tiktok_orders')
      .upsert({
        tiktok_order_id: event.data.order_id,
        shop_id: event.shop_id,
        order_data: event.data,
        order_status: event.data.new_status,
        sync_status: 'synced',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'tiktok_order_id,shop_id'
      });

    if (updateError) throw updateError;
    actions.push('database_order_update');

    // 2. Sync to CreatorFlow orders table
    const creatorFlowStatus = mapTikTokStatusToCreatorFlow(event.data.new_status);
    
    const { error: syncError } = await supabase
      .from('orders')
      .update({
        status: creatorFlowStatus,
        tiktok_sync_status: 'synced',
        updated_at: new Date().toISOString()
      })
      .eq('external_order_id', event.data.order_id)
      .eq('platform', 'tiktok_shop');

    if (!syncError) {
      actions.push('creatorflow_sync');
    }

    // 3. Real-time notification
    const channel = supabase.channel('order-updates');
    await channel.send({
      type: 'broadcast',
      event: 'order_status_changed',
      payload: {
        shop_id: event.shop_id,
        order_id: event.data.order_id,
        old_status: event.data.old_status,
        new_status: event.data.new_status,
        timestamp: event.timestamp
      }
    });
    actions.push('realtime_broadcast');

    // 4. Check for viral content correlation
    if (event.data.new_status === 'PAID' || event.data.new_status === 'AWAITING_SHIPMENT') {
      await checkViralContentCorrelation(event, supabase);
      actions.push('viral_content_check');
    }

    return {
      success: true,
      processing_time_ms: Date.now() - startTime,
      event_type: 'order_status_update',
      actions_performed: actions
    };

  } catch (error) {
    console.error('Order status update failed:', error);
    
    return {
      success: false,
      processing_time_ms: Date.now() - startTime,
      event_type: 'order_status_update',
      error: error.message,
      actions_performed: actions
    };
  }
}

// === INVENTORY UPDATE PROCESSOR ===

async function processInventoryUpdate(
  event: TikTokWebhookEvent,
  supabase: any
): Promise<WebhookProcessingResult> {
  const startTime = Date.now();
  const actions: string[] = [];

  try {
    // 1. Update product inventory
    const { error: updateError } = await supabase
      .from('tiktok_products')
      .upsert({
        tiktok_product_id: event.data.product_id,
        shop_id: event.shop_id,
        inventory_quantity: event.data.new_quantity,
        product_data: event.data.product,
        last_synced_at: new Date().toISOString()
      }, {
        onConflict: 'tiktok_product_id,shop_id'
      });

    if (updateError) throw updateError;
    actions.push('database_inventory_update');

    // 2. Calculate velocity and generate alerts
    const velocity = await calculateProductVelocity(event.data.product_id, event.shop_id, supabase);
    if (velocity) {
      actions.push('velocity_calculation');
    }

    // 3. Check for critical stock alerts
    const stockAlert = generateStockAlert(event.data, velocity);
    if (stockAlert && stockAlert.level === 'critical') {
      // Broadcast critical alert
      const channel = supabase.channel('critical-alerts');
      await channel.send({
        type: 'broadcast',
        event: 'critical_stock_alert',
        payload: stockAlert
      });
      actions.push('critical_alert_broadcast');
    }

    // 4. Update inventory visualization data
    await updateInventoryVisualization(event.shop_id, supabase);
    actions.push('visualization_update');

    // 5. Check auto-reorder triggers
    if (stockAlert && stockAlert.level === 'critical' && stockAlert.auto_reorder_enabled) {
      await triggerAutoReorder(event.data.product_id, event.shop_id, supabase);
      actions.push('auto_reorder_triggered');
    }

    return {
      success: true,
      processing_time_ms: Date.now() - startTime,
      event_type: 'inventory_update',
      actions_performed: actions
    };

  } catch (error) {
    console.error('Inventory update failed:', error);
    
    return {
      success: false,
      processing_time_ms: Date.now() - startTime,
      event_type: 'inventory_update',
      error: error.message,
      actions_performed: actions
    };
  }
}

// === PRODUCT UPDATE PROCESSOR ===

async function processProductUpdate(
  event: TikTokWebhookEvent,
  supabase: any
): Promise<WebhookProcessingResult> {
  const startTime = Date.now();
  const actions: string[] = [];

  try {
    // Update product data
    const { error } = await supabase
      .from('tiktok_products')
      .upsert({
        tiktok_product_id: event.data.product_id,
        shop_id: event.shop_id,
        product_data: event.data.product,
        last_synced_at: new Date().toISOString()
      }, {
        onConflict: 'tiktok_product_id,shop_id'
      });

    if (error) throw error;
    actions.push('database_product_update');

    // Real-time product update notification
    const channel = supabase.channel('product-updates');
    await channel.send({
      type: 'broadcast',
      event: 'product_changed',
      payload: {
        shop_id: event.shop_id,
        product_id: event.data.product_id,
        change_type: event.data.change_type,
        timestamp: event.timestamp
      }
    });
    actions.push('realtime_broadcast');

    return {
      success: true,
      processing_time_ms: Date.now() - startTime,
      event_type: 'product_update',
      actions_performed: actions
    };

  } catch (error) {
    console.error('Product update failed:', error);
    
    return {
      success: false,
      processing_time_ms: Date.now() - startTime,
      event_type: 'product_update',
      error: error.message,
      actions_performed: actions
    };
  }
}

// === HELPER FUNCTIONS ===

function mapTikTokStatusToCreatorFlow(tiktokStatus: string): string {
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

async function calculateProductVelocity(productId: string, shopId: string, supabase: any) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  
  const { data: orders } = await supabase
    .from('tiktok_orders')
    .select('order_data')
    .eq('shop_id', shopId)
    .gte('created_at', twentyFourHoursAgo);

  if (!orders) return null;

  let totalUnits = 0;
  for (const order of orders) {
    const items = order.order_data?.items || [];
    for (const item of items) {
      if (item.product_id === productId) {
        totalUnits += item.quantity || 0;
      }
    }
  }

  return {
    current_velocity: totalUnits / 24, // units per hour
    last_calculated: new Date().toISOString()
  };
}

function generateStockAlert(inventoryData: any, velocity: any) {
  if (!velocity || velocity.current_velocity === 0) return null;

  const hoursUntilStockout = inventoryData.new_quantity / velocity.current_velocity;
  
  let level: 'critical' | 'low' | 'medium' = 'medium';
  if (hoursUntilStockout <= 6) level = 'critical';
  else if (hoursUntilStockout <= 24) level = 'low';

  if (level === 'medium') return null;

  return {
    product_id: inventoryData.product_id,
    product_name: inventoryData.product?.name || 'Unknown Product',
    current_stock: inventoryData.new_quantity,
    level,
    context: `Velocity-based alert`,
    velocity: `${Math.round(velocity.current_velocity)}/hour`,
    hours_remaining: Math.round(hoursUntilStockout),
    auto_reorder_enabled: false // Would be configurable
  };
}

async function updateInventoryVisualization(shopId: string, supabase: any) {
  const { data: products } = await supabase
    .from('tiktok_products')
    .select('tiktok_product_id, product_data, inventory_quantity')
    .eq('shop_id', shopId);

  if (!products) return;

  const landscapeData = products.map((product: any) => ({
    name: product.product_data?.name?.substring(0, 10) || 'Product',
    level: product.inventory_quantity > 100 ? 'High' : 
           product.inventory_quantity > 50 ? 'Med' : 'Low',
    height: Math.min(20, Math.max(6, Math.floor(product.inventory_quantity / 10)))
  }));

  // Broadcast visualization update
  const channel = supabase.channel('inventory-visualization');
  await channel.send({
    type: 'broadcast',
    event: 'visualization_updated',
    payload: {
      shop_id: shopId,
      landscape_data: landscapeData,
      updated_at: new Date().toISOString()
    }
  });
}

async function triggerAutoReorder(productId: string, shopId: string, supabase: any) {
  // Log auto-reorder trigger
  console.log(`Auto-reorder triggered for product ${productId} in shop ${shopId}`);
  
  // Future: Implement actual reorder logic
  // This would integrate with inventory management system
}

async function checkViralContentCorrelation(event: TikTokWebhookEvent, supabase: any) {
  // Future: Check for viral content correlation
  // This would integrate with TikTok Content API or analytics
  console.log(`Checking viral content correlation for order ${event.data.order_id}`);
}

async function logWebhookProcessing(
  event: TikTokWebhookEvent,
  result: WebhookProcessingResult,
  supabase: any
) {
  try {
    await supabase
      .from('webhook_processing_log')
      .insert({
        webhook_type: event.type,
        shop_id: event.shop_id,
        payload: event,
        processing_time_ms: result.processing_time_ms,
        success: result.success,
        error_message: result.error,
        actions_performed: result.actions_performed,
        processed_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Failed to log webhook processing:', error);
  }
}