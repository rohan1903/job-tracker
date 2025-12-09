import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if Supabase is properly configured
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. See ENV_SETUP.md for instructions."
    );
  }

  // Validate URL format
  if (supabaseUrl.includes('placeholder') || !supabaseUrl.startsWith('https://')) {
    throw new Error(
      "Invalid NEXT_PUBLIC_SUPABASE_URL. Please check your .env.local file and ensure it contains a valid Supabase project URL."
    );
  }

  // Validate key format (should be a JWT token)
  if (supabaseKey.includes('placeholder') || supabaseKey.length < 50) {
    throw new Error(
      "Invalid NEXT_PUBLIC_SUPABASE_ANON_KEY. Please check your .env.local file and ensure it contains a valid Supabase anon key."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}

