import { TestBed } from '@angular/core/testing';

import { DaySelectionService } from './day-selection.service';

describe('DaySelectionService', () => {
  let service: DaySelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaySelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
