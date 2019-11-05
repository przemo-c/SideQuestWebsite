import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-scripting-interaction",
  templateUrl: "./scripting-interaction.component.html",
  styleUrls: ["./scripting-interaction.component.css"]
})
export class ScriptingInteractionComponent implements OnInit {
  interactionCode = ` // MyScript.cs
using UnityEngine;
public class MyScript : MonoBehaviour {
  // Use this for initialization
  void Start () {
    SideQuestSDK.Core.SetupInteraction(gameObject,false/*isClickable*/, false/*isTeleport*/, true/*isGrabable*/);
  }
  // Update is called once per frame
  void Update () {
    
  }
}`;

  interactionCodeAlt = ` // MyScript.cs
using UnityEngine;
public class MyScript : MonoBehaviour {
  // Use this for initialization
  void Start () {
    var settings = gameObject.AddComponent<InteractionSettings>();
    settings.isClickable = true;
    settings.isTeleport = true;
    settings.isGrabable = true;
    
    /*
      public bool isClickable = false;
      public bool isTeleport = false;
      public bool isGrabable = false;
      public bool isResizable = false;
      public bool isTelekinesis = false;
      public bool isPhysics = false;
      public bool physicsGravity = true;
      public float physicsMass = 1;
      public float physicsDrag = 0;
      public float physicsAngularDrag = 0.005f;
      public bool isSpawner = false;
      public float reSpawn = 50f;
      public bool isFixedGrab = false;
  
      public bool isTwoHandFixedGrab = false;
      public Vector3 primaryGrabPosition = Vector3.zero;
      public Vector3 primaryGrabRotation = Vector3.zero;
      public Vector3 secondaryGrabPosition = Vector3.zero;
    */
  }
  // Update is called once per frame
  void Update () {
    
  }
}`;
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
