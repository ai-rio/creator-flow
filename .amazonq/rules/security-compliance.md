# Security Compliance

## Mandatory Security Rules

- **Environment variables** for all sensitive data
- **Input validation** with Zod schemas for all inputs
- **CORS configuration** for API routes
- **SQL injection prevention** via parameterized queries
- **Rate limiting** on public API endpoints
- **DO NOT include secret keys** directly in code unless explicitly requested

## Data Protection

- **Never commit secrets** - always use environment variables
- Encrypt sensitive data at rest (AES-256)
- Use TLS 1.3 for all communications
- Implement proper authentication and authorization
- Follow GDPR/CCPA compliance for PII handling

## API Security

- Webhook signature verification for TikTok Shop and Stripe
- JWT token validation for authenticated requests
- Implement proper session management
- Use HTTPS endpoints with valid SSL certificates
- Monitor and log security events
