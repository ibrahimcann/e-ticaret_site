import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  title: string;
  image: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-page-container">
      <div class="search-bar-row">
        <button class="back-btn" (click)="goBack()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <input class="search-input" type="text" [(ngModel)]="searchTerm" (keyup.enter)="onSearch()" placeholder="Aramak istediğiniz ürünü yazın...">
        <button class="search-btn" (click)="onSearch()">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>
      <div *ngIf="!results.length" class="no-result-block">
        <div class="no-result-title">Şu arama herhangi bir sonuç bulunamadı:</div>
        <div class="no-result-query">‘{{ searchTerm }}’</div>
        <div class="no-result-suggestion">İşte senin için bazı öneriler:</div>
        <div class="suggestion-list">
          <div class="suggestion-card" *ngFor="let product of suggestions">
            <img [src]="product.image" class="suggestion-img" alt="{{product.title}}">
            <div class="suggestion-title">{{ product.title }}</div>
          </div>
        </div>
      </div>
      <div *ngIf="results.length" class="result-list">
        <div class="result-card" *ngFor="let product of results">
          <img [src]="product.image" class="result-img" alt="{{product.title}}">
          <div class="result-title">{{ product.title }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-page-container {
      padding: 32px 24px;
      background: #fafbfc;
      min-height: 100vh;
    }
    .search-bar-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 32px;
      background: #fff;
      border-radius: 24px;
      padding: 8px 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .search-input {
      flex: 1;
      border: none;
      font-size: 1.2rem;
      background: transparent;
      outline: none;
      padding: 8px 0;
    }
    .search-btn, .back-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 8px;
      display: flex;
      align-items: center;
      z-index: 1000;
      position: relative;
    }
    .no-result-block {
      margin-top: 32px;
    }
    .no-result-title {
      font-size: 1.1rem;
      color: #444;
      margin-bottom: 8px;
    }
    .no-result-query {
      font-size: 1.5rem;
      font-weight: bold;
      color: #111;
      margin-bottom: 16px;
    }
    .no-result-suggestion {
      font-size: 1.1rem;
      color: #444;
      margin-bottom: 16px;
    }
    .suggestion-list {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    .suggestion-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      width: 220px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .suggestion-img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 8px;
    }
    .suggestion-title {
      font-size: 1rem;
      color: #222;
      text-align: center;
    }
    .result-list {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    .result-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      width: 220px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .result-img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 8px;
    }
    .result-title {
      font-size: 1rem;
      color: #222;
      text-align: center;
    }
    @media (max-width: 900px) {
      .suggestion-list, .result-list {
        flex-direction: column;
        gap: 16px;
      }
      .suggestion-card, .result-card {
        width: 100%;
      }
      .suggestion-img, .result-img {
        height: 180px;
      }
    }
  `]
})
export class SearchComponent {
  searchTerm = '';
  allProducts: Product[] = [
    { title: 'D92 straight fit geniş paça jean', image: 'https://static.zara.net/photos///2023/I/0/1/p/6042/250/427/2/w/750/6042250427_1_1_1.jpg?ts=1689688576462' },
    { title: 'Keten karışımlı crop top', image: 'https://static.zara.net/photos///2023/I/0/1/p/2292/250/712/2/w/750/2292250712_1_1_1.jpg?ts=1689688576462' },
    { title: 'Askılı beyaz bluz', image: 'https://static.zara.net/photos///2023/I/0/1/p/2292/250/250/2/w/750/2292250250_1_1_1.jpg?ts=1689688576462' },
    { title: 'Düğmeli yelek', image: 'https://static.zara.net/photos///2023/I/0/1/p/2292/250/251/2/w/750/2292250251_1_1_1.jpg?ts=1689688576462' }
  ];
  suggestions: Product[] = this.allProducts.slice(1, 4);
  results: Product[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      this.doSearch();
    });
  }

  onSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
  }

  doSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    this.results = this.allProducts.filter(p => p.title.toLowerCase().includes(term));
  }

  goBack() {
    this.router.navigate(['/']);
  }
} 