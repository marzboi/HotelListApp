import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'hotel-dashboard',
    loadComponent: () => import('./hotel-dashboard/dashboard.component'),
    children: [
      {
        path: 'hotel-list',
        title: 'Hotel List',
        loadComponent: () =>
          import('./hotel-dashboard/pages/hotel-list/hotel-list.component'),
      },
      {
        path: 'hotel/:id',
        title: 'Hotel View',
        loadComponent: () =>
          import('./hotel-dashboard/pages/hotel-detail/hotel-detail.component'),
      },
      {
        path: '',
        redirectTo: 'hotel-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/hotel-dashboard',
    pathMatch: 'full',
  },
];
