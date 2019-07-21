import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  name: string;
  email: string;
  email2: string;
  password: string;
  password2: string;
  constructor(
    private expanseService: ExpanseClientService,
    private service: AppService,
    private router: Router
  ) {}

  ngOnInit() {}

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signUp() {
    if (this.password !== this.password2 || this.password.length < 7) {
      return this.service.showMessage(
        {
          error: true,
          data: "Passwords must match and be at least 6 characters!!"
        },
        ""
      );
    }
    if (this.email !== this.email2 || !this.validateEmail(this.email)) {
      return this.service.showMessage(
        {
          error: true,
          data: "Emails must match and be a proper email format!!"
        },
        ""
      );
    }
    this.expanseService
      .start()
      .then(() =>
        this.expanseService.signup(
          this.name,
          this.email,
          this.password,
          "01-01-1970"
        )
      )
      .then((resp: any) => {
        this.service.showMessage(resp, "Signed Up!!");
        if (!resp.error) {
          localStorage.setItem(
            "session" + this.expanseService.storageKey,
            JSON.stringify(resp)
          );
          this.expanseService.currentSession = resp;
          this.service.isAuthenticated = !!resp;
          return fetch(
            "https://shanesedit.org:5678/new_user/" +
              resp.users_id +
              "/" +
              this.name +
              "/" +
              this.email
          ).then(() => this.router.navigateByUrl("/account"));
        }
      });
  }
}
