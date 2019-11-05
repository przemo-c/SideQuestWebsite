import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ScriptingInputControlsComponent } from "./scripting-input-controls.component";

describe("ScriptingInputControlsComponent", () => {
  let component: ScriptingInputControlsComponent;
  let fixture: ComponentFixture<ScriptingInputControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptingInputControlsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptingInputControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
