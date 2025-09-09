-- TikTok Shop Integration Database Schema
-- Comprehensive schema supporting viral content correlation, performance tracking, and real-time synchronization

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- === SHOP CONNECTION MANAGEMENT ===

CREATE TABLE IF NOT EXISTS tiktok_shop_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    shop_id TEXT NOT NULL,
    shop_name TEXT,
    access_token_encrypted TEXT NOT NULL,
    refresh_token_encrypted TEXT NOT NULL,
    token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    connection_status TEXT NOT NULL DEFAULT 'connected' CHECK (connection_status IN ('connected', 'disconnected', 'error', 'syncing')),
    last_sync_at TIMESTAMP WITH TIME ZONE,
    
    -- Performance tracking
    performance_metrics JSONB DEFAULT '{
        "sync_success_rate": 0,
        "average_response_time": 0,
        "total_requests": 0,
        "failed_requests": 0,
        "last_performance_check": null
    }'::jsonb,
    
    -- Configuration
    webhook_endpoints JSONB DEFAULT '[]'::jsonb,
    sync_settings JSONB DEFAULT '{
        "auto_order_import": true,
        "auto_inventory_sync": true,
        "auto_status_updates": true,
        "viral_content_tracking": true
    }'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(creator_id, shop_id)
);

-- === TIKTOK ORDERS ===

CREATE TABLE IF NOT EXISTS tiktok_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    shop_id TEXT NOT NULL,
    tiktok_order_id TEXT NOT NULL,
    
    -- Order status and priority
    order_status TEXT NOT NULL CHECK (order_status IN ('UNPAID', 'AWAITING_SHIPMENT', 'PARTIAL_SHIPPING', 'IN_TRANSIT', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'COMPLETED')),
    payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    
    -- CreatorFlow enhancements
    priority_level TEXT DEFAULT 'AUTO' CHECK (priority_level IN ('VIRAL', 'HIGH', 'MED', 'AUTO')),
    impact_score INTEGER DEFAULT 0,
    viral_correlation BOOLEAN DEFAULT FALSE,
    estimated_velocity DECIMAL(10,2) DEFAULT 0, -- orders per hour
    
    -- Processing tracking
    processing_queue TEXT DEFAULT 'standard' CHECK (processing_queue IN ('express', 'standard', 'bulk')),
    sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'processing', 'synced', 'failed')),
    viral_content_id TEXT, -- Link to viral content
    
    -- Performance metrics
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    sync_duration_ms INTEGER,
    
    -- Order data
    order_data JSONB NOT NULL, -- Full TikTok order JSON
    total_amount DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(creator_id, tiktok_order_id, shop_id)
);

-- === TIKTOK PRODUCTS ===

CREATE TABLE IF NOT EXISTS tiktok_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    shop_id TEXT NOT NULL,
    tiktok_product_id TEXT NOT NULL,
    
    -- Basic product info
    title TEXT NOT NULL,
    sku TEXT,
    price DECIMAL(10,2),
    inventory_quantity INTEGER DEFAULT 0,
    
    -- Velocity tracking
    velocity_tracking JSONB DEFAULT '{
        "current_velocity": 0,
        "peak_velocity": 0,
        "average_velocity": 0,
        "velocity_trend": "stable",
        "last_calculated": null
    }'::jsonb,
    
    -- Stock alerts configuration
    stock_alerts JSONB DEFAULT '{
        "level": "medium",
        "threshold_hours": 24,
        "reorder_suggestion": 0,
        "auto_reorder_enabled": false,
        "viral_boost_factor": 1.0
    }'::jsonb,
    
    -- Visualization data for UI components
    visual_metadata JSONB DEFAULT '{
        "category_icon": "📱",
        "stock_level_color": "bg-green-500",
        "trend_indicator": "stable",
        "landscape_height": 10
    }'::jsonb,
    
    -- Raw product data
    product_data JSONB NOT NULL, -- Full TikTok product JSON
    
    -- Sync tracking
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(creator_id, tiktok_product_id, shop_id)
);

-- === VIRAL CONTENT TRACKING ===

CREATE TABLE IF NOT EXISTS viral_content_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content_id TEXT NOT NULL,
    content_url TEXT NOT NULL,
    platform TEXT DEFAULT 'tiktok',
    
    -- Performance metrics
    performance_metrics JSONB DEFAULT '{
        "views": 0,
        "likes": 0,
        "shares": 0,
        "comments": 0,
        "growth_rate": 0,
        "engagement_score": 0
    }'::jsonb,
    
    -- Product correlation
    linked_products TEXT[] DEFAULT '{}',
    
    -- Order correlation data
    order_correlation JSONB DEFAULT '{
        "orders_generated": 0,
        "conversion_rate": 0,
        "peak_order_velocity": 0,
        "total_revenue": 0
    }'::jsonb,
    
    -- Inventory impact predictions
    inventory_alerts JSONB DEFAULT '[]'::jsonb,
    
    -- Tracking metadata
    tracking_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(creator_id, content_id)
);

