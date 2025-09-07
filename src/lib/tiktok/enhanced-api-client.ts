/**
 * Enhanced TikTok Shop API Client
 * Comprehensive client supporting viral content correlation, rate limiting, and performance optimization
 */

import crypto from 'crypto';

// === CORE INTERFACES ===

export interface TikTokShopConfig {
  appKey: string;
  appSecret: string;
  apiVersion: string;
  environment: 'sandbox' | 'production';
}

export interface TikTokShopResponse<T = any> {
  code: number;
  message: string;
  data: T;
  request_id: string;
}

export interface TikTokAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  shop_id: string;
  seller_id: string;
}

// === ENHANCED ORDER INTERFACES ===

export type TikTokOrderStatus = 
  | 'UNPAID' 
  | 'AWAITING_SHIPMENT' 
  | 'PARTIAL_SHIPPING' 
  | 'IN_TRANSIT' 
  | 'SHIPPED' 
  | 'DELIVERED' 
  | 'CANCELLED' 
  | 'COMPLETED';

export type TikTokPaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface TikTokOrderPriority {
  level: 'VIRAL' | 'HIGH' | 'MED' | 'AUTO';
  impact_score: number;
  viral_correlation: boolean;
  estimated_velocity: number; // orders per hour
  auto_reorder_threshold: number;
}

export interface CreatorFlowTikTokOrder {
  // TikTok Shop Fields
  order_id: string;
  tiktok_order_id: string;
  shop_id: string;
  order_status: TikTokOrderStatus;
  payment_status: TikTokPaymentStatus;
  
  // CreatorFlow Enhancement Fields
  priority: TikTokOrderPriority;
  viral_content_id?: string; // Link to TikTok video driving orders
  processing_queue: 'express' | 'standard' | 'bulk';
  sync_status: 'pending' | 'processing' | 'synced' | 'failed';
  
  // Performance Tracking
  received_at: string;
  processed_at?: string;
  sync_duration_ms?: number;
  
  // Basic order data
  total_amount: number;
  currency: string;
  shipping_info: TikTokShippingInfo;
  order_items: TikTokOrderItem[];
  
  // Relationships
  creator_id: string;
  creator?: any; // Profile type
}

export interface TikTokShippingInfo {
  recipient_name: string;
  phone: string;
  address: TikTokAddress;
}

export interface TikTokAddress {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface TikTokOrderItem {
  product_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  price: number;
}

// === VIRAL CONTENT INTERFACES ===

export interface ViralContentMonitor {
  content_id: string;
  video_url: string;
  performance_metrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    growth_rate: number; // views per hour
    engagement_score: number;
  };
  
  // Order Correlation
  linked_products: string[];
  order_correlation: {
    orders_generated: number;
    conversion_rate: number;
    peak_order_velocity: number; // orders per minute
    total_revenue: number;
  };
  
  // Inventory Impact
  inventory_alerts: {
    product_id: string;
    current_stock: number;
    projected_depletion: string; // ISO timestamp
    reorder_suggestion: number;
    confidence_score: number;
  }[];
}

export interface OrderCorrelationData {
  video_id: string;
  correlation_coefficient: number;
  orders_attributed: number;
  revenue_attributed: number;
  peak_conversion_period: {
    start: string;
    end: string;
    orders_per_minute: number;
  };
}

export interface ReorderSuggestion {
  product_id: string;
  suggested_quantity: number;
  confidence_score: number;
  urgency: 'immediate' | 'soon' | 'planned';
  reasoning: string;
}

export interface VelocityProjection {
  product_id: string;
  current_velocity: number;
  projected_velocity: number;
  stockout_prediction: string; // ISO timestamp
  viral_boost_factor: number;
}

// === RATE LIMITING INTERFACES ===

export interface RateLimitStatus {
  current_usage: number;
  limit_per_minute: number;
  reset_time: string;
  queue_length: number;
  estimated_wait_time: number;
}

export interface QueuedRequest {
  id: string;
  operation: () => Promise<any>;
  priority: 'high' | 'normal' | 'low';
  created_at: string;
  retry_count: number;
}

// === PRODUCT INTERFACES ===

export interface TikTokProduct {
  // TikTok Shop Fields
  product_id: string;
  tiktok_product_id: string;
  shop_id: string;
  title: string;
  sku: string;
  price: number;
  inventory_quantity: number;
  
  // CreatorFlow Enhancement Fields
  velocity_tracking: {
    current_velocity: number; // units per hour
    peak_velocity: number;
    average_velocity: number;
    velocity_trend: 'increasing' | 'decreasing' | 'stable';
    last_calculated: string;
  };
  
