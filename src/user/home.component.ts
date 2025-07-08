import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="stradivarius-home">
      <!-- Banner/Slider -->
      <section class="banner">
        <img class="banner-bg" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Deniz ve Palmiye" />
        <img class="banner-bg" src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80" alt="Moda Çekimi" style="opacity: 0; transition: opacity 1s ease;" />
        <img class="banner-car" src="https://pngimg.com/d/bmw_PNG99585.png" alt="Kırmızı Araba" />
        <img class="banner-model1" src="https://i.imgur.com/0y0y0y0.png" alt="Model 1" />
        <img class="banner-model2" src="https://i.imgur.com/1x1x1x1.png" alt="Model 2" />
        <div class="banner-text">
          <div class="yeni">YENİ</div>
          <a href="#" class="see-all">TÜMÜNÜ GÖR</a>
        </div>
        <button class="slider-arrow left" (click)="prevSlide()">&#10094;</button>
        <button class="slider-arrow right" (click)="nextSlide()">&#10095;</button>
      </section>

      <!-- Önerilen Ürünler Bölümü -->
      <section class="recommend-section">
        <h2 class="recommend-title">SENİN İÇİN ÖNERİLENLER</h2>
        <div class="recommend-row-wrapper">
          <button class="recommend-arrow left" (click)="scrollRecommend(-1)">&#10094;</button>
          <div class="recommend-row" #recommendRow>
            <div class="recommend-card">
              <a [routerLink]="['/products', '1']" class="recommend-link">
                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" alt="Bantlı düz terlik">
                <div class="recommend-info">
                  <div class="color-dots">
                    <span class="dot" style="background:#f5f5f5"></span>
                    <span class="dot" style="background:#c2bdb6"></span>
                  </div>
                  <div class="recommend-name">Bantlı düz terlik</div>
                  <div class="recommend-prices">
                    <span class="price">890,00 TL</span>
                    <span class="discount">-35%</span>
                    <span class="old-price">1.390,00 TL</span>
                  </div>
                </div>
              </a>
            </div>
            <div class="recommend-card">
              <a [routerLink]="['/products', '2']" class="recommend-link">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Tokalı düz terlik">
                <div class="recommend-info">
                  <div class="recommend-name">Tokalı düz terlik</div>
                  <div class="recommend-prices">
                    <span class="price">1.090,00 TL</span>
                    <span class="discount">-15%</span>
                    <span class="old-price">1.290,00 TL</span>
                  </div>
                </div>
              </a>
            </div>
            <div class="recommend-card">
              <a [routerLink]="['/products', '3']" class="recommend-link">
                <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80" alt="Bantlı düz terlik">
                <div class="recommend-info">
                  <div class="color-dots">
                    <span class="dot" style="background:#f5f5f5"></span>
                    <span class="dot" style="background:#4b2e1e"></span>
                  </div>
                  <div class="recommend-name">Bantlı düz terlik</div>
                  <div class="recommend-prices">
                    <span class="price">890,00 TL</span>
                    <span class="discount">-35%</span>
                    <span class="old-price">1.390,00 TL</span>
                  </div>
                </div>
              </a>
            </div>
            <div class="recommend-card">
              <a [routerLink]="['/products', '4']" class="recommend-link">
                <img src="https://images.unsplash.com/photo-1469398715555-76331a6c7b29?auto=format&fit=crop&w=400&q=80" alt="Straight fit jean">
                <div class="recommend-info">
                  <div class="color-dots">
                    <span class="dot" style="background:#bfc8d1"></span>
                    <span class="dot" style="background:#e0e4e8"></span>
                  </div>
                  <div class="recommend-name">Straight fit jean</div>
                  <div class="recommend-prices">
                    <span class="price">920,00 TL</span>
                    <span class="discount">-38%</span>
                    <span class="old-price">1.490,00 TL</span>
                  </div>
                </div>
              </a>
            </div>
            <div class="recommend-card">
              <a [routerLink]="['/products', '5']" class="recommend-link">
                <img src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80" alt="Dökümlü halter top">
                <div class="recommend-info">
                  <div class="recommend-name">Dökümlü halter top</div>
                  <div class="recommend-prices">
                    <span class="price">590,00 TL</span>
                    <span class="discount">-45%</span>
                    <span class="old-price">1.090,00 TL</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <button class="recommend-arrow right" (click)="scrollRecommend(1)">&#10095;</button>
        </div>
      </section>

      <!-- Tanıtım/Reklam Bölümü -->
      <section class="promo-section">
        <div class="promo-content">
          <div class="promo-left">
            <div class="promo-logo">MY APP</div>
            <div class="promo-title">HER HAFTA YENİ TRENDLER VE FIRSATLAR!</div>
            <div class="promo-desc">En yeni ürünler, özel indirimler ve ilham verici koleksiyonlar burada! Sitemizi takip edin, modayı yakalayın.</div>
            <a href="#" class="promo-btn">Hemen Keşfet</a>
          </div>
          <div class="promo-right">
            <img class="promo-phone" src="https://i.imgur.com/8zQb6tL.png" alt="Telefon 1" />
            <img class="promo-phone" src="https://i.imgur.com/8zQb6tL.png" alt="Telefon 2" />
            <img class="promo-phone" src="https://i.imgur.com/8zQb6tL.png" alt="Telefon 3" />
          </div>
        </div>
      </section>

      <!-- Bülten/Abonelik Bölümü -->
      <section class="newsletter-section">
        <div class="newsletter-content">
          <div class="newsletter-left">
            <div class="newsletter-title">EN YENİ TRENDLERİ VE ÖZEL FIRSATLARI KAÇIRMA</div>
            <div class="newsletter-desc">Şimdi abone ol, modaya dair son haberler ve öneriler e-posta adresine gelsin.</div>
          </div>
          <form class="newsletter-right" (submit)="$event.preventDefault()">
            <label for="newsletter-email" class="newsletter-label">Email</label>
            <input id="newsletter-email" type="email" class="newsletter-input" placeholder="E-posta adresiniz" required>
            <button type="submit" class="newsletter-btn">ŞİMDİ ABONE OL</button>
            <a href="#" class="newsletter-cancel">Aboneliği iptal etmek istiyorum</a>
          </form>
        </div>
      </section>

      <!-- Alt Bilgi Barı -->
      <footer class="info-bar">
        <span>1999 TL ve üzeri siparişlerde ücretsiz kargo **</span>
        <span>Mağazaya ücretsiz kargo</span>
        <span>1999 TL ve üzeri siparişlerde ücretsiz kargo **</span>
      </footer>
    </div>
  `,
  styles: [`
    .stradivarius-home {
      font-family: 'Inter', Arial, sans-serif;
      background: #fff;
      min-height: 100vh;
      position: relative;
      margin: 0;
      padding: 0;
    }
    .banner {
      position: relative;
      width: 100%;
      height: 100vh;
      background: #e0f2fe;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin: 0;
      padding: 0;
    }
    .banner-bg {
      position: absolute;
      left: 0; top: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;
      filter: brightness(0.95);
    }
    .banner-bg:nth-child(1) {
      opacity: 1;
      transition: opacity 1s ease;
    }
    .banner-car {
      position: absolute;
      left: 10%;
      bottom: 0;
      width: 70vw;
      max-width: 800px;
      z-index: 2;
      filter: drop-shadow(0 8px 32px rgba(0,0,0,0.18));
    }
    .banner-model1 {
      position: absolute;
      left: 38%;
      bottom: 0;
      width: 200px;
      z-index: 3;
    }
    .banner-model2 {
      position: absolute;
      right: 18%;
      bottom: 0;
      width: 210px;
      z-index: 3;
    }
    .banner-text {
      position: absolute;
      left: 18%;
      bottom: 120px;
      z-index: 4;
      color: #fff;
      text-shadow: 0 2px 8px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .yeni {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
    }
    .see-all {
      font-size: 1.3rem;
      color: #fff;
      background: rgba(0,0,0,0.18);
      padding: 0.5rem 1.5rem;
      border-radius: 2rem;
      text-decoration: none;
      font-weight: 500;
      margin-top: 0.2rem;
      transition: background 0.2s;
    }
    .see-all:hover {
      background: #fff;
      color: #1d4ed8;
    }
    .slider-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.8);
      border: none;
      font-size: 2.2rem;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      cursor: pointer;
      z-index: 5;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: background 0.2s;
    }
    .slider-arrow.left { left: 2vw; }
    .slider-arrow.right { right: 2vw; }
    .slider-arrow:hover { background: #1d4ed8; color: #fff; }
    .info-bar {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      background: #e11d48;
      color: #fff;
      font-size: 1.1rem;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      padding: 0.7rem 0;
      z-index: 20;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
    }
    .recommend-section {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2.5rem 1rem 2rem 1rem;
      text-align: center;
    }
    .recommend-title {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 2.5rem;
      margin-top: 1.5rem;
    }
    .recommend-row-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .recommend-row {
      display: flex;
      flex-direction: row;
      gap: 0.7rem;
      overflow-x: auto;
      scroll-behavior: smooth;
      padding-bottom: 0.5rem;
      width: 100%;
      scrollbar-width: thin;
      scrollbar-color: #e11d48 #eee;
    }
    .recommend-row::-webkit-scrollbar {
      height: 7px;
    }
    .recommend-row::-webkit-scrollbar-thumb {
      background: #e11d48;
      border-radius: 4px;
    }
    .recommend-row::-webkit-scrollbar-track {
      background: #eee;
    }
    .recommend-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.95);
      border: none;
      font-size: 2.2rem;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      cursor: pointer;
      z-index: 2;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: background 0.2s;
      color: #e11d48;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.85;
    }
    .recommend-arrow.left { left: -18px; }
    .recommend-arrow.right { right: -18px; }
    .recommend-arrow:hover { background: #e11d48; color: #fff; }
    .recommend-card {
      background: #fff;
      border-radius: 0.18rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
      width: 100%;
      max-width: 250px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      cursor: pointer;
      min-width: 180px;
      margin: 0;
    }
    .recommend-card:hover {
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 8px 24px rgba(0,0,0,0.13);
    }
    .recommend-card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }
    .recommend-info {
      padding: 1.2rem 1rem 1.1rem 1rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .recommend-name {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }
    .recommend-prices {
      display: flex;
      align-items: baseline;
      gap: 0.7rem;
      font-size: 1.1rem;
      margin-top: 0.2rem;
    }
    .price {
      color: #e11d48;
      font-weight: 700;
      font-size: 1.2rem;
    }
    .discount {
      color: #e11d48;
      font-weight: 600;
      font-size: 1rem;
    }
    .old-price {
      color: #aaa;
      text-decoration: line-through;
      font-size: 1rem;
    }
    .color-dots {
      display: flex;
      gap: 0.3rem;
      margin-bottom: 0.3rem;
    }
    .dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1.5px solid #eee;
      display: inline-block;
    }
    .recommend-link {
      display: block;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s;
    }
    
    .recommend-link:hover {
      transform: translateY(-5px);
    }
    
    @media (max-width: 900px) {
      .banner { height: 580px; }
      .banner-car { left: 0; width: 90vw; }
      .banner-model1 { left: 20%; width: 150px; }
      .banner-model2 { right: 5%; width: 150px; }
      .banner-text { left: 8%; bottom: 80px; }
      .recommend-title { font-size: 1.5rem; }
      .recommend-card img { height: 100px; }
    }
    @media (max-width: 600px) {
      .banner { height: 400px; }
      .banner-car { width: 100vw; }
      .banner-model1, .banner-model2 { width: 100px; }
      .banner-text { font-size: 1.1rem; left: 4%; bottom: 50px; }
      .yeni { font-size: 2.5rem; }
      .info-bar { font-size: 0.9rem; gap: 0.7rem; padding: 0.5rem 0; }
      .recommend-title { font-size: 1.1rem; }
      .recommend-row { gap: 0.3rem; }
      .recommend-card img { height: 60px; }
      .recommend-info { padding: 0.7rem 0.5rem 0.7rem 0.5rem; }
      .promo-content { flex-direction: column; align-items: center; text-align: center; }
      .promo-left { align-items: center; }
      .promo-right { flex-direction: row; justify-content: center; margin-top: 1.5rem; }
      .promo-phone { width: 80px; height: 140px; margin: 0 0.3rem; }
    }
    .promo-section {
      width: 100%;
      background: linear-gradient(90deg, #e11d48 0%, #f43f5e 100%);
      padding: 3.5rem 0 3.5rem 0;
      margin: 0 auto 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .promo-content {
      max-width: 1400px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2.5rem;
      color: #fff;
    }
    .promo-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.2rem;
      min-width: 260px;
    }
    .promo-logo {
      font-size: 2.1rem;
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: 0.5rem;
    }
    .promo-title {
      font-size: 2.3rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
    }
    .promo-desc {
      font-size: 1.2rem;
      opacity: 0.93;
      margin-bottom: 1.2rem;
      max-width: 420px;
    }
    .promo-btn {
      display: inline-block;
      background: #fff;
      color: #e11d48;
      font-weight: 700;
      font-size: 1.1rem;
      padding: 0.7rem 2.2rem;
      border-radius: 0.18rem;
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: background 0.2s, color 0.2s;
      margin-top: 0.5rem;
    }
    .promo-btn:hover {
      background: #e11d48;
      color: #fff;
    }
    .promo-right {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      gap: 1.2rem;
      min-width: 260px;
    }
    .promo-phone {
      width: 120px;
      height: 220px;
      object-fit: contain;
      border-radius: 0.18rem;
      box-shadow: 0 4px 24px rgba(0,0,0,0.18);
      background: #fff;
      margin: 0 0.2rem;
    }
    .newsletter-section {
      width: 100%;
      background: #111;
      color: #fff;
      padding: 3.5rem 0 2.5rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .newsletter-content {
      max-width: 1200px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 2.5rem;
    }
    .newsletter-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.2rem;
      min-width: 260px;
    }
    .newsletter-title {
      font-size: 2.1rem;
      font-weight: 800;
      letter-spacing: 1px;
      margin-bottom: 0.7rem;
    }
    .newsletter-desc {
      font-size: 1.2rem;
      opacity: 0.93;
      margin-bottom: 1.2rem;
      max-width: 420px;
    }
    .newsletter-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1.1rem;
      min-width: 260px;
    }
    .newsletter-label {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 0.2rem;
      align-self: flex-start;
    }
    .newsletter-input {
      width: 100%;
      max-width: 340px;
      padding: 0.7rem 1.2rem;
      border: none;
      border-bottom: 2px solid #fff;
      background: transparent;
      color: #fff;
      font-size: 1.1rem;
      margin-bottom: 0.7rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .newsletter-input:focus {
      border-bottom: 2px solid #e11d48;
    }
    .newsletter-btn {
      width: 100%;
      max-width: 340px;
      padding: 0.7rem 0;
      background: transparent;
      color: #fff;
      border: 2px solid #fff;
      border-radius: 0.18rem;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .newsletter-btn:hover {
      background: #fff;
      color: #111;
      border-color: #fff;
    }
    .newsletter-cancel {
      color: #fff;
      opacity: 0.7;
      font-size: 0.98rem;
      margin-top: 0.5rem;
      text-decoration: underline;
      align-self: flex-end;
    }
    @media (max-width: 900px) {
      .newsletter-content { flex-direction: column; align-items: center; text-align: center; gap: 2rem; }
      .newsletter-left, .newsletter-right { align-items: center; min-width: 0; }
      .newsletter-btn, .newsletter-input { max-width: 100%; }
      .newsletter-cancel { align-self: center; }
    }
  `]
})
export class HomeComponent implements OnInit {
  @ViewChild('recommendRow', { static: false }) recommendRow!: ElementRef;
  currentSlide = 0;
  totalSlides = 2;

  ngOnInit() {
    // Slider başlangıç ayarları
    setTimeout(() => {
      this.updateSlides();
    }, 100);
  }

  scrollRecommend(direction: number) {
    const row = this.recommendRow?.nativeElement;
    if (row) {
      const scrollAmount = row.offsetWidth * 0.7;
      row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlides();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlides();
  }

  updateSlides() {
    const slides = document.querySelectorAll('.banner-bg');
    slides.forEach((slide: any, index) => {
      if (index === this.currentSlide) {
        slide.style.opacity = '1';
      } else {
        slide.style.opacity = '0';
      }
    });
  }
}