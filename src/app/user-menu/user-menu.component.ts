import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { ExpanseClientService } from "../expanse-client.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.css"]
})
export class UserMenuComponent implements OnInit {
  constructor(
    public appService: AppService,
    public expanseService: ExpanseClientService,
    public router: Router
  ) {}

  ngOnInit() {}

  signOut() {
    this.appService.logout(this.expanseService);
    this.router.navigateByUrl("/login");
  }
}
