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

  // Ürünleri listele
  async getProducts(): Promise<any[]> {
    const { data, error } = await this.supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // Ürün ekle
  async addProduct(product: any): Promise<void> {
    console.log('Sending product to Supabase:', product);
    
    // created_at alanını ekle
    const productWithTimestamp = {
      ...product,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await this.supabase.from('products').insert([productWithTimestamp]).select();
    
    if (error) {
      console.error('Supabase error details:', error);
      throw error;
    }
    
    console.log('Product added successfully, response:', data);
  }

  // Ürün sil
  async deleteProduct(id: string): Promise<void> {
    const { error } = await this.supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  }

  // Kategorileri listele
  async getCategories(): Promise<any[]> {
    const { data, error } = await this.supabase.from('categories').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  // Markaları listele
  async getBrands(): Promise<any[]> {
    const { data, error } = await this.supabase.from('brands').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
}