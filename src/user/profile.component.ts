import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <span class="close-btn" (click)="close()">&times;</span>
        <div class="profile-logo">My App</div>
      </div>
      <h1 class="profile-title">OTURUM AÇIN VEYA HESAP OLUŞTURUN</h1>
      <div *ngIf="!showRegisterForm && !isLoggedIn" class="profile-content">
        <div class="profile-login">
          <h2>ZATEN BİR HESABIN VAR MI? GİRİŞ YAP</h2>
          <form (ngSubmit)="login()" #loginForm="ngForm">
            <input type="email" placeholder="E-posta adresinizi girin" required [(ngModel)]="loginEmail" name="loginEmail" />
            <input type="password" placeholder="Parola" required [(ngModel)]="loginPassword" name="loginPassword" />
            <div class="profile-options">
              <label><input type="checkbox" /> Beni hatırla</label>
              <a href="#" class="forgot-link">Parolayı mı unuttunuz?</a>
            </div>
            <button type="submit" class="login-btn">OTURUM AÇ</button>
            <div *ngIf="loginError" style="color:#dc2626; margin-top:1rem; text-align:center;">{{loginError}}</div>
          </form>
        </div>
        <div class="profile-register">
          <h2>HENÜZ HESABINIZ YOK MU? KAYDOLUN!</h2>
          <ul class="register-benefits">
            <li>🚚 Siparişlerini takip et</li>
            <li>🏠 Gelecekteki alışverişlerinde zaman kazanmak için gönderi ve ödeme bilgilerini kaydet.</li>
            <li>🔄 Online iade yapabilirsin</li>
          </ul>
          <button class="register-btn" (click)="showRegisterForm = true">HESAP OLUŞTUR</button>
        </div>
      </div>
      <div *ngIf="showRegisterForm && !isLoggedIn" class="register-form-modal">
        <form class="register-form" (ngSubmit)="register()" #registerForm="ngForm">
          <h2>Hesap Oluştur</h2>
          <input type="text" placeholder="Ad" required [(ngModel)]="registerData.firstName" name="firstName" />
          <input type="text" placeholder="Soyad" required [(ngModel)]="registerData.lastName" name="lastName" />
          <input type="email" placeholder="E-posta" required [(ngModel)]="registerData.email" name="email" />
          <input type="tel" placeholder="Telefon Numarası" required [(ngModel)]="registerData.phone" name="phone" />
          <input type="password" placeholder="Parola" required [(ngModel)]="registerData.password" name="password" />
          <button type="submit" class="register-btn">Kaydol</button>
          <button type="button" class="register-btn" style="background:#eee;color:#222;border:1px solid #ccc;margin-top:0.5rem;" (click)="showRegisterForm = false">Vazgeç</button>
          <div *ngIf="registerError" style="color:#dc2626; margin-top:1rem; text-align:center;">{{registerError}}</div>
        </form>
      </div>
      <div *ngIf="isLoggedIn" class="welcome-message">
        <h2>Hoş geldin, {{userData?.firstName}}!</h2>
        <div class="profile-info-box">
          <p><strong>Ad:</strong> {{userData?.firstName}}</p>
          <p><strong>Soyad:</strong> {{userData?.lastName}}</p>
          <p><strong>E-posta:</strong> {{userData?.email}}</p>
          <p><strong>Telefon:</strong> {{userData?.phone}}</p>
          <p><strong>Şifre:</strong> 
            <span>{{ showPassword ? userData?.password : maskedPassword }}</span>
            <button type="button" class="show-hide-btn" (click)="togglePassword()">{{ showPassword ? 'Gizle' : 'Göster' }}</button>
          </p>
          <div class="change-password-link">
            <a href="#" (click)="showChangePassword = true">Şifreyi değiştir</a>
          </div>
        </div>
        <div class="profile-actions">
          <button class="register-btn" (click)="confirmAction('logout')">Çıkış Yap</button>
          <button class="register-btn delete-btn" (click)="confirmAction('delete')">Hesabımı Sil</button>
        </div>
      </div>
      <div *ngIf="showChangePassword" class="change-password-modal">
        <form class="change-password-form" (ngSubmit)="changePassword()">
          <h3>Şifreyi Değiştir</h3>
          <input type="password" placeholder="Yeni Şifre" required [(ngModel)]="newPassword" name="newPassword" />
          <button type="submit" class="register-btn">Kaydet</button>
          <button type="button" class="register-btn" style="background:#eee;color:#222;border:1px solid #ccc;margin-top:0.5rem;" (click)="showChangePassword = false">Vazgeç</button>
          <div *ngIf="changePasswordError" style="color:#dc2626; margin-top:1rem; text-align:center;">{{changePasswordError}}</div>
        </form>
      </div>
      <div *ngIf="showConfirm" class="confirm-modal">
        <div class="confirm-box">
          <p>{{ confirmMessage }}</p>
          <div class="confirm-actions">
            <button class="register-btn" (click)="doConfirmedAction()">Evet</button>
            <button class="register-btn" style="background:#eee;color:#222;border:1px solid #ccc;" (click)="showConfirm = false">Hayır</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 900px;
      margin: 2rem auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
      padding: 2rem 2.5rem 2.5rem 2.5rem;
      position: relative;
    }
    .profile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
    .profile-logo {
      font-family: serif;
      font-size: 2rem;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .close-btn {
      font-size: 2rem;
      cursor: pointer;
      color: #222;
      transition: color 0.2s;
    }
    .close-btn:hover {
      color: #dc2626;
    }
    .profile-title {
      text-align: center;
      font-size: 2.2rem;
      font-weight: bold;
      margin-bottom: 2.5rem;
      letter-spacing: 1px;
    }
    .profile-content {
      display: flex;
      gap: 2rem;
      justify-content: space-between;
    }
    .profile-login, .profile-register {
      flex: 1;
      background: #fafafa;
      border-radius: 8px;
      padding: 2rem 1.5rem;
      box-shadow: 0 1px 6px rgba(0,0,0,0.03);
    }
    .profile-login h2, .profile-register h2 {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      text-align: center;
      letter-spacing: 0.5px;
    }
    .profile-login form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .profile-login input[type="email"], .profile-login input[type="password"] {
      border: none;
      border-bottom: 2px solid #222;
      padding: 0.7rem 0.5rem;
      font-size: 1rem;
      background: transparent;
      outline: none;
      margin-bottom: 0.5rem;
    }
    .profile-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.95rem;
      color: #444;
    }
    .forgot-link {
      color: #222;
      text-decoration: underline;
      font-size: 0.95rem;
    }
    .login-btn {
      background: #111;
      color: #fff;
      border: none;
      border-radius: 2rem;
      padding: 0.9rem 0;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
      transition: background 0.2s;
    }
    .login-btn:hover {
      background: #2563eb;
    }
    .profile-register {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .register-benefits {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0 2rem 0;
      font-size: 1rem;
      color: #222;
    }
    .register-benefits li {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .register-btn {
      background: #fff;
      color: #111;
      border: 2px solid #111;
      border-radius: 2rem;
      padding: 0.9rem 2.5rem;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .register-btn:hover {
      background: #2563eb;
      color: #fff;
      border-color: #2563eb;
    }
    @media (max-width: 900px) {
      .profile-content {
        flex-direction: column;
        gap: 2.5rem;
      }
    }
    .register-form-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }
    .register-form {
      background: #fafafa;
      border-radius: 8px;
      padding: 2rem 2.5rem;
      box-shadow: 0 1px 6px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      min-width: 320px;
      max-width: 350px;
      margin: 0 auto;
    }
    .register-form h2 {
      text-align: center;
      margin-bottom: 1rem;
    }
    .register-form input {
      border: none;
      border-bottom: 2px solid #222;
      padding: 0.7rem 0.5rem;
      font-size: 1rem;
      background: transparent;
      outline: none;
      margin-bottom: 0.5rem;
    }
    .welcome-message {
      text-align: center;
      margin: 3rem 0;
    }
    .profile-info-box {
      background: #f3f4f6;
      border-radius: 8px;
      padding: 1.5rem 2rem;
      margin: 2rem auto 2rem auto;
      max-width: 350px;
      text-align: left;
      font-size: 1.1rem;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }
    .profile-info-box p {
      margin: 0.5rem 0;
    }
    .profile-actions {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .delete-btn {
      background: #fff;
      color: #dc2626;
      border: 2px solid #dc2626;
    }
    .delete-btn:hover {
      background: #dc2626;
      color: #fff;
    }
    .show-hide-btn {
      background: none;
      border: none;
      color: #2563eb;
      font-size: 0.95rem;
      margin-left: 0.5rem;
      cursor: pointer;
      text-decoration: underline;
    }
    .change-password-link {
      margin-top: 0.5rem;
      font-size: 0.95rem;
      text-align: right;
    }
    .change-password-link a {
      color: #2563eb;
      text-decoration: underline;
      cursor: pointer;
    }
    .change-password-modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .change-password-form {
      background: #fff;
      border-radius: 8px;
      padding: 2rem 2.5rem;
      box-shadow: 0 1px 12px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      min-width: 320px;
      max-width: 350px;
      margin: 0 auto;
    }
    .confirm-modal {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1100;
    }
    .confirm-box {
      background: #fff;
      border-radius: 8px;
      padding: 2rem 2.5rem;
      box-shadow: 0 1px 12px rgba(0,0,0,0.13);
      min-width: 320px;
      max-width: 350px;
      text-align: center;
    }
    .confirm-actions {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
    }
  `]
})
export class ProfileComponent {
  showRegisterForm = false;
  isLoggedIn = false;
  loginEmail = '';
  loginPassword = '';
  loginError = '';
  registerError = '';
  userData: any = null;
  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  };
  showPassword = false;
  showChangePassword = false;
  newPassword = '';
  changePasswordError = '';
  showConfirm = false;
  confirmMessage = '';
  confirmActionType: 'logout' | 'delete' = 'logout';

  close() {
    window.history.back();
  }

  ngOnInit() {
    const user = localStorage.getItem('demoUser');
    if (user) {
      this.userData = JSON.parse(user);
      this.isLoggedIn = true;
    }
  }

  login() {
    const user = localStorage.getItem('demoUser');
    if (user) {
      const u = JSON.parse(user);
      if (u.email === this.loginEmail && u.password === this.loginPassword) {
        this.userData = u;
        this.isLoggedIn = true;
        this.loginError = '';
      } else {
        this.loginError = 'E-posta veya parola hatalı!';
      }
    } else {
      this.loginError = 'Kayıtlı kullanıcı bulunamadı!';
    }
  }

  register() {
    if (!this.registerData.firstName || !this.registerData.lastName || !this.registerData.email || !this.registerData.phone || !this.registerData.password) {
      this.registerError = 'Tüm alanları doldurun!';
      return;
    }
    localStorage.setItem('demoUser', JSON.stringify(this.registerData));
    this.showRegisterForm = false;
    this.loginEmail = this.registerData.email;
    this.loginPassword = this.registerData.password;
    this.registerError = '';
    setTimeout(() => this.login(), 100); // Kayıt sonrası otomatik giriş
  }

  logout() {
    this.isLoggedIn = false;
    this.userData = null;
    this.loginEmail = '';
    this.loginPassword = '';
  }

  deleteAccount() {
    localStorage.removeItem('demoUser');
    this.logout();
  }

  get maskedPassword() {
    return this.userData?.password ? '•'.repeat(this.userData.password.length) : '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  confirmAction(type: 'logout' | 'delete') {
    this.confirmActionType = type;
    this.confirmMessage = type === 'logout' ? 'Çıkış yapmak istediğinize emin misiniz?' : 'Hesabınızı silmek istediğinize emin misiniz?';
    this.showConfirm = true;
  }

  doConfirmedAction() {
    this.showConfirm = false;
    if (this.confirmActionType === 'logout') {
      this.logout();
    } else if (this.confirmActionType === 'delete') {
      this.deleteAccount();
    }
  }

  changePassword() {
    if (!this.newPassword || this.newPassword.length < 4) {
      this.changePasswordError = 'Şifre en az 4 karakter olmalı!';
      return;
    }
    const user = { ...this.userData, password: this.newPassword };
    localStorage.setItem('demoUser', JSON.stringify(user));
    this.userData = user;
    this.showChangePassword = false;
    this.newPassword = '';
    this.changePasswordError = '';
  }
} 