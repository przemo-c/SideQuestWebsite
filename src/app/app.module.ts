import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NgxMasonryModule } from "ngx-masonry";
import { OverImageComponent } from "./over-image/over-image.component";
import { SetupHowtoComponent } from "./setup-howto/setup-howto.component";
import {
  MzButtonModule,
  MzChipModule,
  MzCollapsibleModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule,
  MzModalModule,
  MzRadioButtonModule,
  MzSelectModule,
  MzSidenavModule,
  MzSwitchModule,
  MzTabModule,
  MzToastModule,
  MzTooltipModule,
  MzParallaxModule
} from "ngx-materialize";
import { WhatIsSideQuestComponent } from "./what-is-side-quest/what-is-side-quest.component";
import { DownloadSideQuestComponent } from "./download-side-quest/download-side-quest.component";
import { DownloadBoxComponent } from "./download-box/download-box.component";
import { AppManagerComponent } from "./app-manager/app-manager.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { FormsModule } from "@angular/forms";
import { NotLoginGuard } from "./not-login.guard";
import { AccountComponent } from "./account/account.component";
import { LoginGuard } from "./login.guard";
import { AppsComponent } from "./apps/apps.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AppListingComponent } from "./app-listing/app-listing.component";
import { LightboxModule } from "ngx-lightbox";
import { ChartsModule } from "ng2-charts";
import { StatsChartComponent } from "./stats-chart/stats-chart.component";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { AvatarPickerComponent } from "./avatar-picker/avatar-picker.component";
import { AvatarEditorComponent } from "./avatar-editor/avatar-editor.component";
import { EncodeURIComponentPipe } from "./encode-uricomponent.pipe";
import { EventManagerComponent } from "./event-manager/event-manager.component";
import { EventListingComponent } from "./event-listing/event-listing.component";
import { EventsComponent } from "./events/events.component";
import { ShowDatePipe } from "./show-date.pipe";
import { ShowDurationPipe } from "./show-duration.pipe";
import { ShowTimePipe } from "./show-time.pipe";
import { GridItemComponent } from "./grid-item/grid-item.component";
import { ListItemComponent } from "./list-item/list-item.component";
import { TimelineItemComponent } from "./timeline-item/timeline-item.component";
import { ListingModesComponent } from "./listing-modes/listing-modes.component";
import { FooterComponent } from "./footer/footer.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverImageComponent,
    SetupHowtoComponent,
    WhatIsSideQuestComponent,
    DownloadSideQuestComponent,
    DownloadBoxComponent,
    AppManagerComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    AccountComponent,
    AppsComponent,
    ResetPasswordComponent,
    AppListingComponent,
    StatsChartComponent,
    AvatarPickerComponent,
    AvatarEditorComponent,
    EncodeURIComponentPipe,
    EventManagerComponent,
    EventListingComponent,
    EventsComponent,
    ShowDatePipe,
    ShowDurationPipe,
    ShowTimePipe,
    GridItemComponent,
    ListItemComponent,
    TimelineItemComponent,
    ListingModesComponent,
    FooterComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMasonryModule,
    MzCollapsibleModule,
    MzToastModule,
    MzSwitchModule,
    MzTooltipModule,
    MzSidenavModule,
    MzInputModule,
    MzIconMdiModule,
    MzTabModule,
    MzChipModule,
    MzRadioButtonModule,
    MzSelectModule,
    MzButtonModule,
    MzModalModule,
    FormsModule,
    ChartsModule,
    MzParallaxModule,
    NgxDaterangepickerMd.forRoot(),
    LightboxModule
  ],
  providers: [NotLoginGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
