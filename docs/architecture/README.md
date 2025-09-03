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
        Resend[Resend Email API]
        PostHog[PostHog Analytics]
    end
    
    subgraph "CreatorFlow Platform"
        subgraph "Frontend Layer"
            UI[Next.js UI<br/>React 19 + TypeScript]
            Components[Shadcn/UI Components<br/>Tailwind CSS]
        end
        
        subgraph "API Layer"
            Routes[API Routes<br/>Next.js App Router]
            Middleware[Auth Middleware<br/>Rate Limiting]
            Webhooks[Webhook Handlers<br/>TikTok + Stripe]
        end
        
        subgraph "Business Logic"
            OrderEngine[Order Processing Engine]
            FulfillmentEngine[Fulfillment Automation]
            SyncEngine[Product Sync Engine]
            BillingEngine[Subscription Billing]
        end
        
        subgraph "Data Layer"
            Supabase[(Supabase PostgreSQL<br/>RLS + Edge Functions)]
            Cache[Redis Cache<br/>Rate Limiting]
        end
    end
    
    subgraph "Infrastructure"
        CDN[Vercel Edge Network]
        Monitoring[Error Tracking<br/>Performance Monitoring]
    end
    
    %% Frontend connections
    UI --> Components
    UI --> Routes
    
    %% API Layer connections
    Routes --> Middleware
    Routes --> Webhooks
    Routes --> OrderEngine
    Routes --> FulfillmentEngine
    Routes --> SyncEngine
    Routes --> BillingEngine
    
    %% Business Logic connections
    OrderEngine --> Supabase
    FulfillmentEngine --> Supabase
    SyncEngine --> Supabase
    BillingEngine --> Supabase
    
    %% External API connections
    OrderEngine --> TikTok
    FulfillmentEngine --> Shippo
    SyncEngine --> TikTok
    BillingEngine --> Stripe
    Routes --> Resend
    Routes --> PostHog
    
    %% Infrastructure connections
    UI --> CDN
    Routes --> Cache
    Routes --> Monitoring
    
    %% Styling
    classDef external fill:#ff9999
    classDef frontend fill:#99ccff
    classDef api fill:#99ff99
    classDef business fill:#ffcc99
    classDef data fill:#cc99ff
    classDef infra fill:#ffff99
    
    class TikTok,Shippo,Stripe,Resend,PostHog external
    class UI,Components frontend
    class Routes,Middleware,Webhooks api
    class OrderEngine,FulfillmentEngine,SyncEngine,BillingEngine business
    class Supabase,Cache data
    class CDN,Monitoring infra
```

## 🔄 Data Flow Architecture

### Order Processing Flow

```mermaid
sequenceDiagram
    participant Creator as Creator
    participant CF as CreatorFlow
    participant TS as TikTok Shop
    participant Ship as Shipping API
    participant DB as Supabase
    
    Note over Creator,DB: Order Processing Workflow
    
    TS->>CF: Webhook: New Order
    CF->>DB: Store Order Data
    CF->>Creator: Notification: New Order
    
    Creator->>CF: Review & Approve Order
    CF->>Ship: Generate Shipping Label
    Ship->>CF: Return Label & Tracking
    CF->>DB: Update Order Status
    CF->>TS: Update Fulfillment Status
    CF->>Creator: Notification: Order Shipped
    
    Note over Creator,DB: Real-time Updates
    Ship->>CF: Webhook: Delivery Update
    CF->>DB: Update Tracking Status
    CF->>TS: Sync Delivery Status
    CF->>Creator: Notification: Order Delivered
```

### Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant User as Creator
    participant CF as CreatorFlow
    participant SB as Supabase Auth
    participant TS as TikTok Shop
    participant Stripe as Stripe
    
    Note over User,Stripe: Creator Onboarding Flow
    
    User->>CF: Sign Up
    CF->>SB: Create User Account
    SB->>CF: User Created
    
    User->>CF: Connect TikTok Shop
    CF->>TS: OAuth Authorization
    TS->>CF: Access Token
    CF->>SB: Store Shop Connection
    
    User->>CF: Select Subscription Plan
    CF->>Stripe: Create Customer & Subscription
    Stripe->>CF: Subscription Active
    CF->>SB: Update User Subscription
    
    Note over User,Stripe: Ongoing Operations
    CF->>SB: Check User Permissions (RLS)
    CF->>TS: API Calls (with stored token)
    CF->>Stripe: Usage-based Billing Updates
```

