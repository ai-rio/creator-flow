# Architecture Overview

## 🏗️ System Architecture

CreatorFlow is designed as a modern, scalable SaaS platform for TikTok Shop fulfillment automation. The architecture follows microservices principles with a focus on reliability, performance, and maintainability.

## 🎯 Architecture Principles

### Core Design Principles
- **Scalability**: Handle growth from 50 to 500+ orders per day
- **Reliability**: 99.9% uptime with automated failover
- **Security**: Zero-trust architecture with end-to-end encryption
- **Performance**: Sub-200ms API response times
- **Maintainability**: Clean code with comprehensive testing

### Technology Decisions
- **Next.js 15**: Full-stack React framework with App Router
- **Supabase**: PostgreSQL database with built-in auth and real-time
- **Stripe**: Payment processing with subscription management
- **Vercel/Fly.io**: Edge deployment for global performance
- **TypeScript**: Type safety across the entire stack

## 🌐 High-Level Architecture

```mermaid
graph TB
    subgraph "External Platforms"
        TikTok[TikTok Shop API]
        Shippo[Shipping APIs<br/>Shippo, EasyPost]
        Stripe[Stripe API]
    end

    subgraph "CreatorFlow Platform"
        WebApp[Next.js Web App]
        API[API Routes]
        Auth[Supabase Auth]
        DB[(PostgreSQL)]
        Queue[Job Queue]
    end

    subgraph "Infrastructure"
        CDN[Vercel Edge Network]
        Monitor[Monitoring & Logs]
        Backup[Automated Backups]
    end

    TikTok -->|Webhooks| API
    API -->|Process Orders| Queue
    Queue -->|Generate Labels| Shippo
    WebApp -->|User Interface| Auth
    API -->|Data Layer| DB
    Stripe -->|Billing Events| API
    CDN -->|Global Delivery| WebApp
```

## 🔧 Component Architecture

### Frontend Layer
```
┌─────────────────────────────────────┐
│           Next.js App Router        │
├─────────────────────────────────────┤
│  Pages & Layouts  │  API Routes     │
│  ├── Dashboard    │  ├── Webhooks   │
│  ├── Orders       │  ├── TikTok     │
│  ├── Analytics    │  ├── Shipping   │
│  └── Settings     │  └── Stripe     │
├─────────────────────────────────────┤
│         Component Library           │
│  ├── UI Components (shadcn/ui)      │
│  ├── Business Components           │
│  └── Layout Components             │
├─────────────────────────────────────┤
│         State Management            │
│  ├── React Query (Server State)    │
│  ├── Zustand (Client State)        │
│  └── Context API (Theme, Auth)     │
└─────────────────────────────────────┘
```

### Backend Layer
```
┌─────────────────────────────────────┐
│          API Layer                  │
├─────────────────────────────────────┤
│  Route Handlers  │  Middleware      │
│  ├── Orders      │  ├── Auth        │
│  ├── Webhooks    │  ├── CORS        │
│  ├── Analytics   │  ├── Rate Limit  │
│  └── Admin       │  └── Validation  │
├─────────────────────────────────────┤
│         Business Logic              │
│  ├── Order Processing              │
│  ├── Shipping Integration          │
│  ├── Payment Processing            │
│  └── Analytics Engine              │
├─────────────────────────────────────┤
│          Data Layer                 │
│  ├── Supabase Client               │
│  ├── Database Queries              │
│  ├── Real-time Subscriptions       │
│  └── File Storage                  │
└─────────────────────────────────────┘
```

## 🔄 Data Flow Architecture

### Order Processing Flow
```mermaid
sequenceDiagram
    participant TikTok as TikTok Shop
    participant Webhook as Webhook Handler
    participant Queue as Job Queue
    participant DB as Database
    participant Shipping as Shipping API
    participant User as Dashboard

    TikTok->>Webhook: New Order Event
    Webhook->>DB: Save Order
    Webhook->>Queue: Queue Processing Job
    Queue->>Shipping: Generate Label
    Shipping->>Queue: Return Tracking
    Queue->>DB: Update Order Status
    Queue->>TikTok: Mark Fulfilled
    DB->>User: Real-time Update
```

### User Authentication Flow
```mermaid
sequenceDiagram
    participant User as User
    participant App as Next.js App
    participant Supabase as Supabase Auth
    participant DB as Database

    User->>App: Login Request
    App->>Supabase: Authenticate
    Supabase->>App: JWT Token
    App->>DB: Fetch User Data
    DB->>App: User Profile
    App->>User: Dashboard Access
```

## 🗄️ Database Architecture

### Core Entities
```sql
-- Users and Authentication
users (id, email, created_at, subscription_status)
profiles (user_id, business_name, settings, preferences)

-- TikTok Shop Integration
tiktok_shops (id, user_id, shop_id, access_token, webhook_url)
products (id, shop_id, tiktok_product_id, name, sku, price)

-- Order Management
orders (id, shop_id, tiktok_order_id, status, total_amount, created_at)
order_items (id, order_id, product_id, quantity, price)

-- Shipping Integration
shipments (id, order_id, carrier, tracking_number, label_url, status)
shipping_addresses (id, order_id, name, address_line1, city, state, zip)

-- Analytics and Reporting
analytics_events (id, user_id, event_type, properties, timestamp)
revenue_metrics (id, user_id, date, orders_count, revenue, profit_margin)
```

