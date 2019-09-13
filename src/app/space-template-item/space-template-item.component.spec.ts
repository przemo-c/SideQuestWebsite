import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SpaceTemplateItemComponent } from "./space-template-item.component";

describe("SpaceTemplateItemComponent", () => {
  let component: SpaceTemplateItemComponent;
  let fixture: ComponentFixture<SpaceTemplateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceTemplateItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTemplateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
