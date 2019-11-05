import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-scripting-input-controls",
  templateUrl: "./scripting-input-controls.component.html",
  styleUrls: ["./scripting-input-controls.component.css"]
})
export class ScriptingInputControlsComponent implements OnInit {
  inputCode = `// MyAppScript.cs
using UnityEngine;
using SideQuestSDK;
public class MyAppScript : AppBehaviour {
  // Use this for initialization
  void Start () {
    
  }
  // Update is called once per frame
  void Update () {
    if (InputControls.GetButtonDown(InputControls.LeftTrigger)) {
      // Left Trigger was pressed down
    }
    if (InputControls.GetButton(InputControls.RightGrip)) {
      // Right Grip is being pressed
    }
    if (InputControls.GetButtonUp(InputControls.LeftPrimary)) {
      // Left Primary button was released
    }
    // Get the value of the left trigger between -1 and 1;
    float leftTrigger = InputControls.GetTriggerAxis(Hand.Left);
    
    // Get the value of the left joystick between -1 and 1;
    Vector2 joyStickOrTouchpad = InputControls.Get2DAxis(Hand.Left);
    /* Here are the available options:
    public enum InputButton { 
      LeftTrigger, 
      RightTrigger, 
      LeftGrip, 
      RightGrip, 
      LeftPrimary, 
      RightPrimary, 
      LeftSecondary, 
      RightSecondary 
    };
    
    public enum Hand { 
      Left, 
      Right 
    };
    */
  }
}`;
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
