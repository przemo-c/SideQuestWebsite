import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ScriptingInteractionComponent } from "./scripting-interaction.component";

describe("ScriptingInteractionComponent", () => {
  let component: ScriptingInteractionComponent;
  let fixture: ComponentFixture<ScriptingInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptingInteractionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptingInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
