# 🛡️ CreatorFlow Security Best Practices

## 🔐 Secret Management

### **NEVER Commit These Files**
```bash
# Environment files
.env
.env.local
.env.production
.env.staging
.env.development

# TikTok Shop credentials
tiktok-credentials.json
tiktok-oauth-tokens.json

# Shipping carrier credentials
ups-credentials.json
fedex-credentials.json
usps-credentials.json

# SSL certificates
*.pem
*.key
*.p12
*.pfx
```

### **Safe Patterns** ✅
```bash
# Template files (safe to commit)
.env.example
.env.local.example
.env.production.example

# Documentation with placeholder values
README.md (with YOUR_TIKTOK_API_KEY_HERE placeholders)
```

### **Environment Variable Naming Convention**
```bash
# Production secrets (NEVER commit)
TIKTOK_API_KEY=tk_live_abc123...
TIKTOK_SECRET=ts_live_xyz789...
UPS_API_KEY=ups_prod_def456...
FEDEX_API_KEY=fedex_prod_ghi789...

# Development/Test (safe patterns)
TIKTOK_API_KEY_DEV=tk_test_abc123...
UPS_API_KEY_TEST=ups_test_def456...
```

## 🔒 Creator Data Security

### **Personal Information Protection**
```typescript
// ❌ NEVER store plain text PII
const creator = {
  email: 'creator@example.com',
  phone: '+1234567890',
  address: '123 Main St, City, State'
}

// ✅ Hash/encrypt sensitive data
const creator = {
  email_hash: hashEmail('creator@example.com'),
  phone_encrypted: encrypt('+1234567890'),
  address_encrypted: encrypt('123 Main St, City, State')
}
```

### **TikTok OAuth Security**
```typescript
// Secure OAuth flow
export async function handleTikTokOAuth(code: string, state: string) {
  // Verify state parameter
  if (!verifyOAuthState(state)) {
    throw new Error('Invalid OAuth state');
  }
  
  // Exchange code for tokens
  const tokens = await exchangeCodeForTokens(code);
  
  // Store tokens securely
  await storeEncryptedTokens(tokens);
}
```

## 🚢 Shipping Security

### **Address Validation**
```typescript
// Validate shipping addresses
export function validateShippingAddress(address: ShippingAddress) {
  // Sanitize input
  const sanitized = {
    street: sanitizeInput(address.street),
    city: sanitizeInput(address.city),
    state: validateState(address.state),
    zip: validateZipCode(address.zip)
  };
  
  // Verify with carrier APIs
  return verifyAddressWithCarrier(sanitized);
}
```

### **Label Generation Security**
```typescript
// Secure label generation
export async function generateSecureLabel(order: Order) {
  // Verify creator owns order
  await verifyCreatorOwnership(order.creator_id, order.id);
  
  // Generate label with carrier
  const label = await carrierAPI.generateLabel({
    ...order.shipping_address,
    // Never log full address
    reference: `CF_${order.id.substring(0, 8)}`
  });
  
  return label;
}
```
