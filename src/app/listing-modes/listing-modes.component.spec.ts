import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListingModesComponent } from "./listing-modes.component";

describe("ListingModesComponent", () => {
  let component: ListingModesComponent;
  let fixture: ComponentFixture<ListingModesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListingModesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
