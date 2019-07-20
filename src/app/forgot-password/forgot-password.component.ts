import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  constructor(
    private expanseService: ExpanseClientService,
    private appService: AppService
  ) {}

  ngOnInit() {}

  resetPassword() {
    this.expanseService.start().then(() =>
      this.expanseService
        .forgotPassword(this.email, "https://sidequestvr.com/#/reset-password/")
        .then(res => {
          this.appService.showMessage(res, "Instructions sent!");
        })
    );
  }
}
