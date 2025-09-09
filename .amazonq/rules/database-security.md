# Database Security Standards

## Row Level Security (RLS) Requirements

- **Always use RLS policies** for data access control
- All user data must be filtered by `auth.uid() = user_id`
- Shop data must be isolated by `shop_id` with proper access controls
- Subscription data must be secured with additional encryption
- Analytics data must be aggregated with privacy protection

## Database Best Practices

- Include optional **relationship properties** in types for queries with joins
- Use **parameterized queries** to prevent SQL injection
- Implement proper **null checking** before object access
- Create **type guards** for union type disambiguation
- Log errors appropriately without exposing sensitive data

## Supabase Compliance

- Use Supabase client with proper authentication
- Implement RLS policies on all tables
- Use Edge Functions for server-side operations
- Follow Supabase security best practices for API keys and tokens
