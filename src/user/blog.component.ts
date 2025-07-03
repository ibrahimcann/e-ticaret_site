import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { LocalizationService } from '../shared/services/localization.service';
import { BlogPost } from '../shared/models/blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-page">
      <div class="container">
        <div class="page-header">
          <h1>{{ localizationService.t('nav.blog') }}</h1>
          <p>Discover insights, trends, and stories from our team</p>
        </div>
        
        <div class="blog-grid grid grid-3">
          <article class="blog-card card" *ngFor="let post of blogPosts">
            <img [src]="post.featuredImage" [alt]="post.title" class="blog-image">
            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-category">{{ post.category?.name }}</span>
                <span class="blog-date">{{ post.publishedAt | date:'mediumDate' }}</span>
              </div>
              <h2><a [routerLink]="['/blog', post.slug]">{{ post.title }}</a></h2>
              <p>{{ post.excerpt }}</p>
              <div class="blog-footer">
                <span class="blog-author">By {{ post.author?.name }}</span>
                <a [routerLink]="['/blog', post.slug]" class="read-more">Read More →</a>
              </div>
            </div>
          </article>
        </div>
        
        <div *ngIf="blogPosts.length === 0" class="no-posts">
          <div class="card">
            <h2>No blog posts yet</h2>
            <p>Check back soon for new content!</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-page {
      padding: 2rem 0;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .page-header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #1f2937;
    }
    
    .page-header p {
      font-size: 1.25rem;
      color: #6b7280;
    }
    
    .blog-card {
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    }
    
    .blog-image {
      width: 100%;
      height: 240px;
      object-fit: cover;
    }
    
    .blog-content {
      padding: 1.5rem;
    }
    
    .blog-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }
    
    .blog-category {
      background-color: #2563eb;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-weight: 500;
    }
    
    .blog-date {
      color: #6b7280;
    }
    
    .blog-content h2 {
      margin-bottom: 1rem;
    }
    
    .blog-content h2 a {
      color: #1f2937;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .blog-content h2 a:hover {
      color: #2563eb;
    }
    
    .blog-content p {
      color: #6b7280;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .blog-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .blog-author {
      color: #6b7280;
      font-size: 0.875rem;
    }
    
    .read-more {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    
    .read-more:hover {
      color: #1d4ed8;
    }
    
    .no-posts {
      text-align: center;
      max-width: 500px;
      margin: 3rem auto;
    }
  `]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];

  constructor(
    private dataService: DataService,
    public localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.dataService.getBlogPosts().subscribe(posts => {
      this.blogPosts = posts.filter(post => post.status === 'published');
    });
  }
}