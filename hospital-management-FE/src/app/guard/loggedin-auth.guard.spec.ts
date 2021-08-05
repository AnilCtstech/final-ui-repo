import { TestBed } from '@angular/core/testing';

import { LoggedinAuthGuard } from './loggedin-auth.guard';

describe('LoggedinAuthGuard', () => {
  let guard: LoggedinAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedinAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
