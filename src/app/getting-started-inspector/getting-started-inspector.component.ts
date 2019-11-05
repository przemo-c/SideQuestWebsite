import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-getting-started-inspector",
  templateUrl: "./getting-started-inspector.component.html",
  styleUrls: ["./getting-started-inspector.component.css"]
})
export class GettingStartedInspectorComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
