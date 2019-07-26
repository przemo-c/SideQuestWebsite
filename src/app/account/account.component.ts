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
  isDev: boolean;
  showAll: boolean;
  isUpdated = true;
  isUninstalled: boolean;
  githubReleases: GithubRelease[];
  constructor(
    public expanseService: ExpanseClientService,
    public appService: AppService
  ) {
    this.isDev = !!localStorage.getItem("isDeveloper");
    this.isUpdated = !!localStorage.getItem("viewIsUpdated");
    this.isUninstalled = !!localStorage.getItem("viewIsUninstalled");
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
      .then(() => this.expanseService.searchMyApps("", 0))
      .then((resp: AppListing[]) => {
        this.myApps = resp;
      })
      .then(() => this.setAppsToImport())
      .then(() => this.getInstalledApps());
  }

  getInstalledApps() {
    return this.expanseService
      .searchInstalledApps("", 0, this.isUpdated, this.isUninstalled)
      .then((resp: AppListing[]) => {
        this.myInstalledApps = resp;
        this.checkForUpdates();
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
    console.log(this.appsNeedingUpdated);
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
