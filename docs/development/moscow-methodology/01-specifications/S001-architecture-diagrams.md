# S001: CreatorFlow Architecture Diagrams (MoSCoW Implementation)

## 🏗️ Overview

This document provides comprehensive architecture diagrams organized by MoSCoW priorities, showing the technical implementation roadmap for CreatorFlow's TikTok Shop fulfillment automation platform.

## 🎯 Must Have Architecture (MVP)

### Core System Architecture
```mermaid
graph TB
    subgraph "MUST HAVE - MVP Core"
        subgraph "External APIs"
            TikTok[TikTok Shop API<br/>OAuth + Webhooks]
            Stripe[Stripe API<br/>Subscriptions]
            Shippo[Shippo API<br/>Basic Labels]
        end

        subgraph "CreatorFlow Platform"
            Auth[Supabase Auth<br/>Magic Links]
            API[Next.js API Routes<br/>Webhook Handlers]
            DB[(PostgreSQL<br/>Core Schema)]
            UI[React Dashboard<br/>Order Management]
        end

        subgraph "Core Data Flow"
            TikTok -->|1. Order Webhook| API
            API -->|2. Save Order| DB
            API -->|3. Generate Label| Shippo
            Shippo -->|4. Return Label| API
            API -->|5. Update Status| TikTok
            UI -->|6. Display Status| DB
        end
    end

    style TikTok fill:#ff6b6b,stroke:#d63031
    style Auth fill:#74b9ff,stroke:#0984e3
    style API fill:#55a3ff,stroke:#2d3436
    style DB fill:#fdcb6e,stroke:#e17055
    style UI fill:#6c5ce7,stroke:#5f3dc4
```

### MVP Database Schema
```mermaid
erDiagram
    users ||--|| profiles : has
    users ||--o{ tiktok_shops : owns
    tiktok_shops ||--o{ orders : receives
    orders ||--|| shipments : has
    users ||--|| subscriptions : has

    users {
        uuid id PK
        string email
        timestamp created_at
        string subscription_status
    }

    profiles {
        uuid user_id FK
        string business_name
        json settings
    }

    tiktok_shops {
        uuid id PK
        uuid user_id FK
        string shop_id
        string access_token
        string webhook_url
        boolean active
    }

    orders {
        uuid id PK
        uuid shop_id FK
        string tiktok_order_id
        string status
        decimal total_amount
        json shipping_address
        timestamp created_at
    }

    shipments {
        uuid id PK
        uuid order_id FK
        string carrier
        string tracking_number
        string label_url
        string status
    }

    subscriptions {
        uuid id PK
        uuid user_id FK
        string stripe_subscription_id
        string plan_name
        string status
        timestamp current_period_end
    }
```

---

## 🚀 Should Have Architecture (Growth Features)

### Enhanced System Architecture
```mermaid
graph TB
    subgraph "SHOULD HAVE - Growth Features"
        subgraph "Multi-Carrier Integration"
            Shippo[Shippo API]
            EasyPost[EasyPost API]
            ShipStation[ShipStation API]
            RateEngine[Rate Shopping Engine]
        end

        subgraph "Analytics Engine"
            Analytics[Analytics Service]
            Metrics[(Metrics Database)]
            Reports[Report Generator]
            Dashboard[Analytics Dashboard]
        end

        subgraph "Enhanced Automation"
            Queue[Job Queue<br/>Bull/Redis]
            Scheduler[Cron Scheduler]
            Notifications[Email/SMS Service]
            BulkProcessor[Bulk Operations]
        end

        subgraph "Core Platform"
            API[API Layer]
            DB[(Main Database)]
        end

        API --> Queue
        Queue --> RateEngine
        RateEngine --> Shippo
        RateEngine --> EasyPost
        RateEngine --> ShipStation
        
        API --> Analytics
        Analytics --> Metrics
        Analytics --> Reports
        Reports --> Dashboard

        Queue --> BulkProcessor
        Scheduler --> Queue
        API --> Notifications
    end

    style RateEngine fill:#00b894,stroke:#00a085
    style Analytics fill:#e84393,stroke:#d63031
    style Queue fill:#fdcb6e,stroke:#e17055
    style BulkProcessor fill:#a29bfe,stroke:#6c5ce7
```

