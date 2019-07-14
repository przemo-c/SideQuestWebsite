
import { Injectable } from '@angular/core';
import {
  Router, CanActivate,
  NavigationCancel
} from '@angular/router';
import {AppService} from './app.service';
import {Subscription} from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  sub: Subscription;
  constructor(private router: Router, private service: AppService) {
    this.sub = this.router.events.subscribe((val) => {
      if (val instanceof NavigationCancel) {
        this.service.currentUrl = val.url;
      }
    });
  }
  canActivate() {
    if (!this.service.isAuthenticated) {
      this.service.logout();
    }
    return this.service.isAuthenticated;
  }
}
