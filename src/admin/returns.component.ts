import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-returns',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="returns-header">
      <h1>İade ve Değişim Talepleri</h1>
      <button class="add-btn">➕ İade / Değişim</button>
    </div>
    <p class="desc">Kullanıcıların gönderdiği iade istekleri yönetilir. Admin onaylayabilir, reddedebilir, durum güncelleyebilir.</p>
    <div class="returns-table-wrapper">
      <table class="returns-table">
        <thead>
          <tr>
            <th>Kullanıcı</th>
            <th>Ürün</th>
            <th>Talep Türü</th>
            <th>Tarih</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let req of returnRequests">
            <td>{{ req.user }}</td>
            <td>{{ req.product }}</td>
            <td>{{ req.type }}</td>
            <td>{{ req.date }}</td>
            <td>
              <span class="status-badge" [ngClass]="req.status.toLowerCase()">{{ req.status }}</span>
            </td>
            <td>
              <button class="btn approve" (click)="updateStatus(req, 'Onaylandı')">Onayla</button>
              <button class="btn reject" (click)="updateStatus(req, 'Reddedildi')">Reddet</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .returns-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #222;
      margin: 0;
    }
    .add-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1.2rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .add-btn:hover {
      background: #1d4ed8;
    }
    .desc {
      color: #64748b;
      font-size: 1rem;
      margin-bottom: 1.2rem;
    }
    .returns-table-wrapper {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
      padding: 1.5rem 1rem 2rem 1rem;
      max-width: 100%;
    }
    .returns-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 1rem;
    }
    .returns-table th, .returns-table td {
      padding: 0.75rem 1rem;
      text-align: left;
    }
    .returns-table th {
      background: #e8f0fe;
      color: #2563eb;
      font-weight: 700;
      border-bottom: 2px solid #2563eb;
    }
    .returns-table td {
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      color: #222;
    }
    .returns-table tr:last-child td {
      border-bottom: none;
    }
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 500;
      background-color: #f3f4f6;
      color: #64748b;
      text-transform: capitalize;
    }
    .status-badge.onaylandı {
      background-color: #d1fae5;
      color: #059669;
    }
    .status-badge.reddedildi {
      background-color: #fee2e2;
      color: #dc2626;
    }
    .status-badge.bekliyor {
      background-color: #fef9c3;
      color: #d97706;
    }
    .btn {
      border: none;
      border-radius: 6px;
      padding: 0.3rem 0.9rem;
      font-size: 0.95rem;
      font-weight: 500;
      margin-right: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn.approve {
      background: #22d3ee;
      color: #0369a1;
    }
    .btn.approve:hover {
      background: #06b6d4;
    }
    .btn.reject {
      background: #fee2e2;
      color: #dc2626;
    }
    .btn.reject:hover {
      background: #fecaca;
    }
  `]
})
export class ReturnsComponent {
  returnRequests = [
    { user: 'Ahmet Yılmaz', product: 'Akıllı Telefon', type: 'İade', date: '2024-06-10', status: 'Bekliyor' },
    { user: 'Ayşe Demir', product: 'Dizüstü Bilgisayar', type: 'Değişim', date: '2024-06-11', status: 'Bekliyor' }
  ];

  updateStatus(req: any, status: string) {
    req.status = status;
  }
} 