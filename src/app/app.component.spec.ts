import {} from "jasmine";
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { UserMenuComponent } from "./user-menu/user-menu.component";
import {
  MzSidenavModule,
  MzToastModule,
  MzTextareaModule,
  MzChipModule,
  MzRadioButtonModule,
  MzModalModule,
  MzSwitchModule,
  MzInputModule,
  MzButtonModule
} from "ngx-materialize";
import { EncodeUriPipe } from "./encode-uri.pipe";
import { StatsChartComponent } from "./stats-chart/stats-chart.component";
import { NotOverNinePipe } from "./not-over-nine.pipe";
import { FormsModule } from "@angular/forms";
import { FromNowPipe } from "./from-now.pipe";
import { GithubRepoSelectComponent } from "./github-repo-select/github-repo-select.component";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { ChartsModule } from "ng2-charts";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { FooterComponent } from "./footer/footer.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        MzSidenavModule,
        MzToastModule,
        MzTextareaModule,
        MzChipModule,
        MzRadioButtonModule,
        MzModalModule,
        MzRadioButtonModule,
        MzSwitchModule,
        MzInputModule,
        ChartsModule,
        NgxDaterangepickerMd.forRoot(),
        AutocompleteLibModule,
        MzButtonModule
      ],
      declarations: [
        AppComponent,
        UserMenuComponent,
        EncodeUriPipe,
        NotOverNinePipe,
        StatsChartComponent,
        FromNowPipe,
        GithubRepoSelectComponent,
        MainMenuComponent,
        FooterComponent
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SideQuestWebsite'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("SideQuestWebsite");
  });
});
