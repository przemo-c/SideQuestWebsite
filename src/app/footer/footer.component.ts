import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {}

  openLink(url: string) {
    window.location.href = url;
  }
}
