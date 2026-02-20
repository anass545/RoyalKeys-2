import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables! Check .env file or Cloudflare settings.');
    // Return a dummy client to prevent crash
    supabaseClient = {
        auth: { signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }) },
        from: () => ({ select: async () => ({ data: [], error: null }), upsert: async () => ({ error: null }), delete: async () => ({ error: null }) })
    } as any;
} else {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
