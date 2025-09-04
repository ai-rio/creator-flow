# Localization Automation for CreatorFlow

## Overview

This guide covers modern localization automation strategies for CreatorFlow's international expansion, focusing on TikTok Shop's global markets and creator economy needs. Our approach combines next-intl's production-ready Next.js integration with Tolgee's superior developer experience and automation capabilities.

## Key Technologies & Tools

### Core i18n Libraries
- **next-intl** - Next.js 15 App Router native internationalization (Production)
- **@tolgee/react** - Developer-friendly in-context editing and CLI automation
- **react-i18next** - Alternative React integration (not recommended for this stack)
- **i18next** - Industry standard i18n framework (legacy compatibility)

### Automation Platforms
- **Tolgee Platform** - Developer-focused with in-context editing and CLI automation ⭐ **RECOMMENDED**
- **Crowdin** - Enterprise localization management with CI/CD integration
- **Lokalise** - Developer-focused platform with GitHub Actions
- **Phrase** - Advanced translation management with workflow automation
- **Transifex** - Agile localization with real-time collaboration

### CI/CD Integration
- **Tolgee CLI** - Streamlined command-line integration with `tolgee pull` automation ⭐ **RECOMMENDED**
- **GitHub Actions** - Automated translation workflows with Tolgee integration
- **Crowdin CLI** - Command-line integration for CI/CD pipelines
- **Lokalise CLI** - Continuous localization automation

## Hybrid Implementation Strategy

### 1. Foundation: next-intl for Production

**Primary Choice: next-intl**
```typescript
// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  // Next.js config
});
```

**Key Benefits:**
- Native Next.js 15 App Router support
- Server-side rendering optimization
- Type-safe translations
- Automatic route localization

### 2. Developer Experience: Tolgee Integration

**Hybrid Setup with Tolgee**
```typescript
// Install dependencies
npm install next-intl @tolgee/react

// Environment variables (.env.development.local)
NEXT_PUBLIC_TOLGEE_API_KEY=your_api_key
NEXT_PUBLIC_TOLGEE_API_URL=https://app.tolgee.io

// Provider setup
import { TolgeeProvider, Tolgee, DevTools } from '@tolgee/react';
import { NextIntlClientProvider } from 'next-intl';

const tolgee = Tolgee()
  .use(DevTools())
  .init({
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    defaultLanguage: 'en'
  });

// Wrap app for development
<TolgeeProvider tolgee={tolgee}>
  <NextIntlClientProvider locale={locale} messages={messages}>
    {children}
  </NextIntlClientProvider>
</TolgeeProvider>
```

**Key Benefits:**
- In-context editing during development
- CLI automation with `tolgee pull`
- Visual translation interface
- Seamless GitHub integration

### 3. Automation Platform Integration

**Tolgee CLI Automation (Recommended)**
```yaml
# .github/workflows/localization.yml
name: Tolgee Translation Sync
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM

jobs:
  sync-translations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Tolgee CLI
        run: npm install -g @tolgee/cli
      
      - name: Pull translations
        run: tolgee pull --project-id=${{ secrets.TOLGEE_PROJECT_ID }} --path ./src/i18n/locales
        env:
          TOLGEE_API_KEY: ${{ secrets.TOLGEE_API_KEY }}
          TOLGEE_API_URL: ${{ secrets.TOLGEE_API_URL }}
      
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: 'feat: update translations from Tolgee'
          title: 'Update translations'
          body: |
            Automated translation update from Tolgee Platform
            
            🤖 Generated with [Claude Code](https://claude.ai/code)
            
            Co-Authored-By: Claude <noreply@anthropic.com>
```

