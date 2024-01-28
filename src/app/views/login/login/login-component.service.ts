import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationStoreService } from '../../../data/store/authentication-store.service';

export interface LoginComponentData {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class LoginComponentService {
  #auth = inject(AuthenticationStoreService);

  constructor(private _router: Router) { }

  /** Valida o usuário logado e redireciona-o se for o caso */
  login(data: LoginComponentData) {
    if (data.username && data.password) {
      this.#auth.setAuthenticatedUser({ name: 'dumb', email: data.username });
      this._router.navigate(['/users']);
    }
  }
}
