import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-developer-faq",
  templateUrl: "./developer-faq.component.html",
  styleUrls: ["./developer-faq.component.css"]
})
export class DeveloperFAQComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
