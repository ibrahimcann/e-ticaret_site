import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { Brand } from '../shared/models/product.model';

@Component({
  selector: 'app-admin-brands',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="brands-admin">
      <div class="page-header">
        <h1>{{ localizationService.t('admin.brands') }}</h1>
        <button class="btn btn-primary" (click)="showAddForm = true">
          {{ localizationService.t('common.add') }} Brand
        </button>
      </div>

      <div class="card" *ngIf="showAddForm">
        <h3>{{ editingBrand ? localizationService.t('common.edit') : localizationService.t('common.add') }} Brand</h3>
        <form (ngSubmit)="saveBrand()" #brandForm="ngForm">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">{{ localizationService.t('common.name') }}</label>
              <input type="text" class="form-input" [(ngModel)]="currentBrand.name" name="name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Logo URL</label>
              <input type="url" class="form-input" [(ngModel)]="currentBrand.logoUrl" name="logoUrl">
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">{{ localizationService.t('common.description') }}</label>
            <textarea class="form-input" [(ngModel)]="currentBrand.description" name="description" rows="3"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!brandForm.valid">
              {{ localizationService.t('common.save') }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="cancelEdit()">
              {{ localizationService.t('common.cancel') }}
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>{{ localizationService.t('common.name') }}</th>
              <th>{{ localizationService.t('common.description') }}</th>
              <th>{{ localizationService.t('common.status') }}</th>
              <th>{{ localizationService.t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let brand of brands">
              <td>
                <img [src]="brand.logoUrl" [alt]="brand.name" 
                     style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
              </td>
              <td>{{ brand.name }}</td>
              <td>{{ brand.description }}</td>
              <td>
                <span class="status-badge" [class.active]="brand.isActive">
                  {{ brand.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-secondary" (click)="editBrand(brand)" style="margin-right: 0.5rem;">
                  {{ localizationService.t('common.edit') }}
                </button>
                <button class="btn btn-danger" (click)="deleteBrand(brand.id)">
                  {{ localizationService.t('common.delete') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      background-color: #fca5a5;
      color: #dc2626;
    }
    
    .status-badge.active {
      background-color: #86efac;
      color: #16a34a;
    }
  `]
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  showAddForm = false;
  editingBrand: Brand | null = null;
  
  currentBrand: Partial<Brand> = {
    name: '',
    description: '',
    logoUrl: '',
    isActive: true
  };

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.dataService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  editBrand(brand: Brand) {
    this.editingBrand = brand;
    this.currentBrand = { ...brand };
    this.showAddForm = true;
  }

  saveBrand() {
    const newBrand: Brand = {
      ...this.currentBrand as Brand,
      id: this.editingBrand?.id || Date.now().toString(),
      createdAt: this.editingBrand?.createdAt || new Date()
    };
    
    this.dataService.addBrand(newBrand).subscribe(() => {
      this.loadBrands();
      this.cancelEdit();
    });
  }

  deleteBrand(id: string) {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brands = this.brands.filter(b => b.id !== id);
    }
  }

  cancelEdit() {
    this.showAddForm = false;
    this.editingBrand = null;
    this.currentBrand = {
      name: '',
      description: '',
      logoUrl: '',
      isActive: true
    };
  }
}