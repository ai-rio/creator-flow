# CreatorFlow Documentation

CreatorFlow is a TikTok creator fulfillment platform built on QuoteKit's proven infrastructure, enabling seamless monetization of creator content through automated order processing and shipping.

## 📚 Documentation Structure

### **Architecture**
- [System Architecture](./architecture/system-architecture.md) - CreatorFlow technical architecture
- [TikTok Integration](./architecture/tiktok-integration.md) - TikTok API integration patterns
- [Database Schema](./architecture/database-schema.md) - Creator-specific data models

### **API Documentation**
- [TikTok API](./api/tiktok-api.md) - TikTok Business API integration
- [Shipping APIs](./api/shipping-apis.md) - Multi-carrier shipping integration
- [Analytics API](./api/analytics-api.md) - Performance tracking endpoints

### **Components**
- [MDX Components](./components/mdx-components.md) - Creator content components
- [Email Templates](./components/email-templates.md) - React Email templates
- [Analytics Dashboard](./components/analytics-dashboard.md) - Performance visualization

### **Development**
- [Getting Started](./development/getting-started.md) - Development setup
- [Testing Guide](./development/testing.md) - Testing strategies
- [Deployment](./development/deployment.md) - Production deployment

### **Features**
- [Creator Onboarding](./features/creator-onboarding.md) - Creator signup flow
- [Order Processing](./features/order-processing.md) - Automated fulfillment
- [Performance Analytics](./features/analytics.md) - Creator performance tracking
- [Payout System](./features/payouts.md) - Weekly payout processing

## 🚀 Quick Start

1. **Setup Development Environment**
   ```bash
   # Install dependencies
   bun install
   
   # Setup CreatorFlow environment
   cp .env.creatorflow.example .env.local
   
   # Start development server
   bun run dev:creatorflow
   ```

2. **Configure TikTok Integration**
   - Set up TikTok Business API credentials
   - Configure webhook endpoints
   - Test creator authentication flow

3. **Deploy to Production**
   ```bash
   # Deploy CreatorFlow instance
   ./scripts/deploy-creatorflow.sh
   ```

## 🏗️ Built on QuoteKit Infrastructure

CreatorFlow leverages QuoteKit's enterprise-grade foundation:

- **Development Tools**: Jest, Playwright, ESLint, Husky, Gitleaks
- **Production Deployment**: Fly.io with health monitoring
- **Code Quality**: Automated testing and validation
- **Security**: Comprehensive security scanning and headers

## 📊 Key Metrics

- **Performance**: Real-time TikTok metrics tracking
- **Revenue**: Automated commission calculations
- **Shipping**: Multi-provider rate optimization
- **Analytics**: Creator performance insights

## 🔗 Related Documentation

- [QuoteKit Main Documentation](../README.md)
- [Development Tools](../development/DEVELOPMENT_TOOLS.md)
- [Production Deployment](../PRODUCTION_DEPLOYMENT_SUMMARY.md)
