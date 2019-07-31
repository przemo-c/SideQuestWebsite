import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { AppService } from "./app.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MzToastService } from "ngx-materialize";
import { ExpanseClientService } from "./expanse-client.service";
import { AppListing } from "./account/account.component";
import { UploadService } from "./upload.service";
declare const M;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("scrollContainer", { static: false }) scrollContainer;
  @ViewChild("confirmOpen", { static: false }) confirmOpen;
  title = "SideQuestWebsite";
  sub: Subscription;
  @ViewChild("sideNav", { static: false }) sideNav;
  constructor(
    private expanseService: ExpanseClientService,
    public appService: AppService,
    private router: Router,
    route: ActivatedRoute,
    private toastService: MzToastService,
    private uploadService: UploadService
  ) {
    this.sub = router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
      }
    });
    this.expanseService.getInstalledApps("", 0);
    this.setupAppUninstall();
  }

  setupAppUninstall() {
    (window as any).sideQuestRemove = pkg => {
      let isChanged = false;
      Object.keys(this.appService.app_index).forEach(apps_id => {
        if (this.appService.app_index[apps_id] === pkg) {
          this.expanseService.uninstallApp(apps_id);
          console.log("Removing App Meta: ", pkg, apps_id);
          isChanged = true;
        }
      });
      if (isChanged) {
        this.appService.saveAppMeta();
      }
    };
  }

  signOut() {
    this.appService.logout(this.expanseService);
    this.router.navigateByUrl("/login");
  }

  ngAfterViewInit() {
    this.appService.scrollContainer = this.scrollContainer.nativeElement;
    this.appService.confirmOpen = this.confirmOpen;
  }

  openLink(url: string) {
    window.location.href = url;
  }
}
