import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <span class="close-btn" (click)="close()">&times;</span>
        <div class="profile-logo">My App</div>
      </div>
      <h1 class="profile-title">OTURUM AÇIN VEYA HESAP OLUŞTURUN</h1>
      <div class="profile-content">
        <div class="profile-login">
          <h2>ZATEN BİR HESABIN VAR MI? GİRİŞ YAP</h2>
          <form>
            <input type="email" placeholder="E-posta adresinizi girin" required />
            <input type="password" placeholder="Parola" required />
            <div class="profile-options">
              <label><input type="checkbox" /> Beni hatırla</label>
              <a href="#" class="forgot-link">Parolayı mı unuttunuz?</a>
            </div>
            <button type="submit" class="login-btn">OTURUM AÇ</button>
          </form>
        </div>
        <div class="profile-register">
          <h2>HENÜZ HESABINIZ YOK MU? KAYDOLUN!</h2>
          <ul class="register-benefits">
            <li>🚚 Siparişlerini takip et</li>
            <li>🏠 Gelecekteki alışverişlerinde zaman kazanmak için gönderi ve ödeme bilgilerini kaydet.</li>
            <li>🔄 Online iade yapabilirsin</li>
          </ul>
          <button class="register-btn">HESAP OLUŞTUR</button>
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
  `]
})
export class ProfileComponent {
  close() {
    window.history.back();
  }
} 