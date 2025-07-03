import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { Category } from '../shared/models/product.model';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="categories-admin">
      <div class="page-header">
        <h1>{{ localizationService.t('admin.categories') }}</h1>
        <button class="btn btn-primary" (click)="showAddForm = true">
          {{ localizationService.t('common.add') }} Category
        </button>
      </div>

      <div class="card" *ngIf="showAddForm">
        <h3>{{ editingCategory ? localizationService.t('common.edit') : localizationService.t('common.add') }} Category</h3>
        <form (ngSubmit)="saveCategory()" #categoryForm="ngForm">
          <div class="form-group">
            <label class="form-label">{{ localizationService.t('common.name') }}</label>
            <input type="text" class="form-input" [(ngModel)]="currentCategory.name" name="name" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">{{ localizationService.t('common.description') }}</label>
            <textarea class="form-input" [(ngModel)]="currentCategory.description" name="description" rows="3"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!categoryForm.valid">
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
              <th>{{ localizationService.t('common.name') }}</th>
              <th>{{ localizationService.t('common.description') }}</th>
              <th>{{ localizationService.t('common.status') }}</th>
              <th>Created</th>
              <th>{{ localizationService.t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let category of categories">
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td>
                <span class="status-badge" [class.active]="category.isActive">
                  {{ category.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>{{ category.createdAt | date:'shortDate' }}</td>
              <td>
                <button class="btn btn-secondary" (click)="editCategory(category)" style="margin-right: 0.5rem;">
                  {{ localizationService.t('common.edit') }}
                </button>
                <button class="btn btn-danger" (click)="deleteCategory(category.id)">
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
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  showAddForm = false;
  editingCategory: Category | null = null;
  
  currentCategory: Partial<Category> = {
    name: '',
    description: '',
    isActive: true
  };

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.currentCategory = { ...category };
    this.showAddForm = true;
  }

  saveCategory() {
    const newCategory: Category = {
      ...this.currentCategory as Category,
      id: this.editingCategory?.id || Date.now().toString(),
      createdAt: this.editingCategory?.createdAt || new Date()
    };
    
    this.dataService.addCategory(newCategory).subscribe(() => {
      this.loadCategories();
      this.cancelEdit();
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      // In a real app, you would have a delete method in the service
      this.categories = this.categories.filter(c => c.id !== id);
    }
  }

  cancelEdit() {
    this.showAddForm = false;
    this.editingCategory = null;
    this.currentCategory = {
      name: '',
      description: '',
      isActive: true
    };
  }
}