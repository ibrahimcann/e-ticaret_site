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
      },
      {
        path: 'search',
        loadComponent: () => import('./user/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'indirim',
        loadComponent: () => import('./user/indirim.component').then(m => m.IndirimComponent)
      },
      {
        path: 'yeni',
        loadComponent: () => import('./user/yeni.component').then(m => m.YeniComponent)
      },
      {
        path: 'keten-karisimli',
        loadComponent: () => import('./user/keten-karisimli.component').then(m => m.KetenKarisimliComponent)
      },
      {
        path: 'giyim',
        loadComponent: () => import('./user/giyim.component').then(m => m.GiyimComponent)
      },
      {
        path: 'str-teen',
        loadComponent: () => import('./user/str-teen.component').then(m => m.StrTeenComponent)
      },
      {
        path: 'casual-spor',
        loadComponent: () => import('./user/casual-spor.component').then(m => m.CasualSporComponent)
      },
      {
        path: 'ayakkabi',
        loadComponent: () => import('./user/ayakkabi.component').then(m => m.AyakkabiComponent)
      },
      {
        path: 'aksesuar',
        loadComponent: () => import('./user/aksesuar.component').then(m => m.AksesuarComponent)
      },
      {
        path: 'canta',
        loadComponent: () => import('./user/canta.component').then(m => m.CantaComponent)
      },
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
        loadComponent: () => import('./admin/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./admin/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./admin/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path: 'brands',
        loadComponent: () => import('./admin/brands.component').then(m => m.BrandsComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./admin/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./admin/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'blog',
        loadComponent: () => import('./admin/blog.component').then(m => m.BlogComponent)
      },
      {
        path: 'pages',
        loadComponent: () => import('./admin/pages.component').then(m => m.PagesComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./admin/favorites.component').then(m => m.FavoritesComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./admin/notifications.component').then(m => m.NotificationsComponent)
      },
      {
        path: 'stock',
        loadComponent: () => import('./admin/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'campaigns',
        loadComponent: () => import('./admin/campaigns.component').then(m => m.CampaignsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];