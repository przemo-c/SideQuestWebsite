import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-grid-item",
  templateUrl: "./grid-item.component.html",
  styleUrls: ["./grid-item.component.css"]
})
export class GridItemComponent implements OnInit {
  @Input() show_date_first: boolean;
  @Input() show_date: boolean;
  @Input() hide_time: boolean;
  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
  @Input() rating: number;
  @Input() number_of_rating: number;
  @Input() downloads: number;
  @Input() start_time: number;
  @Input() duration: number;
  @Input() license: string;
  @Output() open = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
