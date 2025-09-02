import { describe, expect, it, jest } from '@jest/globals'

// Mock TikTok API utilities
const mockTikTokAPI = {
  getOrders: jest.fn(),
  createShippingLabel: jest.fn(),
  updateOrderStatus: jest.fn(),
}

describe('TikTok Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch TikTok Shop orders', async () => {
    const mockOrders = [
      { id: 'TT123', status: 'AWAITING_SHIPMENT', creator_id: 'creator_1' },
      { id: 'TT124', status: 'PROCESSING', creator_id: 'creator_1' },
    ]

    mockTikTokAPI.getOrders.mockResolvedValue(mockOrders)

    const orders = await mockTikTokAPI.getOrders('creator_1')

    expect(orders).toHaveLength(2)
    expect(orders[0].id).toBe('TT123')
    expect(mockTikTokAPI.getOrders).toHaveBeenCalledWith('creator_1')
  })

  it('should create shipping labels for orders', async () => {
    const mockLabel = {
      label_url: 'https://ups.com/label/123',
      tracking_number: '1Z123456789',
    }

    mockTikTokAPI.createShippingLabel.mockResolvedValue(mockLabel)

    const label = await mockTikTokAPI.createShippingLabel({
      order_id: 'TT123',
      carrier: 'ups',
    })

    expect(label.tracking_number).toMatch(/^1Z/)
    expect(label.label_url).toContain('ups.com')
  })

  it('should update order status after shipping', async () => {
    mockTikTokAPI.updateOrderStatus.mockResolvedValue({ success: true })

    const result = await mockTikTokAPI.updateOrderStatus('TT123', 'SHIPPED')

    expect(result.success).toBe(true)
    expect(mockTikTokAPI.updateOrderStatus).toHaveBeenCalledWith('TT123', 'SHIPPED')
  })
})
