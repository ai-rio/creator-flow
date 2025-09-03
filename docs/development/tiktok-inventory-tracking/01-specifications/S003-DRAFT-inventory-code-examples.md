# S003-DRAFT: TikTok Shop Inventory Tracking Code Examples

**Document Type**: Specifications  
**Status**: DRAFT  
**Priority**: Must Have (M)  
**Created**: 2025-09-03  
**Last Updated**: 2025-09-03  

## Overview

This document provides comprehensive code examples for implementing the TikTok Shop inventory tracking feature, including service implementations, API clients, webhook handlers, and database operations.

## Service Implementations

### Inventory Sync Service

```typescript
// src/features/inventory/services/inventory-sync.service.ts
import { TikTokShopClient } from '@/lib/tiktok/client';
import { Database } from '@/lib/supabase/types';
import { logger } from '@/lib/logger';

export class InventorySyncService {
  constructor(
    private tiktokClient: TikTokShopClient,
    private db: Database,
    private cache: Redis
  ) {}

  async syncProduct(productId: string): Promise<SyncResult> {
    try {
      // Get current product data
      const localProduct = await this.db
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (!localProduct) {
        throw new Error(`Product ${productId} not found`);
      }

      // Fetch from TikTok Shop
      const tiktokProduct = await this.tiktokClient.getProduct(
        localProduct.tiktok_product_id
      );

      // Update local inventory
      const updateResult = await this.updateLocalInventory(
        productId,
        tiktokProduct.inventory
      );

      // Cache the result
      await this.cache.setex(
        `inventory:${productId}`,
        3600,
        JSON.stringify(updateResult)
      );

      logger.info('Product inventory synced', {
        productId,
        previousStock: localProduct.current_stock,
        newStock: tiktokProduct.inventory.available_quantity
      });

      return {
        success: true,
        productId,
        previousStock: localProduct.current_stock,
        newStock: tiktokProduct.inventory.available_quantity,
        syncedAt: new Date()
      };

    } catch (error) {
      logger.error('Inventory sync failed', { productId, error });
      
      if (error instanceof RateLimitError) {
        return {
          success: false,
          error: 'rate_limit',
          retryAfter: error.retryAfter
        };
      }

      throw error;
    }
  }

  async syncFullCatalog(batchSize = 100): Promise<CatalogSyncResult> {
    const products = await this.db
      .from('products')
      .select('id, tiktok_product_id')
      .not('tiktok_product_id', 'is', null);

    const batches = this.chunkArray(products, batchSize);
    const results: SyncResult[] = [];

    for (const batch of batches) {
      const batchPromises = batch.map(product => 
        this.syncProduct(product.id).catch(error => ({
          success: false,
          productId: product.id,
          error: error.message
        }))
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Rate limiting delay
      await this.delay(1000);
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;

    return {
      totalProducts: products.length,
      successful,
      failed,
      results
    };
  }

  private async updateLocalInventory(
    productId: string,
    tiktokInventory: TikTokInventory
  ): Promise<InventoryUpdate> {
    const { data, error } = await this.db
      .from('products')
      .update({
        current_stock: tiktokInventory.available_quantity,
        reserved_stock: tiktokInventory.reserved_quantity,
        available_stock: tiktokInventory.available_quantity - tiktokInventory.reserved_quantity,
        last_inventory_sync: new Date().toISOString(),
        inventory_sync_status: 'synced'
      })
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Alert Generation Service

```typescript
// src/features/inventory/services/alert-generation.service.ts
export class AlertGenerationService {
  constructor(
    private db: Database,
    private notificationService: NotificationService
  ) {}

  async checkLowStockAlerts(): Promise<AlertCheckResult> {
    // Get products with low stock
    const lowStockProducts = await this.db
      .from('products')
      .select(`
        id,
        name,
        sku,
        available_stock,
        low_stock_threshold,
        user_id
      `)
      .lt('available_stock', 'low_stock_threshold')
      .gt('available_stock', 0);

    const alertsGenerated: LowStockAlert[] = [];

    for (const product of lowStockProducts) {
      // Check if alert already exists
      const existingAlert = await this.db
        .from('low_stock_alerts')
        .select('id')
        .eq('product_id', product.id)
        .eq('resolved', false)
        .single();

      if (!existingAlert) {
        const alert = await this.generateLowStockAlert(product);
        alertsGenerated.push(alert);
      }
    }

    return {
      productsChecked: lowStockProducts.length,
      alertsGenerated: alertsGenerated.length,
      alerts: alertsGenerated
    };
  }

