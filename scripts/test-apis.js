#!/usr/bin/env node

/**
 * CreatorFlow API Connection Tester
 * Tests all required API connections and reports status
 */

require('dotenv').config({ path: '.env.local' });

const testAPIs = async () => {
  console.log('🧪 CreatorFlow API Connection Test\n');
  console.log('=' .repeat(50));
  
  const results = {
    passed: 0,
    failed: 0,
    total: 0
  };

  // Helper function to test API
  const testAPI = async (name, testFn) => {
    results.total++;
    try {
      await testFn();
      console.log(`✅ ${name}: Connected`);
      results.passed++;
    } catch (error) {
      console.log(`❌ ${name}: Failed - ${error.message}`);
      results.failed++;
    }
  };

  // Test Supabase
  await testAPI('Supabase Database', async () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing Supabase credentials');
    }
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist (OK for new projects)
      throw new Error(error.message);
    }
  });

  // Test Stripe
  await testAPI('Stripe Payments', async () => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing Stripe secret key');
    }
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    await stripe.customers.list({ limit: 1 });
  });

  // Test Shippo
  await testAPI('Shippo Shipping', async () => {
    if (!process.env.SHIPPO_API_TOKEN) {
      throw new Error('Missing Shippo API token');
    }
    
    const shippo = require('shippo')(process.env.SHIPPO_API_TOKEN);
    await shippo.address.list({ results: 1 });
  });

  // Test Resend
  await testAPI('Resend Email', async () => {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing Resend API key');
    }
    
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.domains.list();
  });

  // Test TikTok Shop (basic validation)
  await testAPI('TikTok Shop Config', async () => {
    if (!process.env.TIKTOK_SHOP_APP_KEY || !process.env.TIKTOK_SHOP_APP_SECRET) {
      throw new Error('Missing TikTok Shop credentials');
    }
    
    // Just validate credentials exist - actual API test requires OAuth flow
    if (process.env.TIKTOK_SHOP_APP_KEY.length < 10) {
      throw new Error('Invalid TikTok Shop app key format');
    }
  });

  // Test EasyPost (optional)
  if (process.env.EASYPOST_API_KEY) {
    await testAPI('EasyPost Shipping', async () => {
      const EasyPost = require('@easypost/api');
      const api = new EasyPost(process.env.EASYPOST_API_KEY);
      await api.Address.all({ page_size: 1 });
    });
  }

  // Test PostHog (optional)
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    await testAPI('PostHog Analytics', async () => {
      const { PostHog } = require('posthog-node');
      const client = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'
      });
      
      // PostHog doesn't have a simple test endpoint, so just validate config
      if (!process.env.NEXT_PUBLIC_POSTHOG_KEY.startsWith('phc_')) {
        throw new Error('Invalid PostHog key format');
      }
      
      await client.shutdown();
    });
  }

  // Test OpenAI (optional)
  if (process.env.OPENAI_API_KEY) {
    await testAPI('OpenAI API', async () => {
      const OpenAI = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
      await openai.models.list();
    });
  }

  // Print results
  console.log('=' .repeat(50));
  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Total: ${results.total}`);
  
  if (results.failed === 0) {
    console.log('\n🎉 All API connections successful!');
    console.log('🚀 Ready to start CreatorFlow development');
  } else {
    console.log('\n⚠️  Some API connections failed');
    console.log('📖 Check the API Setup Guide: docs/development/API_SETUP_GUIDE.md');
  }
  
  console.log('\n' + '=' .repeat(50));
  
  // Exit with error code if any tests failed
  process.exit(results.failed > 0 ? 1 : 0);
};

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error.message);
  process.exit(1);
});

// Run tests
testAPIs().catch((error) => {
  console.error('❌ Test runner failed:', error.message);
  process.exit(1);
});
