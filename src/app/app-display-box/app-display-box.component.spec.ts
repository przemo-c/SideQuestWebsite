import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppDisplayBoxComponent } from "./app-display-box.component";

describe("AppDisplayBoxComponent", () => {
  let component: AppDisplayBoxComponent;
  let fixture: ComponentFixture<AppDisplayBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppDisplayBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDisplayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
