import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { Cart, CartItem } from '../shared/models/order.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-page">
      <div class="container">
        <h1>{{ localizationService.t('nav.cart') }}</h1>
        
        <div *ngIf="!cart || cart.items.length === 0" class="empty-cart">
          <div class="card">
            <h2>{{ localizationService.t('cart.empty') }}</h2>
            <p>Start shopping to add items to your cart.</p>
            <a routerLink="/products" class="btn btn-primary">Continue Shopping</a>
          </div>
        </div>
        
        <div *ngIf="cart && cart.items.length > 0" class="cart-content">
          <div class="cart-items">
            <div class="card">
              <h2>Shopping Cart</h2>
              <div class="cart-item" *ngFor="let item of cart.items">
                <img [src]="item.product.imageUrl" [alt]="item.product.name" class="item-image">
                <div class="item-details">
                  <h3>{{ item.product.name }}</h3>
                  <p class="item-price">\${{ item.price }}</p>
                </div>
                <div class="item-quantity">
                  <label>{{ localizationService.t('cart.quantity') }}:</label>
                  <div class="quantity-controls">
                    <button class="btn btn-secondary" (click)="updateQuantity(item, item.quantity - 1)">-</button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button class="btn btn-secondary" (click)="updateQuantity(item, item.quantity + 1)">+</button>
                  </div>
                </div>
                <div class="item-total">
                  <p>\${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
                <div class="item-actions">
                  <button class="btn btn-danger" (click)="removeItem(item.id)">
                    {{ localizationService.t('cart.remove') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="cart-summary">
            <div class="card">
              <h3>Order Summary</h3>
              <div class="summary-line">
                <span>Subtotal:</span>
                <span>\${{ cart.total.toFixed(2) }}</span>
              </div>
              <div class="summary-line">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div class="summary-line">
                <span>Tax:</span>
                <span>\${{ (cart.total * 0.1).toFixed(2) }}</span>
              </div>
              <hr>
              <div class="summary-line total">
                <span><strong>{{ localizationService.t('cart.total') }}:</strong></span>
                <span><strong>\${{ (cart.total * 1.1).toFixed(2) }}</strong></span>
              </div>
              <button class="btn btn-primary btn-checkout">
                {{ localizationService.t('cart.checkout') }}
              </button>
              <a routerLink="/products" class="btn btn-secondary">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page {
      padding: 2rem 0;
    }
    
    .empty-cart {
      max-width: 500px;
      margin: 3rem auto;
      text-align: center;
    }
    
    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }
    
    .cart-item {
      display: grid;
      grid-template-columns: 100px 1fr auto auto auto;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #e5e7eb;
      align-items: center;
    }
    
    .cart-item:last-child {
      border-bottom: none;
    }
    
    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 0.5rem;
    }
    
    .item-details h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.125rem;
    }
    
    .item-price {
      margin: 0;
      color: #6b7280;
    }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .quantity-controls button {
      width: 32px;
      height: 32px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .quantity {
      min-width: 40px;
      text-align: center;
      font-weight: 600;
    }
    
    .item-total {
      text-align: right;
      font-weight: 600;
    }
    
    .cart-summary {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }
    
    .summary-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .summary-line.total {
      font-size: 1.125rem;
      margin-top: 1rem;
    }
    
    .btn-checkout {
      width: 100%;
      margin: 1rem 0 0.5rem 0;
      padding: 1rem;
      font-size: 1.125rem;
    }
    
    .cart-summary .btn-secondary {
      width: 100%;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
      
      .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 1rem;
      }
      
      .item-quantity,
      .item-total,
      .item-actions {
        grid-column: 1 / -1;
        justify-self: start;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.dataService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeItem(item.id);
    } else {
      // In a real app, you'd update the quantity through the service
      item.quantity = newQuantity;
      this.updateCartTotal();
    }
  }

  removeItem(itemId: string) {
    this.dataService.removeFromCart(itemId).subscribe(() => {
      // Cart will be updated through the observable
    });
  }

  private updateCartTotal() {
    if (this.cart) {
      this.cart.total = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  }
}