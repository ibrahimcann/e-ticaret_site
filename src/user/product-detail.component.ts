import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-detail" *ngIf="product">
      <div class="container">
        <div class="product-layout">
          <div class="product-images">
            <img [src]="product.imageurl" [alt]="product.name" class="main-image">
          </div>
          
          <div class="product-info">
            <h1>{{ product.name }}</h1>
            <p class="price">\${{ product.price }}</p>
            
            <div class="stock-status" [class.in-stock]="product.stock > 0" [class.out-of-stock]="product.stock === 0">
              {{ product.stock > 0 ? localizationService.t('product.inStock') : localizationService.t('product.outOfStock') }}
              <span *ngIf="product.stock > 0">({{ product.stock }} available)</span>
            </div>
            
            <div class="description">
              <h3>Description</h3>
              <p>{{ product.description }}</p>
            </div>
            
            <div class="actions">
              <button class="btn btn-primary" 
                      [disabled]="product.stock === 0"
                      (click)="addToCart()">
                {{ localizationService.t('product.addToCart') }}
              </button>
              <button class="btn btn-secondary" (click)="goBack()">
                Back to Products
              </button>
            </div>
          </div>
        </div>
        
        <div class="related-products">
          <h2>Related Products</h2>
          <div class="grid grid-4">
            <div class="product-card" *ngFor="let relatedProduct of relatedProducts">
              <img [src]="relatedProduct.imageurl" [alt]="relatedProduct.name" class="product-image">
              <div class="product-info">
                <h3 class="product-title">{{ relatedProduct.name }}</h3>
                <p class="product-price">\${{ relatedProduct.price }}</p>
                <button class="btn btn-primary" (click)="addToCart(relatedProduct.id)">
                  {{ localizationService.t('product.addToCart') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="!product" class="loading">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .product-detail {
      padding: 2rem 0;
    }
    
    .product-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 4rem;
    }
    
    .main-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .product-info h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #1f2937;
    }
    
    .price {
      font-size: 2rem;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 1rem;
    }
    
    .stock-status {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 2rem;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
    }
    
    .stock-status.in-stock {
      background-color: #d1fae5;
      color: #16a34a;
    }
    
    .stock-status.out-of-stock {
      background-color: #fee2e2;
      color: #dc2626;
    }
    
    .description {
      margin-bottom: 2rem;
    }
    
    .description h3 {
      margin-bottom: 1rem;
      color: #1f2937;
    }
    
    .description p {
      color: #6b7280;
      line-height: 1.7;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
    }
    
    .actions .btn {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }
    
    .related-products {
      border-top: 1px solid #e5e7eb;
      padding-top: 3rem;
    }
    
    .related-products h2 {
      margin-bottom: 2rem;
      font-size: 2rem;
      color: #1f2937;
    }
    
    @media (max-width: 768px) {
      .product-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .product-info h1 {
        font-size: 2rem;
      }
      
      .actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getProduct(id).subscribe(product => {
        this.product = product || null;
        if (this.product) {
          this.loadRelatedProducts();
        }
      });
    }
  }

  loadRelatedProducts() {
    if (!this.product) return;
    
    this.dataService.getProducts().subscribe(products => {
      this.relatedProducts = products
        .filter(p => p.id !== this.product!.id && p.category === this.product!.category)
        .slice(0, 4);
    });
  }

  addToCart(productId?: string) {
    const id = productId || this.product?.id;
    if (id) {
      this.dataService.addToCart(id).subscribe(success => {
        if (success) {
          alert('Product added to cart!');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}