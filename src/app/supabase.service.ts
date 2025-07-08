// src/app/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://krabllhwwsvhbyqisvwy.supabase.co', // <-- Buraya kendi Project URL'nizi yazın
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyYWJsbGh3d3N2aGJ5cWlzdnd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NDA2NjMsImV4cCI6MjA2NzExNjY2M30.xzSDpmpULW-EE2doUo-G4mmvIuMAter6xDchfAITIA8' // <-- Buraya kendi anon public key'inizi yazın
    );
  }

  get client() {
    return this.supabase;
  }
}