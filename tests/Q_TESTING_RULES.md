# Q Testing Rules for CreatorFlow

## Testing Context
This file provides specific testing guidelines for Amazon Q Developer when working in the `tests/` directory.

## Unit Testing Rules

### Mock Strategy
```typescript
// Always mock external APIs
jest.mock('@/lib/supabase/client')
jest.mock('@/lib/stripe/config')
jest.mock('@/lib/tiktok/api-client')
```

### Test Structure
```typescript
describe('OrderProcessor', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
  })

  it('should process TikTok Shop orders correctly', async () => {
    // Arrange - Setup test data
    // Act - Execute function
    // Assert - Verify results
  })
})
```

### Test Data Factories
- Use factories for consistent test data
- Mock TikTok Shop API responses
- Create realistic order scenarios (50-500+ orders)

### Critical Test Cases
- **High Volume**: Test 500+ orders/day scenarios
- **Error Handling**: Test API failures and retries
- **Webhook Processing**: Test signature verification
- **Rate Limiting**: Test API rate limit handling

## E2E Testing Rules

### Playwright Configuration
- Test in multiple browsers (Chrome, Firefox, Safari)
- Use realistic test data for TikTok Shop integration
- Mock external APIs to avoid rate limits

### Test Scenarios
- Creator onboarding flow (<2 minutes)
- Order processing pipeline
- Fulfillment status updates
- Payment processing with Stripe

## Performance Testing
- Load test for 500+ orders/day capacity
- Webhook processing under high load
- Database query performance

---
*Referenced by main .q-rules.md for testing-specific guidance*
