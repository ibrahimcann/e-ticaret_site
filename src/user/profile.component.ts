import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="profile-main-layout">
      <aside class="profile-sidebar">
        <div class="profile-userbox">
          <img class="profile-avatar" src="https://randomuser.me/api/portraits/women/65.jpg" alt="Profil Fotoğrafı">
          <div class="profile-hello">Merhaba, <span class="profile-username">{{user.firstName}}</span></div>
        </div>
        <nav class="profile-menu">
          <ul>
            <li [class.active]="selectedMenu==='orders'" (click)="selectedMenu='orders'">
              <span class="icon">📦</span> Sipariş ve İadeler
            </li>
            <li [class.active]="selectedMenu==='info'" (click)="selectedMenu='info'">
              <span class="icon">👤</span> Kişisel Bilgiler
            </li>
            <li [class.active]="selectedMenu==='addresses'" (click)="selectedMenu='addresses'">
              <span class="icon">📖</span> Adresler
            </li>
            <li [class.active]="selectedMenu==='payments'" (click)="selectedMenu='payments'">
              <span class="icon">💳</span> Ödeme Yöntemleri
            </li>
            <li [class.active]="selectedMenu==='wishlist'" (click)="selectedMenu='wishlist'">
              <span class="icon">🤍</span> Wishlist
            </li>
            <li [class.active]="selectedMenu==='faq'" (click)="selectedMenu='faq'">
              <span class="icon">❓</span> SSS ve İletişim
            </li>
          </ul>
        </nav>
      </aside>
      <section class="profile-content-area">
        <ng-container [ngSwitch]="selectedMenu">
          <div *ngSwitchCase="'orders'">
            <h2 class="profile-section-title">SİPARİŞ VE İADELER</h2>
            <div class="profile-orders-tabs">
              <button [class.active]="orderTab==='online'" (click)="orderTab='online'">Çevrimiçi</button>
              <button [class.active]="orderTab==='store'" (click)="orderTab='store'">Mağazada</button>
              <button [class.active]="orderTab==='returns'" (click)="orderTab='returns'">İadeler</button>
            </div>
            <div *ngIf="orders.length === 0" class="profile-empty-orders">
              <h3>ALIŞVERİŞİNİZ YOK!</h3>
              <p>Siparişini bulamıyorsan, alışverişi misafir olarak yapmış olabilirsin.</p>
              <button class="profile-find-order-btn">SİPARİŞİ BUL</button>
            </div>
            <!-- Sipariş listesi örneği eklenebilir -->
          </div>
          <div *ngSwitchCase="'info'">
            <h2 class="profile-section-title">KİŞİSEL BİLGİLER</h2>
            <div class="profile-info-list">
              <p><strong>Ad:</strong> {{user.firstName}}</p>
              <p><strong>Soyad:</strong> {{user.lastName}}</p>
              <p><strong>E-posta:</strong> {{user.email}}</p>
              <p><strong>Telefon:</strong> {{user.phone}}</p>
            </div>
          </div>
          <div *ngSwitchCase="'addresses'">
            <h2 class="profile-section-title">ADRESLER</h2>
            <div *ngIf="addresses.length === 0">Kayıtlı adresiniz yok.</div>
            <ul *ngIf="addresses.length > 0">
              <li *ngFor="let addr of addresses">{{addr}}</li>
            </ul>
          </div>
          <div *ngSwitchCase="'payments'">
            <h2 class="profile-section-title">ÖDEME YÖNTEMLERİ</h2>
            <div *ngIf="payments.length === 0">Kayıtlı ödeme yöntemi yok.</div>
            <ul *ngIf="payments.length > 0">
              <li *ngFor="let pay of payments">{{pay}}</li>
            </ul>
          </div>
          <div *ngSwitchCase="'wishlist'">
            <h2 class="profile-section-title">WISHLIST</h2>
            <div *ngIf="wishlist.length === 0">Listeniz boş.</div>
            <ul *ngIf="wishlist.length > 0">
              <li *ngFor="let wish of wishlist">{{wish}}</li>
            </ul>
          </div>
          <div *ngSwitchCase="'faq'">
            <h2 class="profile-section-title">SSS ve İLETİŞİM</h2>
            <p>Sıkça sorulan sorular ve iletişim bilgileri buraya gelecek.</p>
          </div>
        </ng-container>
      </section>
    </div>
  `,
  styles: [`
    .profile-main-layout {
      display: flex;
      min-height: 80vh;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
      margin: 2rem auto;
      max-width: 1200px;
      overflow: hidden;
    }
    .profile-sidebar {
      width: 320px;
      background: #fafafa;
      padding: 2.5rem 1.5rem 2rem 1.5rem;
      border-right: 1px solid #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .profile-userbox {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2.5rem;
    }
    .profile-avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
      border: 2px solid #e5e7eb;
    }
    .profile-hello {
      font-size: 1.1rem;
      color: #222;
      font-weight: 500;
    }
    .profile-username {
      font-weight: bold;
      color: #111;
    }
    .profile-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    .profile-menu li {
      padding: 1.2rem 1.2rem 1.2rem 2.2rem;
      font-size: 1.18rem;
      color: #222;
      border-radius: 0;
      margin-bottom: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1.1rem;
      border-left: 4px solid transparent;
      border-bottom: 1px solid #e5e7eb;
      font-weight: 500;
      background: none;
      transition: color 0.18s, border-color 0.18s, font-weight 0.18s;
    }
    .profile-menu li:last-child {
      border-bottom: none;
    }
    .profile-menu li.active {
      color: #111;
      border-left: 4px solid #111;
      font-weight: 700;
      background: none;
    }
    .profile-menu li:hover {
      color: #111;
      background: none;
    }
    .profile-menu .icon {
      font-size: 1.35em;
      margin-right: 0.2em;
    }
    .profile-content-area {
      flex: 1;
      padding: 3rem 3.5rem 2.5rem 3.5rem;
      background: #fff;
      min-height: 500px;
    }
    .profile-section-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 2.5rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: left;
    }
    .profile-orders-tabs {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .profile-orders-tabs button {
      background: #f3f3f3;
      border: none;
      border-radius: 2rem;
      padding: 0.7rem 2.2rem;
      font-size: 1.15rem;
      font-weight: 700;
      color: #222;
      cursor: pointer;
      transition: background 0.18s, color 0.18s;
      opacity: 0.7;
    }
    .profile-orders-tabs button.active {
      background: #eee;
      color: #111;
      opacity: 1;
      box-shadow: none;
    }
    .profile-orders-tabs button:hover {
      background: #e5e7eb;
      color: #111;
      opacity: 1;
    }
    .profile-empty-orders {
      text-align: center;
      margin-top: 3rem;
    }
    .profile-empty-orders h3 {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 1.2rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .profile-find-order-btn {
      background: #111;
      color: #fff;
      border: none;
      border-radius: 2rem;
      padding: 1.2rem 4rem;
      font-size: 1.25rem;
      font-weight: 700;
      cursor: pointer;
      margin-top: 2rem;
      transition: background 0.2s;
      box-shadow: none;
    }
    .profile-find-order-btn:hover {
      background: #2563eb;
    }
    .profile-info-list p {
      font-size: 1.15rem;
      margin-bottom: 1.1rem;
    }
    @media (max-width: 900px) {
      .profile-main-layout {
        flex-direction: column;
        max-width: 98vw;
      }
      .profile-sidebar {
        width: 100%;
        flex-direction: row;
        justify-content: flex-start;
        border-right: none;
        border-bottom: 1px solid #eee;
        padding: 1.2rem 0.5rem;
      }
      .profile-content-area {
        padding: 2rem 1rem;
      }
    }
  `]
})
export class ProfileComponent {
  user = {
    firstName: 'hamiyet',
    lastName: 'Yılmaz',
    email: 'hamiyet@example.com',
    phone: '+90 555 123 4567',
    // avatar: ...
  };
  selectedMenu: string = 'orders';
  orderTab: string = 'online';
  orders: any[] = [];
  addresses: string[] = [];
  payments: string[] = [];
  wishlist: string[] = [];
} 