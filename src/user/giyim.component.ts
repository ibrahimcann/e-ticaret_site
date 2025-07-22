import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-giyim',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="category-page">
      <h1>Giyim</h1>
      <app-products [defaultCategory]="'giyim'"></app-products>
    </div>
  `,
  styles: [`
    .category-page { padding: 2rem; text-align: center; }
    h1 { color: #111; }
  `]
})
export class GiyimComponent {} 