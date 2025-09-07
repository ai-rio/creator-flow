/**
 * TikTok Shop Webhook API Route
 * Handles real-time webhook events from TikTok Shop API
 */

import { NextRequest, NextResponse } from 'next/server';

import { webhookProcessor } from '@/lib/tiktok/webhook-processor';
import { TikTokInventoryEvent, TikTokOrderEvent, TikTokProductEvent } from '@/lib/tiktok/webhook-processor';

// === WEBHOOK HANDLER ===

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 1. Extract webhook headers
    const signature = request.headers.get('x-tts-signature');
    const timestamp = request.headers.get('x-tts-timestamp');
    
    if (!signature || !timestamp) {
      console.error('Missing required webhook headers');
      return NextResponse.json(
        { error: 'Missing required headers' },
        { status: 400 }
      );
    }

    // 2. Get request body
    const body = await request.text();
    
    if (!body) {
      console.error('Empty webhook body');
      return NextResponse.json(
        { error: 'Empty request body' },
        { status: 400 }
      );
    }

    // 3. Verify webhook signature
    const isValidSignature = webhookProcessor.verifyWebhookSignature(body, signature, timestamp);
    
    if (!isValidSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // 4. Parse webhook event
    let webhookEvent;
    try {
      webhookEvent = JSON.parse(body);
    } catch (parseError) {
      console.error('Invalid JSON in webhook body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // 5. Log webhook received
    console.log(`TikTok webhook received: ${webhookEvent.type} for shop ${webhookEvent.shop_id}`);

    // 6. Process webhook based on event type
    let processingResult;
    
    switch (webhookEvent.type) {
      case 'order_status_update':
        processingResult = await webhookProcessor.processOrderStatusUpdate(webhookEvent as TikTokOrderEvent);
        break;
        
      case 'inventory_update':
        processingResult = await webhookProcessor.processInventoryUpdate(webhookEvent as TikTokInventoryEvent);
        break;
        
      case 'product_update':
        processingResult = await webhookProcessor.processProductUpdate(webhookEvent as TikTokProductEvent);
        break;
        
      default:
        console.warn(`Unknown webhook event type: ${webhookEvent.type}`);
        return NextResponse.json(
          { 
            success: true, 
            message: `Event type ${webhookEvent.type} not handled` 
          },
          { status: 200 }
        );
    }

    // 7. Handle processing result
    if (processingResult.success) {
      const totalTime = Date.now() - startTime;
      
      console.log(`Webhook processed successfully in ${totalTime}ms`);
      
      return NextResponse.json({
        success: true,
        processing_time_ms: processingResult.processing_time_ms,
        event_type: processingResult.event_type,
        total_time_ms: totalTime
      });
    } else {
      console.error(`Webhook processing failed:`, processingResult.error);
      
      // For failed webhooks, we still return 200 to prevent TikTok from retrying
      // The retry logic is handled internally by our webhook processor
      return NextResponse.json({
        success: false,
        error: processingResult.error,
        retry_count: processingResult.retry_count,
        next_retry_at: processingResult.next_retry_at,
        processing_time_ms: processingResult.processing_time_ms
      });
    }

  } catch (error) {
    const totalTime = Date.now() - startTime;
    
    console.error('Webhook processing error:', error);
    
    // Log to webhook processing log for debugging
    await logWebhookError(error, totalTime);
    
    // Return 500 to trigger TikTok's retry mechanism
    return NextResponse.json(
      { 
        error: 'Internal server error',
        processing_time_ms: totalTime
      },
      { status: 500 }
    );
  }
}

// === GET HANDLER FOR WEBHOOK VERIFICATION ===

export async function GET(request: NextRequest) {
  // TikTok Shop webhook verification endpoint
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get('challenge');
  
  if (challenge) {
    // Return the challenge for webhook URL verification
    return new Response(challenge, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
  
  // Return webhook status information
  const stats = webhookProcessor.getPerformanceStats();
  
  return NextResponse.json({
    status: 'active',
    performance_stats: stats,
    webhook_url: `${request.nextUrl.origin}/api/webhooks/tiktok`,
    supported_events: [
      'order_status_update',
      'inventory_update', 
      'product_update'
    ]
  });
}

// === ERROR LOGGING HELPER ===

async function logWebhookError(error: any, processingTime: number) {
  try {
    // This would log to your monitoring system or database
    console.error('Webhook Error Details:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      processing_time_ms: processingTime,
      timestamp: new Date().toISOString()
    });
    
    // Future: Could also send to external monitoring service like Sentry
    // or log to database for analysis
    
  } catch (logError) {
    console.error('Failed to log webhook error:', logError);
  }
}