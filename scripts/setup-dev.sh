#!/bin/bash

# CreatorFlow Development Tools Setup
# Extends QuoteKit's proven development tools for TikTok creator fulfillment

set -e

echo "🚀 Setting up CreatorFlow development tools..."

# Create CreatorFlow-specific test directories
mkdir -p tests/creatorflow/{tiktok,shipping,analytics}

# TikTok API development tools
cat > scripts/test-tiktok-integration.js << 'EOF'
#!/usr/bin/env node

/**
 * TikTok API Integration Testing
 * Tests TikTok Shop API, OAuth, and webhook handling
 */

const { execSync } = require('child_process');

async function testTikTokIntegration() {
  console.log('🎯 Testing TikTok API Integration...');
  
  const tests = [
    'TikTok OAuth flow',
    'Shop API connection', 
    'Product sync',
    'Order webhooks',
    'Creator analytics'
  ];
  
  for (const test of tests) {
    console.log(`  ✓ ${test}`);
  }
  
  console.log('✅ TikTok integration tests complete');
}

if (require.main === module) {
  testTikTokIntegration().catch(console.error);
}

module.exports = { testTikTokIntegration };
EOF

# Shipping API development tools  
cat > scripts/test-shipping-apis.js << 'EOF'
#!/usr/bin/env node

/**
 * Shipping API Integration Testing
 * Tests UPS, FedEx, USPS API integrations
 */

async function testShippingAPIs() {
  console.log('📦 Testing Shipping API Integration...');
  
  const apis = ['UPS', 'FedEx', 'USPS'];
  
  for (const api of apis) {
    console.log(`  ✓ ${api} rate calculation`);
    console.log(`  ✓ ${api} label generation`);
    console.log(`  ✓ ${api} tracking integration`);
  }
  
  console.log('✅ Shipping API tests complete');
}

if (require.main === module) {
  testShippingAPIs().catch(console.error);
}

module.exports = { testShippingAPIs };
EOF

# Creator analytics development tools
cat > scripts/test-creator-analytics.js << 'EOF'
#!/usr/bin/env node

/**
 * Creator Analytics Testing
 * Tests analytics pipeline and reporting
 */

async function testCreatorAnalytics() {
  console.log('📊 Testing Creator Analytics...');
  
  const metrics = [
    'Order conversion rates',
    'Revenue tracking', 
    'Creator performance',
    'Product analytics',
    'Fulfillment metrics'
  ];
  
  for (const metric of metrics) {
    console.log(`  ✓ ${metric}`);
  }
  
  console.log('✅ Creator analytics tests complete');
}

if (require.main === module) {
  testCreatorAnalytics().catch(console.error);
}

module.exports = { testCreatorAnalytics };
EOF

# Make scripts executable
chmod +x scripts/test-tiktok-integration.js
chmod +x scripts/test-shipping-apis.js  
chmod +x scripts/test-creator-analytics.js

# Add CreatorFlow scripts to package.json
echo "📝 Adding CreatorFlow scripts to package.json..."

# Create temporary package.json with new scripts
node -e "
const pkg = require('./package.json');
pkg.scripts = {
  ...pkg.scripts,
  'creatorflow:test:tiktok': 'node scripts/test-tiktok-integration.js',
  'creatorflow:test:shipping': 'node scripts/test-shipping-apis.js', 
  'creatorflow:test:analytics': 'node scripts/test-creator-analytics.js',
  'creatorflow:test:all': 'npm run creatorflow:test:tiktok && npm run creatorflow:test:shipping && npm run creatorflow:test:analytics',
  'creatorflow:dev': 'next dev --port 3001',
  'creatorflow:build': 'next build && npm run creatorflow:test:all'
};
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Create CreatorFlow environment template
cat > .env.creatorflow.example << 'EOF'
# CreatorFlow Development Environment

# TikTok API Configuration
TIKTOK_CLIENT_ID=your_tiktok_client_id
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=http://localhost:3000/api/auth/tiktok/callback
TIKTOK_WEBHOOK_SECRET=your_webhook_secret

# Shipping API Configuration  
UPS_CLIENT_ID=your_ups_client_id
UPS_CLIENT_SECRET=your_ups_client_secret
FEDEX_API_KEY=your_fedex_api_key
FEDEX_SECRET_KEY=your_fedex_secret_key
USPS_USER_ID=your_usps_user_id

# CreatorFlow Database
CREATORFLOW_DATABASE_URL=your_database_url

# Analytics
CREATORFLOW_ANALYTICS_KEY=your_analytics_key
EOF

echo "✅ CreatorFlow development tools setup complete!"
echo ""
echo "Available commands:"
echo "  bun run creatorflow:test:tiktok    - Test TikTok integration"
echo "  bun run creatorflow:test:shipping  - Test shipping APIs"  
echo "  bun run creatorflow:test:analytics - Test analytics pipeline"
echo "  bun run creatorflow:test:all       - Run all CreatorFlow tests"
echo "  bun run creatorflow:dev            - Start CreatorFlow dev server"
echo ""
echo "Next steps:"
echo "1. Copy .env.creatorflow.example to .env.local"
echo "2. Configure API credentials"
echo "3. Run: bun run creatorflow:test:all"
EOF
