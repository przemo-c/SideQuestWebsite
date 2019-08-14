import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { Lightbox } from "ngx-lightbox";
import { AppCounter, VideObject } from "../app-manager/app-manager.component";
import { Subscription } from "rxjs";
import { SpaceListing } from "../account/account.component";
import * as urlParser from "../../../node_modules/js-video-url-parser/lib/base";

@Component({
  selector: "app-space-listing",
  templateUrl: "./space-listing.component.html",
  styleUrls: ["./space-listing.component.css"]
})
export class SpaceListingComponent implements OnInit, OnDestroy {
  currentApp: SpaceListing = {
    name: "",
    description: "",
    image: "",
    current_users: "0",
    updated: 0,
    video_url: "",
    space_url: "",
    app_url: "",
    share_url: "",
    is_approved: false
  };
  spaces_id: number;
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
  space_meta: any;
  mySubscription: any;
  futureEvents: any[];
  loading = true;
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
        this.spaces_id = Number(route.snapshot.paramMap.get("spaces_id"));
        if (!Number.isInteger(this.spaces_id)) {
          this.spaces_id = null;
        } else {
          this.service.getSpaceMeta(this.spaces_id);
          this.space_meta = this.service.space_meta[this.spaces_id];
          this.setupSpace()
            .then(() => this.viewSpace())
            .then(() => {
              // this.currentApp._start_time = this.currentApp.start_time;
              // if (start_time && Number.isInteger(start_time)) {
              //   this.currentApp.start_time = start_time;
              // }
              this.isMine =
                this.service.isAuthenticated &&
                Number(this.currentApp.users_id) ===
                  Number(this.expanseService.currentSession.users_id);
              this.loading = false;
            })
            .then(() => this.getMySubscription());
        }
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMySubscription() {
    if (this.currentApp && this.spaces_id) {
      return this.expanseService
        .searchSubscribedSpaces("", 0, this.spaces_id)
        .then((res: any) => {
          if (res.length) {
            this.mySubscription = res[0];
          } else {
            this.mySubscription = null;
          }
        });
    }
  }

  unsubscribe() {
    if (this.mySubscription) {
      this.expanseService
        .unsubscribeSpace(this.spaces_id)
        .then(() =>
          this.service.showMessage({}, "Unsubscribed from this event!!")
        )
        .then(() => this.getMySubscription());
    }
  }

  attendingCount() {
    if (!this.space_meta.a) {
      return this.expanseService
        .eventCount("attending", this.spaces_id)
        .then((res: any) => {
          if (!res.error) {
            this.service.space_meta[this.spaces_id].a = 1;
            this.counters.a++;
            this.service.saveAppMeta();
          }
        });
    }
    this.service.showMessage({}, "Subscribed!");
    if (!this.mySubscription) {
      this.expanseService
        .subscribeSpace(this.spaces_id)
        .then(() => this.getMySubscription());
    }
  }

  viewSpace() {
    if (!this.space_meta.v) {
      return this.expanseService
        .spaceCount("view", this.spaces_id)
        .then((res: any) => {
          if (!res.error) {
            this.service.space_meta[this.spaces_id].v = 1;
            this.counters.v++;
            this.service.saveAppMeta();
          }
        });
    }
  }

  likeSpace() {
    if (!this.space_meta.l) {
      return this.expanseService
        .spaceCount("like", this.spaces_id)
        .then((res: any) => {
          this.service.showMessage(res, "Event Liked!");
          if (!res.error) {
            this.service.space_meta[this.spaces_id].l = 1;
            this.counters.l++;
            this.service.saveAppMeta();
          }
        });
    } else {
      this.service.showMessage({}, "You already liked that!");
    }
  }

  copyShareUrl(isRefresh?) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.currentApp.share_url).then(
        () => {
          this.service.showMessage(
            { error: false },
            "Share URL Copied to clipboard!"
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

  async setupSpace() {
    if (this.spaces_id) {
      const events = (await this.expanseService.start().then(() => {
        return this.expanseService.getSpace(this.spaces_id);
      })) as SpaceListing;
      if (!events) {
        this.spaces_id = null;
        this.is_not_found = true;
      } else {
        this.currentApp = events;
        const counters = (await this.expanseService.getSpaceTotals(
          this.spaces_id
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
        if (this.currentApp.video_url) {
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
}
