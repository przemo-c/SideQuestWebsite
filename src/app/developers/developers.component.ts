import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-developers",
  templateUrl: "./developers.component.html",
  styleUrls: ["./developers.component.css"]
})
export class DevelopersComponent implements OnInit {
  totalDiscord;
  constructor(
    public appService: AppService,
    public expanseService: ExpanseClientService
  ) {}

  ngOnInit() {
    fetch("https://proxy.statbot.net:5000/serverhome/413712766180786176")
      .then(r => r.json())
      .then(stats => {
        try {
          this.totalDiscord = stats.members[stats.members.length - 1].count;
        } catch (e) {}
      });
  }
}