  stock_alerts: {
    level: 'critical' | 'low' | 'medium' | 'high';
    threshold_hours: number; // hours until stockout
    reorder_suggestion: number;
    auto_reorder_enabled: boolean;
    viral_boost_factor: number; // multiplier for viral content
  };
  
  // Visualization Data
  visual_metadata: {
    category_icon: string;
    stock_level_color: string;
    trend_indicator: 'up' | 'down' | 'stable';
    landscape_height: number; // for bar chart display
  };
}

// === WEBHOOK INTERFACES ===

export interface TikTokWebhookEvent {
  type: 'order_status_update' | 'inventory_update' | 'product_update';
  shop_id: string;
  timestamp: string;
  data: any;
}

export interface WebhookProcessingResult {
  success: boolean;
  processing_time_ms: number;
  event_type: string;
  error?: string;
  retry_count: number;
  next_retry_at?: string;
}

export interface WebhookPerformanceStats {
  average_processing_time: number; // 3.2s target from UI
  success_rate: number; // 98% target from UI
  total_events_processed: number;
  failed_events: number;
  retry_success_rate: number;
}

// === ENHANCED API CLIENT ===

export class EnhancedTikTokAPIClient {
  private config: TikTokShopConfig;
  private baseURL: string;
  private requestQueue: QueuedRequest[] = [];
  private rateLimitUsage: Map<string, { count: number; resetTime: number }> = new Map();
  private performanceMetrics: {
    responseTimeSum: number;
    requestCount: number;
    errorCount: number;
  } = { responseTimeSum: 0, requestCount: 0, errorCount: 0 };

  constructor(config: TikTokShopConfig) {
    this.config = config;
    this.baseURL = config.environment === 'production' 
      ? 'https://open-api.tiktokglobalshop.com'
      : 'https://open-api-sandbox.tiktokglobalshop.com';
  }

  // === AUTHENTICATION ===

  getAuthorizationURL(redirectUri: string, state?: string): string {
    const params = new URLSearchParams({
      app_key: this.config.appKey,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'user.info.basic,product.list,order.list,fulfillment.write',
      ...(state && { state })
    });

    return `${this.baseURL}/authorization/v${this.config.apiVersion}/authorize?${params}`;
  }

  async exchangeCodeForToken(code: string, redirectUri: string): Promise<TikTokAuthTokens> {
    const response = await this.makeRequest<TikTokAuthTokens>('/authorization/v202309/token/get', {
      method: 'POST',
      body: {
        app_key: this.config.appKey,
        app_secret: this.config.appSecret,
        auth_code: code,
        grant_type: 'authorization_code'
      }
    });

    return response.data;
  }

  async refreshTokens(refreshToken: string): Promise<TikTokAuthTokens> {
    const response = await this.makeRequest<TikTokAuthTokens>('/authorization/v202309/token/refresh', {
      method: 'POST',
      body: {
        app_key: this.config.appKey,
        app_secret: this.config.appSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }
    });

    return response.data;
  }

  // === RATE LIMITING MANAGEMENT ===

  getRateLimitStatus(): RateLimitStatus {
    const currentMinute = Math.floor(Date.now() / 60000);
    const usage = this.rateLimitUsage.get(currentMinute.toString()) || { count: 0, resetTime: currentMinute + 1 };
    
    return {
      current_usage: usage.count,
      limit_per_minute: 1000, // TikTok Shop API limit
      reset_time: new Date(usage.resetTime * 60000).toISOString(),
      queue_length: this.requestQueue.length,
      estimated_wait_time: this.calculateEstimatedWaitTime()
    };
  }

  canMakeRequest(requestType: string = 'standard'): boolean {
    const currentMinute = Math.floor(Date.now() / 60000);
    const usage = this.rateLimitUsage.get(currentMinute.toString()) || { count: 0, resetTime: currentMinute + 1 };
    
    // Reserve 100 requests for high-priority viral content requests
    const effectiveLimit = requestType === 'viral' ? 1000 : 900;
    return usage.count < effectiveLimit;
  }

  async queueRequest<T>(operation: () => Promise<T>, priority: 'high' | 'normal' | 'low' = 'normal'): Promise<T> {
    if (this.canMakeRequest(priority === 'high' ? 'viral' : 'standard')) {
      return this.executeRequest(operation);
    }

    return new Promise((resolve, reject) => {
      const queuedRequest: QueuedRequest = {
        id: crypto.randomUUID(),
        operation: async () => {
          try {
            const result = await this.executeRequest(operation);
            resolve(result);
            return result;
          } catch (error) {
            reject(error);
            throw error;
          }
        },
        priority,
        created_at: new Date().toISOString(),
        retry_count: 0
      };

      this.requestQueue.push(queuedRequest);
      this.sortRequestQueue();
    });
  }

