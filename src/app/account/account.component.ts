import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { GithubRelease } from "../app-manager/app-manager.component";
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
}
export interface EventListing {
  name: string;
  description: string;
  events_id?: number;
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
}
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
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
  appsToImport: any[];
  newPassword: string;
  newPassword1: string;
  searchString: string = "";
  isDev: boolean;
  showAll: boolean;
  isUpdated: boolean = false;
  isUninstalled: boolean = false;
  githubReleases: GithubRelease[];
  currentView = "subscribed-apps";
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
  addNewUrlLink: string;
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
    "Twitter",
    "Youtube",
    "Facebook",
    "Instagram",
    "Vimeo"
  ];
  constructor(
    public expanseService: ExpanseClientService,
    public appService: AppService
  ) {
    this.isDev = !!localStorage.getItem("isDeveloper");
    this.isUpdated = !!localStorage.getItem("viewIsUpdated");
    this.isUninstalled = !!localStorage.getItem("viewIsUninstalled");
    this.expanseService.getUserSettings();
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
      // .then(() => this.getAppListings())
      // .then(() => this.setAppsToImport())
      .then(() => this.getInstalledApps());
    // .then(() => this.getEvents())
    // .then(() => this.getSubscribedEvents());
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
    }
  }

  getSubscribedEvents() {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .start()
      .then(() =>
        this.expanseService.searchSubscribedEvents(this.searchString, this.page)
      )
      .then((res: any) => {
        this.hasNoMore = !res.length;
        this.isLoading = false;
        this.mySubscribedEvents =
          this.page === 0 ? res : this.mySubscribedEvents.concat(res);
        this.isLoaded = true;
        this.page++;
      });
  }

  getAppListings() {
    this.isLoading = true;
    this.hasNoMore = false;
    return this.expanseService
      .start()
      .then(() =>
        this.expanseService.searchMyApps(this.searchString, this.page)
      )
      .then((resp: AppListing[]) => {
        this.hasNoMore = !resp.length;
        this.isLoading = false;
        this.myApps = this.page === 0 ? resp : this.myApps.concat(resp);
        this.isLoaded = true;
        this.page++;
      });
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
        this.myInstalledApps =
          this.page === 0 ? resp : this.myInstalledApps.concat(resp);
        this.checkForUpdates();
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
    this.expanseService
      .saveUserDetails(
        this.expanseService.currentSession.name,
        this.expanseService.currentSession.email
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

  updateAll() {
    this.appService
      .openSidequestUrl(
        "sidequest://sideload-multi/#" +
          JSON.stringify(
            this.appsNeedingUpdated
              .reduce((a, b) => {
                a = a.concat(b.urls);
                return a;
              }, [])
              .map(a => a.link_url.trim())
          )
      )
      .then(async () => {
        for (let i = 0; i < this.appsNeedingUpdated.length; i++) {
          await this.expanseService.addInstalledApp(
            this.appsNeedingUpdated[i].apps_id,
            this.appsNeedingUpdated[i].versioncode
          );
        }
        this.getInstalledApps();
      });
  }

  async checkForUpdates() {
    for (let i = 0; i < this.myInstalledApps.length; i++) {
      const app = this.myInstalledApps[i];
      app.urls = app.urls.filter(u => u);
      if (
        app.github_enabled &&
        !app.urls.filter(u => u.provider === "Github Release").length
      ) {
        let releases = await this.findGitReleases(app);
        if (releases.message) {
          return this.appService.showMessage(
            { error: true, data: releases.message },
            ""
          );
        }
        let release = releases[0];
        if (app.github_tag !== "[ all ]" && app.github_tag !== "[ latest ]") {
          releases.forEach(rel => {
            if (rel.tag_name === app.github_tag) {
              release = rel;
            }
          });
        }
        app.versioncode = release.id;
        app.urls = app.urls.concat(
          release.assets
            .filter((asset: any) => {
              return (
                ["apk", "obb"].indexOf(
                  asset.name
                    .split(".")
                    .pop()
                    .toLowerCase()
                ) > -1
              );
            })
            .map(asset => {
              return {
                link_url: asset.browser_download_url,
                provider: asset.name
                  .split(".")
                  .pop()
                  .toUpperCase()
              };
            })
        );
      }
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
