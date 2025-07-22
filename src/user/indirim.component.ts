import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-indirim',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="category-page">
      <h1>İndirim Ürünleri</h1>
      <app-products [defaultCategory]="'indirim'"></app-products>
    </div>
  `,
  styles: [`
    .category-page { padding: 2rem; text-align: center; }
    h1 { color: #e60023; }
  `]
})
export class IndirimComponent {} 