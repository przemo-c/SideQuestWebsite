import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DeveloperFAQComponent } from "./developer-faq.component";

describe("DeveloperFAQComponent", () => {
  let component: DeveloperFAQComponent;
  let fixture: ComponentFixture<DeveloperFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloperFAQComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
