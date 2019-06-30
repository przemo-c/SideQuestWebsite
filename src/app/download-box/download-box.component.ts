import { Component, OnInit } from '@angular/core';
interface ReleaseAsset {
  browser_download_url: string;
  name: string;
  download_count: number;
}
@Component({
  selector: 'app-download-box',
  templateUrl: './download-box.component.html',
  styleUrls: ['./download-box.component.css']
})
export class DownloadBoxComponent implements OnInit {
  assets: ReleaseAsset[];
  constructor() { }

  ngOnInit() {
    fetch('https://api.github.com/repos/the-expanse/SideQuest/releases/latest')
      .then(r => r.json())
      .then(r => {
        r.assets.reverse();
        this.assets = r.assets.filter(a => {
          console.log(a.name.split('.').pop());
          return ~['zip', 'exe', 'xz', 'dmg'].indexOf(a.name.split('.').pop());
        });
      });
  }

  openUrl(url: string){
    window.open(url);
  }
}
