import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-getting-started",
  templateUrl: "./getting-started.component.html",
  styleUrls: ["./getting-started.component.css"]
})
export class GettingStartedComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
