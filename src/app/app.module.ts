import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { OverImageComponent } from './over-image/over-image.component';
import { SetupHowtoComponent } from './setup-howto/setup-howto.component';
import {MzSidenavModule, MzToastModule, MzTooltipModule} from 'ngx-materialize';
import { WhatIsSideQuestComponent } from './what-is-side-quest/what-is-side-quest.component';
import { DownloadSideQuestComponent } from './download-side-quest/download-side-quest.component';
import { DownloadBoxComponent } from './download-box/download-box.component';
import { AppManagerComponent } from './app-manager/app-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverImageComponent,
    SetupHowtoComponent,
    WhatIsSideQuestComponent,
    DownloadSideQuestComponent,
    DownloadBoxComponent,
    AppManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMasonryModule,
    MzToastModule,
    MzTooltipModule,
    MzSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
