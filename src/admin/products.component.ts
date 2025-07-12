import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../app/supabase.service';
import { LocalizationService } from '../shared/services/localization.service';
import { Product, Category, Brand } from '../shared/models/product.model';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="products-admin">
      <div class="page-header">
        <h1>{{ localizationService.t('admin.products') }}</h1>
        <button class="btn btn-primary" (click)="showAddForm = true">
          {{ localizationService.t('common.add') }} {{ localizationService.t('admin.products') }}
        </button>
      </div>

      <div class="card" *ngIf="showAddForm">
        <h3>{{ editingProduct ? localizationService.t('common.edit') : localizationService.t('common.add') }} Product</h3>
        <form (ngSubmit)="saveProduct()" #productForm="ngForm">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">{{ localizationService.t('common.name') }}</label>
              <input type="text" class="form-input" [(ngModel)]="currentProduct.name" name="name" required>
            </div>
            <div class="form-group">
              <label class="form-label">{{ localizationService.t('common.price') }}</label>
              <input type="number" class="form-input" [(ngModel)]="currentProduct.price" name="price" required>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">{{ localizationService.t('common.description') }}</label>
            <textarea class="form-input" [(ngModel)]="currentProduct.description" name="description" rows="3"></textarea>
          </div>
          
          <div class="grid grid-3">
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-input" [(ngModel)]="currentProduct.category_id" name="category_id">
                <option value="">Select Category</option>
                <option *ngFor="let category of categories" [value]="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Brand</label>
              <select class="form-input" [(ngModel)]="currentProduct.brand_id" name="brand_id">
                <option value="">Select Brand</option>
                <option *ngFor="let brand of brands" [value]="brand.id">{{ brand.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Stock</label>
              <input type="number" class="form-input" [(ngModel)]="currentProduct.stock" name="stock">
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Image URL</label>
            <input type="url" class="form-input" [(ngModel)]="currentProduct.image_url" name="image_url">
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!productForm.valid">
              {{ localizationService.t('common.save') }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="cancelEdit()">
              {{ localizationService.t('common.cancel') }}
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>{{ localizationService.t('common.name') }}</th>
              <th>{{ localizationService.t('common.price') }}</th>
              <th>Stock</th>
              <th>{{ localizationService.t('common.status') }}</th>
              <th>{{ localizationService.t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>
                <img [src]="product.image_url" [alt]="product.name" 
                     style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
              </td>
              <td>{{ product.name }}</td>
              <td>\${{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <span class="status-badge" [class.active]="product.is_active">
                  {{ product.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-secondary" (click)="editProduct(product)" style="margin-right: 0.5rem;">
                  {{ localizationService.t('common.edit') }}
                </button>
                <button class="btn btn-danger" (click)="deleteProduct(product.id)">
                  {{ localizationService.t('common.delete') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      background-color: #fca5a5;
      color: #dc2626;
    }
    
    .status-badge.active {
      background-color: #86efac;
      color: #16a34a;
    }
  `]
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  showAddForm = false;
  editingProduct: Product | null = null;
  
  currentProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    image_url: '',
    category_id: '',
    brand_id: '',
    stock: 0,
    is_active: true
  };

  constructor(
    private supabaseService: SupabaseService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.products = await this.supabaseService.getProducts();
    this.categories = await this.supabaseService.getCategories();
    this.brands = await this.supabaseService.getBrands();
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.currentProduct = { ...product };
    this.showAddForm = true;
  }

  async saveProduct() {
    if (!this.editingProduct) {
      const newProduct = { ...this.currentProduct, is_active: true };
      await this.supabaseService.addProduct(newProduct);
      await this.loadData();
      this.cancelEdit();
    }
    // Düzenleme (update) işlemi için ek kod eklenebilir.
  }

  async deleteProduct(id: string) {
    await this.supabaseService.deleteProduct(id);
    await this.loadData();
  }

  cancelEdit() {
    this.showAddForm = false;
    this.editingProduct = null;
    this.currentProduct = {
      name: '',
      description: '',
      price: 0,
      image_url: '',
      category_id: '',
      brand_id: '',
      stock: 0,
      is_active: true
    };
  }
}