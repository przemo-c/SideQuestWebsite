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
  isGrid: boolean = true;
  updateMasonryLayout: boolean = false;
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  page: number = 0;
  sub: Subscription;
  category: number;
  isLoaded: boolean;
  searchTimeout: number;
  isRecent: boolean = true;
  constructor(
    private expanseService: ExpanseClientService,
    public appService: AppService,
    private router: Router,
    route: ActivatedRoute
  ) {
    const isGrid = localStorage.getItem("isGrid");
    if (isGrid) {
      this.isGrid = isGrid === "true";
    }
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.category = Number(route.snapshot.paramMap.get("category"));
        if (!Number.isInteger(this.category)) {
          this.category = null;
        }
        if (this.isLoaded) {
          this.page = 0;
          this.getApps();
        }
        this.appService.removeUninstalledMeta();
      }
    });
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page = 0;
      this.getApps();
    }, 750);
  }

  saveGrid() {
    localStorage.setItem("isGrid", this.isGrid.toString());
  }

  ngOnInit() {
    return this.getApps();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getApps() {
    this.isLoading = true;
    this.expanseService.start().then(() =>
      this.expanseService
        .searchApps(
          this.searchString,
          this.page,
          this.isRecent ? "created" : "name",
          this.isRecent ? "desc" : "asc",
          this.category
        )
        .then(async (resp: AppListing[]) => {
          await this.fixImages(resp);
          this.hasNoMore = !resp.length;
          let isGrid = this.isGrid;
          if (this.page === 0) {
            this.isGrid = false;
            this.apps.length = 0;
          }
          this.isLoading = false;
          this.apps = this.apps.concat(resp);
          // this.updateMasonryLayout = true;
          this.isLoaded = true;
          if (this.page === 0) {
            setTimeout(() => (this.isGrid = isGrid));
          }
          this.page++;
          this.parseInstalled(resp);
        })
    );
  }

  parseInstalled(apps) {
    const sideQuest = (window as any).sideQuest;
    if (sideQuest) {
      apps.forEach(app => {
        this.appService.app_index[app.apps_id] = app.packagename;
        if (
          sideQuest.installed.indexOf(app.packagename) > -1 &&
          (!this.appService.app_meta[app.apps_id] ||
            !this.appService.app_meta[app.apps_id].vc)
        ) {
          const app_cache = this.appService.getAppMeta(app.apps_id);
          app_cache.vc = app.versioncode;
        }
      });
      this.appService.saveAppMeta();
    }
  }

  async fixImages(result) {
    await Promise.all(
      (result && result.length ? result : []).map(async d => {
        const img = new Image();
        let notLoaded = false;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = d.image_url;
        }).catch(e => {
          d.image_url = null;
          notLoaded = true;
        });
      })
    );
  }
}
