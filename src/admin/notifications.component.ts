import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-page">
      <div class="page-header">
        <h1>Bildirimler</h1>
      </div>
      <div class="notification-summary-grid">
        <div class="summary-box" (click)="openDetail('order')">
          <div class="summary-title">Yeni Sipariş</div>
          <div class="summary-value">12</div>
        </div>
        <div class="summary-box" (click)="openDetail('cargo')">
          <div class="summary-title">Kargo Bekleyen</div>
          <div class="summary-value">5</div>
        </div>
        <div class="summary-box" (click)="openDetail('sales')">
          <div class="summary-title">Günlük Satış Tutarı</div>
          <div class="summary-value">₺2.350</div>
        </div>
        <div class="summary-box" (click)="openDetail('comment')">
          <div class="summary-title">Ürün Yorumu</div>
          <div class="summary-value">7</div>
        </div>
        <div class="summary-box" (click)="openDetail('member')">
          <div class="summary-title">Yeni Üye</div>
          <div class="summary-value">4</div>
        </div>
      </div>
      <div class="card">
        <h2>Fiyat Alarmı Listesi</h2>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>Ürün</th>
                <th>Hedef Fiyat</th>
                <th>Mevcut Fiyat</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let alarm of priceAlarms">
                <td>{{ alarm.user }}</td>
                <td>{{ alarm.product }}</td>
                <td>{{ alarm.targetPrice }}</td>
                <td>{{ alarm.currentPrice }}</td>
                <td>{{ alarm.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <h2>Stok Alarm Listesi</h2>
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>Ürün</th>
                <th>Talep Tarihi</th>
                <th>Stok Durumu</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let alarm of stockAlarms">
                <td>{{ alarm.user }}</td>
                <td>{{ alarm.product }}</td>
                <td>{{ alarm.requestDate }}</td>
                <td>{{ alarm.stockStatus }}</td>
                <td>{{ alarm.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-backdrop" *ngIf="modalOpen" (click)="closeDetail()"></div>
      <div class="modal" *ngIf="modalOpen">
        <div class="modal-content">
          <button class="modal-close" (click)="closeDetail()">&times;</button>
          <h3>{{ modalTitle }}</h3>
          <div class="modal-body">
            <ng-container [ngSwitch]="modalType">
              <div *ngSwitchCase="'order'">
                <p>Son 24 saatte alınan yeni siparişler: <b>12</b></p>
                <ul><li>Sipariş #1001 - Ahmet Yılmaz</li><li>Sipariş #1002 - Ayşe Demir</li></ul>
              </div>
              <div *ngSwitchCase="'cargo'">
                <p>Kargoya verilmesi beklenen siparişler: <b>5</b></p>
                <ul><li>Sipariş #1003 - Mehmet Kaya</li><li>Sipariş #1004 - Zeynep Koç</li></ul>
              </div>
              <div *ngSwitchCase="'sales'">
                <p>Bugünkü toplam satış tutarı: <b>₺2.350</b></p>
                <ul><li>Toplam sipariş: 8</li></ul>
              </div>
              <div *ngSwitchCase="'comment'">
                <p>Yeni ürün yorumları: <b>7</b></p>
                <ul><li>"Çok memnun kaldım!" - Ayşe</li><li>"Kargo hızlıydı." - Mehmet</li></ul>
              </div>
              <div *ngSwitchCase="'member'">
                <p>Bugün kayıt olan yeni üyeler: <b>4</b></p>
                <ul><li>Ali Veli</li><li>Fatma Güneş</li></ul>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.notifications-page {
      background: #f8fafc;
      min-height: 100vh;
      padding: 2rem 0 3rem 0;
    }
    .page-header {
      margin-bottom: 2rem;
      padding-left: 2rem;
    }
    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #222;
      margin: 0;
      letter-spacing: 0;
      text-align: left;
    }
    .notification-summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.2rem;
      margin-bottom: 2.5rem;
      padding: 0 2rem;
    }
    .summary-box {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
      padding: 1.2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      min-height: 80px;
      border-left: 5px solid #2563eb;
      cursor: pointer;
      transition: box-shadow 0.2s, border 0.2s;
    }
    .summary-box:hover {
      box-shadow: 0 6px 18px 0 rgba(37,99,235,0.10);
      border-left: 5px solid #1d4ed8;
    }
    .summary-title {
      font-size: 1rem;
      color: #64748b;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .summary-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #222;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
      padding: 1.5rem 1rem 2rem 1rem;
      margin-bottom: 2rem;
      max-width: 96%;
      margin-left: auto;
      margin-right: auto;
    }
    .card h2 {
      color: #222;
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.5px;
    }
    .desc {
      color: #64748b;
      font-size: 1rem;
      margin-bottom: 1.2rem;
    }
    .table-wrapper {
      overflow-x: auto;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 1px 4px 0 rgba(0,0,0,0.03);
      border: 2px solid #2563eb;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 1rem;
    }
    .table th, .table td {
      padding: 0.75rem 1rem;
      text-align: left;
    }
    .table th {
      background: #e8f0fe;
      color: #2563eb;
      font-weight: 700;
      border-bottom: 2px solid #2563eb;
    }
    .table td {
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      color: #222;
    }
    .table tr:last-child td {
      border-bottom: none;
    }
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.2);
      z-index: 1000;
    }
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
      z-index: 1001;
      min-width: 320px;
      max-width: 90vw;
      min-height: 180px;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .modal-content h3 {
      margin-top: 0;
      font-size: 1.3rem;
      color: #2563eb;
      margin-bottom: 1rem;
    }
    .modal-close {
      position: absolute;
      top: 10px;
      right: 18px;
      background: none;
      border: none;
      font-size: 2rem;
      color: #64748b;
      cursor: pointer;
    }
    .modal-body ul {
      margin: 0.5rem 0 0 1rem;
      padding: 0;
      color: #222;
    }
    .modal-body p {
      margin-bottom: 0.5rem;
    }
    @media (max-width: 700px) {
      .notifications-page {
        padding: 0.5rem 0 2rem 0;
      }
      .notification-summary-grid {
        padding: 0 0.5rem;
      }
      .card {
        padding: 1rem 0.5rem 1.5rem 0.5rem;
      }
    }
  `]
})
export class NotificationsComponent {
  priceAlarms = [
    { user: 'Ahmet Yılmaz', product: 'Akıllı Telefon', targetPrice: '₺8.000', currentPrice: '₺8.500', status: 'Bekliyor' },
    { user: 'Ayşe Demir', product: 'Dizüstü Bilgisayar', targetPrice: '₺15.000', currentPrice: '₺16.200', status: 'Bekliyor' }
  ];
  stockAlarms = [
    { user: 'Mehmet Kaya', product: 'Bluetooth Kulaklık', requestDate: '2024-06-01', stockStatus: 'Stokta Yok', status: 'Bekliyor' },
    { user: 'Zeynep Koç', product: 'Tablet', requestDate: '2024-06-02', stockStatus: 'Stokta Yok', status: 'Bekliyor' }
  ];
  modalOpen = false;
  modalType: string | null = null;
  modalTitle = '';

  openDetail(type: string) {
    this.modalType = type;
    this.modalOpen = true;
    switch(type) {
      case 'order': this.modalTitle = 'Yeni Sipariş Detayı'; break;
      case 'cargo': this.modalTitle = 'Kargo Bekleyen Detayı'; break;
      case 'sales': this.modalTitle = 'Günlük Satış Tutarı Detayı'; break;
      case 'comment': this.modalTitle = 'Ürün Yorumu Detayı'; break;
      case 'member': this.modalTitle = 'Yeni Üye Detayı'; break;
      default: this.modalTitle = '';
    }
  }
  closeDetail() {
    this.modalOpen = false;
    this.modalType = null;
    this.modalTitle = '';
  }
} 