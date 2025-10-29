import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/live-prices/live-prices.component').then(m => m.LivePricesComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'crypto/:id',
        loadComponent: () => import('./components/crypto-detail/crypto-detail.component').then(m => m.CryptoDetailComponent)
      }
    ]
  }
];
