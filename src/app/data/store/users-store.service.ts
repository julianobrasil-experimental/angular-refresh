import { Injectable, InjectionToken, Signal, signal } from '@angular/core';
import { User } from '../../models/user.type';

export type UserStore = {
  setUsers: (users: User[]) => void,
  users: Signal<User[]>
  setLoadingStatus: (loadingStatus: boolean) => void,
  isLoading: Signal<boolean>
};

export const UsersStoreService = new InjectionToken<UserStore>('Users Store', {
  providedIn: 'root',
  factory: () => {
    const users = signal<User[]>([]);
    const loading = signal<boolean>(false);
    return {
      isLoading: loading.asReadonly(),
      setLoadingStatus(loadingStatus: boolean) {
        loading.set(loadingStatus);
      },
      users: users.asReadonly(),
      setUsers(newUsers: User[]) {
        users.set(newUsers);
      },
    }
  }
});
