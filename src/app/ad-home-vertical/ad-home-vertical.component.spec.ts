import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdHomeVerticalComponent } from "./ad-home-vertical.component";

describe("AdHomeVerticalComponent", () => {
  let component: AdHomeVerticalComponent;
  let fixture: ComponentFixture<AdHomeVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdHomeVerticalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdHomeVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
