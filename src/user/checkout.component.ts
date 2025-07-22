import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkout-wide-container">
      <div class="checkout-steps-bar wide">
        <div class="step" [class.active]="step >= 1">
          <span class="circle">1</span>
          <span class="label">Teslimat</span>
        </div>
        <div class="bar" [class.active]="step > 1"></div>
        <div class="step" [class.active]="step >= 2">
          <span class="circle">2</span>
          <span class="label">Ödeme</span>
        </div>
        <div class="bar" [class.active]="step > 2"></div>
        <div class="step" [class.active]="step === 3">
          <span class="circle">3</span>
          <span class="label">Özet</span>
        </div>
      </div>
      <div class="checkout-wide-content">
        <ng-container [ngSwitch]="step">
          <!-- STEP 1: Teslimat Seçimi -->
          <form *ngSwitchCase="1" class="delivery-step">
            <div class="delivery-left">
              <button type="button" class="back-btn" (click)="goBack()">← Sepete Geri Dön</button>
              <h1 class="delivery-title">SİPARİŞİNİZİ NEREDE TESLİM ALMAK İSTERSİNİZ?</h1>
              <input name="address" placeholder="Adres veya posta kodu gir" class="delivery-input" required />
              <div class="delivery-options">
                <div class="option">
                  <span class="icon">📍</span>
                  <div>
                    <div class="option-title">MAĞAZADAN TESLİMAT</div>
                    <div class="option-desc">Standart Teslimat<br><span class="option-date">Size <b>Cumartesi 12</b> ile <b>Çarşamba 16 Tem</b> arasında ulaşacak</span> <span class="option-free">Ücretsiz!</span></div>
                  </div>
                </div>
                <div class="option">
                  <span class="icon">📦</span>
                  <div>
                    <div class="option-title">TESLİMAT NOKTASI?</div>
                    <div class="option-desc">Size <b>Cumartesi 12</b> ile <b>Çarşamba 16 Tem</b> arasında ulaşacak <span class="option-fee">65,00 TL</span></div>
                  </div>
                </div>
                <div class="option">
                  <span class="icon">🏠</span>
                  <div>
                    <div class="option-title">ADRESE GÖNDERİ</div>
                    <div class="option-desc">Size <b>Cumartesi 12</b> ile <b>Çarşamba 16 Tem</b> arasında ulaşacak <span class="option-fee">19,99 TL</span></div>
                  </div>
                </div>
              </div>
              <button type="button" class="modern-btn wide" (click)="step = 2">Devam Et</button>
            </div>
            <div class="delivery-map">
              <div class="map-placeholder">HARİTA BURADA (örnek için statik)</div>
            </div>
          </form>
          <!-- STEP 2: Ödeme -->
          <form *ngSwitchCase="2" class="payment-step-wide">
            <div class="payment-methods">
              <button type="button" class="back-btn" (click)="step = 1">← Teslimata Geri Dön</button>
              <h1 class="payment-methods-title">ÖDEME YÖNTEMİNİZİ SEÇİN</h1>
              <div class="method-list">
                <div class="method" [class.selected]="selectedMethod === 'card'" (click)="selectedMethod = 'card'">
                  <span class="method-icon">▶️</span>
                  <div>
                    <div class="method-title">Kart</div>
                    <div class="method-desc">Kredi kartı veya nakit kartıyla ödeme yapabilirsiniz</div>
                  </div>
                </div>
                <div class="method" [class.selected]="selectedMethod === 'troy'" (click)="selectedMethod = 'troy'">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Troy_logo.png" class="method-img" alt="Troy" />
                  <div>
                    <div class="method-title">Troy</div>
                    <div class="method-desc">Kredi kartı veya nakit kartıyla ödeme yapabilirsiniz</div>
                  </div>
                </div>
                <div class="method" [class.selected]="selectedMethod === 'gift'" (click)="selectedMethod = 'gift'">
                  <span class="method-icon">💳</span>
                  <div>
                    <div class="method-title">Hediye kartı veya kredi</div>
                    <div class="method-desc">Hediye kartınız mı var? Kullanın!</div>
                  </div>
                </div>
                <div class="method" [class.selected]="selectedMethod === 'in'" (click)="selectedMethod = 'in'">
                  <span class="method-icon">IN</span>
                  <div>
                    <div class="method-title">IN Card</div>
                    <div class="method-desc">Ödemek için IN Discount seçin</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="payment-form-area">
              <h2 class="payment-form-title">ÖDEME BİLGİLERİ</h2>
              <form class="payment-form" (ngSubmit)="step = 3">
                <div class="form-row">
                  <input name="cardNumber" placeholder="Kart numarası" class="payment-input" required maxlength="19" />
                </div>
                <div class="form-row">
                  <input name="cardExp" placeholder="Son kullanma tarihi" class="payment-input" required maxlength="5" />
                  <input name="cardCvv" placeholder="CVV" class="payment-input" required maxlength="4" />
                  <span class="cvv-info">ⓘ</span>
                </div>
                <div class="form-row">
                  <input name="cardName" placeholder="Kart sahibi" class="payment-input" required />
                  <span class="checkmark">✔</span>
                </div>
                <button type="button" class="review-btn" (click)="step = 3">SİPARİŞİ GÖZDEN GEÇİR</button>
              </form>
              <div class="secure-box">
                <span class="lock-icon">🔒</span>
                <div>
                  <div class="secure-title">Güvenli ödeme</div>
                  <div class="secure-desc">Bizden alışveriş yaptığınız her seferinde korunursunuz, tüm işlemler güvenli ve şifrelidir.</div>
                </div>
              </div>
            </div>
          </form>
          <!-- STEP 3: Sipariş Özeti ve Onay -->
          <div *ngSwitchCase="3" class="summary-step-wide">
            <div class="summary-left">
              <button type="button" class="back-btn" (click)="step = 2">← Ödemeye Geri Dön</button>
              <h1 class="summary-title">ALIŞVERİŞİ ONAYLAYIN VE SONLANDIRIN</h1>
              <div class="summary-section clickable" (click)="step = 1">
                <div class="section-label"><span class="section-icon">📍</span> TESLİMAT</div>
                <div class="section-content">
                  Turkcell Fidan Telekom<br>
                  Turkcell Fidan Telekom - Bedir mah. Ataseven Cad.No:42/A Selçuklu/Konya,<br>
                  Teslimat Noktası?<br>
                  <span class="section-date">Size <b>Cumartesi 12</b> ile <b>Çarşamba 16 Tem</b> arasında ulaşacak</span>
                </div>
              </div>
              <div class="section-divider"></div>
              <div class="summary-section clickable" (click)="step = 2">
                <div class="section-label"><span class="section-icon">💳</span> ÖDEME</div>
                <div class="section-content">VISA ile öde<br>Kart *5667</div>
              </div>
              <div class="section-divider"></div>
              <div class="summary-section">
                <div class="section-label"><span class="section-icon">🛒</span> SEPET</div>
                <div class="section-content">1 ürün <span class="section-img">🧥</span></div>
              </div>
              <div class="section-divider"></div>
              <div class="summary-section">
                <div class="section-label"><span class="section-icon">🎁</span> HEDİYE</div>
                <div class="section-content">Siparişinizi hediye etmek ister misiniz?<br><span class="gift-desc">Hediye paketi ekle!</span></div>
              </div>
              <div class="section-divider"></div>
              <div class="summary-section">
                <label class="switch-label">
                  <input type="checkbox" class="switch-input" />
                  <span class="switch-slider"></span>
                  Sipariş faturasına ihtiyacım var
                </label>
              </div>
            </div>
            <div class="summary-right">
              <div class="order-summary-box big">
                <div class="order-summary-title">TOPLAM</div>
                <div class="order-summary-sub">Vergiler dahildir</div>
                <div class="order-summary-row"><span>1 Ürün</span> <span>1.390,00 TL</span></div>
                <div class="order-summary-row"><span>Teslimat</span> <span>65,00 TL</span></div>
                <div class="order-summary-total">1.455,00 TL</div>
                <div class="order-summary-desc">Devam tuşuna tıklayarak <b>Satın Alma Koşullarını</b> okuduğunu ve kabul ettiğini ve <b>Gizlilik Politikamızı</b> anladığını beyan ediyorsun</div>
                <button class="confirm-btn big">ÖDEMENİ ONAYLA</button>
              </div>
              <div class="order-warning">
                <span class="warning-icon">⚠️</span>
                Teslim süreleri bu dönemlerdeki talep yoğunluğu nedeniyle değişkenlik gösterebilir. Mümkün olan en kısa sürede teslim etmeye çalışacağız.
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <div class="checkout-bottom-bar">
        <div [class.active]="step === 1">1 Gönderi</div>
        <div [class.active]="step === 2">2 Ödeme</div>
        <div [class.active]="step === 3">3 Özet</div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-wide-container {
      min-height: 100vh;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
    }
    .checkout-steps-bar.wide {
      display: flex;
      align-items: center;
      margin: 0 auto 24px auto;
      gap: 0;
      width: 100%;
      max-width: 1100px;
      justify-content: center;
      padding: 32px 0 0 0;
    }
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;
    }
    .circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #e0e7ff;
      color: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 4px;
      border: 2px solid #e0e7ff;
      transition: background 0.2s, color 0.2s, border 0.2s;
    }
    .step.active .circle {
      background: #2563eb;
      color: #fff;
      border: 2px solid #2563eb;
    }
    .label {
      font-size: 13px;
      color: #2563eb;
      font-weight: 500;
      margin-bottom: 2px;
    }
    .bar {
      width: 48px;
      height: 4px;
      background: #e0e7ff;
      margin: 0 4px;
      border-radius: 2px;
      transition: background 0.2s;
    }
    .bar.active {
      background: #2563eb;
    }
    .checkout-wide-content {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      max-width: 1100px;
      min-height: 600px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px #2563eb11;
      margin-bottom: 24px;
    }
    .delivery-step, .summary-step {
      display: flex;
      flex-direction: row;
      width: 100%;
      min-height: 500px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px #2563eb11;
      margin: 0;
      padding: 0;
    }
    .delivery-left, .summary-left {
      flex: 1 1 0;
      padding: 56px 48px 32px 64px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 400px;
      max-width: 600px;
    }
    .delivery-title {
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 32px;
      margin-top: 0;
      letter-spacing: -1px;
      color: #111;
    }
    .delivery-input {
      width: 100%;
      font-size: 1.1rem;
      padding: 12px 0 8px 0;
      border: none;
      border-bottom: 2px solid #222;
      margin-bottom: 32px;
      background: transparent;
      outline: none;
      color: #222;
    }
    .delivery-input:focus {
      border-bottom: 2px solid #2563eb;
    }
    .delivery-options {
      width: 100%;
      margin-bottom: 32px;
    }
    .option {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 18px;
      padding: 16px 0 8px 0;
      border-bottom: 1px solid #eee;
    }
    .option.selected {
      background: #f0f4ff;
      border-radius: 8px;
      border-bottom: 2px solid #2563eb;
      box-shadow: 0 2px 8px #2563eb11;
    }
    .icon {
      font-size: 2rem;
      margin-top: 2px;
      color: #2563eb;
    }
    .option-title {
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 2px;
      color: #111;
    }
    .option-desc {
      font-size: 0.98rem;
      color: #444;
    }
    .option-date {
      color: #111;
    }
    .option-free {
      color: #22c55e;
      font-weight: 600;
      margin-left: 8px;
    }
    .option-fee {
      color: #e11d48;
      font-weight: 600;
      margin-left: 8px;
    }
    .delivery-map {
      flex: 1 1 0;
      min-width: 350px;
      max-width: 600px;
      background: #e0e7ff;
      border-radius: 0 18px 18px 0;
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      overflow: hidden;
      position: relative;
    }
    .map-placeholder {
      width: 100%;
      height: 100%;
      background: #c7d2fe;
      color: #222;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .modern-btn.wide {
      width: 100%;
      margin-top: 32px;
      font-size: 1.1rem;
      padding: 16px 0;
    }
    .order-summary-box {
      background: #f8fafc;
      border-radius: 10px;
      padding: 18px 16px;
      margin: 18px 0 10px 0;
      font-size: 15px;
      box-shadow: 0 1px 4px #2563eb11;
      width: 100%;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      color: #222;
    }
    .modern-btn.confirm.wide {
      width: 100%;
      margin-top: 32px;
      font-size: 1.1rem;
      padding: 16px 0;
      background: linear-gradient(90deg, #22c55e 60%, #16a34a 100%);
    }
    .modern-btn.confirm.wide:hover {
      background: linear-gradient(90deg, #16a34a 60%, #22c55e 100%);
    }
    .checkout-bottom-bar {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid #eee;
      background: #fff;
      font-size: 1.1rem;
      font-weight: 600;
      color: #888;
      padding: 0 32px;
      position: sticky;
      bottom: 0;
      z-index: 10;
      min-height: 48px;
    }
    .checkout-bottom-bar > div {
      flex: 1;
      text-align: center;
      padding: 12px 0 8px 0;
      border-bottom: 3px solid transparent;
      transition: color 0.2s, border 0.2s;
      cursor: pointer;
    }
    .checkout-bottom-bar > div.active {
      color: #2563eb;
      border-bottom: 3px solid #2563eb;
    }
    .payment-step-wide {
      display: flex;
      flex-direction: row;
      width: 100%;
      min-height: 500px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px #2563eb11;
      margin: 0;
      padding: 0;
    }
    .payment-methods {
      flex: 1 1 0;
      padding: 56px 48px 32px 64px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 400px;
      max-width: 600px;
    }
    .payment-methods-title {
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 32px;
      margin-top: 0;
      letter-spacing: -1px;
      color: #111;
    }
    .method-list {
      width: 100%;
    }
    .method {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 18px 0 14px 0;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: background 0.2s;
    }
    .method.selected {
      background: #f0f4ff;
      border-radius: 8px;
      border-bottom: 2px solid #2563eb;
      box-shadow: 0 2px 8px #2563eb11;
    }
    .method-icon {
      font-size: 2rem;
      margin-top: 2px;
      color: #2563eb;
    }
    .method-img {
      width: 38px;
      height: 24px;
      object-fit: contain;
      margin-right: 8px;
    }
    .method-title {
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 2px;
      color: #111;
    }
    .method-desc {
      font-size: 0.98rem;
      color: #444;
    }
    .payment-form-area {
      flex: 1 1 0;
      min-width: 350px;
      max-width: 600px;
      background: #fff;
      border-radius: 0 18px 18px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 48px 32px 32px 32px;
      gap: 24px;
    }
    .payment-form-title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 18px;
      color: #111;
    }
    .payment-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .payment-input {
      border: none;
      border-bottom: 2px solid #222;
      background: transparent;
      font-size: 1.1rem;
      padding: 12px 0 8px 0;
      outline: none;
      color: #222;
      width: 100%;
      margin-right: 12px;
    }
    .payment-input:focus {
      border-bottom: 2px solid #2563eb;
    }
    .form-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      width: 100%;
    }
    .cvv-info {
      font-size: 1.2rem;
      color: #888;
      margin-left: 8px;
    }
    .checkmark {
      color: #22c55e;
      font-size: 1.3rem;
      margin-left: 8px;
    }
    .review-btn {
      width: 100%;
      background: #111;
      color: #fff;
      font-size: 1.1rem;
      padding: 16px 0;
      border: none;
      border-radius: 32px;
      margin-top: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .review-btn:hover {
      background: #222;
    }
    .secure-box {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      background: #f8fafc;
      border-radius: 8px;
      padding: 16px 18px;
      margin-top: 18px;
      box-shadow: 0 1px 4px #2563eb11;
    }
    .lock-icon {
      font-size: 1.4rem;
      margin-top: 2px;
    }
    .secure-title {
      font-weight: 700;
      font-size: 1.05rem;
      margin-bottom: 2px;
    }
    .secure-desc {
      font-size: 0.98rem;
      color: #444;
    }
    .summary-step-wide {
      display: flex;
      flex-direction: row;
      width: 100%;
      min-height: 500px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 4px 24px #2563eb11;
      margin: 0;
      padding: 0;
    }
    .summary-left {
      flex: 1 1 0;
      padding: 56px 48px 32px 64px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 400px;
      max-width: 600px;
    }
    .summary-title {
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 32px;
      margin-top: 0;
      letter-spacing: -1px;
      color: #111;
    }
    .summary-section {
      margin-bottom: 12px;
    }
    .section-label {
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 2px;
      color: #111;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-icon {
      font-size: 1.3rem;
    }
    .section-content {
      font-size: 1rem;
      color: #222;
      margin-left: 28px;
    }
    .section-date {
      color: #111;
    }
    .section-img {
      font-size: 1.2rem;
      margin-left: 8px;
    }
    .gift-desc {
      color: #888;
      font-size: 0.95rem;
    }
    .section-divider {
      width: 100%;
      height: 1px;
      background: #eee;
      margin: 12px 0;
    }
    .switch-label {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1rem;
      color: #222;
      margin-left: 4px;
      margin-top: 8px;
    }
    .switch-input {
      display: none;
    }
    .switch-slider {
      width: 38px;
      height: 22px;
      background: #e5e7eb;
      border-radius: 12px;
      position: relative;
      transition: background 0.2s;
      margin-right: 8px;
      cursor: pointer;
    }
    .switch-input:checked + .switch-slider {
      background: #2563eb;
    }
    .switch-slider:before {
      content: '';
      position: absolute;
      left: 3px;
      top: 3px;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s;
    }
    .switch-input:checked + .switch-slider:before {
      transform: translateX(16px);
    }
    .summary-right {
      flex: 1 1 0;
      min-width: 350px;
      max-width: 600px;
      background: #fff;
      border-radius: 0 18px 18px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 48px 32px 32px 32px;
      gap: 24px;
    }
    .order-summary-box.big {
      width: 100%;
      background: #fafafa;
      border-radius: 12px;
      box-shadow: 0 1px 4px #2563eb11;
      padding: 28px 24px 24px 24px;
      margin-bottom: 18px;
    }
    .order-summary-title {
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 2px;
      color: #111;
    }
    .order-summary-sub {
      font-size: 0.98rem;
      color: #888;
      margin-bottom: 12px;
    }
    .order-summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      color: #222;
      font-size: 1rem;
    }
    .order-summary-total {
      font-size: 1.5rem;
      font-weight: 800;
      color: #111;
      margin: 18px 0 12px 0;
      text-align: right;
    }
    .order-summary-desc {
      font-size: 0.98rem;
      color: #444;
      margin-bottom: 18px;
    }
    .confirm-btn.big {
      width: 100%;
      background: #111;
      color: #fff;
      font-size: 1.1rem;
      padding: 16px 0;
      border: none;
      border-radius: 32px;
      margin-top: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .confirm-btn.big:hover {
      background: #222;
    }
    .order-warning {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: #fef6e7;
      border-radius: 8px;
      padding: 16px 18px;
      color: #b45309;
      font-size: 0.98rem;
      margin-top: 12px;
      box-shadow: 0 1px 4px #2563eb11;
    }
    .warning-icon {
      font-size: 1.3rem;
      margin-top: 2px;
    }
    .summary-section.clickable {
      cursor: pointer;
      transition: background 0.18s;
      border-radius: 8px;
    }
    .summary-section.clickable:hover {
      background: #f0f4ff;
    }
    .back-btn {
      background: transparent;
      border: none;
      color: #2563eb;
      font-size: 1.1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      padding: 8px 16px;
      margin-bottom: 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .back-btn:hover {
      background: #e0e7ff;
    }
    @media (max-width: 1100px) {
      .checkout-wide-content, .checkout-steps-bar.wide, .checkout-bottom-bar {
        max-width: 100vw;
        min-width: 0;
      }
      .delivery-left, .summary-left {
        padding: 32px 12px 24px 12px;
        min-width: 0;
        max-width: 100vw;
      }
      .delivery-map {
        min-width: 0;
        max-width: 100vw;
      }
      .payment-step-wide, .payment-summary {
        max-width: 100vw;
        min-width: 0;
      }
      .payment-left {
        padding: 32px 12px 24px 12px;
        min-width: 0;
        max-width: 100vw;
      }
      .payment-summary {
        padding: 32px 8px 18px 8px;
      }
      .card-visual {
        width: 100%;
        min-width: 0;
        max-width: 100vw;
      }
    }
    @media (max-width: 800px) {
      .delivery-step, .summary-step {
        flex-direction: column;
        min-height: 0;
      }
      .delivery-map {
        min-height: 200px;
        border-radius: 0 0 18px 18px;
      }
      .payment-step-wide {
        flex-direction: column;
        min-height: 0;
      }
      .payment-summary {
        min-height: 200px;
        border-radius: 0 0 18px 18px;
      }
    }
  `]
})
export class CheckoutComponent {
  step = 1;
  selectedMethod: 'card' | 'troy' | 'gift' | 'in' = 'card';
  
  constructor(private router: Router) {}
  
  goBack() {
    // Sepet sayfasına geri dön
    this.router.navigate(['/cart']);
  }
} 