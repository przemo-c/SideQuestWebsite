import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SetupHowtoComponent } from "./setup-howto/setup-howto.component";
import { WhatIsSideQuestComponent } from "./what-is-side-quest/what-is-side-quest.component";
import { DownloadSideQuestComponent } from "./download-side-quest/download-side-quest.component";
import { AppManagerComponent } from "./app-manager/app-manager.component";
import { LoginGuard } from "./login.guard";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { NotLoginGuard } from "./not-login.guard";
import { AccountComponent } from "./account/account.component";
import { AppsComponent } from "./apps/apps.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AppListingComponent } from "./app-listing/app-listing.component";
import { AvatarPickerComponent } from "./avatar-picker/avatar-picker.component";
import { AvatarEditorComponent } from "./avatar-editor/avatar-editor.component";
import { EventListingComponent } from "./event-listing/event-listing.component";
import { EventManagerComponent } from "./event-manager/event-manager.component";
import { EventsComponent } from "./events/events.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { SpacesComponent } from "./spaces/spaces.component";
import { SpaceManagerComponent } from "./space-manager/space-manager.component";
import { SpaceListingComponent } from "./space-listing/space-listing.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { LegendsListComponent } from "./legends-list/legends-list.component";
import { DevelopersComponent } from "./developers/developers.component";
import { GettingStartedComponent } from "./getting-started/getting-started.component";
import { GettingStartedInspectorComponent } from "./getting-started-inspector/getting-started-inspector.component";
import { DeveloperFAQComponent } from "./developer-faq/developer-faq.component";
import { ScriptingIntroductionComponent } from "./scripting-introduction/scripting-introduction.component";
import { ScriptingAppBehavioursComponent } from "./scripting-app-behaviours/scripting-app-behaviours.component";
import { ScriptingInteractionComponent } from "./scripting-interaction/scripting-interaction.component";
import { ScriptingInputControlsComponent } from "./scripting-input-controls/scripting-input-controls.component";
import { EthicsComponent } from "./ethics/ethics.component";
import { WebVRComponent } from "./web-vr/web-vr.component";

const routes: Routes = [
  { path: "news", component: HomeComponent },
  { path: "ethics", component: EthicsComponent },
  { path: "channels", component: LegendsListComponent },
  { path: "developers", component: DevelopersComponent },
  { path: "developer-faq", component: DeveloperFAQComponent },
  { path: "getting-started-build-app", component: GettingStartedComponent },
  {
    path: "getting-started-test-app",
    component: GettingStartedInspectorComponent
  },
  { path: "scripting-introduction", component: ScriptingIntroductionComponent },
  {
    path: "scripting-app-behaviours",
    component: ScriptingAppBehavioursComponent
  },
  { path: "scripting-interactions", component: ScriptingInteractionComponent },
  {
    path: "scripting-input-controls",
    component: ScriptingInputControlsComponent
  },
  { path: "download", component: DownloadSideQuestComponent },
  { path: "privacy", component: PrivacyPolicyComponent },
  {
    path: "avatar-editor",
    component: AvatarEditorComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "avatar-editor/:url",
    component: AvatarEditorComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "avatar-picker",
    component: AvatarPickerComponent,
    canActivate: [LoginGuard]
  },
  { path: "what-is-sidequest", component: WhatIsSideQuestComponent },
  { path: "app/:apps_id", component: AppListingComponent },
  { path: "app/:apps_id/:clickthrough", component: AppListingComponent },
  { path: "event/:events_id", component: EventListingComponent },
  { path: "event/:events_id/:start_time", component: EventListingComponent },
  {
    path: "my-event",
    component: EventManagerComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "my-event/:events_id",
    component: EventManagerComponent,
    canActivate: [LoginGuard]
  },
  { path: "my-app", component: AppManagerComponent, canActivate: [LoginGuard] },
  {
    path: "my-app/:apps_id",
    component: AppManagerComponent,
    canActivate: [LoginGuard]
  },
  { path: "events", component: EventsComponent },
  { path: "events/:page", component: EventsComponent },
  { path: "spaces", component: SpacesComponent },
  { path: "spaces/:page", component: SpacesComponent },
  { path: "space/:spaces_id", component: SpaceListingComponent },
  {
    path: "my-space",
    component: SpaceManagerComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "my-space/:spaces_id",
    component: SpaceManagerComponent,
    canActivate: [LoginGuard]
  },
  { path: "apps", component: AppsComponent },
  { path: "user/:users_id", component: UserProfileComponent },
  { path: "apps/:category", component: AppsComponent },
  { path: "apps/:category/:tag", component: AppsComponent },
  { path: "apps/:category/:tag/:page", component: AppsComponent },
  { path: "account", component: AccountComponent, canActivate: [LoginGuard] },
  {
    path: "account/:type",
    component: AccountComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "account/:type/:users_id",
    component: AccountComponent,
    canActivate: [LoginGuard]
  },
  { path: "the-expanse", component: HomeComponent },
  { path: "webvr", component: WebVRComponent },
  { path: "setup-howto", component: SetupHowtoComponent },
  { path: "login", component: LoginComponent, canActivate: [NotLoginGuard] },
  {
    path: "login/:return",
    component: LoginComponent,
    canActivate: [NotLoginGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [NotLoginGuard]
  },
  {
    path: "reset-password/:token",
    component: ResetPasswordComponent,
    canActivate: [NotLoginGuard]
  },
  { path: "sign-up", component: SignUpComponent, canActivate: [NotLoginGuard] },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
