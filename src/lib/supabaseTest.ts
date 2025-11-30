import 'dotenv/config';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { supabase } from './supabaseClient';

async function testSupabaseConnection() {
  // Query the existing 'todos' table
  const { data, error } = await supabase.from('todos').select('*').limit(1);
  if (error) {
    console.error('Supabase connection error:', error.message);
  } else {
    console.log('Supabase connection successful! Sample data:', data);
  }
}

testSupabaseConnection();
