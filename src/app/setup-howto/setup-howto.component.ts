import { Component, OnInit } from "@angular/core";
import { IAlbum, Lightbox } from "ngx-lightbox";
import { AppService } from "../app.service";

@Component({
  selector: "app-setup-howto",
  templateUrl: "./setup-howto.component.html",
  styleUrls: ["./setup-howto.component.css"]
})
export class SetupHowtoComponent implements OnInit {
  album: IAlbum[] = [];
  constructor(public lightbox: Lightbox, private appService: AppService) {}

  ngOnInit() {
    const images = [
      "assets/images/CreateOrganisation.png",
      "assets/images/OculusDashboardDeveloperCreate.png",
      "assets/images/ADB Drivers.png",
      "assets/images/right-click.png",
      "assets/images/OculusAppDevModeSteps.png",
      "assets/images/allow-auth.png"
    ];
    this.album = images.map(s => ({ src: s, thumb: s }));
  }

  openItem(url: string) {
    this.appService.openSidequestUrl(url);
  }
  openImage(i: number) {
    this.lightbox.open(this.album, i);
  }
}
