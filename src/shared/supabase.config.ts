// src/app/supabase.config.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://krabllhwwsvhbyqisvwy.supabase.co'; // Buraya kendi URL'ni yaz
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyYWJsbGh3d3N2aGJ5cWlzdnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDA2NjMsImV4cCI6MjA2NzExNjY2M30.xzSDpmpULW-EE2doUo-G4mmvIuMAter6xDchfAITIA8';         // Buraya kendi anon key'ini yaz

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