## 🗄️ Database Architecture

### Core Database Schema

```mermaid
erDiagram
    USERS ||--o{ SHOPS : owns
    USERS ||--o{ SUBSCRIPTIONS : has
    SHOPS ||--o{ ORDERS : contains
    SHOPS ||--o{ PRODUCTS : manages
    ORDERS ||--o{ ORDER_ITEMS : includes
    ORDERS ||--o{ SHIPMENTS : generates
    PRODUCTS ||--o{ ORDER_ITEMS : referenced_in
    
    USERS {
        uuid id PK
        string email UK
        string name
        string avatar_url
        jsonb metadata
        timestamp created_at
        timestamp updated_at
    }
    
    SHOPS {
        uuid id PK
        uuid user_id FK
        string tiktok_shop_id UK
        string shop_name
        string access_token
        string refresh_token
        timestamp token_expires_at
        string shop_region
        boolean is_active
        timestamp connected_at
        timestamp last_sync_at
    }
    
    ORDERS {
        uuid id PK
        uuid shop_id FK
        string tiktok_order_id UK
        string order_status
        decimal total_amount
        string currency
        jsonb customer_info
        jsonb shipping_address
        timestamp order_date
        timestamp created_at
        timestamp updated_at
    }
    
    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        string tiktok_product_id
        string product_name
        integer quantity
        decimal unit_price
        decimal total_price
        jsonb product_variant
    }
    
    PRODUCTS {
        uuid id PK
        uuid shop_id FK
        string tiktok_product_id UK
        string product_name
        string product_status
        decimal price
        integer inventory_quantity
        jsonb product_images
        jsonb product_attributes
        timestamp last_synced_at
        timestamp created_at
        timestamp updated_at
    }
    
    SHIPMENTS {
        uuid id PK
        uuid order_id FK
        string tracking_number
        string carrier
        string shipping_status
        jsonb shipping_label_url
        decimal shipping_cost
        timestamp shipped_at
        timestamp delivered_at
        timestamp created_at
    }
    
    SUBSCRIPTIONS {
        uuid id PK
        uuid user_id FK
        string stripe_customer_id
        string stripe_subscription_id
        string plan_name
        string status
        decimal monthly_price
        integer order_limit
        timestamp current_period_start
        timestamp current_period_end
        timestamp created_at
        timestamp updated_at
    }
```

## 🔐 Security Architecture

### Security Layers

```mermaid
graph TB
    subgraph "Security Layers"
        subgraph "Network Security"
            WAF[Web Application Firewall]
            DDoS[DDoS Protection]
            SSL[SSL/TLS Encryption]
        end
        
        subgraph "Application Security"
            Auth[Supabase Authentication]
            RLS[Row Level Security]
            RBAC[Role-Based Access Control]
            RateLimit[Rate Limiting]
        end
        
        subgraph "Data Security"
            Encryption[Data Encryption at Rest]
            Backup[Encrypted Backups]
            Audit[Audit Logging]
        end
        
        subgraph "API Security"
            JWT[JWT Token Validation]
            CORS[CORS Configuration]
            Webhook[Webhook Signature Verification]
            APIKey[API Key Management]
        end
    end
    
    subgraph "External Integrations"
        TikTokAPI[TikTok Shop API]
        StripeAPI[Stripe API]
        ShippingAPI[Shipping APIs]
    end
    
    %% Security flow
    WAF --> Auth
    Auth --> RLS
    RLS --> JWT
    JWT --> APIKey
    APIKey --> TikTokAPI
    APIKey --> StripeAPI
    APIKey --> ShippingAPI
    
    %% Data protection
    Encryption --> Backup
    Backup --> Audit
    
    %% Rate limiting
    RateLimit --> CORS
    CORS --> Webhook
```

## 📊 Performance Architecture

### Caching Strategy

```mermaid
graph LR
    subgraph "Caching Layers"
        CDN[Vercel Edge CDN<br/>Static Assets]
        Redis[Redis Cache<br/>API Responses]
        Browser[Browser Cache<br/>Client-side]
        Database[Supabase Cache<br/>Query Results]
    end
    
    subgraph "Performance Optimizations"
        ISR[Incremental Static Regeneration]
        Streaming[React Streaming]
        Prefetch[Link Prefetching]
        Compression[Gzip/Brotli Compression]
    end
    
    CDN --> Browser
    Redis --> Database
    ISR --> Streaming
    Streaming --> Prefetch
    Prefetch --> Compression
```

