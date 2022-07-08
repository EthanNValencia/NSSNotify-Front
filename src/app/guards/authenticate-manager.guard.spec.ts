import { TestBed } from '@angular/core/testing';

import { AuthenticateManagerGuard } from './authenticate-manager.guard';

describe('AuthenticateManagerGuard', () => {
  let guard: AuthenticateManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticateManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
