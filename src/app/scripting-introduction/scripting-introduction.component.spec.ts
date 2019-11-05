import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ScriptingIntroductionComponent } from "./scripting-introduction.component";

describe("ScriptingIntroductionComponent", () => {
  let component: ScriptingIntroductionComponent;
  let fixture: ComponentFixture<ScriptingIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptingIntroductionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptingIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