### Scalability Targets

| Metric | Target | Current | Strategy |
|--------|--------|---------|----------|
| **Orders/Day** | 500+ per creator | 50 | Horizontal scaling, caching |
| **API Response Time** | <200ms | <100ms | Edge deployment, Redis cache |
| **Database Queries** | <50ms | <30ms | Optimized indexes, connection pooling |
| **Webhook Processing** | <5s | <2s | Queue-based processing |
| **Concurrent Users** | 1000+ | 100 | Load balancing, CDN |

## 🚀 Deployment Architecture

### Multi-Environment Strategy

```mermaid
graph TB
    subgraph "Development"
        DevLocal[Local Development<br/>bun dev]
        DevDB[(Local Supabase)]
        DevStripe[Stripe Test Mode]
    end
    
    subgraph "Staging"
        StagingApp[Vercel Preview<br/>staging.creatorflow.com]
        StagingDB[(Supabase Staging)]
        StagingStripe[Stripe Test Mode]
    end
    
    subgraph "Production"
        ProdApp[Vercel Production<br/>creatorflow.com]
        ProdDB[(Supabase Production)]
        ProdStripe[Stripe Live Mode]
        ProdCDN[Global CDN]
    end
    
    DevLocal --> StagingApp
    StagingApp --> ProdApp
    
    DevDB --> StagingDB
    StagingDB --> ProdDB
    
    DevStripe --> StagingStripe
    StagingStripe --> ProdStripe
```

## 📈 Monitoring & Observability

### Monitoring Stack

```mermaid
graph TB
    subgraph "Application Monitoring"
        Vercel[Vercel Analytics<br/>Performance Metrics]
        PostHog[PostHog<br/>User Analytics]
        Sentry[Error Tracking<br/>Performance Monitoring]
    end
    
    subgraph "Infrastructure Monitoring"
        Supabase[Supabase Metrics<br/>Database Performance]
        Uptime[Uptime Monitoring<br/>Service Availability]
        Logs[Centralized Logging<br/>Application Logs]
    end
    
    subgraph "Business Metrics"
        Revenue[Stripe Dashboard<br/>Revenue Tracking]
        Orders[Order Processing<br/>Success Rates]
        Users[User Engagement<br/>Retention Metrics]
    end
    
    Vercel --> Sentry
    PostHog --> Users
    Supabase --> Logs
    Revenue --> Orders
```

## 🔄 Integration Patterns

### API Integration Architecture

```mermaid
graph TB
    subgraph "CreatorFlow Core"
        APIGateway[API Gateway<br/>Rate Limiting & Auth]
        EventBus[Event Bus<br/>Webhook Processing]
        JobQueue[Job Queue<br/>Background Processing]
    end
    
    subgraph "External APIs"
        TikTok[TikTok Shop API<br/>Orders, Products, Fulfillment]
        Shipping[Shipping APIs<br/>Shippo, EasyPost]
        Payment[Stripe API<br/>Subscriptions, Billing]
        Email[Resend API<br/>Transactional Emails]
    end
    
    APIGateway --> TikTok
    APIGateway --> Shipping
    APIGateway --> Payment
    APIGateway --> Email
    
    EventBus --> JobQueue
    JobQueue --> APIGateway
    
    TikTok -.->|Webhooks| EventBus
    Payment -.->|Webhooks| EventBus
    Shipping -.->|Webhooks| EventBus
```

## Related Documentation

- [Development Guide](../development/README.md) - Setup and development workflow
- [Business Model](../business/README.md) - Business context and objectives
- [TikTok Shop Integration](../integrations/tiktok-shop/01-specifications/S001-DRAFT-api-integration-specifications.md) - API integration specs
- [Security Overview](../security/README.md) - Detailed security implementation
- [MoSCoW Roadmap](../development/moscow-methodology/02-implementation/I001-DRAFT-roadmap.md) - Implementation priorities

---

*This architecture supports CreatorFlow's mission to scale TikTok Shop creators from 50 to 500+ orders per day through automated fulfillment processes.*
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
