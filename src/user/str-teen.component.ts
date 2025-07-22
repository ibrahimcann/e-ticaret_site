import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-str-teen',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="category-page">
      <h1>STR TEEN</h1>
      <app-products [defaultCategory]="'str teen'"></app-products>
    </div>
  `,
  styles: [`
    .category-page { padding: 2rem; text-align: center; }
    h1 { color: #ff9800; }
  `]
})
export class StrTeenComponent {} 