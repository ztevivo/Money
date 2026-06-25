import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_https://supabase.co.bttwtezmcyfqyfhshrtq;
const supabaseAnonKey = process.env.NEXT_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0dHd0ZXptY3lmcXlmaHNocnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNTk3NjYsImV4cCI6MjA5NzkzNTc2Nn0.PBzv3PeG91N1ccXJD94EC_wqrCeHP88xp8_PYUJAAiw;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
