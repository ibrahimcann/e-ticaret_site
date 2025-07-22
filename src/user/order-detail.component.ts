import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../shared/models/order.model';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-detail',
  template: `
    <div *ngIf="order; else notFound">
      <h2>Sipariş Detayı - #{{ order.id }}</h2>
      <p><strong>Tarih:</strong> {{ order.createdAt | date:'short' }}</p>
      <p><strong>Tutar:</strong> {{ order.total | currency:'TRY' }}</p>
      <p><strong>Durum:</strong> {{ order.status }}</p>
      <h3>Ürünler</h3>
      <ul>
        <li *ngFor="let item of order.items">
          {{ item.product?.name || item.productId }} - {{ item.quantity }} x {{ item.price | currency:'TRY' }}
        </li>
      </ul>
      <h3>Adres</h3>
      <p><strong>Sevk:</strong> {{ order.shippingAddress.street }}, {{ order.shippingAddress.city }}</p>
      <p><strong>Fatura:</strong> {{ order.billingAddress.street }}, {{ order.billingAddress.city }}</p>
    </div>
    <ng-template #notFound>
      <p>Sipariş bulunamadı.</p>
    </ng-template>
  `,
  styles: [`
    h2 { margin-bottom: 1rem; }
    h3 { margin-top: 1.5rem; }
    ul { list-style: disc; margin-left: 2rem; }
    p { margin: 0.5rem 0; }
  `]
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.order = this.orderService.getOrderById(id);
    }
  }
} 