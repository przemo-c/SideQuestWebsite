import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdGamesVerticalComponent } from "./ad-games-vertical.component";

describe("AdGamesVerticalComponent", () => {
  let component: AdGamesVerticalComponent;
  let fixture: ComponentFixture<AdGamesVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdGamesVerticalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdGamesVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
