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
import { IImage } from "ng-simple-slideshow";
import { ExpanseClientService } from "../expanse-client.service";

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
  @ViewChild("sliderele", { static: true }) sliderele;
  popularApps: AppListing[];
  popularAppApps: AppListing[];
  newApps: AppListing[];
  horrorApps: AppListing[];
  multiplayerApps: AppListing[];
  imageUrls: IImage[];
  isAutoDisabled = false;
  news: NewsItem[] = [];
  updateMasonryLayout: boolean;
  isGrid: boolean = true;
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  firstNews: NewsItem[];
  page: number = 0;
  sliderClass = "";
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
  constructor(
    public appService: AppService,
    public expanseService: ExpanseClientService
  ) {
    const isGrid = localStorage.getItem("isGrid");
    if (isGrid) {
      this.isGrid = isGrid === "true";
    }
    // this.appService.scrollContainer.onscroll = ev => {
    //   const scroller = this.appService.scrollContainer;
    //   if (
    //     scroller &&
    //     scroller.scrollTop >= scroller.scrollHeight - scroller.offsetHeight &&
    //     !this.isLoading &&
    //     !this.hasNoMore
    //   ) {
    //     this.getNews();
    //   }
    // };
  }

  setSliderClass(isLeft: boolean) {
    let wasAutoDisabled = this.isAutoDisabled;
    this.isAutoDisabled = true;
    if (wasAutoDisabled) {
      let current = parseInt(this.sliderClass.replace("slidy", ""), 10);
      if (current < 0) {
        current = 0;
      }
      if (current > 20) {
        current = 20;
      }
      this.sliderClass = "slidy" + (current + (isLeft ? -1 : 1));
    } else {
      let percent =
        this.sliderele.nativeElement.offsetLeft /
        this.sliderele.nativeElement.offsetWidth;
      let curPos = Math.round(percent / 0.05);
      this.sliderele.nativeElement.style.left = percent + "%";
      this.sliderClass = "slidy" + (Math.abs(curPos) + 1 + (isLeft ? -1 : 1));
    }
  }

  ngOnInit() {
    return this.getNews()
      .then(() => this.promiseWait(1500))
      .then(() => this.getApps("rating", 1))
      .then(() => this.promiseWait(1500))
      .then(() => this.getApps("recent", 1))
      .then(() => this.promiseWait(1500))
      .then(() => this.getApps("rating", 0, null, "multiplayer"))
      .then(() => this.promiseWait(1500))
      .then(() => this.getApps("rating", 1, "horror"));
  }

  promiseWait(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  saveGrid() {
    localStorage.setItem("isGrid", this.isGrid.toString());
  }

  getApps(type: string, category, tag = null, search = "") {
    return this.expanseService
      .searchApps(search, 0, type, "desc", category, tag, null, 6)
      .then(async (resp: AppListing[]) => {
        this.appService.fixImages(resp);
        if (search === "multiplayer") {
          this.multiplayerApps = resp;
        } else if (tag === "horror") {
          this.horrorApps = resp;
        } else if (type === "recent") {
          this.newApps = resp;
        } else {
          this.popularApps = resp;
        }
      });
  }

  getNews() {
    return this.getEvents();
    // .then(() => this.appService.getNews(this.page))
    // .then(async (result: NewsItem[]) => {
    //   await this.fixImages(result);
    //   this.hasNoMore = !result.length;
    //   if (this.page === 0) {
    //     this.news.length = 0;
    //   }
    //   this.isLoading = false;
    //   this.news = this.news.concat(result);
    //   this.news.forEach((d: NewsItem, i) => {
    //     const date = new Date(+d.created);
    //     d.date_string =
    //       date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    //     d.show_date =
    //       i === 0 || this.news[i - 1].date_string !== d.date_string;
    //   });
    //   this.news = this.news.filter(d => d.image);
    //   this.page++;
    // });
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
    this.isLoading = true;
    return this.appService
      .getNews(0, "app")
      .then(async (result: NewsItem[]) => {
        await this.fixImages(result);
        this.firstNews = result.filter(
          d => d.image && (d.type === "event" || d.type === "app")
        );

        //   [
        //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg',
        //     caption: 'The first slide', href: '#config' },
        //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg',
        //     clickAction: () => alert('custom click function') },
        //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg',
        //     caption: 'Apple TV', href: 'https://www.apple.com/' },
        //   'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg',
        //   { url: 'assets/kitties.jpg', backgroundSize: 'contain', backgroundPosition: 'center' }
        // ];
        if (this.firstNews.length < 8) {
          this.firstNews = this.firstNews.concat(
            this.news
              .filter(d => d.image && (d.type !== "event" && d.type !== "app"))
              .slice(0, 8 - this.firstNews.length)
          );
        }
        this.imageUrls = this.firstNews.map(d => {
          return {
            url: d.image,
            href: d.url,
            title: d.title,
            caption: d.description
          };
        });
        this.imageUrls.unshift({
          url:
            "https://cdn.theexpanse.app/file/3271/Carize_Sidequest_Banner.jpg",
          href: "https://sidequestvr.com/#/app/270/1",
          title: "YUR.fit",
          caption:
            "YUR.fit adds a health and fitness tracker to all Oculus Quest experiences and games."
        });
        this.imageUrls.pop();
        this.isLoading = false;
      });
  }

  openItem(url: string) {
    this.appService.scrollToTop();
    window.location.href = url;
  }

  ngAfterViewInit() {}
}
