import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'news', component: HomeComponent},
  {path: 'what-is-sidequest', component: HomeComponent},
  {path: 'app-submissions', component: HomeComponent},
  {path: 'the-expanse', component: HomeComponent},
  {path: 'setup-howto', component: HomeComponent},
  {path: '**', component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
