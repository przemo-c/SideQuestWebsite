import { Component, OnInit } from "@angular/core";
import { IAlbum, Lightbox } from "ngx-lightbox";
import { AppService } from "../app.service";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-setup-howto",
  templateUrl: "./setup-howto.component.html",
  styleUrls: ["./setup-howto.component.css"]
})
export class SetupHowtoComponent implements OnInit {
  album: IAlbum[] = [];
  launcherDownloadUrl: string;
  constructor(
    public lightbox: Lightbox,
    public appService: AppService,
    public expanseService: ExpanseClientService
  ) {}

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
    this.getLauncherUrl();
  }

  openItem(url: string) {
    this.appService.openSidequestUrl(url);
  }
  openImage(i: number) {
    this.lightbox.open(this.album, i);
  }
  getLauncherUrl() {
    fetch(
      "https://sdq.st/download-by-package/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc19pZCI6MSwiYXBwc19pZCI6IjkwIiwiaWF0IjoxNTY1MTAzNjQ2fQ.CFnKmOXO5zWxH1WvRyideQHLvlkZLC2v8SQZOiENANE/aaa.QuestAppLauncher.App"
    )
      .then(r => r.json())
      .then((urls: any) => {
        if (!urls.error && urls.urls && urls.urls.length) {
          this.launcherDownloadUrl = urls.urls[0].link_url;
        }
      });
  }
}
