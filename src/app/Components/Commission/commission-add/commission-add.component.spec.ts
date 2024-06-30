import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionAddComponent } from './commission-add.component';

describe('CommissionAddComponent', () => {
  let component: CommissionAddComponent;
  let fixture: ComponentFixture<CommissionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