### Relationships
```mermaid
erDiagram
    users ||--|| profiles : has
    users ||--o{ tiktok_shops : owns
    tiktok_shops ||--o{ products : contains
    tiktok_shops ||--o{ orders : receives
    orders ||--o{ order_items : contains
    orders ||--|| shipments : has
    orders ||--|| shipping_addresses : ships_to
    users ||--o{ analytics_events : generates
    users ||--o{ revenue_metrics : tracks
```

## 🔐 Security Architecture

### Authentication & Authorization
- **Supabase Auth**: JWT-based authentication with refresh tokens
- **Row Level Security (RLS)**: Database-level access control
- **API Key Management**: Secure storage of third-party API keys
- **Role-Based Access**: Admin, user, and read-only access levels

### Data Protection
- **Encryption at Rest**: AES-256 encryption for sensitive data
- **Encryption in Transit**: TLS 1.3 for all communications
- **PII Handling**: GDPR-compliant data processing
- **Audit Logging**: Comprehensive security event logging

### API Security
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **Webhook Verification**: Cryptographic signature validation
- **CORS Configuration**: Strict origin validation
- **Input Validation**: Zod schemas for all inputs

## 📊 Performance Architecture

### Caching Strategy
```
┌─────────────────────────────────────┐
│            CDN Layer                │
│  ├── Static Assets (Vercel Edge)    │
│  ├── API Responses (Redis)          │
│  └── Database Queries (Supabase)    │
├─────────────────────────────────────┤
│         Application Layer           │
│  ├── React Query (Client Cache)     │
│  ├── Next.js ISR (Page Cache)       │
│  └── Service Worker (Offline)       │
├─────────────────────────────────────┤
│          Database Layer             │
│  ├── Connection Pooling             │
│  ├── Query Optimization             │
│  └── Read Replicas                  │
└─────────────────────────────────────┘
```

### Scalability Patterns
- **Horizontal Scaling**: Stateless API design for easy scaling
- **Database Optimization**: Proper indexing and query optimization
- **Async Processing**: Job queues for heavy operations
- **Edge Computing**: Global CDN for reduced latency

## 🚀 Deployment Architecture

### Development Environment
```
Developer Machine
├── Next.js Dev Server (localhost:3000)
├── Supabase Local (localhost:54321)
├── Stripe CLI (webhook forwarding)
└── ngrok (external webhook testing)
```

### Production Environment
```
Vercel/Fly.io
├── Next.js Application (Edge Functions)
├── Supabase Production (Global)
├── Stripe Live Mode (Webhooks)
└── Monitoring (PostHog, Sentry)
```

### CI/CD Pipeline
```mermaid
graph LR
    Dev[Developer] -->|Push| GitHub[GitHub Repo]
    GitHub -->|Trigger| Actions[GitHub Actions]
    Actions -->|Test| Tests[Unit & E2E Tests]
    Tests -->|Deploy| Staging[Staging Environment]
    Staging -->|Approve| Production[Production Deploy]
    Production -->|Monitor| Alerts[Monitoring & Alerts]
```

## 🔍 Monitoring & Observability

### Application Monitoring
- **Performance**: Core Web Vitals and API response times
- **Errors**: Real-time error tracking with Sentry
- **Usage**: User behavior analytics with PostHog
- **Business Metrics**: Order volume, revenue, and conversion rates

### Infrastructure Monitoring
- **Uptime**: Service availability monitoring
- **Database**: Query performance and connection health
- **API**: Rate limiting and webhook delivery status
- **Security**: Failed authentication attempts and suspicious activity

## 🔄 Integration Architecture

### TikTok Shop Integration
```typescript
interface TikTokShopIntegration {
  authentication: 'OAuth 2.0';
  webhooks: ['order.created', 'order.updated', 'order.cancelled'];
  apis: ['orders', 'products', 'fulfillment'];
  rateLimits: '1000 requests/minute';
}
```

### Shipping Provider Integration
```typescript
interface ShippingIntegration {
  providers: ['Shippo', 'EasyPost', 'ShipStation'];
  features: ['label_generation', 'tracking', 'rate_shopping'];
  webhooks: ['shipment.created', 'shipment.delivered'];
}
```

### Payment Processing
```typescript
interface StripeIntegration {
  products: ['subscriptions', 'one_time_payments'];
  webhooks: ['invoice.paid', 'subscription.updated'];
  features: ['customer_portal', 'usage_billing'];
}
```

## 📈 Scalability Considerations

### Current Capacity
- **Orders**: 10,000+ orders per day
- **Users**: 1,000+ concurrent users
- **API**: 100,000+ requests per hour
- **Database**: 1TB+ data storage

### Growth Planning
- **Horizontal Scaling**: Auto-scaling based on load
- **Database Sharding**: Partition by user or region
- **Microservices**: Split into domain-specific services
- **Global Deployment**: Multi-region deployment strategy

---

## 🔗 Related Documentation

- [Database Schema](database/README.md) - Detailed database design
- [API Design](api/README.md) - API endpoints and specifications
- [Security Architecture](security/README.md) - Security implementation details
- [Performance Optimization](performance/README.md) - Performance tuning guide

---

*This architecture documentation is maintained alongside code changes and reviewed quarterly for optimization opportunities.*
