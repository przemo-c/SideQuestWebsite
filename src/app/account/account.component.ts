import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { GithubRelease } from "../app-manager/app-manager.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { UploadService } from "../upload.service";
import { Subscription } from "rxjs";
export interface Review {
  details: string;
  preview_image: string;
  name: string;
  users_id: number;
  apps_id?: number;
  events_id?: number;
  spaces_id?: number;
  parent_id?: number;
  reviews_id?: number;
}
export interface MessageThreadListing {
  message: string;
  message_date: string;
  messages_id: number;
  name: string;
  preview_image: string;
  users_id: number;
  is_mine?: boolean;
}
export interface MessagePeopleListing {
  is_accepted: boolean;
  is_blocked: boolean;
  is_read: string;
  is_related: boolean;
  last_message: string;
  last_messages_id: number;
  message_date: string;
  name: string;
  preview_image: string;
  received_id: string;
  requested_id: string;
  sent_id: string;
  users_id: number;
}
export interface FriendListing {
  name: string;
  image: string;
  initiated: boolean;
  preview_image: string;
  since: string;
  users_id: number;
  users_to_users_id: number;
}
export interface AppListing {
  name: string;
  apps_id?: number;
  users_id?: number;
  app_categories_id: string;
  image_url: string;
  video_url: string;
  comfort: number;
  summary: string;
  description: string;
  apk_url: string;
  packagename: string;
  versioncode: number;
  versionname: string;
  license: string;
  website: string;
  donate_url: string;
  github_name: string;
  github_repo: string;
  github_tag: string;
  github_enabled: boolean;
  early_access: boolean;
  updated: number;
  created: number;
  supports_quest: boolean;
  supports_go: boolean;
  supports_other: boolean;
  search_tags: string;
  is_first_publish: boolean;
  active: boolean;
  deleted: boolean;
  user_name?: string;
  date_string?: string;
  show_date?: boolean;
  downloads?: number;
  views?: number;
  counters?: any;
  rating?: number;
  num_of_reviews?: number;
}
export interface EventListing {
  name: string;
  description: string;
  events_id?: number;
  spaces_id?: number;
  apps_id?: number;
  users_id?: number;
  event_name: string;
  event_description: string;
  event_repeat_type: string;
  event_repeat_amount: number;
  event_duration: number;
  start_time?: number;
  _start_time?: number;
  share_url: string;
  app_url: string;
  video_url: string;
  event_url: string;
  image: string;
  event_image: string;
  is_approved: boolean;
  date_string?: string;
  show_date?: boolean;
  rating?: number;
}
export interface SpaceListing {
  current_users: string;
  date_string?: string;
  apps_id?: number;
  description: string;
  image: string;
  name: string;
  show_date?: boolean;
  spaces_id?: number;
  updated: number;
  video_url: string;
  space_url: string;
  app_url: string;
  share_url: string;
  is_approved: boolean;
  users_id?: number;
  rating?: number;
}
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit, OnDestroy {
  @ViewChild("scrollTo", { static: false }) scrollTo;
  myApps: AppListing[] = [];
  appsNeedingUpdated: (AppListing & {
    needsUpdate?: boolean;
    current_version?: number;
    urls?: any[];
  })[] = [];
  myInstalledApps: (AppListing & {
    needsUpdate?: boolean;
    current_version?: number;
    urls?: any[];
  })[] = [];
  mySpaces: SpaceListing[] = [];
  mySubscribedSpaces: SpaceListing[] = [];
  appsToImport: any[];
  newPassword: string;
  newPassword1: string;
  searchString: string = "";
  isDev: boolean;
  showAll: boolean;
  isUpdated: boolean = false;
  isUninstalled: boolean = false;
  githubReleases: GithubRelease[];
  currentView = "basic-settings";
  linkSpaces: SpaceListing[];
  selectedSpace: SpaceListing;
  eventsType = "upcoming";
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  page = 0;
  isLoaded: boolean;
  myEvents: any[] = [];
  searchTimeout: any;
  mySubscribedEvents: any[] = [];
  default_app_urls: any[] = [];
  addNewUrlType = "APK";
  mainPage = "basic";
  addNewUrlLink: string;
  myFriends: FriendListing[];
  myRequests: FriendListing[];
  myBlocked: FriendListing[];
  myMessages: MessagePeopleListing[];
  myThreads: MessageThreadListing[];
  threadUsersId = 0;
  messageToSend = "";
  app_totals: any = {
    app_total: 0,
    app_sub_total: 0,
    event_total: 0,
    event_sub_total: 0,
    requests_total: 0,
    space_total: 0,
    space_sub_total: 0,
    friend_total: 0,
    block_total: 0
  };
  urlTypes = [
    // "APK",
    // "OBB",
    // "BeatOn Mod",
    // "Firefox Skybox",
    "Oculus Quest",
    "Oculus Go",
    "Oculus Rift",
    "Oculus GearVR",
    "Steam Page",
    "Viveport",
    "Epic Store",
    "Patreon",
    "Paypal",
    "Itch",
    "Kofi",
    "Website",
    "Github",
    "Reddit",
    "Twitch",
    "Discord",
    // "Linkedin",
    "Twitter",
    "Youtube",
    "Facebook",
    "Instagram",
    "Vimeo"
  ];
  sub: Subscription;
  messageUser;
  constructor(
    public expanseService: ExpanseClientService,
    public appService: AppService,
    public router: Router,
    public uploadService: UploadService,
    private route: ActivatedRoute
  ) {
    console.log(this.app_totals);
    this.isDev = !!localStorage.getItem("isDeveloper");
    this.isUpdated = !!localStorage.getItem("viewIsUpdated");
    this.isUninstalled = !!localStorage.getItem("viewIsUninstalled");
    this.expanseService.getUserSettings();
    this.appService.setAccountComponent(this);
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.messageUser = null;
        let users_id = Number(route.snapshot.paramMap.get("users_id"));
        if (Number.isInteger(users_id)) {
          this.threadUsersId = users_id;
        }
        let type = route.snapshot.paramMap.get("type");
        type = type || "basic-settings";
        if (type) {
          this.currentView = type;
          switch (type) {
            case "requests":
            case "blocked":
            case "friends":
              this.mainPage = "friends";
              break;
            case "messages":
              this.mainPage = "messages";
              break;
            case "message-thread":
              this.mainPage = "message-thread";
              break;
            case "subscribed-apps":
            case "apps-listings":
              this.mainPage = "apps";
              break;
            case "subscribed-events":
            case "events-listings":
              this.mainPage = "events";
              break;
            case "spaces-listings":
            case "subscribed-spaces":
              this.mainPage = "spaces";
              break;
          }

          this.page = 0;
          this.expanseService.refreshSession().then(() => this.getCurrent());
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.appService.setAccountComponent(null);
  }

  setAvatarImage() {
    this.uploadService.uploadImage(true).then((res: any) => {
      this.expanseService.currentSession.preview_image = res.path;
      let existingParts = this.expanseService.currentSession.image.split("/");
      if (existingParts.length > 1) {
        this.expanseService.savePreviewImage(
          res.fileId,
          this.expanseService.currentSession.avatar_images_id
        );
      }
    });
  }

  uploadIcon() {
    this.uploadService.uploadImage(true).then((res: any) => {
      this.expanseService.currentSession.banner_image =
        this.expanseService.cdnUrl + res.path;
      this.setBanner();
    });
  }

  addAppUrl() {
    this.expanseService
      .setUserValues([
        {
          key: "appUrl_" + this.addNewUrlType,
          value: this.addNewUrlLink
        }
      ])
      .then((res: any) => {
        this.appService.showMessage(res, "Url Added!");
        if (!res.error && res.length) {
          this.expanseService.default_app_ulrs = this.expanseService.default_app_ulrs.filter(
            url => url.provider !== this.addNewUrlType
          );
          this.expanseService.default_app_ulrs.push({
            provider: this.addNewUrlType,
            link_url: this.addNewUrlLink
          });
        }
      });
  }

  refreshShareLink() {
    return this.appService
      .refreshShareLink(
        this.expanseService,
        "u",
        this.expanseService.currentSession.users_id,
        this.expanseService.currentSession.name + " Legend on SideQuest",
        this.expanseService.currentSession.tag_line,
        this.expanseService.currentSession.banner_image ||
          this.expanseService.cdnUrl +
            this.expanseService.currentSession.preview_image,
        "https://sidequestvr.com/#/user/" +
          this.expanseService.currentSession.users_id
      )
      .then(r => (this.expanseService.currentSession.donate_url = r.url));
  }

  removeUrl(key) {
    this.expanseService.removeUserValue("appUrl_" + key).then((res: any) => {
      this.appService.showMessage(res, "Url Removed!");
      if (!res.error && res.length) {
        this.expanseService.default_app_ulrs = this.expanseService.default_app_ulrs.filter(
          url => url.provider !== key
        );
      }
    });
  }

  getDefaultSpaces() {
    this.expanseService.start().then(() =>
      this.expanseService
        .getMySpaces(0, this.searchString)
        .then(async (resp: SpaceListing[]) => {
          await this.appService.fixImages(resp);
          this.linkSpaces = resp;
        })
    );
  }

  setDev() {
    if (this.isDev) {
      localStorage.setItem("isDeveloper", "t");
    } else {
      localStorage.removeItem("isDeveloper");
    }
  }

  saveMyAppsView() {
    if (this.isUninstalled) {
      localStorage.setItem("viewIsUninstalled", "t");
    } else {
      localStorage.removeItem("viewIsUninstalled");
    }
    if (this.isUpdated) {
      localStorage.setItem("viewIsUpdated", "t");
    } else {
      localStorage.removeItem("viewIsUpdated");
    }
  }

  ngOnInit() {
    this.expanseService
      .start()
      .then(() => {
        return this.expanseService.getSpace(
          this.expanseService.currentSession.default_space
        );
      })
      .then((space: SpaceListing) => (this.selectedSpace = space))
      .then(() => this.expanseService.getUserAppTotals())
      .then(t => {
        this.app_totals = t[0];
        Object.keys(this.app_totals).forEach(
          t => (this.app_totals[t] = Number(this.app_totals[t]))
        );
      })
      .then(() => this.appService.getNotifications(this.expanseService));
  }

  setBanner() {
    this.expanseService.saveUserBannerImage(
      this.expanseService.currentSession.banner_image
    );
  }

  setPublic() {
    this.expanseService.saveUserPublicProfile(
      this.expanseService.currentSession.public_profile
    );
  }

  debounceDefaultSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.getDefaultSpaces();
    }, 750);
  }

  sendMessage() {
    this.expanseService
      .sendMessage(this.threadUsersId, this.messageToSend)
      .then(resp => {
        this.page = 0;
        this.messageToSend = "";
        this.appService.getNotifications(this.expanseService);
        this.openMessageThread(this.threadUsersId);
      });
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page = 0;
      this.getCurrent();
    }, 750);
  }

  getCurrent() {
    switch (this.currentView) {
      case "subscribed-apps":
        this.getInstalledApps();
        break;
      case "apps-listings":
        this.getAppListings();
        break;
      case "subscribed-events":
        this.getSubscribedEvents();
        break;
      case "events-listings":
        this.getEvents();
        break;
      case "spaces-listings":
        this.getSpaces();
        break;
      case "subscribed-spaces":
        this.getSubscribedSpaces();
        break;
      case "message-thread":
        this.openMessageThread(this.threadUsersId);
        break;
      case "messages":
        this.getMessages();
        break;
      case "friends":
        this.getFriends();
        break;
      case "blocked":
        this.getBlocked();
        break;
      case "requests":
        this.getRequests();
        break;
    }
  }

  getStuff(method) {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .start()
      .then(() => this.expanseService[method](this.page, this.searchString))
      .then((res: any) => {
        this.hasNoMore = !res.length;
        this.isLoading = false;
        this.isLoaded = true;
        this.page++;
        return res;
      });
  }

  getRequests() {
    return this.getStuff("getFriendRequests").then(
      (friends: FriendListing[]) =>
        (this.myRequests =
          this.page === 1 ? friends : this.myRequests.concat(friends))
    );
  }

  getBlocked() {
    return this.getStuff("getBlocked").then(
      (friends: FriendListing[]) =>
        (this.myBlocked =
          this.page === 1 ? friends : this.myBlocked.concat(friends))
    );
  }

  getFriends() {
    return this.getStuff("getFriends").then(
      (friends: FriendListing[]) =>
        (this.myFriends =
          this.page === 1 ? friends : this.myFriends.concat(friends))
    );
  }

  getMessages() {
    return this.getStuff("getMessagesPeople").then(
      (messages: MessagePeopleListing[]) => {
        this.myMessages =
          this.page === 1 ? messages : this.myMessages.concat(messages);
      }
    );
  }
  openMessageThread(users_id) {
    this.threadUsersId = users_id;
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .start()
      .then(() => this.expanseService.getUserCurrentSpace(users_id))
      .then((res: any) => {
        this.messageUser = res.name;
      })
      .then(() =>
        this.expanseService.getMessagesThread(
          users_id,
          this.page,
          this.searchString
        )
      )
      .then((res: any) => {
        this.hasNoMore = !res.length;
        this.isLoading = false;
        if (res.length) {
          res.forEach(r => {
            r.is_mine =
              Number(r.users_id) ===
              this.expanseService.currentSession.users_id;
          });
        }
        this.myThreads = this.page === 0 ? res : res.concat(this.myThreads);
        this.isLoaded = true;
        this.page++;
        this.appService.getNotifications(this.expanseService);
      });
  }

  getSubscribedSpaces() {
    return this.getStuff("searchSubscribedSpaces").then(
      (spaces: SpaceListing[]) =>
        (this.mySubscribedSpaces =
          this.page === 1 ? spaces : this.mySubscribedSpaces.concat(spaces))
    );
  }

  getSubscribedEvents() {
    return this.getStuff("searchSubscribedEvents").then(
      (events: EventListing[]) =>
        (this.mySubscribedEvents =
          this.page === 1 ? events : this.mySubscribedEvents.concat(events))
    );
  }

  setDefaultSpace() {
    this.expanseService.saveUserDefaultSpace(
      this.expanseService.currentSession.default_space
    );
  }

  getAppListings() {
    return this.getStuff("searchMyApps").then((resp: AppListing[]) => {
      if (resp.length) {
        resp.forEach(app => {
          const downlaodI = app.counters
            .filter(c => c)
            .map(c => c.type)
            .indexOf("download");
          const viewI = app.counters
            .filter(c => c)
            .map(c => c.type)
            .indexOf("view");
          app.downloads = app.views = 0;
          if (downlaodI > -1) {
            app.downloads = app.counters[downlaodI].counter;
          }
          if (viewI > -1) {
            app.views = app.counters[viewI].counter;
          }
        });
      }
      this.myApps = this.page === 1 ? resp : this.myApps.concat(resp);
    });
  }

  getSpaces() {
    return this.getStuff("getMySpaces").then(
      (spaces: SpaceListing[]) =>
        (this.mySpaces =
          this.page === 1 ? spaces : this.mySpaces.concat(spaces))
    );
  }

  getEvents() {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .getMyEvents(this.page, this.searchString, this.eventsType)
      .then((res: any) => {
        this.hasNoMore = !res.length;
        this.isLoading = false;
        this.myEvents = this.page === 0 ? res : this.myEvents.concat(res);
        this.isLoaded = true;
        this.page++;
      });
  }

  unsubscribe(apps_id) {
    this.expanseService.uninstallApp(apps_id).then(() => {
      this.page = 0;
      this.getCurrent();
    });
  }

  getInstalledApps() {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .start()
      .then(() =>
        this.expanseService.searchInstalledApps(
          this.searchString,
          this.page,
          this.isUpdated,
          this.isUninstalled
        )
      )
      .then((resp: AppListing[]) => {
        this.hasNoMore = !resp.length;
        this.isLoading = false;
        resp.forEach(a => {
          a.image_url =
            a.image_url ||
            this.expanseService.cdnUrl + "file/2717/Untitled-2.jpg";
        });
        this.myInstalledApps =
          this.page === 0 ? resp : this.myInstalledApps.concat(resp);
        this.checkForUpdates();
        //
        this.isLoaded = true;
        this.page++;
      });
  }
  async setAppsToImport() {
    this.appsToImport = Object.keys(this.appService.app_meta)
      .filter(k => this.appService.app_meta[k].vc)
      .map(k => {
        return {
          apps_id: k,
          versioncode: this.appService.app_meta[k].vc
        };
      });
    let isChanged = false;
    for (let i = 0; i < this.appsToImport.length; i++) {
      await this.expanseService.addInstalledApp(
        this.appsToImport[i].apps_id,
        this.appsToImport[i].versioncode
      );
      let meta = this.appService.app_meta[this.appsToImport[i].apps_id];
      if (meta) {
        isChanged = true;
        meta.vc = null;
      }
    }
    if (isChanged) {
      this.appService.saveAppMeta();
    }
  }
  saveNameAndEmail() {
    this.refreshShareLink()
      .then(() =>
        this.expanseService.saveUserDetails(
          this.expanseService.currentSession.name,
          this.expanseService.currentSession.email,
          this.expanseService.currentSession.tag_line,
          this.expanseService.currentSession.profile_color,
          this.expanseService.currentSession.bio,
          this.expanseService.currentSession.donate_url
        )
      )
      .then(res => this.appService.showMessage(res, "Details Saved!"));
  }

  changePassword() {
    if (this.newPassword !== this.newPassword1 || this.newPassword.length < 6) {
      this.appService.showMessage(
        {
          error: true,
          data: "Passwords must match and be at least 6 characters!!"
        },
        ""
      );
    } else {
      this.expanseService
        .saveUserPassword(this.newPassword)
        .then(res => this.appService.showMessage(res, "Password Saved!"));
    }
  }

  async updateAll() {
    if (this.appService.isAuthenticated) {
      for (let i = 0; i < this.appsNeedingUpdated.length; i++) {
        await this.expanseService.addInstalledApp(
          this.appsNeedingUpdated[i].apps_id,
          this.appsNeedingUpdated[i].versioncode
        );
      }
      this.appService.showMessage({ error: false }, "Sending to SideQuest...");
      this.getInstalledApps();
    }
  }

  async checkForUpdates() {
    for (let i = 0; i < this.myInstalledApps.length; i++) {
      const app = this.myInstalledApps[i];
      app.urls = app.urls.filter(u => u);
      app.needsUpdate = app.versioncode > app.current_version;
    }
    this.appsNeedingUpdated = this.myInstalledApps.filter(
      a =>
        a.needsUpdate &&
        !(a.app_categories_id === "4" && a.website === "BeatOn")
    );
  }

  findGitReleases(app) {
    return fetch(
      "https://api.github.com/repos/" +
        app.github_name +
        "/" +
        app.github_repo +
        "/releases"
    ).then(async r => {
      if (r.ok) {
        return r.json();
      }
    });
  }
}
