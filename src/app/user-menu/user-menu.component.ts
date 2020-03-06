import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { ExpanseClientService } from "../expanse-client.service";
import { Router } from "@angular/router";
import { AppsToUpdateService } from "../apps-to-update.service";
import { AppListing } from "../account/account.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.css"]
})
export class UserMenuComponent implements OnInit, OnDestroy {
  appsToUpdateCount: number = 0;
  sub: Subscription;
  constructor(
    public appService: AppService,
    public expanseService: ExpanseClientService,
    public router: Router,
    private appsToUpdateService: AppsToUpdateService
  ) {}

  ngOnInit() {
    this.sub = this.appsToUpdateService.appsToUpdate.subscribe(
      (apps: AppListing[]) => {
        this.appsToUpdateCount = apps.length;
      }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  signOut() {
    this.appService.logout(this.expanseService);
    this.router.navigateByUrl("/login");
  }
}