**Legacy Crowdin Integration (Alternative)**
```yaml
# .github/workflows/crowdin-sync.yml
name: Crowdin Sync
on:
  push:
    branches: [main]
  pull_request:

jobs:
  crowdin-upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: crowdin/github-action@v1
        with:
          upload_sources: true
          upload_translations: false
        env:
          CROWDIN_PROJECT_ID: ${{ secrets.CROWDIN_PROJECT_ID }}
          CROWDIN_PERSONAL_TOKEN: ${{ secrets.CROWDIN_PERSONAL_TOKEN }}
```

### 4. File Structure

**Enhanced Directory Organization for Hybrid Approach:**
```
src/
├── i18n/
│   ├── routing.ts              # next-intl routing configuration
│   ├── request.ts              # Server-side i18n configuration  
│   ├── navigation.ts           # Localized navigation helpers
│   └── locales/
│       ├── en/                 # English (default locale)
│       │   ├── common.json     # Navigation, buttons, labels
│       │   ├── auth.json       # Login, signup, validation messages
│       │   ├── dashboard.json  # Creator dashboard interface
│       │   ├── orders.json     # Order management workflow
│       │   ├── shipping.json   # Fulfillment and shipping
│       │   ├── analytics.json  # Performance metrics and reporting
│       │   ├── emails.json     # Email templates and notifications
│       │   └── errors.json     # Error messages and validation
│       ├── es/                 # Spanish (Tier 2 market)
│       │   ├── common.json
│       │   ├── auth.json
│       │   └── dashboard.json  # Core features only
│       ├── pt/                 # Portuguese (Tier 2 market) 
│       │   ├── common.json
│       │   ├── auth.json
│       │   └── dashboard.json
│       ├── zh/                 # Chinese (Tier 3 market)
│       │   ├── common.json     # Essential UI only
│       │   └── auth.json
│       └── ja/                 # Japanese (Tier 3 market)
│           ├── common.json     # Essential UI only
│           └── auth.json
├── middleware.ts               # next-intl middleware for routing
└── components/
    └── providers/
        └── LocalizationProvider.tsx  # Hybrid provider setup
```

### 5. Developer Workflow

**Daily Development Process:**
1. **In-Context Editing**: Use Tolgee's visual editor to update translations directly in the UI
2. **CLI Sync**: `tolgee pull --project-id=xxx --path ./src/i18n/locales`
3. **Type Safety**: Automatic TypeScript augmentation with next-intl
4. **Hot Reloading**: Instant translation updates in development

## CreatorFlow Localization Opportunities (47 Total)

### UI Components (15 opportunities)
**Buttons & Actions:**
- `Get started for free`, `Login`, `Sign up`, `Cancel`, `Submit`
- `Manage your subscription`, `Start a subscription`
- Navigation menu triggers and mobile sheet actions

**Status Indicators:**
- `healthy`, `unhealthy`, `degraded` (system status)
- `pending`, `processing`, `shipped`, `delivered` (order status)
- Connection status: `connected`, `disconnected`

**Form Elements:**
- Input placeholders: `Enter your email`, `Enter your username`
- Labels: `Email`, `Password`, `Confirm Password`
- Validation messages and error states

### Page Content (12 opportunities)
**Landing Page:**
- Headlines, feature descriptions, call-to-action text
- Hero section content and value propositions

**Authentication Pages:**
- `Join CreatorFlow and start generating banners for free`
- `Login to CreatorFlow`, terms and privacy links
- OAuth provider labels: `Continue with Google`, `Continue with GitHub`

**Dashboard & Account:**
- Section titles: `Account`, `Your Plan`, page headings
- Navigation items: `Product`, `Company`, `Support`, `Follow us`
- Footer links: `Pricing`, `About Us`, `Privacy`, `Get Support`

### Business Logic (8 opportunities)
**Email Templates:**
- Welcome email content and subject lines
- Order notification templates (shipped, delivered)
- Performance report email content
- Payout notification messages

**System Messages:**
- Toast notifications: success and error messages  
- API response messages and confirmations
- Loading states and progress indicators

