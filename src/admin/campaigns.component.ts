import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-campaigns',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="campaigns-header">
      <h1>Kampanyalar ve İndirim Kuponları</h1>
      <button class="add-btn" (click)="showAddForm = !showAddForm">Kupon Oluştur</button>
    </div>
    <div *ngIf="showAddForm" class="add-form">
      <h2>Yeni Kampanya / Kupon Ekle</h2>
      <form (ngSubmit)="addCampaign()" #campaignForm="ngForm">
        <label>Kampanya/Kupon Adı
          <input type="text" [(ngModel)]="newCampaign.name" name="name" required />
        </label>
        <label>Tür
          <select [(ngModel)]="newCampaign.type" name="type" required>
            <option value="Yüzde">Yüzde İndirim</option>
            <option value="Ürün">Ürün Bazlı</option>
            <option value="Kupon">Kodlu Kupon</option>
          </select>
        </label>
        <label *ngIf="newCampaign.type === 'Yüzde'">
          Yüzde (%)
          <input type="number" [(ngModel)]="newCampaign.value" name="value" min="1" max="100" />
        </label>
        <label *ngIf="newCampaign.type === 'Kupon'">
          Kupon Kodu
          <input type="text" [(ngModel)]="newCampaign.code" name="code" />
        </label>
        <label *ngIf="newCampaign.type === 'Ürün'">
          Ürün Adı
          <input type="text" [(ngModel)]="newCampaign.product" name="product" />
        </label>
        <button type="submit" class="btn save">Kaydet</button>
        <button type="button" class="btn cancel" (click)="showAddForm = false">İptal</button>
      </form>
    </div>
    <div class="campaigns-table-wrapper">
      <table class="campaigns-table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Tür</th>
            <th>Değer</th>
            <th>Kupon Kodu</th>
            <th>Ürün</th>
            <th>Durum</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of campaigns">
            <td>{{ c.name }}</td>
            <td>{{ c.type }}</td>
            <td>{{ c.type === 'Yüzde' ? c.value + '%' : (c.type === 'Ürün' ? 'Ürün Bazlı' : '-') }}</td>
            <td>{{ c.type === 'Kupon' ? c.code : '-' }}</td>
            <td>{{ c.type === 'Ürün' ? c.product : '-' }}</td>
            <td>
              <span class="status-badge" [ngClass]="c.active ? 'active' : 'inactive'">{{ c.active ? 'Aktif' : 'Pasif' }}</span>
            </td>
            <td>
              <button class="btn toggle" (click)="toggleActive(c)">{{ c.active ? 'Pasifleştir' : 'Aktifleştir' }}</button>
              <button class="btn delete" (click)="deleteCampaign(c)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .campaigns-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #222;
      margin: 0 0 0.5rem 0;
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
      margin: 0;
    }
    .add-btn:hover {
      background: #1d4ed8;
    }
    .add-form {
      background: #f3f4f6;
      border-radius: 10px;
      padding: 1.5rem 1rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
      max-width: 500px;
    }
    .add-form label {
      display: block;
      margin-bottom: 1rem;
      color: #222;
      font-weight: 500;
    }
    .add-form input, .add-form select {
      width: 100%;
      padding: 0.5rem;
      border-radius: 6px;
      border: 1px solid #d1d5db;
      margin-top: 0.3rem;
      font-size: 1rem;
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
    .btn.save {
      background: #22d3ee;
      color: #0369a1;
    }
    .btn.save:hover {
      background: #06b6d4;
    }
    .btn.cancel {
      background: #f3f4f6;
      color: #222;
    }
    .btn.cancel:hover {
      background: #e5e7eb;
    }
    .btn.toggle {
      background: #fef9c3;
      color: #d97706;
    }
    .btn.toggle:hover {
      background: #fde68a;
    }
    .btn.delete {
      background: #fee2e2;
      color: #dc2626;
    }
    .btn.delete:hover {
      background: #fecaca;
    }
    .campaigns-table-wrapper {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
      padding: 1.5rem 1rem 2rem 1rem;
      max-width: 100%;
    }
    .campaigns-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 1rem;
    }
    .campaigns-table th, .campaigns-table td {
      padding: 0.75rem 1rem;
      text-align: left;
    }
    .campaigns-table th {
      background: #e8f0fe;
      color: #2563eb;
      font-weight: 700;
      border-bottom: 2px solid #2563eb;
    }
    .campaigns-table td {
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      color: #222;
    }
    .campaigns-table tr:last-child td {
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
    .status-badge.active {
      background-color: #d1fae5;
      color: #059669;
    }
    .status-badge.inactive {
      background-color: #fee2e2;
      color: #dc2626;
    }
  `]
})
export class CampaignsComponent {
  showAddForm = false;
  newCampaign: any = { name: '', type: 'Yüzde', value: '', code: '', product: '', active: true };
  campaigns = [
    { name: 'Yaz İndirimi', type: 'Yüzde', value: 20, code: '', product: '', active: true },
    { name: 'Laptop Kuponu', type: 'Kupon', value: '', code: 'LAPTOP2024', product: '', active: false },
    { name: 'Telefon Kampanyası', type: 'Ürün', value: '', code: '', product: 'Akıllı Telefon', active: true }
  ];

  addCampaign() {
    const c = { ...this.newCampaign };
    c.active = true;
    this.campaigns.push(c);
    this.newCampaign = { name: '', type: 'Yüzde', value: '', code: '', product: '', active: true };
    this.showAddForm = false;
  }
  toggleActive(c: any) {
    c.active = !c.active;
  }
  deleteCampaign(c: any) {
    this.campaigns = this.campaigns.filter(x => x !== c);
  }
} 