import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  hideCookies: boolean;
  constructor(public appService: AppService) {}

  ngOnInit() {
    this.hideCookies = !!localStorage.getItem("hideCookies");
  }

  hideCooks() {
    this.hideCookies = true;
    localStorage.setItem("hideCookies", "1");
  }

  openLink(url: string) {
    window.location.href = url;
  }
}
