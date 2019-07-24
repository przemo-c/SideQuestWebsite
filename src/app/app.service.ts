import { Injectable } from "@angular/core";
import { MzToastService } from "ngx-materialize";

@Injectable({
  providedIn: "root"
})
export class AppService {
  hideLogo: boolean;
  scrollContainer: HTMLElement;
  isAuthenticated: boolean;
  currentUrl: string;
  app_meta: any;
  app_index: any;
  constructor(private toastService: MzToastService) {
    const userAgent = (navigator as any).userAgent.toLowerCase();
    if (userAgent.indexOf(" electron/") > -1) {
      this.hideLogo = true;
    }
    this.loadAppIndex();
    this.loadAppMeta();
    // (window as any).sideQuestRemove = (pkg) => {
    //   let isChanged = false;
    //   Object.keys(this.app_index).forEach(apps_id =>{
    //     if (this.app_index[apps_id] === pkg && this.app_meta[apps_id]) {
    //       delete this.app_meta[apps_id];
    //       console.log('Removing App Meta: ', pkg, apps_id);
    //       isChanged = true;
    //     }
    //   });
    //   if (isChanged) {
    //     this.saveAppMeta();
    //   }
    // };
    // this.checkForUpdates();
    window.addEventListener(
      "dragover",
      (e: any) => {
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      (e: any) => {
        e.preventDefault();
      },
      false
    );
  }
  getNews(page: number = 0, filter: string = "none") {
    return fetch(
      "https://shanesedit.org:5678/news_feed/" + page + "/" + filter
    ).then(r => r.json());
  }

  logout(expanseService) {
    localStorage.removeItem("session" + expanseService.storageKey);
    expanseService.currentSession = null;
    this.isAuthenticated = false;
  }

  showMessage(res: any, message: string) {
    if (res.error) {
      this.toastService.show(res.data, 10000, "orange", () => {});
    } else {
      this.toastService.show(message, 3000, "green", () => {});
    }
  }

  getAppMeta(apps_id) {
    if (!this.app_meta[apps_id]) {
      this.app_meta[apps_id] = {
        v: 0,
        d: 0,
        l: 0,
        vc: null
      };
    }
    return this.app_meta[apps_id];
  }

  loadAppIndex() {
    let app_meta = localStorage.getItem("app_index");
    if (!app_meta) {
      this.defaultAppIndex();
    } else {
      try {
        this.app_index = JSON.parse(app_meta);
      } catch (e) {
        this.defaultAppIndex();
      }
    }
  }

  defaultAppIndex() {
    this.app_index = {};
    this.saveAppMeta();
  }

  loadAppMeta() {
    let app_meta = localStorage.getItem("app_meta");
    if (!app_meta) {
      this.defaultAppMeta();
    } else {
      try {
        this.app_meta = JSON.parse(app_meta);
      } catch (e) {
        this.defaultAppMeta();
      }
    }
  }

  defaultAppMeta() {
    this.app_meta = {};
    this.saveAppMeta();
  }

  saveAppMeta() {
    localStorage.setItem("app_meta", JSON.stringify(this.app_meta));
    localStorage.setItem("app_index", JSON.stringify(this.app_index));
  }

  checkForUpdates() {
    const installed = Object.keys(this.app_meta)
      .filter(apps_id => this.app_meta[apps_id].vc)
      .map(apps_id => ({
        apps_id,
        packagename: this.app_index[apps_id],
        versioncode: this.app_meta[apps_id].vc
      }));
    console.log(installed);
  }

  removeUninstalledMeta() {
    const sideQuest = (window as any).sideQuest;
    if (sideQuest) {
      let cachedPackages = Object.keys(this.app_index).map(key => ({
        apps_id: key,
        packagename: this.app_index[key]
      }));
      let isChanged = false;
      cachedPackages.forEach(app => {
        if (
          sideQuest.installed.indexOf(app.packagename) === -1 &&
          this.app_meta[app.apps_id]
        ) {
          console.log("Removing App Meta: ", app.packagename, app.apps_id);
          delete this.app_meta[app.apps_id];
          isChanged = true;
        }
      });
      if (isChanged) {
        this.saveAppMeta();
      }
    }
  }
}
