import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { OverImageComponent } from './over-image/over-image.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMasonryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
