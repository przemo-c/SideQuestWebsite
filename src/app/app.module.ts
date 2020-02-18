import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
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
  MzParallaxModule,
  MzTextareaModule
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
import { SpacesComponent } from "./spaces/spaces.component";
import { SpaceManagerComponent } from "./space-manager/space-manager.component";
import { SpaceListingComponent } from "./space-listing/space-listing.component";
import { SpaceTemplateItemComponent } from "./space-template-item/space-template-item.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { FromNowPipe } from "./from-now.pipe";
import { NotOverNinePipe } from "./not-over-nine.pipe";
import { EncodeUriPipe } from "./encode-uri.pipe";
import { RecaptchaModule } from "ng-recaptcha";
import { MasonItemComponent } from "./mason-item/mason-item.component";
import { LegendsListComponent } from "./legends-list/legends-list.component";
import { DevelopersComponent } from "./developers/developers.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { GettingStartedInspectorComponent } from "./getting-started-inspector/getting-started-inspector.component";
import { DeveloperFAQComponent } from "./developer-faq/developer-faq.component";
import { ScriptingIntroductionComponent } from "./scripting-introduction/scripting-introduction.component";
import { HighlightModule } from "ngx-highlightjs";
import cs from "highlight.js/lib/languages/cs";
import { CodeBlockComponent } from "./code-block/code-block.component";
import { ScriptingAppBehavioursComponent } from "./scripting-app-behaviours/scripting-app-behaviours.component";
import { ScriptingInteractionComponent } from "./scripting-interaction/scripting-interaction.component";
import { ScriptingInputControlsComponent } from "./scripting-input-controls/scripting-input-controls.component";
import { AppDisplayBoxComponent } from "./app-display-box/app-display-box.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { UserMenuComponent } from "./user-menu/user-menu.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { AmazonNativeAdComponent } from "./amazon-native-ad/amazon-native-ad.component";
import { AdPlaceholderComponent } from "./ad-placeholder/ad-placeholder.component";
import { AdGamesVerticalComponent } from "./ad-games-vertical/ad-games-vertical.component";
import { AdHomeVerticalComponent } from "./ad-home-vertical/ad-home-vertical.component";
import { EthicsComponent } from "./ethics/ethics.component";
import { WebVRComponent } from "./web-vr/web-vr.component";
import { GiveawayComponent } from "./giveaway/giveaway.component";

export function hljsLanguages() {
  return [{ name: "cs", func: cs }];
}

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
    PrivacyPolicyComponent,
    SpacesComponent,
    SpaceManagerComponent,
    SpaceListingComponent,
    SpaceTemplateItemComponent,
    UserProfileComponent,
    FromNowPipe,
    NotOverNinePipe,
    EncodeUriPipe,
    MasonItemComponent,
    LegendsListComponent,
    DevelopersComponent,
    GettingStartedComponent,
    GettingStartedInspectorComponent,
    DeveloperFAQComponent,
    ScriptingIntroductionComponent,
    CodeBlockComponent,
    ScriptingAppBehavioursComponent,
    ScriptingInteractionComponent,
    ScriptingInputControlsComponent,
    AppDisplayBoxComponent,
    MainMenuComponent,
    UserMenuComponent,
    SideNavComponent,
    AmazonNativeAdComponent,
    AdPlaceholderComponent,
    AdGamesVerticalComponent,
    AdHomeVerticalComponent,
    EthicsComponent,
    WebVRComponent,
    GiveawayComponent
  ],
  imports: [
    // {
    //   adClient: 'ca-pub-4418999855454494',
    //   adSlot: 7259870550,
    // }
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    LazyLoadImageModule,
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
    MzTextareaModule,
    NgxDaterangepickerMd.forRoot(),
    LightboxModule,
    RecaptchaModule
  ],
  providers: [NotLoginGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