-- === WEBHOOK PROCESSING LOG ===

CREATE TABLE IF NOT EXISTS webhook_processing_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    webhook_type TEXT NOT NULL,
    shop_id TEXT,
    
    -- Processing details
    payload JSONB NOT NULL,
    processing_time_ms INTEGER NOT NULL,
    success BOOLEAN NOT NULL,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    
    -- Actions performed
    actions_performed TEXT[] DEFAULT '{}',
    
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === PERFORMANCE MONITORING ===

CREATE TABLE IF NOT EXISTS tiktok_performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    shop_id TEXT,
    metric_type TEXT NOT NULL, -- 'api_response', 'webhook_processing', 'sync_operation'
    
    -- Performance data
    response_time_ms INTEGER,
    success BOOLEAN NOT NULL,
    error_type TEXT,
    
    -- Context
    operation_details JSONB DEFAULT '{}'::jsonb,
    
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === INDEXES FOR PERFORMANCE ===

-- Order indexes
CREATE INDEX IF NOT EXISTS idx_tiktok_orders_creator_shop ON tiktok_orders(creator_id, shop_id);
CREATE INDEX IF NOT EXISTS idx_tiktok_orders_priority ON tiktok_orders(priority_level, viral_correlation);
CREATE INDEX IF NOT EXISTS idx_tiktok_orders_sync_status ON tiktok_orders(sync_status);
CREATE INDEX IF NOT EXISTS idx_tiktok_orders_created_at ON tiktok_orders(created_at DESC);

-- Product indexes
CREATE INDEX IF NOT EXISTS idx_tiktok_products_creator_shop ON tiktok_products(creator_id, shop_id);
CREATE INDEX IF NOT EXISTS idx_tiktok_products_inventory ON tiktok_products(inventory_quantity);
CREATE INDEX IF NOT EXISTS idx_tiktok_products_velocity ON tiktok_products USING GIN(velocity_tracking);

-- Viral content indexes
CREATE INDEX IF NOT EXISTS idx_viral_content_creator ON viral_content_tracking(creator_id);
CREATE INDEX IF NOT EXISTS idx_viral_content_active ON viral_content_tracking(tracking_active) WHERE tracking_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_viral_content_updated ON viral_content_tracking(last_updated DESC);

-- Webhook processing indexes
CREATE INDEX IF NOT EXISTS idx_webhook_processing_type_time ON webhook_processing_log(webhook_type, processed_at DESC);
CREATE INDEX IF NOT EXISTS idx_webhook_processing_success ON webhook_processing_log(success, processed_at DESC);

-- Performance metrics indexes
CREATE INDEX IF NOT EXISTS idx_performance_metrics_creator_type ON tiktok_performance_metrics(creator_id, metric_type);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_recorded ON tiktok_performance_metrics(recorded_at DESC);

-- === ROW LEVEL SECURITY (RLS) ===

ALTER TABLE tiktok_shop_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_content_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_processing_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_performance_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shop connections
CREATE POLICY "Users can view their own shop connections" ON tiktok_shop_connections
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can insert their own shop connections" ON tiktok_shop_connections
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own shop connections" ON tiktok_shop_connections
    FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for orders
CREATE POLICY "Users can view their own TikTok orders" ON tiktok_orders
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can insert their own TikTok orders" ON tiktok_orders
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own TikTok orders" ON tiktok_orders
    FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for products
CREATE POLICY "Users can view their own TikTok products" ON tiktok_products
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can insert their own TikTok products" ON tiktok_products
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own TikTok products" ON tiktok_products
    FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for viral content tracking
CREATE POLICY "Users can view their own viral content tracking" ON viral_content_tracking
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can insert their own viral content tracking" ON viral_content_tracking
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own viral content tracking" ON viral_content_tracking
    FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for performance metrics
CREATE POLICY "Users can view their own performance metrics" ON tiktok_performance_metrics
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Service role can access webhook processing log" ON webhook_processing_log
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- === FUNCTIONS FOR REAL-TIME UPDATES ===

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_tiktok_shop_connections_updated_at BEFORE UPDATE ON tiktok_shop_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tiktok_orders_updated_at BEFORE UPDATE ON tiktok_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tiktok_products_updated_at BEFORE UPDATE ON tiktok_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_viral_content_tracking_updated_at BEFORE UPDATE ON viral_content_tracking
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- === FUNCTIONS FOR INVENTORY ALERTS ===

