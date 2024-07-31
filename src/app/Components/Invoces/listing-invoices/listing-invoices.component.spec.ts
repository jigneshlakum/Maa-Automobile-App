import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingInvoicesComponent } from './listing-invoices.component';

describe('ListingInvoicesComponent', () => {
  let component: ListingInvoicesComponent;
  let fixture: ComponentFixture<ListingInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
