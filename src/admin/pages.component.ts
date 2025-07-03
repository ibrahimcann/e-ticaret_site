import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from '../shared/services/localization.service';

@Component({
  selector: 'app-admin-pages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pages-admin">
      <div class="page-header">
        <h1>{{ localizationService.t('admin.pages') }}</h1>
        <button class="btn btn-primary" (click)="showAddForm = true">
          {{ localizationService.t('common.add') }} Page
        </button>
      </div>

      <div class="card" *ngIf="showAddForm">
        <h3>{{ editingPage ? localizationService.t('common.edit') : localizationService.t('common.add') }} Page</h3>
        <form (ngSubmit)="savePage()" #pageForm="ngForm">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" [(ngModel)]="currentPage.title" name="title" required>
            </div>
            <div class="form-group">
              <label class="form-label">Slug</label>
              <input type="text" class="form-input" [(ngModel)]="currentPage.slug" name="slug" required>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Content</label>
            <textarea class="form-input" [(ngModel)]="currentPage.content" name="content" rows="10" required></textarea>
          </div>
          
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Meta Title</label>
              <input type="text" class="form-input" [(ngModel)]="currentPage.metaTitle" name="metaTitle">
            </div>
            <div class="form-group">
              <label class="form-label">Meta Description</label>
              <input type="text" class="form-input" [(ngModel)]="currentPage.metaDescription" name="metaDescription">
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!pageForm.valid">
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
              <th>Title</th>
              <th>Slug</th>
              <th>{{ localizationService.t('common.status') }}</th>
              <th>Updated</th>
              <th>{{ localizationService.t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let page of samplePages">
              <td>{{ page.title }}</td>
              <td>/{{ page.slug }}</td>
              <td>
                <span class="status-badge" [class.active]="page.isActive">
                  {{ page.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>{{ page.updatedAt | date:'shortDate' }}</td>
              <td>
                <button class="btn btn-secondary" (click)="editPage(page)" style="margin-right: 0.5rem;">
                  {{ localizationService.t('common.edit') }}
                </button>
                <button class="btn btn-danger" (click)="deletePage(page.id)">
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
export class AdminPagesComponent {
  samplePages = [
    {
      id: '1',
      title: 'About Us',
      slug: 'about',
      content: 'Learn more about our company...',
      metaTitle: 'About Us - E-Commerce',
      metaDescription: 'Learn about our story and mission',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Privacy Policy',
      slug: 'privacy',
      content: 'Our privacy policy...',
      metaTitle: 'Privacy Policy - E-Commerce',
      metaDescription: 'Read our privacy policy',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      title: 'Terms of Service',
      slug: 'terms',
      content: 'Our terms of service...',
      metaTitle: 'Terms of Service - E-Commerce',
      metaDescription: 'Read our terms of service',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-05')
    }
  ];

  showAddForm = false;
  editingPage: any = null;
  
  currentPage: any = {
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    isActive: true
  };

  constructor(public localizationService: LocalizationService) {}

  editPage(page: any) {
    this.editingPage = page;
    this.currentPage = { ...page };
    this.showAddForm = true;
  }

  savePage() {
    if (this.editingPage) {
      const index = this.samplePages.findIndex(p => p.id === this.editingPage.id);
      if (index !== -1) {
        this.samplePages[index] = { ...this.currentPage };
      }
    } else {
      this.samplePages.push({
        ...this.currentPage,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    this.cancelEdit();
  }

  deletePage(id: string) {
    if (confirm('Are you sure you want to delete this page?')) {
      this.samplePages = this.samplePages.filter(p => p.id !== id);
    }
  }

  cancelEdit() {
    this.showAddForm = false;
    this.editingPage = null;
    this.currentPage = {
      title: '',
      slug: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      isActive: true
    };
  }
}