import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";

@Component({
  selector: "app-scripting-app-behaviours",
  templateUrl: "./scripting-app-behaviours.component.html",
  styleUrls: ["./scripting-app-behaviours.component.css"]
})
export class ScriptingAppBehavioursComponent implements OnInit {
  appBehaviourSource = `using UnityEngine;
public class AppBehaviour : MonoBehaviour {}`;

  appBehaviour = `// MyAppScript.cs
using UnityEngine;
public class MyAppScript : AppBehaviour {
  string MyAppVersion = "0.0.1";
  // Use this for initialization
  void Start () {
    
  }
  // Update is called once per frame
  void Update () {
    
  }
}`;
  appBehaviourAddComponent = `// MyAppScript.cs
using UnityEngine;
public class MyAppScript : AppBehaviour {
  // Use this for initialization
  void Start () {
    MyOtherScript component = transform.Find("ChildGameObject/AnotherChild").gameObject.AddComponent<MyOtherScript>();
    component.rootTransform = transform;
  }
  // Update is called once per frame
  void Update () {
    
  }
}`;
  appBehaviourAddComponentOther = `// MyOtherScript.cs
using UnityEngine;
public class MyOtherScript : MonoBehaviour {
  public Transform rootTransform;
  // Use this for initialization
  void Start () {
    Debug.Log(rootTransform.position); 
    // Logs the position of the root of your app
  }
  // Update is called once per frame
  void Update () {
    
  }
}`;
  constructor(public appService: AppService) {}

  ngOnInit() {}
}
