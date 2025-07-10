import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalizationService } from '../shared/services/localization.service';
import { LanguageSelectorComponent } from '../shared/components/language-selector.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSelectorComponent],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav class="admin-nav">
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="admin-nav-item">
            📊 {{ localizationService.t('admin.dashboard') }}
          </a>
          <a routerLink="/admin/products" routerLinkActive="active" class="admin-nav-item">
            📦 {{ localizationService.t('admin.products') }}
          </a>
          <a routerLink="/admin/categories" routerLinkActive="active" class="admin-nav-item">
            📁 {{ localizationService.t('admin.categories') }}
          </a>
          <a routerLink="/admin/brands" routerLinkActive="active" class="admin-nav-item">
            🏷️ {{ localizationService.t('admin.brands') }}
          </a>
          <a routerLink="/admin/users" routerLinkActive="active" class="admin-nav-item">
            👥 {{ localizationService.t('admin.users') }}
          </a>
          <a routerLink="/admin/orders" routerLinkActive="active" class="admin-nav-item">
            🛒 {{ localizationService.t('admin.orders') }}
          </a>
          <a routerLink="/admin/stock" routerLinkActive="active" class="admin-nav-item">
            📦 Stok Durumu
          </a>
          <a routerLink="/admin/blog" routerLinkActive="active" class="admin-nav-item">
            📝 {{ localizationService.t('admin.blog') }}
          </a>
          <a routerLink="/admin/pages" routerLinkActive="active" class="admin-nav-item">
            📄 {{ localizationService.t('admin.pages') }}
          </a>
          <a routerLink="/admin/favorites" routerLinkActive="active" class="admin-nav-item">
            ⭐ {{ localizationService.t('admin.favorites') }}
          </a>
          <a routerLink="/admin/notifications" routerLinkActive="active" class="admin-nav-item">
            🔔 {{ localizationService.t('admin.notifications') }}
          </a>
          <a routerLink="/admin/returns" routerLinkActive="active" class="admin-nav-item">
            🔄 İade / Değişim
          </a>
          <a routerLink="/admin/campaigns" routerLinkActive="active" class="admin-nav-item">
            🎟️ Kampanyalar / Kuponlar
          </a>
        </nav>
        <div class="admin-footer">
          <app-language-selector></app-language-selector>
          <a routerLink="/" class="admin-nav-item">🏠 View Site</a>
        </div>
      </aside>
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    .admin-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 260px;
      background: #232c3d;
      overflow-y: auto;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    }
    .admin-content {
      margin-left: 260px;
      flex: 1;
      padding: 2rem;
    }
    .admin-logo {
      padding: 1rem 0;
      border-bottom: 1px solid #374151;
      margin-bottom: 1rem;
    }
    .admin-logo h2 {
      color: white;
      margin: 0;
      font-size: 1.25rem;
    }
    .admin-footer {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid #374151;
    }
  `]
})
export class AdminLayoutComponent {
  constructor(public localizationService: LocalizationService) {}
}