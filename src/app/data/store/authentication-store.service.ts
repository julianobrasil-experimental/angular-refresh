import { Injectable, computed, signal } from '@angular/core';
import { User } from '../../models/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationStoreService {
  #user = signal<User | null>(null);
  #authenticated = computed(() => Boolean(this.#user()));

  isAuthenticated() {
    return this.#authenticated();
  }

  setAuthenticatedUser(user: User) {
    this.#user.set(user);
  }
}
