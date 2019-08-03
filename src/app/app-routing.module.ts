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

const routes: Routes = [
  { path: "news", component: HomeComponent },
  { path: "download", component: DownloadSideQuestComponent },
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
  { path: "event/:events_id", component: EventListingComponent },
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
  { path: "apps", component: AppsComponent },
  { path: "apps/:category", component: AppsComponent },
  { path: "account", component: AccountComponent, canActivate: [LoginGuard] },
  { path: "the-expanse", component: HomeComponent },
  { path: "setup-howto", component: SetupHowtoComponent },
  { path: "login", component: LoginComponent, canActivate: [NotLoginGuard] },
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
