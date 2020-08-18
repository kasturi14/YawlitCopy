import { TestBed } from '@angular/core/testing';

import { UserSaveService } from './user-save.service';

describe('UserSaveService', () => {
  let service: UserSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