### Enhanced Data Model
```mermaid
erDiagram
    orders ||--o{ order_items : contains
    orders ||--o{ tracking_events : has
    shipments ||--o{ shipping_rates : compared
    users ||--o{ analytics_events : generates
    users ||--o{ notifications : receives

    order_items {
        uuid id PK
        uuid order_id FK
        string product_name
        integer quantity
        decimal price
    }

    tracking_events {
        uuid id PK
        uuid order_id FK
        string event_type
        string description
        timestamp occurred_at
    }

    shipping_rates {
        uuid id PK
        uuid shipment_id FK
        string carrier
        string service_type
        decimal rate
        integer transit_days
        boolean selected
    }

    analytics_events {
        uuid id PK
        uuid user_id FK
        string event_type
        json properties
        timestamp created_at
    }

    notifications {
        uuid id PK
        uuid user_id FK
        string type
        string title
        string message
        boolean read
        timestamp created_at
    }
```

---

## 🌟 Could Have Architecture (Enhancement Features)

### Advanced Platform Architecture
```mermaid
graph TB
    subgraph "COULD HAVE - Advanced Features"
        subgraph "Multi-Platform Integration"
            Instagram[Instagram Shopping API]
            Shopify[Shopify API]
            Amazon[Amazon MWS API]
            Etsy[Etsy API]
        end

        subgraph "AI/ML Services"
            Forecasting[Inventory Forecasting ML]
            Optimization[Route Optimization AI]
            Fraud[Fraud Detection ML]
            Pricing[Dynamic Pricing AI]
        end

        subgraph "Enterprise Features"
            WhiteLabel[White-label Service]
            MultiTenant[Multi-tenant Manager]
            SSO[Enterprise SSO]
            Audit[Audit Logging]
        end

        subgraph "Advanced Analytics"
            DataWarehouse[(Data Warehouse)]
            ETL[ETL Pipeline]
            BI[Business Intelligence]
            CustomReports[Custom Reporting]
        end

        subgraph "Core Platform"
            API[Enhanced API Gateway]
            Cache[Redis Cache Layer]
            Search[Elasticsearch]
        end

        API --> Cache
        API --> Search
        ETL --> DataWarehouse
        DataWarehouse --> BI
        BI --> CustomReports
        
        Forecasting --> API
        Optimization --> API
        Fraud --> API
        Pricing --> API
    end

    style Forecasting fill:#00cec9,stroke:#00b894
    style WhiteLabel fill:#fd79a8,stroke:#e84393
    style DataWarehouse fill:#fdcb6e,stroke:#f39c12
    style Search fill:#a29bfe,stroke:#6c5ce7
```

### Advanced Data Architecture
```mermaid
erDiagram
    users ||--o{ teams : manages
    teams ||--o{ team_members : contains
    orders ||--o{ returns : may_have
    products ||--o{ inventory_forecasts : has
    shipments ||--o{ route_optimizations : uses

    teams {
        uuid id PK
        uuid owner_id FK
        string name
        json permissions
        timestamp created_at
    }

    team_members {
        uuid id PK
        uuid team_id FK
        uuid user_id FK
        string role
        json permissions
    }

    returns {
        uuid id PK
        uuid order_id FK
        string reason
        string status
        decimal refund_amount
        timestamp created_at
    }

    inventory_forecasts {
        uuid id PK
        uuid product_id FK
        integer predicted_demand
        date forecast_date
        decimal confidence_score
        json ml_metadata
    }

    route_optimizations {
        uuid id PK
        uuid shipment_id FK
        json route_data
        decimal cost_savings
        integer time_savings
        timestamp optimized_at
    }
```

---

## 🚫 Won't Have Architecture (Future Scope)

