/**
 * TikTok Shop API Client
 * Core client for TikTok Shop API integration
 */

interface TikTokShopConfig {
  appKey: string
  appSecret: string
  apiVersion: string
  environment: 'sandbox' | 'production'
}

interface TikTokShopResponse<T = any> {
  code: number
  message: string
  data: T
  request_id: string
}

interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  shop_id: string
}

export class TikTokShopAPIClient {
  private config: TikTokShopConfig
  private baseURL: string

  constructor(config: TikTokShopConfig) {
    this.config = config
    this.baseURL = config.environment === 'production' 
      ? 'https://open-api.tiktokglobalshop.com'
      : 'https://open-api-sandbox.tiktokglobalshop.com'
  }

  /**
   * Generate OAuth authorization URL
   */
  getAuthorizationURL(redirectUri: string, state?: string): string {
    const params = new URLSearchParams({
      app_key: this.config.appKey,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'user.info.basic,product.list,order.list,fulfillment.write',
      ...(state && { state })
    })

    return `${this.baseURL}/authorization/v${this.config.apiVersion}/authorize?${params}`
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<TokenResponse> {
    const response = await this.makeRequest<TokenResponse>('/authorization/v202309/token/get', {
      method: 'POST',
      body: {
        app_key: this.config.appKey,
        app_secret: this.config.appSecret,
        auth_code: code,
        grant_type: 'authorization_code'
      }
    })

    return response.data
  }

  /**
   * Make authenticated API request
   */
  private async makeRequest<T>(
    endpoint: string, 
    options: {
      method: 'GET' | 'POST'
      body?: any
      accessToken?: string
      shopId?: string
    }
  ): Promise<TikTokShopResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const timestamp = Math.floor(Date.now() / 1000)
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-tts-access-token': options.accessToken || '',
      'x-tts-shop-id': options.shopId || ''
    }

    const response = await fetch(url, {
      method: options.method,
      headers,
      ...(options.body && { body: JSON.stringify(options.body) })
    })

    if (!response.ok) {
      throw new Error(`TikTok Shop API error: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<TikTokShopResponse<T>>
  }

  /**
   * Get shop information
   */
  async getShopInfo(accessToken: string, shopId: string) {
    return this.makeRequest('/seller/v202309/shops', {
      method: 'GET',
      accessToken,
      shopId
    })
  }

  /**
   * Get orders (Phase 1 Must Have)
   */
  async getOrders(
    accessToken: string, 
    shopId: string,
    params: {
      page_size?: number
      page_token?: string
      order_status?: string
      create_time_from?: number
      create_time_to?: number
    } = {}
  ) {
    const queryParams = new URLSearchParams({
      page_size: (params.page_size || 50).toString(),
      ...(params.page_token && { page_token: params.page_token }),
      ...(params.order_status && { order_status: params.order_status }),
      ...(params.create_time_from && { create_time_from: params.create_time_from.toString() }),
      ...(params.create_time_to && { create_time_to: params.create_time_to.toString() })
    })

    return this.makeRequest(`/order/v202309/orders?${queryParams}`, {
      method: 'GET',
      accessToken,
      shopId
    })
  }

  /**
   * Get products (Phase 1 Must Have)
   */
  async getProducts(
    accessToken: string,
    shopId: string,
    params: {
      page_size?: number
      page_token?: string
      search_status?: string
    } = {}
  ) {
    const queryParams = new URLSearchParams({
      page_size: (params.page_size || 50).toString(),
      ...(params.page_token && { page_token: params.page_token }),
      ...(params.search_status && { search_status: params.search_status })
    })

    return this.makeRequest(`/product/v202309/products?${queryParams}`, {
      method: 'GET',
      accessToken,
      shopId
    })
  }
}

// Singleton instance
export const tiktokShopClient = new TikTokShopAPIClient({
  appKey: process.env.TIKTOK_SHOP_APP_KEY!,
  appSecret: process.env.TIKTOK_SHOP_APP_SECRET!,
  apiVersion: '202309',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
})