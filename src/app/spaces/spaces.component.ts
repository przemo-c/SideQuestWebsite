import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { SpaceListing } from "../account/account.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-spaces",
  templateUrl: "./spaces.component.html",
  styleUrls: ["./spaces.component.css"]
})
export class SpacesComponent implements OnInit {
  spaces: SpaceListing[] = [];
  updateMasonryLayout: boolean = false;
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  page: number = 0;
  isLoaded: boolean;
  searchTimeout: any;
  searchString: string;
  constructor(
    private expanseService: ExpanseClientService,
    public appService: AppService,
    public router: Router
  ) {
    this.getSpaces();
  }

  ngOnInit() {}

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page = 0;
      this.getSpaces();
    }, 750);
  }

  getSpaces() {
    this.isLoaded = false;
    this.expanseService
      .start()
      .then(() => this.expanseService.getSpaces(this.page, this.searchString))
      .then(async (spaces: SpaceListing[]) => {
        spaces.forEach((space: SpaceListing, i) => {
          const date = new Date(space.updated * 1000);
          space.date_string =
            date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
          space.show_date =
            i === 0 || spaces[i - 1].date_string !== space.date_string;
        });
        this.appService.fixImages(spaces);
        this.hasNoMore = !spaces.length;
        let isGrid = this.appService.isGrid;
        if (this.page === 0) {
          this.appService.isGrid = false;
          this.spaces.length = 0;
        }
        this.isLoading = false;
        this.spaces = this.spaces.concat(spaces);
        this.isLoaded = true;
        if (this.page === 0) {
          setTimeout(() => (this.appService.isGrid = isGrid));
        }
        this.page++;
      });
  }
}