### Excluded Features Architecture
```mermaid
graph TB
    subgraph "WON'T HAVE - Future Roadmap"
        subgraph "International Expansion"
            Customs[Customs Integration]
            Currency[Multi-Currency]
            Tax[International Tax]
            Compliance[Global Compliance]
        end

        subgraph "Manufacturing Integration"
            Suppliers[Supplier APIs]
            Production[Production Planning]
            Quality[Quality Control]
            Sourcing[Smart Sourcing]
        end

        subgraph "Blockchain/Web3"
            Crypto[Crypto Payments]
            NFT[NFT Integration]
            Smart[Smart Contracts]
            DeFi[DeFi Integration]
        end

        subgraph "Advanced AI"
            ChatBot[AI Customer Service]
            Voice[Voice Commands]
            Computer[Computer Vision]
            NLP[Natural Language Processing]
        end
    end

    style Customs fill:#ddd,stroke:#999
    style Suppliers fill:#ddd,stroke:#999
    style Crypto fill:#ddd,stroke:#999
    style ChatBot fill:#ddd,stroke:#999
```

---

## 🔄 Implementation Phases

### Phase 1: Must Have (Weeks 1-12)
```mermaid
gantt
    title MVP Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Core Integration
    TikTok OAuth Setup    :done, oauth, 2024-01-01, 2024-01-14
    Webhook Handler       :done, webhook, 2024-01-15, 2024-01-28
    Basic Order Processing:active, orders, 2024-01-29, 2024-02-11
    Shipping Integration  :shipping, 2024-02-12, 2024-02-25
    section User Management
    Authentication        :done, auth, 2024-01-01, 2024-01-07
    Basic Dashboard       :dashboard, 2024-02-05, 2024-02-18
    Stripe Integration    :stripe, 2024-02-19, 2024-03-03
    section Testing & Launch
    Integration Testing   :testing, 2024-03-04, 2024-03-17
    Beta Launch          :beta, 2024-03-18, 2024-03-31
```

### Phase 2: Should Have (Weeks 13-24)
```mermaid
gantt
    title Growth Features Timeline
    dateFormat  YYYY-MM-DD
    section Enhanced Automation
    Multi-Carrier Support :carriers, 2024-04-01, 2024-04-21
    Rate Shopping Engine  :rates, 2024-04-22, 2024-05-05
    Bulk Operations      :bulk, 2024-05-06, 2024-05-19
    section Analytics
    Analytics Engine     :analytics, 2024-04-01, 2024-04-28
    Dashboard Enhancement:dash2, 2024-04-29, 2024-05-12
    Reporting System     :reports, 2024-05-13, 2024-05-26
    section User Experience
    Onboarding Flow      :onboard, 2024-05-06, 2024-05-19
    Mobile Optimization  :mobile, 2024-05-20, 2024-06-02
    Notification System  :notify, 2024-06-03, 2024-06-16
```

---

## 📊 Architecture Decision Records (ADRs)

### ADR-001: Database Choice
- **Decision**: PostgreSQL via Supabase
- **Rationale**: ACID compliance, JSON support, built-in auth
- **MoSCoW**: Must Have
- **Impact**: Foundation for all data operations

### ADR-002: API Architecture
- **Decision**: Next.js API Routes with tRPC
- **Rationale**: Type safety, performance, developer experience
- **MoSCoW**: Must Have
- **Impact**: Core platform communication

### ADR-003: Queue System
- **Decision**: Redis + Bull for job processing
- **Rationale**: Reliability, scalability, monitoring
- **MoSCoW**: Should Have
- **Impact**: Async processing capabilities

### ADR-004: Multi-Platform Strategy
- **Decision**: Plugin architecture for platform integrations
- **Rationale**: Extensibility, maintainability
- **MoSCoW**: Could Have
- **Impact**: Future platform expansion

---

## 🔗 Related Documentation

- [Epic Breakdown](S002-epic-breakdown.md) - Feature epics by MoSCoW category
- [Technical Specifications](S003-technical-specifications.md) - Detailed implementation specs
- [Implementation Roadmap](../02-implementation/I001-DRAFT-roadmap.md) - Development timeline

---

*These architecture diagrams guide the technical implementation based on MoSCoW prioritization and will be updated as requirements evolve.*
