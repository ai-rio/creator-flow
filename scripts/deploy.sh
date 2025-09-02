#!/bin/bash

# CreatorFlow Production Deployment Script
# Extends QuoteKit's deployment with TikTok creator fulfillment checks

set -e

ENVIRONMENT=${1:-staging}
CONFIG_FILE="fly.creatorflow.toml"

echo "🚀 Deploying CreatorFlow to $ENVIRONMENT..."

# Pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Code quality checks
echo "  ✓ Running ESLint..."
bun run lint

echo "  ✓ TypeScript compilation..."
bun run type-check

echo "  ✓ Running tests..."
bun run test
bun run creatorflow:test:all

# Security audit
echo "  ✓ Security audit..."
bun run security:audit

# Build verification
echo "  ✓ Build verification..."
bun run build

# CreatorFlow specific checks
echo "🎯 CreatorFlow deployment checks..."

# Check TikTok API configuration
if [ -z "$TIKTOK_CLIENT_ID" ]; then
  echo "❌ TIKTOK_CLIENT_ID not set"
  exit 1
fi

# Check shipping API configuration
if [ -z "$UPS_CLIENT_ID" ]; then
  echo "⚠️  UPS_CLIENT_ID not set - shipping features may be limited"
fi

# Deploy based on environment
case $ENVIRONMENT in
  "staging")
    echo "📦 Deploying to staging..."
    fly deploy --config fly.creatorflow.toml --app creatorflow-staging
    ;;
  "production")
    echo "🚨 Deploying to PRODUCTION..."
    echo "Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      fly deploy --config fly.creatorflow.toml --app creatorflow-production
    else
      echo "Deployment cancelled"
      exit 1
    fi
    ;;
  *)
    echo "❌ Invalid environment: $ENVIRONMENT"
    echo "Usage: $0 [staging|production]"
    exit 1
    ;;
esac

# Post-deployment verification
echo "✅ Deployment complete! Running health checks..."

# Wait for deployment
sleep 30

# Health check
if [ "$ENVIRONMENT" = "staging" ]; then
  HEALTH_URL="https://creatorflow-staging.fly.dev/api/health/creatorflow"
else
  HEALTH_URL="https://creatorflow-production.fly.dev/api/health/creatorflow"
fi

echo "🏥 Checking health endpoint: $HEALTH_URL"
if curl -f "$HEALTH_URL" > /dev/null 2>&1; then
  echo "✅ Health check passed!"
else
  echo "❌ Health check failed!"
  exit 1
fi

echo "🎉 CreatorFlow deployment successful!"
