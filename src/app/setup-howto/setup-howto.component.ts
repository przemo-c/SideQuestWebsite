import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-howto',
  templateUrl: './setup-howto.component.html',
  styleUrls: ['./setup-howto.component.css']
})
export class SetupHowtoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openItem(url: string) {
    window.location.href = url;
  }
}
