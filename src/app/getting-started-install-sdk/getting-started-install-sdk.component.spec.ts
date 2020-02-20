import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GettingStartedInstallSdkComponent } from "./getting-started-install-sdk.component";

describe("GettingStartedInstallSdkComponent", () => {
  let component: GettingStartedInstallSdkComponent;
  let fixture: ComponentFixture<GettingStartedInstallSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GettingStartedInstallSdkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStartedInstallSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
