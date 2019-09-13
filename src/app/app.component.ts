import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
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
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild("scrollContainer", { static: false }) scrollContainer;
  @ViewChild("confirmOpen", { static: false }) confirmOpen;
  title = "SideQuestWebsite";
  sub: Subscription;
  message_sound: any;
  friend_sound: any;
  @ViewChild("sideNav", { static: false }) sideNav;
  constructor(
    public expanseService: ExpanseClientService,
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
    this.expanseService.onusermessage = this.userMessage.bind(this);

    this.message_sound = new Audio();
    this.message_sound.src = "../../assets/sounds/message.mp3";
    this.friend_sound = new Audio();
    this.friend_sound.src = "../../assets/sounds/message.mp3";
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  userMessage(data) {
    if (data.message.is_blocked) {
    } else if (data.message.is_friend_request) {
      this.appService.getNotifications(this.expanseService);
      this.friend_sound.play();
    } else if (data.message.spaces_id) {
    } else {
      this.appService.getNotifications(this.expanseService);
      this.message_sound.play();
    }
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

  ngOnInit() {
    this.appService.getNotifications(this.expanseService);
  }

  ngAfterViewInit() {
    this.appService.scrollContainer = this.scrollContainer.nativeElement;
    this.appService.confirmOpen = this.confirmOpen;
    this.appService.scrollContainer.addEventListener("scroll", () =>
      window.dispatchEvent(new Event("scroll"))
    );
  }

  openLink(url: string) {
    window.location.href = url;
  }
}
