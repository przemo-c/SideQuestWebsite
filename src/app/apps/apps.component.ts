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
  isGrid: boolean = true;
  updateMasonryLayout: boolean = false;
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  page: number = 0;
  sub: Subscription;
  category: number;
  isLoaded: boolean;
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
      }
    });
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
        .searchApps("", this.page, this.category)
        .then(async (resp: AppListing[]) => {
          await this.fixImages(resp);
          this.hasNoMore = !resp.length;
          let isGrid = this.isGrid;
          this.isGrid = false;
          if (this.page === 0) {
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
        })
    );
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
