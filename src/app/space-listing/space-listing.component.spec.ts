import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SpaceListingComponent } from "./space-listing.component";

describe("SpaceListingComponent", () => {
  let component: SpaceListingComponent;
  let fixture: ComponentFixture<SpaceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceListingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
