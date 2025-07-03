import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>{{ localizationService.t('admin.dashboard') }}</h1>
      
      <div class="stats-grid grid grid-4">
        <div class="stat-card card">
          <div class="stat-icon">📦</div>
          <div class="stat-info">
            <h3>{{ stats.products }}</h3>
            <p>{{ localizationService.t('admin.products') }}</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <h3>{{ stats.users }}</h3>
            <p>{{ localizationService.t('admin.users') }}</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">🛒</div>
          <div class="stat-info">
            <h3>{{ stats.orders }}</h3>
            <p>{{ localizationService.t('admin.orders') }}</p>
          </div>
        </div>
        
        <div class="stat-card card">
          <div class="stat-icon">📝</div>
          <div class="stat-info">
            <h3>{{ stats.blogPosts }}</h3>
            <p>Blog Posts</p>
          </div>
        </div>
      </div>
      
      <div class="recent-section">
        <div class="card">
          <h2>Recent Activity</h2>
          <div class="activity-list">
            <div class="activity-item">
              <span class="activity-icon">📦</span>
              <span>New product added: "Wireless Headphones"</span>
              <span class="activity-time">2 hours ago</span>
            </div>
            <div class="activity-item">
              <span class="activity-icon">🛒</span>
              <span>Order #1234 completed</span>
              <span class="activity-time">4 hours ago</span>
            </div>
            <div class="activity-item">
              <span class="activity-icon">👥</span>
              <span>New user registered</span>
              <span class="activity-time">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid {
      margin-bottom: 2rem;
    }
    
    .stat-card {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .stat-icon {
      font-size: 2rem;
    }
    
    .stat-info h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #2563eb;
    }
    
    .stat-info p {
      margin: 0;
      color: #6b7280;
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 0.5rem;
    }
    
    .activity-icon {
      font-size: 1.25rem;
    }
    
    .activity-time {
      margin-left: auto;
      color: #6b7280;
      font-size: 0.875rem;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    products: 0,
    users: 0,
    orders: 0,
    blogPosts: 0
  };

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.stats.products = products.length;
    });
    
    this.dataService.getBlogPosts().subscribe(posts => {
      this.stats.blogPosts = posts.length;
    });
    
    // Mock data for users and orders
    this.stats.users = 156;
    this.stats.orders = 89;
  }
}