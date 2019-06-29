import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupHowtoComponent } from './setup-howto.component';

describe('SetupHowtoComponent', () => {
  let component: SetupHowtoComponent;
  let fixture: ComponentFixture<SetupHowtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupHowtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupHowtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
