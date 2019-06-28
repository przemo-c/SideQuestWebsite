import {Component, Input, OnInit} from '@angular/core';
import {NewsItem} from '../home/home.component';

@Component({
  selector: 'app-over-image',
  templateUrl: './over-image.component.html',
  styleUrls: ['./over-image.component.css']
})
export class OverImageComponent implements OnInit {
  @Input('firstNews') firstNews: NewsItem;
  constructor() { }

  ngOnInit() {
  }

}
