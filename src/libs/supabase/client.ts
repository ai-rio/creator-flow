// Browser client for Edge Functions testing
import { createClient as createSupabaseClientClient } from './supabase-client-client';

export function createClient() {
  return createSupabaseClientClient();
}