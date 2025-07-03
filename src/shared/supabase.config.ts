// src/app/supabase.config.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xcqopkpxgjoxkjzbpdbf.supabase.co'; // Buraya kendi URL'ni yaz
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjcW9wa3B4Z2pveGtqemJwZGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Mzg4MzEsImV4cCI6MjA2NzExNDgzMX0.LVe_iUe0YytGhvP2eNVrAniw0wGqy0XfPYhDYFhrIok';         // Buraya kendi anon key'ini yaz

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
