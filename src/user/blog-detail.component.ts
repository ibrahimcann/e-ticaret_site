import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { BlogPost } from '../shared/models/blog.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="blog-detail" *ngIf="blogPost">
      <div class="container">
        <div class="blog-header">
          <img [src]="blogPost.featuredImage" [alt]="blogPost.title" class="featured-image">
          <div class="blog-meta">
            <span class="blog-category">{{ blogPost.category?.name }}</span>
            <span class="blog-date">{{ blogPost.publishedAt | date:'fullDate' }}</span>
            <span class="blog-author">By {{ blogPost.author?.name }}</span>
          </div>
          <h1>{{ blogPost.title }}</h1>
        </div>
        
        <div class="blog-content">
          <div class="content-wrapper">
            {{ blogPost.content }}
          </div>
        </div>
        
        <div class="blog-tags" *ngIf="blogPost.tags && blogPost.tags.length > 0">
          <h3>Tags</h3>
          <div class="tags">
            <span class="tag" *ngFor="let tag of blogPost.tags">#{{ tag }}</span>
          </div>
        </div>
        
        <div class="blog-actions">
          <button class="btn btn-secondary" (click)="goBack()">
            ← Back to Blog
          </button>
        </div>
      </div>
    </article>
    
    <div *ngIf="!blogPost" class="loading">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .blog-detail {
      padding: 2rem 0;
    }
    
    .blog-header {
      margin-bottom: 3rem;
    }
    
    .featured-image {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
    }
    
    .blog-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    .blog-category {
      background-color: #2563eb;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-weight: 500;
    }
    
    .blog-header h1 {
      font-size: 3rem;
      color: #1f2937;
      line-height: 1.2;
    }
    
    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      font-size: 1.125rem;
      line-height: 1.8;
      color: #374151;
    }
    
    .blog-tags {
      margin: 3rem 0;
      padding: 2rem 0;
      border-top: 1px solid #e5e7eb;
    }
    
    .blog-tags h3 {
      margin-bottom: 1rem;
      color: #1f2937;
    }
    
    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .tag {
      background-color: #f3f4f6;
      color: #374151;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
    }
    
    .blog-actions {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
    }
    
    @media (max-width: 768px) {
      .blog-header h1 {
        font-size: 2rem;
      }
      
      .blog-meta {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .content-wrapper {
        font-size: 1rem;
      }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  blogPost: BlogPost | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.dataService.getBlogPosts().subscribe(posts => {
        this.blogPost = posts.find(post => post.slug === slug) || null;
      });
    }
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}