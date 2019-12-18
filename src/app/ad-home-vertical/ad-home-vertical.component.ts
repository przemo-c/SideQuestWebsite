import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-ad-home-vertical",
  templateUrl: "./ad-home-vertical.component.html",
  styleUrls: ["./ad-home-vertical.component.css"]
})
export class AdHomeVerticalComponent implements OnInit {
  constructor(public expanseService: ExpanseClientService) {}

  ngOnInit() {}
}