### Marketing Content (5 opportunities)
**Pricing & Plans:**
- Plan names, feature descriptions, pricing tiers
- Subscription management interface text

**Onboarding & Help:**
- Step-by-step instructions and tooltips
- Contextual guidance and help text
- Feature introduction and tutorials

### Error Messages (7 opportunities)
**Validation Errors:**
- Form field validation messages
- Required field indicators
- Format validation (email, password strength)

**System Errors:**
- API error responses: `Webhook handler failed`, `Could not get userId`
- Database connection failures
- Authentication and authorization errors
- Network timeout and connectivity issues

## CreatorFlow-Specific Considerations

### TikTok Shop Markets Priority
1. **Tier 1**: English (US, UK, CA, AU) - Complete coverage (47 opportunities)
2. **Tier 2**: Spanish (MX, ES), Portuguese (BR) - Core features (32 opportunities) 
3. **Tier 3**: Chinese (CN, TW, HK), Japanese (JP) - Essential UI (18 opportunities)

### Content Categories by Business Priority
- **Dashboard UI** (Must Have) - Creator interface elements, navigation
- **Order Management** (Must Have) - Fulfillment workflow, status updates
- **Authentication** (Must Have) - Login, signup, validation
- **Error Handling** (Must Have) - System errors, validation messages
- **Analytics** (Should Have) - Performance metrics and reports
- **Email Notifications** (Should Have) - Automated communication
- **Marketing Content** (Could Have) - Landing pages, onboarding

### Automation Features
- **In-Context Editing** - Visual translation editor with Tolgee DevTools
- **CLI Automation** - Streamlined `tolgee pull` integration  
- **Workflow Integration** - Automatic PR creation for translations
- **Quality Assurance** - TypeScript validation and consistency checks

## Implementation Examples

### Translation Key Structure
```typescript
// Good: Descriptive, hierarchical keys
t('dashboard.orders.status.shipped')
t('auth.validation.email_required')
t('notifications.order.fulfilled.title')

// Avoid: Generic or flat keys
t('text1')
t('shipped')
```

### Component Integration
```typescript
// next-intl usage (production)
import { useTranslations } from 'next-intl';

function OrderStatus() {
  const t = useTranslations('dashboard.orders');
  return <span>{t('status.processing')}</span>;
}

// Tolgee usage (development with in-context editing)
import { T, useTranslate } from '@tolgee/react';

function OrderStatus() {
  return <T keyName="dashboard.orders.status.processing" />;
  // OR
  const { t } = useTranslate();
  return <span>{t('dashboard.orders.status.processing')}</span>;
}
```

### Translation File Example
```json
// src/i18n/locales/en/dashboard.json
{
  "orders": {
    "title": "Order Management",
    "status": {
      "pending": "Order pending",
      "processing": "Order is being processed", 
      "shipped": "Order shipped",
      "delivered": "Order delivered"
    },
    "actions": {
      "view_details": "View Details",
      "track_shipment": "Track Shipment"
    }
  },
  "analytics": {
    "revenue": {
      "title": "Revenue Analytics",
      "total": "Total Revenue: ${amount}",
      "trend": "{direction, select, up {📈} down {📉} other {—}} {percentage}%"
    }
  }
}
```

## Implementation Timeline

### Phase 1: Foundation Setup (Week 1-2)
- Install and configure next-intl with Next.js 15 App Router
- Set up Tolgee integration for development environment
- Create initial English translations for 47 identified opportunities
- Configure TypeScript augmentation for type-safe translations

### Phase 2: Core Market Localization (Week 2-3)
- Add Spanish and Portuguese translations (Tier 2 markets)
- Implement Tolgee CLI automation with GitHub Actions
- Set up automated translation pull requests
- Configure locale-specific routing and navigation

### Phase 3: Automation & Expansion (Week 3-4)
- Add Chinese and Japanese translations (Tier 3 markets)
- Implement automated translation validation pipeline
- Set up performance monitoring for bundle sizes
- Configure regional-specific formatting (currency, dates)

