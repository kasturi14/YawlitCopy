import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourplansComponent } from './yourplans.component';

describe('YourplansComponent', () => {
  let component: YourplansComponent;
  let fixture: ComponentFixture<YourplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
