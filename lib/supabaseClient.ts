import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://mock-wizetv.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  'mock-anon-key-wizetv'
).trim();

/**
 * Singleton client for browser/client-side queries
 */
let supabaseBrowserClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (typeof window !== 'undefined') {
    if (!supabaseBrowserClient) {
      supabaseBrowserClient = createClient(supabaseUrl, supabaseAnonKey);
    }
    return supabaseBrowserClient;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Server-side client helper
 */
export function createServerClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
    },
  });
}
