import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverImageComponent } from './over-image.component';

describe('OverImageComponent', () => {
  let component: OverImageComponent;
  let fixture: ComponentFixture<OverImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
