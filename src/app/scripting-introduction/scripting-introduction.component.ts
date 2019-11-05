import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-scripting-introduction",
  templateUrl: "./scripting-introduction.component.html",
  styleUrls: ["./scripting-introduction.component.css"]
})
export class ScriptingIntroductionComponent implements OnInit {
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
