import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LocalizationService } from '../shared/services/localization.service';
import { DataService } from '../shared/services/data.service';
import { Cart } from '../shared/models/order.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-layout">
      <div class="header-container">
        <div class="left-section">
          <button class="hamburger-icon" (click)="toggleMenu()">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
          <span class="logo" *ngIf="isHomePage"><h2>🛍️ MY APP</h2></span>
        </div>
        <div class="search-box" *ngIf="isHomePage">
          <input type="text" placeholder="Ne aramak istersin?" class="search-input">
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div class="menu-content" *ngIf="menuOpen">
          <div class="menu-header">
            <button class="close-btn" (click)="toggleMenu()">✕</button>
          </div>
          <nav class="menu-nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="menu-link" (click)="toggleMenu()">Anasayfa</a>
            <a routerLink="/products" routerLinkActive="active" class="menu-link" (click)="toggleMenu()">Ürünler</a>
            <a routerLink="/cart" routerLinkActive="active" class="menu-link" (click)="toggleMenu()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M2.5 3H5l2.68 13.39A2 2 0 0 0 9.62 18h7.76a2 2 0 0 0 1.94-1.61L21.5 6H6"/></svg>
              Sepet
            </a>
            <a routerLink="/profile" routerLinkActive="active" class="menu-link" (click)="toggleMenu()">👤 Profil</a>
          </nav>
        </div>
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
    
    main {
      flex: 1;
    }
    
    .header-container {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      width: 100%;
    }
    
    .left-section {
      display: flex;
      align-items: center;
    }
    
    .hamburger-icon {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 40px;
      height: 40px;
      cursor: pointer;
      padding: 10px;
      background: transparent;
      border: none;
    }
    
    .hamburger-line {
      display: block;
      height: 4px;
      width: 100%;
      background-color: #000;
      border-radius: 2px;
      margin: 2px 0;
    }
    
    .logo {
      margin-left: 20px; /* Hamburger menüden 20px sağa */
    }
    
    .logo h2 {
      margin: 0;
      color: #2563eb;
    }
    
    .search-box {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50px;
      padding: 5px 15px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      width: 250px;
    }
    
    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 10px 0;
      font-size: 16px;
      color: #333;
      outline: none;
    }
    
    .search-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    
    .menu-content {
      position: fixed;
      top: 0;
      left: 0;
      width: 300px;
      height: 100vh;
      background-color: #fff;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    
    .menu-header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 5px;
    }
    
    .menu-nav {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .menu-link {
      color: #000;
      font-size: 1.2rem;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
    }
    
    .menu-link.active, .menu-link:hover {
      color: #2563eb;
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
      .menu-content {
        width: 100%;
      }
      
      .search-box {
        width: 180px;
      }
    }
  `]
})
export class UserLayoutComponent implements OnInit {
  cartItemCount = 0;
  menuOpen = false;
  isHomePage = false;

  constructor(
    public localizationService: LocalizationService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataService.getCart().subscribe(cart => {
      this.cartItemCount = cart?.items.reduce((count, item) => count + item.quantity, 0) || 0;
    });
    
    // İlk yükleme kontrolü
    this.isHomePage = this.router.url === '/' || this.router.url === '';
    
    // Sayfa değişikliklerini izle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.url === '/' || event.url === '';
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}