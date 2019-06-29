import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MzToastService} from 'ngx-materialize';
declare const M;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'SideQuestWebsite';
  sub: Subscription;
  hideLogo:boolean;
  @ViewChild('sideNav', { static: false }) sideNav;
  constructor( appService: AppService, router: Router, route: ActivatedRoute, private toastService: MzToastService) {
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

  ngAfterViewInit() {
    setTimeout(() => this.toastService.show(
        'Support us on Patreon <a class="btn-flat white-text">Click</a>',
      45000,
        'green move-down',
        () => {
      //
    }), 5000);

    setTimeout(() => this.toastService.show(
      'Donate on Paypal <a class="btn-flat white-text">Click</a>',
      45000,
      'blue move-down',
      () => {
      //
    }), 8000);
  }
}
