import {
  AfterViewInit,
  Component,
  OnInit,
  Sanitizer,
  ViewChild
} from "@angular/core";
import { AppService } from "../app.service";
import { DomSanitizer } from "@angular/platform-browser";

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
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  news: NewsItem[] = [];
  updateMasonryLayout: boolean;
  isGrid: boolean = true;
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  firstNews: NewsItem[];
  page: number = 0;
  constructor(public appService: AppService) {
    const isGrid = localStorage.getItem("isGrid");
    if (isGrid) {
      this.isGrid = isGrid === "true";
    }
    this.appService.scrollContainer.onscroll = ev => {
      const scroller = this.appService.scrollContainer;
      if (
        scroller &&
        scroller.scrollTop >= scroller.scrollHeight - scroller.offsetHeight &&
        !this.isLoading &&
        !this.hasNoMore
      ) {
        this.getNews();
      }
    };
  }

  ngOnInit() {
    return this.getNews();
  }

  saveGrid() {
    localStorage.setItem("isGrid", this.isGrid.toString());
  }

  getNews() {
    this.isLoading = true;
    return this.appService
      .getNews(this.page)
      .then(async (result: NewsItem[]) => {
        await this.fixImages(result);
        this.hasNoMore = !result.length;
        if (this.page === 0) {
          this.news.length = 0;
        }
        this.isLoading = false;
        this.news = this.news.concat(result);
        this.page++;
      })
      .then(() => this.getEvents());
  }

  async fixImages(result) {
    await Promise.all(
      result.map(async d => {
        const img = new Image();
        let notLoaded = false;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = d.image;
        }).catch(e => {
          d.image = null;
          notLoaded = true;
        });
      })
    );
  }

  getEvents() {
    return this.appService
      .getNews(0, "app")
      .then(async (result: NewsItem[]) => {
        await this.fixImages(result);
        this.firstNews = result.filter(
          d => d.image && (d.type === "event" || d.type === "app")
        );
        if (this.firstNews.length < 8) {
          this.firstNews = this.firstNews.concat(
            this.news
              .filter(d => d.image && (d.type !== "event" && d.type !== "app"))
              .slice(0, 8 - this.firstNews.length)
          );
        }
      });
  }

  openItem(url: string) {
    window.location.href = url;
  }

  ngAfterViewInit() {}
}
