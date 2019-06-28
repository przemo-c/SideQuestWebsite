import {AfterViewInit, Component, OnInit, Sanitizer, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {DomSanitizer} from '@angular/platform-browser';

export interface NewsItem {
  title: string;
  description: string;
  type: string;
  message_type: string;
  url: string;
  image: string;
  video: string;
  created: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  news: NewsItem[];
  updateMasonryLayout:boolean;
  isGrid: boolean = true;
  firstNews: NewsItem[];
  constructor(private appService: AppService, ) { }

  ngOnInit() {
    this.appService.getNews()
      .then(async (result: NewsItem[]) => {
        this.news = result;
        await Promise.all(result.map(async d => {
          const img = new Image();
          let notLoaded = false;
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = d.image;
          })
            .catch(e => {
              d.image = null;
              notLoaded = true;
            });
        }));
        this.firstNews = result.filter(d => d.image);
        console.log(this.firstNews);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateMasonryLayout = false, 1500 );
  }

  doStuff(event) {
  }
}
