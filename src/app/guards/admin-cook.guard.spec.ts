import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminCookGuard } from './admin-cook.guard';

describe('adminCookGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminCookGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
