import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) {
    console.warn('Supabase env vars not set – requests will fail')
    // Return a dummy client so the app doesn't crash on load
    _supabase = createClient('https://placeholder.supabase.co', 'placeholder')
    return _supabase
  }
  _supabase = createClient(url, key)
  return _supabase
}
