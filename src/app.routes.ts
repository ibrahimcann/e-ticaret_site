import { Routes } from '@angular/router';

export const routes: Routes = [
  // User routes
  {
    path: '',
    loadComponent: () => import('./user/layout.component').then(m => m.UserLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./user/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./user/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./user/product-detail.component').then(m => m.ProductDetailComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./user/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'blog',
        loadComponent: () => import('./user/blog.component').then(m => m.BlogComponent)
      },
      {
        path: 'blog/:slug',
        loadComponent: () => import('./user/blog-detail.component').then(m => m.BlogDetailComponent)
      },
      {
        path: 'contact',
        loadComponent: () => import('./user/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./user/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./user/checkout.component').then(m => m.CheckoutComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./user/favorites.component').then(m => m.FavoritesComponent)
      }
    ]
  },
  // Admin routes
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./admin/products.component').then(m => m.AdminProductsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./admin/categories.component').then(m => m.AdminCategoriesComponent)
      },
      {
        path: 'brands',
        loadComponent: () => import('./admin/brands.component').then(m => m.AdminBrandsComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./admin/users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./admin/orders.component').then(m => m.AdminOrdersComponent)
      },
      {
        path: 'blog',
        loadComponent: () => import('./admin/blog.component').then(m => m.AdminBlogComponent)
      },
      {
        path: 'pages',
        loadComponent: () => import('./admin/pages.component').then(m => m.AdminPagesComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./user/favorites.component').then(m => m.FavoritesComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./admin/notifications.component').then(m => m.NotificationsComponent)
      },
      {
        path: 'returns',
        loadComponent: () => import('./admin/returns.component').then(m => m.ReturnsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];