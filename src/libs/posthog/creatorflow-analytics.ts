/**
 * CreatorFlow Analytics Tracking
 * TikTok creator-specific event tracking with PostHog
 */

import posthog from 'posthog-js';

// Creator Events
export const trackCreatorSignup = (creatorData: {
  tiktokHandle: string;
  followersCount: number;
  tier: string;
}) => {
  posthog.capture('creator_signup', {
    tiktok_handle: creatorData.tiktokHandle,
    followers_count: creatorData.followersCount,
    creator_tier: creatorData.tier,
    platform: 'tiktok'
  });
};

export const trackContentPerformance = (contentData: {
  contentId: string;
  views: number;
  likes: number;
  shares: number;
  conversionRate: number;
  revenue: number;
}) => {
  posthog.capture('content_performance', {
    content_id: contentData.contentId,
    views: contentData.views,
    likes: contentData.likes,
    shares: contentData.shares,
    conversion_rate: contentData.conversionRate,
    revenue_generated: contentData.revenue
  });
};

// Order Events
export const trackOrderGenerated = (orderData: {
  orderId: string;
  creatorId: string;
  orderValue: number;
  productType: string;
  trafficSource: string;
}) => {
  posthog.capture('order_generated', {
    order_id: orderData.orderId,
    creator_id: orderData.creatorId,
    order_value: orderData.orderValue,
    product_type: orderData.productType,
    traffic_source: orderData.trafficSource
  });
};

export const trackOrderShipped = (shipmentData: {
  orderId: string;
  creatorId: string;
  carrier: string;
  trackingNumber: string;
  commission: number;
}) => {
  posthog.capture('order_shipped', {
    order_id: shipmentData.orderId,
    creator_id: shipmentData.creatorId,
    shipping_carrier: shipmentData.carrier,
    tracking_number: shipmentData.trackingNumber,
    creator_commission: shipmentData.commission
  });
};

// Payout Events
export const trackPayoutProcessed = (payoutData: {
  creatorId: string;
  payoutAmount: number;
  ordersCount: number;
  payoutPeriod: string;
}) => {
  posthog.capture('payout_processed', {
    creator_id: payoutData.creatorId,
    payout_amount: payoutData.payoutAmount,
    orders_count: payoutData.ordersCount,
    payout_period: payoutData.payoutPeriod
  });
};

// Dashboard Events
export const trackDashboardView = (viewData: {
  creatorId: string;
  section: string;
  timeSpent?: number;
}) => {
  posthog.capture('dashboard_view', {
    creator_id: viewData.creatorId,
    dashboard_section: viewData.section,
    time_spent: viewData.timeSpent
  });
};

export const trackAnalyticsExport = (exportData: {
  creatorId: string;
  exportType: string;
  dateRange: string;
}) => {
  posthog.capture('analytics_export', {
    creator_id: exportData.creatorId,
    export_type: exportData.exportType,
    date_range: exportData.dateRange
  });
};

// TikTok Integration Events
export const trackTikTokSync = (syncData: {
  creatorId: string;
  syncType: 'manual' | 'automatic';
  videosProcessed: number;
  success: boolean;
}) => {
  posthog.capture('tiktok_sync', {
    creator_id: syncData.creatorId,
    sync_type: syncData.syncType,
    videos_processed: syncData.videosProcessed,
    sync_success: syncData.success
  });
};

// Shipping Events
export const trackShippingCalculation = (calculationData: {
  creatorId: string;
  weight: number;
  zone: string;
  selectedCarrier: string;
  estimatedCost: number;
}) => {
  posthog.capture('shipping_calculation', {
    creator_id: calculationData.creatorId,
    package_weight: calculationData.weight,
    shipping_zone: calculationData.zone,
    selected_carrier: calculationData.selectedCarrier,
    estimated_cost: calculationData.estimatedCost
  });
};

// Feature Usage
export const trackFeatureUsage = (featureData: {
  creatorId: string;
  feature: string;
  action: string;
  metadata?: Record<string, any>;
}) => {
  posthog.capture('feature_usage', {
    creator_id: featureData.creatorId,
    feature_name: featureData.feature,
    action_type: featureData.action,
    ...featureData.metadata
  });
};
