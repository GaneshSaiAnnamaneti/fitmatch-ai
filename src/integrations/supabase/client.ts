// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ccscjwxffsiizbgdhesa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc2Nqd3hmZnNpaXpiZ2RoZXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjQwNzMsImV4cCI6MjA2ODI0MDA3M30.30mocrh1jMyWC_R753PCU5MFp1-Mr46S60jv86i8EGg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});