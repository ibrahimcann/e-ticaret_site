import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { Product, Category, Brand } from '../shared/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="products-page">
      <div class="container">
        <div class="page-header">
          <h1>{{ localizationService.t('nav.products') }}</h1>
        </div>

        <div class="products-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <div class="card">
              <h3>{{ localizationService.t('common.filter') }}</h3>
              
              <div class="filter-group">
                <label class="form-label">{{ localizationService.t('common.search') }}</label>
                <input type="text" class="form-input" [(ngModel)]="searchTerm" 
                       (input)="filterProducts()" placeholder="Search products...">
              </div>
              
              <div class="filter-group">
                <label class="form-label">Category</label>
                <select class="form-input" [(ngModel)]="selectedCategory" (change)="filterProducts()">
                  <option value="">All Categories</option>
                  <option *ngFor="let category of categories" [value]="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="form-label">Brand</label>
                <select class="form-input" [(ngModel)]="selectedBrand" (change)="filterProducts()">
                  <option value="">All Brands</option>
                  <option *ngFor="let brand of brands" [value]="brand.id">
                    {{ brand.name }}
                  </option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="form-label">Price Range</label>
                <div class="price-inputs">
                  <input type="number" class="form-input" [(ngModel)]="priceRange.min" 
                         (input)="filterProducts()" placeholder="Min">
                  <input type="number" class="form-input" [(ngModel)]="priceRange.max" 
                         (input)="filterProducts()" placeholder="Max">
                </div>
              </div>
            </div>
          </aside>

          <!-- Products Grid -->
          <main class="products-main">
            <div class="products-header">
              <p>{{ filteredProducts.length }} products found</p>
              <select class="form-input" [(ngModel)]="sortBy" (change)="sortProducts()">
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            
            <div class="products-grid grid grid-3">
              <div class="product-card" *ngFor="let product of filteredProducts">
                <div class="product-card-inner" (click)="viewProductDetails(product.id)">
                  <img [src]="product.image_url" [alt]="product.name" class="product-image">
                  <div class="product-info">
                    <h3 class="product-title">{{ product.name }}</h3>
                    <p class="product-description">{{ product.description }}</p>
                    <p class="product-price">\${{ product.price }}</p>
                    <div class="stock-status" [class.in-stock]="product.stock > 0" [class.out-of-stock]="product.stock === 0">
                      {{ product.stock > 0 ? localizationService.t('product.inStock') : localizationService.t('product.outOfStock') }}
                    </div>
                    <div class="product-actions">
                      <button class="btn btn-primary" 
                              [disabled]="product.stock === 0"
                              (click)="addToCart(product.id, $event)">
                        {{ localizationService.t('product.addToCart') }}
                      </button>
                      <a [routerLink]="['/products', product.id]" class="btn btn-secondary">
                        {{ localizationService.t('product.viewDetails') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div *ngIf="filteredProducts.length === 0" class="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
    }
    
    .products-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 2rem;
    }
    
    .filters-sidebar {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }
    
    .filter-group {
      margin-bottom: 1.5rem;
    }
    
    .price-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    
    .products-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .products-header select {
      width: auto;
      min-width: 200px;
    }
    
    .products-grid {
      margin-bottom: 2rem;
    }
    
    .product-card {
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .product-card-inner {
      height: 100%;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: #fff;
      transition: background-color 0.2s;
    }
    
    .product-card-inner:hover {
      background-color: #f9fafb;
    }
    
    .product-description {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0.5rem 0;
    }
    
    .stock-status {
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0.5rem 0;
    }
    
    .stock-status.in-stock {
      color: #16a34a;
    }
    
    .stock-status.out-of-stock {
      color: #dc2626;
    }
    
    .product-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .product-actions .btn {
      flex: 1;
      font-size: 0.875rem;
      padding: 0.5rem;
    }
    
    .no-products {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }
    
    @media (max-width: 768px) {
      .products-layout {
        grid-template-columns: 1fr;
      }
      
      .filters-sidebar {
        position: static;
      }
      
      .products-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  
  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';
  sortBy = 'name';
  priceRange = { min: 0, max: 0 };

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
    
    // Check for query parameters
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        // Find the category ID based on the category name from the URL
        this.dataService.getCategories().subscribe(categories => {
          const category = categories.find(c => 
            c.name.toLowerCase() === params['category'].toLowerCase()
          );
          
          if (category) {
            this.selectedCategory = category.id;
            this.filterProducts();
          }
        });
      }
    });
  }

  loadData() {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.sortProducts();
    });

    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.dataService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || product.category_id === this.selectedCategory;
      const matchesBrand = !this.selectedBrand || product.brand_id === this.selectedBrand;
      
      const matchesPrice = (!this.priceRange.min || product.price >= this.priceRange.min) &&
        (!this.priceRange.max || product.price <= this.priceRange.max);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
    
    this.sortProducts();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  addToCart(productId: string, event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent triggering the parent click event
    }
    
    this.dataService.addToCart(productId).subscribe(success => {
      if (success) {
        alert('Product added to cart!');
      }
    });
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }
}