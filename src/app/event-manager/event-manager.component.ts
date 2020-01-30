import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ExpanseClientService } from "../expanse-client.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { UploadService } from "../upload.service";
import { AppService } from "../app.service";
import {
  AppListing,
  EventListing,
  SpaceListing
} from "../account/account.component";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { VideObject } from "../app-manager/app-manager.component";
import * as urlParser from "../../../node_modules/js-video-url-parser/lib/base";

@Component({
  selector: "app-event-manager",
  templateUrl: "./event-manager.component.html",
  styleUrls: ["./event-manager.component.css"]
})
export class EventManagerComponent implements OnInit, OnDestroy {
  currentApp: EventListing = {
    name: "",
    description: "",
    event_name: "",
    event_description: "",
    image: "",
    event_image: "",
    event_repeat_type: "daily",
    event_repeat_amount: 4,
    event_duration: 60 * 60,
    event_url: "",
    share_url: "",
    video_url: "",
    app_url: "",
    is_approved: false
  };
  selectedDate = {
    start: moment(), // new Date(new Date().getTime() - (1000 * 3600 * 24 * 7)),
    end: null
  };
  selectedTime = 1080;
  sub: Subscription;
  events_id: string;
  videoObject: VideObject;
  videoUrl: SafeUrl;
  is_not_found: boolean;
  loading = true;
  linkType = "app";
  searchString: string;
  searchTimeout: any;
  linkApps: AppListing[];
  linkSpaces: SpaceListing[];
  selectedSpace: SpaceListing;
  selectedApp: AppListing;
  constructor(
    private router: Router,
    private service: AppService,
    private expanseService: ExpanseClientService,
    private sanitizer: DomSanitizer,
    route: ActivatedRoute,
    public uploadService: UploadService
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.events_id = route.snapshot.paramMap.get("events_id");
        if (this.events_id) {
          let event: any = await this.expanseService
            .start()
            .then(() => this.expanseService.getEvent(this.events_id));
          let date = new Date(+event.start_time * 1000);
          date.setHours(0, 0, 0, 0);
          this.selectedTime =
            (+event.start_time - Math.floor(date.getTime() / 1000)) / 60;
          this.selectedDate = {
            start: moment(date),
            end: null
          };
          this.currentApp.name = event.name;
          this.currentApp.description = event.description;
          this.currentApp.event_name = event.event_name;
          this.currentApp.event_description = event.event_description;
          this.currentApp.image = event.image;
          this.currentApp.event_image = event.event_image;
          this.currentApp.video_url = event.video_url;
          this.currentApp.event_repeat_type = event.event_repeat_type;
          this.currentApp.event_repeat_amount = event.event_repeat_amount;
          this.currentApp.event_duration = event.event_duration;
          this.currentApp.event_url = event.event_url;
          this.currentApp.app_url = event.app_url;
          this.currentApp.share_url = event.share_url;
          this.currentApp.is_approved = event.is_approved;
          this.currentApp.apps_id = event.apps_id;
          this.currentApp.spaces_id = event.spaces_id;
          this.onVideoChange();
          if (this.currentApp.apps_id) {
            await this.expanseService
              .getApp(this.currentApp.apps_id)
              .then(app => (this.selectedApp = app[0]));
          }
          if (this.currentApp.spaces_id) {
            await this.expanseService
              .getSpace(this.currentApp.spaces_id)
              .then((space: SpaceListing) => (this.selectedSpace = space));
          }
          this.loading = false;
        } else {
          this.loading = false;
        }
      }
    });
  }

  ngOnInit() {}

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.getItems();
    }, 750);
  }

  getItems() {
    if (this.linkType === "app") {
      this.getApps();
    } else {
      this.getSpaces();
    }
  }

  getApps() {
    this.expanseService.start().then(() =>
      this.expanseService
        .searchMyApps(this.searchString, 0)
        .then(async (resp: AppListing[]) => {
          await this.service.fixImages(resp);
          this.linkApps = resp;
        })
    );
  }

  getSpaces() {
    this.expanseService.start().then(() =>
      this.expanseService
        .getMySpaces(0, this.searchString)
        .then(async (resp: SpaceListing[]) => {
          await this.service.fixImages(resp);
          this.linkSpaces = resp;
        })
    );
  }

  customCss() {
    return "black-text";
  }

  resetRepeat() {
    if (this.currentApp.event_repeat_type === "oneoff") {
      this.currentApp.event_repeat_amount = 0;
    } else {
      this.currentApp.event_repeat_amount = 1;
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  uploadIcon() {
    this.uploadService.uploadImage(true).then((res: any) => {
      this.currentApp.event_image = this.expanseService.cdnUrl + res.path;
    });
  }

  onVideoChange() {
    this.videoObject = urlParser.parse(this.currentApp.video_url || "");
    if (this.videoObject) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.videoObject.provider === "youtube"
          ? "https://www.youtube.com/embed/" + this.videoObject.id
          : "https://player.vimeo.com/video/" +
              this.videoObject.id +
              "?byline=0&portrait=0"
      );
    }
  }

  refreshShareLink() {
    return fetch(
      "https://sdq.st/delete-link/" +
        this.expanseService.currentSession.token +
        "/e-" +
        this.events_id,
      {
        method: "GET",
        cache: "no-cache"
      }
    )
      .then(() =>
        fetch(
          "https://sdq.st/get-link/" + this.expanseService.currentSession.token,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title:
                (this.currentApp.event_name || this.currentApp.name) +
                "on Sidequest",
              description:
                this.currentApp.event_description ||
                this.currentApp.description,
              image: this.currentApp.event_image || this.currentApp.image,
              name: "e-" + this.events_id,
              external: "https://sidequestvr.com/#/event/" + this.events_id
            })
          }
        )
      )
      .then(r => r.json())
      .then(r => (this.currentApp.share_url = r.url));
  }

  saveEvent() {
    const dateSelected = this.selectedDate.start.toDate();
    dateSelected.setHours(0, 0, 0, 0);
    const start_time =
      Math.floor(dateSelected.getTime() / 1000) + this.selectedTime * 60;
    if (this.events_id) {
      this.refreshShareLink()
        .then(() => this.expanseService.start())
        .then(() =>
          this.expanseService.updateEvent({
            spaces_id: this.currentApp.spaces_id,
            apps_id: this.currentApp.apps_id,
            start_time: start_time,
            event_duration: this.currentApp.event_duration,
            events_id: this.events_id,
            event_name: this.currentApp.event_name,
            event_description: this.currentApp.event_description,
            event_url: this.currentApp.event_url,
            video_url: this.currentApp.video_url,
            event_image: this.currentApp.event_image,
            app_url: this.currentApp.app_url,
            share_url: this.currentApp.share_url,
            event_repeat_amount: this.currentApp.event_repeat_amount,
            event_repeat_type: this.currentApp.event_repeat_type
          })
        )
        .then(res => {
          this.service.showMessage(res, "Event Saved!");
          if (!this.currentApp.is_approved) {
            this.sendForApproval(this.events_id);
          }
        });
    } else {
      this.expanseService
        .start()
        .then(() =>
          this.expanseService.createEvent({
            spaces_id: this.currentApp.spaces_id,
            apps_id: this.currentApp.apps_id,
            start_time: start_time,
            event_duration: this.currentApp.event_duration,
            event_name: this.currentApp.event_name,
            event_description: this.currentApp.event_description,
            event_url: this.currentApp.event_url,
            video_url: this.currentApp.video_url,
            event_image: this.currentApp.event_image,
            app_url: this.currentApp.app_url,
            share_url: this.currentApp.share_url,
            event_repeat_amount: this.currentApp.event_repeat_amount,
            event_repeat_type: this.currentApp.event_repeat_type
          })
        )
        .then((res: any) => {
          this.service.showMessage(res, "Event Saved!");
          if (!res.error && res.length) {
            this.refreshShareLink();
            this.sendForApproval(res[0].events_id).then(() =>
              this.router.navigateByUrl("/my-event/" + res[0].events_id)
            );
          }
        });
    }
  }

  sendForApproval(events_id) {
    return fetch(this.expanseService.discordURl + "/new_event/" + events_id);
  }

  deleteEvent() {
    this.expanseService.deleteEvent(this.events_id).then(() => {
      return this.router.navigateByUrl("/account");
    });
  }

  copyUrl(url) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => {
          this.service.showMessage(
            { error: false },
            "URL Copied to clipboard!"
          );
        },
        err => {
          this.service.showMessage(
            { error: true, data: "Cant copy share url!" },
            ""
          );
        }
      );
    }
  }
}
