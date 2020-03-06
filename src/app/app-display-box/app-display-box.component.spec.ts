import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppDisplayBoxComponent } from "./app-display-box.component";
import { MzTooltipModule, MzToastModule } from "ngx-materialize";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { RouterTestingModule } from "@angular/router/testing";
import { AbbreviateNumberPipe } from "../abbreviate-number.pipe";
import { FormatNumberPipe } from "../format-number.pipe";

describe("AppDisplayBoxComponent", () => {
  let component: AppDisplayBoxComponent;
  let fixture: ComponentFixture<AppDisplayBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LazyLoadImageModule,
        MzTooltipModule,
        MzToastModule
      ],
      declarations: [
        AppDisplayBoxComponent,
        AbbreviateNumberPipe,
        FormatNumberPipe
      ]
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
