import { TestBed } from '@angular/core/testing';

import { AuthenticationStoreService } from './authentication-store.service';

describe('AuthenticationService', () => {
  let service: AuthenticationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
