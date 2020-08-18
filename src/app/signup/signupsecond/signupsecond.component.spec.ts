import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupsecondComponent } from './signupsecond.component';

describe('SignupsecondComponent', () => {
  let component: SignupsecondComponent;
  let fixture: ComponentFixture<SignupsecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupsecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupsecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
