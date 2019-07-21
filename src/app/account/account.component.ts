import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
export interface AppListing {
  name: string;
  apps_id?: number;
  users_id?: number;
  app_categories_id: string;
  image_url: string;
  video_url: string;
  comfort: number;
  summary: string;
  description: string;
  apk_url: string;
  packagename: string;
  versioncode: number;
  versionname: string;
  license: string;
  website: string;
  donate_url: string;
  github_name: string;
  github_repo: string;
  github_tag: string;
  github_enabled: boolean;
  updated: number;
  created: number;
  supports_quest: boolean;
  supports_go: boolean;
  supports_other: boolean;
  search_tags: string;
  is_first_publish: boolean;
  active: boolean;
  deleted: boolean;
}
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  myApps: AppListing[];
  newPassword: string;
  newPassword1: string;
  constructor(
    public expanseService: ExpanseClientService,
    public appService: AppService
  ) {}

  ngOnInit() {
    this.expanseService.start().then(() =>
      this.expanseService.searchMyApps("", 0).then((resp: AppListing[]) => {
        this.myApps = resp;
      })
    );
  }

  saveNameAndEmail() {
    this.expanseService
      .saveUserDetails(
        this.expanseService.currentSession.name,
        this.expanseService.currentSession.email
      )
      .then(res => this.appService.showMessage(res, "Details Saved!"));
  }

  changePassword() {
    if (this.newPassword !== this.newPassword1 || this.newPassword.length < 6) {
      this.appService.showMessage(
        {
          error: true,
          data: "Passwords must match and be at least 6 characters!!"
        },
        ""
      );
    } else {
      this.expanseService
        .saveUserPassword(this.newPassword)
        .then(res => this.appService.showMessage(res, "Password Saved!"));
    }
  }
}
