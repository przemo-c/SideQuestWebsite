import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  sub: Subscription;
  return_url: string;
  recaptcha: any;
  captchaSuccess: boolean;
  name: string;
  email: string;
  email2: string;
  password: string;
  password2: string;
  public_profile: boolean;
  selectedDate = {
    start: moment(), // new Date(new Date().getTime() - (1000 * 3600 * 24 * 7)),
    end: null
  };
  days = [];
  years = [];
  months = [];
  monthLengths = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
  };
  selectedDays = 1;
  selectedYears;
  selectedMonth = "January";
  constructor(
    private expanseService: ExpanseClientService,
    public service: AppService,
    private router: Router
  ) {
    let date = new Date();
    let currentYear = date.getFullYear();
    date.setFullYear(date.getFullYear() - 13);
    this.selectedYears = date.getFullYear();
    for (let i = 0; i < 110; i++) {
      this.years.push(currentYear - i);
    }
    this.months = Object.keys(this.monthLengths);
    this.fillDays();
  }

  done(e) {
    this.captchaSuccess = true;
  }

  fillDays() {
    this.days.length = 0;
    for (let i = 0; i < this.monthLengths[this.selectedMonth]; i++) {
      this.days.push(i + 1);
    }
  }

  ngOnInit() {}

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  customCss() {
    return "black-text";
  }

  signUp() {
    if (!this.captchaSuccess) {
      this.service.showMessage(
        { error: true, data: "Please complete the anti-robot check." },
        ""
      );
      return;
    }
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
          moment(
            new Date(
              this.selectedYears,
              this.months.indexOf(this.selectedMonth),
              this.selectedDays
            ).getTime()
          ).format()
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
