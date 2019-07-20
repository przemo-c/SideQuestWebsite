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
  constructor(private toastService: MzToastService) {
    const userAgent = (navigator as any).userAgent.toLowerCase();
    if (userAgent.indexOf(" electron/") > -1) {
      this.hideLogo = true;
    }
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
}
