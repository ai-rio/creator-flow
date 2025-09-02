# CreatorFlow Security Implementation Guide

This guide provides comprehensive instructions for implementing security measures for TikTok creator fulfillment automation.

## Quick Start Implementation

### 1. Install Required Dependencies

```bash
bun install dompurify @types/dompurify bcryptjs @types/bcryptjs
bun install rate-limiter-flexible helmet
```

### 2. Initialize Security System

Add to your app initialization (`layout.tsx`):

```typescript
import { CreatorFlowSecurityManager } from '@/utils/security-manager';

// Initialize security system
CreatorFlowSecurityManager.initialize({
  cspNonce: process.env.CSP_NONCE,
  enableRateLimit: true,
  enableCreatorDataProtection: true,
});
```

### 3. Implement CSP Headers

Update your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; connect-src 'self' https://api.tiktok.com https://api.ups.com https://api.fedex.com;",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### 4. Secure API Routes

```typescript
// api/tiktok/orders/route.ts
import { rateLimit } from '@/utils/rate-limiter';
import { verifyCreatorAuth } from '@/utils/auth';

export async function POST(request: Request) {
  // Rate limiting
  await rateLimit(request);
  
  // Creator authentication
  const creator = await verifyCreatorAuth(request);
  
  // Input validation
  const body = await request.json();
  const validatedData = validateTikTokOrderData(body);
  
  // Process order securely
  const order = await processTikTokOrder(validatedData, creator.id);
  
  return Response.json({ order });
}
```

### 5. Database Security

```sql
-- Enable RLS on all tables
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_accounts ENABLE ROW LEVEL SECURITY;

-- Creator data isolation policies
CREATE POLICY "creators_own_profiles" ON creator_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "creators_own_tiktok_accounts" ON tiktok_accounts
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM creator_profiles 
      WHERE id = tiktok_accounts.creator_profile_id
    )
  );
```

### 6. Encryption Utilities

```typescript
// utils/encryption.ts
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

export function encryptSensitiveData(data: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptSensitiveData(encryptedData: string): string {
  const [ivHex, encrypted] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function hashCreatorData(data: string): Promise<string> {
  return bcrypt.hash(data, 12);
}
```

### 7. TikTok API Security

```typescript
// utils/tiktok-security.ts
export class TikTokAPISecurityManager {
  private static rateLimiter = new Map();
  
  static async secureAPICall(
    endpoint: string, 
    creatorId: string, 
    data: any
  ) {
    // Rate limiting
    this.checkRateLimit(creatorId);
    
    // Input sanitization
    const sanitizedData = this.sanitizeInput(data);
    
    // API call with retry logic
    return this.makeSecureRequest(endpoint, sanitizedData);
  }
  
  private static checkRateLimit(creatorId: string) {
    const key = `tiktok_${creatorId}`;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 100;
    
    if (!this.rateLimiter.has(key)) {
      this.rateLimiter.set(key, { count: 1, resetTime: now + windowMs });
      return;
    }
    
    const limit = this.rateLimiter.get(key);
    if (now > limit.resetTime) {
      this.rateLimiter.set(key, { count: 1, resetTime: now + windowMs });
      return;
    }
    
    if (limit.count >= maxRequests) {
      throw new Error('TikTok API rate limit exceeded');
    }
    
    limit.count++;
  }
}
