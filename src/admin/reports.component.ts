import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/services/data.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-reports">
      <h2>Stok Durumu</h2>
      <p>Bitmek üzere olan ürünler (stok 20 ve altı):</p>
      <table *ngIf="lowStockProducts.length > 0" class="stock-table">
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of lowStockProducts">
            <td>{{ product.name }}</td>
            <td>{{ product.stock }}</td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="lowStockProducts.length === 0">
        Tüm ürünlerin stoğu yeterli.
      </div>
    </div>
  `,
  styles: [`
    .admin-reports {
      padding: 2rem;
      color: #232c3d;
    }
    .admin-reports h2 {
      margin-bottom: 1rem;
    }
    .stock-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .stock-table th, .stock-table td {
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
      text-align: left;
    }
    .stock-table th {
      background: #f3f4f6;
    }
  `]
})
export class ReportsComponent implements OnInit {
  lowStockProducts: Product[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.lowStockProducts = products.filter(p => p.stock <= 20);
    });
  }
} 