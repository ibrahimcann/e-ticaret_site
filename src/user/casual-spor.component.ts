import { Component } from '@angular/core';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-casual-spor',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="category-page">
      <h1>Casual Spor</h1>
      <app-products [defaultCategory]="'casual spor'"></app-products>
    </div>
  `,
  styles: [`
    .category-page { padding: 2rem; text-align: center; }
    h1 { color: #388e3c; }
  `]
})
export class CasualSporComponent {} 