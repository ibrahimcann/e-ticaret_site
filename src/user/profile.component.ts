import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../app/supabase.service';
import { User, UserProfile } from '../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="profile-main-layout">
      <ng-container *ngIf="!isLoggedIn">
        <div class="profile-login-register-box">
          <div class="profile-login">
            <h2>GİRİŞ YAP</h2>
            <form (ngSubmit)="login()" #loginForm="ngForm">
              <input type="email" placeholder="E-posta adresinizi girin" required [(ngModel)]="loginEmail" name="loginEmail" />
              <input type="password" placeholder="Parola" required [(ngModel)]="loginPassword" name="loginPassword" />
              <button type="submit" class="login-btn" [disabled]="isLoading">
                {{ isLoading ? 'GİRİŞ YAPILIYOR...' : 'GİRİŞ YAP' }}
              </button>
              <div *ngIf="loginError" class="profile-error">{{loginError}}</div>
            </form>
          </div>
          <div class="profile-register">
            <h2>HESAP OLUŞTUR</h2>
            <form (ngSubmit)="register()" #registerForm="ngForm">
              <input type="text" placeholder="Ad" required [(ngModel)]="registerData.firstName" name="firstName" />
              <input type="text" placeholder="Soyad" required [(ngModel)]="registerData.lastName" name="lastName" />
              <input type="email" placeholder="E-posta" required [(ngModel)]="registerData.email" name="email" />
              <input type="tel" placeholder="Telefon Numarası" required [(ngModel)]="registerData.phone" name="phone" />
              <input type="password" placeholder="Parola" required [(ngModel)]="registerData.password" name="password" />
              <button type="submit" class="register-btn" [disabled]="isLoading">
                {{ isLoading ? 'KAYIT YAPILIYOR...' : 'KAYIT OL' }}
              </button>
              <div *ngIf="registerError" class="profile-error">{{registerError}}</div>
            </form>
          </div>
        </div>
      </ng-container>
      <ng-container *ngIf="isLoggedIn">
        <aside class="profile-sidebar">
                      <div class="profile-userbox">
              <img class="profile-avatar" [src]="userData?.avatar || 'https://randomuser.me/api/portraits/women/65.jpg'" alt="Profil Fotoğrafı">
              <div class="profile-hello">Merhaba, <span class="profile-username">{{userData?.name}}</span></div>
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
              <li (click)="logout()" style="color:#dc2626; font-weight:600; cursor:pointer;">Çıkış Yap</li>
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
            </div>
            <div *ngSwitchCase="'info'">
              <h2 class="profile-section-title">KİŞİSEL BİLGİLER</h2>
              <div class="profile-info-list">
                <p><strong>Ad:</strong> {{userData?.name}}</p>
                <p><strong>Soyad:</strong> {{userData?.surname}}</p>
                <p><strong>E-posta:</strong> {{userData?.email}}</p>
                <p><strong>Telefon:</strong> {{userData?.phone || 'Belirtilmemiş'}}</p>
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
      </ng-container>
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
      padding: 3rem 2rem;
      background: #f9f9f9;
      border-radius: 1rem;
    }
    .profile-empty-orders h3 {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      letter-spacing: 1px;
    }
    .profile-empty-orders p {
      color: #555;
      margin-bottom: 1.5rem;
    }
    .profile-find-order-btn {
      background: #111;
      color: #fff;
      border: none;
      padding: 0.8rem 2.5rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      border-radius: 2rem;
      transition: background 0.18s;
    }
    .profile-find-order-btn:hover {
      background: #333;
    }
    .profile-info-list {
      font-size: 1.1rem;
      line-height: 2;
    }
    .profile-info-list p {
      margin-bottom: 0.8rem;
    }
    .profile-info-list strong {
      display: inline-block;
      width: 120px;
      font-weight: 600;
    }
    @media (max-width: 768px) {
      .profile-main-layout {
        flex-direction: column;
      }
      .profile-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #eee;
        padding: 2rem 1rem;
      }
      .profile-content-area {
        padding: 2rem 1.5rem;
      }
      .profile-section-title {
        font-size: 1.8rem;
      }
      .profile-orders-tabs {
        flex-wrap: wrap;
      }
    }
    .profile-login-register-box { display: flex; gap: 3rem; justify-content: center; align-items: flex-start; width: 100%; padding: 4rem 0; }
    .profile-login, .profile-register { background: #fafafa; border-radius: 12px; box-shadow: 0 1px 6px rgba(0,0,0,0.04); padding: 2.5rem 2.5rem; min-width: 320px; max-width: 350px; }
    .profile-login h2, .profile-register h2 { text-align: center; font-size: 1.3rem; font-weight: bold; margin-bottom: 1.5rem; }
    .profile-login form, .profile-register form { display: flex; flex-direction: column; gap: 1.2rem; }
    .profile-login input, .profile-register input { border: none; border-bottom: 2px solid #222; padding: 0.7rem 0.5rem; font-size: 1rem; background: transparent; outline: none; margin-bottom: 0.5rem; }
    .login-btn, .register-btn { background: #111; color: #fff; border: none; border-radius: 2rem; padding: 0.9rem 0; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 1rem; transition: background 0.2s; }
    .login-btn:hover, .register-btn:hover { background: #2563eb; }
    .profile-error { color: #dc2626; margin-top: 1rem; text-align: center; }
  `]
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  isLoading = false;
  loginEmail = '';
  loginPassword = '';
  loginError = '';
  registerError = '';
  userData: User | null = null;
  registerData = { firstName: '', lastName: '', email: '', phone: '', password: '' };
  selectedMenu: string = 'orders';
  orderTab: string = 'online';
  orders: any[] = [];
  addresses: string[] = [];
  payments: string[] = [];
  wishlist: string[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Oturum kontrolü
    const session = await this.supabaseService.client.auth.getSession();
    
    if (session.data.session) {
      this.isLoggedIn = true;
      await this.loadUserData(session.data.session.user.id);
    }

    // Oturum değişikliklerini dinle
    this.supabaseService.client.auth.onAuthStateChange(async (event: string, session: any) => {
      if (event === 'SIGNED_IN' && session) {
        this.isLoggedIn = true;
        await this.loadUserData(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        this.isLoggedIn = false;
        this.userData = null;
      }
    });
  }

  async loadUserData(userId: string) {
    try {
      // Kullanıcı bilgilerini users tablosundan çek
      const { data: userData, error: userError } = await this.supabaseService.client
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) throw userError;
      this.userData = userData;

      // Siparişleri çek
      const { data: orderData, error: orderError } = await this.supabaseService.client
        .from('orders')
        .select('*')
        .eq('userId', userId);

      if (orderError) throw orderError;
      this.orders = orderData || [];

    } catch (error: any) {
      console.error('Kullanıcı bilgileri yüklenirken hata:', error.message);
    }
  }

  async login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError = 'E-posta ve parola gereklidir!';
      return;
    }

    try {
      this.isLoading = true;
      this.loginError = '';
      
      const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
        email: this.loginEmail,
        password: this.loginPassword
      });

      if (error) throw error;
      
      // Başarılı giriş
      this.isLoggedIn = true;
      
    } catch (error: any) {
      this.loginError = error.message || 'Giriş yapılırken bir hata oluştu';
      console.error('Giriş hatası:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async register() {
    if (!this.registerData.firstName || !this.registerData.lastName || 
        !this.registerData.email || !this.registerData.password) {
      this.registerError = 'Lütfen gerekli tüm alanları doldurun!';
      return;
    }

    try {
      this.isLoading = true;
      this.registerError = '';
      
      // 1. Supabase Auth ile kullanıcı oluştur
      const { data: authData, error: authError } = await this.supabaseService.client.auth.signUp({
        email: this.registerData.email,
        password: this.registerData.password,
        options: {
          data: {
            firstName: this.registerData.firstName,
            lastName: this.registerData.lastName
          }
        }
      });

      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error('Kullanıcı oluşturulamadı');
      }
      
                    // 2. Users tablosuna kullanıcı bilgilerini ekle
       const { error: userError } = await this.supabaseService.client
         .from('users')
         .insert({
           id: authData.user.id,
           email: this.registerData.email,
           name: this.registerData.firstName, 
           surname: this.registerData.lastName, 
           phone: this.registerData.phone,
           role: 'user',
           isactive: true
         });
       
       if (userError) throw userError;
      
      // Başarılı kayıt
      this.isLoggedIn = true;
      await this.loadUserData(authData.user.id);
      
    } catch (error: any) {
      this.registerError = error.message || 'Kayıt olurken bir hata oluştu';
      console.error('Kayıt hatası:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      await this.supabaseService.client.auth.signOut();
      this.isLoggedIn = false;
      this.userData = null;
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Çıkış yapılırken hata:', error.message);
    }
  }
} 