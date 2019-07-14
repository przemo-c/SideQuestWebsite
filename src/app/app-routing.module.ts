import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SetupHowtoComponent} from './setup-howto/setup-howto.component';
import {WhatIsSideQuestComponent} from './what-is-side-quest/what-is-side-quest.component';
import {DownloadSideQuestComponent} from './download-side-quest/download-side-quest.component';
import {AppManagerComponent} from './app-manager/app-manager.component';
import {LoginGuard} from './login.guard';

const routes: Routes = [
  {path: 'news', component: HomeComponent},
  {path: 'download', component: DownloadSideQuestComponent},
  {path: 'what-is-sidequest', component: WhatIsSideQuestComponent},
  {path: 'app-submissions', component: HomeComponent},
  {path: 'app-manager', component: AppManagerComponent, canActivate: [LoginGuard]},
  {path: 'the-expanse', component: HomeComponent},
  {path: 'setup-howto', component: SetupHowtoComponent},
  {path: '**', component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
