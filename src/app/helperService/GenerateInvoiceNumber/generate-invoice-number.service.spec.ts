import { TestBed } from '@angular/core/testing';

import { GenerateInvoiceNumberService } from './generate-invoice-number.service';

describe('GenerateInvoiceNumberService', () => {
  let service: GenerateInvoiceNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateInvoiceNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