  private sortRequestQueue(): void {
    const priorityOrder = { high: 3, normal: 2, low: 1 };
    this.requestQueue.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  }

  private calculateEstimatedWaitTime(): number {
    if (this.requestQueue.length === 0) return 0;
    
    const rateLimitStatus = this.getRateLimitStatus();
    const remainingCapacity = rateLimitStatus.limit_per_minute - rateLimitStatus.current_usage;
    
    if (remainingCapacity <= 0) {
      return 60000; // Wait for next minute
    }
    
    const queuePosition = this.requestQueue.length;
    return Math.max(0, (queuePosition - remainingCapacity) * 60); // seconds
  }

  private async executeRequest<T>(operation: () => Promise<T>): Promise<T> {
    const startTime = Date.now();
    
    try {
      this.updateRateLimitUsage();
      const result = await operation();
      
      // Track performance
      const responseTime = Date.now() - startTime;
      this.performanceMetrics.responseTimeSum += responseTime;
      this.performanceMetrics.requestCount++;
      
      return result;
    } catch (error) {
      this.performanceMetrics.errorCount++;
      throw error;
    }
  }

  private updateRateLimitUsage(): void {
    const currentMinute = Math.floor(Date.now() / 60000);
    const key = currentMinute.toString();
    const current = this.rateLimitUsage.get(key) || { count: 0, resetTime: currentMinute + 1 };
    
    this.rateLimitUsage.set(key, {
      count: current.count + 1,
      resetTime: current.resetTime
    });

    // Clean up old entries
    for (const [minute] of this.rateLimitUsage.entries()) {
      if (parseInt(minute) < currentMinute - 2) {
        this.rateLimitUsage.delete(minute);
      }
    }
  }

  // === ENHANCED API REQUESTS ===

