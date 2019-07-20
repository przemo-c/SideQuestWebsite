import { Injectable } from "@angular/core";
import { Router, CanActivate, NavigationCancel } from "@angular/router";
import { AppService } from "./app.service";
import { Subscription } from "rxjs";
import { ExpanseClientService } from "./expanse-client.service";

@Injectable()
export class LoginGuard implements CanActivate {
  sub: Subscription;
  constructor(
    private router: Router,
    private service: AppService,
    private expanseService: ExpanseClientService
  ) {
    this.sub = this.router.events.subscribe(val => {
      if (val instanceof NavigationCancel) {
        this.service.currentUrl = val.url;
      }
    });
  }
  canActivate() {
    return this.expanseService.start().then(() => {
      if (!this.service.isAuthenticated) {
        this.service.logout(this.expanseService);
        this.router.navigateByUrl("/login");
      }
      return this.service.isAuthenticated;
    });
    // return new Promise<boolean>(resolve => {
    //   setTimeout(() => {
    //     if (!this.service.isAuthenticated) {
    //       this.service.logout(this.expanseService);
    //       this.router.navigateByUrl('/login');
    //     }
    //     resolve(this.service.isAuthenticated);
    //   }, 150);
    // });
    // });
  }
}
