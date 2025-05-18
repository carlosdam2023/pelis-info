import { Routes } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
    {
      path: 'home',
      loadComponent: () => import('./home-page/pages/home-page/home-page.component'),
    },
    {
        path:'login',
        loadComponent:() => import('./auth/pages/login/login.component'),
        canMatch: [NotAuthenticatedGuard]
    },
    {
        path:'register',
        loadComponent:() => import('./auth/pages/register/register.component'),
    },
    {
        path: 'movie/:id',
        loadComponent: () => import('./home-page/pages/movie-detail/movie-detail.component'),
    },
    {
        path:'**',
        redirectTo:'login',
    }
];
