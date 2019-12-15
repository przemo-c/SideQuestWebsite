import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AmazonNativeAdComponent } from "./amazon-native-ad.component";

describe("AmazonNativeAdComponent", () => {
  let component: AmazonNativeAdComponent;
  let fixture: ComponentFixture<AmazonNativeAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmazonNativeAdComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonNativeAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
