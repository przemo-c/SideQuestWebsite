import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AppService } from "../app.service";
interface ReleaseAsset {
  browser_download_url: string;
  name: string;
  download_count: number;
}
@Component({
  selector: "app-download-box",
  templateUrl: "./download-box.component.html",
  styleUrls: ["./download-box.component.css"]
})
export class DownloadBoxComponent implements OnInit {
  @Output() last_update = new EventEmitter();
  assets: ReleaseAsset[];
  assetsWindows: ReleaseAsset[];
  assetsMac: ReleaseAsset[];
  assetsLinux: ReleaseAsset[];
  loading = true;
  total_downloads: number;
  constructor() {}

  ngOnInit() {
    // .then(() => );
    fetch("https://api.github.com/repos/the-expanse/SideQuest/releases/latest")
      .then(r => r.json())
      .then(r => {
        r.assets.reverse();
        if (r.assets.length) {
          this.last_update.emit(r.assets[0].updated_at);
        }
        this.assets = r.assets.filter(a => {
          return ~["zip", "exe", "xz", "dmg"].indexOf(a.name.split(".").pop());
        });
        this.assetsWindows = r.assets.filter(a => {
          if (a.name.search(/\.exe$/) !== -1) {
            return a;
          } /*else if (a.name.search(/win\.zip$/) !== -1) {
            return a;
          }*/
        });
        this.assetsMac = r.assets.filter(a => {
          if (a.name.search(/\.dmg$/) !== -1) {
            return a;
          } /*else if (a.name.search(/mac\.zip$/) !== -1) {
            return a;
          }*/
        });
        this.assetsLinux = r.assets.filter(a => {
          if (a.name.search(/\.tar\...$/) !== -1) {
            return a;
          }
        });
        this.loading = false;
      });
  }

  openUrl(url: string) {
    window.open(url);
  }
}
