import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'breweries',
    loadChildren: () => import('./modules/breweries/breweries.module').then(m => m.BreweriesModule)
  },
  {
    path: 'brewery/:id',
    loadChildren: () => import('./modules/brewery/brewery.module').then(m => m.BreweryModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'breweries'
  }
];
