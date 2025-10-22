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
        path: 'bubble-view',
        loadComponent: () => import('./components/live-prices/bubble-view/bubble-view.component').then(m => m.BubbleViewComponent)
      }  
    ]
  }
];
