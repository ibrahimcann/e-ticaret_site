export const routes = [
  {
    path: '',
    loadComponent: () => import('../user/layout.component').then(m => m.UserLayoutComponent),
    children: [
      { path: 'favorites', loadComponent: () => import('../user/favorites.component').then(m => m.FavoritesComponent) },
      { path: 'orders', loadComponent: () => import('../user/orders.component').then(m => m.OrdersComponent) },
      { path: 'orders/:id', loadComponent: () => import('../user/order-detail.component').then(m => m.OrderDetailComponent) },
    ]
  }
]; 