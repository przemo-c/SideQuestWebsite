import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-space-template-item",
  templateUrl: "./space-template-item.component.html",
  styleUrls: ["./space-template-item.component.css"]
})
export class SpaceTemplateItemComponent implements OnInit {
  @Input() template;
  @Output() open = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
