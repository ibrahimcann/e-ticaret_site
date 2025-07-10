import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="favorites-container">
      <div class="favorites-header">
        <h1><b>İSTEK LİSTENİZ</b></h1>
        <span class="favorites-count">{{ favorites.length }} ÜRÜN</span>
      </div>
      <div class="favorites-list">
        <div class="favorite-card" *ngFor="let product of favorites">
          <div class="favorite-image-wrapper">
            <img [src]="product.image" alt="{{ product.title }}" class="favorite-image" />
            <button class="remove-btn" (click)="removeFavorite(product)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
          <div class="favorite-info">
            <div class="favorite-title">{{ product.title }}</div>
            <div class="favorite-extra">+ Renkler</div>
            <div class="favorite-price">{{ product.price | currency:'TRY':'symbol':'1.0-0' }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .favorites-container {
      padding: 32px 24px;
    }
    .favorites-header {
      display: flex;
      align-items: baseline;
      gap: 24px;
      margin-bottom: 32px;
      margin-top: 32px;
    }
    .favorites-header h1 {
      font-size: 2rem;
      letter-spacing: 1px;
      margin: 0;
      font-weight: 500;
    }
    .favorites-count {
      color: #222;
      font-size: 1.1rem;
      font-weight: 500;
      margin-left: 8px;
    }
    .favorites-list {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
    }
    .favorite-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      width: 350px;
      padding: 16px 16px 8px 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
    }
    .favorite-image-wrapper {
      position: relative;
      width: 100%;
      height: 420px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .favorite-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
    .remove-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      transition: background 0.15s;
    }
    .remove-btn:hover {
      background: #f3f3f3;
    }
    .favorite-info {
      margin-top: 8px;
      width: 100%;
    }
    .favorite-title {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .favorite-extra {
      color: #666;
      font-size: 0.95rem;
      margin-bottom: 4px;
    }
    .favorite-price {
      color: #111;
      font-size: 1.1rem;
      font-weight: 600;
    }
    @media (max-width: 900px) {
      .favorites-list {
        flex-direction: column;
        gap: 24px;
      }
      .favorite-card {
        width: 100%;
      }
      .favorite-image-wrapper {
        height: 320px;
      }
    }
  `]
})
export class FavoritesComponent {
  favorites = [
    {
      id: 1,
      title: 'D92 straight fit geniş paça jean',
      image: 'https://static.zara.net/photos///2023/I/0/1/p/6042/250/427/2/w/750/6042250427_1_1_1.jpg?ts=1689688576462',
      price: 1599.00
    }
  ];

  removeFavorite(product: any) {
    this.favorites = this.favorites.filter(fav => fav.id !== product.id);
  }
} 