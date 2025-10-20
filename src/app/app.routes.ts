import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'live-prices',
        loadComponent: () => import('./components/live-prices/live-prices.component').then(m => m.LivePricesComponent)
      }  
    ]
  }
];
