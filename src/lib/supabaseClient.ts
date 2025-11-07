import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or Anon Key is missing in .env.local"
  );
}

// Crea y exporta el cliente de Supabase
// Este 'supabase' será tu puerta de entrada para todo
export const supabase = createClient(supabaseUrl, supabaseAnonKey);