import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-returns',
  standalone: true,
  template: `
    <div class="admin-returns">
      <h2>İade / Değişim</h2>
      <p>Burada iade ve değişim işlemleriyle ilgili içerik olacak.</p>
    </div>
  `,
  styles: [`
    .admin-returns {
      padding: 2rem;
      color: #232c3d;
    }
    .admin-returns h2 {
      margin-bottom: 1rem;
    }
  `]
})
export class ReturnsComponent {} 