import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionSetupComponent } from './commission-setup.component';

describe('CommissionSetupComponent', () => {
  let component: CommissionSetupComponent;
  let fixture: ComponentFixture<CommissionSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommissionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