### Phase 4: Production Optimization (Week 4-5)
- Optimize translation loading with lazy loading and tree shaking
- Implement translation caching strategies  
- Set up monitoring for translation coverage and quality
- Performance testing across all target markets

## Best Practices

### Translation Keys
```typescript
// Good: Descriptive, hierarchical keys (recommended)
t('dashboard.orders.status.shipped')
t('auth.validation.email_required') 
t('notifications.order.fulfilled.title')

// Avoid: Generic or flat keys
t('text1')
t('shipped')
t('error')
```

### Context Provision for Translators
```json
{
  "orders.status.processing": {
    "message": "Order is being processed",
    "context": "Status shown in order management dashboard when order is being prepared for shipment"
  },
  "auth.validation.email_required": {
    "message": "Email is required",
    "context": "Error message displayed when user submits login form without entering email address"
  }
}
```

### Performance Optimization Strategies
- **Lazy Loading**: Load translation files by route to reduce initial bundle size
- **Namespace Splitting**: Separate translations by feature/module for better organization
- **Tree Shaking**: Only include used translations in production bundles
- **CDN Caching**: Leverage Vercel's global CDN for translation file delivery
- **Compression**: Gzip/Brotli compression for translation JSON files

## Monitoring & Quality Assurance

### Key Performance Indicators
- **Translation Coverage**: 100% for Tier 1, 85% for Tier 2, 60% for Tier 3 markets
- **Bundle Size Impact**: <5KB increase per additional locale
- **Load Performance**: <100ms additional load time for locale switching
- **Developer Adoption**: >90% usage of translation keys vs hardcoded strings

### Quality Metrics
- **Completion Rate**: Percentage of translated strings per locale
- **Review Status**: Human-reviewed vs machine-translated content
- **Consistency Score**: Terminology consistency across content categories
- **Context Coverage**: Percentage of translation keys with translator context

### Automated Quality Checks
- **Missing Translation Detection**: CI/CD pipeline validation
- **Placeholder Variable Validation**: Ensure {variable} consistency across locales  
- **Character Limit Compliance**: UI space constraints validation
- **TypeScript Type Safety**: Compile-time validation of translation keys

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install next-intl @tolgee/react
npm install --global @tolgee/cli
```

### 2. Environment Setup
```bash
# .env.development.local
NEXT_PUBLIC_TOLGEE_API_KEY=your_tolgee_api_key
NEXT_PUBLIC_TOLGEE_API_URL=https://app.tolgee.io
```

### 3. Basic Configuration
```typescript
// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### 4. Pull Translations
```bash
tolgee pull --project-id=your_project_id --path ./src/i18n/locales
```

## Related Documents

### Internal Documentation
- [Dashboard Design System](../dashboard-design/README.md) - UI component localization patterns
- [Master Implementation Roadmap](../moscow-methodology/02-implementation/I001-DRAFT-roadmap.md) - Project timeline integration
- [Project Documentation Standards](../documentation-standards/DOCUMENTATION_STANDARDS.md) - Documentation requirements

### External Resources  
- [Next.js Internationalization Guide](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Tolgee Platform Documentation](https://tolgee.io/docs)
- [Tolgee CLI Reference](https://tolgee.io/docs/cli)
- [TikTok Shop Global Markets](https://seller-us.tiktok.com/) 

### Automation Tools Comparison
- [Tolgee vs Crowdin Analysis](./automation-tools-comparison.md) - Detailed platform comparison
- [GitHub Actions Templates](https://github.com/tolgee/tolgee-cli) - Ready-to-use workflow examples

---

*This hybrid localization strategy combines next-intl's production-ready Next.js integration with Tolgee's superior developer experience, ensuring CreatorFlow can efficiently scale to global TikTok Shop markets while maintaining translation quality and developer productivity.*
