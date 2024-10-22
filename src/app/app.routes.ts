import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (x) => x.DashboardComponent
      ),
  },
  {
    path: 'dashboard/useraction',
    loadComponent: () =>
        import('./features/update-user/update-user.component').then(
          (x) => x.UpdateUserComponent
        ),
  },
  {
    path: 'dashboard/useraction/:id',
    loadComponent: () =>
        import('./features/update-user/update-user.component').then(
          (x) => x.UpdateUserComponent
        ),
  }
];
