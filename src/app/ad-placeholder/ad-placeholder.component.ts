import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-ad-placeholder",
  templateUrl: "./ad-placeholder.component.html",
  styleUrls: ["./ad-placeholder.component.css"]
})
export class AdPlaceholderComponent implements OnInit, AfterViewInit {
  constructor(public expanseService: ExpanseClientService) {}
  @Input() sizes = [];
  @Input() id = "placement-1";
  ngOnInit() {}

  ngAfterViewInit() {
    if (this.expanseService.isNotGolden()) {
      setTimeout(() => {
        window["nitroAds"].createAd(this.id, {
          refreshLimit: 10,
          refreshTime: 90,
          renderVisibleOnly: false,
          refreshVisibleOnly: true,
          sizes: this.sizes,
          report: {
            enabled: true,
            wording: "Report Ad",
            position: "bottom-right"
          }
        });
      });
    }
  }
}
