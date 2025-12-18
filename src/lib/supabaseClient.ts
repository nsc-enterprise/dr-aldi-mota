import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Validate if a string is a valid URL
 */
function isValidUrl(urlString: string): boolean {
  if (!urlString || urlString.trim().length === 0) return false;
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

let _supabase: SupabaseClient | null = null;
let _initAttempted = false;

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase;
  
  if (_initAttempted) {
    throw new Error('Supabase client initialization failed. Please check SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
  }
  
  _initAttempted = true;
  
  if (!isValidUrl(supabaseUrl)) {
    throw new Error('Invalid or missing SUPABASE_URL. Please set a valid URL in environment variables.');
  }
  
  if (!supabaseKey || supabaseKey.trim().length === 0) {
    throw new Error('Missing SUPABASE_KEY. Please set SUPABASE_SERVICE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables.');
  }
  
  _supabase = createClient(supabaseUrl, supabaseKey);
  return _supabase;
}

// Export a getter function instead of the client directly
export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  }
});
