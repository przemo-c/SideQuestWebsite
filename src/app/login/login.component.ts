import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  error: string;
  sub: Subscription;
  return_url: string;
  recaptcha: any;
  captchaSuccess: boolean;
  constructor(
    public service: AppService,
    private expanseService: ExpanseClientService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        let return_url = route.snapshot.paramMap.get("return");
        if (return_url) {
          this.return_url = decodeURIComponent(return_url);
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {}

  done(e) {
    this.captchaSuccess = true;
  }

  login() {
    if (this.captchaSuccess) {
      this.expanseService.start().then(() =>
        this.expanseService
          .login(this.email, this.password)
          .then((resp: any) => {
            this.service.showMessage(resp, "Signed In!!");
            if (!resp.error) {
              localStorage.setItem(
                "session" + this.expanseService.storageKey,
                JSON.stringify(resp)
              );
              this.expanseService.currentSession = resp;
              this.service.isAuthenticated = !!resp;
              this.router.navigateByUrl(this.return_url || "/account");
              this.expanseService.notifyInstalledAppsChanged();
            }
          })
      );
    } else {
      this.service.showMessage(
        { error: true, data: "Please complete the anti-robot check." },
        ""
      );
    }
  }
}
