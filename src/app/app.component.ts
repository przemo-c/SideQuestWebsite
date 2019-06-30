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
export class AppComponent implements AfterViewInit {
  @ViewChild('scrollContainer',{static: false}) scrollContainer;
  title = 'SideQuestWebsite';
  sub: Subscription;
  @ViewChild('sideNav', { static: false }) sideNav;
  constructor( public appService: AppService, router: Router, route: ActivatedRoute, private toastService: MzToastService) {
    this.sub = router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
      }
    });
  }

  ngAfterViewInit() {
    this.appService.scrollContainer = this.scrollContainer.nativeElement;
    const patreonClick = 'onclick="window.location.href = ' +
      '\'https://www.patreon.com/TheExpanseVR\'"';
    setTimeout(() => this.toastService.show(
        '<span class="chip pointer offset-toast-chip" ' +
      patreonClick +
      '>' +
      '<img src="assets/images/patreon.jpg" alt="Support us on Patreon"/>' +
      'Support us on Patreon</span> <a class="btn-flat waves-effect waves-light white-text" ' +
      patreonClick +
      '">Open</a>',
      45000,
        'orange move-down',
        () => {
          console.log('patreon');
    }), 5000);
    const paypalClick = 'onclick="window.location.href = ' +
      '\'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=744A6C394Q8JG&source=url\'"';
    setTimeout(() => this.toastService.show(
      '<span class="chip pointer offset-toast-chip" ' +
      paypalClick +
      '>' +
      '<img src="assets/images/paypal.jpg" alt="Donate on Paypal"/>' +
      'Donate on Paypal</span> <a class="btn-flat waves-effect waves-light white-text" ' +
      paypalClick +
      '">Open</a>',
      45000,
      'blue move-down',
      () => {
      console.log('paypal');
    }), 5500);
  }

  openLink(url: string)  {
    window.location.href = url;
  }
}
