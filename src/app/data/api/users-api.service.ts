import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../../models/user.type';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  getUsers() {
    return of<User[]>([{
      name: 'Test',
      email: 'other test'
    }]).pipe(
      delay(1500)
    )
  }


}
