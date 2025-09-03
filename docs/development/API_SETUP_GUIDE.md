# CreatorFlow API Setup Guide

## 🎯 Overview

This guide walks you through setting up all required APIs and storing credentials securely for CreatorFlow development.

## 📋 Required APIs & Services

### **🔴 Phase 1 (Must Have)**

#### 1. TikTok Shop API
**Purpose**: Core order synchronization and fulfillment automation
**Documentation**: https://partner.tiktokshop.com/docv2

**Setup Steps**:
1. Go to [TikTok Shop Partner Center](https://partner.tiktokshop.com/)
2. Create developer account and verify business
3. Create new app for "Order Management & Fulfillment"
4. Request permissions: `order.read`, `order.write`, `fulfillment.write`, `product.read`

**Required Credentials**:
```bash
TIKTOK_SHOP_APP_KEY=your_app_key_here
TIKTOK_SHOP_APP_SECRET=your_app_secret_here
TIKTOK_SHOP_REDIRECT_URI=https://your-domain.com/api/auth/tiktok/callback
TIKTOK_SHOP_WEBHOOK_SECRET=your_webhook_secret_here
```

#### 2. Supabase
**Purpose**: Database, authentication, and real-time subscriptions
**Documentation**: https://supabase.com/docs

**Setup Steps**:
1. Go to [supabase.com](https://supabase.com) and create project
2. Go to Project Settings → API → Copy URL and anon key
3. Go to Project Settings → Database → Reset password and save it
4. Enable Row Level Security on all tables

**Required Credentials**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres
```

#### 3. Stripe
**Purpose**: Subscription billing and payment processing
**Documentation**: https://stripe.com/docs

**Setup Steps**:
1. Go to [stripe.com](https://stripe.com) and create account
2. Go to Developers → API keys → Copy publishable and secret keys
3. Go to [Customer Portal Settings](https://dashboard.stripe.com/test/settings/billing/portal) → Activate test link
4. Create webhook endpoint at `/api/webhooks/stripe`

**Required Credentials**:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### 4. Shippo API
**Purpose**: Primary shipping label generation and tracking
**Documentation**: https://goshippo.com/docs

**Setup Steps**:
1. Go to [goshippo.com](https://goshippo.com) and create account
2. Go to API → Generate API token
3. Test with sample shipment creation

**Required Credentials**:
```bash
SHIPPO_API_TOKEN=shippo_test_your_token_here
SHIPPO_WEBHOOK_SECRET=your_webhook_secret_here
```

#### 5. Resend
**Purpose**: Transactional emails and notifications
**Documentation**: https://resend.com/docs

**Setup Steps**:
1. Go to [resend.com](https://resend.com) and create account
2. Go to API Keys → Create API Key
3. Add domain and verify DNS records
4. Add [Supabase Resend integration](https://supabase.com/partners/integrations/resend)

**Required Credentials**:
```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@your-domain.com
```

### **🟡 Phase 2 (Should Have)**

#### 6. EasyPost API
**Purpose**: Secondary shipping provider for rate comparison
**Documentation**: https://www.easypost.com/docs

**Setup Steps**:
1. Go to [easypost.com](https://www.easypost.com) and create account
2. Go to Account → API Keys → Copy test key
3. Configure carrier accounts (USPS, UPS, FedEx)

**Required Credentials**:
```bash
EASYPOST_API_KEY=EZTKTEST_your_key_here
```

#### 7. PostHog
**Purpose**: Product analytics and user behavior tracking
**Documentation**: https://posthog.com/docs

**Setup Steps**:
1. Go to [posthog.com](https://posthog.com) and create project
2. Copy project API key and host
3. Configure event tracking for order flows

**Required Credentials**:
```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### **🟢 Phase 3 (Could Have)**

#### 8. OpenAI API
**Purpose**: AI-powered features and content generation
**Documentation**: https://platform.openai.com/docs

**Setup Steps**:
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create API key with appropriate usage limits
3. Set up billing and usage monitoring

**Required Credentials**:
```bash
OPENAI_API_KEY=sk-your_openai_key_here
```

## 🔒 Secure Credential Storage

### **Local Development (.env.local)**

Create `.env.local` file in project root:

```bash
# Copy from .env.local.example and fill in your values

# TikTok Shop API
TIKTOK_SHOP_APP_KEY=
TIKTOK_SHOP_APP_SECRET=
TIKTOK_SHOP_REDIRECT_URI=http://localhost:3000/api/auth/tiktok/callback
TIKTOK_SHOP_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Shipping
SHIPPO_API_TOKEN=
SHIPPO_WEBHOOK_SECRET=
EASYPOST_API_KEY=

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# AI (Optional)
OPENAI_API_KEY=

# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
NODE_ENV=development
```

### **Production Deployment**

#### Vercel Environment Variables
```bash
# Add via Vercel Dashboard → Settings → Environment Variables
# Or via Vercel CLI:
vercel env add TIKTOK_SHOP_APP_KEY
vercel env add STRIPE_SECRET_KEY
# ... add all production credentials
```

#### Alternative: AWS Secrets Manager
```bash
# Store sensitive credentials in AWS Secrets Manager
aws secretsmanager create-secret \
  --name "creatorflow/production/api-keys" \
  --description "CreatorFlow production API credentials" \
  --secret-string '{
    "TIKTOK_SHOP_APP_SECRET": "your_secret",
    "STRIPE_SECRET_KEY": "your_key",
    "SUPABASE_SERVICE_ROLE_KEY": "your_key"
  }'
```

## 🧪 Testing API Connections

### **Quick Test Script**

Create `scripts/test-apis.js`:

```javascript
// Test all API connections
const testAPIs = async () => {
  console.log('🧪 Testing API connections...\n');
  
  // Test Supabase
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    await supabase.from('users').select('count').single();
    console.log('✅ Supabase: Connected');
  } catch (error) {
    console.log('❌ Supabase: Failed -', error.message);
  }
  
  // Test Stripe
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    await stripe.customers.list({ limit: 1 });
    console.log('✅ Stripe: Connected');
  } catch (error) {
    console.log('❌ Stripe: Failed -', error.message);
  }
  
  // Test Shippo
  try {
    const shippo = require('shippo')(process.env.SHIPPO_API_TOKEN);
    await shippo.address.list({ results: 1 });
    console.log('✅ Shippo: Connected');
  } catch (error) {
    console.log('❌ Shippo: Failed -', error.message);
  }
  
  // Test Resend
  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.domains.list();
    console.log('✅ Resend: Connected');
  } catch (error) {
    console.log('❌ Resend: Failed -', error.message);
  }
  
  console.log('\n🎯 API testing complete!');
};

testAPIs();
```

Run test:
```bash
node scripts/test-apis.js
```

## 🚀 Development Workflow

### **1. Initial Setup**
```bash
# Clone repository
git clone https://github.com/ai-rio/creator-flow.git
cd creator-flow

# Install dependencies
bun install

# Copy environment template
cp .env.local.example .env.local

# Fill in your API credentials in .env.local
```

### **2. Database Setup**
```bash
# Link to your Supabase project
bunx supabase login
bunx supabase link --project-ref your-project-ref

# Run migrations
bun run migration:up

# Generate TypeScript types
bun run generate-types
```

### **3. Stripe Setup**
```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Windows: Download from https://github.com/stripe/stripe-cli/releases

# Login to Stripe
stripe login

# Create products and prices
stripe fixtures ./stripe-fixtures.json --api-key $STRIPE_SECRET_KEY

# Listen to webhooks (in separate terminal)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### **4. TikTok Shop Setup**
```bash
# Test OAuth flow
curl -X GET "https://auth.tiktok-shops.com/oauth/authorize?app_key=$TIKTOK_SHOP_APP_KEY&state=test&redirect_uri=$TIKTOK_SHOP_REDIRECT_URI"

# Test webhook endpoint
curl -X POST localhost:3000/api/webhooks/tiktok \
  -H "Content-Type: application/json" \
  -d '{"test": "webhook"}'
```

### **5. Start Development**
```bash
# Start development server
bun run dev

# Run tests
bun test

# Check API connections
node scripts/test-apis.js
```

## 🔐 Security Best Practices

### **Credential Management**
1. **Never commit** `.env.local` to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** (quarterly for production)
4. **Monitor API usage** for unusual activity
5. **Use least privilege** principle for API permissions

### **Environment Separation**
```bash
# Development
TIKTOK_SHOP_APP_KEY=test_key_here
STRIPE_SECRET_KEY=sk_test_key_here

# Production  
TIKTOK_SHOP_APP_KEY=live_key_here
STRIPE_SECRET_KEY=sk_live_key_here
```

### **Webhook Security**
```javascript
// Always verify webhook signatures
const verifyWebhookSignature = (payload, signature, secret) => {
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
};
```

## 📞 Support & Troubleshooting

### **Common Issues**

**TikTok Shop API**:
- Rate limiting: 1000 requests/minute
- OAuth redirect URI must match exactly
- Webhook signature verification required

**Stripe**:
- Test vs live mode key mismatch
- Webhook endpoint must be HTTPS in production
- Customer portal must be activated

**Supabase**:
- RLS policies must be configured
- Service role key needed for admin operations
- Connection pooling for high traffic

### **Getting Help**
- TikTok Shop: [Partner Support](https://partner.tiktokshop.com/support)
- Stripe: [Support Center](https://support.stripe.com/)
- Supabase: [Discord Community](https://discord.supabase.com/)
- Shippo: [Help Center](https://support.goshippo.com/)

---

## ✅ Setup Checklist

- [ ] TikTok Shop developer account created and app configured
- [ ] Supabase project created with database password saved
- [ ] Stripe account setup with customer portal activated
- [ ] Shippo account created with API token generated
- [ ] Resend account setup with domain verified
- [ ] All credentials added to `.env.local`
- [ ] API connections tested successfully
- [ ] Database migrations run
- [ ] Stripe fixtures loaded
- [ ] Webhook endpoints configured
- [ ] Development server running

**Once complete, you're ready to start CreatorFlow development! 🚀**
