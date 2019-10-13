import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppListing } from "../account/account.component";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { NewsItem } from "../home/home.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-apps",
  templateUrl: "./apps.component.html",
  styleUrls: ["./apps.component.css"]
})
export class AppsComponent implements OnInit, OnDestroy {
  apps: AppListing[] = [];
  searchString: string;
  updateMasonryLayout = false;
  isLoading = false;
  hasNoMore = false;
  page = 0;
  sub: Subscription;
  category: number;
  isLoaded: boolean;
  searchTimeout: any;
  isRecent = true;
  isRating = false;
  isDownloads = false;
  tag: string;
  searchTags: Materialize.AutoCompleteOptions;
  autocompleteOptions: Materialize.AutoCompleteOptions = {
    data: {
      Apple: null,
      Microsoft: null,
      Google: "assets/google_g_logo.png"
    }
  };
  constructor(
    private expanseService: ExpanseClientService,
    public appService: AppService,
    public router: Router,
    route: ActivatedRoute
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.category = Number(route.snapshot.paramMap.get("category"));
        if (!Number.isInteger(this.category)) {
          this.category = null;
        }
        this.tag = route.snapshot.paramMap.get("tag");
        if (this.tag === "none") {
          this.tag = null;
        }
        this.page = Number(route.snapshot.paramMap.get("page"));
        if (!Number.isInteger(this.page)) {
          this.page = 0;
        }
        if (this.isLoaded) {
          this.getApps();
        }
      }
    });
    this.searchTags = {
      data: {
        Apple: null,
        Microsoft: null,
        Google: null
      }
    };
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page = 0;
      this.getApps();
    }, 750);
  }

  ngOnInit() {
    return this.getApps();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  backClicked() {
    (window as any).history.back();
  }
  getApps() {
    this.isLoading = true;
    this.expanseService.start().then(() =>
      this.expanseService
        .searchApps(
          this.searchString,
          this.page,
          this.isDownloads
            ? "downloads"
            : this.isRecent
            ? "created"
            : this.isRating
            ? "rating"
            : "name",
          this.isRecent || this.isRating || this.isDownloads ? "desc" : "asc",
          this.category,
          this.tag
        )
        .then(async (resp: AppListing[]) => {
          this.appService.fixImages(resp);
          this.hasNoMore = resp.length < 20;
          // let isGrid = this.appService.isGrid;
          if (this.page === 0) {
            // this.appService.isGrid = false;
            this.apps.length = 0;
          }
          this.isLoading = false;
          this.apps = resp; // this.apps.concat(resp);
          this.apps.forEach((d: AppListing, i) => {
            const date = new Date(+d.created);
            d.date_string =
              date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
            d.show_date =
              i === 0 || this.apps[i - 1].date_string !== d.date_string;
          });
          // this.updateMasonryLayout = true;
          this.isLoaded = true;
          // if (this.page === 0) {
          //   setTimeout(() => {
          //     this.appService.isGrid = isGrid;
          //     setTimeout(() => {
          //       this.updateMasonryLayout = true;
          //     }, 250);
          //   });
          // }
          this.page++;

          resp.forEach(app => {
            this.appService.app_index[app.apps_id] = app.packagename;
          });
          this.appService.saveAppMeta();
        })
    );
  }

  onAdd() {}
  onDelete() {}
  onSelect() {}
}
