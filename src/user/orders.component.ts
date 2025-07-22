import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Order } from '../shared/models/order.model';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Siparişlerim</h2>
    <div *ngIf="orders.length === 0">Hiç siparişiniz yok.</div>
    <ul *ngIf="orders.length > 0">
      <li *ngFor="let order of orders">
        <strong>Sipariş No:</strong> {{ order.id }}<br>
        <strong>Tarih:</strong> {{ order.createdAt | date:'short' }}<br>
        <strong>Tutar:</strong> {{ order.total | currency:'TRY' }}<br>
        <strong>Durum:</strong> {{ order.status }}<br>
        <button class="details-btn" (click)="openModal(order)">View Details</button>
      </li>
    </ul>

    <!-- Modal -->
    <div class="modal-backdrop" *ngIf="showModal" (click)="closeModal()"></div>
    <div class="modal" *ngIf="showModal">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="closeModal()">&times;</button>
        <ng-container *ngIf="selectedOrder; else notFound">
          <h2>Sipariş Detayı - #{{ selectedOrder.id }}</h2>
          <p><strong>Tarih:</strong> {{ selectedOrder.createdAt | date:'short' }}</p>
          <p><strong>Tutar:</strong> {{ selectedOrder.total | currency:'TRY' }}</p>
          <p><strong>Durum:</strong> {{ selectedOrder.status }}</p>
          <h3>Ürünler</h3>
          <ul>
            <li *ngFor="let item of selectedOrder.items">
              {{ item.product?.name || item.productId }} - {{ item.quantity }} x {{ item.price | currency:'TRY' }}
            </li>
          </ul>
          <h3>Adres</h3>
          <p><strong>Sevk:</strong> {{ selectedOrder.shippingAddress.street }}, {{ selectedOrder.shippingAddress.city }}</p>
          <p><strong>Fatura:</strong> {{ selectedOrder.billingAddress.street }}, {{ selectedOrder.billingAddress.city }}</p>
        </ng-container>
        <ng-template #notFound>
          <p>Sipariş bulunamadı.</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    h2 { margin-bottom: 1rem; }
    ul { list-style: none; padding: 0; }
    li { border: 1px solid #ccc; margin-bottom: 1rem; padding: 1rem; border-radius: 8px; }
    .details-btn { display: inline-block; margin-top: 0.5rem; padding: 0.4rem 1rem; background: #64748b; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 500; border: none; cursor: pointer; }
    .details-btn:hover { background: #334155; }
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 1000;
    }
    .modal {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      z-index: 1001;
      min-width: 340px;
      max-width: 95vw;
      min-height: 200px;
      padding: 0;
      animation: fadeIn 0.2s;
    }
    .modal-content {
      padding: 2rem 2.5rem 1.5rem 2.5rem;
      position: relative;
    }
    .close-btn {
      position: absolute;
      top: 12px; right: 18px;
      background: none;
      border: none;
      font-size: 2rem;
      color: #888;
      cursor: pointer;
    }
    .close-btn:hover { color: #222; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, -60%); }
      to { opacity: 1; transform: translate(-50%, -50%); }
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  showModal = false;
  selectedOrder: Order | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Şimdilik kullanıcı ID'si sabit, ileride auth ile dinamik yapılabilir
    const userId = 'user1';
    this.orders = this.orderService.getOrdersByUser(userId);
  }

  openModal(order: Order) {
    this.selectedOrder = order;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedOrder = null;
  }
} 