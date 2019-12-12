import { Component, Input, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-app-display-box",
  templateUrl: "./app-display-box.component.html",
  styleUrls: ["./app-display-box.component.css"]
})
export class AppDisplayBoxComponent implements OnInit {
  @Input() apps;
  constructor(public appService: AppService, public router: Router) {}

  ngOnInit() {}
}
