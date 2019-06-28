import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }
  getNews() {
    return fetch('https://shanesedit.org:5678/news_feed/0/none')
      .then(r => r.json());
  }
}
