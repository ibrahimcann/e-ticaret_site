import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../shared/services/localization.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orders-admin">
      <div class="page-header">
        <h1>{{ localizationService.t('admin.orders') }}</h1>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>{{ localizationService.t('cart.total') }}</th>
              <th>{{ localizationService.t('common.status') }}</th>
              <th>Date</th>
              <th>{{ localizationService.t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of sampleOrders">
              <td>#{{ order.id }}</td>
              <td>{{ order.customerName }}</td>
              <td>\${{ order.total.toFixed(2) }}</td>
              <td>
                <span class="status-badge" [ngClass]="'status-' + order.status">
                  {{ localizationService.t('order.status.' + order.status) }}
                </span>
              </td>
              <td>{{ order.createdAt | date:'shortDate' }}</td>
              <td>
                <button class="btn btn-secondary" style="margin-right: 0.5rem;">
                  View Details
                </button>
                <select class="status-select" [value]="order.status">
                  <option value="pending">{{ localizationService.t('order.status.pending') }}</option>
                  <option value="confirmed">{{ localizationService.t('order.status.confirmed') }}</option>
                  <option value="shipped">{{ localizationService.t('order.status.shipped') }}</option>
                  <option value="delivered">{{ localizationService.t('order.status.delivered') }}</option>
                  <option value="cancelled">{{ localizationService.t('order.status.cancelled') }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
    }
    
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .status-pending {
      background-color: #fef3c7;
      color: #d97706;
    }
    
    .status-confirmed {
      background-color: #dbeafe;
      color: #2563eb;
    }
    
    .status-shipped {
      background-color: #e0e7ff;
      color: #6366f1;
    }
    
    .status-delivered {
      background-color: #86efac;
      color: #16a34a;
    }
    
    .status-cancelled {
      background-color: #fca5a5;
      color: #dc2626;
    }
    
    .status-select {
      padding: 0.25rem 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }
  `]
})
export class AdminOrdersComponent {
  sampleOrders = [
    {
      id: '1001',
      customerName: 'John Doe',
      total: 299.99,
      status: 'confirmed',
      createdAt: new Date('2024-12-01')
    },
    {
      id: '1002',
      customerName: 'Jane Smith',
      total: 149.50,
      status: 'shipped',
      createdAt: new Date('2024-12-02')
    },
    {
      id: '1003',
      customerName: 'Bob Johnson',
      total: 75.25,
      status: 'pending',
      createdAt: new Date('2024-12-03')
    },
    {
      id: '1004',
      customerName: 'Alice Brown',
      total: 450.00,
      status: 'delivered',
      createdAt: new Date('2024-11-28')
    }
  ];

  constructor(public localizationService: LocalizationService) {}
}