  private async generateLowStockAlert(product: Product): Promise<LowStockAlert> {
    // Create alert record
    const { data: alert } = await this.db
      .from('low_stock_alerts')
      .insert({
        product_id: product.id,
        current_stock: product.available_stock,
        threshold: product.low_stock_threshold,
        alert_sent: false
      })
      .select()
      .single();

    // Send notification
    await this.notificationService.sendLowStockAlert({
      userId: product.user_id,
      productName: product.name,
      currentStock: product.available_stock,
      threshold: product.low_stock_threshold
    });

    // Update alert as sent
    await this.db
      .from('low_stock_alerts')
      .update({
        alert_sent: true,
        alert_sent_at: new Date().toISOString()
      })
      .eq('id', alert.id);

    return alert;
  }

  async resolveAlert(alertId: string): Promise<void> {
    await this.db
      .from('low_stock_alerts')
      .update({
        resolved: true,
        resolved_at: new Date().toISOString()
      })
      .eq('id', alertId);
  }
}
```

## API Client Implementation

### TikTok Shop API Client

```typescript
// src/lib/tiktok/inventory-client.ts
export class TikTokInventoryClient {
  constructor(
    private apiKey: string,
    private shopId: string,
    private baseUrl = 'https://api.tiktokshop.com'
  ) {}

  async getProduct(productId: string): Promise<TikTokProduct> {
    const response = await this.makeRequest(
      'GET',
      `/products/${productId}`,
      null,
      { include: 'inventory' }
    );

    return response.data;
  }

  async updateInventory(
    productId: string,
    inventory: InventoryUpdate
  ): Promise<void> {
    await this.makeRequest(
      'PUT',
      `/products/${productId}/inventory`,
      {
        available_quantity: inventory.availableQuantity,
        reserved_quantity: inventory.reservedQuantity
      }
    );
  }

  async getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 100,
      include: 'inventory',
      ...params
    };

    const response = await this.makeRequest(
      'GET',
      '/products',
      null,
      queryParams
    );

    return response.data;
  }

  private async makeRequest(
    method: string,
    endpoint: string,
    body?: any,
    params?: Record<string, any>
  ): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Shop-Id': this.shopId
    };

    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    };

    const response = await fetch(url.toString(), config);

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
      throw new RateLimitError(retryAfter);
    }

    if (!response.ok) {
      throw new TikTokAPIError(
        `API request failed: ${response.status}`,
        response.status
      );
    }

    return response.json();
  }
}
```

## Webhook Handler Implementation

```typescript
// src/app/api/webhooks/tiktok/inventory/route.ts
import { NextRequest } from 'next/server';
import { verifyWebhookSignature } from '@/lib/tiktok/webhook-utils';
import { InventorySyncService } from '@/features/inventory/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('X-TikTok-Signature');

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      return Response.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    
    switch (payload.event) {
      case 'product.inventory.updated':
        await handleInventoryUpdate(payload.data);
        break;
      
      case 'product.inventory.low_stock':
        await handleLowStockNotification(payload.data);
        break;
      
      default:
        logger.warn('Unknown webhook event', { event: payload.event });
    }

    return Response.json({ processed: true });

  } catch (error) {
    logger.error('Webhook processing failed', { error });
    return Response.json({ error: 'Processing failed' }, { status: 500 });
  }
}

