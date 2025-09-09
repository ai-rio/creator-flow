/**
 * CORS Configuration for Supabase Edge Functions
 * Shared configuration for webhook endpoints
 */

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-tts-signature, x-tts-timestamp',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
};