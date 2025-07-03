import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { Product } from '../shared/models/product.model';
import { BlogPost } from '../shared/models/blog.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1>Welcome to Our E-Commerce Store</h1>
            <p>Discover amazing products at unbeatable prices</p>
            <a routerLink="/products" class="btn btn-primary">Shop Now</a>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="featured-products">
        <div class="container">
          <h2>Featured {{ localizationService.t('nav.products') }}</h2>
          <div class="grid grid-4">
            <div class="product-card" *ngFor="let product of featuredProducts">
              <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">\${{ product.price }}</p>
                <div class="product-actions">
                  <button class="btn btn-primary" (click)="addToCart(product.id)">
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
      </section>

      <!-- Latest Blog Posts -->
      <section class="latest-blog">
        <div class="container">
          <h2>Latest {{ localizationService.t('nav.blog') }} Posts</h2>
          <div class="grid grid-3">
            <div class="blog-card card" *ngFor="let post of latestPosts">
              <img [src]="post.featuredImage" [alt]="post.title" class="blog-image">
              <div class="blog-content">
                <h3>{{ post.title }}</h3>
                <p>{{ post.excerpt }}</p>
                <a [routerLink]="['/blog', post.slug]" class="btn btn-secondary">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2>Why Choose Us</h2>
          <div class="grid grid-3">
            <div class="feature card">
              <div class="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div class="feature card">
              <div class="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Your payment information is always secure</p>
            </div>
            <div class="feature card">
              <div class="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Get help whenever you need it</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }
    
    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .hero-content p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .featured-products,
    .latest-blog,
    .features {
      padding: 4rem 0;
    }
    
    .featured-products h2,
    .latest-blog h2,
    .features h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
      color: #1f2937;
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
    
    .blog-card {
      overflow: hidden;
    }
    
    .blog-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .blog-content {
      padding: 1rem;
    }
    
    .blog-content h3 {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }
    
    .blog-content p {
      color: #6b7280;
      margin-bottom: 1rem;
    }
    
    .feature {
      text-align: center;
      padding: 2rem;
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .feature h3 {
      margin-bottom: 1rem;
      color: #1f2937;
    }
    
    .feature p {
      color: #6b7280;
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  latestPosts: BlogPost[] = [];

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
    });

    this.dataService.getBlogPosts().subscribe(posts => {
      this.latestPosts = posts.slice(0, 3);
    });
  }

  addToCart(productId: string) {
    this.dataService.addToCart(productId).subscribe(success => {
      if (success) {
        alert('Product added to cart!');
      }
    });
  }
}