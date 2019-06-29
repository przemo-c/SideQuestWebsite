import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsItem} from '../home/home.component';

@Component({
  selector: 'app-over-image',
  templateUrl: './over-image.component.html',
  styleUrls: ['./over-image.component.css']
})
export class OverImageComponent implements OnInit {
  @Input() firstNews: NewsItem;
  @Output() output = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
