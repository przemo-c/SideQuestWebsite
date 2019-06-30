import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }
  getNews(page: number = 0, filter: string = 'none') {
    return fetch('https://shanesedit.org:5678/news_feed/' + page + '/' + filter)
      .then(r => r.json());
  }
}
