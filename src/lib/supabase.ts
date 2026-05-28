import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Whether Supabase is configured (has env vars)
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Lazy-init: only create client when configured, otherwise return null
// This prevents "supabaseUrl is required" error when env vars are missing
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
