export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  brand_id: string;
  stock: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  isActive: boolean;
  createdAt: Date;
}