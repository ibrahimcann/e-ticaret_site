import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexLegend,
  ApexResponsive,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
};

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend: ApexLegend;
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
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
      
      <div class="dashboard-graphs">
        <div class="card graph-card">
          <apx-chart
            [series]="barChartOptions.series"
            [chart]="barChartOptions.chart"
            [xaxis]="barChartOptions.xaxis"
            [title]="barChartOptions.title"
            [dataLabels]="barChartOptions.dataLabels">
          </apx-chart>
        </div>
        <div class="card graph-card">
          <apx-chart
            [series]="donutChartOptions.series"
            [chart]="donutChartOptions.chart"
            [labels]="donutChartOptions.labels"
            [legend]="donutChartOptions.legend"
            [responsive]="donutChartOptions.responsive"
            [title]="donutChartOptions.title">
          </apx-chart>
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
    
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .dashboard-graphs {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    .graph-card {
      flex: 1 1 0;
      min-width: 0;
      /* min-height: 600px; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: auto;
      padding: 1.5rem 1rem;
    }
    .card {
      padding: 1.5rem 1rem;
    }
    .centered-canvas {
      display: block;
      margin: auto;
      max-width: 100% !important;
      max-height: 100% !important;
    }
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 260px; /* sidebar genişliğiniz neyse */
      background: #232c3d; /* kendi renginiz */
      overflow-y: auto;
      z-index: 1000;
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

  public barChartOptions: BarChartOptions = {
    series: [{ name: 'Siparişler', data: [] }],
    chart: { type: 'bar', height: 400 },
    xaxis: { categories: [] },
    title: { text: 'Son 10 Gün Sipariş Grafiği' },
    dataLabels: { enabled: false }
  };

  public donutChartOptions: DonutChartOptions = {
    series: [],
    chart: { type: 'donut', height: 400 },
    labels: ['Tek Çekim', 'Taksitli Kredi Kartı', 'Kapıda Ödeme', 'Havale/EFT'],
    legend: { position: 'top' },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: 'bottom' }
        }
      }
    ],
    title: { text: 'Ödeme Tipine Göre Siparişler' }
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
    this.stats.users = 156;
    this.stats.orders = 89;

    // SABİT (MOCK) VERİ İLE GRAFİKLERİ DOLDUR
    this.barChartOptions = {
      series: [{ name: 'Siparişler', data: [2, 1, 3, 0, 4, 2, 1, 5, 3, 2] }],
      chart: { type: 'bar', height: 400 },
      xaxis: { categories: ['2025-06-29','2025-06-30','2025-07-01','2025-07-02','2025-07-03','2025-07-04','2025-07-05','2025-07-06','2025-07-07','2025-07-08'] },
      title: { text: 'Son 10 Gün Sipariş Grafiği' },
      dataLabels: { enabled: false }
    };
    this.donutChartOptions = {
      series: [5, 3, 2, 4],
      chart: { type: 'donut', height: 400 },
      labels: ['Tek Çekim', 'Taksitli Kredi Kartı', 'Kapıda Ödeme', 'Havale/EFT'],
      legend: { position: 'top' },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 300 },
            legend: { position: 'bottom' }
          }
        }
      ],
      title: { text: 'Ödeme Tipine Göre Siparişler' }
    };
  }
}