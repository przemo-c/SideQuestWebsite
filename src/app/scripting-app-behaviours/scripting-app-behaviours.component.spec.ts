import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ScriptingAppBehavioursComponent } from "./scripting-app-behaviours.component";

describe("ScriptingAppBehavioursComponent", () => {
  let component: ScriptingAppBehavioursComponent;
  let fixture: ComponentFixture<ScriptingAppBehavioursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptingAppBehavioursComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptingAppBehavioursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
