# CreatorFlow Project Overview

## Purpose
CreatorFlow is a TikTok Shop fulfillment automation platform designed to scale creators from 50 to 500+ orders per day without operational headaches.

## Tech Stack
- **Framework**: Next.js 15 with App Router, React 19, TypeScript 5.7+
- **Database**: Supabase (PostgreSQL) with Row Level Security (RLS), Edge Functions (Deno runtime)
- **Payments**: Stripe integration with webhooks and subscription management
- **UI**: Tailwind CSS, Radix UI, Shadcn/ui components, Lucide React icons
- **Testing**: Jest (unit), Playwright (E2E), Testing Library (React)
- **Analytics**: PostHog (product analytics), Vercel Analytics
- **Deployment**: Vercel/Fly.io with global CDN, Bun package manager

## Core Features
1. **TikTok Shop Integration**: Automated order synchronization, real-time webhook handling, order status management, product catalog sync
2. **Creator Analytics**: Performance metrics dashboard, revenue tracking, order fulfillment analytics, growth insights
3. **Shipping Automation**: Multi-carrier integration, automated label generation, tracking synchronization, delivery notifications
4. **Subscription Management**: Creator tier subscriptions, usage-based billing, payment processing, account management

## Target Users
- TikTok Shop sellers
- E-commerce creators
- Scaling micro-brands

## Business Model
Subscription-based SaaS ($49-$199/month) with usage-based pricing

## Status
Production-ready MVP with active development roadmap