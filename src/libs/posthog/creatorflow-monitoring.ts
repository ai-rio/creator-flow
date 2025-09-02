/**
 * CreatorFlow Monitoring & Error Tracking
 * Performance monitoring and error tracking for TikTok creator features
 */

import posthog from 'posthog-js';

// Performance Monitoring
export const trackAPIPerformance = (performanceData: {
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  creatorId?: string;
}) => {
  posthog.capture('api_performance', {
    api_endpoint: performanceData.endpoint,
    http_method: performanceData.method,
    response_time_ms: performanceData.responseTime,
    status_code: performanceData.statusCode,
    creator_id: performanceData.creatorId
  });
};

export const trackTikTokAPIPerformance = (apiData: {
  endpoint: string;
  responseTime: number;
  success: boolean;
  errorCode?: string;
  rateLimited?: boolean;
}) => {
  posthog.capture('tiktok_api_performance', {
    tiktok_endpoint: apiData.endpoint,
    response_time_ms: apiData.responseTime,
    api_success: apiData.success,
    error_code: apiData.errorCode,
    rate_limited: apiData.rateLimited
  });
};

// Error Tracking
export const trackCreatorFlowError = (errorData: {
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  creatorId?: string;
  context?: Record<string, any>;
}) => {
  posthog.capture('creatorflow_error', {
    error_type: errorData.errorType,
    error_message: errorData.errorMessage,
    stack_trace: errorData.stackTrace,
    creator_id: errorData.creatorId,
    error_context: errorData.context
  });
};

export const trackShippingError = (shippingError: {
  carrier: string;
  errorType: string;
  orderId: string;
  creatorId: string;
  errorDetails: string;
}) => {
  posthog.capture('shipping_error', {
    shipping_carrier: shippingError.carrier,
    error_type: shippingError.errorType,
    order_id: shippingError.orderId,
    creator_id: shippingError.creatorId,
    error_details: shippingError.errorDetails
  });
};

export const trackPayoutError = (payoutError: {
  creatorId: string;
  errorType: string;
  payoutAmount: number;
  errorMessage: string;
}) => {
  posthog.capture('payout_error', {
    creator_id: payoutError.creatorId,
    error_type: payoutError.errorType,
    payout_amount: payoutError.payoutAmount,
    error_message: payoutError.errorMessage
  });
};

// Business Metrics
export const trackBusinessMetrics = (metricsData: {
  totalCreators: number;
  activeCreators: number;
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topPerformingTier: string;
}) => {
  posthog.capture('business_metrics', {
    total_creators: metricsData.totalCreators,
    active_creators: metricsData.activeCreators,
    total_revenue: metricsData.totalRevenue,
    total_orders: metricsData.totalOrders,
    avg_order_value: metricsData.avgOrderValue,
    top_performing_tier: metricsData.topPerformingTier
  });
};

// User Experience Tracking
export const trackUserExperience = (uxData: {
  creatorId: string;
  action: string;
  timeToComplete: number;
  success: boolean;
  frustrationLevel?: 'low' | 'medium' | 'high';
}) => {
  posthog.capture('user_experience', {
    creator_id: uxData.creatorId,
    user_action: uxData.action,
    time_to_complete_ms: uxData.timeToComplete,
    action_success: uxData.success,
    frustration_level: uxData.frustrationLevel
  });
};

// Health Check Monitoring
export const trackHealthCheck = (healthData: {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  details?: Record<string, any>;
}) => {
  posthog.capture('health_check', {
    service_name: healthData.service,
    service_status: healthData.status,
    response_time_ms: healthData.responseTime,
    health_details: healthData.details
  });
};
