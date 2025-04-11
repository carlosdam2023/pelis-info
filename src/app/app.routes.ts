import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:() => import('./auth/pages/login/login.component'),
    },
    {
        path:'register',
        loadComponent:() => import('./auth/pages/register/register.component'),
    },
    {
        path:'**',
        redirectTo:'login',
    }
];
