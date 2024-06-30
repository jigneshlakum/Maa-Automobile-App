import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantParmissionComponent } from './GrantParmissionComponent';

describe('GrantParmissionComponent', () => {
  let component: GrantParmissionComponent;
  let fixture: ComponentFixture<GrantParmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantParmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantParmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
