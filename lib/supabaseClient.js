import { createClient } from '@supabase/supabase-js';

const fallbackUrl = 'https://htkhpuaakwevjizxmizb.supabase.co';
const fallbackKey = 'sb_publishable_rnOLK0cKAXB0K46BQT0BEQ_sx7LwWAt';

export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackKey;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '966535808411';
