import { TestBed } from '@angular/core/testing';

import { AuthenticateCompanyGuard } from './authenticate-company.guard';

describe('AuthenticateCompanyGuard', () => {
  let guard: AuthenticateCompanyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticateCompanyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
