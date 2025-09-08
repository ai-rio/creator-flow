# TikTok Integration Standards

## TikTok Shop API Compliance

- **Webhook Verification**: Always verify TikTok webhook signatures before processing
- **Rate Limiting**: Respect TikTok Shop API limits (1000 requests/minute)
- **Error Handling**: Implement graceful handling of API failures with retry logic
- **Order Sync**: Maintain bidirectional order status synchronization
- **Security**: Encrypt TikTok access tokens at rest using AES-256

## Integration Requirements

- Implement proper OAuth 2.0 flow for TikTok Shop authorization
- Use exponential backoff for API retry strategies
- Log all API interactions for audit compliance
- Sanitize PII data in logs and error messages
- Support multiple TikTok shops per CreatorFlow user

## Testing Requirements

- Comprehensive webhook and API testing
- Mock TikTok Shop responses for development
- Test rate limiting and error scenarios
- Validate order processing workflows end-to-end
