import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashComponent } from './wash.component';

describe('WashComponent', () => {
  let component: WashComponent;
  let fixture: ComponentFixture<WashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
