import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Cart, CartItem } from '../shared/models/order.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-container">
      <div class="cart-items">
        <h1 class="cart-main-title">SEPETİN ({{ cart?.items?.length || 0 }})</h1>
        <div *ngIf="cart && cart.items.length > 0">
          <div *ngFor="let item of cart.items" class="cart-item">
            <img [src]="item.product.imageUrl" alt="{{item.product.name}}" />
            <div class="item-icons-absolute">
              <button class="icon-btn" title="Beğen">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" fill="#fff" stroke="#222"/>
                </svg>
              </button>
              <button class="icon-btn" title="Çöpe at" (click)="removeItem(item.id)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <rect x="5" y="6" width="14" height="14" rx="2" fill="#fff" stroke="#222"/>
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>
            <div class="item-details">
              <div class="item-title">{{item.product.name}}</div>
              <div class="item-variant"><span class="size">S</span> | <span class="color">Koyu lacivert</span></div>
              <div class="item-price">{{item.price | currency:'TRY':'symbol':'1.2-2':'tr'}}</div>
              <div class="item-quantity">
                <button (click)="updateQuantity(item, item.quantity - 1)">-</button>
                <span>{{item.quantity}}</span>
                <button (click)="updateQuantity(item, item.quantity + 1)">+</button>
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="!cart || cart.items.length === 0" class="empty-cart">
          <p>Sepetiniz boş.</p>
        </div>
      </div>
      <div class="cart-summary">
        <h2>ÖZET</h2>
        <div class="summary-line">
          <span>{{ cart?.items?.length || 0 }} ürün</span>
          <span>{{ cart?.total | currency:'TRY':'symbol':'1.2-2':'tr' }}</span>
        </div>
        <div class="summary-line">
          <span>Mağazaya gönderi</span>
          <span class="free">Ücretsiz!</span>
        </div>
        <div class="total">
          <span>TOPLAM <span class="tax-info">Vergiler dahil</span></span>
          <span>{{ cart?.total | currency:'TRY':'symbol':'1.2-2':'tr' }}</span>
        </div>
        <button class="checkout-btn">SİPARİŞİ İŞLEME KOY</button>
        <div class="info">
          <span class="icon">&#9888;</span> Ürünler rezerve edilmedi. Tükenme riskini alma!
        </div>
        <div class="promo">% Kampanya kodun var mı?</div>
        <div class="gift">Bir sonraki ekranda hediye seçeneklerini seç</div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      display: flex;
      justify-content: space-between;
      padding: 40px 60px;
      background: #fff;
      min-height: 80vh;
    }
    .cart-items {
      flex: 2;
    }
    .cart-items h1 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 32px;
      letter-spacing: 1px;
    }
    .cart-item {
      display: flex;
      margin-bottom: 32px;
      align-items: flex-start;
      position: relative;
      background: #fff;
      border-radius: 8px;
      min-height: 200px;
    }
    .cart-item img {
      width: 140px;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
      margin-right: 32px;
      background: #f5f5f5;
    }
    .item-icons-absolute {
      position: absolute;
      top: 16px;
      right: 24px;
      display: flex;
      gap: 16px;
      z-index: 2;
    }
    .item-details {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 8px;
    }
    .item-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .item-variant {
      color: #888;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .size {
      font-weight: 500;
      text-decoration: underline;
    }
    .color {
      color: #b0aeb8;
    }
    .item-price {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .item-quantity {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .item-quantity button {
      width: 28px;
      height: 28px;
      font-size: 18px;
      border: none;
      background: #eee;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .item-quantity button:hover {
      background: #b3deff;
    }
    .cart-summary {
      flex: 1;
      background: #fafafa;
      padding: 32px;
      border-radius: 16px;
      margin-left: 40px;
      min-width: 340px;
      max-width: 400px;
      box-shadow: 0 2px 8px 0 #0001;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .cart-summary h2 {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .summary-line {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      margin-bottom: 6px;
    }
    .total {
      font-size: 18px;
      font-weight: bold;
      margin: 18px 0 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .tax-info {
      font-size: 12px;
      color: #888;
      font-weight: normal;
      margin-left: 4px;
    }
    .checkout-btn {
      width: 100%;
      background: #b3deff;
      color: #222;
      font-size: 16px;
      padding: 14px 0;
      border: none;
      border-radius: 8px;
      margin-bottom: 12px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s;
    }
    .checkout-btn:hover {
      background: #90caf9;
    }
    .free {
      color: #2ecc40;
      font-size: 13px;
      font-weight: 500;
    }
    .info {
      margin-top: 12px;
      color: #888;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .info .icon {
      font-size: 15px;
      color: #888;
    }
    .promo, .gift {
      margin-top: 12px;
      color: #888;
      font-size: 13px;
    }
    .empty-cart {
      margin-top: 32px;
      color: #888;
      font-size: 16px;
    }
    .icon-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: opacity 0.2s;
      opacity: 0.7;
      box-shadow: none;
    }
    .icon-btn:hover {
      opacity: 1;
    }
    .cart-main-title {
      font-size: 32px;
      font-weight: bold;
      font-family: inherit;
      margin-bottom: 32px;
      letter-spacing: 1px;
      color: #222 !important;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cart-count {
      font-size: 20px;
      color: #666;
      font-weight: 500;
    }
    @media (max-width: 900px) {
      .cart-container {
        flex-direction: column;
        padding: 24px 8px;
      }
      .cart-summary {
        margin-left: 0;
        margin-top: 32px;
        max-width: 100%;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(
    private dataService: DataService
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