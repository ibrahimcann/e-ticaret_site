import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { BlogPost, PostStatus } from '../shared/models/blog.model';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="blog-admin">
      <div class="page-header">
        <h1>{{ localizationService.t('admin.blog') }}</h1>
        <button class="btn btn-primary" (click)="showAddForm = true">
          {{ localizationService.t('common.add') }} Blog Post
        </button>
      </div>

      <div class="card" *ngIf="showAddForm">
        <h3>{{ editingPost ? localizationService.t('common.edit') : localizationService.t('common.add') }} Blog Post</h3>
        <form (ngSubmit)="savePost()" #postForm="ngForm">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" [(ngModel)]="currentPost.title" name="title" required>
            </div>
            <div class="form-group">
              <label class="form-label">Slug</label>
              <input type="text" class="form-input" [(ngModel)]="currentPost.slug" name="slug" required>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Excerpt</label>
            <textarea class="form-input" [(ngModel)]="currentPost.excerpt" name="excerpt" rows="2"></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Content</label>
            <textarea class="form-input" [(ngModel)]="currentPost.content" name="content" rows="8" required></textarea>
          </div>
          
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Featured Image URL</label>
              <input type="url" class="form-input" [(ngModel)]="currentPost.featuredImage" name="featuredImage">
            </div>
            <div class="form-group">
              <label class="form-label">{{ localizationService.t('common.status') }}</label>
              <select class="form-input" [(ngModel)]="currentPost.status" name="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Tags (comma separated)</label>
            <input type="text" class="form-input" [(ngModel)]="tagsInput" name="tags" 
                   placeholder="technology, innovation, news">
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!postForm.valid">
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
              <th>{{ localizationService.t('common.status') }}</th>
              <th>Author</th>
              <th>Published</th>
              <th>{{ localizationService.t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let post of blogPosts">
              <td>{{ post.title }}</td>
              <td>
                <span class="status-badge" [ngClass]="'status-' + post.status">
                  {{ post.status }}
                </span>
              </td>
              <td>{{ post.author?.name || 'Admin' }}</td>
              <td>{{ post.publishedAt | date:'shortDate' }}</td>
              <td>
                <button class="btn btn-secondary" (click)="editPost(post)" style="margin-right: 0.5rem;">
                  {{ localizationService.t('common.edit') }}
                </button>
                <button class="btn btn-danger" (click)="deletePost(post.id)">
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
      text-transform: capitalize;
    }
    
    .status-draft {
      background-color: #f3f4f6;
      color: #374151;
    }
    
    .status-published {
      background-color: #86efac;
      color: #16a34a;
    }
    
    .status-archived {
      background-color: #fca5a5;
      color: #dc2626;
    }
  `]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  showAddForm = false;
  editingPost: BlogPost | null = null;
  tagsInput = '';
  
  currentPost: Partial<BlogPost> = {
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: PostStatus.DRAFT,
    tags: []
  };

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.dataService.getBlogPosts().subscribe(posts => {
      this.blogPosts = posts;
    });
  }

  editPost(post: BlogPost) {
    this.editingPost = post;
    this.currentPost = { ...post };
    this.tagsInput = post.tags?.join(', ') || '';
    this.showAddForm = true;
  }

  savePost() {
    const tags = this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    const newPost: BlogPost = {
      ...this.currentPost as BlogPost,
      id: this.editingPost?.id || Date.now().toString(),
      tags,
      authorId: '1',
      author: { name: 'Admin' },
      categoryId: '1',
      category: { name: 'General' },
      createdAt: this.editingPost?.createdAt || new Date(),
      updatedAt: new Date(),
      publishedAt: this.currentPost.status === PostStatus.PUBLISHED ? new Date() : undefined
    };
    
    this.dataService.addBlogPost(newPost).subscribe(() => {
      this.loadPosts();
      this.cancelEdit();
    });
  }

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogPosts = this.blogPosts.filter(p => p.id !== id);
    }
  }

  cancelEdit() {
    this.showAddForm = false;
    this.editingPost = null;
    this.tagsInput = '';
    this.currentPost = {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      status: PostStatus.DRAFT,
      tags: []
    };
  }
}