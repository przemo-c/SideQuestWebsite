import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-listing-modes",
  templateUrl: "./listing-modes.component.html",
  styleUrls: ["./listing-modes.component.css"]
})
export class ListingModesComponent implements OnInit {
  @Input() show_sort: boolean;
  @Output() recent = new EventEmitter();
  @Output() name = new EventEmitter();
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
