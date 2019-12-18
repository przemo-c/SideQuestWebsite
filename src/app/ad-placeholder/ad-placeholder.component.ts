import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-ad-placeholder",
  templateUrl: "./ad-placeholder.component.html",
  styleUrls: ["./ad-placeholder.component.css"]
})
export class AdPlaceholderComponent implements OnInit {
  constructor(public expanseService: ExpanseClientService) {}

  ngOnInit() {}
}
