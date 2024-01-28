import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./views/login').then(m => m.LoginComponent)
    },
    {
        path: 'users',
        loadChildren: () => import('./views/authenticated/authenticated-routing/authenticated-routing.routes')
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    }
];
