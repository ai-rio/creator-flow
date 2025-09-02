# Security Guidelines for CreatorFlow

## 🔐 **CREDENTIAL SECURITY OVERVIEW**

This document outlines security best practices for managing TikTok Shop API credentials, shipping carrier keys, and creator data.

---

## 🚨 **CRITICAL SECURITY RULES**

### **1. NEVER Commit TikTok/Shipping Credentials**
```bash
# ❌ NEVER DO THIS
const TIKTOK_API_KEY = 'tk_live_abc123...'
const UPS_API_KEY = 'ups_prod_xyz789...'

# ✅ DO THIS INSTEAD
const TIKTOK_API_KEY = process.env.TIKTOK_API_KEY
const UPS_API_KEY = process.env.UPS_API_KEY
```

### **2. Use Environment Variables**
```bash
# Create .env.local (never committed)
TIKTOK_API_KEY=your-tiktok-api-key
TIKTOK_SECRET=your-tiktok-secret
UPS_API_KEY=your-ups-api-key
FEDEX_API_KEY=your-fedex-api-key
USPS_API_KEY=your-usps-api-key
```

### **3. Mask Credentials in Logs**
```typescript
// ❌ NEVER LOG FULL CREDENTIALS
console.log('TikTok API Key:', fullApiKey)

// ✅ MASK CREDENTIALS
console.log('TikTok API Key:', apiKey.substring(0, 6) + '***')
```

---

## 🛡️ **CREATOR DATA PROTECTION**

### **Row Level Security (RLS)**
```sql
-- Creator data isolation
CREATE POLICY "creators_own_data" ON creator_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Order access control
CREATE POLICY "creators_own_orders" ON orders
  FOR ALL USING (
    auth.uid() IN (
      SELECT cp.user_id FROM creator_profiles cp
      JOIN tiktok_accounts ta ON ta.creator_profile_id = cp.id
      WHERE ta.id = orders.tiktok_account_id
    )
  );
```

### **API Rate Limiting**
```typescript
// TikTok API rate limiting
const rateLimiter = new Map();

export function checkRateLimit(creatorId: string) {
  const key = `tiktok_${creatorId}`;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100; // TikTok Shop API limit
  
  if (!rateLimiter.has(key)) {
    rateLimiter.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  const limit = rateLimiter.get(key);
  if (now > limit.resetTime) {
    rateLimiter.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (limit.count >= maxRequests) {
    throw new Error('Rate limit exceeded for TikTok API');
  }
  
  limit.count++;
  return true;
}
```
