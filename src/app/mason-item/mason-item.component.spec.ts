import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MasonItemComponent } from "./mason-item.component";

describe("MasonItemComponent", () => {
  let component: MasonItemComponent;
  let fixture: ComponentFixture<MasonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasonItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