  private async makeRequest<T>(
    endpoint: string, 
    options: {
      method: 'GET' | 'POST';
      body?: any;
      accessToken?: string;
      shopId?: string;
    }
  ): Promise<TikTokShopResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const timestamp = Math.floor(Date.now() / 1000);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-tts-access-token': options.accessToken || '',
      'x-tts-shop-id': options.shopId || ''
    };

    const response = await fetch(url, {
      method: options.method,
      headers,
      ...(options.body && { body: JSON.stringify(options.body) })
    });

    if (!response.ok) {
      throw new Error(`TikTok Shop API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<TikTokShopResponse<T>>;
  }

  // === ORDER OPERATIONS ===

  async getOrders(
    accessToken: string, 
    shopId: string,
    params: {
      page_size?: number;
      page_token?: string;
      order_status?: string;
      create_time_from?: number;
      create_time_to?: number;
    } = {}
  ): Promise<TikTokShopResponse<any>> {
    return this.queueRequest(() => {
      const queryParams = new URLSearchParams({
        page_size: (params.page_size || 50).toString(),
        ...(params.page_token && { page_token: params.page_token }),
        ...(params.order_status && { order_status: params.order_status }),
        ...(params.create_time_from && { create_time_from: params.create_time_from.toString() }),
        ...(params.create_time_to && { create_time_to: params.create_time_to.toString() })
      });

      return this.makeRequest(`/order/v202309/orders?${queryParams}`, {
        method: 'GET',
        accessToken,
        shopId
      });
    });
  }

  async getOrderDetails(accessToken: string, shopId: string, orderId: string): Promise<TikTokShopResponse<any>> {
    return this.queueRequest(() => {
      return this.makeRequest(`/order/v202309/orders/${orderId}`, {
        method: 'GET',
        accessToken,
        shopId
      });
    });
  }

  async updateOrderStatus(accessToken: string, shopId: string, orderId: string, status: TikTokOrderStatus): Promise<TikTokShopResponse<any>> {
    return this.queueRequest(() => {
      return this.makeRequest(`/order/v202309/orders/${orderId}/status`, {
        method: 'POST',
        accessToken,
        shopId,
        body: { order_status: status }
      });
    }, 'high'); // High priority for status updates
  }

  // === PRODUCT OPERATIONS ===

  async getProducts(
    accessToken: string,
    shopId: string,
    params: {
      page_size?: number;
      page_token?: string;
      search_status?: string;
    } = {}
  ): Promise<TikTokShopResponse<any>> {
    return this.queueRequest(() => {
      const queryParams = new URLSearchParams({
        page_size: (params.page_size || 50).toString(),
        ...(params.page_token && { page_token: params.page_token }),
        ...(params.search_status && { search_status: params.search_status })
      });

      return this.makeRequest(`/product/v202309/products?${queryParams}`, {
        method: 'GET',
        accessToken,
        shopId
      });
    });
  }

  async updateProductInventory(accessToken: string, shopId: string, productId: string, quantity: number): Promise<TikTokShopResponse<any>> {
    return this.queueRequest(() => {
      return this.makeRequest(`/product/v202309/products/${productId}/inventory`, {
        method: 'POST',
        accessToken,
        shopId,
        body: { inventory_quantity: quantity }
      });
    }, 'high'); // High priority for inventory updates
  }

  // === FULFILLMENT OPERATIONS ===

  async createShippingLabel(accessToken: string, shopId: string, fulfillmentRequest: any): Promise<TikTokShopResponse<any>> {
    return this.queueRequest(() => {
      return this.makeRequest('/fulfillment/v202309/shipping_labels', {
        method: 'POST',
        accessToken,
        shopId,
        body: fulfillmentRequest
      });
    }, 'high'); // High priority for fulfillment
  }

  async updateTrackingInfo(accessToken: string, shopId: string, orderId: string, trackingInfo: any): Promise<TikTokShopResponse<any>> {
    return this.queueRequest(() => {
      return this.makeRequest(`/fulfillment/v202309/orders/${orderId}/tracking`, {
        method: 'POST',
        accessToken,
        shopId,
        body: trackingInfo
      });
    }, 'high'); // High priority for tracking updates
  }

  // === PERFORMANCE MONITORING ===

  getPerformanceStats(): {
    averageResponseTime: number;
    errorRate: number;
    totalRequests: number;
    rateLimitUtilization: number;
  } {
    const averageResponseTime = this.performanceMetrics.requestCount > 0 
      ? this.performanceMetrics.responseTimeSum / this.performanceMetrics.requestCount 
      : 0;
    
    const errorRate = this.performanceMetrics.requestCount > 0 
      ? (this.performanceMetrics.errorCount / this.performanceMetrics.requestCount) * 100 
      : 0;

    const rateLimitStatus = this.getRateLimitStatus();
    const rateLimitUtilization = (rateLimitStatus.current_usage / rateLimitStatus.limit_per_minute) * 100;

    return {
      averageResponseTime,
      errorRate,
      totalRequests: this.performanceMetrics.requestCount,
      rateLimitUtilization
    };
  }

  // === WEBHOOK SIGNATURE VERIFICATION ===

  static verifyWebhookSignature(payload: string, signature: string, timestamp: string, appSecret: string): boolean {
    const message = timestamp + payload;
    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(message)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
}

// === VIRAL CONTENT SERVICE ===

export class TikTokContentService {
  private apiClient: EnhancedTikTokAPIClient;

  constructor(apiClient: EnhancedTikTokAPIClient) {
    this.apiClient = apiClient;
  }

  async trackVideoPerformance(videoUrl: string): Promise<ViralContentMonitor> {
    // Implementation would integrate with TikTok Content API or third-party analytics
    // This is a placeholder for the interface
    throw new Error('Method not implemented - requires TikTok Content API integration');
  }

  async correlateOrderSpikes(contentId: string): Promise<OrderCorrelationData> {
    // Implementation would analyze order patterns against content performance
    throw new Error('Method not implemented - requires analytics data correlation');
  }

  async generateReorderSuggestions(viralData: ViralContentMonitor): Promise<ReorderSuggestion[]> {
    // Implementation would use ML models to predict reorder needs
    throw new Error('Method not implemented - requires predictive analytics');
  }

  async calculateInventoryVelocity(productId: string, contentPerformance: ViralContentMonitor): Promise<VelocityProjection> {
    // Implementation would calculate velocity based on content performance
    throw new Error('Method not implemented - requires velocity calculation engine');
  }
}

// === SINGLETON INSTANCES ===

export const enhancedTikTokClient = new EnhancedTikTokAPIClient({
  appKey: process.env.TIKTOK_SHOP_APP_KEY!,
  appSecret: process.env.TIKTOK_SHOP_APP_SECRET!,
  apiVersion: '202309',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
});

export const tiktokContentService = new TikTokContentService(enhancedTikTokClient);