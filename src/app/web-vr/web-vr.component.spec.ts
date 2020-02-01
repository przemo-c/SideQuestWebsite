import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WebVRComponent } from "./web-vr.component";

describe("WebVRComponent", () => {
  let component: WebVRComponent;
  let fixture: ComponentFixture<WebVRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebVRComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebVRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
