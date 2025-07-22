export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageurl: string;
  category: string;
  brand: string;
  stock: number;
  isactive: boolean;
  created_at: Date;
  updateat: Date;
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