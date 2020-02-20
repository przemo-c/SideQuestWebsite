import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { ExpanseClientService } from "../expanse-client.service";

@Component({
  selector: "app-getting-started-install-sdk",
  templateUrl: "./getting-started-install-sdk.component.html",
  styleUrls: ["./getting-started-install-sdk.component.css"]
})
export class GettingStartedInstallSdkComponent implements OnInit {
  constructor(
    public appService: AppService,
    public expanseService: ExpanseClientService
  ) {}

  ngOnInit() {}
}
