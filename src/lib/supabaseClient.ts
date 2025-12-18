import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _supabase: SupabaseClient | null = null;
let _initAttempted = false;

/**
 * Get or create the Supabase client instance
 * Only initializes when first called, not at module load time
 */
export function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase;
  
  if (_initAttempted) {
    throw new Error('Supabase client initialization failed. Please check SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
  }
  
  _initAttempted = true;
  
  // Validate URL exists and is not empty
  if (!supabaseUrl || supabaseUrl.trim().length === 0) {
    throw new Error('Missing SUPABASE_URL. Please set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in environment variables.');
  }
  
  // Validate key exists
  if (!supabaseKey || supabaseKey.trim().length === 0) {
    throw new Error('Missing Supabase key. Please set SUPABASE_SERVICE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables.');
  }
  
  try {
    _supabase = createClient(supabaseUrl, supabaseKey);
    return _supabase;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    throw error;
  }
}

// REMOVED: Legacy supabase export that was causing build-time initialization issues
// If you need the client, use: getSupabaseClient() or import from '@/lib/db' instead
