import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: string;
  constructor(
    private service: AppService,
    private expanseService: ExpanseClientService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.expanseService.start().then(() =>
      this.expanseService.login(this.email, this.password).then((resp: any) => {
        this.service.showMessage(resp, "Signed In!!");
        if (!resp.error) {
          localStorage.setItem(
            "session" + this.expanseService.storageKey,
            JSON.stringify(resp)
          );
          this.expanseService.currentSession = resp;
          this.service.isAuthenticated = !!resp;
          this.router.navigateByUrl("/account");
        }
      })
    );
  }
}
