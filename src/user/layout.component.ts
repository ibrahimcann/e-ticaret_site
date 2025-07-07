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
      <div class="logo-nav-row">
        <span class="logo"><h2>🛍️ MY APP</h2></span>
        <nav class="main-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="main-nav-link">Anasayfa</a>
          <a routerLink="/products" routerLinkActive="active" class="main-nav-link">Ürünler</a>
          <a routerLink="/cart" routerLinkActive="active" class="main-nav-link">🛒 Sepet <span class="cart-count" *ngIf="cartItemCount > 0">{{ cartItemCount }}</span></a>
          <a routerLink="/profile" routerLinkActive="active" class="main-nav-link">{{ localizationService.t('nav.login') }}</a>
          <a routerLink="/profile" routerLinkActive="active" class="main-nav-link">{{ localizationService.t('nav.register') }}</a>
          <a routerLink="/profile" routerLinkActive="active" class="main-nav-link">👤 Profil</a>
        </nav>
      </div>
      <div class="offcanvas-menu" [class.open]="menuOpen">
        <nav class="offcanvas-nav">
          <a routerLink="/" routerLinkActive="active" class="offcanvas-link">Anasayfa</a>
          <a routerLink="/products" routerLinkActive="active" class="offcanvas-link">Ürünler</a>
          <a routerLink="/cart" routerLinkActive="active" class="offcanvas-link">🛒 Sepetim</a>
          <a routerLink="/profile" routerLinkActive="active" class="offcanvas-link">{{ localizationService.t('nav.login') }}</a>
          <a routerLink="/profile" routerLinkActive="active" class="offcanvas-link">{{ localizationService.t('nav.register') }}</a>
          <a routerLink="/profile" routerLinkActive="active" class="offcanvas-link">👤 Profil</a>
        </nav>
      </div>
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
    
    .single-header {
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
      padding: 0.7rem 0;
    }
    
    .single-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
    
    .header-search-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }
    
    .header-search {
      padding: 0.5rem 1.2rem;
      border-radius: 2rem;
      border: 1px solid #ddd;
      font-size: 1rem;
      min-width: 200px;
      margin-right: 0.5rem;
      background: #fafbfc;
      transition: border-color 0.2s;
    }
    
    .header-search:focus {
      border-color: #2563eb;
      outline: none;
    }
    
    .logo h2 {
      margin: 0;
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
    
    .logo-nav-row {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      justify-content: flex-start;
      padding: 1.2rem 2.5vw 1.2rem 2.5vw;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
      margin-bottom: 0.5rem;
      position: relative;
      z-index: 10;
    }
    .main-nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .main-nav-link {
      color: #222;
      font-size: 1.15rem;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .main-nav-link.active, .main-nav-link:hover {
      color: #e11d48;
      text-decoration: underline;
    }
    @media (max-width: 900px) {
      .logo-nav-row { flex-direction: column; gap: 1.2rem; padding: 1rem 1vw; }
      .main-nav { gap: 1rem; }
    }
  `]
})
export class UserLayoutComponent implements OnInit {
  cartItemCount = 0;
  menuOpen = false;
  openMenu() { this.menuOpen = true; }
  closeMenu() { this.menuOpen = false; }

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