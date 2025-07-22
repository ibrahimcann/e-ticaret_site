import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-keten-karisimli',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="category-page">
      <h1>Keten Karışımlı</h1>
      <app-products [defaultCategory]="'keten karışımlı'"></app-products>
    </div>
  `,
  styles: [`
    .category-page { padding: 2rem; text-align: center; }
    h1 { color: #8d5524; }
  `]
})
export class KetenKarisimliComponent {} 