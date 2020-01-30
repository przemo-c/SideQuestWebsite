import { Injectable } from "@angular/core";
import { MzModalComponent, MzToastService } from "ngx-materialize";
import { ExpanseClientService } from "./expanse-client.service";
import { Observable } from "rxjs";
import { AccountComponent } from "./account/account.component";

@Injectable({
  providedIn: "root"
})
export class AppService {
  hideLogo: boolean;
  scrollContainer: HTMLElement;
  isAuthenticated: boolean;
  currentUrl: string;
  space_meta: any;
  event_meta: any;
  app_meta: any;
  app_index: any;
  sidequestResolve: any;
  sidequestReject: any;
  sidequestUrl: string;
  urlTimeout: any;
  urlTimeoutValue: number;
  confirmOpen: MzModalComponent;
  isGrid: boolean = true;
  isTimeline: boolean = false;
  accountComponent: AccountComponent;
  notifications: any = { friend_requests: [], unread_messages: [] };
  isMobile: boolean;
  isMobileLarge: boolean;
  public readonly siteKey = "6LfrRrcUAAAAAE00oWA60iMK5AeM7luMlKWevTlY";
  public badge: "bottomright" | "bottomleft" | "inline" = "inline";
  public type: "image" | "audio" = "image";
  public theme: "light" | "dark" = "dark";
  constructor(private toastService: MzToastService) {
    const userAgent = (navigator as any).userAgent.toLowerCase();
    if (userAgent.indexOf(" electron/") > -1) {
      this.hideLogo = true;
    }
    this.isMobile = window.innerWidth < 1500;
    this.isMobileLarge = window.innerWidth < 900;
    this.loadAppIndex();
    this.loadAppMeta();
    this.saveAppMeta();
    this.setupWindowEvents();
    const isGrid = localStorage.getItem("isGrid");
    if (isGrid) {
      this.isGrid = isGrid === "true";
    }
    const isTimeline = localStorage.getItem("isTimeline");
    if (isTimeline) {
      this.isTimeline = isTimeline === "true";
    }
  }
  setAccountComponent(accountComponent: AccountComponent) {
    this.accountComponent = accountComponent;
  }

  getNotifications(expanseService: ExpanseClientService) {
    expanseService
      .start()
      .then(() => expanseService.getNotifications())
      .then(notifications => (this.notifications = notifications));
  }

  scrollToTop() {
    this.scrollTo(0);
  }

  scrollTo(pos) {
    document.body.scrollTo(0, pos);
  }

  remoteInstall(data) {
    let customUrl;
    if (data.app_urls.length) {
      let _apps = JSON.stringify(data.app_urls.map(l => l.link_url.trim()));
      if (data.app_categories_id === "4" && data.website === "FirefoxSkybox") {
        customUrl = "sidequest://firefox-skybox/#" + _apps;
      } else if (
        data.app_categories_id === "4" &&
        data.website === "SynthRiders"
      ) {
        customUrl = "sidequest://synthriders-multi/#" + _apps;
      } else if (data.app_categories_id === "4" && data.website === "BeatOn") {
        customUrl = "sidequest://bsaber-multi/#" + _apps;
      } else {
        customUrl = "sidequest://sideload-multi/#" + _apps;
      }
      if (customUrl) {
        this.openSidequestUrl(customUrl);
      }
    }
  }

