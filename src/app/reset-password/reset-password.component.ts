import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  password1: string;
  password2: string;
  token: string;
  sub: Subscription;
  constructor(
    private router: Router,
    route: ActivatedRoute,
    private expanseService: ExpanseClientService,
    private appService: AppService
  ) {
    this.sub = router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.token = route.snapshot.paramMap.get("token");
        if (!this.token) {
          router.navigateByUrl("/login");
        }
      }
    });
  }

  ngOnInit() {}

  resetPassword() {
    if (this.password1 !== this.password2 || this.password1.length < 7) {
      this.appService.showMessage(
        {
          error: true,
          data: "Passwords must match and be at least 6 characters!!"
        },
        ""
      );
    } else {
      this.expanseService.start().then(() =>
        this.expanseService
          .resetPassword(this.password1, this.token)
          .then((res: any) => {
            if (!res.error) {
              this.router.navigateByUrl("/account");
            }
            this.appService.showMessage(res, "Password Saved!");
          })
      );
    }
  }
}
