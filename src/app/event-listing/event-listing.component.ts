import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppListing, EventListing } from "../account/account.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ExpanseClientService } from "../expanse-client.service";
import * as urlParser from "../../../node_modules/js-video-url-parser/lib/base";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { AppService } from "../app.service";
import { Lightbox } from "ngx-lightbox";
import {
  AppCounter,
  AppUrl,
  ScreenShot,
  VideObject
} from "../app-manager/app-manager.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-event-listing",
  templateUrl: "./event-listing.component.html",
  styleUrls: ["./event-listing.component.css"]
})
export class EventListingComponent implements OnInit, OnDestroy {
  currentApp: EventListing = {
    name: "",
    description: "",
    event_name: "",
    event_description: "",
    image: "",
    event_image: "",
    event_repeat_type: "oneoff",
    event_repeat_amount: 4,
    event_duration: 60 * 60,
    start_time: 0,
    event_url: "",
    share_url: "",
    video_url: "",
    app_url: "",
    is_approved: false
  };
  events_id: number;
  is_not_found: boolean;
  isMine: boolean;
  videoUrl: SafeUrl;
  counters = {
    l: 0,
    v: 0,
    a: 0
  };
  stats = {
    view: 0,
    like: 0,
    attending: 0
  };
  videoObject: VideObject;
  sub: Subscription;
  event_meta: any;
  constructor(
    private router: Router,
    public service: AppService,
    private expanseService: ExpanseClientService,
    route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public lightbox: Lightbox
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.events_id = Number(route.snapshot.paramMap.get("events_id"));
        if (!Number.isInteger(this.events_id)) {
          this.events_id = null;
        } else {
          this.service.getEventMeta(this.events_id);
          this.event_meta = this.service.event_meta[this.events_id];
          this.setupEvent()
            .then(() => this.viewEvent())
            .then(() => {
              this.isMine =
                this.service.isAuthenticated &&
                Number(this.currentApp.users_id) ===
                  Number(this.expanseService.currentSession.users_id);
            });
        }
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  attendingCount() {
    if (!this.event_meta.a) {
      return this.expanseService
        .eventCount("attending", this.events_id)
        .then((res: any) => {
          if (!res.error) {
            this.service.event_meta[this.events_id].a = 1;
            this.counters.a++;
            this.service.saveAppMeta();
          }
        });
    } else {
      this.service.showMessage({}, "You're already attending that!");
    }
  }

  viewEvent() {
    if (!this.event_meta.v) {
      return this.expanseService
        .eventCount("view", this.events_id)
        .then((res: any) => {
          if (!res.error) {
            this.service.event_meta[this.events_id].v = 1;
            this.counters.v++;
            this.service.saveAppMeta();
          }
        });
    }
  }

  likeEvent() {
    if (!this.event_meta.l) {
      return this.expanseService
        .appCount("like", this.events_id)
        .then((res: any) => {
          this.service.showMessage(res, "Event Liked!");
          if (!res.error) {
            this.service.event_meta[this.events_id].l = 1;
            this.counters.l++;
            this.service.saveAppMeta();
          }
        });
    } else {
      this.service.showMessage({}, "You already liked that!");
    }
  }

  async setupEvent() {
    if (this.events_id) {
      const events = (await this.expanseService.start().then(() => {
        return this.expanseService.getEvent(this.events_id);
      })) as EventListing;
      if (!events) {
        this.events_id = null;
        this.is_not_found = true;
      } else {
        this.currentApp = events;
        const counters = (await this.expanseService.getEventTotals(
          this.events_id
        )) as AppCounter[];
        counters.forEach(counter => {
          switch (counter.type) {
            case "view":
              this.counters.v = counter.counter;
              break;
            case "attending":
              this.counters.a = counter.counter;
              break;
            case "like":
              this.counters.l = counter.counter;
              break;
          }
        });
        this.videoObject = urlParser.parse(this.currentApp.video_url);
        if (this.videoObject) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.videoObject.provider === "youtube"
              ? "https://www.youtube.com/embed/" + this.videoObject.id
              : "https://player.vimeo.com/video/" +
                  this.videoObject.id +
                  "?byline=0&portrait=0&transparent=0"
          );
        }
      }
    }
  }
}
