import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-canta',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="category-page">
      <h1>Çanta</h1>
      <app-products [defaultCategory]="'çanta'"></app-products>
    </div>
  `,
  styles: [`
    .category-page { padding: 2rem; text-align: center; }
    h1 { color: #ad1457; }
  `]
})
export class CantaComponent {} 