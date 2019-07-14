import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  hideLogo: boolean;
  scrollContainer: HTMLElement;
  isAuthenticated: boolean;
  currentUrl: string;
  constructor() {

    const userAgent = (navigator as any).userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.hideLogo = true;
    }
  }
  getNews(page: number = 0, filter: string = 'none') {
    return fetch('https://shanesedit.org:5678/news_feed/' + page + '/' + filter)
      .then(r => r.json());
  }

  logout() { }
}
