import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-ad-games-vertical",
  templateUrl: "./ad-games-vertical.component.html",
  styleUrls: ["./ad-games-vertical.component.css"]
})
export class AdGamesVerticalComponent implements OnInit {
  constructor(public expanseService: ExpanseClientService) {}

  ngOnInit() {}
}
