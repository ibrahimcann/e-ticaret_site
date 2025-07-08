import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
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
      
      <div class="dashboard-graphs" style="display: flex; gap: 2rem; margin-bottom: 2rem; justify-content: center; align-items: flex-start;">
        <div class="card" style="flex: 1; max-width: 900px; min-width: 400px; margin: 0 auto; padding: 2.5rem 2.5rem 0.5rem 2.5rem; display: flex; flex-direction: column; align-items: center;">
          <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 1.5rem;">Son 10 Gün Sipariş Grafiği</h2>
          <canvas baseChart
            [data]="ordersChartData"
            [type]="ordersChartType"
            style="max-width: 100%; height: 440px; margin-bottom: 0;">
          </canvas>
          <h2 style="text-align: center; font-size: 2rem; margin-bottom: 1rem;">Ödeme Tipine Göre Siparişler</h2>
          <canvas baseChart
            [data]="paymentChartData"
            [type]="paymentChartType"
            style="max-width: 100%; height: 280px;">
          </canvas>
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

  // Grafik verileri
  public ordersChartData: ChartConfiguration<'line'>['data'] = {
    labels: [], // Son 10 gün
    datasets: [
      {
        data: [],
        label: 'Siparişler',
        fill: true,
        tension: 0.5,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.1)'
      }
    ]
  };
  public ordersChartType: ChartType = 'line';

  // Ödeme tipine göre sipariş grafiği verisi
  public paymentChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Tek Çekim', 'Taksitli Kredi Kartı', 'Kapıda Ödeme', 'Havale/EFT'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#22c55e', '#a21caf', '#06b6d4', '#eab308'],
        hoverBackgroundColor: ['#16a34a', '#7e22ce', '#0891b2', '#ca8a04']
      }
    ]
  };
  public paymentChartType: ChartType = 'doughnut';

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

    // Son 10 günün siparişlerini getir
    this.dataService.getOrders().subscribe((orders: any[]) => {
      const last10Days = Array.from({length: 10}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (9 - i));
        return d.toISOString().slice(0, 10);
      });

      this.ordersChartData.labels = last10Days;

      const ordersPerDay = last10Days.map(date =>
        orders.filter((o: any) => o.created_at?.slice(0, 10) === date).length
      );
      this.ordersChartData.datasets[0].data = ordersPerDay;

      // Ödeme tipine göre dağılım
      const paymentCounts = [0, 0, 0, 0];
      orders.forEach(order => {
        switch (order.paymentType) {
          case 'Tek Çekim':
          case 0:
            paymentCounts[0]++;
            break;
          case 'Taksitli Kredi Kartı':
          case 1:
            paymentCounts[1]++;
            break;
          case 'Kapıda Ödeme':
          case 2:
            paymentCounts[2]++;
            break;
          case 'Havale/EFT':
          case 3:
            paymentCounts[3]++;
            break;
        }
      });
      this.paymentChartData.datasets[0].data = paymentCounts;
    });
  }
}