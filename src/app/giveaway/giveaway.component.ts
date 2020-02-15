import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-giveaway",
  templateUrl: "./giveaway.component.html",
  styleUrls: ["./giveaway.component.css"]
})
export class GiveawayComponent implements OnInit {
  constructor(
    public appService: AppService,
    public expanseService: ExpanseClientService
  ) {}

  ngOnInit() {}
}
