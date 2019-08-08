import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { AppListing, EventListing } from "../account/account.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  events: EventListing[] = [];
  updateMasonryLayout: boolean = false;
  isLoading: boolean = false;
  hasNoMore: boolean = false;
  page: number = 0;
  isLoaded: boolean;
  constructor(
    private expanseService: ExpanseClientService,
    public appService: AppService,
    public router: Router
  ) {
    this.getEvents();
  }

  ngOnInit() {}

  getEvents() {
    this.isLoaded = false;
    this.expanseService
      .start()
      .then(() => this.expanseService.getEvents(this.page, "", "upcoming"))
      .then(async (events: EventListing[]) => {
        events.forEach((event: EventListing, i) => {
          const date = new Date(event.start_time * 1000);
          event.date_string =
            date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
          event.show_date =
            i === 0 || events[i - 1].date_string !== event.date_string;
        });
        await this.appService.fixImages(events);
        this.hasNoMore = !events.length;
        let isGrid = this.appService.isGrid;
        if (this.page === 0) {
          this.appService.isGrid = false;
          this.events.length = 0;
        }
        this.isLoading = false;
        this.events = this.events.concat(events);
        // this.updateMasonryLayout = true;
        this.isLoaded = true;
        if (this.page === 0) {
          setTimeout(() => (this.appService.isGrid = isGrid));
        }
        this.page++;
      })
      .then(() => console.log(this.events));
  }
}
