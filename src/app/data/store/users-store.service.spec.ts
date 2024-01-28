import { TestBed } from '@angular/core/testing';

import { UserStore, UsersStoreService } from './users-store.service';

describe('UsersService', () => {
  let service: UserStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