async function handleInventoryUpdate(data: InventoryUpdateWebhook) {
  const inventoryService = new InventorySyncService();
  
  // Find local product by TikTok product ID
  const product = await db
    .from('products')
    .select('id')
    .eq('tiktok_product_id', data.product_id)
    .single();

  if (!product) {
    logger.warn('Product not found for inventory update', {
      tiktokProductId: data.product_id
    });
    return;
  }

  // Update local inventory
  await db
    .from('products')
    .update({
      current_stock: data.new_stock,
      available_stock: data.new_stock - (data.reserved_stock || 0),
      last_inventory_sync: new Date().toISOString(),
      inventory_sync_status: 'synced'
    })
    .eq('id', product.id);

  // Create transaction record
  await db
    .from('inventory_transactions')
    .insert({
      product_id: product.id,
      transaction_type: data.change_type === 'increase' ? 'IN' : 'OUT',
      quantity: Math.abs(data.new_stock - data.previous_stock),
      previous_stock: data.previous_stock,
      new_stock: data.new_stock,
      reason: 'TikTok Shop sync',
      reference_type: 'webhook'
    });

  logger.info('Inventory updated via webhook', {
    productId: product.id,
    previousStock: data.previous_stock,
    newStock: data.new_stock
  });
}
```

## Database Operations

### Inventory Transaction Service

```typescript
// src/features/inventory/services/inventory-transaction.service.ts
export class InventoryTransactionService {
  constructor(private db: Database) {}

