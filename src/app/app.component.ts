import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
declare const M;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SideQuestWebsite';
  sub: Subscription;
  hideLogo:boolean;
  @ViewChild('sideNav', { static: false }) sideNav;
  constructor( appService: AppService, router: Router, route: ActivatedRoute) {
    this.sub = router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        console.log(val.url);
        const userAgent = (navigator as any).userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
          this.hideLogo = true;
        }
        // const currentPackage = route.snapshot.paramMap.get('packageName');
        // if (currentPackage) {
        //
        // }
      }
    });
  }
}
