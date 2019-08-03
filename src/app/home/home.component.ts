import {
  AfterViewInit,
  Component,
  OnInit,
  Sanitizer,
  ViewChild
} from "@angular/core";
import { AppService } from "../app.service";
import { DomSanitizer } from "@angular/platform-browser";
import { AppListing } from "../account/account.component";

export interface NewsItem {
  title: string;
  description: string;
  type: string;
  message_type: string;
  url: string;
  image: string;
  video: string;
  created: number;
  date_string?: string;
  show_date?: boolean;
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
  expanseNews: NewsItem = {
    title: "The Expanse VR",
    description: "Create your social expereince",
    type: "app",
    message_type: "",
    url: "https://sidequestvr.com/#/app/12",
    image: "https://cdn.theexpanse.app/file/1119/Untitled-1 (2).jpg",
    video: "",
    created: 0
  };
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
    return this.getEvents()
      .then(() => this.appService.getNews(this.page))
      .then(async (result: NewsItem[]) => {
        await this.fixImages(result);
        this.hasNoMore = !result.length;
        if (this.page === 0) {
          this.news.length = 0;
        }
        this.isLoading = false;
        this.news = this.news.concat(result);
        this.news.forEach((d: NewsItem, i) => {
          const date = new Date(+d.created);
          d.date_string =
            date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
          d.show_date =
            i === 0 || this.news[i - 1].date_string !== d.date_string;
        });
        this.page++;
      });
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
