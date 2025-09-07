/**
 * TikTok Integration Dashboard
 * Main dashboard component implementing the UI requirements from mock analysis
 */

'use client';

import { AnimatePresence,motion } from 'framer-motion';
import {
Activity,
AlertTriangle,   ArrowLeft, BarChart3, Box, CheckCircle2, Clock,
DollarSign,   Flame, Moon, Package, Palette, RefreshCw, Settings,   ShoppingCart, Siren,
Sun, Target, TrendingUp, Truck, Zap} from 'lucide-react';
import React, { useEffect,useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useSupabase } from '@/libs/supabase/supabase-client-client';

// === TYPES ===

interface TikTokShopConnection {
  id: string;
  shop_id: string;
  shop_name: string;
  connection_status: 'connected' | 'disconnected' | 'error' | 'syncing';
  performance_metrics: {
    sync_success_rate: number;
    average_response_time: number;
    total_requests: number;
    failed_requests: number;
  };
  last_sync_at: string;
}

interface TikTokOrder {
  id: string;
  tiktok_order_id: string;
  order_status: string;
  priority_level: 'VIRAL' | 'HIGH' | 'MED' | 'AUTO';
  viral_correlation: boolean;
  total_amount: number;
  sync_status: string;
  created_at: string;
}

interface TikTokProduct {
  id: string;
  tiktok_product_id: string;
  title: string;
  inventory_quantity: number;
  velocity_tracking: {
    current_velocity: number;
    velocity_trend: 'increasing' | 'decreasing' | 'stable';
  };
  stock_alerts: {
    level: 'critical' | 'low' | 'medium' | 'high';
    reorder_suggestion: number;
  };
  visual_metadata: {
    category_icon: string;
    stock_level_color: string;
    landscape_height: number;
  };
}

interface StockAlert {
  product_id: string;
  product_name: string;
  current_stock: number;
  alert_level: 'critical' | 'low' | 'medium';
  context: string;
  velocity: string;
  suggestion: string;
}

interface PerformanceStats {
  average_processing_time: number;
  success_rate: number;
  total_events_processed: number;
}

// === THEME MANAGEMENT ===

const ThemeToggle: React.FC<{ theme: string; setTheme: (theme: string) => void }> = ({ theme, setTheme }) => {
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-500/10 transition-colors"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
};

// === GLASS PANE COMPONENT ===

