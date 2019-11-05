import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GettingStartedInspectorComponent } from "./getting-started-inspector.component";

describe("GettingStartedInspectorComponent", () => {
  let component: GettingStartedInspectorComponent;
  let fixture: ComponentFixture<GettingStartedInspectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GettingStartedInspectorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedInspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
