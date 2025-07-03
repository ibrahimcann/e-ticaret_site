import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalizationService } from '../shared/services/localization.service';
import { LanguageSelectorComponent } from '../shared/components/language-selector.component';
import { DataService } from '../shared/services/data.service';
import { Cart } from '../shared/models/order.model';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSelectorComponent],
  template: `
    <div class="user-layout">
      <header class="user-header">
        <div class="container">
          <nav class="user-nav">
            <div class="logo">
              <h2>🛍️ E-Commerce</h2>
            </div>
            <div class="user-nav-links">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="user-nav-link">
                {{ localizationService.t('nav.home') }}
              </a>
              <a routerLink="/products" routerLinkActive="active" class="user-nav-link">
                {{ localizationService.t('nav.products') }}
              </a>
              <a routerLink="/blog" routerLinkActive="active" class="user-nav-link">
                {{ localizationService.t('nav.blog') }}
              </a>
              <a routerLink="/contact" routerLinkActive="active" class="user-nav-link">
                {{ localizationService.t('nav.contact') }}
              </a>
            </div>
            <div class="user-actions">
              <app-language-selector></app-language-selector>
              <a routerLink="/cart" class="cart-link">
                🛒 {{ localizationService.t('nav.cart') }}
                <span class="cart-count" *ngIf="cartItemCount > 0">{{ cartItemCount }}</span>
              </a>
              <a routerLink="/profile" class="profile-link" title="Profilim" style="font-size: 1.5rem; display: flex; align-items: center;">
                <span style="font-size: 1.7rem; margin-right: 0.3rem;">👤</span>
              </a>
              <a routerLink="/admin" class="user-nav-link">Admin</a>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer class="user-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h4>E-Commerce</h4>
              <p>Your trusted online shopping destination</p>
            </div>
            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a routerLink="/">{{ localizationService.t('nav.home') }}</a></li>
                <li><a routerLink="/products">{{ localizationService.t('nav.products') }}</a></li>
                <li><a routerLink="/blog">{{ localizationService.t('nav.blog') }}</a></li>
                <li><a routerLink="/contact">{{ localizationService.t('nav.contact') }}</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Contact</h4>
              <p>Email: info&#64;ecommerce.com</p>
              <p>Phone: +1 234 567 8900</p>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 E-Commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .user-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .logo h2 {
      margin: 0;
      color: #2563eb;
    }
    
    .user-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .cart-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #374151;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    
    .cart-link:hover {
      color: #2563eb;
    }
    
    .cart-count {
      background-color: #dc2626;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .profile-link {
      color: #374151;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    
    .profile-link:hover {
      color: #2563eb;
    }
    
    main {
      flex: 1;
    }
    
    .user-footer {
      background-color: #1f2937;
      color: white;
      padding: 2rem 0 1rem;
      margin-top: 4rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .footer-section h4 {
      margin-bottom: 1rem;
      color: white;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-section ul li {
      margin-bottom: 0.5rem;
    }
    
    .footer-section ul li a {
      color: #d1d5db;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .footer-section ul li a:hover {
      color: white;
    }
    
    .footer-bottom {
      border-top: 1px solid #374151;
      padding-top: 1rem;
      text-align: center;
      color: #d1d5db;
    }
    
    @media (max-width: 768px) {
      .user-nav {
        flex-direction: column;
        gap: 1rem;
      }
      
      .user-nav-links {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .user-actions {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `]
})
export class UserLayoutComponent implements OnInit {
  cartItemCount = 0;

  constructor(
    public localizationService: LocalizationService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getCart().subscribe(cart => {
      this.cartItemCount = cart?.items.reduce((count, item) => count + item.quantity, 0) || 0;
    });
  }
}