import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdPlaceholderComponent } from "./ad-placeholder.component";

describe("AdPlaceholderComponent", () => {
  let component: AdPlaceholderComponent;
  let fixture: ComponentFixture<AdPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdPlaceholderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
