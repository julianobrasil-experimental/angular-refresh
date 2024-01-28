import {Routes} from '@angular/router';

import {LoginRoutingComponent} from './login-routing.component';

/**
 * This routing file is likely useless in most of the scenarios as you can use
 * the loadComponent attribue of the router to lazy-load a component. But if you think
 * you have a good use case for a route containing not only the lazy-loaded login component,
 * then import this routes in a loadChildren attribute of the router:
 *
 * ```javascript
 * loadChildren: () => import('PATH/TO/THIS/FILE').then(m => m.LOGIN_ROUTES)
 * ```
 */
export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: LoginRoutingComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('../login/login.component').then(m => m.LoginComponent),
      }
    ]
  }
];
