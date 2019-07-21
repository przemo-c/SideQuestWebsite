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
    this.checkForUpdates();
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
        packagename: this.app_index[this.app_meta],
        versioncode: this.app_meta[this.app_meta].vc
      }));
    console.log(installed);
  }
}
