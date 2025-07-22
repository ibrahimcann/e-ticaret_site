import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-ayakkabi',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="category-page">
      <h1>Ayakkabı</h1>
      <app-products [defaultCategory]="'ayakkabı'"></app-products>
    </div>
  `,
  styles: [`
    .category-page { padding: 2rem; text-align: center; }
    h1 { color: #795548; }
  `]
})
export class AyakkabiComponent {} 