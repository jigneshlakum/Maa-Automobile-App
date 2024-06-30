import { TestBed } from '@angular/core/testing';

import { CommissionServiceService } from './commission.service.service';

describe('CommissionServiceService', () => {
  let service: CommissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
