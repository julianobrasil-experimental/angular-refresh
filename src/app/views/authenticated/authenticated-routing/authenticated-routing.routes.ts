import { inject } from '@angular/core';
import { Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map, tap } from 'rxjs/operators';

import { AuthenticatedRoutingComponent } from './authenticated-routing.component';
import { AuthenticationStoreService } from '../../../data/store/authentication-store.service';
import { UsersApiService } from '../../../data/api/users-api.service';
import { UsersStoreService } from '../../../data/store/users-store.service';

const routes: Route[] = [
  {
    path: '',
    component: AuthenticatedRoutingComponent,
    resolve: {
      users: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const users = inject(UsersStoreService);
        users.setLoadingStatus(true);
        return inject(UsersApiService).getUsers().pipe(
          tap((data) => { users.setUsers(data); }),
          map(() => true)
        );
      }
    },
    canActivate: [(next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot) => {
      const auth = inject(AuthenticationStoreService);
      const router = inject(Router);
      return true // auth.isAuthenticated() ? true : router.createUrlTree(['/', 'login']);
    }],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../users-list/users-list-container.component').then(m => m.UsersListContainerComponent),
      },
      {
        path: ':email',
        loadComponent: () => import('../user-details/user-details-container.component').then(m => m.UserDetailsContainerComponent)
      }
    ]
  }
];

export default routes;