  async adjustStock(
    productId: string,
    quantity: number,
    reason: string,
    userId?: string
  ): Promise<InventoryAdjustmentResult> {
    return await this.db.transaction(async (trx) => {
      // Get current product with lock
      const product = await trx
        .from('products')
        .select('*')
        .eq('id', productId)
        .forUpdate()
        .single();

      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }

      const newStock = product.current_stock + quantity;
      const newAvailableStock = newStock - product.reserved_stock;

      if (newAvailableStock < 0) {
        throw new Error('Insufficient stock for adjustment');
      }

      // Update product stock
      const { data: updatedProduct } = await trx
        .from('products')
        .update({
          current_stock: newStock,
          available_stock: newAvailableStock,
          last_inventory_sync: new Date().toISOString()
        })
        .eq('id', productId)
        .select()
        .single();

      // Create transaction record
      const { data: transaction } = await trx
        .from('inventory_transactions')
        .insert({
          product_id: productId,
          transaction_type: quantity > 0 ? 'IN' : 'OUT',
          quantity: Math.abs(quantity),
          previous_stock: product.current_stock,
          new_stock: newStock,
          reason,
          created_by: userId
        })
        .select()
        .single();

      return {
        success: true,
        product: updatedProduct,
        transaction,
        previousStock: product.current_stock,
        newStock
      };
    });
  }

  async getTransactionHistory(
    productId: string,
    options: TransactionHistoryOptions = {}
  ): Promise<TransactionHistoryResult> {
    let query = this.db
      .from('inventory_transactions')
      .select(`
        *,
        users:created_by(name, email)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    if (options.transactionType) {
      query = query.eq('transaction_type', options.transactionType);
    }

    const { data: transactions, error } = await query;

    if (error) throw error;

    return {
      transactions,
      total: transactions.length
    };
  }
}
```

## API Route Implementations

### Inventory Query Endpoints

```typescript
// src/app/api/inventory/products/route.ts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = db
      .from('products')
      .select(`
        id,
        name,
        sku,
        current_stock,
        reserved_stock,
        available_stock,
        last_inventory_sync,
        inventory_sync_status,
        low_stock_threshold
      `);

    // Apply filters
    if (status === 'low_stock') {
      query = query.lt('available_stock', 'low_stock_threshold');
    } else if (status === 'out_of_stock') {
      query = query.eq('available_stock', 0);
    } else if (status === 'in_stock') {
      query = query.gt('available_stock', 0);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }

    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: products, error } = await query;

    if (error) throw error;

    return Response.json({
      products,
      pagination: {
        page,
        limit,
        total: products.length
      }
    });

  } catch (error) {
    logger.error('Failed to fetch inventory', { error });
    return Response.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}
```

### Inventory Adjustment Endpoint

```typescript
// src/app/api/inventory/products/[productId]/adjust/route.ts
export async function POST(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { quantity, reason } = await request.json();
    const userId = await getCurrentUserId(request);

    if (!quantity || !reason) {
      return Response.json(
        { error: 'Quantity and reason are required' },
        { status: 400 }
      );
    }

    const transactionService = new InventoryTransactionService(db);
    const result = await transactionService.adjustStock(
      params.productId,
      quantity,
      reason,
      userId
    );

    return Response.json({
      success: true,
      new_stock_level: result.newStock,
      transaction_id: result.transaction.id
    });

  } catch (error) {
    logger.error('Inventory adjustment failed', {
      productId: params.productId,
      error
    });

    return Response.json(
      { error: error.message || 'Adjustment failed' },
      { status: 500 }
    );
  }
}
```

## Background Job Implementation

### Scheduled Inventory Sync

```typescript
// src/features/inventory/jobs/scheduled-sync.ts
import { CronJob } from 'cron';

export class ScheduledInventorySync {
  private syncJob: CronJob;
  private alertJob: CronJob;

  constructor(
    private inventoryService: InventorySyncService,
    private alertService: AlertGenerationService
  ) {
    // Run full catalog sync every 15 minutes
    this.syncJob = new CronJob('*/15 * * * *', async () => {
      await this.runFullSync();
    });

    // Check for low stock alerts every 10 minutes
    this.alertJob = new CronJob('*/10 * * * *', async () => {
      await this.checkLowStockAlerts();
    });
  }

  start() {
    this.syncJob.start();
    this.alertJob.start();
    logger.info('Inventory sync jobs started');
  }

  stop() {
    this.syncJob.stop();
    this.alertJob.stop();
    logger.info('Inventory sync jobs stopped');
  }

  private async runFullSync() {
    try {
      logger.info('Starting scheduled inventory sync');
      
      const result = await this.inventoryService.syncFullCatalog();
      
      logger.info('Scheduled inventory sync completed', {
        totalProducts: result.totalProducts,
        successful: result.successful,
        failed: result.failed
      });

    } catch (error) {
      logger.error('Scheduled inventory sync failed', { error });
    }
  }

  private async checkLowStockAlerts() {
    try {
      logger.info('Checking for low stock alerts');
      
      const result = await this.alertService.checkLowStockAlerts();
      
      logger.info('Low stock alert check completed', {
        productsChecked: result.productsChecked,
        alertsGenerated: result.alertsGenerated
      });

    } catch (error) {
      logger.error('Low stock alert check failed', { error });
    }
  }
}
```

## Type Definitions

```typescript
// src/features/inventory/types.ts
export interface SyncResult {
  success: boolean;
  productId: string;
  previousStock?: number;
  newStock?: number;
  syncedAt?: Date;
  error?: string;
  retryAfter?: number;
}

export interface CatalogSyncResult {
  totalProducts: number;
  successful: number;
  failed: number;
  results: SyncResult[];
}

export interface LowStockAlert {
  id: string;
  productId: string;
  currentStock: number;
  threshold: number;
  alertSent: boolean;
  alertSentAt?: Date;
  resolved: boolean;
  resolvedAt?: Date;
  createdAt: Date;
}

export interface InventoryTransaction {
  id: string;
  productId: string;
  transactionType: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  referenceId?: string;
  referenceType?: string;
  createdAt: Date;
  createdBy?: string;
}

export interface TikTokProduct {
  id: string;
  name: string;
  sku: string;
  inventory: {
    available_quantity: number;
    reserved_quantity: number;
    total_quantity: number;
  };
}

export interface InventoryUpdateWebhook {
  product_id: string;
  sku: string;
  previous_stock: number;
  new_stock: number;
  reserved_stock?: number;
  change_type: 'increase' | 'decrease';
  change_reason: string;
  timestamp: string;
}
```

## Related Documentation

- [Investigation: Requirements Analysis](../00-planning/P001-DRAFT-inventory-tracking-investigation.md)
- [Specifications: Technical Requirements](./S001-DRAFT-inventory-tracking-specs.md)
- [Testing Strategy](./S002-DRAFT-inventory-testing-strategy.md)
- [Implementation: Progress Tracking](../02-implementation/I001-DRAFT-inventory-tracking-progress.md)
