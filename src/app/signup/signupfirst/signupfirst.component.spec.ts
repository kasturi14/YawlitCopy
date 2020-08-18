import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupfirstComponent } from './signupfirst.component';

describe('SignupfirstComponent', () => {
  let component: SignupfirstComponent;
  let fixture: ComponentFixture<SignupfirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupfirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupfirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
