import { Component, Input, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-code-block",
  templateUrl: "./code-block.component.html",
  styleUrls: ["./code-block.component.css"]
})
export class CodeBlockComponent implements OnInit {
  @Input() someCode;
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
