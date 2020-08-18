import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPincodeComponent } from './admin-pincode.component';

describe('AdminPincodeComponent', () => {
  let component: AdminPincodeComponent;
  let fixture: ComponentFixture<AdminPincodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPincodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
