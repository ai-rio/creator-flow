# Localization Implementation - Ready to Build

**Status**: IMPLEMENTATION READY  
**Priority**: Must Have (M) - Phase 1 MVP  
**Technology**: Tolgee Platform + next-intl  
**Target Languages**: English, Portuguese (BR), Spanish  

## Implementation Strategy

**Approach**: Tolgee Platform for developer experience + next-intl for production routing
- ✅ **Tolgee**: In-context editing, TypeScript support, real-time updates
- ✅ **next-intl**: Production-ready routing, SSR optimization, SEO

## Phase 1: Foundation (Week 1)

### Day 1-2: Package Installation
```bash
# Install core packages
bun add next-intl @tolgee/react @tolgee/cli

# Install dev dependencies  
bun add -D @types/node
```

### Day 3-4: Basic Configuration
```typescript
// src/lib/i18n/config.ts
export const locales = ['en', 'pt-br', 'es'] as const;
export const defaultLocale = 'en' as const;

// middleware.ts
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['en', 'pt-br', 'es'],
  defaultLocale: 'en'
});
```

### Day 5-7: Directory Structure
```
src/
├── app/[locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── dashboard/
├── messages/
│   ├── en.json
│   ├── pt-br.json
│   └── es.json
└── lib/i18n/
    ├── config.ts
    └── tolgee.ts
```

## Phase 2: Core Implementation (Week 2)

### Essential Components
```typescript
// Language Switcher
export function LanguageSwitcher() {
  // Simple dropdown with 3 languages
}

// Translation Hook
import { useTranslations } from 'next-intl';
export function useT() {
  return useTranslations();
}
```

### Key Translation Keys
```json
// messages/en.json
{
  "navigation": {
    "dashboard": "Dashboard",
    "orders": "Orders", 
    "analytics": "Analytics"
  },
  "orders": {
    "title": "Order Management",
    "status": {
      "received": "Received",
      "processing": "Processing", 
      "shipped": "Shipped"
    }
  }
}
```

## Implementation Checklist

### Week 1: Foundation
- [ ] Install Tolgee + next-intl packages
- [ ] Configure middleware for locale routing
- [ ] Set up basic translation files (3 languages)
- [ ] Create language switcher component
- [ ] Test locale routing works

### Week 2: Core Features  
- [ ] Translate navigation components
- [ ] Translate order management interface
- [ ] Translate authentication flows
- [ ] Add currency/date formatting
- [ ] Test all locales work end-to-end

## Success Criteria

**Must Achieve**:
1. ✅ 3 languages working (EN, PT-BR, ES)
2. ✅ Language switcher functional
3. ✅ Core UI translated (nav, orders, auth)
4. ✅ URLs work: `/en/dashboard`, `/pt-br/dashboard`, `/es/dashboard`
5. ✅ No broken translations or missing keys

## Minimal Viable Scope

**Include**:
- Navigation translation
- Order status translation  
- Basic UI elements
- Currency formatting (USD, BRL, EUR)

**Exclude** (Future phases):
- Email template translation
- Advanced analytics translation
- Marketing page translation
- Professional translation review

## Quick Start Commands

```bash
# 1. Install packages
bun add next-intl @tolgee/react @tolgee/cli

# 2. Create middleware
touch middleware.ts

# 3. Set up locale routing
mkdir -p src/app/[locale]

# 4. Create translation files
mkdir -p src/messages
echo '{"navigation":{"dashboard":"Dashboard"}}' > src/messages/en.json

# 5. Test development
bun dev
# Visit: http://localhost:3000/en
```

## Implementation Notes

**Focus**: Build working 3-language support first, optimize later
**Testing**: Manual testing in all 3 locales required
**Performance**: Bundle size monitoring (<20% increase)
**SEO**: Hreflang tags for all locale pages

---

**Next Action**: Begin Week 1 implementation immediately using this consolidated plan.