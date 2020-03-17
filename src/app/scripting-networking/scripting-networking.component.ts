import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-scripting-networking',
    templateUrl: './scripting-networking.component.html',
    styleUrls: ['./scripting-networking.component.css'],
})
export class ScriptingNetworkingComponent implements OnInit {
    someCode = ` // MyScript.cs
using UnityEngine;
public class MyScript : MonoBehaviour {
  // Use this for initialization
  void Start () {

  }
  // Update is called once per frame
  void Update () {

  }
}`;
    constructor(public appService: AppService) {}

    ngOnInit() {}
}
