import { Injectable } from "@angular/core";
import { Router, CanActivate, NavigationCancel } from "@angular/router";
import { AppService } from "./app.service";
import { Subscription } from "rxjs";

@Injectable()
export class NotLoginGuard implements CanActivate {
  sub: Subscription;
  constructor(private router: Router, private service: AppService) {
    this.sub = this.router.events.subscribe(val => {
      if (val instanceof NavigationCancel) {
        this.service.currentUrl = val.url;
      }
    });
  }
  canActivate() {
    if (this.service.isAuthenticated) {
      this.router.navigateByUrl("/account");
    }
    return !this.service.isAuthenticated;
  }
}