-- Function to calculate stock alert level
CREATE OR REPLACE FUNCTION calculate_stock_alert_level(
    current_stock INTEGER,
    velocity DECIMAL
)
RETURNS TEXT AS $$
BEGIN
    IF velocity <= 0 THEN
        RETURN 'medium';
    END IF;
    
    DECLARE
        hours_until_stockout DECIMAL := current_stock / velocity;
    BEGIN
        IF hours_until_stockout <= 6 THEN
            RETURN 'critical';
        ELSIF hours_until_stockout <= 24 THEN
            RETURN 'low';
        ELSE
            RETURN 'medium';
        END IF;
    END;
END;
$$ LANGUAGE plpgsql;

-- Function to generate reorder suggestions
CREATE OR REPLACE FUNCTION generate_reorder_suggestion(
    current_stock INTEGER,
    velocity DECIMAL,
    viral_boost_factor DECIMAL DEFAULT 1.0
)
RETURNS INTEGER AS $$
BEGIN
    IF velocity <= 0 THEN
        RETURN 0;
    END IF;
    
    -- Calculate suggestion for 48 hours of stock with viral boost
    RETURN CEIL(velocity * 48 * viral_boost_factor);
END;
$$ LANGUAGE plpgsql;

-- === VIEWS FOR DASHBOARD ANALYTICS ===

-- View for order performance dashboard
CREATE OR REPLACE VIEW tiktok_order_analytics AS
SELECT 
    creator_id,
    shop_id,
    COUNT(*) as total_orders,
    COUNT(*) FILTER (WHERE priority_level = 'VIRAL') as viral_orders,
    COUNT(*) FILTER (WHERE viral_correlation = TRUE) as viral_correlated_orders,
    AVG(sync_duration_ms) as avg_sync_time,
    COUNT(*) FILTER (WHERE sync_status = 'synced') * 100.0 / COUNT(*) as sync_success_rate,
    SUM(total_amount) as total_revenue,
    DATE_TRUNC('day', created_at) as date
FROM tiktok_orders
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY creator_id, shop_id, DATE_TRUNC('day', created_at);

-- View for inventory management dashboard
CREATE OR REPLACE VIEW tiktok_inventory_dashboard AS
SELECT 
    p.creator_id,
    p.shop_id,
    p.tiktok_product_id,
    p.title,
    p.inventory_quantity,
    (p.velocity_tracking->>'current_velocity')::DECIMAL as current_velocity,
    calculate_stock_alert_level(
        p.inventory_quantity, 
        (p.velocity_tracking->>'current_velocity')::DECIMAL
    ) as alert_level,
    generate_reorder_suggestion(
        p.inventory_quantity,
        (p.velocity_tracking->>'current_velocity')::DECIMAL,
        (p.stock_alerts->>'viral_boost_factor')::DECIMAL
    ) as reorder_suggestion,
    p.visual_metadata,
    p.last_synced_at
FROM tiktok_products p
WHERE p.inventory_quantity < 1000; -- Focus on products that might need attention

-- View for webhook performance monitoring
CREATE OR REPLACE VIEW webhook_performance_stats AS
SELECT 
    webhook_type,
    COUNT(*) as total_events,
    COUNT(*) FILTER (WHERE success = TRUE) as successful_events,
    COUNT(*) FILTER (WHERE success = TRUE) * 100.0 / COUNT(*) as success_rate,
    AVG(processing_time_ms) as avg_processing_time,
    MAX(processing_time_ms) as max_processing_time,
    DATE_TRUNC('hour', processed_at) as hour
FROM webhook_processing_log
WHERE processed_at >= NOW() - INTERVAL '24 hours'
GROUP BY webhook_type, DATE_TRUNC('hour', processed_at)
ORDER BY hour DESC;

-- === COMMENTS FOR DOCUMENTATION ===

COMMENT ON TABLE tiktok_shop_connections IS 'TikTok Shop API connection management with OAuth tokens and performance tracking';
COMMENT ON TABLE tiktok_orders IS 'TikTok Shop orders with viral content correlation and priority classification';
COMMENT ON TABLE tiktok_products IS 'TikTok Shop products with velocity tracking and inventory alerts';
COMMENT ON TABLE viral_content_tracking IS 'Viral content performance tracking with order correlation';
COMMENT ON TABLE webhook_processing_log IS 'Webhook processing history for performance monitoring and debugging';
COMMENT ON TABLE tiktok_performance_metrics IS 'System performance metrics for TikTok Shop integration';

COMMENT ON VIEW tiktok_order_analytics IS 'Analytics view for TikTok order performance dashboard';
COMMENT ON VIEW tiktok_inventory_dashboard IS 'Real-time inventory management dashboard data';
COMMENT ON VIEW webhook_performance_stats IS 'Webhook processing performance statistics';

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;