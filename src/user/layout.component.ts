import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LocalizationService } from '../shared/services/localization.service';
import { DataService } from '../shared/services/data.service';
import { Cart } from '../shared/models/order.model';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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
        <div class="search-icons-container" *ngIf="isHomePage">
          <div class="search-box">
            <input type="text" #searchInput [(ngModel)]="searchTerm" placeholder="Ne aramak istersin?" class="search-input">
            <button class="search-button" (click)="onSearch()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <div class="search-icons">
            <button class="icon-btn" (click)="goToProfile()"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg></button>
            <button class="icon-btn" (click)="goToFavorites()"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-.9 1-.9-1A5.5 5.5 0 0 0 3.4 12l8.6 8.6 8.6-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg></button>
            <button class="icon-btn" (click)="goToCart()"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><path d="M2.5 3H5l2.68 13.39A2 2 0 0 0 9.62 18h7.76a2 2 0 0 0 1.94-1.61L21.5 6H6"/></svg></button>
          </div>
        </div>
        <div class="menu-content" *ngIf="menuOpen">
          <div class="menu-header">
            <button class="close-btn" (click)="toggleMenu()">✕</button>
            <span class="menu-logo" (click)="goToHome()" style="cursor:pointer;">MY APP</span>
          </div>
          <div class="menu-search">
            <input type="text" #searchInput [(ngModel)]="searchTerm" placeholder="Ne aramak istersin?" class="menu-search-input">
            <button class="menu-search-btn" (click)="onSearch()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
          <nav class="menu-nav">
            <a class="menu-link red" (click)="goToCategoryPage('indirim')">İNDİRİM</a>
            <a class="menu-link" (click)="goToCategoryPage('yeni')">YENİ</a>
            <a class="menu-link" (click)="goToCategoryPage('keten-karisimli')">KETEN KARIŞIMLI</a>
            <a class="menu-link" (click)="goToCategoryPage('giyim')">GİYİM</a>
            <a class="menu-link" (click)="goToCategoryPage('str-teen')">STR TEEN <span class="new-badge">NEW</span></a>
            <a class="menu-link" (click)="goToCategoryPage('casual-spor')">CASUAL SPOR</a>
            <a class="menu-link" (click)="goToCategoryPage('ayakkabi')">AYAKKABI</a>
            <a class="menu-link" (click)="goToCategoryPage('aksesuar')">AKSESUAR</a>
            <a class="menu-link" (click)="goToCategoryPage('canta')">ÇANTA</a>
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
    
    .search-icons-container {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
      flex-direction: row;
    }
    .search-box {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 25px;
      padding: 5px 18px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
      width: 250px;
    }
    .search-icons {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
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
      width: 350px;
      height: 100vh;
      background: #fff;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
      padding: 30px 30px 0 30px;
      z-index: 2000;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    .menu-logo {
      font-family: 'Georgia', serif;
      font-size: 2rem;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .menu-search {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }

    .menu-search-input {
      flex: 1;
      border: none;
      font-size: 1.1rem;
      outline: none;
      background: transparent;
    }

    .menu-search-btn {
      background: none;
      border: none;
      cursor: pointer;
    }

    .menu-nav {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .menu-link {
      font-size: 1.5rem;
      font-weight: bold;
      color: #111;
      text-decoration: none;
      transition: color 0.2s;
    }

    .menu-link.red {
      color: #e60023;
    }

    .new-badge {
      background: #111;
      color: #fff;
      font-size: 0.8rem;
      padding: 2px 6px;
      border-radius: 8px;
      margin-left: 6px;
      font-weight: normal;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 5px;
      outline: none;
      box-shadow: none;
    }

    @media (max-width: 768px) {
      .menu-content {
        width: 100%;
        padding: 20px 10px 0 10px;
      }
    }
  `]
})
export class UserLayoutComponent implements OnInit {
  cartItemCount = 0;
  menuOpen = false;
  isHomePage = false;
  searchTerm = '';
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

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

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  onSearch() {
    this.menuOpen = false;
    this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
  }

  focusSearchInput() {
    this.menuOpen = false;
    setTimeout(() => {
      this.searchInputRef?.nativeElement.focus();
    }, 300);
  }

  goToHome() {
    this.menuOpen = false;
    this.router.navigate(['/']);
  }

  goToCategory(category: string) {
    this.menuOpen = false;
    this.router.navigate(['/products'], { queryParams: { category } });
  }

  goToCategoryPage(path: string) {
    this.menuOpen = false;
    this.router.navigate(['/' + path]);
  }
}