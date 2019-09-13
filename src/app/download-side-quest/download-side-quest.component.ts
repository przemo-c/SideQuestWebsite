import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-download-side-quest",
  templateUrl: "./download-side-quest.component.html",
  styleUrls: ["./download-side-quest.component.css"]
})
export class DownloadSideQuestComponent implements OnInit {
  total_downloads: number;
  constructor() {}

  ngOnInit() {
    fetch("https://api.github.com/repos/The-expanse/SideQuest/releases")
      .then(r => r.json())
      .then(r =>
        r.reduce((a, b) => {
          a += b.assets.reduce((_a, _b) => {
            if (
              _b.name.indexOf("latest") === -1 &&
              _b.name.indexOf("blockmap") === -1
            ) {
              _a += _b.download_count;
            }
            return _a;
          }, 0);
          return a;
        }, 0)
      )
      .then(total => (this.total_downloads = total));
  }
}
