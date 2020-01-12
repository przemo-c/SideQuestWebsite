import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ExpanseClientService } from "../expanse-client.service";
import { AppUrl } from "../app-manager/app-manager.component";
import { UrlIcons } from "../app-listing/app-listing.component";
import {
  AppListing,
  EventListing,
  SpaceListing
} from "../account/account.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  urlIcons: UrlIcons = new UrlIcons();
  currentUser: any = {};
  sub: Subscription;
  donate_urls: AppUrl[];
  social_urls: AppUrl[];
  website_url: AppUrl[];
  users_id: number;
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  isLoaded: boolean;
  mainPage: string = "basic";
  eventsType = "upcoming";
  searchString: string;
  popularApps: AppListing[] = [];
  popularEvents: EventListing[] = [];
  popularSpaces: SpaceListing[] = [];
  userApps: AppListing[];
  userSpaces: SpaceListing[];
  userEvents: EventListing[];
  selectedSpace: SpaceListing;
  searchTimeout: any;
  related: any;
  app_totals: any = {
    app_total: 0,
    event_total: 0,
    space_total: 0,
    friend_total: 0
  };
  actionString = "add this sidekick";
  page: 0;
  reportType = "1";
  reportDetails = "";
  isProfileColor: boolean;
  add_users_id: number;
  constructor(
    public appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    public expanseService: ExpanseClientService
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  init() {
    this.users_id = Number(this.route.snapshot.paramMap.get("users_id"));
    console.log(this.users_id);
    if (!Number.isInteger(this.users_id)) {
      this.users_id = null;
      return Promise.resolve();
    } else {
      this.isLoading = true;
      return this.expanseService
        .start()
        .then(() => this.expanseService.viewUser(this.users_id))
        .then((res: any) => {
          if (res.length) {
            this.currentUser = res[0];
            this.isProfileColor = this.currentUser.profile_color === "golden";
            this.isLoading = false;
            return this.expanseService.getUserSettings(this.users_id);
          } else {
            if (
              this.appService.isAuthenticated &&
              this.expanseService.currentSession.users_id !== this.users_id
            ) {
              this.add_users_id = this.users_id;
            }
            this.currentUser = {};
            this.isLoading = false;
            this.users_id = null;
          }
        })
        .then(app_urls => {
          app_urls = app_urls || [];
          const sort = (a, b) =>
            a.provider > b.provider ? 1 : b.provider > a.provider ? -1 : 0;
          this.donate_urls = app_urls.filter(
            (url: AppUrl) =>
              ["Patreon", "Paypal", "Itch", "Kofi"].indexOf(url.provider) > -1
          );
          this.donate_urls.sort(sort);
          this.social_urls = app_urls.filter(
            (url: AppUrl) =>
              [
                "Discord",
                "Twitter",
                "Youtube",
                "Facebook",
                "Instagram",
                "Github",
                "Reddit",
                "Twitch",
                "Vimeo"
              ].indexOf(url.provider) > -1
          );
          this.social_urls.sort(sort);
          this.website_url = app_urls.filter(
            (url: AppUrl) => url.provider === "Website"
          );
        })
        .then(() => this.expanseService.getUserAppTotals(this.users_id))
        .then(t => {
          this.app_totals = t[0];
        })
        .then(() => {
          return this.expanseService.getSpace(this.currentUser.default_space);
        })
        .then((space: SpaceListing) => {
          this.selectedSpace = space;
        })
        .then(() => {
          if (
            this.appService.isAuthenticated &&
            this.expanseService.currentSession.users_id !== this.users_id
          ) {
            return this.expanseService
              .getRelated(this.users_id || this.add_users_id)
              .then(related => {
                return (this.related = related);
              });
          }
        });
    }
  }

  setProfileColor() {
    this.expanseService.setProfileColor(
      this.users_id,
      this.isProfileColor ? "golden" : ""
    );
  }

  getPopularApps() {
    return this.expanseService
      .start()
      .then(() =>
        this.expanseService.searchApps(
          "",
          0,
          "rating",
          "desc",
          null,
          null,
          this.users_id,
          6
        )
      )
      .then(async (resp: AppListing[]) => {
        this.appService.fixImages(resp);
        this.popularApps = resp;
      });
  }

  openUrl(link: string) {
    window.location.href = link;
  }

  confirmActionGo() {
    let promise = Promise.resolve({});
    switch (this.actionString) {
      case "add this sidekick":
        promise = this.expanseService.addFriend(
          this.users_id || this.add_users_id
        );
        break;
      case "accept this sidekick request":
        promise = this.expanseService.acceptFriendRequest(
          this.users_id || this.add_users_id
        );
        break;
      case "cancel this sidekick request":
      case "reject this sidekick request":
        promise = this.expanseService.rejectFriendRequest(
          this.users_id || this.add_users_id
        );
        break;
      case "remove this sidekick":
        promise = this.expanseService.removeFriend(
          this.users_id || this.add_users_id
        );
        break;
      case "block this sidekick":
        console.log("blocking");
        promise = this.expanseService.blockUser(
          this.users_id || this.add_users_id,
          1
        );
        break;
      case "unblock this sidekick":
        promise = this.expanseService.unBlockUser(
          this.users_id || this.add_users_id
        );
        break;
      case "report this sidekick":
        promise = this.expanseService
          .reportUser(
            this.users_id || this.add_users_id,
            this.reportType,
            this.reportDetails
          )
          .then((res: any) => {
            if (res.length) {
              return fetch(
                "https://shanesedit.org:5678/new_report/" +
                  res[0].user_reports_id
              );
            }
          });
        this.reportDetails = "";
        this.reportType = "1";
        break;
    }
    return promise
      .then(res => {
        this.isLoading = true;
        return this.expanseService.getRelated(
          this.users_id || this.add_users_id
        );
      })
      .then(related => {
        this.related = related;
        return this.init()
          .then(() => this.initUser())
          .then(() => {
            this.isLoading = false;
          });
      })
      .catch(e => console.log(e));
  }

  backClicked() {
    (window as any).history.back();
  }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    return this.getPopularApps()
      .then(() => {
        this.page = 0;
      })
      .then(() => this.getEvents())
      .then(() => {
        this.page = 0;
      })
      .then(() => this.getSpaces())
      .then(() => {
        this.page = 0;
      })
      .then(() => (this.popularEvents = this.userEvents.slice(0, 6)))
      .then(() => (this.popularSpaces = this.userSpaces.slice(0, 6)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page = 0;
      this.getCurrent();
    }, 750);
  }

  getCurrent() {
    switch (this.mainPage) {
      case "apps":
        this.getApps();
        break;
      case "events":
        this.getEvents();
        break;
      case "spaces":
        this.getSpaces();
        break;
    }
  }

  getApps() {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .start()
      .then(() =>
        this.expanseService.searchApps(
          this.searchString,
          this.page,
          "name",
          "desc",
          null,
          null,
          this.users_id
        )
      )
      .then((resp: AppListing[]) => {
        this.hasNoMore = !resp.length;
        this.isLoading = false;
        this.userApps = this.page === 0 ? resp : this.userApps.concat(resp);
        this.isLoaded = true;
        this.page++;
      });
  }

  getSpaces() {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .getSpaces(this.page, this.searchString, this.users_id)
      .then((res: any) => {
        this.hasNoMore = !res.length;
        this.isLoading = false;
        this.userSpaces = this.page === 0 ? res : this.userSpaces.concat(res);
        this.isLoaded = true;
        this.page++;
      });
  }

  getEvents(type?) {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .getEvents(
        this.page,
        this.searchString,
        type || this.eventsType,
        this.users_id
      )
      .then((res: any) => {
        this.hasNoMore = !res.length;
        this.isLoading = false;
        this.userEvents = this.page === 0 ? res : this.userEvents.concat(res);
        this.isLoaded = true;
        this.page++;
      });
  }
}