const GlassPane: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`bg-white/50 dark:bg-slate-400/10 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

// === ANIMATION VARIANTS ===

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: 'spring', staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
};

// === HEADER COMPONENT ===

const TikTokIntegrationHeader: React.FC<{ 
  theme: string; 
  setTheme: (theme: string) => void;
  connectionStatus: string;
  totalSKUs: number;
}> = ({ theme, setTheme, connectionStatus, totalSKUs }) => (
  <motion.div variants={itemVariants as any}>
    <GlassPane className="p-3 flex items-center justify-between sticky top-4 z-10">
      <div className="flex items-center gap-3">
        <ArrowLeft className="text-slate-600 dark:text-slate-300" />
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">TikTok Command</h1>
        <Badge variant={connectionStatus === 'connected' ? 'default' : 'secondary'} className="hidden sm:inline">
          {connectionStatus === 'connected' ? `${totalSKUs} SKUs synced` : connectionStatus}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          <Box className="text-teal-800 dark:text-teal-400" />
          <Zap className="text-purple-700 dark:text-purple-400" />
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </GlassPane>
  </motion.div>
);

// === SYNC PERFORMANCE METRICS CARD ===

const SyncPerformanceMetricsCard: React.FC<{ performanceStats: PerformanceStats }> = ({ 
  performanceStats 
}) => (
  <motion.div variants={itemVariants as any}>
    <GlassPane className="p-4 space-y-3 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw className="text-slate-600 dark:text-slate-300" size={16} />
          <span className="font-semibold text-slate-900 dark:text-slate-100">TikTok Sync:</span>
          <span className="text-slate-700 dark:text-slate-300">
            {(performanceStats.average_processing_time / 1000).toFixed(1)}s avg ({Math.round(performanceStats.success_rate)}%)
          </span>
        </div>
        <CheckCircle2 className="text-teal-800 dark:text-teal-400" size={18} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="text-slate-600 dark:text-slate-300" size={16} />
          <span className="font-semibold text-slate-900 dark:text-slate-100">Events processed:</span>
          <span className="text-slate-700 dark:text-slate-300">{performanceStats.total_events_processed.toLocaleString()}</span>
        </div>
        <Badge variant="outline" className="text-xs">Active</Badge>
      </div>
      <Progress value={performanceStats.success_rate} className="h-2" />
    </GlassPane>
  </motion.div>
);

// === CRITICAL STOCK ALERTS CARD ===

const CriticalStockAlertsCard: React.FC<{ alerts: StockAlert[] }> = ({ alerts }) => (
  <motion.div variants={itemVariants as any} className="space-y-4">
    <div className="flex items-center gap-2 px-2">
      <Siren className="text-red-600 dark:text-red-500" />
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">CRITICAL STOCK ALERTS</h2>
      <Badge variant="destructive" className="ml-auto">{alerts.length}</Badge>
    </div>
    
    <div className="space-y-3">
      {alerts.length === 0 ? (
        <GlassPane className="p-4">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="mx-auto mb-2" size={32} />
            <p>No critical stock alerts</p>
            <p className="text-xs">All inventory levels are healthy</p>
          </div>
        </GlassPane>
      ) : (
        alerts.map((alert, i) => (
          <GlassPane key={i} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {alert.product_name}: <span className="text-red-600 dark:text-red-500">{alert.current_stock} left</span>
                </p>
                <Badge 
                  variant={alert.alert_level === 'critical' ? 'destructive' : 'secondary'}
                  className="mt-1"
                >
                  {alert.alert_level.toUpperCase()}
                </Badge>
              </div>
              <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
            </div>
            
            <div className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
              <p>{alert.context}</p>
              <p className="flex items-center gap-1">
                <Clock size={14} />
                {alert.velocity}
              </p>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{alert.suggestion}</p>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" className="flex-1">
                Auto-Order
              </Button>
              <Button size="sm" variant="outline">
                Manual
              </Button>
              <Button size="sm" variant="ghost">
                Defer
              </Button>
            </div>
          </GlassPane>
        ))
      )}
    </div>
  </motion.div>
);

// === INVENTORY VISUALIZATION CARD ===

const InventoryVisualizationCard: React.FC<{ products: TikTokProduct[] }> = ({ products }) => {
  const landscapeData = products.slice(0, 4).map(product => ({
    name: product.title.substring(0, 8),
    level: product.stock_alerts.level,
    height: Math.min(20, Math.max(6, product.visual_metadata.landscape_height))
  }));

  const levelColorClasses: Record<string, string> = {
    high: 'bg-teal-800 dark:bg-teal-400',
    medium: 'bg-yellow-600 dark:bg-yellow-500', 
    low: 'bg-red-600 dark:bg-red-500',
    critical: 'bg-red-800 dark:bg-red-600'
  };

  return (
    <motion.div variants={itemVariants as any} className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <Palette className="text-purple-700 dark:text-purple-400" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Inventory Visualization</h2>
        <Badge variant="outline" className="ml-auto text-xs">Live</Badge>
      </div>
      
      <GlassPane className="p-4 space-y-4">
        {/* Stock Flow Visualization */}
        <div>
          <h3 className="text-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            STOCK FLOW VISUALIZATION
          </h3>
          <div className="flex items-center justify-between px-2">
            {[...Array(12)].map((_, i) => (
              <React.Fragment key={i}>
                <div className={`w-2 h-2 rounded-full ${
                  i % 3 === 0 ? 'bg-purple-700 dark:bg-purple-400' : 'bg-slate-500/50'
                }`}></div>
                {i < 11 && <div className="flex-1 h-px bg-slate-500/30"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Stock Level Landscape */}
        <div className="pt-4">
          <h3 className="text-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            STOCK LEVEL LANDSCAPE
          </h3>
          <div className="flex items-end justify-around h-24 gap-2 px-2">
            {landscapeData.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center flex-1">
                <div 
                  className={`w-full ${levelColorClasses[item.level]} rounded-t-md transition-all duration-500`}
                  style={{ height: `${item.height * 4}px` }}
                ></div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-4">
          <Button size="sm" variant="outline" className="flex-1">
            Expand View
          </Button>
          <Button size="sm" variant="ghost" className="flex-1">
            Adjust All
          </Button>
        </div>
      </GlassPane>
    </motion.div>
  );
};

// === ORDER STATS CARD ===

const OrderStatsCard: React.FC<{ orders: TikTokOrder[] }> = ({ orders }) => {
  const viralOrders = orders.filter(o => o.priority_level === 'VIRAL').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <motion.div variants={itemVariants as any}>
      <GlassPane className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingCart className="text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">Order Intelligence</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{orders.length}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total Orders</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{viralOrders}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Viral Orders</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Revenue</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-700 dark:text-teal-400">
              ${avgOrderValue.toFixed(0)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Avg Order</div>
          </div>
        </div>
      </GlassPane>
    </motion.div>
  );
};

// === SUB NAVIGATION BAR ===

const TikTokSubNavBar: React.FC = () => {
  const navItems = [
    { name: 'Analytics', icon: <BarChart3 size={20} /> },
    { name: 'Sync', icon: <RefreshCw size={20} /> },
    { name: 'Config', icon: <Settings size={20} /> },
  ];

  return (
    <motion.div variants={itemVariants as any} className="sticky bottom-4 z-10">
      <GlassPane className="p-2 flex items-center justify-around">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1.5 py-1 px-4 rounded-lg w-24 h-auto"
          >
            {item.icon}
            <span className="text-xs font-bold">{item.name}</span>
          </Button>
        ))}
      </GlassPane>
    </motion.div>
  );
};

// === MAIN DASHBOARD COMPONENT ===

export const TikTokIntegrationDashboard: React.FC = () => {
  const [theme, setTheme] = useState<string>('dark');
  const [connections, setConnections] = useState<TikTokShopConnection[]>([]);
  const [orders, setOrders] = useState<TikTokOrder[]>([]);
  const [products, setProducts] = useState<TikTokProduct[]>([]);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    average_processing_time: 3200,
    success_rate: 98,
    total_events_processed: 1247
  });
  const [loading, setLoading] = useState(true);

  const { supabase } = useSupabase();
  const { toast } = useToast();

  // Load data on component mount
  useEffect(() => {
    loadTikTokData();
    setupRealtimeSubscriptions();
  }, []);

  // Theme management
  useEffect(() => {
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const loadTikTokData = async () => {
    try {
      setLoading(true);

      // Load connections
      const { data: connectionsData, error: connectionsError } = await supabase
        .from('tiktok_shop_connections')
        .select('*')
        .eq('connection_status', 'connected');

      if (connectionsError) throw connectionsError;
      setConnections(connectionsData || []);

      // Load recent orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('tiktok_orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Load products with low stock
      const { data: productsData, error: productsError } = await supabase
        .from('tiktok_products')
        .select('*')
        .order('inventory_quantity', { ascending: true })
        .limit(20);

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Generate stock alerts from products
      const alerts: StockAlert[] = (productsData || [])
        .filter(p => p.inventory_quantity < 50)
        .map(p => ({
          product_id: p.tiktok_product_id,
          product_name: p.title.substring(0, 30) + '...',
          current_stock: p.inventory_quantity,
          alert_level: p.inventory_quantity < 10 ? 'critical' : 'low',
          context: 'Automated velocity calculation',
          velocity: `Selling ${Math.round(p.velocity_tracking?.current_velocity || 0)}/hour`,
          suggestion: `Auto-reorder suggested: ${p.stock_alerts?.reorder_suggestion || 100}`
        }));

      setStockAlerts(alerts);

    } catch (error) {
      console.error('Failed to load TikTok data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load TikTok integration data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to order updates
    const orderChannel = supabase
      .channel('tiktok-order-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tiktok_orders' },
        (payload) => {
          console.log('Order update received:', payload);
          loadTikTokData(); // Reload data on updates
        }
      )
      .subscribe();

    // Subscribe to inventory updates
    const inventoryChannel = supabase
      .channel('tiktok-inventory-updates')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'tiktok_products' },
        (payload) => {
          console.log('Inventory update received:', payload);
          loadTikTokData(); // Reload data on updates
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orderChannel);
      supabase.removeChannel(inventoryChannel);
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-[#0A090F] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="animate-spin" />
          <span>Loading TikTok integration...</span>
        </div>
      </div>
    );
  }

  const totalSKUs = products.length;
  const connectionStatus = connections.length > 0 ? connections[0].connection_status : 'disconnected';

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0A090F] font-sans p-4 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        <motion.div 
          className="space-y-4 pb-24"
          variants={containerVariants as any}
          initial="hidden"
          animate="visible"
        >
          <TikTokIntegrationHeader 
            theme={theme} 
            setTheme={setTheme}
            connectionStatus={connectionStatus}
            totalSKUs={totalSKUs}
          />
          
          <SyncPerformanceMetricsCard performanceStats={performanceStats} />
          
          <OrderStatsCard orders={orders} />
          
          <CriticalStockAlertsCard alerts={stockAlerts} />
          
          <InventoryVisualizationCard products={products} />
        </motion.div>
        
        <TikTokSubNavBar />
      </div>
    </div>
  );
};

export default TikTokIntegrationDashboard;