  async fixImages(result) {
    const items = result && result.length ? result : [];
    await Promise.all(
      items.map(async d => {
        const img = new Image();
        let notLoaded = false;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = d.image_url || d.event_image || d.image;
        }).catch(e => {
          d.image_url = null;
          d.event_image = null;
          d.image = null;
          notLoaded = true;
        });
      })
    );
  }

  saveGrid() {
    localStorage.setItem("isGrid", this.isGrid.toString());
    localStorage.setItem("isTimeline", this.isTimeline.toString());
  }

  setupWindowEvents() {
    // window.addEventListener(
    //   "dragover",
    //   (e: any) => {
    //     e.preventDefault();
    //   },
    //   false
    // );
    // window.addEventListener(
    //   "drop",
    //   (e: any) => {
    //     e.preventDefault();
    //   },
    //   false
    // );
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

  getSpaceMeta(spaces_id) {
    if (!this.space_meta[spaces_id]) {
      this.space_meta[spaces_id] = {
        v: 0,
        ct: 0,
        a: 0,
        l: 0
      };
    }
    return this.space_meta[spaces_id];
  }

  getEventMeta(events_id) {
    if (!this.event_meta[events_id]) {
      this.event_meta[events_id] = {
        v: 0,
        ct: 0,
        a: 0,
        l: 0
      };
    }
    return this.event_meta[events_id];
  }

  getAppMeta(apps_id) {
    if (!this.app_meta[apps_id]) {
      this.app_meta[apps_id] = {
        v: 0,
        ct: 0,
        d: 0,
        l: 0,
        vc: null
      };
    }
    return this.app_meta[apps_id];
  }

  loadAppIndex() {
    let app_index = localStorage.getItem("app_index");
    if (!app_index) {
      this.defaultAppIndex();
    } else {
      try {
        this.app_index = JSON.parse(app_index);
      } catch (e) {
        this.defaultAppIndex();
      }
    }
  }

  defaultAppIndex() {
    this.app_index = {};
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
    let event_meta = localStorage.getItem("event_meta");
    if (!event_meta) {
      this.defaultEventMeta();
    } else {
      try {
        this.event_meta = JSON.parse(event_meta);
      } catch (e) {
        this.defaultEventMeta();
      }
    }
    let space_meta = localStorage.getItem("space_meta");
    if (!space_meta) {
      this.defaultSpaceMeta();
    } else {
      try {
        this.space_meta = JSON.parse(space_meta);
      } catch (e) {
        this.defaultSpaceMeta();
      }
    }
  }

  defaultAppMeta() {
    this.app_meta = {};
  }

  defaultEventMeta() {
    this.event_meta = {};
  }

  defaultSpaceMeta() {
    this.space_meta = {};
  }

  saveAppMeta() {
    localStorage.setItem("space_meta", JSON.stringify(this.space_meta));
    localStorage.setItem("event_meta", JSON.stringify(this.event_meta));
    localStorage.setItem("app_meta", JSON.stringify(this.app_meta));
    localStorage.setItem("app_index", JSON.stringify(this.app_index));
  }

  retrySidequestUrl() {
    if (this.sidequestUrl) {
      (window as any).location = this.sidequestUrl;
    }
  }

  cancelSidequestUrl() {
    this.clearUrlTimeout();
    if (this.sidequestReject) {
      this.sidequestReject();
    }
  }

  confirmSidequestUrl() {
    this.clearUrlTimeout();
    if (this.sidequestResolve) {
      this.sidequestResolve();
    }
  }

  clearUrlTimeout() {
    clearTimeout(this.urlTimeout);
    this.urlTimeoutValue = 0;
  }

  startUrlTimer() {
    this.urlTimeout = setTimeout(() => {
      this.urlTimeoutValue--;
      if (this.urlTimeoutValue > 0) {
        this.startUrlTimer();
      } else {
        this.confirmOpen.closeModal();
        this.confirmSidequestUrl();
      }
    }, 1000);
  }

  openLink(url: string) {
    window.location.href = url;
  }
  openSidequestUrl(url) {
    this.sidequestUrl = url;
    this.retrySidequestUrl();
    if (this.hideLogo) {
      return Promise.resolve();
    }
    this.urlTimeoutValue = 30;
    this.startUrlTimer();
    this.confirmOpen.openModal();
    return new Promise<void>((resolve, reject) => {
      this.sidequestResolve = resolve;
      this.sidequestReject = reject;
    });
  }

  copyUrl(url) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => {
          this.showMessage({ error: false }, "Copied to clipboard!");
        },
        err => {
          this.showMessage({ error: true, data: "Cant copy!" }, "");
        }
      );
    }
  }

  refreshShareLink(
    expanseService,
    type,
    id,
    name,
    description,
    image,
    external
  ) {
    return fetch(
      "https://sdq.st/delete-link/" +
        expanseService.currentSession.token +
        "/" +
        type +
        "-" +
        id,
      {
        method: "GET",
        cache: "no-cache"
      }
    )
      .then(() =>
        fetch(
          "https://sdq.st/get-link/" + expanseService.currentSession.token,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: name,
              description: description,
              image: image,
              name: type + "-" + id,
              external: external
            })
          }
        )
      )
      .then(r => r.json());
  }
}
